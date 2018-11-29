# Spider Drone
Interacting with Tello using Rainbow

This project was made for Rainbow Hackathon Brazil.

## Requirements

[nodejs](https://nodejs.org/en/)

## Installation

```bash
npm install
```

## Configuration

The `options` parameter allows to enter your credentials and to target the Rainbow Cloud Services server to use.

```js

// Define your configuration
let options = {
    "rainbow": {
        "host": "sandbox",
    },
    "credentials": {
        "login": "your@rainbow.account.com",  // To replace by your developer credendials
        "password": "thePassword!123"  // To replace by your developer credentials
    },
    // Application identifier
    "application": {
        "appID": "YOUR_APPLICATION_ID_HERE", // To replace by your application ID
        "appSecret": "YOUR_APPLICATION_SECRET_HERE", // To replace by your application secret
    },
    // Logs options
    "logs": {
        "enableConsoleLogs": true,
        "enableFileLogs": false,
        "file": {
            "path": '/var/tmp/rainbowsdk/',
            "level": 'debug'
        }
    },
    // IM options
    "im": {
        "sendReadReceipt": true
    }
};

```

## Start

```bash
npm start
```

To quit the program, enter ctrl-c

