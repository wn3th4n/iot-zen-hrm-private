<template>
    <a-card title="Đề xuất nghỉ phép" class="card-title-page">
        <template #extra>
            <a-button type="primary" @click="onOpenModalAddDeXuat"><uc-icon name="plus" />Thêm đề xuất</a-button>
        </template>
    </a-card>
    <a-table :columns="columns" :data-source="DSDeXuat" :pagination="false" size="small"> </a-table>

    <uc-modal-danh-sach-de-xuat-nghi-phep v-model:isOpen="isShowModalChonDeXuat" />
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
                    title: 'Người tạo',
                    dataIndex: 'TenNguoiTao',
                },
                {
                    title: 'Ngày đề xuất',
                    dataIndex: 'TenTieuDe',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'TrangThai',
                },
            ],
            DSDeXuat: [],
            isShowModalChonDeXuat: false,
        }
    },
    methods: {
        onOpenModalAddDeXuat() {
            this.isShowModalChonDeXuat = true
        },
    },
}
</script>
