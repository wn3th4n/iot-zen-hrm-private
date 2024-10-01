<template>
    <div>
        <a-card title="Nhóm nhân viên" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :columns="columns" :data-source="DSNhomNhanVien" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'TenNhom'">
                        <div class="d-flex flex-column">
                            <b>{{ record.TenNhom }}</b>
                            <span class="text-primary">{{ record.MaNhom }}</span>
                        </div>
                    </template>
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
                                    <a-menu-item @click="onEdit(record)"><uc-icon class="text-primary"
                                            name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                    <a-menu-item @click="onDelete(record)"><uc-icon class="text-red"
                                            name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </template>
            </a-table>
        </uc-container>
        <uc-modal-add-nhom-nhan-vien v-model:isOpen="action.IsShowModalAdd" @onFinish="onAddFininsh" />
        <uc-modal-edit-nhom-nhan-vien v-model:isOpen="action.IsShowModalEdit" @onFinish="onEditFininsh"
            :record="recordItem" />
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
            DSNhomNhanVien: [],
            columns: [
                {
                    title: 'Tên nhóm nhân viên',
                    dataIndex: 'TenNhom',
                    key: 'TenNhom',
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
        this.loadNhomNhanVien()
    },
    mounted() { },
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
        async loadNhomNhanVien() {
            const res = await nhomNhanVienService.NhomNhanVien_Select()
            if (res) {
                this.DSNhomNhanVien = res
            }
        },
        onDelete(record) {
            const $this = this
            Confirm.delete({
                content: 'Xác nhận xóa nhóm nhân viên ' + record.TenNhom + '?',
                onOk: async () => {
                    const res = await nhomNhanVienService.NhomNhanVien_Delete({
                        NhomNhanVien_Id: record.NhomNhanVien_Id
                    })
                    if (res) {
                        this.loadNhomNhanVien()
                        this.$message.success('Xóa nhóm nhân viên thành công!')
                    }
                },
            })
        },
        onAddFininsh() {
            this.loadNhomNhanVien()
        },
        onEditFininsh() {
            this.loadNhomNhanVien()
        },
    },
}
</script>
