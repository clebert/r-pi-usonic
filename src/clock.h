#ifndef R_PI_CLOCK_H_
#define R_PI_CLOCK_H_

#include <stdint.h>

namespace RPiClock {

    void setDelayNs(const uint32_t durationNs);

    uint32_t getDurationNs(const uint32_t startNs, const uint32_t stopNs);

    uint32_t getNowNs(void);
}

#endif
