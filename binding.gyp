{
    "targets": [
        {
            "target_name": "usonic",
            "sources": [
                "src/clock.cc",
                "src/gpio.cc",
                "src/usonic.cc"
            ],
            "include_dirs" : [
                "<!(node -e \"require('nan')\")"
            ]
        }
    ]
}
