<template>
	<a-card class="box-card">
		<a-skeleton active :loading="loading">
			<a-typography>
				<a-typography-title>项目介绍</a-typography-title>
				<a-typography-paragraph>
					该项目基于
					<a-typography-text keyboard>Vue3.X</a-typography-text>
					+
					<a-typography-text keyboard>Ant Design Vue 3.X</a-typography-text>
					组件开发的后台管理，适用于......(此处省略一万字！！！)
				</a-typography-paragraph>

				<a-typography-paragraph>
					<ul>
						<li>
							<a-typography-link href="https://gitee.com/hutu0903/vue3-demo.git"
								>Gitee Address</a-typography-link
							>
						</li>
					</ul>
				</a-typography-paragraph>
			</a-typography>
		</a-skeleton>
	</a-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

const loading = ref<boolean>(true);
// 获取全局方法

const router = useRouter();

setTimeout(() => {
	loading.value = false;
}, 500);
</script>

<style lang="scss">
.ant-card-body {
	display: flex;
	justify-content: flex-start;
}

.el-descriptions {
	margin-top: 20px;
}
.cell-item {
	display: flex;
	align-items: center;
}
.margin-top {
	margin-top: 20px;
}
</style>
