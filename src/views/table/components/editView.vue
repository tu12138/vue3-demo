<template>
	<el-drawer v-model="drawer" class="drawer" title="查看详情" direction="rtl" :before-close="handleClose" :size="1000">
		<el-scrollbar>
			<el-table :data="state.tableData" style="width: 100%" :span-method="objectSpanMethod" border>
				<el-table-column prop="id" label="ID" width="50" fixed />
				<el-table-column prop="sku_id" label="sku_id" width="80" fixed />
				<el-table-column label="Avatar" width="80" fixed>
					<template #default="scope">
						<div>
							<el-image style="width: 50px; height: 50px" :src="scope.row.img_path" :zoom-rate="1.2"
								:preview-src-list="[scope.row.img_path]" fit="cover" preview-teleported />
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="img_path" label="avatar_url" min-width="250" show-overflow-tooltip />
				<el-table-column prop="date" label="Date" width="100" />
				<el-table-column prop="name" label="Name" width="100" />
				<el-table-column prop="rowspan" label="rowspan" width="100" />
				<el-table-column prop="colspan" label="colspan" width="100" />
				<el-table-column prop="address" label="Address" min-width="250" />
				<el-table-column fixed="right" label="Operations" width="150">
					<template #default="scope">
						<el-button size="small" type="primary" @click="copy(scope.row.img_path)">Copy</el-button>
						<el-button size="small" type="warning">Edit</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-scrollbar>
	</el-drawer>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, defineExpose } from "vue";
import copy from "@/utils/copy";

const state = ref({
	tableData: [],
	srcList: [],
	// dialogVisible: false
});

const drawer = ref<boolean>(false);

const DataLoad = () => {
	axios
		.post("/api/goodlists")
		.then(({ data: res }) => {
			// 创建一个新的空数组存放
			let newList = [];
			// 遍历主订单
			res.data.list.order_info.map((item: any) => {
				// 判断是否有子订单
				if (item.children && item.children.length > 0) {
					item.children.map((item2: any, id2: any) => {
						newList.push({
							...item2,
							// id2 === 0 说明是第一行或者第一列
							rowspan: id2 === 0 ? item.children.length : 0,
							colspan: id2 === 0 ? 1 : 0,
							id: item.id,
							status: item.status,
							name: item.name,
							date: item.date,
							address: item.address,
						});
					});
				}
			});

			let srcList_n = newList.map((item) => item.img_path);

			state.value = {
				tableData: JSON.parse(JSON.stringify(newList)),
				srcList: JSON.parse(JSON.stringify(srcList_n)),
			};
		})
		.catch((err) => {
			console.log(err);
		});
};

const init = (value: boolean) => {
	drawer.value = value;
	DataLoad();
};

const handleClose = () => {
	drawer.value = false;
};

const objectSpanMethod = ({ row, columnIndex }) => {
	// 需要合并的row
	if (
		columnIndex === 0 ||
		columnIndex === 4 ||
		columnIndex === 5 ||
		columnIndex === 6 ||
		columnIndex === 7
	) {
		return {
			rowspan: row.rowspan,
			colspan: row.colspan,
		};
	} else {
		return {
			rowspan: 1,
			colspan: 1,
		};
	}
};

// 在 vue 3.0 中 需要使用defineExpose暴露数据与方法
defineExpose({
	init,
});
</script>

<style lang="scss" scoped>
.drawer {
	height: 100vh;
	overflow-x: hidden;
}

.img-box {
	display: flex;
	align-items: center;
	width: 60px;
	height: 60px;
	border: 1px solid silver;
}
</style>