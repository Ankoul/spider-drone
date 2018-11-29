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



## Command list

# User command list
| Message | Action | Command |
|------------------ | ----- | ------ | ------ |
| **hi spider** | checks if drone are listen any orders or only its MASTER |   |
| **go spider** | take off the drone | takeoff |
| **rest spider** | land the drone | land |
| **go forward** | go forward | forward 100 |
| **go back** | go back | back 100 |
| **go left** | go left | left 100 |
| **go right** | go right | right 100 |
| **go up** | go up | up 60 |
| **go down** | go down | down 100 |
| **turn back** | turn back | cw 180 |
| **turn right** | turn right | cw 90 |
| **turn left** | turn left | ccw 90 |
| **flip** | flip forward | flip f |
| **web** | flip back | flip b |
| **360** | turn 360 degrees | ccw 360 |


# Master command list

This command list will only be executed if your Rainbow user is defined has its master.
To be its master you must be the first one to send the message "i am your master" to it.

| Message | Action | Command |
|------------------ | ----- | ------ | ------ |
| p | land drone | land |
| w | go forward | forward 100 |
| ww | go forward | forward 200 |
| s | go back | back 100 |
| ss | turn back | cw 180 |
| a | go left | left 100 |
| d | go right | right 100 |
| q | turn left | ccw 90 |
| e | turn right | cw 90 |
| W | go up | up 60 |
| S | go down | down 100 |
| SS | go down | down 200 |
| f | flip forward | flip f |
| F | flip back | flip b |
| / | stop to listen anyone but MASTER |   |
| ; | stop to listen anyone but MASTER |   |
| . | stop to listen anyone but MASTER |   |
| stop | stop to listen anyone but MASTER |   |
| free | free drone to listen anyone |   |

To quit the program, enter ctrl-c

