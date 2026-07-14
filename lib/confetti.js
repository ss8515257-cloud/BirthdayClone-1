import confetti from 'canvas-confetti';

export function fireConfetti(options = {}) {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#E8A0BF', '#C8B6E2', '#F7E7CE', '#FFDAB9', '#D4BBFC'],
  };

  confetti({ ...defaults, ...options });
}

export function fireFireworks() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#E8A0BF', '#F7E7CE', '#C8B6E2'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#E8A0BF', '#F7E7CE', '#C8B6E2'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export function fireRosePetals() {
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { y: 0 },
    colors: ['#E8A0BF', '#B76E79', '#F8E8EE'],
    gravity: 0.5,
    scalar: 1.2,
    shapes: ['circle'],
    ticks: 300,
  });
}

export function fireGoldenParticles() {
  confetti({
    particleCount: 80,
    spread: 120,
    origin: { y: 0.5 },
    colors: ['#F7E7CE', '#FFDAB9', '#E8A0BF'],
    gravity: 0.3,
    scalar: 0.8,
    ticks: 200,
  });
}

export function fireGiftExplosion() {
  fireConfetti({ particleCount: 150, spread: 100 });
  setTimeout(() => fireRosePetals(), 300);
  setTimeout(() => fireGoldenParticles(), 600);
  setTimeout(() => fireFireworks(), 900);
}
