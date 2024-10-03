<template>
    <a-card title="Đề xuất làm thêm giờ" class="card-title-page">
        <template #extra>
            <a-button type="primary" @click="onOpenModalAddDeXuat"><uc-icon name="plus" />Thêm đề xuất</a-button>
        </template>
    </a-card>
    <a-table :columns="columns" :data-source="DSDeXuat" :pagination="false" size="small">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'ThuTu'"
                ><span>{{ (DSDeXuat.indexOf(record) + 1).toString().padStart('2', 0) }}</span></template
            >
            <template v-else-if="column.key === 'TenTieuDe'">
                <b>{{ record.TenTieuDe }}</b
                ><br />
                <span>{{ record.TenDeXuat }}</span>
            </template>
            <template v-else-if="column.key === 'NguoiThucThi'">
                <div class="d-flex flex-row align-items-center gap-2">
                    <uc-avatar :text="record.HoVaTenNguoiThucThi" />
                    <div>
                        <b>{{ record.HoVaTenNguoiThucThi }}</b
                        ><br />
                        <span>{{ record.ViTriNguoiThucThi }}</span>
                    </div>
                </div>
            </template>
            <template v-else-if="column.key === 'TrangThai'">
                <a-tag v-if="record.TrangThai === 1" color="green">Đã duyệt</a-tag>
            </template>
        </template>
    </a-table>

    <uc-modal-add-dx-lam-them-gio v-model:isOpen="isShowModalAddDeXuat" />
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '#',
                    dataIndex: 'ThuTu',
                    key: 'ThuTu',
                    align: 'center',
                },
                {
                    title: 'Tiêu đề',
                    dataIndex: 'TenTieuDe',
                    key: 'TenTieuDe',
                },
                {
                    title: 'Người thực thi',
                    dataIndex: 'NguoiThucThi',
                    key: 'NguoiThucThi',
                },
                {
                    title: 'Ngày tăng ca',
                    dataIndex: 'NgayTangCa',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'TrangThai',
                    key: 'TrangThai',
                },
                {
                    title: 'Ngày tạo',
                    dataIndex: 'NgayTao',
                },
            ],
            DSDeXuat: [
                {
                    TenTieuDe: 'Mẫn',
                    TenDeXuat: 'Đi làm ngày nghỉ',
                    HoVaTenNguoiThucThi: 'Trần Ngọc Mẫn',
                    ViTriNguoiThucThi: 'Quản lý kho',
                    NgayTangCa: '17/07/2024',
                    TrangThai: 1,
                    NgayTao: '16/07/2024',
                },
            ],
            isShowModalAddDeXuat: false,
        }
    },
    methods: {
        onOpenModalAddDeXuat() {
            this.isShowModalAddDeXuat = true
        },
    },
}
</script>
