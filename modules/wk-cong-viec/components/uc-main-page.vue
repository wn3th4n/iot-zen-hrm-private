<template>
    <uc-layout>
        <a-card title="Danh sách công việc">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="action.isShowModalAdd = true"><uc-icon name="plus" />Thêm công việc</a-button>
                </a-space>
            </template>
        </a-card>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {}
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {},
}
</script>