// 场景相关
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
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(-50, 50, 50);
spotLight.castShadow = true;
spotLight.intensity = 4;
scene.add(spotLight);

var sceneHandler = {
  // 添加一个几何体
  addCube: function () {
    var size = getRandomInt(3);
    var cubeGeo = new THREE.BoxGeometry(size, size, size, size, size, size);
    var cubeMats = [
      new THREE.MeshPhongMaterial({color: 0xFF6600, opacity: .6, transparent: true}),
      new THREE.MeshLambertMaterial({color: 0x000000, wireframe: true})
    ];
    var cube = THREE.SceneUtils.createMultiMaterialObject(cubeGeo, cubeMats);
    cube.position.x = Math.random() * 10;
    cube.position.y = Math.random() * 10;
    cube.position.z = Math.random() * 10;
    // 实际上是两个mesh，所以foreach一下
    cube.children.forEach(function (elem) {
      elem.castShadow = true;
      elem.receiveShadow = true;
    });
    scene.add(cube);
  }
};

var gui = new dat.GUI();
gui.add(sceneHandler, 'addCube');

// 创建一个地面
var planeSize = 100;
var planeGeo = new THREE.PlaneGeometry(planeSize,planeSize,planeSize,planeSize);
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

function getRandomInt (range) {
  return Math.floor(range*Math.random()) + 1;
}
