#include "gpio.h"
#include "usonic.h"

#include <node.h>
#include <v8.h>

namespace {

    volatile uint32_t *memory;

    v8::Handle<v8::Value> getDistanceCm(const v8::Arguments &args) {
        v8::HandleScope scope;

        const uint32_t echoPin = args[0]->ToInteger()->Value();
        const uint32_t triggerPin = args[1]->ToInteger()->Value();

        const double distanceCm = RPiUsonic::getDistanceCm(memory, echoPin, triggerPin);

        return scope.Close(v8::Number::New(distanceCm));
    }

    void init(v8::Handle<v8::Object> exports) {
        v8::HandleScope scope;

        memory = RPiGpio::getMemory();

        exports->Set(v8::String::NewSymbol("getDistanceCm"), v8::FunctionTemplate::New(getDistanceCm)->GetFunction());
    }

    NODE_MODULE(usonic, init);
}
