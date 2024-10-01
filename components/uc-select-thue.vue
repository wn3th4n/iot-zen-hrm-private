<template>
	<a-select :value="value" placeholder="Chọn chính sách thuế..." @change="handleChange" allow-clear
		:loading="isLoading" class="w-100">
		<a-select-option v-for="item in dataOption" :value="item.ChinhSach_Thue_Id">{{ item.TenChinhSach }}
		</a-select-option>
	</a-select>
</template>
<script>
	export default {
    props: {
        value: { required: true },
    },
    data() {
        return {
            isLoading: false,
            dataOption: [],
        }
    },
    async mounted() {
        this.isLoading = true
        await thueService
            .ChinhSach_Thue_Select()
            .then((res) => {
                this.dataOption = res
            })
            .finally(() => {
                this.isLoading = false
            })
    },
    methods: {
        handleChange(value) {
            this.$emit('update:value', value)
        },
    },
}
</script>