/**
 * Created by Mattsmith on 3/22/17.
 */
var Intro = function() {

    var scene, camera, renderer, light;

    var toggled = false;

    var closeButton = document.querySelector('.close');

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    function init() {
        events.on("update", update);

        container = document.getElementById( 'regular' );
        document.body.appendChild( container );


        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        scene.add(camera);

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0.5, 1, 1 ).normalize();
        scene.add( light );

        var canvas = document.getElementById("canvasID");
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        initListeners();
    }

    function initListeners() {

        if(Main.getIsMobile()) {
            container.addEventListener("click", function () {
                toggleOn();
            });
        } else {
            container.addEventListener("mousedown", function(){
                toggleOn();
            });

            container.addEventListener("mouseup", function() {
                toggleOff();
            });
        }
    }

    function toggleOn() {

        events.emit("toggle");

        if(!toggled){

            if(Main.getIsMobile()){

                closeButton.addEventListener("click", function() {
                    toggleOff();
                });
            }

            TransitionVideo.getVideo().play();

            TweenLite.to('.headphones', 1, {opacity: 0});

            TweenLite.to('#transition-video', 0.6 ,{opacity: 1, onComplete: resetTransition}  );

            function resetTransition() {
                console.log('reset transition');
                TweenLite.to('#transition-video', 0.4 ,{ opacity: 0, onComplete: resetVideo} );
            }

            function resetVideo() {
                TransitionVideo.getVideo().currentTime = 0;
            }

            TweenLite.to('#regular', 1 ,{opacity: 0});

            toggled = true;

            VrVideo.getVideoContainer().style.opacity = 1;

            VrVideo.getVideo().play();
            // Video.getVideo().pause();
        }
    }

    function toggleOff() {
        events.emit("toggle");

        if(toggled){

            TweenLite.to('#regular', 1 ,{opacity: 1});
            TweenLite.to('.headphones', 1, {opacity: 1});

            toggled = false;
            VrVideo.getVideoContainer().style.opacity = 0;
            Video.getVideo().play();
            VrVideo.getVideo().pause();
        }
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

    return{
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
        getToggled: function () {
            return toggled;
        },
        onResize: onResize
    }
}();
