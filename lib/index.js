const https = require('https');

class Chapi {
    hostname = "https://botqa.live";
    instanceID;
    token;

    constructor(instanceID, token) {
        this.token = token;
        this.instanceID = instanceID;
    }

    sendMessage(phone, message) {
        return this._request('POST', `send/${this.instanceID}`, {
            phone: phone,
            body: message
        });
    }

    updateStatus(phone, status) {
        return this._request('POST',`update/status/${this.instanceID}/${status}`, {});
    }

    sendFile(phone, url) {
        return this._request('POST', `sendFile/${this.instanceID}`, {
            phone: phone,
            body: url
        });
    }

    getStatus() {
        return this._request('GET', `status/${this.instanceID}`);
    }

    getScreen() {
        return this._request('GET', `screen/${this.instanceID}`);
    }

    signIn(phone) {
        return this._request('POST', `signin/${this.instanceID}/${phone}`);
    }

    signOut() {
        return this._request('DELETE', `signout/${this.instanceID}`);
    }

    restart() {
        return this._request('GET', `restart/${this.instanceID}`);
    }

    /* private */
    _request(method, path, data) {
        const options = {
            'method': method,
            'hostname': hostname,
            'port': 8000,
            'path': `/api/v1/${path}`,
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                const chunks = [];

                res.on("data", (chunk) => {
                    chunks.push(chunk);
                });

                res.on("end", () => {
                    const body = Buffer.concat(chunks);
                    resolve(body.toString());
                });

                res.on("error", (error) => {
                    reject(error);
                });
            });
            if (data) {
                req.write(data);
            }
            req.end();
        });
    }
}


export const Chapi = Chapi;