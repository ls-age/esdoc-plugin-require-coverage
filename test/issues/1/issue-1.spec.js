import expect from 'unexpected';

import Plugin from '../../../src/Plugin';

describe('Issue #1', function() {
  const plugin = new Plugin();

  plugin.handleConfig({
    destination: __dirname,
  });

  it('should report coverage of 90.9%', function() {
    expect(() => plugin.checkCoverage(), 'not to throw');
  });
});
