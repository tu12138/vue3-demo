<template>
    <!-- 此处是放置menu1-1/menu1-2处的view -->
    <div class="menu1">
        <h2>Menu1</h2>
        <div :style="{ padding: '24px' }">
        </div>

        <a-button type="primary" @click="handleToMenu2">to menu1-1</a-button>

        <router-view />
    </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';

const router = useRouter()

const handleToMenu2 = () => {
    router.push('/nested/menu1/menu1-1')
}

</script>
<style lang="scss">
.menu1 {
    height: 100%;
    text-align: center;
    background-color: cadetblue;
    h2 {
        color: #fff;
    }
}
</style>