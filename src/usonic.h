#ifndef R_PI_USONIC_H_
#define R_PI_USONIC_H_

#include <stdint.h>

namespace RPiUsonic {

    double getDistanceCm(volatile uint32_t *memory, const uint32_t echoPin, const uint32_t triggerPin);
}

#endif
