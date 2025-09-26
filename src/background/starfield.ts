import '../background/starfield.css';

type Star = {
  x: number;
  y: number;
  z: number;
  radius: number;
};

const STAR_COUNT_BASE = 140;
const MAX_SCROLL_VELOCITY = 0.7;
const MIN_SCROLL_VELOCITY = 0.18;
const EASING = 0.06;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const stars: Star[] = [];

let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;
let frameId: number | null = null;
let width = 0;
let height = 0;
let speed = MIN_SCROLL_VELOCITY;
let targetSpeed = MIN_SCROLL_VELOCITY;

function createCanvas() {
  if (canvas) {
    return canvas;
  }

  canvas = document.createElement('canvas');
  canvas.id = 'bg-starfield';
  canvas.setAttribute('aria-hidden', 'true');
  if (prefersReducedMotion.matches) {
    canvas.classList.add('is-static');
  }
  document.body.insertBefore(canvas, document.body.firstChild);
  context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to acquire canvas context for starfield');
  }

  return canvas;
}

function setupStars() {
  if (!canvas || !context) {
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (typeof context.resetTransform === 'function') {
    context.resetTransform();
  } else {
    context.setTransform(1, 0, 0, 1, 0, 0);
  }
  context.scale(dpr, dpr);

  const density = Math.ceil((width * height) / 2200);
  const desiredCount = Math.min(STAR_COUNT_BASE + density, 420);

  stars.length = 0;
  for (let i = 0; i < desiredCount; i += 1) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1.2 + 0.1,
      radius: Math.random() * 1.2 + 0.1,
    });
  }

  context.fillStyle = '#ffffff';
  context.shadowColor = 'rgba(110, 163, 255, 0.55)';
  context.shadowBlur = 1.5;
}

function drawStaticField() {
  if (!context) {
    return;
  }

  context.clearRect(0, 0, width, height);
  context.globalAlpha = 0.7;
  for (const star of stars) {
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
}

function updateTargetSpeed() {
  const scrollY = window.scrollY;
  const docHeight = Math.max(document.body.scrollHeight, 1);
  const progress = Math.min(scrollY / docHeight, 1);
  targetSpeed = MIN_SCROLL_VELOCITY + progress * (MAX_SCROLL_VELOCITY - MIN_SCROLL_VELOCITY);
}

function animate() {
  if (!context) {
    return;
  }

  frameId = window.requestAnimationFrame(animate);
  speed += (targetSpeed - speed) * EASING;

  context.clearRect(0, 0, width, height);
  context.globalAlpha = 0.85;

  for (const star of stars) {
    star.y += speed * star.z * 2.4;
    star.x += Math.sin((star.y / height) * Math.PI) * 0.08;

    if (star.y > height + 12) {
      star.y = -10;
      star.x = Math.random() * width;
      star.z = Math.random() * 1.2 + 0.1;
      star.radius = Math.random() * 1.1 + 0.1;
    }

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 1;
}

function enableStaticMode() {
  if (!canvas) {
    return;
  }

  canvas.classList.add('is-static');
  if (frameId) {
    window.cancelAnimationFrame(frameId);
    frameId = null;
  }
  drawStaticField();
}

function enableAnimatedMode() {
  if (!canvas) {
    return;
  }

  canvas.classList.remove('is-static');
  if (frameId) {
    window.cancelAnimationFrame(frameId);
  }
  updateTargetSpeed();
  speed = targetSpeed;
  animate();
}

function handleMotionPreference(event: MediaQueryListEvent | MediaQueryList) {
  if (event.matches) {
    enableStaticMode();
  } else {
    enableAnimatedMode();
  }
}

export function initStarfield() {
  if (document.getElementById('bg-starfield')) {
    return;
  }

  createCanvas();
  setupStars();

  if (!canvas) {
    return;
  }

  if (prefersReducedMotion.matches) {
    enableStaticMode();
  } else {
    enableAnimatedMode();
  }

  window.addEventListener('resize', () => {
    const wasStatic = prefersReducedMotion.matches;
    setupStars();
    if (wasStatic) {
      drawStaticField();
    }
  });

  window.addEventListener('scroll', () => {
    if (!prefersReducedMotion.matches) {
      updateTargetSpeed();
    }
  }, { passive: true });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', handleMotionPreference);
  } else {
    prefersReducedMotion.addListener(handleMotionPreference);
  }
}

