var VrVideo = function() {

    function init() {

        events.on("update", update);


        video = document.getElementById('vr-video');
        video.loop = true;
        // video.width = 1280;
        // video.height = 720;
        // video.muted = true;

        if (Main.getIsMobile()) {
            video.src = "textures/CoorsLIght_mobile.mp4";
        } else {
            console.log('desktop');
            video.src = 'textures/CoorsLIght_desktop.mp4';
        }


        videoContainer = document.querySelector('.vr-video');

        video.setAttribute('webkit-playsinline', 'webkit-playsinline');

        if (Main.getIsLocal()) {
            video.setAttribute('crossorigin', 'anonymous');
        } else {
            video.setAttribute('crossorigin', 'use-credentials');
        }

        texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.NearestFilter;
        texture.maxFilter = THREE.NearestFilter;


        texture.format = THREE.RGBFormat;
        texture.generateMipmaps = false;

        var geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        var uvs = geometry.faceVertexUvs[0];

        for (var i = 0; i < uvs.length; i++) {
            for (var j = 0; j < 3; j++) {
                uvs[i][j].x *= 1;
            }
        }

        var material = new THREE.MeshBasicMaterial({map: texture});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = -Math.PI / 2;
        mesh.layers.set(1); // display in left eye only
        VR.getScene().add(mesh);

        // right
        var geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        var uvs = geometry.faceVertexUvs[0];


        for (var i = 0; i < uvs.length; i++) {
            for (var j = 0; j < 3; j++) {
                uvs[i][j].x *= 1;
                // uvs[i][j].x += 0.7;
            }
        }

        var material = new THREE.MeshBasicMaterial({map: texture});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = -Math.PI / 2;
        mesh.layers.set(2);

        VR.getScene().add(mesh);
    }

    function update() {

    }


    return{
        init: init,
        getVideoContainer: function() {
            return videoContainer;
        },
        getVideo: function() {
            return video;
        }
    };

}();
