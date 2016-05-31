// 场景相关
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls  = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x333);
renderer.setSize(window.innerWidth*2, window.innerHeight*2);
renderer.shadowMap.enabled = true;
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
document.body.appendChild(renderer.domElement);

camera.position.x = 600;
camera.position.y = 600;
camera.position.z = 800;
camera.lookAt({
  x: 0,
  y: 0,
  z: 0
});

// 添加灯光
var spotLight = new THREE.SpotLight('#fff');
spotLight.position.set(-500, 350, 500);
spotLight.castShadow = true;
spotLight.intensity = 1;
scene.add(spotLight);

var spotLight2 = new THREE.SpotLight('#fff');
spotLight2.position.set(600, 200, -500);
spotLight2.castShadow = true;
spotLight2.intensity = 1;
scene.add(spotLight2);

var abLight = new THREE.AmbientLight('#fff');
scene.add(abLight);

// BevelBox
var bbGeo = THREE.BevelBox({
  width: 400,
  height: 200,
  depth: 20,
  bevelSize: 1
});
bbGeo.castShadow = true;
bbGeo.receiveShadow = true;
var bbMesh = new THREE.Mesh(bbGeo, new THREE.MeshPhongMaterial({color: '#666'}));
scene.add(bbMesh);

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
  },
  boxWidth: 400
};

var boxWidth = 400;
Object.defineProperty(sceneHandler, 'boxWidth', {
  set: function (value) {
    bbGeo = THREE.BevelBox({
      width: value,
      height: 200,
      depth: 20,
      bevelSize: 1,
      bevelSegments: 10
    });
    bbMesh.geometry = bbGeo;
    boxWidth = value;
  },
  get: function () {
    return boxWidth;
  }
});

var gui = new dat.GUI();
gui.add(sceneHandler, 'addCube');
gui.add(sceneHandler, 'boxWidth', 100, 500).step(50);

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
