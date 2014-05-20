#include "clock.h"

#include <errno.h>
#include <time.h>
#include <node.h>

namespace RPiClock {

    void setDelayNs(const uint32_t durationNs) {
        const uint32_t startNs = getNowNs();

        while (1) {
            if (getDurationNs(startNs, getNowNs()) >= durationNs) {
                break;
            }
        }
    }

    uint32_t getDurationNs(const uint32_t startNs, const uint32_t stopNs) {
        int32_t durationNs = stopNs - startNs;

        if (durationNs < 0) {
            durationNs += 1000000000;
        }

        return durationNs;
    }

    uint32_t getNowNs(void) {
        struct timespec now;

        #ifndef __MACH__
        if (clock_gettime(CLOCK_REALTIME, &now) == -1) {
            ThrowException(node::ErrnoException(errno));

            return 0;
        }
        #endif

        return now.tv_nsec;
    }
}
