<template>
	<uc-layout>
		<a-row>
			<a-col :span="4" class="menu-left">
                <p class="menu-left-title">Chính sách</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
			<a-col :span="20">
				<uc-main-page-de-xuat v-if="selectedKeyMenu[0] === '1'"/>
				<uc-main-page-cai-dat v-if="selectedKeyMenu[0] === '2'" />
			</a-col>
		</a-row>
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				itemMenus: [
				{ key: '1', label: 'Đề xuất' },
				{ key: '2', label: 'Cài đặt' },
				],
				selectedKeyMenu: ['1'],
			}
		},
		mounted() {},
		computed: {},
		watch: {},
		methods: {},
	}
</script>