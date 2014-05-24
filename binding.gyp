{
    "targets": [
        {
            "target_name": "usonic",
            "sources": [
                "src/clock.cc",
                "src/gpio.cc",
                "src/node_usonic.cc"
            ],
            "include_dirs" : [
                "node_modules/nan",
                "node_modules/r-pi-gpio/src"
            ]
        }
    ]
}
