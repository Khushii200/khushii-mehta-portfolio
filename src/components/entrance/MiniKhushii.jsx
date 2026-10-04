import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Poses are described as the direction each limb points, in model space
 * (+x = her left / viewer's right, +y = up, +z = toward the viewer).
 * Bones are listed parent-first so each limb is aimed after the one it hangs from.
 */
const POSED_BONES = ['LeftUpLeg', 'RightUpLeg', 'LeftFoot', 'RightFoot', 'LeftArm', 'LeftForeArm', 'RightArm', 'RightForeArm', 'Neck'];

// Arms crossed (right forearm in front), ankles crossed.
const REST_DIRECTIONS = {
  LeftArm: [0.05, -1, 0.75],
  LeftForeArm: [-1, 0.02, 0.2],
  RightArm: [-0.05, -1, 0.85],
  RightForeArm: [1, -0.02, 0.3],
  LeftUpLeg: [-0.12, -1, 0.02],
  RightUpLeg: [0.14, -1, 0.1],
};

// Right (outer) forearm raised for the wave with the elbow kept low; the left arm stays crossed.
const WAVE_DIRECTIONS = {
  RightArm: [-0.35, -1, 0.15],
  RightForeArm: [-0.25, 1, 0.25],
};

// Static lean toward the wordmark, pivoting around her feet so they stay planted.
const LEAN_ANGLE = 0.14;

// Model-space tilts (radians around the viewing axis) applied after aiming:
// the feet cancel the lean so her soles stay flat, the neck partly counters it.
const tiltsFor = (lean, neck) => ({ LeftFoot: lean, RightFoot: lean, Neck: neck });
const NECK_TILT = 0.1;

// Side-to-side swing of the raised forearm (radians around the viewing axis).
const WAVE_SWING = 0.22;

// Timeline (seconds from when `wave` turns on): settle pause -> raise -> 2 gentle waves -> lower. Plays once.
const WAVE_TIMING = { delay: 0.55, raise: 0.3, wave: 0.8, cycles: 2, lower: 0.4 };

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const FORWARD_AXIS = new THREE.Vector3(0, 0, 1);

/**
 * MiniKhushii Component
 *
 * Renders the rigged Mini Khushii GLB with its original materials, textures and skinning.
 * She leans against the wordmark with crossed arms (`lean={false}` stands her upright).
 * `fit` frames the camera tightly around her so she fills the canvas, feet at the bottom.
 * The first time `wave` becomes true she waves once.
 */
export const MiniKhushii = ({
  modelPath,
  width = 360,
  height = 420,
  scale = 0.53,
  className = '',
  wave = false,
  lean = true,
  fit = false,
  enableMouseLook = false,
  onLoaded
}) => {
  const containerRef = useRef(null);
  const onLoadedRef = useRef(onLoaded);
  const waveRequestedRef = useRef(wave);
  const waveStartedRef = useRef(false);
  const startWaveRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    waveRequestedRef.current = wave;
    if (wave) startWaveRef.current?.();
  }, [wave]);

  // Path to the actual GLB file
  const resolvedPath =
    modelPath || `${import.meta.env.BASE_URL}models/rigged-model.glb`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animFrameId = null;
    let characterModel = null;
    let waving = false;
    const clock = new THREE.Clock(false);

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Perspective camera framing full body)
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);
    camera.position.set(0, 0.63, 3.4);

    // 3. WebGL Renderer with full alpha transparency & sRGB color
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Lighting Setup (Soft flattering studio lights preserving textures)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf5, 2.0);
    keyLight.position.set(2, 3.5, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf0f4ff, 1.2);
    fillLight.position.set(-2, 2, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const render = () => renderer.render(scene, camera);

    // 5. Pose helpers
    const bones = {};
    const restRotations = {};
    const childDirections = {};
    let poses = null;

    const parentWorld = new THREE.Quaternion();
    const boneWorld = new THREE.Quaternion();
    const delta = new THREE.Quaternion();

    // Rotate a bone in model space by `rotation`, keeping its parent fixed.
    const rotateInModelSpace = (bone, rotation) => {
      bone.getWorldQuaternion(boneWorld);
      bone.parent.getWorldQuaternion(parentWorld);
      bone.quaternion.copy(parentWorld.invert().multiply(rotation.multiply(boneWorld)));
      bone.updateMatrixWorld(true);
    };

    // Point a bone (towards its child joint) along `direction`.
    const aimBone = (bone, direction) => {
      bone.getWorldQuaternion(boneWorld);
      const current = childDirections[bone.name].clone().applyQuaternion(boneWorld);
      rotateInModelSpace(bone, delta.setFromUnitVectors(current, new THREE.Vector3(...direction).normalize()));
    };

    // Resolve a set of limb directions into local bone rotations. Must run before the lean is applied.
    const buildPose = (directions, tilts) => {
      POSED_BONES.forEach((name) => bones[name]?.quaternion.copy(restRotations[name]));
      characterModel.updateMatrixWorld(true);

      POSED_BONES.forEach((name) => {
        const bone = bones[name];
        if (!bone) return;
        if (directions[name]) aimBone(bone, directions[name]);
        if (tilts[name]) rotateInModelSpace(bone, delta.setFromAxisAngle(FORWARD_AXIS, tilts[name]));
      });

      return Object.fromEntries(POSED_BONES.filter((name) => bones[name]).map((name) => [name, bones[name].quaternion.clone()]));
    };

    const buildPoses = (restDirections, waveDirections, tilts) => {
      const raisedDirections = { ...restDirections, ...waveDirections };
      const swungForeArm = (angle) =>
        new THREE.Vector3(...waveDirections.RightForeArm).applyAxisAngle(FORWARD_AXIS, angle).toArray();

      return {
        rest: buildPose(restDirections, tilts),
        raised: buildPose(raisedDirections, tilts),
        swingOut: buildPose({ ...raisedDirections, RightForeArm: swungForeArm(WAVE_SWING) }, tilts),
        swingIn: buildPose({ ...raisedDirections, RightForeArm: swungForeArm(-WAVE_SWING) }, tilts),
      };
    };

    const applyPose = (from, to, t) => {
      Object.keys(from).forEach((name) => bones[name].quaternion.slerpQuaternions(from[name], to[name], t));
    };

    // Returns true while the wave is still playing.
    const updateWave = (time) => {
      const { delay, raise, wave: waveLength, cycles, lower } = WAVE_TIMING;
      const t = time - delay;

      const { rest, raised, swingOut, swingIn } = poses;

      if (t < 0) {
        applyPose(rest, rest, 0);
      } else if (t < raise) {
        applyPose(rest, raised, easeOutCubic(t / raise));
      } else if (t < raise + waveLength) {
        const phase = (t - raise) / waveLength;
        // fade the swing in and out so the hand eases into and out of each wave
        const swing = Math.sin(phase * cycles * Math.PI * 2) * Math.sin(Math.PI * phase);
        applyPose(raised, swing >= 0 ? swingOut : swingIn, Math.abs(swing));
      } else if (t < raise + waveLength + lower) {
        applyPose(raised, rest, easeInOutCubic((t - raise - waveLength) / lower));
      } else {
        applyPose(rest, rest, 0);
        return false;
      }
      return true;
    };

    // 6. Mouse look (optional)
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      // clamp so a pointer far across the page only turns her so far
      targetRotY = Math.max(-1, Math.min(1, nx)) * 0.35;
      targetRotX = Math.max(-1, Math.min(1, ny)) * 0.08;
    };

    if (enableMouseLook) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // 7. Render loop. Without mouse look she is static after the wave, so the loop stops.
    const animate = () => {
      if (waving) waving = updateWave(clock.getElapsedTime());

      if (characterModel && enableMouseLook) {
        characterModel.rotation.y += (targetRotY - characterModel.rotation.y) * 0.06;
        characterModel.rotation.x += (targetRotX - characterModel.rotation.x) * 0.06;
      }

      render();
      animFrameId = waving || enableMouseLook ? requestAnimationFrame(animate) : null;
    };

    // 8. GLTF Model Loading
    const loader = new GLTFLoader();

    loader.load(
      resolvedPath,
      (gltf) => {
        if (!isMounted) return;

        characterModel = gltf.scene;

        // Ensure skinned meshes and materials render with original skinning and lighting
        characterModel.traverse((child) => {
          if (child.isMesh || child.isSkinnedMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.needsUpdate = true;
              child.material.depthWrite = true;
            }
          }
          if (child.isBone && POSED_BONES.includes(child.name)) {
            bones[child.name] = child;
            restRotations[child.name] = child.quaternion.clone();
            const joint = child.children.find((c) => c.isBone);
            if (joint) childDirections[child.name] = joint.position.clone().normalize();
          }
        });

        // Bounding box from the rest pose so the framing matches the original setup
        const box = new THREE.Box3().setFromObject(characterModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center horizontally & position feet on ground level
        characterModel.position.x = -center.x;
        characterModel.position.y = -box.min.y;
        characterModel.position.z = -center.z;

        // Normalize character height
        const targetHeight = 1.75;
        const normalizedScale = (targetHeight / Math.max(size.y, 0.001)) * scale;
        characterModel.scale.setScalar(normalizedScale);

        // Face the visitor / camera
        characterModel.rotation.y = 0;

        // Pivot sits at her feet, so the lean never lifts or slides them
        const pivot = new THREE.Group();
        pivot.add(characterModel);
        scene.add(pivot);

        const leanAngle = lean ? LEAN_ANGLE : 0;
        poses = buildPoses(REST_DIRECTIONS, WAVE_DIRECTIONS, tiltsFor(leanAngle, lean ? NECK_TILT : 0));
        applyPose(poses.rest, poses.rest, 0);
        pivot.rotation.z = -leanAngle;

        if (fit) {
          // Fit the posed figure to the frame with a little headroom, feet near the bottom edge
          pivot.updateMatrixWorld(true);
          const posed = new THREE.Box3().setFromObject(pivot);
          const posedSize = posed.getSize(new THREE.Vector3());
          const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
          const distance = Math.max(
            (posedSize.y * 1.06) / 2 / Math.tan(halfFov),
            (posedSize.x * 1.5) / 2 / (Math.tan(halfFov) * camera.aspect)
          );
          camera.position.set(0, posed.min.y + posedSize.y / 2, posed.max.z + distance);
        }

        render();
        if (enableMouseLook) animate();

        // The wave runs at most once per page load, whenever `wave` is (or becomes) true
        startWaveRef.current = () => {
          if (waveStartedRef.current) return;
          waveStartedRef.current = true;
          waving = true;
          clock.start();
          if (!animFrameId) animate();
        };
        if (waveRequestedRef.current) startWaveRef.current();

        setLoading(false);
        if (onLoadedRef.current) onLoadedRef.current(gltf);
      },
      undefined,
      (err) => {
        console.error(`[MiniKhushii] Failed to load GLB from ${resolvedPath}:`, err);
        if (isMounted) {
          setError(err.message || 'Failed to load 3D model');
          setLoading(false);
        }
      }
    );

    // 9. Cleanup on Unmount
    return () => {
      isMounted = false;
      startWaveRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [resolvedPath, width, height, scale, lean, fit, enableMouseLook]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-3 text-center bg-red-50/80 rounded-2xl border border-red-200">
          <p className="text-xs text-red-600 font-mono">Error loading 3D model</p>
        </div>
      )}
    </div>
  );
};

export default MiniKhushii;
