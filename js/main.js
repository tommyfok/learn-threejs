var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 2, 3);
var geometry2 = new THREE.BoxGeometry(3, 2, 4);
var material = new THREE.MeshBasicMaterial({color: 0xff6600});
var material2 = new THREE.MeshBasicMaterial({color: 0xff0066});
var cube = new THREE.Mesh(geometry, material);
var cube2 = new THREE.Mesh(geometry2, material2);

scene.add(cube);
scene.add(cube2);

camera.position.z = 5;

function render () {
  requestAnimationFrame(render);
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  cube2.rotation.x += 0.05;
  cube2.rotation.y += 0.03;
  cube2.rotation.z += 0.03;
  renderer.render(scene, camera);
};

renderer.domElement.addEventListener('touchmove', function (e) {
  var e = e || window.event;
  e.preventDefault();
});

renederer.domElement.addEventListener('touchend', function (e) {
  cube2.parameters.width += .3;
})

render();
