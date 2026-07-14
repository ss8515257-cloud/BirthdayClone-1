'use client';

import { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks';
import { LANTERN_POSITIONS, SCENE_COLORS } from '@/constants/three';
import { LANTERN_MESSAGES } from '@/constants/content';

function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(247,231,206,0.8)');
  gradient.addColorStop(1, 'rgba(247,231,206,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return canvas;
}

function createLantern(THREE, message, index) {
  const group = new THREE.Group();
  group.userData = { message, index, revealed: false };

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: SCENE_COLORS.lanternGlow,
      transparent: true,
      opacity: 0.15,
    })
  );
  group.add(glow);

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.25, 0.4, 12),
    new THREE.MeshStandardMaterial({
      color: SCENE_COLORS.lantern,
      emissive: SCENE_COLORS.lanternGlow,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.95,
    })
  );
  group.add(body);

  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.2, 0.06, 12),
    new THREE.MeshStandardMaterial({ color: '#B76E79' })
  );
  top.position.y = 0.22;
  group.add(top);

  const bottom = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 0.04, 12),
    new THREE.MeshStandardMaterial({ color: '#B76E79' })
  );
  bottom.position.y = -0.22;
  group.add(bottom);

  const flame = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 8, 8),
    new THREE.MeshBasicMaterial({ color: '#FFDAB9' })
  );
  group.add(flame);

  const light = new THREE.PointLight(SCENE_COLORS.lanternGlow, 0.8, 3);
  group.add(light);

  group.userData.glow = glow;
  group.userData.light = light;

  return group;
}

export default function LanternsCanvas({ className, onLanternReveal }) {
  const containerRef = useRef(null);
  const onRevealRef = useRef(onLanternReveal);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    onRevealRef.current = onLanternReveal;
  }, [onLanternReveal]);

  const initScene = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return null;

    const THREE = await import('three');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f0c29, 0.04);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Stars
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0xf7e7ce,
        size: 0.035,
        map: new THREE.CanvasTexture(createStarTexture()),
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(stars);

    // Moon
    const moonGroup = new THREE.Group();
    moonGroup.position.set(4, 2.5, -6);
    moonGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0xfff8f0,
          emissive: 0xf7e7ce,
          emissiveIntensity: 0.35,
        })
      )
    );
    scene.add(moonGroup);
    scene.add(new THREE.AmbientLight(0xc8b6e2, 0.12));
    scene.add(new THREE.PointLight(0xf7e7ce, 1.2, 20).translateX(4).translateY(2.5).translateZ(-6));

    // Lanterns
    const lanterns = [];
    LANTERN_POSITIONS.forEach((pos, i) => {
      const lantern = createLantern(
        THREE,
        LANTERN_MESSAGES[i % LANTERN_MESSAGES.length],
        i
      );
      lantern.position.set(pos.x, pos.y, pos.z);
      lantern.userData.startY = pos.y;
      lantern.userData.speed = pos.speed;
      lantern.userData.driftX = pos.x;
      scene.add(lantern);
      lanterns.push(lantern);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.set(pointerX, pointerY);
    };

    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(lanterns, true);
      if (hits.length > 0) {
        let target = hits[0].object;
        while (target.parent && !target.userData.message) {
          target = target.parent;
        }
        if (target.userData.message && !target.userData.revealed) {
          target.userData.revealed = true;
          onRevealRef.current?.(target.userData.message);
          if (target.userData.glow) {
            target.userData.glow.material.opacity = 0.4;
          }
          if (target.userData.light) {
            target.userData.light.intensity = 2;
          }
          setTimeout(() => {
            target.userData.revealed = false;
            if (target.userData.glow) {
              target.userData.glow.material.opacity = 0.15;
            }
            if (target.userData.light) {
              target.userData.light.intensity = 0.8;
            }
          }, 3000);
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('click', onClick);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let animId;
    const startTime = performance.now();

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      const t = (now - startTime) / 1000;

      if (!prefersReducedMotion) {
        camera.position.x += (pointerX * 0.25 - camera.position.x) * 0.04;
        camera.position.y += (pointerY * 0.2 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        lanterns.forEach((lantern) => {
          const { startY, speed, driftX, index } = lantern.userData;
          lantern.position.y = startY + ((t * speed + index) % 8) - 2;
          lantern.position.x = driftX + Math.sin(t * 0.5 + index) * 0.3;

          const pulse = 0.15 + Math.sin(t * 2 + index) * 0.08;
          if (lantern.userData.glow) {
            lantern.userData.glow.material.opacity = lantern.userData.revealed
              ? 0.45
              : pulse;
          }
        });

        moonGroup.rotation.y = Math.sin(t * 0.1) * 0.1;
      }

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(lanterns, true);
      container.style.cursor = hits.length > 0 ? 'pointer' : 'default';

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      starGeo.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let cleanup = null;
    initScene().then((fn) => {
      cleanup = fn;
    });
    return () => cleanup?.();
  }, [initScene]);

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full', className)}
      aria-label="Interactive floating lanterns"
      role="img"
    />
  );
}
