<template>
	<div v-for="(item, index) in DuLieuList" :key="index">
		<a-form-item :label="item.TenTruongDuLieu">
			<a-input v-if="item.KieuDuLieu === 'TEXT'" />
			<!-- Chỉ cho phép số nguyên -->
			<a-input-number class="w-100" v-if="item.KieuDuLieu === 'INT'" :step="1" />
			<!-- Chỉ cho phép số thập phân -->
			<a-input-number class="w-100" v-if="item.KieuDuLieu === 'FLOAT'" :step="0.01" />
			<a-date-picker class="w-100" v-if="item.KieuDuLieu === 'DATE'" format="DD/MM/YYYY" />
			<a-date-picker class="w-100" v-if="item.KieuDuLieu === 'DATETIME'" :minuteStep="5" showTime
				format="DD/MM/YYYY HH:mm" />
			<!-- Select đơn -->
			<a-select v-if="item.KieuDuLieu === 'SELECT'"
				:options="item.value.map(option => ({ value: option, label: option }))" />

			<!-- Select nhiều -->
			<a-select v-if="item.KieuDuLieu === 'SELECT_M'" mode="multiple"
				:options="item.value.map(option => ({ value: option, label: option }))" />

			<a-checkbox v-if="item.KieuDuLieu === 'CHECKBOX'">{{item.MoTa}}</a-checkbox>

			<a-textarea v-if="item.KieuDuLieu === 'TEXTAREA'" />
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
		methods: {
			strToArr(str) {
				return str.split(',').map((item) => item.trim())
			}
		},
	}
</script>