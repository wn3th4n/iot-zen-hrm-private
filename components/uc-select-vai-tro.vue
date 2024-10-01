<template>
    <a-select :value="value" placeholder="Chọn vai trò..." @change="handleChange" allow-clear :loading="isLoading" class="w-100" :mode="isMultiple ? 'multiple' : ''">
        <a-select-option v-for="item in dataOption" :value="item.VaiTro_Id">[{{ item.MaVaiTro }}] {{ item.TenVaiTro }}</a-select-option>
    </a-select>
</template>
<script>
export default {
    props: {
        value: { required: true },
        isMultiple: { required: true, type: Boolean },
    },
    data() {
        return {
            isLoading: false,
            dataOption: [],
        }
    },
    async mounted() {
        this.isLoading = true
        this.dataOption = await vaiTroService.VaiTro_Select().finally(() => {
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
