// Adapted from https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-loader.js

(function() {
    'use strict';
    // global for (1) existence means `WebComponentsReady` will file,
    // (2) WebComponents.ready == true means event has fired.
    window.WebComponents = window.WebComponents || {};
    var name = 'webcomponents-loader.js';
    // Feature detect which polyfill needs to be imported.
    var polyfills = [];
    if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
        (window.ShadyDOM && window.ShadyDOM.force)) {
        polyfills.push('sd');
    }
    if (!window.customElements || window.customElements.forcePolyfill) {
        polyfills.push('ce');
    }
    // NOTE: any browser that does not have template or ES6 features
    // must load the full suite (called `lite` for legacy reasons) of polyfills.
    if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
        // Edge has broken fragment cloning which means you cannot clone template.content
        !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
        polyfills = ['lite'];
    }

    if (polyfills.length) {
        var script = document.querySelector('script[src*="' + name +'"]');
        var newScript = document.createElement('script');
        // Load it from the right place.
        var replacement = 'webcomponents-' + polyfills.join('-') + '.js';
        var url = script.src.replace(
            'webcomponents-loader-no-hi/' + name,
            '@webcomponents/webcomponentsjs/' + replacement
        );
        newScript.src = url;
        document.head.appendChild(newScript);
    } else {
        // Ensure `WebComponentsReady` is fired also when there are no polyfills loaded.
        // however, we have to wait for the document to be in 'interactive' state,
        // otherwise a rAF may fire before scripts in <body>

        var fire = function() {
            requestAnimationFrame(function() {
                window.WebComponents.ready = true;
                document.dispatchEvent(new CustomEvent('WebComponentsReady', {bubbles: true}));
            });
        };

        if (document.readyState !== 'loading') {
            fire();
        } else {
            document.addEventListener('readystatechange', function wait() {
                fire();
                document.removeEventListener('readystatechange', wait);
            });
        }
    }
})();
