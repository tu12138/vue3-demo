<template>
    <a-breadcrumb>
        <a-breadcrumb-item>管理平台</a-breadcrumb-item>
        <a-breadcrumb-item v-for="item in breadcrumbItem" :key="item.name">
            <a href="">{{ item.meta.title }}</a>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const breadcrumbItem = ref()

watch(
    () => router.currentRoute.value,
    (newValue) => {
        const matched = newValue.matched
        if (matched && matched.length > 0) {
            breadcrumbItem.value = matched.slice(1)
        }
    },
    { immediate: true, deep: true }
)

</script>