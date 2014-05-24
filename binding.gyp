{
    "targets": [
        {
            "target_name": "usonic",
            "sources": [
                "src/clock.cc",
                "src/node_usonic.cc"
            ],
            "include_dirs" : [
                "<!(node -e \"require('nan')\")",
                "<!(node -p \"require.resolve('r-pi-gpio').replace('index.js', 'src')\")"
            ]
        }
    ]
}
