THREE.BevelBox = function (options) {
    var PI = Math.PI;
    var options = options || {};
    var width = options.width;
    var height = options.height;
    var depth = options.depth;
    var bevelSize = options.bevelSize || 0;
    var bevelEnabled = bevelSize > 0;
    var segments = options.segments || 1;
    var bevelSegments = options.bevelSegments || 1;

    var bbShape = new THREE.Shape();
    bbShape.moveTo(width/2-bevelSize,height/2-bevelSize);
    bbShape.arc(,-bevelSize,bevelSize,1.5*Math.PI,0);
    bbShape.moveTo()
    bbShape.lineTo(width/2,-height/2);
    bbShape.arc(-bevelSize,bevelSize,bevelSize,0,.5*Math.PI);
    bbShape.lineTo(-width/2,-height/2);
};
