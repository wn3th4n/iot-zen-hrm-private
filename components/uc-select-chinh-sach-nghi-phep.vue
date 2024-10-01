<template>
    <a-select :value="value" placeholder="Chọn chính sách..." @change="handleChange" allow-clear :loading="isLoading" class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.ChinhSach_NghiPhep_Id">[{{item.MaChinhSach}}] - {{ item.TenChinhSach }}</a-select-option>
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
        this.dataOption = await chinhSachNghiPhepService.ChinhSach_NghiPhep_Select().finally(() => {
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
