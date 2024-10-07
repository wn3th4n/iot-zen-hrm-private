<template>
    <a-card title="Đề xuất làm thêm giờ" class="card-title-page">
        <template #extra>
            <div class="d-flex flex-row gap-2">
                <uc-select-nhan-vien allowClear placeholder="Chọn mã, tên nhân sự..."  style="min-width: 300px;"/>
                <a-select allowClear placeholder="Chọn chính sách làm thêm..." style="min-width: 300px;">
                  <a-select-option v-for="item in DSChinhSachLamThem" :key="item" :value="item.ChinhSach_LamThem_Id">
                    {{ item.TenChinhSach_LamThem }}
                  </a-select-option>
                </a-select>  
                <a-button type="primary"><uc-icon name="magnify" />Tìm kiếm</a-button>
                <a-button type="primary" @click="onOpenModalAddDeXuat"><uc-icon name="plus" />Thêm đề xuất</a-button>
            </div>


        </template>
    </a-card>
    <a-tabs>
        <a-tab-pane key="1" tab="Đang chờ duyệt">
            <a-table :columns="columns" :data-source="DSDeXuatLamThem" :pagination="false" size="small"
                :resizeColumn="test()">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'ThuTu'"><span>{{ (DSDeXuatLamThem.indexOf(record) +
                        1).toString().padStart('2', 0) }}</span></template>
                    <template v-else-if="column.key === 'TenTieuDe'">
                        <b>{{ record.TenTieuDe }}</b><br />
                        <span>{{ record.TenDeXuat }}</span>
                    </template>
                    <template v-else-if="column.key === 'NguoiThucThi'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.HoVaTenNguoiThucThi" />
                            <div>
                                <b>{{ record.HoVaTenNguoiThucThi }}</b><br />
                                <span>{{ record.ViTriNguoiThucThi }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'TrangThai'">
                        <a-tag v-if="record.TrangThai === 1" color="green">Đã duyệt</a-tag>
                    </template>
                </template>
            </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đã duyệt">
           
        </a-tab-pane>
        <a-tab-pane key="3" tab="Đã từ chối">
          
        </a-tab-pane>
    </a-tabs>

    <uc-modal-danh-sach-de-xuat-lam-them v-model:isOpen="isShowModalAddDeXuat" :DSChinhSachLamThem />
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
            DSChinhSachLamThem: [],
            isShowModalAddDeXuat: false,
            DSDeXuatLamThem: []
        }
    },
    mounted() {
        this.loadDeXuatLamThem()
        this.loadDSChinhSach()
    },
    methods: {
        onOpenModalAddDeXuat() {
            this.isShowModalAddDeXuat = true
        },
        async loadDSChinhSach() {
            const $this = this
            const res = await chinhSachService.ChinhSach_LamThem_Select()
            if (res) {
                this.DSChinhSachLamThem = res
            }
        },
        async loadDeXuatLamThem() {
            const $this = this
            const { TTPhanTrang, DSDeXuatLamThem, DSKhungGio } = await deXuatLamThemService.DeXuat_LamThem_Select()
            if (DSDeXuatLamThem) {
                this.DSDeXuatLamThem = DSDeXuatLamThem
            }
        },
        test() {
            console.log('x')
        },
    },
}
</script>
