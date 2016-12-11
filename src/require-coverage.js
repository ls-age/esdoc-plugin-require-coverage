import { join } from 'path';
import { EOL } from 'os';
import { readFileSync } from 'fs';

export class Plugin {

  static get DefaultOptions() {
    return {
      required: 90,
    };
  }

  handleOptions(options) {
    const opts = Object.assign(Plugin.DefaultOptions, options);

    this._required = opts.required;
  }

  handleConfig(config) {
    this._coverageFilePath = join(config.destination, 'coverage.json');
  }

  checkCoverage() {
    try {
      const coverageReport = JSON.parse(readFileSync(this._coverageFilePath)); // eslint-disable-line global-require
      const covered = parseInt(/([0-9]+)%/.exec(coverageReport.coverage)[1], 10);

      if (covered < this._required) {
        process.stderr.write(`Coverage is at ${covered}%, (${this._required})${EOL}`);
        process.exit(1);
      }
    } catch (e) {
      throw new Error('coverage.json file not found. Double-check ESDoc finished.');
    }

  }

}

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
