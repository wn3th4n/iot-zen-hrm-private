<template>
    <a-select :value="value" placeholder="Chọn phòng ban..." @change="handleChange" allow-clear :loading="isLoading" class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.PhongBan_Id">{{ item.TenPhongBan }} </a-select-option>
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
        await phongBanService
            .PhongBan_Select()
            .then((res) => {
                this.dataOption = res.DSPhongBan
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
