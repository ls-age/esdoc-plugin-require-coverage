import Plugin from './Plugin';

export const plugin = new Plugin();

export function onStart({ data }) {
  plugin.handleOptions(data.option);
}

export function onHandleConfig({ data }) {
  plugin.handleConfig(data.config);
}

export function onComplete() {
  plugin.checkCoverage();
}
