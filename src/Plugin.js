import { join } from 'path';
import { readFileSync } from 'fs';
import { EOL } from 'os';

/**
 * The require-coverage plugin
 */
export default class Plugin {

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
    let coverageReport;

    try {
      coverageReport = JSON.parse(readFileSync(this._coverageFilePath));
    } catch (_) {
      throw new Error('coverage.json file not found. Double-check ESDoc finished.');
    }

    const covered = parseInt(/([0-9]+)%/.exec(coverageReport.coverage)[1], 10);

    if (covered < this._required) {
      throw new Error(`Coverage is at ${covered}%, (${this._required}% required)${EOL}`);
    }
  }

}
