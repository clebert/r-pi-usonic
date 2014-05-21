# r-pi-usonic [![Build Status](https://travis-ci.org/clebert/r-pi-usonic.png?branch=master)](https://travis-ci.org/clebert/r-pi-usonic) [![NPM version](https://badge.fury.io/js/r-pi-usonic.png)](https://badge.fury.io/js/r-pi-usonic)

> A high performance, memory mapped, Node.js API for the HC-SR04 ultrasonic sensor on Raspberry Pi.

## Installation

```sh
npm install r-pi-usonic --save
```

## Usage

### Node.js

```javascript
var UltrasonicSensor = require('r-pi-usonic').UltrasonicSensor;
```

### API

### UltrasonicSensor(echoPin: number, triggerPin: number) => void

```javascript
var ultrasonicSensor = new UltrasonicSensor(15, 14);
```

### ultrasonicSensor.getDistanceCm() => number

```javascript
var distanceCm = ultrasonicSensor.getDistanceCm();
```

## Running the tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```

## License

Licensed under the MIT license.
