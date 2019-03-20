# esdoc-plugin-require-coverage

> [ESDoc](https://esdoc.org) plugin to test coverage. Useful in combination with a CI service.

[![CircleCI](https://circleci.com/gh/ls-age/esdoc-plugin-require-coverage.svg?style=shield)](https://circleci.com/gh/ls-age/esdoc-plugin-require-coverage)
[![codecov](https://codecov.io/gh/ls-age/esdoc-plugin-require-coverage/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/esdoc-plugin-require-coverage)
[![ESDoc](https://doc.esdoc.org/github.com/ls-age/esdoc-plugin-require-coverage/badge.svg)](https://doc.esdoc.org/github.com/ls-age/esdoc-plugin-require-coverage/) [![Greenkeeper badge](https://badges.greenkeeper.io/ls-age/esdoc-plugin-require-coverage.svg)](https://greenkeeper.io/)

## Installation

Add the module to your development dependencies as usual by running:

```bash
npm install --save-dev esdoc-plugin-require-coverage
```

After that you can configure ESDoc to use this plugin by adding an entry inside your `esdoc.json`:

```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {
      "name": "esdoc-plugin-require-coverage"
    }
  ]
}
```

## Usage

With the plugin installed and added to `esdoc.json` just run ESDoc as usual:

```bash
esdoc -c esdoc.json
```

The only difference you'll experience is that ESDoc will throw an error if the required coverage is not met.

### Setting the required coverage

The required coverage **defaults to 90%**. You can change that by passing an option to the plugin inside `esdoc.json`:

```json
{
  ...
  "plugins": [
    {
      "name": "esdoc-plugin-require-coverage",
      "option": {
        "required": 80
      }
    }
  ]
}
```

In the above example, a coverage of 80% would be tested.
