<template>
    <a-card title="Đề xuất nghỉ phép" class="card-title-page">
        <template #extra>
            <div class="d-flex flex-row gap-2">
                <uc-select-nhan-vien v-model:value="paramSelect.NhanVien_Id" allowClear placeholder="Chọn mã, tên nhân sự..." style="min-width: 300px" />
                <a-select allowClear placeholder="Chọn chính sách nghỉ phép..." v-model:value="paramSelect.ChinhSach_NghiPhep_Id" style="min-width: 300px">
                    <a-select-option v-for="item in values.DSChinhSachNghiPhep" :key="item" :value="item.ChinhSach_NghiPhep_Id">
                        {{ item.TenChinhSach_NghiPhep }}
                    </a-select-option>
                </a-select>
                <a-button type="primary"><uc-icon name="magnify" />Tìm kiếm</a-button>
                <a-button type="primary" @click="onOpenModalAddDeXuat"><uc-icon name="plus" />Thêm đề xuất</a-button>
            </div>
        </template>
    </a-card>
    <a-tabs>
        <a-tab-pane key="1" tab="Tất cả">
            <a-table :columns="columns" :data-source="values.DSDeXuatNghiPhep" :pagination="false" size="small"> </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đang chờ duyệt"> </a-tab-pane>
        <a-tab-pane key="3" tab="Đã duyệt"> </a-tab-pane>
        <a-tab-pane key="4" tab="Đã từ chối"> </a-tab-pane>
    </a-tabs>

    <uc-modal-danh-sach-de-xuat-nghi-phep v-model:isOpen="states.isShowModalChonDeXuat" :DSNhomNghiPhep="values.DSNhomNghiPhep" />
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
            states: {
                isShowModalChonDeXuat: false,
            },
            paramSelect: {
                TrangThai: 0,
                ChinhSach_NghiPhep_Id: null,
                NhanVien_Id: null,
                PageIndex: 1,
                PageSize: 35,
            },
            values: {
                record: {},
                DSChinhSachNghiPhep: [],
                DSDeXuat: [],
                DSNhomNghiPhep: [],
                DSDeXuatNghiPhep: [],
            },
        }
    },
    created() {
        this.onLoadDSDeXuatNghiPhep()
        this.onLoadDSNhomNghiPhep()
    },
    mounted() {},
    methods: {
        onOpenModalAddDeXuat() {
            this.states.isShowModalChonDeXuat = true
        },
        async onLoadDSNhomNghiPhep() {
            const res = await chinhSachService.ChinhSach_NghiPhep_Select()
            this.values.DSNhomNghiPhep = res
        },
        async onLoadDSDeXuatNghiPhep() {
            let params = {
                TrangThai: TrangThai.TatCa,
                NhanVien_Id: 0,
                ChinhSach_NghiPhep_Id: 0,
                PageIndex: 1,
                PageSize: 35,
            }
            const res = await deXuatNghiPhepService.DeXuat_NghiPhep_Select(params)
            this.values.DSDeXuatNghiPhep = res[1]
        },
    },
}
</script>
