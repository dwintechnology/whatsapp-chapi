<img  src="https://png.pngtree.com/element_our/md/20180301/md_5a9797d574aa7.png" alt="whatsApp" border="0" width="30%"><img src="https://firebasestorage.googleapis.com/v0/b/study-4a5f6.appspot.com/o/%D0%BB%D0%BE%D0%B3%D0%BE%20%D0%BC%D0%B0%D0%BA%D1%814.png?alt=media&token=9217b241-9f55-449e-ba18-321d39904074" height="400"/>

# WhatsApp Node.JS Bot API
Use this library to develop a bot for the WhatsApp platform.
The library is available on **[GitHub](https://github.com/dwintechnology/whatsapp-chapi)** as well as a package on [npm](https://www.npmjs.com/package/whatsapp-chapi).

## Get Started Video
<a href=""http://www.youtube.com/watch?feature=player_embedded&v=vscKH82tYDc"
" target="_blank"><img src="http://img.youtube.com/vi/vscKH82tYDc/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Demo
Send a message to **[+ (374) 98 445878](https://api.whatsapp.com/send?phone=37498445878&text=hi)** through WhatsApp and test the API.

## License
This library is released under the terms of the MIT license. See [License](https://github.com/dwintechnology/whatsapp-chapi/LICENSE.md) for more information.

## Library Prerequisites

1. Node >= 8.0.0
1. WhatsApp account.
1. Active Instance Id - Get an instance [here](http://chapi.me).
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
3. Create a 'Chapi' [instance](http://chapi.me/)
4. Scan your QR [here](http://chapi.me/qr)
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
bot.setWebhook("https://my.bot/incoming")
  .then(() => yourBot.doSomething())
  .catch(err => console.log(err));
```

### bot.signIn(phone)

| Param | Type | Description |
| --- | --- | --- |
| phone | `string` | Your whatsApp account phone |

Returns a `promise.JSON`.

```js
bot.signIn("12345678911")
  .then(() => yourBot.doSomething())
  .catch(err => console.log(err));
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
### bot.sendPreviewUrl(phone, urlContent)

| Param | Type | Description |
| --- | --- | --- |
| phone | [`string`](#WhatsAppPhoneNumber) | `WhatsAppPhoneNumber` string |
| urlContent | `JSON` | text message to send |

**Note:** Phone number should be in following format `12345678912`, without `+` or any other symbols

Returns a `promise.JSON`.

```js
// Single message
const Chapi = require('whatsapp-chapi');
const bot = new Chapi(YOUR_INSTANCE_ID_HERE, YOUR_AUTH_TOKEN_HERE);
bot.sendPreviewUrl('12345678912', {
  title : 'Preview title', 
  desc : 'Preview description', 
  text : 'Preview text',
  url : 'Preview url', 
  thumb : 'Preview image'
});

```
**Note:** Preview image should be in following format [Base64](https://en.wikipedia.org/wiki/Base64)
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

### bot.getStatus()

Returns a `promise.JSON`.


```js
// File message
const Chapi = require('whatsapp-chapi');
const bot = new Chapi(YOUR_INSTANCE_ID_HERE, YOUR_AUTH_TOKEN_HERE);
bot.getStatus()
.then((res) => {
  console.log(res); // returns account status, return QR code if status is pending
});
```

## Docs & Community

  * [Website and Documentation](http://chapi.me/)
  * [Scan QR](http://chapi.me/qr)
  * [Swagger Documentation](http://chapi.me:3333/api-docs/#/)
  * [Find us or ask a question in telegram](http://t.me/whatsapp_chapi)

## Sample project
We've created the [sample project](https://github.com/dwintechnology/sample-whatsApp-bot) to help you get started.