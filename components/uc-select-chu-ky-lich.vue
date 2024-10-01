<template>
    <a-select :value="value" placeholder="Chọn chu kỳ lịch làm việc..." @change="handleChange" allow-clear :loading="isLoading" class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.LichLamViec_Id">Tháng {{ item.Thang }}/{{ item.Nam }}</a-select-option>
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
        const $this = this
        $this.isLoading = true
        await lichLamViecService
            .LichLamViec_Select()
            .then((res) => {
                if (res) {
                    $this.dataOption = res.DSChuKy
                }
            })
            .finally(() => {
                $this.isLoading = false
            })
    },
    methods: {
        handleChange(value) {
            const $this = this
            $this.$emit('update:value', value)
        },
    },
}
</script>
