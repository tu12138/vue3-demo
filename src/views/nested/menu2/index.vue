<template>
    <a-table :columns="columns" :data-source="menusData">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'path'">
                <span>
                    <smile-outlined />
                    一级菜单
                </span>
            </template>
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <a>
                    {{ record.name }}
                </a>
            </template>
            <template v-else-if="column.key === 'tags'">
                <span>
                    <a-tag v-for="tag in record.tags" :key="tag"
                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                        {{ tag.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a>Invite 一 {{ record.name }}</a>
                    <a-divider type="vertical" />
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link">
                        More actions
                        <down-outlined />
                    </a>
                </span>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const columns = [
    {
        title: 'path',
        dataIndex: 'path',
        key: 'path',
    },
    {
        title: '别名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '视图路径',
        dataIndex: 'component',
        key: 'component',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const menusData = router.currentRoute.value.matched[0].children

</script>