# DEPRECATED

Please use the official v2 polyfills instead, they don't include HTML Imports by default anymore. See https://github.com/webcomponents/webcomponentsjs.

# webcomponents-loader-no-hi

[![Greenkeeper badge](https://badges.greenkeeper.io/NeoLegends/webcomponents-loader-no-hi.svg)](https://greenkeeper.io/)

Did you ever build a site that uses web components but doesn't make use of HTML imports? This is for you.

This is a polyfill-loader that works just like the one from webcomponents/webcomponentsjs but _doesn't_ load the HTML imports polyfill by default. HTML imports don't seem to make it to an accepted standard, so if you have a site that doesn't use them there is no need to bloat your site and polyfill that functionality.

## Usage

1. Install this module and the web components polyfills from npm and deploy them to your site. The script expects a directory structure like npm / yarn would create for you. Simply deploy your node_modules folder (or certain subfolders of it) to the frontend and you should be good.
2. Include a script tag in your site like `<script src="/node_modules/webcomponents-loader-no-hi/webcomponents-loader.js></script>`.
3. The script will run and load the polyfills from `/<NODE_INSTALLATION_FOLDER>/@webcomponents/webcomponentsjs/`.
4. Wait for the 'WebComponentsReady' event before doing webcomponent-y stuff on your page. Go check the official docs on that, though.
