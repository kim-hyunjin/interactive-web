import * as THREE from "three";

import { TWEEN } from "../libs/tween.module.min.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer.js";

let camera, scene, renderer;
let controls;

const particlesTotal = 512;
const positions = {
  plane: [],
  cube: [],
  random: [],
  sphere: [],
};
const objects = [];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(600, 400, 1500);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  prepareSprites();
  console.log(positions);

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}

function prepareSprites() {
  const image = document.createElement("img");
  image.addEventListener("load", function () {
    for (let i = 0; i < particlesTotal; i++) {
      createSpriteObject(image);
      setPositions(i);
    }
    transition();
  });
  image.src = "../textures/sprite.png";
}

function createSpriteObject(image) {
  const object = new CSS3DSprite(image.cloneNode());
  object.position.x = Math.random() * 4000 - 2000;
  object.position.y = Math.random() * 4000 - 2000;
  object.position.z = Math.random() * 4000 - 2000;
  scene.add(object);

  objects.push(object);
}

function setPositions(index) {
  setPlanePosition(index);
  setCubePosition(index);
  setRandomPosition();
  setSpherePosition(index);
}

function setPlanePosition(i) {
  const amountX = 16;
  const amountZ = 32;
  const separationPlane = 150;
  const offsetX = ((amountX - 1) * separationPlane) / 2;
  const offsetZ = ((amountZ - 1) * separationPlane) / 2;

  const x = (i % amountX) * separationPlane;
  const z = Math.floor(i / amountX) * separationPlane;
  const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;

  positions.plane.push(x - offsetX, y, z - offsetZ);
}

function setCubePosition(i) {
  const amount = 8;
  const separationCube = 150;
  const offset = ((amount - 1) * separationCube) / 2;

  const x = (i % amount) * separationCube;
  const y = Math.floor((i / amount) % amount) * separationCube;
  const z = Math.floor(i / (amount * amount)) * separationCube;

  positions.cube.push(x - offset, y - offset, z - offset);
}

function setRandomPosition() {
  positions.random.push(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000);
}

function setSpherePosition(i) {
  const radius = 750;

  const phi = Math.acos(-1 + (2 * i) / particlesTotal);
  const theta = Math.sqrt(particlesTotal * Math.PI) * phi;

  positions.sphere.push(
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

let current = 0;
const positionKey = Object.keys(positions);
const duration = 2000;
function transition() {
  const position = positions[positionKey[current]];

  for (let i = 0, j = 0; i < particlesTotal; i++, j += 3) {
    const object = objects[i];

    new TWEEN.Tween(object.position)
      .to(
        {
          x: position[j],
          y: position[j + 1],
          z: position[j + 2],
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 3)
    .onComplete(transition)
    .start();

  current = (current + 1) % 4;
}

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();
  controls.update();

  updateObjectScale();

  renderer.render(scene, camera);
}

function updateObjectScale() {
  const time = performance.now();
  for (const object of objects) {
    const scale = Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1; // 0.7 ~ 1.3
    object.scale.set(scale, scale, scale);
  }
}
