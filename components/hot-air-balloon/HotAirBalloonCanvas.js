'use client';

import { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks';
import { SCENE_COLORS } from '@/constants/three';

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

function createBannerTexture(THREE, text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFF8F0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#B76E79';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
  ctx.fillStyle = '#B76E79';
  ctx.font = 'bold 28px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createBalloon(THREE) {
  const group = new THREE.Group();

  const balloon = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshStandardMaterial({
      color: SCENE_COLORS.balloon,
      roughness: 0.6,
      metalness: 0.1,
    })
  );
  group.add(balloon);

  const accent = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 16, 16),
    new THREE.MeshStandardMaterial({
      color: SCENE_COLORS.balloonAccent,
      transparent: true,
      opacity: 0.65,
    })
  );
  accent.position.set(0.55, 0.25, 0);
  accent.scale.set(1, 1.2, 0.6);
  group.add(accent);

  const peach = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 16, 16),
    new THREE.MeshStandardMaterial({
      color: '#FFDAB9',
      transparent: true,
      opacity: 0.55,
    })
  );
  peach.position.set(-0.45, -0.15, 0.25);
  group.add(peach);

  [-0.3, 0.3].forEach((x) => {
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.8, 4),
      new THREE.MeshStandardMaterial({ color: '#B76E79' })
    );
    rope.position.set(x, -1.3, 0);
    group.add(rope);
  });

  const basket = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.28, 0.38),
    new THREE.MeshStandardMaterial({ color: '#B76E79', roughness: 0.9 })
  );
  basket.position.y = -1.7;
  group.add(basket);

  const bannerTex = createBannerTexture(THREE, 'Happy Birthday Gurleen ❤️');
  const banner = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 0.55),
    new THREE.MeshStandardMaterial({
      map: bannerTex,
      emissive: 0xf7e7ce,
      emissiveIntensity: 0.15,
      side: THREE.DoubleSide,
    })
  );
  banner.position.set(0, -2.45, 0.4);
  group.add(banner);

  [-1.55, 1.55].forEach((x) => {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.55, 4),
      new THREE.MeshStandardMaterial({ color: '#B76E79' })
    );
    pole.position.set(x, -2.45, 0.2);
    group.add(pole);
  });

  return group;
}

function createBird(THREE, startX, startY, startZ, speed) {
  const bird = new THREE.Group();
  bird.position.set(startX, startY, startZ);
  bird.userData = { speed, startX, startY, startZ };

  const wingMat = new THREE.MeshBasicMaterial({ color: '#302B63' });
  const left = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 3), wingMat);
  left.rotation.z = 0.5;
  const right = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 3), wingMat);
  right.rotation.z = -0.5;
  right.position.x = 0.06;
  bird.add(left, right);
  bird.userData.leftWing = left;
  bird.userData.rightWing = right;

  return bird;
}

export default function HotAirBalloonCanvas({ className }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const initScene = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return null;

    const THREE = await import('three');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x302b63, 0.025);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1, 8);

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
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 8;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0xf7e7ce,
          size: 0.03,
          map: new THREE.CanvasTexture(createStarTexture()),
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )
    );

    // Lights
    scene.add(new THREE.AmbientLight(0xc8b6e2, 0.2));
    const sun = new THREE.DirectionalLight(0xf7e7ce, 0.45);
    sun.position.set(5, 8, 5);
    scene.add(sun);
    scene.add(new THREE.HemisphereLight(0xc8b6e2, 0x0f0c29, 0.35));

    // Clouds
    const clouds = [];
    [
      [-5, 0.5, -9],
      [3, 1.2, -10],
      [7, 0, -8],
    ].forEach(([x, y, z]) => {
      const cloud = new THREE.Group();
      cloud.position.set(x, y, z);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x302b63,
        transparent: true,
        opacity: 0.18,
        roughness: 1,
      });
      [[0, 0, 0.55], [0.35, 0.05, 0.4], [-0.3, 0, 0.38]].forEach(
        ([cx, cy, r]) => {
          const s = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 12), mat);
          s.position.set(cx, cy, 0);
          cloud.add(s);
        }
      );
      scene.add(cloud);
      clouds.push(cloud);
    });

    // Balloon
    const balloon = createBalloon(THREE);
    balloon.position.set(-1, 0.5, -2);
    scene.add(balloon);

    // Birds
    const birds = [
      createBird(THREE, -8, 2, -5, 0.7),
      createBird(THREE, -10, 2.8, -6, 0.55),
      createBird(THREE, 6, 1.5, -4, 0.65),
    ];
    birds.forEach((b) => scene.add(b));

    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener('pointermove', onPointerMove);

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
    const baseCamera = { x: 0, y: 1 };

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      const t = (now - startTime) / 1000;

      if (!prefersReducedMotion) {
        camera.position.x =
          baseCamera.x + (pointerX * 0.15 - camera.position.x) * 0.04;
        camera.position.y =
          baseCamera.y + (pointerY * 0.1 - camera.position.y) * 0.04;
        camera.lookAt(0, 0.5, -2);

        balloon.position.x = -1 + Math.sin(t * 0.15) * 2.5;
        balloon.position.y = 0.5 + Math.sin(t * 0.2) * 0.35;
        balloon.rotation.z = Math.sin(t * 0.12) * 0.04;

        clouds.forEach((cloud, i) => {
          cloud.position.x += Math.sin(t * 0.08 + i) * 0.002;
        });

        birds.forEach((bird) => {
          const { speed, startX, startY, startZ } = bird.userData;
          bird.position.x = startX + t * speed * 0.5;
          bird.position.y = startY + Math.sin(t * 3) * 0.12;
          if (bird.position.x > 12) bird.position.x = -12;
          bird.userData.leftWing.rotation.z =
            0.5 + Math.sin(t * 8) * 0.3;
          bird.userData.rightWing.rotation.z =
            -0.5 - Math.sin(t * 8) * 0.3;
        });
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', onPointerMove);
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
      aria-label="Hot air balloon in the sky"
      role="img"
    />
  );
}
