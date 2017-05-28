var events = new Events();

var Main = function() {

    function init() {

        // THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        //     console.log( "loading: ", item, loaded, total );
        // };

        if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        window.addEventListener('resize', onResize, false);
        window.addEventListener('orientationchange', onResize, false);

        if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
            console.log('is mobile');
            $('.overlay').on('click', handler);

        } else {
            console.log('is not mobile');
            initModules();
        }


        update();

    }


    function handler() {
        if (screenfull.enabled) {
            screenfull.request();
            initModules();
        } else {
            initModules();
        }

        setTimeout(function() {
            TweenLite.to('.overlay', 1, {opacity: 0, onComplete: hideOverlay});
        }, 1000 );

        function hideOverlay() {
            $('.overlay').css('visibility' , 'hidden');
        }

    }

    function initModules() {
        VR.init();
        VrVideo.init();
        Intro.init();
        Video.init();
        TransitionView.init();
        TransitionVideo.init();

        $("body").unbind("click", handler);

        onResize();
    }

    function update() {
        requestAnimationFrame(update);
        events.emit("update");
    }


    function onDocumentMouseDown(event) {
    }

    function onDocumentMouseUp(event) {
    }

    function onDocumentMouseMove(event) {
    }

    function onResize() {
        VR.onResize();
        Intro.onResize();
        TransitionView.onResize();
    }

    return {
        init: init,
        getIsMobile: function() {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        },
        getIsLocal: function() {
            return location.hostname === "localhost" || location.hostname === "127.0.0.1";
        }
    };

}();

$(document).ready(function () {
    setTimeout(Main.init, 1000);
});
