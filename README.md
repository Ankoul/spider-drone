# Spider Drone
Interacting with a drone using Rainbow.

This project was made for Rainbow Hackathon Brazil.

The propose was to use Rainbow to interact with a drone and to achieve this we used DJI Tello.
![](dji-tello.jpg?raw=true)

## Requirements

[nodejs](https://nodejs.org/en/)

## Installation

```bash
npm install
```

## Configuration

The `options` parameter allows to enter your credentials and to target the Rainbow Cloud Services server to use.

```js

// Define your configuration inside src/rainbowConfig.json
{
    "rainbow": {
        "host": "openrainbow.com",
        "mode": "xmpp"
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
}

```

## Start

```bash
npm start
```

To quit the program, enter ctrl-c

