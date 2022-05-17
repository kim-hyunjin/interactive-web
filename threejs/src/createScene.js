/**
 * https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
 */

import * as THREE from "three";

// Creating the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // performance가 매우 중요하다면 사이즈를 더 작게 설정
// setSize(window.innerWidth/2, window.innerHeight/2, false) // 크기는 유지하되, 해상도를 낮추는 방법
document.body.appendChild(renderer.domElement); // this is <canvas> element

// make cube
const geometry = new THREE.BoxGeometry(); // this object has all points(vertices) and fill(faces) of the cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // material to color geometry
const cube = new THREE.Mesh(geometry, material); // geometry + material
scene.add(cube); // default coordinates (0, 0, 0)

camera.position.z = 5; // need to camera out

// This will create a loop that causes the renderer
// to draw the scene every time the screen is refreshed
// (on a typical screen this means 60 times per second).
function animate() {
  requestAnimationFrame(animate);

  // rotate animation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
