const https = require('https');

class Chapi {
    hostname = "https://botqa.live";
    instanceID;
    token;

    constructor(instanceID, token) {
        this.token = token;
        this.instanceID = instanceID;
    }

    /* public */
    sendMessage(phone, message) {
        return this.post(`send/${this.instanceID}`, {
            phone: phone,
            body: message
        });
    }

    /* public */
    updateStatus(phone, status) {
        return this.post(`update/status/${this.instanceID}/${status}`, {});
    }

    /* public */
    sendFile(phone, url) {
        return this.post(`sendFile/${this.instanceID}`, {
            phone: phone,
            body: url
        });
    }

    /* public */
    getStatus() {
        return this.get(`status/${this.instanceID}`);
    }

    /* public */
    getScreen() {
        return this.get(`screen/${this.instanceID}`);
    }

    /* public */
    restart() {
        return this.get(`restart/${this.instanceID}`);
    }

    /* private */ 
    get(path) {
        const options = {
            'method': 'GET',
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
              
                res.on("end", (chunk) => {
                  const body = Buffer.concat(chunks);
                  resolve(body.toString());
                });
              
                res.on("error", (error) => {
                  reject(error);
                });
            });
              
            req.end();
        });    
    }

    /* private */ 
    post(path, data) {
        const options = {
            'method': 'POST',
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
            
            req.write(data);
            req.end();
        });    
    }
}


export const Chapi = Chapi;