import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

let gui;

let camera, scene, renderer, labelRenderer;

const layers = {
  "Toggle Name": function () {
    camera.layers.toggle(0);
  },
  "Toggle Mass": function () {
    camera.layers.toggle(1);
  },
  "Enable All": function () {
    camera.layers.enableAll();
  },

  "Disable All": function () {
    camera.layers.disableAll();
  },
};

const clock = new THREE.Clock();

/**
 * TextureLoader
 *
 * Class for loading a texture. This uses the ImageLoader internally for loading files.
 */
const textureLoader = new THREE.TextureLoader();

let earth;
let moon;
const EARTH_RADIUS = 1;
const MOON_RADIUS = 0.27;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(10, 5, 20);
  camera.layers.enableAll();
  camera.layers.toggle(1);

  scene = new THREE.Scene();

  // renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  document.body.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, labelRenderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 100;

  /**
   * An axis object to visualize the 3 axes in a simple way.
   * The X axis is red. The Y axis is green. The Z axis is blue.
   */
  const axesHelper = new THREE.AxesHelper(5);
  axesHelper.layers.enableAll();
  scene.add(axesHelper);

  setLightToScene();
  setEarthToScene();
  setMoonToScene();
  setLabels();
  initGui();

  window.addEventListener("resize", onWindowResize);
}

function setLightToScene() {
  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(1, 0.5, 1);
  dirLight.layers.enableAll();
  scene.add(dirLight);
}

/**
 * https://threejs.org/docs/index.html?q=MeshPhongMaterial#api/en/materials/MeshPhongMaterial
 *
 * MeshPhongMaterial
 * A material for shiny surfaces with specular highlights.
 *
 * The material uses a non-physically based Blinn-Phong model for calculating reflectance.
 * Unlike the Lambertian model used in the MeshLambertMaterial
 * this can simulate shiny surfaces with specular highlights (such as varnished wood).
 */

function setEarthToScene() {
  const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
  const earthMaterial = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: textureLoader.load("../textures/planets/earth_atmos_2048.jpg"),
    specularMap: textureLoader.load("../textures/planets/earth_specular_2048.jpg"),
    normalMap: textureLoader.load("../textures/planets/earth_normal_2048.jpg"),
    normalScale: new THREE.Vector2(0.85, 0.85),
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  earth.layers.enableAll();
}

function setMoonToScene() {
  const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
  const moonMaterial = new THREE.MeshPhongMaterial({
    shininess: 5,
    map: textureLoader.load("../textures/planets/moon_1024.jpg"),
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);

  moon.layers.enableAll();
}

function setLabels() {
  const earthLabel = createLabel("Earth");
  earthLabel.position.set(0, EARTH_RADIUS, 0);
  earth.add(earthLabel);
  earthLabel.layers.set(0);

  const earthMassLabel = createLabel("5.97237e24 kg");
  earthMassLabel.position.set(0, -2 * EARTH_RADIUS, 0);
  earth.add(earthMassLabel);
  earthMassLabel.layers.set(1);

  const moonLabel = createLabel("Moon");
  moonLabel.position.set(0, MOON_RADIUS, 0);
  moon.add(moonLabel);
  moonLabel.layers.set(0);

  const moonMassLabel = createLabel("7.342e22 kg");
  moonMassLabel.position.set(0, -2 * MOON_RADIUS, 0);
  moon.add(moonMassLabel);
  moonMassLabel.layers.set(1);
}

function createLabel(text) {
  const div = document.createElement("div");
  div.className = "label";
  div.textContent = text;
  div.style.marginTop = "-1em";

  const label = new CSS2DObject(div);
  return label;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

//

function initGui() {
  gui = new GUI();

  gui.add(layers, "Toggle Name");
  gui.add(layers, "Toggle Mass");
  gui.add(layers, "Enable All");
  gui.add(layers, "Disable All");
}
