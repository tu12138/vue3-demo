<template>
    <a-drawer v-model:visible="visible" :width="600" :footerStyle="footerStyle" class="custom-class" :title="title"
        placement="right">
        <EditInfo v-if="!drawer_type" />
        <EditSystem v-else />
        <template #footer>
            <a-space>
                <a-button @click="onClose">Cancel</a-button>
                <a-button type="primary" @click="onClose">Submit</a-button>
            </a-space>
        </template>
    </a-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref, type CSSProperties } from 'vue';

import EditInfo from './EditInfo.vue';
import EditSystem from './EditSystem.vue';

const visible = ref<boolean>(false)

const footerStyle = reactive<CSSProperties>({
    textAlign: 'right'
})

const drawer_type = ref<number>()

const title = ref<string>()

const open = (value: string, type: number) => {
    drawer_type.value = type
    title.value = value
    visible.value = true
}

const onClose = () => {
    visible.value = false;
};

defineExpose({
    open
})
</script>