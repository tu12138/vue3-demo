<template>

    <!-- 切换侧边菜单栏主题 -->
    Change Menu Theme
    <a-switch v-model:checked="checked" checkedChildren="light" unCheckedChildren="dark" @change="changeTheme" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import mitter from '@/utils/mitt';

const checked = ref<boolean>()
const changeTheme = (checked: boolean) =>  {
    mitter.emit('changeMenuTheme', checked)
}
</script>