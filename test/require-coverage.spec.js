import { spawn } from 'child_process';
import expect from 'unexpected';
import { PluginEvent } from 'esdoc/out/src/Plugin/Plugin';
import * as plugin from '../src/require-coverage';

describe('require-coverage', function() {
  /** @test {onStart} */
  it('should export onStart', function() {
    expect(plugin.onStart, 'to be defined');
  });

  /** @test {onComplete} */
  it('should export onComplete', function() {
    expect(plugin.onComplete, 'to be defined');
  });

  /** @test {onStart} */
  describe('#onStart', function() {
    describe('options', function() {
      it('required should default to 90', function() {
        plugin.onStart(new PluginEvent());

        expect(plugin.plugin._required, 'to equal', 90);
      });

      it('required should be configurable', function() {
        const thd = 80;
        plugin.onStart(new PluginEvent({ option: { required: thd } }));

        expect(plugin.plugin._required, 'to equal', thd);
      });
    });
  });

  /** @test {onComplete} */
  describe('#onComplete', function() {
    this.timeout(10000);

    context('with undocumented project', function() {
      it('should should exit with code 1', function(done) {
        const child = spawn('./node_modules/.bin/esdoc', [
          '-c',
          './test/fixtures/not-documented.json',
        ]);

        child.on('close', function(code) {
          expect(code, 'to equal', 1);
          done();
        });
      });
    });

    context('with documented project', function() {
      it('should should exit with code 0', function(done) {
        const child = spawn('./node_modules/.bin/esdoc', [
          '-c',
          './test/fixtures/documented.json',
        ]);

        child.on('close', function(code) {
          expect(code, 'to equal', 0);
          done();
        });
      });
    });
  });
});
