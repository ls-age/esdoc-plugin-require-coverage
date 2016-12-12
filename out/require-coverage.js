'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = undefined;
exports.onStart = onStart;
exports.onHandleConfig = onHandleConfig;
exports.onComplete = onComplete;

var _Plugin = require('./Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The plugin instance used when running ESDoc
 * @type {Plugin}
 */
var plugin = exports.plugin = new _Plugin2.default();

/**
 * Passes options to the plugin instance
 * @param {PluginEvent} e The event passed by ESDoc
 */
/**
 * @external {PluginEvent} https://esdoc.org/esdoc/class/src/Plugin/Plugin.js~PluginEvent.html
 */

function onStart(e) {
  plugin.handleOptions(e.data.option);
}

/**
 * Passes config to the plugin instance
 * @param {pluginEvent} e The event passed by ESDoc
 */
function onHandleConfig(e) {
  plugin.handleConfig(e.data.config);
}

/**
 * Invokes {Plugin#checkCoverage}
 */
function onComplete() {
  plugin.checkCoverage();
}