# r-pi-usonic

> A high performance, memory mapped, Node.js API for the HC-SR04 ultrasonic sensor connected to a Raspberry Pi.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/r-pi-usonic/master/LICENSE)
[![npm](http://img.shields.io/npm/v/r-pi-usonic.svg?style=flat)](https://www.npmjs.org/package/r-pi-usonic)
[![downloads](http://img.shields.io/npm/dm/r-pi-usonic.svg?style=flat)](https://www.npmjs.org/package/r-pi-usonic)

[![build](http://img.shields.io/travis/clebert/r-pi-usonic/master.svg?style=flat)](https://travis-ci.org/clebert/r-pi-usonic)
[![coverage](http://img.shields.io/coveralls/clebert/r-pi-usonic/master.svg?style=flat)](https://coveralls.io/r/clebert/r-pi-usonic)
[![code climate](http://img.shields.io/codeclimate/github/clebert/r-pi-usonic.svg?style=flat)](https://codeclimate.com/github/clebert/r-pi-usonic)
[![dependencies](http://img.shields.io/david/clebert/r-pi-usonic.svg?style=flat)](https://david-dm.org/clebert/r-pi-usonic#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/r-pi-usonic.svg?style=flat)](https://david-dm.org/clebert/r-pi-usonic#info=devDependencies&view=table)

## Getting Started

### Installation

```sh
npm install r-pi-usonic --save
```

### Integration

```javascript
var usonic = require('r-pi-usonic');
```

## API

### usonic.sensor(echoPin, triggerPin)

Creates a new ultrasonic sensor function and returns it.

```javascript
var sensor = usonic.sensor(24, 23);
```

### sensor()

Returns the distance in cm if the target is within 2 to 400 cm, and false otherwise.

```javascript
var distance = sensor();
```

## Example

```sh
sudo node node_modules/r-pi-usonic/example/surveyor.js
```

![Image: hcsr04.png](https://raw.githubusercontent.com/clebert/r-pi-usonic/master/img/hcsr04.png)

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

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
