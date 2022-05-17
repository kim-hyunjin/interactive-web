/**
 * https://threejs.org/docs/index.html#manual/en/introduction/How-to-update-things
 */

import * as THREE from "three";

const MAX_POINTS = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// geometry
const geometry = new THREE.BufferGeometry();

// attributes
const positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// draw range
const drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);

// material
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

// line
const line = new THREE.Line(geometry, material);
scene.add(line);

function animate() {
  requestAnimationFrame(animate);

  const positions = line.geometry.attributes.position.array;

  let x, y, z, index;
  x = y = z = index = 0;

  for (let i = 0, l = MAX_POINTS; i < l; i++) {
    positions[index++] = x;
    positions[index++] = y;
    positions[index++] = z;

    x += (Math.random() - 0.5) * 30;
    y += (Math.random() - 0.5) * 30;
    z += (Math.random() - 0.5) * 30;
  }

  renderer.render(scene, camera);
  line.geometry.attributes.position.needsUpdate = true; // required after the first render
}

animate();
