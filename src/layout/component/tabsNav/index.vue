<template>
    <div class="tabs-container">
        <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="handleEdit" @tabClick="handleTabClick"
            :animated="false">
            <a-tab-pane v-for="tab in tabs" :key="tab.path" :tab="tab.name" :closable="tab.path === '/home' ? false : true">
                <template #closeIcon>
                    <close-circle-outlined :style="tab.path === activeKey ? 'color: #fff;' : ''" />
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

let tabs = ref([])
const store = useStore()
const route = useRoute()
const router = useRouter()
let activeKey = ref<string>()

const handleEdit = (targetKey: string, action: string) => {
    if (action === 'remove') {
        // 删除当前，激活前一个tab
        let tabsList = store.state.tabsList
        let lastIndex: number = 0
        let currentIndex = tabsList.findIndex((item: { path: string; }) => item.path === targetKey)
        lastIndex = currentIndex - 1

        let list = tabsList.filter((item: { path: string; }) => item.path !== targetKey)
        store.commit('setTabsList', list)

        if (store.state.tabsList.length && activeKey.value === targetKey) {
            if (lastIndex >= 0) {
                nextTick(() => {
                    activeKey.value = store.state.tabsList[lastIndex].path
                    router.push(activeKey.value)
                    store.commit('setSelectKeys', store.state.tabsList[lastIndex].fullPath)
                })

            } else {
                nextTick(() => {
                    activeKey.value = store.state.tabsList[0].path
                    router.push(activeKey.value)
                    store.commit('setSelectKeys', store.state.tabsList[0].fullPath)
                })
            }
        }
    }
}

const handleTabClick = (path: string) => {
    let tab = store.state.tabsList.find((item: { path: string; }) => item.path === path)
    router.push(path)
    store.commit('setSelectKeys', tab.fullPath)
}

watchEffect(() => {
    tabs.value = store.state.tabsList
    activeKey.value = route.path
})

</script>

<style lang="scss" scoped>
.ant-tabs {
    line-height: 0.5;
    border-top: 1px solid #efefef;

    ::v-deep(.ant-tabs-nav) {
        margin: 2px 0 !important;
    }

    ::v-deep(.ant-tabs-nav::before) {
        border-bottom: none !important;
    }

    ::v-deep(.ant-tabs-nav .ant-tabs-tab-active) {
        border-bottom-color: #f0f0f0 !important;
        background-color: #1890ff;
        color: #fff !important;
    }

    ::v-deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
        color: #fff !important;
    }

    ::v-deep(.ant-tabs-tab-remove) {
        margin-top: 1px;
    }

    ::v-deep(.ant-tabs-tab-remove:hover) {
        transform: scale(1.2);
    }

    ::v-deep(.ant-tabs-tab) {
        margin: 0 4px !important;
        font-size: 12px;
        height: 30px;
    }
}
</style>