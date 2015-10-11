var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls  = new THREE.OrbitControls(camera)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader();

loader.load('models/chair.json', function (geo, mat) {
  var mesh = new THREE.Mesh(geo, mat[0]);
  scene.add(mesh);
});

camera.position.x = 1.5;
camera.position.y = 1.5;
camera.position.z = 1.5;
camera.lookAt({
  x: 0,
  y: 0,
  z: 0
})

function render () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();

function resizeCamera () {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('orientationchange', resizeCamera);
window.addEventListener('resize', resizeCamera);
