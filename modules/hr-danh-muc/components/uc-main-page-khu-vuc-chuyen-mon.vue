<template>
    <div>
        <a-card title="Khu vực chuyên môn" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm khu vực chuyên môn</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="700">
            <a-table :columns="columns" :data-source="DSKhuVucChuyenMon" :pagination="false" size="small" :scroll="{ y: 'calc(100vh - 95px)' }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'TenKhuVuc'">
                        <div class="d-flex flex-column">
                            <b>{{ record.TenKhuVucChuyenMon }}</b>
                            <span class="text-primary">{{ record.MaKhuVucChuyenMon }}</span>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'trangthai'">
                        <a-space size="small">
                            <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                        </a-space>
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link">
                                <uc-icon name="dots-horizontal" />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onEdit(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                    <a-menu-item @click="onDelete(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </template>
            </a-table>
        </uc-container>

        <uc-modal-add-khu-vuc-chuyen-mon v-model:isOpen="action.IsShowModalAdd" @onFinish="onAddFininsh" />
        <uc-modal-edit-khu-vuc-chuyen-mon v-model:isOpen="action.IsShowModalEdit" @onFinish="onEditFinish" :record="recordItem" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
            },
            DSKhuVucChuyenMon: [],
            columns: [
                {
                    title: 'Tên khu vực chuyên môn',
                    dataIndex: 'TenKhuVuc',
                    key: 'TenKhuVuc',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'trangthai',
                    key: 'trangthai',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            recordItem: {},
        }
    },
    created() {
        this.loadKhuVucChuyenMon()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.action.IsShowModalEdit = true
            this.recordItem = Object.assign({}, record)
            this.recordItem.Is_TamKhoa = this.recordItem.Is_TamKhoa ? 1 : 0
            console.log(' this.recordItem', this.recordItem)
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        async loadKhuVucChuyenMon() {
            const res = await khuVucChuyenMonService.KhuVucChuyenMon_Select()
            this.DSKhuVucChuyenMon = res
        },
        onDelete(record) {
            Confirm.delete({
                content: `Xác nhận xóa khu vực chuyên môn ${record.TenKhuVucChuyenMon}?`,
                onOk: async () => {
                    let params = {
                        KhuVucChuyenMon_Id: record.KhuVucChuyenMon_Id,
                    }
                    const res = await khuVucChuyenMonService.KhuVucChuyenMon_Delete(params)
                    if (res) {
                        this.loadKhuVucChuyenMon()
                        this.$message.success('Xóa thành công!')
                    }
                },
            })
        },
        onAddFininsh() {
            this.loadKhuVucChuyenMon()
        },
        onEditFinish() {
            this.loadKhuVucChuyenMon()
        },
    },
}
</script>
