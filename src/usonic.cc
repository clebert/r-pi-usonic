#include "clock.h"
#include "gpio.h"
#include "nan.h"

#include <errno.h>

namespace {

    volatile uint32_t *memory;

    static NAN_METHOD(getDistanceCm) {
        NanScope();

        const uint32_t echoPin = args[0]->ToInteger()->Value();
        const uint32_t triggerPin = args[1]->ToInteger()->Value();

        RPiGpio::setDirection(memory, echoPin, RPiGpio::INPUT);
        RPiGpio::setDirection(memory, triggerPin, RPiGpio::OUTPUT);

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::HIGH);

        if (RPiClock::setDelayNs(10000) == -1) {
            NanThrowError(node::ErrnoException(errno));
            NanReturnUndefined();
        }

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::LOW);

        int32_t startNs;

        do {
            startNs = RPiClock::getNowNs();

            if (startNs == -1) {
                NanThrowError(node::ErrnoException(errno));
                NanReturnUndefined();
            }
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::LOW);

        int32_t stopNs;

        do {
            stopNs = RPiClock::getNowNs();

            if (stopNs == -1) {
                NanThrowError(node::ErrnoException(errno));
                NanReturnUndefined();
            }
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::HIGH);

        const double distanceCm = (double) RPiClock::getDurationNs(startNs, stopNs) / 58000.0;

        NanReturnValue(NanNew<v8::Number>(distanceCm));
    }

    void init(v8::Handle<v8::Object> exports) {
        memory = RPiGpio::getMemory();

        if (memory == NULL) {
            NanThrowError(node::ErrnoException(errno));

            return;
        }

        NODE_SET_METHOD(exports, "getDistanceCm", getDistanceCm);
    }

    NODE_MODULE(usonic, init);
}
