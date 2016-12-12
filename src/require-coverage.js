/**
 * @external {PluginEvent} https://esdoc.org/esdoc/class/src/Plugin/Plugin.js~PluginEvent.html
 */

import Plugin from './Plugin';

/**
 * The plugin instance used when running ESDoc
 * @type {Plugin}
 */
export const plugin = new Plugin();

/**
 * Passes options to the plugin instance
 * @param {PluginEvent} e The event passed by ESDoc
 */
export function onStart(e) {
  plugin.handleOptions(e.data.option);
}

/**
 * Passes config to the plugin instance
 * @param {pluginEvent} e The event passed by ESDoc
 */
export function onHandleConfig(e) {
  plugin.handleConfig(e.data.config);
}

/**
 * Invokes {Plugin#checkCoverage}
 */
export function onComplete() {
  plugin.checkCoverage();
}
