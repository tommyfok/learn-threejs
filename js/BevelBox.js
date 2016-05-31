THREE.BevelBox = function (options) {
    var PI = Math.PI;
    var options = options || {};
    var width = options.width;
    var height = options.height;
    var depth = options.depth;
    var bevelSize = options.bevelSize || 0;
    var bevelEnabled = bevelSize > 0;
    var segments = options.segments || 10;
    var bevelSegments = options.bevelSegments || 10;

    var bbShape = new THREE.Shape();
    bbShape.absarc(width/2-bevelSize,height/2-bevelSize,bevelSize,0,.5*PI,true);
    bbShape.lineTo(-width/2+bevelSize,height/2);
    bbShape.absarc(-width/2+bevelSize,height/2-bevelSize,bevelSize,.5*PI,PI,true);
    bbShape.lineTo(-width/2,-height/2+bevelSize);
    bbShape.absarc(-width/2+bevelSize,-height/2+bevelSize,bevelSize,PI,1.5*PI,true);
    bbShape.lineTo(width/2-bevelSize,-height/2);
    bbShape.absarc(width/2-bevelSize,-height/2+bevelSize,bevelSize,1.5*PI,2*PI,true);
    bbShape.lineTo(width/2,height/2-bevelSize);

    var configs = {
        curveSegments: bevelSegments,
        steps: segments,
        amount: depth,
        bevelEnabled: bevelEnabled,
        bevelSize: bevelSize,
        bevelSegments: bevelSegments,
        bevelThickness: bevelSize
    };

    return new THREE.ExtrudeGeometry([bbShape], configs);
};
