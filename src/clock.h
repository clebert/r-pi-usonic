#ifndef R_PI_CLOCK_H_
#define R_PI_CLOCK_H_

#include <stdint.h>

namespace RPiClock {

    int32_t setDelayNs(const int32_t durationNs);

    int32_t getDurationNs(const int32_t startNs, const int32_t stopNs);

    int32_t getNowNs();
}

#endif
