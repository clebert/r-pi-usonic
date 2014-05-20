#include "clock.h"
#include "gpio.h"

#include <errno.h>
#include <node.h>
#include <v8.h>

namespace {

    volatile uint32_t *memory;

    v8::Handle<v8::Value> getDistanceCm(const v8::Arguments &args) {
        v8::HandleScope scope;

        const uint32_t echoPin = args[0]->ToInteger()->Value();
        const uint32_t triggerPin = args[1]->ToInteger()->Value();

        RPiGpio::setDirection(memory, echoPin, RPiGpio::INPUT);
        RPiGpio::setDirection(memory, triggerPin, RPiGpio::OUTPUT);

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::HIGH);

        if (RPiClock::setDelayNs(10000) == -1) {
            ThrowException(node::ErrnoException(errno));

            return scope.Close(v8::Undefined());
        }

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::LOW);

        int32_t startNs;

        do {
            startNs = RPiClock::getNowNs();

            if (startNs == -1) {
                ThrowException(node::ErrnoException(errno));

                return scope.Close(v8::Undefined());
            }
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::LOW);

        int32_t stopNs;

        do {
            stopNs = RPiClock::getNowNs();

            if (stopNs == -1) {
                ThrowException(node::ErrnoException(errno));

                return scope.Close(v8::Undefined());
            }
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::HIGH);

        const double distanceCm = (double) RPiClock::getDurationNs(startNs, stopNs) / 58000.0;

        return scope.Close(v8::Number::New(distanceCm));
    }

    void init(v8::Handle<v8::Object> exports) {
        memory = RPiGpio::getMemory();

        if (memory == NULL) {
            ThrowException(node::ErrnoException(errno));

            return;
        }

        exports->Set(v8::String::NewSymbol("getDistanceCm"), v8::FunctionTemplate::New(getDistanceCm)->GetFunction());
    }

    NODE_MODULE(usonic, init);
}
