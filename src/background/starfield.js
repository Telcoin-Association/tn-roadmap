const MAX_DEVICE_PIXEL_RATIO = 2;
const BASE_STAR_DENSITY = 0.00018;
const BASE_VELOCITY = 0.035;
const MIN_VELOCITY = 0.015;
const MAX_VELOCITY = 0.18;
const SCROLL_VELOCITY_SCALE = 0.00035;
const VELOCITY_EASING = 0.085;
const TWINKLE_SPEED = 0.0018;
const STAR_BASE_SIZE = 0.6;
const STAR_SIZE_VARIATION = 1.1;
const STAR_DEPTH_VARIATION = 0.8;
const STAR_MARGIN = 24;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, factor) => start + (end - start) * factor;

function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-starfield';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.classList.add('is-hidden');
  document.body.prepend(canvas);
  return canvas;
}

function drawStaticGradient(context, width, height) {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(7, 12, 26, 0.96)');
  gradient.addColorStop(0.5, 'rgba(11, 18, 38, 0.92)');
  gradient.addColorStop(1, 'rgba(6, 11, 25, 0.98)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.restore();
}

function createStarField(width, height) {
  const starCount = Math.ceil(width * height * BASE_STAR_DENSITY);
  const stars = new Array(starCount).fill(null).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    depth: Math.random() * STAR_DEPTH_VARIATION + (1 - STAR_DEPTH_VARIATION),
    size: STAR_BASE_SIZE + Math.random() * STAR_SIZE_VARIATION,
    twinkleOffset: Math.random() * Math.PI * 2
  }));

  return stars;
}

export function initStarfield() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  if (document.getElementById('bg-starfield')) {
    return () => {};
  }

  const canvas = createCanvas();
  const context = canvas.getContext('2d');

  if (!context) {
    canvas.remove();
    return () => {};
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const addMotionListener = (listener) => {
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', listener);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(listener);
    }
  };

  const removeMotionListener = (listener) => {
    if (typeof motionQuery.removeEventListener === 'function') {
      motionQuery.removeEventListener('change', listener);
    } else if (typeof motionQuery.removeListener === 'function') {
      motionQuery.removeListener(listener);
    }
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let animationFrame = 0;
  let lastTimestamp = 0;
  let lastScrollY = window.scrollY || 0;
  let scrollDirection = 1;
  let velocity = BASE_VELOCITY;
  let targetVelocity = BASE_VELOCITY;
  let isAnimating = !motionQuery.matches;

  const setStaticState = (isStatic) => {
    canvas.classList.toggle('is-static', isStatic);
    if (isStatic) {
      canvas.classList.remove('is-hidden');
      drawStaticGradient(context, width, height);
    }
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = clamp(window.devicePixelRatio || 1, 1, MAX_DEVICE_PIXEL_RATIO);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = createStarField(width, height);

    if (!isAnimating) {
      drawStaticGradient(context, width, height);
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY || 0;
    const deltaY = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    scrollDirection = deltaY >= 0 ? 1 : -1;
    const adjustedVelocity = BASE_VELOCITY + Math.min(Math.abs(deltaY) * SCROLL_VELOCITY_SCALE, MAX_VELOCITY - BASE_VELOCITY);
    targetVelocity = clamp(adjustedVelocity, MIN_VELOCITY, MAX_VELOCITY);
  };

  const render = (timestamp) => {
    if (!isAnimating) {
      return;
    }

    const delta = Math.min(timestamp - lastTimestamp, 48);
    lastTimestamp = timestamp;

    velocity = lerp(velocity, targetVelocity, VELOCITY_EASING);

    context.clearRect(0, 0, width, height);

    const timeFactor = delta * 0.06 * scrollDirection;

    for (const star of stars) {
      const depthSpeed = velocity * (0.45 + star.depth * 1.1);
      star.y += depthSpeed * timeFactor;

      if (scrollDirection >= 0 && star.y - STAR_MARGIN > height) {
        star.y = -STAR_MARGIN;
        star.x = Math.random() * width;
      } else if (scrollDirection < 0 && star.y + STAR_MARGIN < 0) {
        star.y = height + STAR_MARGIN;
        star.x = Math.random() * width;
      }

      const twinkle = 0.75 + Math.sin(timestamp * TWINKLE_SPEED + star.twinkleOffset) * 0.25;
      const radius = star.size * twinkle;

      context.globalAlpha = 0.35 + star.depth * 0.55;
      context.beginPath();
      context.fillStyle = 'rgba(255, 255, 255, 0.9)';
      context.arc(star.x, star.y, radius, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 1;

    animationFrame = window.requestAnimationFrame(render);
  };

  const start = () => {
    if (!isAnimating) {
      return;
    }

    canvas.classList.remove('is-hidden');
    lastTimestamp = performance.now();
    animationFrame = window.requestAnimationFrame(render);
  };

  const stop = () => {
    window.cancelAnimationFrame(animationFrame);
    drawStaticGradient(context, width, height);
  };

  const handleMotionPreferenceChange = (event) => {
    isAnimating = !event.matches;
    setStaticState(!isAnimating);

    if (isAnimating) {
      start();
    } else {
      stop();
    }
  };

  resize();
  setStaticState(!isAnimating);

  if (isAnimating) {
    start();
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  addMotionListener(handleMotionPreferenceChange);

  handleScroll();

  return () => {
    window.cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', handleScroll);
    removeMotionListener(handleMotionPreferenceChange);
    canvas.remove();
  };
}
