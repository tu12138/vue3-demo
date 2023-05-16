<template>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <a-menu mode="inline" style="height: 100vh;" :theme="status ? 'light' : 'dark'" :selectedKeys="state.selectedKeys"
            :openKeys="state.selectedKeys" @click="handleClick">
            <template v-for="item in routerList" :key="item.path">
                <!-- 没有子级菜单 -->
                <template v-if="!item.children || item.children?.length === 0">
                    <a-menu-item :key="item.path">
                        <template #icon>
                            <!-- <component :is="$icons[item.meta.icon as string]" /> -->
                        </template>
                        <router-link :to="item.path">
                            <span>{{ item.meta.title }}</span>
                        </router-link>
                    </a-menu-item>

                </template>

                <template v-else>
                    <sub-menu :menuInfo="item" :key="item.path"></sub-menu>
                </template>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import mitter from '@/utils/mitt';
import type { MenuProps } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import subMenu from './subMeun/index.vue';
import tool from '@/utils/tools';
import type { Key } from 'ant-design-vue/lib/_util/type';

// const $icons = getCurrentInstance().appContext.config.globalProperties.$Icons

const router = useRouter()
const route = useRoute()
const store = useStore()

const routerList = router.currentRoute.value.matched[0].children

const state = ref({
    selectedKeys: [] as string[]
})

const collapsed = ref<boolean>(false)

mitter.on('handleCollapse', (value) => {
    collapsed.value = value
})

// 切换侧边菜单栏主题
const status = ref<boolean>(false)
mitter.on('changeMenuTheme', (e) => {
    status.value = e
})

const handleClick: MenuProps['onClick'] = menuInfo => {

    let list = store.state.tabsList

    let tab = {
        name: firstStrToUpperCase(menuInfo.key as string),
        path: menuInfo.key,
        fullPath: menuInfo.keyPath,
    }

    if (!list.length) {
        list = [...list, tab]
    } else {
        let res = list.some((item: { name: Key; }) => item.name === tab.name)
        if (!res) {
            list = [...store.state.tabsList, tab]
        }

    }
    store.commit('setTabsList', list)
    store.commit('setSelectKeys', menuInfo.keyPath)
    state.value.selectedKeys = menuInfo.keyPath as string[]
    tool.sessionStorage.set('selectKeys', menuInfo.keyPath)
};

const firstStrToUpperCase = (value: string) => {
    let arr = value.split('/')
    let str = arr[arr.length - 1]
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

watchEffect(() => {
    state.value.selectedKeys = store.state.selectKeys
})

</script>

<style lang="scss" scoped></style>