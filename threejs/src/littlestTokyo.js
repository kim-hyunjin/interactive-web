import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

let mixer;

const clock = new THREE.Clock();
const container = document.createElement("div");
document.body.appendChild(container);

const stats = new Stats();
container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

/**
 * https://threejs.org/docs/index.html?q=pmrem#api/en/extras/PMREMGenerator
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM)
 * from a cubeMap environment texture.
 * This allows different levels of blur to be quickly accessed based on material roughness.
 */
const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(5, 2, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

/**
 * https://threejs.org/docs/#examples/en/loaders/DRACOLoader
 * A loader for geometry compressed with the Draco library.
 * Draco is an open source library for compressing and decompressing 3D meshes and point clouds.
 * Compressed geometry can be significantly smaller,
 * at the cost of additional decoding time on the client device.
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("../libs/draco/gltf/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  "../models/gltf/LittlestTokyo.glb",
  function (gltf) {
    const model = gltf.scene;
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    /**
     * https://threejs.org/docs/index.html?q=mixer#api/en/animation/AnimationMixer
     * The AnimationMixer is a player for animations on a particular object in the scene.
     * When multiple objects in the scene are animated independently,
     * one AnimationMixer may be used for each object.
     */
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate();
  },
  undefined,
  function (e) {
    console.error(e);
  }
);

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  mixer.update(delta);

  controls.update();

  stats.update();

  renderer.render(scene, camera);
}
