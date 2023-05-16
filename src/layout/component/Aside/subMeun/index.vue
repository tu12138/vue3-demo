<template>
    <a-sub-menu :key="menuInfo.path">
        <template #icon>
            <!-- <component :is="$icons[menuInfo.meta.icon as string]" /> -->
        </template>
        <template #title>{{ menuInfo.meta.title }}</template>
        <!-- 渲染子级菜单 -->
        <template v-for="item in menuInfo.children" :key="item.path">
            <template v-if="!item.children">
                <a-menu-item :key="item.path">
                    <template #icon>
                        <!-- <component :is="$icons[item.meta.icon as string]" /> -->
                    </template>
                    <router-link :to="item.path">
                        {{ item.meta.title }}
                    </router-link>
                </a-menu-item>

            </template>
            <!-- 递归渲染子级菜单 -->
            <template v-else>
                <sub-menu :menuInfo="item" :key="item.path"></sub-menu>
            </template>
        </template>
    </a-sub-menu>
</template>

<script lang="ts" setup>
// import { getCurrentInstance } from 'vue';
import subMenu from './index.vue';

// const $icons = getCurrentInstance().appContext.config.globalProperties.$Icons

const props = defineProps(['menuInfo'])


</script>