<template>
    <div class="c-table">
        <!-- 表格主体 -->
        <div class="c-table_table">
            <el-table v-bind="$attrs" :data="data" style="width: 100%" :size="tableSize" :border="border">
                <slot></slot>
                <!-- 当数据为空时 -->
                <template #empty>
                    <el-empty description="暂无数据" :image-size="100" />
                </template>
            </el-table>
        </div>

        <!-- 分页区域 -->
        <div class="c-table_page">
            <div class="pagination">
                <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizes"
                    :small="small" :background="background" :layout="paginationLayout" :total="totalCount"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>

            <div class="setting">
                <el-popover placement="top-start" title="表格设置" trigger="click" width="300">
                    <template #reference>
                        <el-icon :size="20">
                            <i-ep-Setting />
                        </el-icon>
                    </template>
                    <template #default>
                        <el-space horizontal>
                            <span>表格尺寸</span>
                            <div class="btn-list">
                                <el-button :type="tableSize === item ? 'primary' : ''" size="small"
                                    v-for="(item, index) in btnList" :key="index" @click="handleSwitchSize(item)">
                                    {{ item }}
                                </el-button>
                            </div>
                        </el-space>
                    </template>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
import tool from '@/utils/tools.js'
export default {
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        pageSizes: {
            type: Array,
            default: [20, 50, 100, 200]
        },
        pageSize: {
            type: Number,
            default: 10
        },
        small: {
            type: Boolean,
            default: false
        },
        background: {
            type: Boolean,
            default: false
        },
        paginationLayout: {
            type: String,
            default: "total, prev, pager, next, jumper, -> "
        },
        totalCount: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            tableSize: tool.localStorage.get('personSet') ? tool.localStorage.get('personSet') : 'default',
            btnList: ['large', 'default', 'small'],
            currentPage: 1
        }
    },

    methods: {
        handleSwitchSize(item) {
            this.tableSize = item
            // 将个人设置存入localstorage中
            tool.localStorage.set('personSet', item)
        },

        // 分页
        handleCurrentChange(currentPage) {
            this.$emit('handleCurrentChange', currentPage)
        },

        handleSizeChange(currentSize) {
            this.$emit('handleSizeChange', currentSize)
        }
    }
}
</script>

<style lang="scss" scoped>
.c-table {

    .c-table_table {}

    .c-table_page {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .setting {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border: 1px solid rgb(192, 192, 192);
            border-radius: 50%;
            cursor: pointer;
            color: rgb(192, 192, 192);

            .btn-list {
                display: flex;
                justify-content: flex-start;
            }
        }

        .setting:hover {
            background-color: rgba(67, 141, 252, 0.678);
            transition: all .3s ease;
            color: #fff;
            box-shadow: 0 0 10px rgba(67, 141, 252, 0.678);
        }

        .setting:active {
            border: 1px solid rgb(255, 254, 254);
        }
    }
}
</style>