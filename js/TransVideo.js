/**
 * Created by Mattsmith on 3/23/17.
 */
var TransitionVideo = function() {
    var video;

    function init() {

        video = document.getElementById( 'trans-video' );

        video.src ="textures/2xTransition_1.mp4";

        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        video.setAttribute('crossorigin', 'anonymous');

        // video.loop = true;
        video.load(); // must call after setting/changing source
        // video.play();
        // video.autoplay = true;
        if (Main.getIsLocal()) {
            video.setAttribute('crossorigin', 'anonymous');
        } else {
            video.setAttribute('crossorigin', 'use-credentials');
        }

        texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        var movieMaterial = new THREE.MeshBasicMaterial( { map: texture, overdraw: true, side:THREE.DoubleSide } );
        // the geometry on which the movie will be displayed;
        // 		movie image will be scaled to fit these dimensions.
        var movieGeometry = new THREE.PlaneGeometry( 1440, 900, 0, 0 );
        var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
        movieScreen.position.set(0,0,0);

        TransitionView.getScene().add(movieScreen);
        TransitionView.getCamera().lookAt(movieScreen.position);
    }

    return {
        init: init,
        getVideo: function() {
            return video;
        }
    }
}();
