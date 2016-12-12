import { spawn } from 'child_process';
import expect from 'unexpected';
import { stub } from 'sinon';
import { PluginEvent } from 'esdoc/out/src/Plugin/Plugin';
import * as requireCoverage from '../src/require-coverage';

describe('require-coverage', function() {
  /** @test {onStart} */
  it('should export onStart', function() {
    expect(requireCoverage.onStart, 'to be defined');
  });

  /** @test {onHandleConfig} */
  it('should export onHandleConfig', function() {
    expect(requireCoverage.onHandleConfig, 'to be defined');
  });

  /** @test {onComplete} */
  it('should export onComplete', function() {
    expect(requireCoverage.onComplete, 'to be defined');
  });

  /** @test {onStart} */
  describe('#onStart', function() {
    it('should call Plugin#handleOptions', function() {
      const handleOptions = stub(requireCoverage.plugin, 'handleOptions');
      const option = { test: true };

      requireCoverage.onStart(new PluginEvent({ option }));
      expect(handleOptions.calledOnce, 'to be true');
      expect(handleOptions.calledWith(option), 'to be true');
    });
  });

  /** @test {onStart} */
  describe('#onStart', function() {
    it('should call Plugin#handleOptions', function() {
      const handleConfig = stub(requireCoverage.plugin, 'handleConfig');
      const config = { destination: 'dest' };

      requireCoverage.onHandleConfig(new PluginEvent({ config }));
      expect(handleConfig.calledOnce, 'to be true');
      expect(handleConfig.calledWith(config), 'to be true');
    });
  });

  /** @test {onComplete} */
  describe('#onComplete', function() {
    it('should call Plugin#checkCoverage', function() {
      const checkCoverage = stub(requireCoverage.plugin, 'checkCoverage');

      requireCoverage.onComplete(new PluginEvent({}));
      expect(checkCoverage.calledOnce, 'to be true');
    });

    this.timeout(10000);

    context('with undocumented project', function() {
      it('should should exit with code 1', function(done) {
        const child = spawn('./node_modules/.bin/esdoc', [
          '-c',
          './test/fixtures/not-documented/not-documented.json',
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
          './test/fixtures/documented/documented.json',
        ]);

        child.on('close', function(code) {
          expect(code, 'to equal', 0);
          done();
        });
      });
    });
  });
});
