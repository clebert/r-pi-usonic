# r-pi-usonic [![Build Status](https://travis-ci.org/clebert/r-pi-usonic.png?branch=master)](https://travis-ci.org/clebert/r-pi-usonic) [![NPM version](https://badge.fury.io/js/r-pi-usonic.png)](https://badge.fury.io/js/r-pi-usonic)

> A high performance, memory mapped, Node.js API for the HC-SR04 ultrasonic sensor connected to a Raspberry Pi.

## Installation

```sh
npm install r-pi-usonic
```

## Usage

### Node.js

```javascript
var UltrasonicSensor = require('r-pi-usonic').UltrasonicSensor;
```

### API

#### UltrasonicSensor(echoPin: number, triggerPin: number) => void

```javascript
var ultrasonicSensor = new UltrasonicSensor(15, 14);
```

#### ultrasonicSensor.getDistanceCm() => number

```javascript
var distanceCm = ultrasonicSensor.getDistanceCm();
```

### Example

```sh
sudo ./node_modules/r-pi-usonic/example/median.js
```

![HC-SR04 ultrasonic sensor](https://raw.githubusercontent.com/clebert/r-pi-usonic/dev/img/hcsr04.png)

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
