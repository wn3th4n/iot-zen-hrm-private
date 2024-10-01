<template>
    <a-select :value="value" placeholder="Chọn văn phòng..." @change="handleChange" allow-clear :loading="isLoading" class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.VanPhong_Id">{{ item.TenVanPhong }}</a-select-option>
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
        this.dataOption = await vanPhongService.VanPhong_Select().finally(() => {
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
