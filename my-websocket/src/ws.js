const { EventEmitter } = require('events');
const http = require('http');
const crypto = require('crypto');


function hashKey(key) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
    return sha1.digest('base64');
}

// 继承 EventEmitter 是为了可以用 emit 发送一些事件，外界可以通过 on 监听这个事件来处理。
class MyWebsocket extends EventEmitter {
    constructor(options) {
        super(options);

        const server = http.createServer();
        server.listen(options.port || 8080);

        // 在构造函数里创建了一个 http 服务，当 ungrade 事件发生，也就是收到了 Connection: upgrade 的 header 的时候，返回切换协议的 header
        server.on('upgrade', (req, socket) => {
            this.socket = socket;
            socket.setKeepAlive(true);

            const resHeaders = [
                'HTTP/1.1 101 Switching Protocols',
                'Upgrade: websocket',
                'Connection: Upgrade',
                'Sec-WebSocket-Accept: ' + hashKey(req.headers['sec-websocket-key']),
                '',
                ''
            ].join('\r\n');
            socket.write(resHeaders);

            socket.on('data', (data) => {
                console.log(data)
            });
            socket.on('close', (error) => {
                this.emit('close');
            });
        });

    }
}
