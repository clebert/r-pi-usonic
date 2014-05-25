# r-pi-usonic
[![Build Status](https://travis-ci.org/clebert/r-pi-usonic.png?branch=master)](https://travis-ci.org/clebert/r-pi-usonic)
[![Coverage Status](https://coveralls.io/repos/clebert/r-pi-usonic/badge.png)](https://coveralls.io/r/clebert/r-pi-usonic)
[![Code Climate](https://codeclimate.com/github/clebert/r-pi-usonic.png)](https://codeclimate.com/github/clebert/r-pi-usonic)
[![NPM version](https://badge.fury.io/js/r-pi-usonic.png)](https://badge.fury.io/js/r-pi-usonic)

> A high performance, memory mapped, Node.js API for the HC-SR04 ultrasonic sensor connected to a Raspberry Pi.

## Installation

```sh
npm install r-pi-usonic --save
```

## Usage

### Node.js

```javascript
var UltrasonicSensor = require('r-pi-usonic');
```

## API

### UltrasonicSensor(echoPin: number, triggerPin: number) => void

```javascript
var ultrasonicSensor = new UltrasonicSensor(24, 23);
```

### ultrasonicSensor.getDistanceCm() => number

Returns -1 if the distance to be measured is not within 2 cm - 400 cm, or if an error occurred during measurement.

```javascript
var distanceCm = ultrasonicSensor.getDistanceCm();
```

### ultrasonicSensor.getMedianDistanceCm(delayMs: number, skipErrors: boolean, callback: Function) => void

```javascript
ultrasonicSensor.getMedianDistanceCm(60, false, function (distanceCm) {
    // ...
});
```

## Example

```sh
sudo node node_modules/r-pi-usonic/example/surveyor.js
```

![The HC-SR04 ultrasonic sensor connected to a Raspberry Pi.](https://raw.githubusercontent.com/clebert/r-pi-usonic/master/img/hcsr04.png)

## Raspberry Pi GPIO Pin Layout (Revision 1)

| Assignment          | Pin | Pin | Assignment          |
| :------------------ | :-- | :-- | :------------------ |
| 3.3V                | 1   | 2   | 5V                  |
| GPIO 0 (I2C0 SDA)   | 3   | 4   | DNC                 |
| GPIO 1 (I2C0 SCL)   | 5   | 6   | GROUND              |
| GPIO 4              | 7   | 8   | GPIO 14 (UART TXD)  |
| DNC                 | 9   | 10  | GPIO 15 (UART RXD)  |
| GPIO 17             | 11  | 12  | GPIO 18             |
| GPIO 21             | 13  | 14  | DNC                 |
| GPIO 22             | 15  | 16  | GPIO 23             |
| DNC                 | 17  | 18  | GPIO 24             |
| GPIO 10 (SP10 MOSI) | 19  | 20  | DNC                 |
| GPIO 9  (SP10 MISO) | 21  | 22  | GPIO 25             |
| GPIO 11 (SP10 SCLK) | 23  | 24  | GPIO 8 (SP10 CE0 N) |
| DNC                 | 25  | 26  | GPIO 7 (SP10 CE1 N) |

## Raspberry Pi GPIO Pin Layout (Revision 2)

| Assignment          | Pin | Pin | Assignment          |
| :------------------ | :-- | :-- | :------------------ |
| 3.3V                | 1   | 2   | 5V                  |
| GPIO 2 (I2C1 SDA)   | 3   | 4   | 5V                  |
| GPIO 3 (I2C1 SCL)   | 5   | 6   | GROUND              |
| GPIO 4              | 7   | 8   | GPIO 14 (UART TXD)  |
| GROUND              | 9   | 10  | GPIO 15 (UART RXD)  |
| GPIO 17             | 11  | 12  | GPIO 18             |
| GPIO 27             | 13  | 14  | GROUND              |
| GPIO 22             | 15  | 16  | GPIO 23             |
| 3.3V                | 17  | 18  | GPIO 24             |
| GPIO 10 (SP10 MOSI) | 19  | 20  | GROUND              |
| GPIO 9  (SP10 MISO) | 21  | 22  | GPIO 25             |
| GPIO 11 (SP10 SCLK) | 23  | 24  | GPIO 8 (SP10 CE0 N) |
| GROUND              | 25  | 26  | GPIO 7 (SP10 CE1 N) |

## Links

- http://www.micropik.com/PDF/HCSR04.pdf
- http://www.mikrocontroller.net/attachment/218122/HC-SR04_ultraschallmodul_beschreibung_3.pdf

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
