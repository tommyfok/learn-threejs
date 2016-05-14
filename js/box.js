var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls  = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xDDDDDD);
renderer.setSize(window.innerWidth*2, window.innerHeight*2);
renderer.shadowMap.enabled = true;
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
document.body.appendChild(renderer.domElement);

camera.position.x = 20;
camera.position.y = 30;
camera.position.z = 20;
camera.lookAt({
  x: 0,
  y: 0,
  z: 0
});

// 添加灯光
// var ambientLight = new THREE.AmbientLight('#ffffff');
var pointLight1 = new THREE.SpotLight(0xFFFFFF);
pointLight1.position.set(-50, 50, 50);
pointLight1.castShadow = true;
scene.add(pointLight1);
// scene.add(ambientLight);
var hemiLight = new THREE.HemisphereLight('#fff', '#666', 1);
hemiLight.position.set(100, 500, 0);
// hemiLight.castShadow = true;
scene.add(hemiLight);

// 添加一个几何体
var cubeGeo = new THREE.CubeGeometry(10, 10, 10);
// 创建橙色无高光材质
var cubeMat = new THREE.MeshLambertMaterial({color: '#ff6600'});
// 用几何体和材质生成网格（可加入场景了）
var cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.y = 5;
cube.castShadow = true;
scene.add(cube);

var gui = new dat.GUI();
gui.add(cube.position, 'x', 0, 10);
gui.add(cube.position, 'y', 0, 10);
gui.add(cube.position, 'z', 0, 10);

// 接下来创建一个平面
var planeGeo = new THREE.PlaneGeometry(100, 100);
var planeMat = new THREE.MeshLambertMaterial({color: '#666'});
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -.5*Math.PI;
plane.receiveShadow = true;
scene.add(plane);


// 循环渲染场景函数
function render () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

// 渲染场景
render();
