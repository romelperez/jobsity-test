# Jobsity Test

[![prhone](https://img.shields.io/badge/prhone-project-1b38a9.svg)](http://romelperez.com)
[![Build Status](https://travis-ci.org/romelperez/jobsity-test.svg?branch=master)](https://travis-ci.org/romelperez/jobsity-test)
[![license](https://img.shields.io/github/license/romelperez/jobsity-test.svg?maxAge=2592000)](./LICENSE)

- [Specifications](./SPECS.md)
- [Tasks](./TASKS.md)
- [Preview](http://romelperez-jobsity.herokuapp.com)

## Setup

Requires Node.js v6+, npm v3+.

```bash
$ npm install
```

## API

| Command                       | Description                     |
| :---------------------------- | :------------------------------ |
| `npm run build`               | Build assets in production mode |
| `npm run test`                | Run test suites                 |
| `npm run start:production`    | Start the server in development |

For development:

| Command               | Description                     |
| :-------------------- | :------------------------------ |
| `npm run start`       | Start the server in development |
| `npm run test-client` | Run client tests with watcher   |
| `npm run build:watch` | Build assets with watcher       |
