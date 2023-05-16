<template>
	<a-layout style="height: 100vh;" ref="layoutEl">
		<Aside />
		<a-layout>
			<Header :elRef="layoutEl" />
			<a-layout-content class="layout-content">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Aside from './component/Aside/index.vue';
import Header from './component/Header/index.vue';

const layoutEl = ref<HTMLElement | undefined>()

</script>

<style lang="scss" scope>
.layout-content {
	margin: 16px;
	padding: 24px;
	background-color: #fff;
	overflow: auto;
	overflow-x: hidden;
}
</style>