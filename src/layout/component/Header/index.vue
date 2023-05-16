<template>
    <a-layout-header>
        <div class="header-top">
            <div>
                <a-space :size="10">
                    <div class="collapse">
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="handleCollapse" />
                        <menu-fold-outlined v-else class="trigger" @click="handleCollapse" />
                    </div>
                    <Dreadcrumb />
                </a-space>
            </div>

            <div class="flex-center">
                <fullscreen-outlined v-if="!isFullscreen" @click="handleFullScreen" />
                <fullscreen-exit-outlined v-else @click="handleFullScreen" />
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link flex-center" @click.prevent>
                        <span class="m-lr-10 f-16">
                            {{ userinfo.userName }}
                        </span>
                        <a-avatar shape="square">
                            <template #icon>
                                <img :src="userinfo.avatar" />
                            </template>
                        </a-avatar>
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item @click="editInfo">信息编辑</a-menu-item>
                            <a-menu-item @click="systemSet">系统设置</a-menu-item>
                            <a-menu-item @click="handleLogout">退出系统</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <TabNav />
    </a-layout-header>

    <!-- 信息编辑 -->
    <EditDrawer ref="editDrawer" />
</template>

<script lang="ts" setup>
import { ref, type PropType, reactive } from 'vue';
import { useFullscreen } from '@vueuse/core'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import EditDrawer from './components/EditDrawer/index.vue';
import Dreadcrumb from './components/Breadcrumb/index.vue';
import TabNav from '../tabsNav/index.vue';
import mitter from '@/utils/mitt';

const props = defineProps({
    elRef: {
        require: true,
        type: Object as PropType<HTMLElement>
    }
})

const router = useRouter()

const collapsed = ref<boolean>(false)

const userinfo = reactive({
    userName: JSON.parse(sessionStorage.getItem('userinfo') || '{}').userName,
    avatar: JSON.parse(sessionStorage.getItem('userinfo') || '{}').avatar,
})

const handleCollapse = () => {
    collapsed.value = !collapsed.value
    // 自定义事件派发
    mitter.emit('handleCollapse', collapsed.value)
}

// 全屏事件
const { isFullscreen, enter, exit } = useFullscreen(props.elRef)
const handleFullScreen = async () => {
    if (isFullscreen.value) { // true
        await exit()
    } else {
        await enter()
    }
}

const handleLogout = () => {
    sessionStorage.clear()
    router.replace('/login')
}

const editDrawer = ref<InstanceType<typeof EditDrawer> | null>(null)
const editInfo = () => {
    editDrawer.value?.open('信息编辑', 0)
}

const systemSet = () => {
    editDrawer.value?.open('系统设置', 1)
}
</script>

<style lang="scss" scoped>
.ant-layout-header {
    display: flex;
    flex-direction: column;
    height: auto;
    background: #fff;
    padding: 0;
    font-size: 20px;
}

.header-top {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding: 0 24px;
}
</style>