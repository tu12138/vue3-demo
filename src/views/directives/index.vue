<template>
    <!-- 判断是否有uid -->
    <a-layout v-if="!visible">
        <div class="chat-content">
            <div v-for="(item, index) in messageList" :key="index">
                <div v-if="item.uid !== uid" class="msg-item">
                    <a-avatar style="background-color: #f56a00; margin-right: 10px;">{{
                        item.uid }}</a-avatar>
                    <div class="msg-item-right">
                        <p style="font-size: 10px; margin-bottom: 0px;">{{ item.date }}</p>
                        <a-card style="font-size: 16px;">{{ item.msg }}</a-card>
                    </div>
                </div>

                <div v-else class="msg-item" style="justify-content: flex-end;">
                    <div class="msg-item-right">
                        <p style="font-size: 10px; margin-bottom: 0px;">{{ item.date }}</p>
                        <a-card style="font-size: 16px;">{{ item.msg }}</a-card>
                    </div>

                    <a-avatar style="background-color: #1890ff; margin-left: 10px;">{{
                        item.uid }}</a-avatar>
                </div>
            </div>
        </div>
        <div class="chat-input">
            <a-textarea v-model:value="value" allow-clear />
            <div class="btn-send">
                <a-button type="primary" style="margin-left: 20px;" :disabled="!value" @click="send">发
                    送</a-button>
            </div>
        </div>
    </a-layout>

    <!-- 没有uid -->
    <a-card v-else class="enter-card">
        <a-form name="basic" autocomplete="off">
            <a-form-item>
                <a-input v-model:value="uid" placeholder="请输入uid" />
            </a-form-item>
            <a-form-item>
                <a-input v-model:value="nickname" placeholder="请输入nickname" />
            </a-form-item>
        </a-form>
        <a-button type="primary" style="width: 100%;" @click="handleOk">确 认</a-button>
    </a-card>
</template>

<script>

export default {

    data() {
        return {
            value: '',
            uid: '',
            nickname: '',
            socket: '',
            msg: '',
            messageList: [],
            visible: true
        }
    },

    created() {
        let userinfo = JSON.parse(sessionStorage.getItem('user_info') || '{}')
        this.uid = userinfo.uid
        this.nickname = userinfo.nickname

        this.visible = JSON.parse(sessionStorage.getItem('card_status') || null)

        if (this.uid && this.nickname) {
            this.connectWebSocket()
        }
        this.messageList = JSON.parse(sessionStorage.getItem('messageList') || '[]')
    },

    methods: {
        connectWebSocket() {
            let that = this
            if (!window.WebSocket) {
                console.log('当前浏览器不支持 WebSocket 通信！');
            } else {

                this.socket = new WebSocket('ws://127.0.0.1:3000/')

                let ws = this.socket

                ws.onopen = function (e) {
                    console.log("连接服务器成功");
                    // 向服务器发送消息
                    // this.sendMessage()
                    // ws.send('hello, websocket!')

                    ws.onclose = function (e) {
                        console.log("服务器关闭");
                    }
                    ws.onerror = function () {
                        console.log("连接出错");
                    }
                    // 接收服务器的消息
                    ws.onmessage = function (e) {
                        console.log(JSON.parse(e.data));
                        that.messageList.push(JSON.parse(e.data))
                        sessionStorage.setItem('messageList', JSON.stringify(that.messageList))
                    }
                }

            }
        },

        // 发送消息

        sendMessage(type, msg) {
            this.socket.send(JSON.stringify({
                uid: this.uid,
                type: type,
                nickname: this.nickname,
                msg: msg
            }))

            this.value = ''
        },

        send() {
            this.sendMessage(1, this.value)
        },

        handleOk() {

            let userinfo = {
                uid: this.uid,
                nickname: this.nickname
            }
            sessionStorage.setItem('user_info', JSON.stringify(userinfo))

            this.visible = false
            sessionStorage.setItem('card_status', JSON.stringify(this.visible))
        }
    }
}

</script>

<style lang="scss" scoped>
.ant-layout {
    background-color: #fff;
}

.chat-content {
    height: calc(100vh - 240px);
    overflow-x: hidden;
    margin-bottom: 10px;

    .msg-item {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        ::v-deep .ant-avatar {
            width: 40px;
            height: 40px;
            line-height: 40px;
        }

        .msg-item-right {
            display: flex;
            flex-direction: column;

            ::v-deep .ant-card-body {
                padding: 5px 10px !important;
            }
        }
    }

}

.chat-input {
    display: flex;
    justify-content: space-between;

    .btn-send {
        display: flex;
        flex-direction: column;
        justify-content: end;
    }
}

.enter-card {
    width: 30%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>