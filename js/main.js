var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls  = new THREE.OrbitControls(camera)

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xDDDDDD);
renderer.setSize(window.innerWidth*2, window.innerHeight*2);
renderer.shadowEnabled = true;
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
document.body.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader();

loader.load('models/chair.json', function (geo, mat) {
  var mat2 = new THREE.MeshLambertMaterial({color: 0xAAAAAA});
  var mesh = new THREE.Mesh(geo, mat[0]);
  scene.add(mesh);
});

camera.position.x = 2;
camera.position.y = 3;
camera.position.z = 2;
camera.lookAt({
  x: 0,
  y: 1,
  z: 0
});
// auto fit the camera
controls['center'].y = 1;

var ambientLight = new THREE.AmbientLight('#ffffff');
var pointLight1 = new THREE.PointLight(0xFFFFFF);
pointLight1.position.set(-50, 50, 50);
scene.add(pointLight1);
scene.add(ambientLight);

function render () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();

function resizeCamera () {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth * 2, window.innerHeight * 2);
}

window.addEventListener('orientationchange', resizeCamera);
window.addEventListener('resize', resizeCamera);

var clickEvtName = 'ontouchend' in document.body ? 'touchend' : 'click';

document.querySelector('.header').addEventListener(clickEvtName, toggleTips);
document.querySelector('.tips').addEventListener(clickEvtName, toggleTips);

function toggleTips () {
  var item = document.querySelector('.tips');
  if (item.className.indexOf('hidden') > -1) {
    item.className = 'tips';
  } else {
    item.className = 'tips hidden';
  }
}
