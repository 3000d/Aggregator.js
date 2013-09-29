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
2. Run `npm install` in server/ folder
3. Copy `config.js.dist` content, create a file named `config.js` and paste the content
4. Change parameters in `config.js`
5. Create database (see *Database structure*) or choose not to use one in `config.js`
6. Launch node server : `node server/index.js`

## How to use ##

- Send SMS with POST requests on **localhost:14241/sms_in** (where "sender" is the phone number and "text" is the message)
- Listen to **localhost:14240** to receive tweets and SMS

## Database structure ##

While there it is planned to use a more flexible database system (like mongoDB or couchDB), the database is currently managed by mysql.

There is only one table used, and its structure is as such :

- `id|int(10)`
- `type|varchar(30)`
- `text|varchar(1600)`
- `sender_info|varchar(50)`
- `sent_dt|datetime`
- `status|int(3)`
- `status_date|datetime`