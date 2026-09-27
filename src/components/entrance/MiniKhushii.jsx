import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * MiniKhushii Component
 *
 * Reusable 3D character component rendering the real rigged Mini Khushii GLB model.
 * Preserves all original materials, textures, skinning, and skeleton.
 * Plays the embedded 'Idle' animation clip automatically.
 */
export const MiniKhushii = ({
  modelPath,
  animationName = 'Idle',
  width = 360,
  height = 420,
  scale = 0.53,
  className = '',
  enableMouseLook = true,
  onLoaded
}) => {
  const containerRef = useRef(null);
  const onLoadedRef = useRef(onLoaded);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  // Path to the actual GLB file
  const resolvedPath =
    modelPath || `${import.meta.env.BASE_URL}models/rigged-model.glb`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animFrameId = null;
    let mixer = null;
    let characterModel = null;
    let waveAction = null;
    let idleAction = null;
    let handleAnimationFinished = null;
    let crossfadeTimer = null;
    const clock = new THREE.Clock();

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

    // 5. GLTF Model Loading
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
        });

        // Compute Bounding Box to center the character naturally
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

        scene.add(characterModel);

        // 6. Animation Setup: Play Wave once, then crossfade into looping Idle
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(characterModel);

          const findClipByName = (name) =>
            gltf.animations.find(
              (clip) => clip.name.toLowerCase() === name.toLowerCase()
            );

          const waveClip = findClipByName('Wave');
          const idleClip = findClipByName(animationName);
          const CROSSFADE_DURATION = 0.35;

          if (idleClip) {
            idleAction = mixer.clipAction(idleClip);
            idleAction.setLoop(THREE.LoopRepeat, Infinity);
            idleAction.clampWhenFinished = false;
          } else {
            console.warn(
              `[MiniKhushii] Animation clip "${animationName}" was not found. ` +
              'The character will remain on the final Wave pose.'
            );
          }

          const playIdle = (fromAction = null) => {
            if (!idleAction) return;

            idleAction
              .reset()
              .setEffectiveTimeScale(1)
              .setEffectiveWeight(1)
              .play();

            if (fromAction) {
              fromAction.crossFadeTo(idleAction, CROSSFADE_DURATION, false);
              crossfadeTimer = window.setTimeout(() => {
                if (!isMounted) return;
                fromAction.stop();
                fromAction.enabled = false;
              }, CROSSFADE_DURATION * 1000);
            }
          };

          if (waveClip) {
            waveAction = mixer.clipAction(waveClip);
            waveAction
              .reset()
              .setEffectiveTimeScale(1)
              .setEffectiveWeight(1)
              .setLoop(THREE.LoopOnce, 1);
            waveAction.clampWhenFinished = true;

            handleAnimationFinished = (event) => {
              if (event.action !== waveAction) return;

              mixer.removeEventListener('finished', handleAnimationFinished);
              handleAnimationFinished = null;
              playIdle(waveAction);
            };

            mixer.addEventListener('finished', handleAnimationFinished);
            waveAction.play();
          } else {
            console.warn(
              '[MiniKhushii] Animation clip "Wave" was not found. Falling back to Idle.'
            );
            playIdle();
          }
        }

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

    // 7. Subtle Mouse Parallax
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e) => {
      if (!enableMouseLook) return;
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.35; // gentle turn toward cursor
      targetRotX = ny * 0.12; // subtle tilt
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Animation & Render Loop
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }

      if (characterModel && enableMouseLook) {
        characterModel.rotation.y += (targetRotY - characterModel.rotation.y) * 0.06;
        characterModel.rotation.x += (targetRotX - characterModel.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (crossfadeTimer) window.clearTimeout(crossfadeTimer);

      if (mixer) {
        if (handleAnimationFinished) {
          mixer.removeEventListener('finished', handleAnimationFinished);
        }
        mixer.stopAllAction();
        if (characterModel) mixer.uncacheRoot(characterModel);
      }

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
  }, [resolvedPath, animationName, width, height, scale, enableMouseLook]);

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
