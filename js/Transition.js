var TransitionView = function () {

    var scene, camera, renderer, light;

    function init() {
        events.on("update", update);

        container = document.getElementById( 'transition-video' );
        document.body.appendChild( container );


        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        scene.add(camera);

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0.5, 1, 1 ).normalize();
        scene.add( light );

        var canvas = document.getElementById("transition");
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
    }

    function onResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function update() {
        renderer.render( scene, camera );
    }

    return {
        init: init,
        getCamera: function () {
            return camera;
        },
        getScene: function () {
            return scene;
        },
        getLight: function () {
            return light;
        },
        getRenderer: function () {
            return renderer;
        },
        onResize:onResize
    }
}();
