<template>
	<uc-layout>
		<a-row>
			<a-col :span="4" class="menu-left">
                <p class="menu-left-title">Chính sách đề xuất</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
			<a-col :span="20">
				<uc-main-page-over-time v-if="selectedKeyMenu[0] === '1'"/>
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
				{ key: '1', label: 'Tăng ca' },
				{ key: '2', label: 'Nghỉ phép' },
                { key: '3', label: 'Ứng Lương' },
                { key: '4', label: 'Chấm công' },
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