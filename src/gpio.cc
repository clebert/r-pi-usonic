#include "gpio.h"

#include <fcntl.h>
#include <unistd.h>

#include <sys/mman.h>

namespace RPiGpio {

    Level getLevel(volatile uint32_t *memory, const uint32_t pin) {
        const uint32_t bit = pin % 32;
        const uint32_t offset = 13 + (pin > 31);
        const uint32_t value = *(memory + offset) & (1 << bit);

        return value > 0 ? HIGH : LOW;
    }

    volatile uint32_t *getMemory(void) {
        const int32_t fd = open("/dev/mem", O_RDWR | O_SYNC);

        if (fd == -1) {
            return NULL;
        }

        const size_t size = sysconf(_SC_PAGESIZE);
        const int32_t protection = PROT_READ | PROT_WRITE;
        const int32_t flags = MAP_SHARED;
        const off_t offset = 0x20200000;

        volatile uint32_t *memory = (volatile uint32_t *) mmap(NULL, size, protection, flags, fd, offset);

        close(fd);

        if (memory == MAP_FAILED) {
            return NULL;
        }

        return memory;
    }

    void setDirection(volatile uint32_t *memory, const uint32_t pin, const Direction direction) {
        const uint32_t bit = (pin % 10) * 3;
        const uint32_t offset = (pin / 10);

        *(memory + offset) &= ~(7 << bit);

        if (direction == OUTPUT) {
            *(memory + offset) |= (1 << bit);
        }
    }

    void setLevel(volatile uint32_t *memory, const uint32_t pin, const Level level) {
        const uint32_t bit = pin % 32;
        const uint32_t offset = (level == HIGH ? 7 : 10) + (pin > 31);

        *(memory + offset) = (1 << bit);
    }
}
