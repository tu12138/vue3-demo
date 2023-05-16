import CryptoJS from "crypto-js";

const tool = {}

// 设置密钥
const secretPassphrase = CryptoJS.enc.Utf8.parse('012345678tjh')
// 设置偏移量
const iv = CryptoJS.enc.Utf8.parse('012345678tjh')

// md5加密 更多是利用 MD5 的高度离散性特点，用它来做数字签名、完整性校验，云盘秒传等
tool.md5 = function(key) { // WordArray数据格式

    // 选择Base64数据格式进行加密 utf8/Latin1/Hex
    return CryptoJS.MD5(key).toString(CryptoJS.enc.Base64)
}

// md5加密大文件：将大文件分为多段进行加密
tool.md5_large = function() {
    const hasher = CryptoJS.algo.MD5.create()
    hasher.updated()
    hasher.updated()
    const hash = hasher.finalize()
}

// 对称加密算法  DES、3DES 、RC4、RC5、RC6 和 AES
tool.crypt = {
    // 加密s
    encryptAES(message) {

        if (typeof message === 'object') {
            message = JSON.stringify(message)
        }

        // 用utf8编码需要加密的内容 WordArray
        const wordArray = CryptoJS.enc.Utf8.parse(message)
        // 通过AES进行加密
        const encrypted = CryptoJS.AES.encrypt(wordArray, secretPassphrase, {
            // 加密模式。默认为 CBC，还支持且常用的是 ECB。CBC 模式需要偏移向量 iv，而 ECB 不需要
            mode: CryptoJS.mode.CBC,
            // 填充方式。默认为 Pkcs7
            padding: CryptoJS.pad.Pkcs7,
            // 偏移量
            iv
        }).toString()

        return encrypted
    },

    // 解密
    decryptAES(message) {
        // message 为加密后的内容
        const decrypted = CryptoJS.AES.decrypt(
            message,
            secretPassphrase,
            {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                iv
            }
        ).toString(CryptoJS.enc.Utf8)

        return decrypted
    }
    
} 

// 非对称加密 使用 JSEncrypt 进行 RSA 加密
tool.JSEncrypt = {
    // 加密
    encryptRSA(message, secretKey) {
        const crypt = new JSEncrypt()
        // 公钥
        crypt.setPublicKey(secretKey)
        return crypt.encrypt(message)
    },

    // 解密
    decryptRSA(enc_message, secretKey) {
        const crypt = new JSEncrypt()
        // 传入密钥
        crypt.setPrivateKey(secretKey)
        return crypt.decrypt(enc_message)
    }
}

// 存入local storage
tool.localStorage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    get(key) {
        return JSON.parse(localStorage.getItem(key) || null)
    },

    clear() {
        localStorage.clear()
    }
}

tool.sessionStorage = {
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },

    get(key) {
        return JSON.parse(sessionStorage.getItem(key) || null)
    },

    clear() {
        sessionStorage.clear()
    }
}
export default tool