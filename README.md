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

### usonic.init(callback)

Creates the memory mapping with a device-specific memory offset.

**You must call this function only once and before any other function.**

```javascript
usonic.init(function (error) {
    if (error) {
        ...
    } else {
        ...
    }
});
```

### usonic.createSensor(echoPin, triggerPin, [timeout])

Creates a new ultrasonic sensor function and returns it.
The measurement timeout has a default value of 750 µs.

```javascript
var sensor = usonic.createSensor(24, 23, 450);
```

### sensor()

Returns the distance in cm if no measurement timeout occurs, and -1 otherwise.

```javascript
var distance = sensor();
```

## Example

This example needs access to the physical memory, so it must run as root.

```sh
sudo node examples/surveyor.js
```

![Example: hcsr04.png](https://raw.githubusercontent.com/clebert/r-pi-usonic/master/resources/hcsr04.png)

## Raspberry Pi GPIO Pin Layout

### Raspberry Pi Model A/B (Rev 1.0)

| Assignment         | Pin | Pin | Assignment         |
| :----------------- | :-- | :-- | :----------------- |
| 3.3V               | 1   | 2   | 5V                 |
| GPIO 0 (SDA0)      | 3   | 4   | 5V                 |
| GPIO 1 (SCL0)      | 5   | 6   | GROUND             |
| GPIO 4             | 7   | 8   | GPIO 14 (TXD0)     |
| GROUND             | 9   | 10  | GPIO 15 (RXD0)     |
| GPIO 17            | 11  | 12  | GPIO 18            |
| GPIO 21            | 13  | 14  | GROUND             |
| GPIO 22            | 15  | 16  | GPIO 23            |
| 3.3V               | 17  | 18  | GPIO 24            |
| GPIO 10 (SPI_MOSI) | 19  | 20  | GROUND             |
| GPIO 9  (SPI_MISO) | 21  | 22  | GPIO 25            |
| GPIO 11 (SPI_SCLK) | 23  | 24  | GPIO 8 (SPI_CE0_N) |
| GROUND             | 25  | 26  | GPIO 7 (SPI_CE1_N) |

### Raspberry Pi Model A/B (Rev 2.0)

| Assignment         | Pin | Pin | Assignment         |
| :----------------- | :-- | :-- | :----------------- |
| 3.3V               | 1   | 2   | 5V                 |
| GPIO 2 (SDA1)      | 3   | 4   | 5V                 |
| GPIO 3 (SCL1)      | 5   | 6   | GROUND             |
| GPIO 4             | 7   | 8   | GPIO 14 (TXD0)     |
| GROUND             | 9   | 10  | GPIO 15 (RXD0)     |
| GPIO 17            | 11  | 12  | GPIO 18            |
| GPIO 27            | 13  | 14  | GROUND             |
| GPIO 22            | 15  | 16  | GPIO 23            |
| 3.3V               | 17  | 18  | GPIO 24            |
| GPIO 10 (SPI_MOSI) | 19  | 20  | GROUND             |
| GPIO 9  (SPI_MISO) | 21  | 22  | GPIO 25            |
| GPIO 11 (SPI_SCLK) | 23  | 24  | GPIO 8 (SPI_CE0_N) |
| GROUND             | 25  | 26  | GPIO 7 (SPI_CE1_N) |

### Raspberry Pi Model B+ / Raspberry Pi 2 Model B

| Assignment         | Pin | Pin | Assignment         |
| :----------------- | :-- | :-- | :----------------- |
| 3.3V               | 1   | 2   | 5V                 |
| GPIO 2 (SDA1)      | 3   | 4   | 5V                 |
| GPIO 3 (SCL1)      | 5   | 6   | GROUND             |
| GPIO 4             | 7   | 8   | GPIO 14 (TXD0)     |
| GROUND             | 9   | 10  | GPIO 15 (RXD0)     |
| GPIO 17            | 11  | 12  | GPIO 18            |
| GPIO 27            | 13  | 14  | GROUND             |
| GPIO 22            | 15  | 16  | GPIO 23            |
| 3.3V               | 17  | 18  | GPIO 24            |
| GPIO 10 (SPI_MOSI) | 19  | 20  | GROUND             |
| GPIO 9  (SPI_MISO) | 21  | 22  | GPIO 25            |
| GPIO 11 (SPI_SCLK) | 23  | 24  | GPIO 8 (SPI_CE0_N) |
| GROUND             | 25  | 26  | GPIO 7 (SPI_CE1_N) |
| ID_SD              | 27  | 28  | ID_SC              |
| GPIO 5             | 29  | 30  | GROUND             |
| GPIO 6             | 31  | 32  | GPIO 12            |
| GPIO 13            | 33  | 34  | GROUND             |
| GPIO 19            | 35  | 36  | GPIO 16            |
| GPIO 26            | 37  | 38  | GPIO 20            |
| GROUND             | 39  | 40  | GPIO 21            |

## Related Links

- [Ultrasonic Ranging Module HC-SR04](http://www.micropik.com/PDF/HCSR04.pdf)
- [Ultraschall Messmodul HC-SR04](http://www.mikrocontroller.net/attachment/218122/HC-SR04_ultraschallmodul_beschreibung_3.pdf)

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
