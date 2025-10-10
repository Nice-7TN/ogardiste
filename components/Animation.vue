<script setup lang="ts">
import { useDialogStore } from "~/store/dialog";

// Variables
const coordinatesXRocket = ref(35);
const coordinatesXSattelite = ref(90);
const earth = ref(true);
const jupiter = ref(true);
const mars = ref(true);
const intervalEarth = ref<null | ReturnType<typeof setInterval>>(null);
const intervalExplosion = ref<ReturnType<typeof setInterval>[]>([]);
const particlesExplosion = ref<
  { id: number; x: number; y: number; dx: number; dy: number }[]
>([]);
const particlesExplosionClick = ref(false);

// Methods
const generateParticles = (x: number, y: number) => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: x,
    y: y,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
  }));
};

const animateElements = () => {
  // Particle animation
  particlesExplosion.value = particlesExplosion.value
    .map((p) => ({
      ...p,
      y: p.y + p.dy,
      x: p.x + p.dx,
    }))
    .filter((p) => p.y > 0 && p.y < 600 && p.x > 0 && p.x < 1000);
};

const getSVGCoordinates = (event: MouseEvent) => {
  const svg = event.currentTarget as SVGSVGElement;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const svgPoint = point.matrixTransform(ctm.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  }
  return { x: 0, y: 0 };
};

const handleClick = (event: MouseEvent) => {
  const { x, y } = getSVGCoordinates(event);
  particlesExplosionClick.value = true;
  particlesExplosion.value = generateParticles(x, y);
  intervalExplosion.value.push(setInterval(animateElements, 50));
  setTimeout(() => {
    intervalExplosion.value.shift();
    particlesExplosionClick.value = false;
  }, 1500);
};

const destroyPlanetEarth = () => {
  intervalEarth.value = setInterval(() => {
    if (coordinatesXRocket.value < -200 && earth.value === false) {
      earth.value = true;
    } else if (earth.value === true && coordinatesXRocket.value < 35) {
      coordinatesXRocket.value += 0.5;
      coordinatesXSattelite.value += 0.5;
    } else if (
      earth.value === true &&
      coordinatesXRocket.value === 35 &&
      intervalEarth.value
    ) {
      clearInterval(intervalEarth.value);
      intervalEarth.value = null;
      coordinatesXSattelite.value = 90;
    } else {
      coordinatesXRocket.value -= 0.5;
      coordinatesXSattelite.value -= 0.5;
    }
  }, 50);
};

// Watchers
watch(
  () => earth.value,
  () => {
    destroyPlanetEarth();
  }
);

watch(
  () => jupiter.value,
  () => {
    setTimeout(function () {
      jupiter.value = true;
    }, 5000);
  }
);

watch(
  () => mars.value,
  () => {
    setTimeout(function () {
      mars.value = true;
    }, 5000);
  }
);
</script>

<template>
  <svg class="background-animation" viewBox="0 0 1000 600" @click="handleClick">
    <circle
      v-if="particlesExplosionClick"
      v-for="particle in particlesExplosion"
      :key="particle.id"
      :cx="particle.x"
      :cy="particle.y"
      r="2"
      class="particles"
      fill="#ffd700"
    />
    <g v-if="!useDialogStore().dialogChat">
      <!-- Satellites -->
      <image
        :x="coordinatesXSattelite"
        y="20"
        width="15"
        height="60"
        href="/images/satellite.svg"
        class="satellite"
      />
      <!-- Rotating rockets-->
      <image
        :x="coordinatesXRocket"
        y="60"
        width="30"
        href="/images/rocket.svg"
        class="rocket"
      />
      <image
        x="340"
        y="250"
        width="65"
        href="/images/rocket.svg"
        class="rocket"
      />
      <!-- Planets -->
      <image
        v-if="earth"
        x="160"
        y="130"
        width="76"
        href="/images/earth.svg"
        @click="earth = false"
      />
      <image
        v-if="mars"
        x="320"
        y="250"
        width="40"
        href="/images/mars.svg"
        class="mars"
        @click="mars = false"
      />
      <image
        v-if="jupiter"
        x="500"
        y="500"
        width="50"
        href="/images/jupiter.svg"
        class="jupiter"
        @click="jupiter = false"
      />
    </g>
  </svg>
</template>
