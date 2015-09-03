#include "clock.h"
#include "gpio.h"
#include "nan.h"

#include <errno.h>

namespace {

    volatile uint32_t *memory;

    static NAN_METHOD(getDistance) {
        const int32_t echoPin = info[0]->ToInteger()->Value();
        const int32_t triggerPin = info[1]->ToInteger()->Value();
        const int32_t timeoutNs = info[2]->ToInteger()->Value() * 1000;

        RPiGpio::setDirection(memory, echoPin, RPiGpio::INPUT);
        RPiGpio::setDirection(memory, triggerPin, RPiGpio::OUTPUT);

        RPiGpio::setLevel(memory, triggerPin, true);

        if (RPiClock::setDelayNs(10000) == -1) {
            return Nan::ThrowError(Nan::NanErrnoException(errno, "getDistance", "", NULL));
        }

        RPiGpio::setLevel(memory, triggerPin, false);

        const int32_t loopStartNs = RPiClock::getNowNs();

        if (loopStartNs == -1) {
            return Nan::ThrowError(Nan::NanErrnoException(errno, "getDistance", "", NULL));
        }

        int32_t signalStartNs;

        do {
            signalStartNs = RPiClock::getNowNs();

            if (signalStartNs == -1) {
                return Nan::ThrowError(Nan::NanErrnoException(errno, "getDistance", "", NULL));
            }

            if (RPiClock::getDurationNs(loopStartNs, signalStartNs) > timeoutNs) {
                return info.GetReturnValue().Set(Nan::New<v8::Number>(-1));
            }
        } while(RPiGpio::getLevel(memory, echoPin) == false);

        int32_t signalStopNs;

        do {
            signalStopNs = RPiClock::getNowNs();

            if (signalStopNs == -1) {
                return Nan::ThrowError(Nan::NanErrnoException(errno, "getDistance", "", NULL));
            }
        } while(RPiGpio::getLevel(memory, echoPin) == true);

        const double distance = (double) RPiClock::getDurationNs(signalStartNs, signalStopNs) / 58000.0;

        info.GetReturnValue().Set(Nan::New<v8::Number>(distance));
    }

    static NAN_METHOD(init) {
        const uint32_t model = info[0]->ToInteger()->Value();

        if (model == 1) {
            memory = RPiGpio::getMemory(0x20200000);
        } else if (model == 2) {
            memory = RPiGpio::getMemory(0x3F200000);
        }

        if (memory == NULL) {
            return Nan::ThrowError(Nan::NanErrnoException(errno, "init", "", NULL));
        }

        info.GetReturnValue().Set(Nan::Undefined());
    }

    static NAN_MODULE_INIT(main) {
        Nan::Set(target, Nan::New<v8::String>("getDistance").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getDistance)).ToLocalChecked());
        Nan::Set(target, Nan::New<v8::String>("init").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(init)).ToLocalChecked());
    }

    NODE_MODULE(usonic, main);
}
