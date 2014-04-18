# r-pi-usonic [![NPM version](https://badge.fury.io/js/r-pi-usonic.png)](https://badge.fury.io/js/r-pi-usonic)

> A Node.js API for the HC-SR04 ultrasonic sensor on Raspberry Pi.

## Installation

    $ npm install r-pi-usonic --save

## Usage

### Node.js

    var UltrasonicSensor = require('r-pi-usonic').UltrasonicSensor;

### API

#### Constructor

* UltrasonicSensor(echoID: string, triggerID: string) => Object

#### Static methods

* UltrasonicSensor.create(echoID: string, triggerID: string) => Object

#### Instance methods

* UltrasonicSensor.prototype.destroy() => void
* UltrasonicSensor.prototype.measureDistanceInCm() => number

## Running the tests

To run the test suite first install the development dependencies:

    $ npm install

then run the tests:

    $ npm test

## License

Licensed under the MIT license.
