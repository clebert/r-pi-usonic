#include "clock.h"
#include "gpio.h"
#include "nan.h"

#include <errno.h>

namespace {

    volatile uint32_t *memory;

    static NAN_METHOD(getDistance) {
        NanScope();

        const int32_t echoPin = args[0]->ToInteger()->Value();
        const int32_t triggerPin = args[1]->ToInteger()->Value();
        const int32_t timeoutNs = args[2]->ToInteger()->Value() * 1000;

        RPiGpio::setDirection(memory, echoPin, RPiGpio::INPUT);
        RPiGpio::setDirection(memory, triggerPin, RPiGpio::OUTPUT);

        RPiGpio::setLevel(memory, triggerPin, true);

        if (RPiClock::setDelayNs(10000) == -1) {
            NanThrowError(node::ErrnoException(errno));
            NanReturnUndefined();
        }

        RPiGpio::setLevel(memory, triggerPin, false);

        const int32_t loopStartNs = RPiClock::getNowNs();

        if (loopStartNs == -1) {
            NanThrowError(node::ErrnoException(errno));
            NanReturnUndefined();
        }

        int32_t signalStartNs;

        do {
            signalStartNs = RPiClock::getNowNs();

            if (signalStartNs == -1) {
                NanThrowError(node::ErrnoException(errno));
                NanReturnUndefined();
            }

            if (RPiClock::getDurationNs(loopStartNs, signalStartNs) > timeoutNs) {
                NanReturnValue(NanNew<v8::Number>(-1));
            }
        } while(RPiGpio::getLevel(memory, echoPin) == false);

        int32_t signalStopNs;

        do {
            signalStopNs = RPiClock::getNowNs();

            if (signalStopNs == -1) {
                NanThrowError(node::ErrnoException(errno));
                NanReturnUndefined();
            }
        } while(RPiGpio::getLevel(memory, echoPin) == true);

        const double distance = (double) RPiClock::getDurationNs(signalStartNs, signalStopNs) / 58000.0;

        NanReturnValue(NanNew<v8::Number>(distance));
    }

    void init(v8::Handle<v8::Object> exports) {
        memory = RPiGpio::getMemory();

        if (memory == NULL) {
            NanThrowError(node::ErrnoException(errno));

            return;
        }

        NODE_SET_METHOD(exports, "getDistance", getDistance);
    }

    NODE_MODULE(usonic, init);
}
