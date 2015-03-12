# Mycs Servers
[![Build Status](https://secure.travis-ci.org/mehranhatami/mycs-servers.png?branch=master)](http://travis-ci.org/mehranhatami/mycs-servers)
[![Code Climate](https://codeclimate.com/github/mehranhatami/mycs-servers/badges/gpa.svg)](https://codeclimate.com/github/mehranhatami/mycs-servers)

# About

This app is a unified dashboard to monitor the health of [Mycs](https://mycs.com/) APIs. The architecture is based on micro-services, so that there are many different APIs. Some have an integrated Healthcheck endpoint, others don’t.

# To do
To examine the tasks and the whole to-do list check this out: [todo.md](https://github.com/mehranhatami/mycs-servers/blob/master/todo.md)

## Build & development

Run `grunt` and `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` and `grunt test` will run the unit tests with [karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/).
