<template>
    <div>
        <a-card title="Phân loại nhân sự" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :columns="columns" :data-source="DSPhanLoaiNhanSu" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Ten'">
                        <div class="d-flex flex-column">
                            <b>{{ record.TenHinhThuc }}</b>
                            <span class="text-primary">{{ record.MaHinhThuc }}</span>
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
        <uc-modal-add-phan-loai-nhan-su v-model:isOpen="action.IsShowModalAdd" @onFinish="onAddFininsh" />
        <uc-modal-edit-phan-loai-nhan-su v-model:isOpen="action.IsShowModalEdit" @onFinish="onEditFininsh" :record="recordItem" />
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
            DSPhanLoaiNhanSu: [
                {
                    MaPhanLoai: 'full-time',
                    TenPhanLoai: 'Full time',
                    Is_TamKhoa: true,
                },
                {
                    MaPhanLoai: 'part-time',
                    TenPhanLoai: 'Part time',
                    Is_TamKhoa: false,
                },
            ],
            columns: [
                {
                    title: 'Tên hình thức',
                    dataIndex: 'Ten',
                    key: 'Ten',
                },
                {
                    title: 'Tạm Khóa',
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
        this.loadPhanLoaiNhanSu()
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
        loadPhanLoaiNhanSu() {
            ajaxCALL('/work/HR_HinhThuc_Select', {}, (res) => {
                this.DSPhanLoaiNhanSu = res.data
            })
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xóa hình thức ' + record.TenHinhThuc + '?',
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_HinhThuc_Delete',
                        {
                            HinhThuc_Id: record.HinhThuc_Id,
                        },
                        (res) => {
                            this.loadPhanLoaiNhanSu()
                            this.$message.success('Xóa hình thức thành công!')
                        },
                    )
                },
            })
        },
        onAddFininsh() {
            this.loadPhanLoaiNhanSu()
        },
        onEditFininsh() {
            this.loadPhanLoaiNhanSu()
        },
    },
}
</script>
