<template>
    <uc-layout>
        <a-row>
            <a-col :span="4" class="menu-left">
                <p class="menu-left-title">Loại vị trí</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
            <a-col :span="20">
                <a-card title="Công việc" class="card-title-page">
                    <template #extra>
                        <a-space size="small">
                            <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm công việc</a-button>
                        </a-space>
                    </template>
                </a-card>
                <a-table size="small" :columns="columns" :data-source="data" :pagination="false"> </a-table>
            </a-col>
        </a-row>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            itemMenus: [
                { key: '1', label: 'Pha chế chính' },
                { key: '2', label: 'Pha chế phụ' },
                { key: '3', label: 'Thu ngân' },
                { key: '4', label: 'Kiểm kho' },
            ],
            selectedKeyMenu: ['1'],
            columns: [
                { title: 'Tên công việc', dataIndex: 'TenNhomCongViec', width: 400 },
                { title: 'Nhóm công việc', dataIndex: 'MaNhomCongViec', width: 150 },
                { title: 'Mô tả', dataIndex: 'MoTa' },
                { title: '', dataIndex: 'action', width: 60, align: 'center', scopedSlots: { customRender: 'action' } },
            ],
            data: [],
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {},
}
</script>