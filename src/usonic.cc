#include "clock.h"
#include "gpio.h"

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

        RPiClock::setDelayNs(10000); // trigger for at least 10us high level signal

        RPiGpio::setLevel(memory, triggerPin, RPiGpio::LOW);

        uint32_t startNs;

        do {
            startNs = RPiClock::getNowNs();
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::LOW);

        uint32_t stopNs;

        do {
            stopNs = RPiClock::getNowNs();
        } while(RPiGpio::getLevel(memory, echoPin) == RPiGpio::HIGH);

        const double distanceCm = (double) RPiClock::getDurationNs(startNs, stopNs) / 58000.0;

        return scope.Close(v8::Number::New(distanceCm));
    }

    void init(v8::Handle<v8::Object> exports) {
        exports->Set(v8::String::NewSymbol("getDistanceCm"), v8::FunctionTemplate::New(getDistanceCm)->GetFunction());

        memory = RPiGpio::getMemory();
    }

    NODE_MODULE(usonic, init);
}
