<template>
    <a-select :value="value" placeholder="Chọn tháng..." @change="handleChange" allow-clear class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.value">{{ item.label }}</a-select-option>
    </a-select>
</template>
<script>
export default {
    props: {
        value: { required: true },
    },
    data() {
        let arrItem = []
        for (let i = 1; i <= 12; i++) {
            arrItem.push({ label: `Tháng ${i}`, value: i })
        }
        return {
            dataOption: arrItem,
        }
    },
    methods: {
        handleChange(value) {
            this.$emit('update:value', value)
        },
    },
}
</script>
