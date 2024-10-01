<template>
    <div>
        <a-card title="Chức danh" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :columns="columns" :data-source="DSChucDanh" :pagination="false" size="small" :scroll="{ y: 'calc(100vh - 105px)' }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'trangthai'">
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
        <uc-modal-add-chuc-danh v-model:isOpen="action.IsShowModalAdd" @onFinish="onAddFininsh" />
        <uc-modal-edit-chuc-danh v-model:isOpen="action.IsShowModalEdit" @onFinish="onEditFininsh" :record="recordItem" />
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
            DSChucDanh: [],
            columns: [
                {
                    title: 'Tên chức danh',
                    dataIndex: 'TenChucDanh',
                    key: 'Ten',
                },
                {
                    title: 'Tạm khóa',
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
        this.loadChucDanh()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.action.IsShowModalEdit = true
            this.recordItem = Object.assign({}, record)
            this.recordItem.Is_TamKhoa = this.recordItem.Is_TamKhoa ? 1 : 0
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        async loadChucDanh() {
            const res = await chucDanhService.ChucDanh_Select()
            if (res) {
                this.DSChucDanh = res
            }
        },
        onDelete(record) {
            const $this = this
            Confirm.delete({
                content: 'Xác nhận xóa chức danh ' + record.TenChucDanh + '?',
                onOk: async () => {
                    const res = await chucDanhService.ChucDanh_Delete({
                        ChucDanh_Id: record.ChucDanh_Id,
                    })
                    if (res) {
                        this.loadChucDanh()
                        this.$message.success('Xóa chức danh thành công!')
                    }
                },
            })
        },
        onAddFininsh() {
            this.loadChucDanh()
        },
        onEditFininsh() {
            this.loadChucDanh()
        },
    },
}
</script>
