OverlayScrollbars.extension('scroll-chain', function (defaultOptions, framework, compatibility) {
    defaultOptions = defaultOptions || {};
    const osInstance = this;
    const instanceElements = osInstance.getElements();
    const $viewport = framework(instanceElements.viewport);
    let preventVertical = defaultOptions.vertical || true;
    let preventHorizontal = defaultOptions.horizontal || true;

    /*
     * each event should be processed by the nearest parent scrollbar
     */
    function shouldProcess(event) {
        let foundViewport = false;
        let self = event.target;
        while (!foundViewport) {
            if (!self) {
                return false;
            } else if (self.className.startsWith('os-viewport')) {
                foundViewport = true;
                if (self !== instanceElements.viewport)
                    return false;
            }
            self = self.parentNode;
        }
        return true;
    }

    const trapWheel = event => {
        if (!shouldProcess(event))
            return;
        let isHorizontal = event.shiftKey || false;
        if (isHorizontal) {
            if (preventHorizontal) {
                // cross-browser wheel delta
                event = window.event || event;
                const delta = Math.min(1, Math.max(-1, (-event.wheelDelta || event.deltaY || event.detail)));
                let xScrollPos = $viewport.scrollLeft() + 0.5;
                // only trap events once we've scrolled to the end or beginning
                if ((delta > 0 && xScrollPos >= osInstance.scroll().max.x) ||
                    (delta < 0 && xScrollPos <= 1)) {

                    compatibility.prvD(event);
                    return false;
                }
            }
        } else if (preventVertical) {
            // cross-browser wheel delta
            event = window.event || event;
            const delta = Math.min(1, Math.max(-1, (-event.wheelDelta || event.deltaY || event.detail)));
            let yScrollPos = $viewport.scrollTop() + 0.5;
            // only trap events once we've scrolled to the end or beginning
            if ((delta > 0 && yScrollPos >= osInstance.scroll().max.y) ||
                (delta < 0 && yScrollPos <= 1)) {

                compatibility.prvD(event);
                return false;
            }
        }
    };

    let xStart, yStart, firstTime, parentScroll;

    const handleTouchStart = event => {
        xStart = event.touches[0].clientX;
        yStart = event.touches[0].clientY;
        firstTime = true;
        parentScroll = false;
    };

    /*
     * detect significant axis between x, y
     */
    function significant(x, y) {
        let xAbs = Math.abs(x);
        let yAbs = Math.abs(y);
        let xSignificant = true;
        let ySignificant = true;
        if ((xAbs - yAbs) > 0) {
            if (xAbs / yAbs >= 2)
                ySignificant = false;
        } else {
            if (yAbs / xAbs >= 2)
                xSignificant = false;
        }
        return {ySignificant, xSignificant};
    }

    const handleTouchMove = event => {
        if (!shouldProcess(event))
            return;
        if (parentScroll) {
            compatibility.prvD(event);
            return false;
        }
        else if (!firstTime)
            return;

        if (!yStart || !xStart)
            return;
        let yEnd = event.touches[0].clientY;
        let xEnd = event.touches[0].clientX;
        let yDiff = yStart - yEnd;
        let xDiff = xStart - xEnd;
        // detect significant axis
        let {ySignificant, xSignificant} = significant(xDiff, yDiff);

        if (preventVertical && ySignificant) {
            let yScrollPos = $viewport.scrollTop() + 0.5;
            if ((yDiff > 0 && yScrollPos >= osInstance.scroll().max.y) ||
                (yDiff < 0 && yScrollPos <= 1)) {
                if (firstTime) {
                    parentScroll = true;
                }

                compatibility.prvD(event);
            }
        }
        if (preventHorizontal && xSignificant) {
            let xScrollPos = $viewport.scrollLeft() + 0.5;
            if ((xDiff > 0 && xScrollPos >= osInstance.scroll().max.x) ||
                (xDiff < 0 && xScrollPos <= 1)) {
                if (firstTime) {
                    parentScroll = true;
                }

                compatibility.prvD(event);
            }
        }
        firstTime = false;
    };

    const isEventSupported = eventName => {
        const TAGNAMES = {
            'select': 'input', 'change': 'input',
            'submit': 'form', 'reset': 'form',
            'error': 'img', 'load': 'img', 'abort': 'img'
        };
        let el = document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        let isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';
        }
        el = null;
        return isSupported;
    };

    return {
        added(options) {
            options = options || {};
            preventVertical = options.vertical !== undefined ? !!options.vertical : preventVertical;
            preventHorizontal = options.horizontal !== undefined ? !!options.horizontal : preventHorizontal;

            if (isEventSupported('wheel'))
                $viewport.on('wheel', trapWheel);
            else
                $viewport.on('mousewheel DOMMouseScroll', trapWheel);
            $viewport.on('touchstart', handleTouchStart);
            $viewport.on('touchmove', handleTouchMove);
            if (preventVertical && preventHorizontal)
                $viewport.css('overscroll-behavior', 'none');
            else {
                if (preventVertical)
                    $viewport.css('overscroll-behavior-y', 'none');
                if (preventHorizontal)
                    $viewport.css('overscroll-behavior-x', 'none');
            }
        },

        removed() {
            if (isEventSupported('wheel'))
                $viewport.off('wheel', trapWheel);
            else
                $viewport.off('mousewheel DOMMouseScroll', trapWheel);
            $viewport.off('touchstart', handleTouchStart);
            $viewport.off('touchmove', handleTouchMove);
            if (preventVertical && preventHorizontal)
                $viewport.css('overscroll-behavior', 'unset');
            else {
                if (preventVertical)
                    $viewport.css('overscroll-behavior-y', 'unset');
                if (preventHorizontal)
                    $viewport.css('overscroll-behavior-x', 'unset');
            }
        }
    };
});
