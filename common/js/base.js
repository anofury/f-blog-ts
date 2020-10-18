; (function () {
    let lastTime = 0, vendors = ['webkit', 'moz']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (callback, element) => {
            let currTime = new Date().getTime()
            let timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
            let id = window.setTimeout(() => {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = id => {
            clearTimeout(id)
        }
    }
})();

; (function () {
    var setTitle = function () {
        document.title = window.SITE_CONFIG && window.SITE_CONFIG.TITTLE || document.title;
    };
    var setHiddenTitle = function () {
        document.title = window.SITE_CONFIG && window.SITE_CONFIG.TITTLE_HIDE || document.title;
    };
    setTitle();
    window.addEventListener('visibilitychange', () => {
        document.hidden ? setHiddenTitle() : setTitle()
    })
})();