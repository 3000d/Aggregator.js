Vie Wallonne 2.5
================

A node.js server that aggregates tweets and SMS (short text messages).

SMS are coming as POST request sent by the software [SMS enabler](http://smsenabler.com/ "See SMS enabler website"), but there are different solutions available (see [smslib.org](http://smslib.org/) for Java or its [Processing bundle](http://www.pixelnerve.com/v/2009/07/05/smslib-sendreceive-sms-messages-on-your-computer/)).

## Features ##
- Receive SMS through HTTP POST request and send them to TCP clients
- Receive tweets from Twitter streaming API and send them to TCP clients
- Insert tweets and SMS into mysql database
- View tweets and SMS in a webpage through websockets

## Installation ##
1. Install [node.js](http://nodejs.org/)
2. Launch node server : `node server/index.js`
3. Copy config.js.dist content, create a file named `config.js` and paste the content
4. Change parameters in `config.js`

## How to use ##

- Send SMS with POST requests on **localhost:14241/sms_in** (where "sender" is the phone number and "text" is the message)
- Listen to **localhost:14240** to receive tweets and SMS