'use client';

import { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks';
import {
  HEART_CONSTELLATION,
  LETTER_G_CONSTELLATION,
  HAPPY_BIRTHDAY_STARS,
  SCENE_COLORS,
} from '@/constants/three';

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

function mapConstellation(points, scale = 3, z = -1) {
  return points.map((p) => ({ x: p.x * scale, y: p.y * scale, z }));
}

export default function StarryNightCanvas({ className, onStarTouch }) {
  const containerRef = useRef(null);
  const onStarTouchRef = useRef(onStarTouch);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    onStarTouchRef.current = onStarTouch;
  }, [onStarTouch]);

  const initScene = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return null;

    const THREE = await import('three');

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f0c29, 0.035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Background star field
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starTexture = new THREE.CanvasTexture(createStarTexture());
    const starMat = new THREE.PointsMaterial({
      color: 0xf7e7ce,
      size: 0.04,
      map: starTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Moon
    const moonGroup = new THREE.Group();
    moonGroup.position.set(3.5, 2, -5);
    const moonGlow = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xf7e7ce,
        transparent: true,
        opacity: 0.12,
      })
    );
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfff8f0,
        emissive: 0xf7e7ce,
        emissiveIntensity: 0.3,
        roughness: 0.8,
      })
    );
    moonGroup.add(moonGlow, moon);
    scene.add(moonGroup);

    const moonLight = new THREE.PointLight(0xf7e7ce, 1.5, 20);
    moonLight.position.copy(moonGroup.position);
    scene.add(moonLight);

    // Ambient + directional
    scene.add(new THREE.AmbientLight(0xc8b6e2, 0.15));
    const dirLight = new THREE.DirectionalLight(0xc8b6e2, 0.3);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Clouds
    const clouds = [];
    const cloudPositions = [
      [-4, 1, -7],
      [2, 1.5, -8],
      [5, 0.5, -6],
    ];
    cloudPositions.forEach(([x, y, z]) => {
      const cloud = new THREE.Group();
      cloud.position.set(x, y, z);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x302b63,
        transparent: true,
        opacity: 0.2,
        roughness: 1,
      });
      [[0, 0, 0, 0.6], [0.4, 0.05, 0, 0.45], [-0.35, 0, 0, 0.4]].forEach(
        ([cx, cy, cz, r]) => {
          const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(r, 12, 12),
            mat
          );
          sphere.position.set(cx, cy, cz);
          cloud.add(sphere);
        }
      );
      scene.add(cloud);
      clouds.push(cloud);
    });

    // Fireflies
    const fireflyCount = 25;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPos = new Float32Array(fireflyCount * 3);
    const fireflyData = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflyPos[i * 3] = (Math.random() - 0.5) * 10;
      fireflyPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      fireflyPos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
      fireflyData.push({
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    fireflyGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(fireflyPos, 3)
    );
    const fireflies = new THREE.Points(
      fireflyGeo,
      new THREE.PointsMaterial({
        color: 0xf7e7ce,
        size: 0.06,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(fireflies);

    // Constellation helper
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    const addConstellationLines = (points, color, closed = false) => {
      const mapped = mapConstellation(points);
      const linePoints = mapped.map(
        (p) => new THREE.Vector3(p.x, p.y, p.z)
      );
      if (closed && linePoints.length) linePoints.push(linePoints[0].clone());
      const geo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.4,
        })
      );
      constellationGroup.add(line);
      return line;
    };

    const addConstellationStars = (points, color, size = 0.06, z = -1) => {
      const meshes = [];
      mapConstellation(points, 3, z).forEach((p) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(size, 12, 12),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 })
        );
        mesh.position.set(p.x, p.y, p.z);
        constellationGroup.add(mesh);
        meshes.push(mesh);
      });
      return meshes;
    };

    addConstellationLines(HEART_CONSTELLATION, SCENE_COLORS.line, true);
    addConstellationLines(LETTER_G_CONSTELLATION, SCENE_COLORS.line);
    const heartMeshes = addConstellationStars(
      HEART_CONSTELLATION,
      SCENE_COLORS.starPink
    );
    const gMeshes = addConstellationStars(
      LETTER_G_CONSTELLATION,
      SCENE_COLORS.starBright,
      0.05,
      -0.5
    );
    const bdayMeshes = addConstellationStars(
      HAPPY_BIRTHDAY_STARS,
      SCENE_COLORS.starDim,
      0.04,
      -0.8
    );

    // Interactive stars
    const interactiveStars = [];
    const interactiveGroup = new THREE.Group();
    scene.add(interactiveGroup);

    for (let i = 0; i < 35; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 10, 10),
        new THREE.MeshBasicMaterial({
          color: SCENE_COLORS.starBright,
          transparent: true,
          opacity: 0.85,
        })
      );
      mesh.position.set(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 1
      );
      mesh.userData.interactive = true;
      interactiveGroup.add(mesh);
      interactiveStars.push(mesh);
    }

    // Sparkle particles pool
    const sparkles = [];
    const sparkleGroup = new THREE.Group();
    scene.add(sparkleGroup);

    const spawnSparkle = (point) => {
      onStarTouchRef.current?.();
      for (let i = 0; i < 10; i++) {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.03, 6, 6),
          new THREE.MeshBasicMaterial({
            color: SCENE_COLORS.starPink,
            transparent: true,
            opacity: 1,
          })
        );
        mesh.position.copy(point);
        mesh.userData.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        );
        mesh.userData.life = 40;
        sparkleGroup.add(mesh);
        sparkles.push(mesh);
      }
    };

    // Raycaster
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
      const hits = raycaster.intersectObjects(interactiveStars);
      if (hits.length > 0) spawnSparkle(hits[0].point);
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('click', onClick);

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation
    let animId;
    const baseCamera = { x: 0, y: 0 };
    const pulseMeshes = [...heartMeshes, ...gMeshes, ...bdayMeshes];
    const startTime = performance.now();

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      const t = (now - startTime) / 1000;

      if (!prefersReducedMotion) {
        // Camera parallax
        camera.position.x += (pointerX * 0.4 - camera.position.x) * 0.04;
        camera.position.y += (pointerY * 0.3 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        // Moon pulse
        const moonPulse = 1 + Math.sin(t * 0.8) * 0.06;
        moonGlow.scale.setScalar(moonPulse);
        moonGlow.material.opacity = 0.1 + Math.sin(t * 0.8) * 0.04;

        // Clouds drift
        clouds.forEach((cloud, i) => {
          cloud.position.x += Math.sin(t * 0.1 + i) * 0.001;
        });

        // Fireflies
        const fp = fireflies.geometry.attributes.position.array;
        for (let i = 0; i < fireflyCount; i++) {
          const d = fireflyData[i];
          fp[i * 3] += Math.sin(t * d.speed + d.offset) * 0.002;
          fp[i * 3 + 1] += Math.cos(t * d.speed * 0.8 + d.offset) * 0.002;
        }
        fireflies.geometry.attributes.position.needsUpdate = true;

        // Constellation pulse
        pulseMeshes.forEach((mesh, i) => {
          const s = 1 + Math.sin(t * 2 + i) * 0.2;
          mesh.scale.setScalar(s);
        });

        // Interactive star hover via raycaster
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(interactiveStars);
        interactiveStars.forEach((star) => {
          const isHit = hits.some((h) => h.object === star);
          star.material.color.set(
            isHit ? SCENE_COLORS.starPink : SCENE_COLORS.starBright
          );
          star.scale.setScalar(isHit ? 1.6 : 1);
        });
      }

      // Sparkle update
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.userData.life -= 1;
        s.position.add(s.userData.velocity);
        s.material.opacity = s.userData.life / 40;
        if (s.userData.life <= 0) {
          sparkleGroup.remove(s);
          s.geometry.dispose();
          s.material.dispose();
          sparkles.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      fireflyGeo.dispose();
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
      className={cn('relative h-full w-full cursor-crosshair', className)}
      aria-label="Interactive starry night sky"
      role="img"
    />
  );
}
