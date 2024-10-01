<template>
    <a-spin :spinning="isLoading">
        <a-checkbox-group :value="value" @change="onChange">
            <a-row :gutter="[10]">
                <a-col :span="8" v-for="item in dataCheck" :key="item.value">
                    <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
                </a-col>
            </a-row>
        </a-checkbox-group>
    </a-spin>
</template>
<script>
export default {
    props: {
        value: { type: Array, required: true },
    },
    data() {
        return {
            isLoading: false,
            dataCheck: [],
            selectedItems: [],
        }
    },
    async mounted() {
        const $this = this
        $this.isLoading = true
        const res = await mauBangCongService.MauBangCong_Select().finally(() => {
            $this.isLoading = false
        })
        const convertDataToSelect = res.map((item) => ({
            value: item.MauBangCong_Id,
            label: item.TenMauBangCong,
        }))
        $this.dataCheck = convertDataToSelect
        $this.selectedItems = $this.value
    },
    methods: {
        onChange(data) {
            this.selectedItems = data
            this.$emit('update:value', data)
        },
    },
}
</script>
