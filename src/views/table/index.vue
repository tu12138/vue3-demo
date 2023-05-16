<template>
    <el-button type="primary" @click="state.dialogVisible = true">新增</el-button>
    <scTable :data="tableData" stripe small background :pageSizes="[10, 20, 50, 100]" :pageSize="query.limit"
        @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @selection-change="handleSelect"
        :span-method="objectSpanMethod">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column label="操作" fixed="right" width="150">
            <template #default>
                <el-space :size="10" :spacer="spacer">
                    <el-link type="primary" @click="table_view">Edit</el-link>
                    <el-link type="danger">Delete</el-link>
                </el-space>
            </template>
        </el-table-column>
    </scTable>

    <editView ref="editViewRef" />

    <el-dialog v-model="state.dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="state.dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ElDivider, type TableColumnCtx } from 'element-plus';
import { reactive, h, ref, nextTick } from 'vue';
import editView from './components/editView.vue';

const state = ref({
    dialogVisible: false
})

const tableData = reactive([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Bob',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Candy',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Jack',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

const editViewRef = ref<InstanceType<typeof editView>>()

interface Search {
    page: number,
    limit: number,
    [key: string]: any
}

const query: Search = {
    page: 1,
    limit: 20
}


const spacer = h(ElDivider, { direction: 'vertical' })

// 加载数据
const DataLoad = () => {
    // todo..
    const queryObj = JSON.parse(JSON.stringify(query)) // 对请求参数进行深拷贝，防止对原数据的污染
}
const handleCurrentChange = (page: number) => {
    query.page = page
    DataLoad()

}
const handleSizeChange = (size: number) => {
    query.limit = size
    DataLoad()
}

const handleSelect = (selection: any) => {
    // console.log(selection);
}

const table_view = () => {
    nextTick(() => {
        editViewRef.value?.init(true);
    })
}

interface User {
    id: string
    name: string
    amount1: string
    amount2: string
    amount3: number
}

interface SpanMethodProps {
    row: User
    column: TableColumnCtx<User>
    rowIndex: number
    columnIndex: number
}
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
    if (rowIndex % 2 === 0) {
        // console.log(row);
    }
}


const handleClose = () => {
    state.value.dialogVisible = false
}

</script> 