<template>
	<a-select v-bind="$attrs" :value="value" placeholder="Nhập mã, tên nhân viên..." @search="fetchUser"
		@change="handleChange" @dropdownVisibleChange="dropdownVisibleChange" show-search allow-clear
		:filterOption="false" :loading="isLoading" class="w-100">
		<!-- <a-spin #notFoundContent v-if="isLoading" tip="Đang tải dữ liệu" size="small" ></a-spin> -->
		<a-select-option v-for="item in dataOption" :key="item.value">{{ item.text }}</a-select-option>
	</a-select>
</template>
<script>
	export default {
		props: {
			value: { required: true },
			isQuanLy: { type: Boolean },
			initData: { type: Array },
		},
		data() {
			this.fetchUser = _.debounce(this.fetchUser, 300)
			return {
				dataOption: [],
				isLoading: false,
				keyword: undefined,
			}
		},
		mounted() {
			const $this = this
			if ($this.initData && $this.initData[0].value) {
				$this.dataOption = $this.initData ?? []
			}
		},
		methods: {
			async fetchUser(value) {
				console.log("fetch", value)
				this.keyword = value
				this.dataOption = []
				this.isLoading = true
				const params = {
					TimKiem: this.keyword.trim(),
				}
				const res = await nhanVienService.NhanVien_Select_Search(params).finally(() => this.isLoading = false)
				const convertDataToSelect = res.map((item) => ({
					text: item.TenNhanVien,
					value: item.NhanVien_Id,
				}))
				this.dataOption = convertDataToSelect
			},
			handleChange(value) {
				this.$emit('update:value', value)
				if (value === undefined) {
					this.fetchUser('')
				}
			},
			async dropdownVisibleChange(isVisible) {
				if (isVisible) {
					this.fetchUser('')
				}
			},
		},
	}
</script>