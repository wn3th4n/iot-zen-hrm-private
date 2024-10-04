<template>
	<div v-for="(item, index) in DuLieuList" :key="index">
		<a-form-item :label="item.TenTruongDuLieu">
			<a-input v-if="item.KieuDuLieu === 'TEXT'"/>
			<a-input-number v-if="item.KieuDuLieu === 'INT' || item.KieuDuLieu === 'FLOAT'"/>
			<a-date-picker v-if="item.KieuDuLieu === 'DATE'"/>
			<!-- select 1
			select multi -->

		</a-form-item>
	</div>
</template>

<script>
	export default {
		props: ["dulieulist"],
		data() {
			return {}
		},
		mounted() { },
		computed: {
			DuLieuList: function () {
				return this.dulieulist
			}
		},
		watch: {},
		methods: {},
	}
</script>