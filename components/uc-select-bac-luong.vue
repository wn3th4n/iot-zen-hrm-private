<template>
    <a-select :value="value" placeholder="Chọn bậc lương..." @change="handleChange" allow-clear :loading="isLoading" class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.BacLuong_Id">{{ item.TenBacLuong }} - {{ item.GiaTri.toLocaleString('vi-vn') }}đ </a-select-option>
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
        this.dataOption = await bacLuongService.BacLuong_Select().finally(() => {
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
