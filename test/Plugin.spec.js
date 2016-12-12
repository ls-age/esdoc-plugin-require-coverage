import expect from 'unexpected';
import Plugin from '../src/Plugin';

/** @test {Plugin} */
describe('Plugin', function() {
  let plugin;

  beforeEach(function() {
    plugin = new Plugin();
  });

  /** @test {Plugin#handleOptions} */
  describe('#handleOptions', function() {
    describe('option `required`', function() {
      it(`should default to ${Plugin.DefaultOptions.required}`, function() {
        plugin.handleOptions({});
        expect(plugin._required, 'to equal', Plugin.DefaultOptions.required);
      });

      it('should be configurable', function() {
        const required = 80;
        plugin.handleOptions({ required });
        expect(plugin._required, 'to equal', required);
      });
    });
  });

  /** @test {Plugin#handleConfig} */
  describe('#handleConfig', function() {
    describe('config `destination`', function() {
      it('should create coverageFilePath', function() {
        const destination = 'dest';
        plugin.handleConfig({ destination });
        expect(plugin._coverageFilePath, 'to begin with', destination);
      });
    });
  });

  /** @test {Plugin#checkCoverage} */
  describe('#checkCoverage', function() {
    function runWithOptionsConfig(options, config) {
      plugin.handleOptions(options);
      plugin.handleConfig(config);
      plugin.checkCoverage();
    }

    it('should throw an error if coverage.json does not exist', function() {
      expect(() => {
        runWithOptionsConfig({}, { destination: 'destination' });
      }, 'to throw', /coverage\.json file not found/);
    });

    it('should throw an error if coverage is to low', function() {
      expect(() => {
        runWithOptionsConfig({}, { destination: 'test/fixtures/not-documented/out' });
      }, 'to throw', /Coverage is at ([0-9])+%/);
    });

    it('should pass if coverage is high enough', function() {
      expect(() => {
        runWithOptionsConfig({}, { destination: 'test/fixtures/documented/out' });
      }, 'not to throw');
    });
  });
});
