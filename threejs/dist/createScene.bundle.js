/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createScene.js":
/*!****************************!*\
  !*** ./src/createScene.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/**\n * https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene\n */\n\n\n\n// Creating the scene\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n\n// renderer\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight); // performance가 매우 중요하다면 사이즈를 더 작게 설정\n// setSize(window.innerWidth/2, window.innerHeight/2, false) // 크기는 유지하되, 해상도를 낮추는 방법\ndocument.body.appendChild(renderer.domElement); // this is <canvas> element\n\n// make cube\nconst geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(); // this object has all points(vertices) and fill(faces) of the cube\nconst material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x00ff00 }); // material to color geometry\nconst cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material); // geometry + material\nscene.add(cube); // default coordinates (0, 0, 0)\n\ncamera.position.z = 5; // need to camera out\n\n// This will create a loop that causes the renderer\n// to draw the scene every time the screen is refreshed\n// (on a typical screen this means 60 times per second).\nfunction animate() {\n  requestAnimationFrame(animate);\n\n  // rotate animation\n  cube.rotation.x += 0.01;\n  cube.rotation.y += 0.01;\n\n  renderer.render(scene, camera);\n}\n\nanimate();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3JlYXRlU2NlbmUuanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW50ZXJhY3RpdmUtd2ViLXRocmVlanMvLi9zcmMvY3JlYXRlU2NlbmUuanM/N2EwYSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy9pbmRleC5odG1sI21hbnVhbC9lbi9pbnRyb2R1Y3Rpb24vQ3JlYXRpbmctYS1zY2VuZVxuICovXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG4vLyBDcmVhdGluZyB0aGUgc2NlbmVcbmNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5jb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApO1xuXG4vLyByZW5kZXJlclxuY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTsgLy8gcGVyZm9ybWFuY2XqsIAg66ek7JqwIOykkeyalO2VmOuLpOuptCDsgqzsnbTspojrpbwg642UIOyekeqyjCDshKTsoJVcbi8vIHNldFNpemUod2luZG93LmlubmVyV2lkdGgvMiwgd2luZG93LmlubmVySGVpZ2h0LzIsIGZhbHNlKSAvLyDtgazquLDripQg7Jyg7KeA7ZWY65CYLCDtlbTsg4Hrj4Trpbwg64Ku7LaU64qUIOuwqeuylVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTsgLy8gdGhpcyBpcyA8Y2FudmFzPiBlbGVtZW50XG5cbi8vIG1ha2UgY3ViZVxuY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoKTsgLy8gdGhpcyBvYmplY3QgaGFzIGFsbCBwb2ludHModmVydGljZXMpIGFuZCBmaWxsKGZhY2VzKSBvZiB0aGUgY3ViZVxuY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHgwMGZmMDAgfSk7IC8vIG1hdGVyaWFsIHRvIGNvbG9yIGdlb21ldHJ5XG5jb25zdCBjdWJlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTsgLy8gZ2VvbWV0cnkgKyBtYXRlcmlhbFxuc2NlbmUuYWRkKGN1YmUpOyAvLyBkZWZhdWx0IGNvb3JkaW5hdGVzICgwLCAwLCAwKVxuXG5jYW1lcmEucG9zaXRpb24ueiA9IDU7IC8vIG5lZWQgdG8gY2FtZXJhIG91dFxuXG4vLyBUaGlzIHdpbGwgY3JlYXRlIGEgbG9vcCB0aGF0IGNhdXNlcyB0aGUgcmVuZGVyZXJcbi8vIHRvIGRyYXcgdGhlIHNjZW5lIGV2ZXJ5IHRpbWUgdGhlIHNjcmVlbiBpcyByZWZyZXNoZWRcbi8vIChvbiBhIHR5cGljYWwgc2NyZWVuIHRoaXMgbWVhbnMgNjAgdGltZXMgcGVyIHNlY29uZCkuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgLy8gcm90YXRlIGFuaW1hdGlvblxuICBjdWJlLnJvdGF0aW9uLnggKz0gMC4wMTtcbiAgY3ViZS5yb3RhdGlvbi55ICs9IDAuMDE7XG5cbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuXG5hbmltYXRlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/createScene.js\n");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/createScene.js");
/******/ 	
/******/ })()
;