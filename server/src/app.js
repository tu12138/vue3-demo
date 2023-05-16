// const http = require('http');
const ws = require('nodejs-websocket')
const moment = require('moment')

const hostname = '127.0.0.1';
const port = 3000;

console.log('开始建立连接...');

// 记录当前链接用户数量
let users = []

// 向所有的连接客户端广播
function boardcast(obj) {
    server.connections.forEach(function (connect) {
        connect.sendText(JSON.stringify(obj))
    })
}


function getDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

const server = ws.createServer(function (connect) {
    // 监听消息发送信息
    connect.on('text', (obj) => {
        obj = JSON.parse(obj)
        console.log('message:' + obj);
        if (obj.type === 1) {
            users.push({
                nickname: obj.nickname,
                uid: obj.uid
            });
            boardcast({
                type: 1,
                date: getDate(),
                msg: '欢迎' + obj.nickname + '加入聊天室',
                users: users,
                uid: obj.uid,
                nickname: obj.nickname
            })
        } else {
            boardcast({
                type: 2,
                date: getDate(),
                msg: obj.msg,
                uid: obj.uid,
                nickname: obj.nickname
            });
        }
    })

    // 监听关闭信息
    connect.on('close', (code, reason) => {
        console.log(code, reason);
        console.log('连接关闭...');
    })

    // 监听错误消息
    connect.on('error', (code, reason) => {
        console.log(code, reason);
        console.log('异常关闭...');
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at ws://${hostname}:${port}/`);
});

console.log(users);

console.log("WebSocket建立完毕")