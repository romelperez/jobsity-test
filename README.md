# Jobsity Test

[![prhone](https://img.shields.io/badge/prhone-project-1b38a9.svg)](http://romelperez.com)
[![Build Status](https://travis-ci.org/romelperez/jobsity-test.svg?branch=master)](https://travis-ci.org/romelperez/jobsity-test)
[![license](https://img.shields.io/github/license/romelperez/jobsity-test.svg?maxAge=2592000)](./LICENSE)

- [Specifications](./SPECS.md)
- [romelperez-jobsity.herokuapp.com](http://romelperez-jobsity.herokuapp.com)

## Setup

Requires Node.js v6+, webpack and gulp.

```bash
$ npm install
$ npm install -g webpack gulp
```

## API

| Command               | Description                     |
| :-------------------- | :------------------------------ |
| `npm run start`       | Start the server in development |
| `npm run build`       | Build assets in production mode |
| `npm run test`        | Run test suites                 |
| `webpack -w`          | Start JS build with watcher     |
| `gulp`                | Start CSS build with watcher    |
