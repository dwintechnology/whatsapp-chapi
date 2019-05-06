# WhatsApp Node.JS Bot API
Use this library to develop a bot for the WhatsApp platform.
The library is available on **[GitHub](https://github.com/dwintechnology/whatsapp-chapi)** as well as a package on [npm](https://www.npmjs.com/package/whatsapp-chapi).

## License
This library is released under the terms of the Apache 2.0 license. See [License](https://github.com/dwintechnology/whatsapp-chapi/LICENSE.md) for more information.

## Library Prerequisites

1. Node >= 8.0.0
1. WhatsApp account.
1. Active Instance Id - Get an instance [here](https://ToDO).
1. Account authentication token - unique account identifier used to validate your instance in all API requests.
1. Webhook - Please use a server endpoint URL that supports HTTP/HTTPS.

## Installation
This library is released on [npm](https://www.npmjs.com/package/whatsapp-chapi).

### npm
Install with [`npm install whatsapp-chapi --save`](https://www.npmjs.com/package/whatsapp-chapi)

### Express
If you are already using express or equivalent, you can do the following:

```js
app.use("/whatsapp/webhook", bot.middleware());
```
Please revisit [app.use()](http://expressjs.com/en/api.html#app.use) documentation.
For more information see [bot.middleware()](#middleware).

## Let's get started!
Creating a basic WhatsApp bot is simple:

1. Import `whatsapp-chapi` library to your project
2. Create an endpoint for notifications
4. Create a 'Chapi' instance
5. Start your web server
6. Call `setWebhook(url)` with your web server url

### Creating an echo Bot
Firstly, let's *import and configure* our bot:

```js
'use strict';
var express = require('express');
const Chapi = require('whatsapp-chapi');

const app = express();
const bot = new Chapi(YOUR_INSTANCE_ID_HERE, YOUR_AUTH_TOKEN_HERE);
bot.signIn('YOUR_WHATSAPP_ACCOUNT_PHONE');

app.post('/YOUR_WEBHOOK_HERE', function (req, res) {
  bot.sendMessage(req.body.messages[0].author, 'ECHO TEXT');
  res.sendStatus(200);
});


// Wasn't that easy? Let's create HTTPS server and set the webhook:
const http = require('http');
const port = process.env.PORT || 8080;

// Chapi will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = process.env.WEBHOOK_URL;
http.createServer(app).listen(port, () => bot.setWebhook(webhookUrl));
```

## API

### bot.setWebhook(url)

| Param | Type | Description |
| --- | --- | --- |
| url | `string` | Full url to your endpoint for message notification |

Returns a `promise.JSON`.

```js
bot.setWebhook("https://my.bot/incoming").then(() => yourBot.doSomething()).catch(err => console.log(err));
```

### bot.signIn(phone)

| Param | Type | Description |
| --- | --- | --- |
| phone | `string` | Your whatsApp account phone |

Returns a `promise.JSON`.

```js
bot.signIn("12345678911").then(() => yourBot.doSomething()).catch(err => console.log(err));
```
**Note:** Phone number should be in following format `12345678912`, without `+` or any other symbols

<a name="sendMessage"></a>

### bot.sendMessage(phone, message)

| Param | Type | Description |
| --- | --- | --- |
| phone | [`string`](#WhatsAppPhoneNumber) | `WhatsAppPhoneNumber` string |
| message | `string` | text message to send |

**Note:** Phone number should be in following format `12345678912`, without `+` or any other symbols

Returns a `promise.JSON`.

```js
// Single message
const Chapi = require('whatsapp-chapi');
const bot = new Chapi(YOUR_INSTANCE_ID_HERE, YOUR_AUTH_TOKEN_HERE);
bot.sendMessage('12345678912', 'Hello');
```
### bot.sendFile(phone, url)

| Param | Type | Description |
| --- | --- | --- |
| phone | [`string`](#WhatsAppPhoneNumber) | `WhatsAppPhoneNumber` string |
| url | `string` | download url for file |

Returns a `promise.JSON`.

```js
// File message
const Chapi = require('whatsapp-chapi');
const bot = new Chapi(YOUR_INSTANCE_ID_HERE, YOUR_AUTH_TOKEN_HERE);
bot.sendFile('12345678912', 'https://assets.fireside.fm/file/fireside-images/podcasts/images/b/bc7f1faf-8aad-4135-bb12-83a8af679756/cover_medium.jpg');
```

## Sample project
TODO.

