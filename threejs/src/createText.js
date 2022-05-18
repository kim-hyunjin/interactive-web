import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import Stats from "three/examples/jsm/libs/stats.module";

THREE.Cache.enabled = true;

let container, stats;
let camera, cameraTarget, scene, renderer;
let group, textMesh, textMirrorMesh, textGeo, materials;

let text = "hashlike",
  bevelEnabled = true,
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold

const height = 20,
  size = 70,
  hover = 30,
  curveSegments = 4,
  bevelThickness = 2,
  bevelSize = 1.5;

const mirror = true;

const fontMap = {
  helvetiker: 0,
  optimer: 1,
  gentilis: 2,
  "droid/droid_sans": 3,
  "droid/droid_serif": 4,
};

const weightMap = {
  regular: 0,
  bold: 1,
};

const reverseFontMap = [];
const reverseWeightMap = [];

for (const i in fontMap) reverseFontMap[fontMap[i]] = i;
for (const i in weightMap) reverseWeightMap[weightMap[i]] = i;

let targetRotation = 0;
let targetRotationOnPointerDown = 0;

let pointerX = 0;
let pointerXOnPointerDown = 0;

let windowHalfX = window.innerWidth / 2;

let fontIndex = 1;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  // RENDERER

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // STATS

  stats = new Stats();
  container.appendChild(stats.dom);

  // CAMERA

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
  camera.position.set(0, 400, 700);
  cameraTarget = new THREE.Vector3(0, 150, 0);

  // SCENE

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ];

  /**
   * This is almost identical to an Object3D.
   * Its purpose is to make working with groups of objects syntactically clearer.
   */
  group = new THREE.Group();
  group.position.y = 100;
  scene.add(group);

  loadFont();
  setBackgoundToScene();
  setLightToScene();
  setEventHandlers();
}

/**
 * Class for loading a font in JSON format.
 * Returns a font, which is an array of Shapes representing the font.
 * This uses the FileLoader internally for loading files.
 */
function loadFont() {
  const loader = new FontLoader();
  loader.load("../fonts/" + fontName + "_" + fontWeight + ".typeface.json", function (response) {
    font = response;

    refreshText();
  });
}

/**
 * https://threejs.org/docs/index.html#examples/en/geometries/TextGeometry
 *
 * If you prefer to work purely in THREE.js or
 * to create procedural and dynamic 3D text geometries,
 * you can create a mesh whose geometry is an instance of THREE.TextGeometry
 *
 * TextGeometry will need an instance of THREE.Font to be set on its "font" parameter.
 *
 * TextGeometry uses typeface.json generated fonts.
 * http://gero3.github.io/facetype.js/
 */
function createText() {
  textGeo = new TextGeometry(text, {
    font,
    size,
    height,
    curveSegments,
    bevelThickness,
    bevelSize,
    bevelEnabled,
  });

  textGeo.computeBoundingBox();

  const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

  textMesh = new THREE.Mesh(textGeo, materials);

  textMesh.position.x = centerOffset;
  textMesh.position.y = hover;
  textMesh.position.z = 0;

  textMesh.rotation.x = 0;
  textMesh.rotation.y = Math.PI * 2;

  group.add(textMesh);

  if (mirror) {
    textMirrorMesh = new THREE.Mesh(textGeo, materials);

    textMirrorMesh.position.x = centerOffset;
    textMirrorMesh.position.y = -hover;
    textMirrorMesh.position.z = height;

    textMirrorMesh.rotation.x = Math.PI;
    textMirrorMesh.rotation.y = Math.PI * 2;

    group.add(textMirrorMesh);
  }
}

function refreshText() {
  group.remove(textMesh);
  if (mirror) group.remove(textMirrorMesh);

  if (!text) return;

  createText();
}

function setBackgoundToScene() {
  const plane = new THREE.Mesh(
    /** A class for generating plane geometries. */
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
  );
  plane.position.y = 100;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);
}

function setLightToScene() {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);
}

function setEventHandlers() {
  container.style.touchAction = "none";
  container.addEventListener("pointerdown", onPointerDown);

  document.getElementById("color").addEventListener("click", function () {
    pointLight.color.setHSL(Math.random(), 1, 0.5);
  });

  document.getElementById("font").addEventListener("click", function () {
    fontIndex++;

    fontName = reverseFontMap[fontIndex % reverseFontMap.length];

    loadFont();
  });

  document.getElementById("weight").addEventListener("click", function () {
    if (fontWeight === "bold") {
      fontWeight = "regular";
    } else {
      fontWeight = "bold";
    }

    loadFont();
  });

  document.getElementById("bevel").addEventListener("click", function () {
    bevelEnabled = !bevelEnabled;

    refreshText();
  });

  window.addEventListener("resize", onWindowResize);
}

// event handler

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown = event.clientX - windowHalfX;
  targetRotationOnPointerDown = targetRotation;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  pointerX = event.clientX - windowHalfX;

  targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  group.rotation.y += (targetRotation - group.rotation.y) * 0.05;

  camera.lookAt(cameraTarget);

  renderer.clear();
  renderer.render(scene, camera);
}
