<template>
    <a-select :value="value" placeholder="Chọn năm..." @change="handleChange" allow-clear class="w-100">
        <a-select-option v-for="item in dataOption" :value="item.value">{{ item.text }}</a-select-option>
    </a-select>
</template>
<script>
export default {
    props: {
        value: { required: true },
    },
    data() {
        const yearNow = dayjs().year()
        let arrItem = []
        for (let i = yearNow; i >= 2022; i--) {
            arrItem.push({ text: i, value: i })
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
