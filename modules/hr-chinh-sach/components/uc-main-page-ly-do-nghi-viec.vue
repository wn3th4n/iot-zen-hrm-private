<template>
    <div>
        <a-card title="Lý do nghỉ việc" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onSave"><uc-icon name="plus" />Thêm chính sách lý
                        do nghỉ việc</a-button>
                </a-space>
            </template>
        </a-card>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
        }
    },
    created() { },
    mounted() { },
    computed: {},
    watch: {},
    methods: {
        onEdit(record) { },
        onSave() { },
        onDelete(record) { },
    },
}
</script>
