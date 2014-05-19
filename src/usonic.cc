#include "clock.h"
#include "gpio.h"
#include "usonic.h"

namespace RPiUsonic {

    double getDistanceCm(volatile uint32_t *memory, const uint32_t echoPin, const uint32_t triggerPin) {
        RPiGpio::setDirection(memory, echoPin, RPiGpio::input);
        RPiGpio::setDirection(memory, triggerPin, RPiGpio::output);

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::high);

        RPiClock::setDelayNs(10000); // trigger for at least 10us high level signal

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::low);

        uint32_t startNs;

        do {
            startNs = RPiClock::getNowNs();
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::low);

        uint32_t stopNs;

        do {
            stopNs = RPiClock::getNowNs();
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::high);

        return (double) RPiClock::getDurationNs(startNs, stopNs) / 58000.0;
    }
}
