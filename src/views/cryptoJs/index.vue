<template>
    <a-card class="box-card">
        <a-typography>
            <a-typography-title>常用的加解密方法</a-typography-title>
            <a-typography-paragraph>
                常用的加解密方法分别为
                <a-typography-text keyboard>MD5</a-typography-text>
                <a-typography-text keyboard>AES</a-typography-text>
                <a-typography-text keyboard>Encoders</a-typography-text>
            </a-typography-paragraph>

            <a-typography-paragraph>
                <ul>
                    <li>
                        <a-typography-link href="https://cryptojs.gitbook.io/docs/">Docs Address</a-typography-link>
                    </li>
                    <li>
                        <a-typography-link href="https://juejin.cn/post/7128955031063101448">参考文章</a-typography-link>
                    </li>
                </ul>
            </a-typography-paragraph>

            <a-typography-paragraph>
                <blockquote>yarn add crypto-js </blockquote>
                <blockquote>import CryptoJS from "crypto-js"; </blockquote>
                <blockquote>封装文件路径：'@/utils/tools.js' </blockquote>
            </a-typography-paragraph>
        </a-typography>
    </a-card>
</template>

<script>

import Tool from '@/utils/tools.js'

</script>