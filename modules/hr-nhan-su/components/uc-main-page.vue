<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <span>Danh sách nhân sự</span>
            </template>
            <template #extra>
                <a-space>
                    <a-button class="py-0" size="large" @click="exportExcel" shape="circle" type="text" ghost><uc-icon class="me-0" name="microsoft-excel" color="success" size="24" /></a-button>
                    <a-input v-model:value="formFilter.TimKiem" @change="onSearch()" placeholder="Tìm mã, tên nhân sự..."></a-input>
                    <a-button type="primary" @click="redirectAddNhanSu()"><uc-icon name="plus" />Thêm nhân sự</a-button>
                </a-space>
            </template>
        </a-card>
        <a-tabs v-model:activeTabKey="activeTabKey">
            <a-tab-pane key="1" tab="Tổng quan">
                <uc-table-tong-quan :isLoadingDSNhanVien="isLoadingDSNhanVien" @onEdit="Edit()" @onFinishDelete="onLoadDSNhanSu()" @recordThongTinLuong="RecordThongTinLuong" @onEditNhomVaQuanLy="onEditNhomVaQuanLy()" @recordNhomVaQuanLy="RecordNhomVaQuanLy" @onEditThongTinCongViec="onEditThongTinCongViec()" @onEditTruongTuyChinh="onEditTruongTuyChinh" @recordCongViec="RecordCongViec" @recordThongTinCoBan="RecordThongTinCoBan" :columns="columnsTongQuan" :dataSource="TableDSNhanSu.dataSource" :pagination="TableDSNhanSu.pagination" @handletablechange="handleTableChange" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Bảng lương và phúc lợi">
                <uc-table-tong-quan :isLoadingDSNhanVien="isLoadingDSNhanVien" @recordCongViec="RecordCongViec" @recordThongTinCoBan="RecordThongTinCoBan" :columns="columnBangLuongVaPhucLoi" :dataSource="TableDSNhanSu.dataSource" :pagination="TableDSNhanSu.pagination" @handletablechange="handleTableChange" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="Thuế, bảo hiểm và hành chính">
                <uc-table-tong-quan :isLoadingDSNhanVien="isLoadingDSNhanVien" @recordCongViec="RecordCongViec" @recordThongTinCoBan="RecordThongTinCoBan" :columns="columnThueBaoHiemVaHanhChinh" :dataSource="TableDSNhanSu.dataSource" :pagination="TableDSNhanSu.pagination" @handletablechange="handleTableChange" />
            </a-tab-pane>
            <a-tab-pane key="4" tab="Lịch làm việc và nghỉ">
                <uc-table-tong-quan :isLoadingDSNhanVien="isLoadingDSNhanVien" @recordCongViec="RecordCongViec" @recordThongTinCoBan="RecordThongTinCoBan" :columns="columnLichLamViecVaNghi" :dataSource="TableDSNhanSu.dataSource" :pagination="TableDSNhanSu.pagination" @handletablechange="handleTableChange" />
            </a-tab-pane>
            <a-tab-pane key="5" tab="Nhóm và quản lý">
                <uc-table-tong-quan :isLoadingDSNhanVien="isLoadingDSNhanVien" :columns="columnNhomVaQuanLy" :dataSource="TableDSNhanSu.dataSource" :pagination="TableDSNhanSu.pagination" @handletablechange="handleTableChange" />
            </a-tab-pane>
            <a-tab-pane key="6" tab="Thông tin cá nhân">
                <uc-table-tong-quan :isLoadingDSNhanVien="isLoadingDSNhanVien" @onEdit="Edit()" @onEditThongTinCongViec="onEditThongTinCongViec()" @onEditTruongTuyChinh="onEditTruongTuyChinh" @recordCongViec="RecordCongViec" @recordThongTinCoBan="RecordThongTinCoBan" :columns="columnThongTinCaNhan" :dataSource="TableDSNhanSu.dataSource" :pagination="TableDSNhanSu.pagination" @handletablechange="handleTableChange" />
            </a-tab-pane>
        </a-tabs>
        <uc-modal-edit-thong-tin-co-ban v-model:isOpen="isShowModalThongTinCoBan" @onFinish="onLoadDSNhanSu()" :recordthongtincoban="recordThongTinCoBan" />
        <uc-modal-edit-thong-tin-cong v-model:isOpen="isShowModalThongTinCongViec" @onFinish="onLoadDSNhanSu()" :dsvaitroid="dsVaiTro_Id" :dsnhomcamau="DSNhomCaMau" :recordCongViec="recordCongViec" />
        <uc-modal-edit-thong-tin-luong v-model:isOpen="isShowModalTruongTuyChinh" @onFinish="onLoadDSNhanSu()" :record="recordThongTinLuong" />
        <uc-modal-edit-nhom-va-quan-ly v-model:isOpen="isShowModalNhomVaQuanLy" @onFinish="onLoadDSNhanSu()" :record="recordNhomVaQuanLy" />
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        const dsTrangThaiLamViec = [
            { text: 'Chính thức', value: 1 },
            { text: 'Tạm nghỉ', value: 2 },
            { text: 'Đã nghỉ việc', value: 3 },
        ]
        return {
            formAction: '',
            isShowModalThongTinCoBan: false,
            isShowModalThongTinCongViec: false,
            isShowModalTruongTuyChinh: false,
            isShowModalNhomVaQuanLy: false,
            formFilter: {
                TimKiem: '',
                PageIndex: 1,
                PageSize: 35,

                MauBangCong_Id_List: '',
                MauBangLuong_Id_List: '',
                TrangThai_LamViec_List: '',
                ChucDanh_Id_List: '',
                PhongBan_Id_List: '',
                VanPhong_Id_List: '',
                HinhThuc_Id_List: '',
                BacThuong_Id_List: '',
                BacLuong_Id_List: '',
            },
            formAdd: {},
            formEdit: {},
            activeTabKey: 1,
            TableDSNhanSu: {
                table: [],
                pagination: {},
            },
            DSNhomCaMau: [],
            DSMauBangLuong: [],
            DSMauBangCong: [],
            TrangThaiLamViecId: null,
            DSTrangThaiLamViec: dsTrangThaiLamViec,
            recordCongViec: {},
            columnsTongQuan: [
                // { title: 'Nhân sự', dataIndex: 'TenNhanSu', key: 'TenNhanSu', width: 250, fixed: 'left' },
                { title: 'Nhân sự', dataIndex: 'HoVaTenNhanVien', key: 'HoVaTenNhanVien', width: 250, fixed: 'left' },
                { title: '', dataIndex: 'Action', key: 'Action', width: 40, fixed: 'left', align: 'center' },
                { title: 'Mã', dataIndex: 'MaNhanVien', width: 100 },
                {
                    title: 'Trạng thái',
                    dataIndex: 'TrangThai_LamViec',
                    key: 'TrangThai_LamViec',
                    align: 'center',
                    width: 150,
                    filters: dsTrangThaiLamViec,
                },
                {
                    title: 'Chức danh',
                    dataIndex: 'TenChucDanh',
                    key: 'ChucDanh',
                    width: 220,
                    filters: [],
                },
                { title: 'Vị trí', dataIndex: 'TenViTri', width: 150 },
                {
                    key: 'TenMauBangCong',
                    title: 'Lịch làm việc',
                    dataIndex: 'TenMauBangCong',
                    width: 250,
                    filters: [],
                },
                {
                    key: 'TenMauBangLuong',
                    title: 'Mẫu bảng lương',
                    dataIndex: 'TenMauBangLuong',
                    width: 250,
                    filters: [],
                },
                { title: 'Bậc lương', dataIndex: 'TenBacLuong', width: 150, key: 'TenBacLuong', key: 'BacLuong', filters: [] },
                { title: 'Bậc thưởng', dataIndex: 'TenBacThuong', width: 150, key: 'TenBacThuong', key: 'BacThuong', filters: [] },
                { title: 'Lương cơ bản', dataIndex: 'LuongCoBan', width: 150, key: 'LuongCoBan' },
                { title: 'Ngày bắt đầu', dataIndex: 'NgayBatDau', width: 150, align: 'right' },
                { title: 'Ngày chính thức', dataIndex: 'NgayChinhThuc', width: 150, align: 'right' },
                { title: 'Tên văn phòng', dataIndex: 'TenVanPhong', width: 250, key: 'VanPhong', filters: [] },
                { title: 'Phòng ban', dataIndex: 'TenPhongBan', width: 200, key: 'PhongBan', filters: [] },
                { title: 'Khu vực chuyên môn', dataIndex: 'TenKhuVucChuyenMon', width: 200 },
                { title: 'Phân loại nhân sự', dataIndex: 'TenHinhThuc', width: 200, key: 'HinhThuc', filters: [] },
                // { title: 'Loại nhân viên', dataIndex: 'LoaiNhanVien', width: 150 },
                // { title: 'Giới tính', dataIndex: 'GioiTinh', width: 150, key: 'GioiTinh' },

                // { title: 'Loại vị trí', dataIndex: '', width: 150 },
                // { title: 'Điện thoại', dataIndex: 'DienThoai', width: 150 },
                // { title: 'Email', dataIndex: 'Email', width: 200 },

                // Ben tabs bang luong va phuc loi
                // { title: 'Ngân hàng', dataIndex: 'Ten_NganHang', width: 150 },
                // { title: 'Số tài khoản', dataIndex: 'SoTaiKhoan_NganHang', width: 150 },
                // { title: 'Tài khoản', dataIndex: 'TenTaiKhoan_NganHang', width: 150 },
                // { title: 'Chi nhánh', dataIndex: 'ChiNhanh_NganHang', width: 150 },
                // { title: 'Ngày nghỉ việc', dataIndex: 'NgayNghiViec', width: 150 },

                // Bên tab Thuế, bảo hiểm và hành chính
                // { title: 'Mã số thuế', dataIndex: 'MaSoThue', width: 150 },
                // { title: 'Giảm trừ thuế', dataIndex: 'Is_GiamTruThue', width: 150 },
                // { title: 'CCCD', dataIndex: 'So_CCCD', width: 150 },
                // { title: 'Ngày cấp', dataIndex: 'NgayCap_CCCD', width: 150 },
                // { title: 'Nơi cấp', dataIndex: 'NoiCap_CCCD', width: 350 },
                // { title: 'Người phụ thuộc', dataIndex: 'Is_CoNguoiPhuThuoc', width: 150 },
                // { title: 'BHXH', dataIndex: 'So_BHXH', width: 150 },
                // { title: 'Nơi đăng ký', dataIndex: 'NoiDangKy_BHXH', width: 200 },
                // { title: 'Địa chỉ CCCD', dataIndex: 'DiaChi_CCCD', width: 350 },
                // { title: 'Địa chỉ tạm trú', dataIndex: 'DiaChi_TamTru', width: 350 },
                // { title: 'Nơi sinh', dataIndex: 'NoiSinh', width: 150 },

                // Bên tab thông tin cá nhân
                // { title: 'Hôn nhân', dataIndex: 'TrangThai_HonNhan', width: 150, key: 'TrangThai_HonNhan' },

                // Bên tab lịch làm việc và nghỉ
                // { title: 'Ngày bắt đầu (tạm nghỉ)', dataIndex: 'NgayBatDau_TamNghi', width: 200 },
                // { title: 'Ngày kết thúc (tạm nghỉ)', dataIndex: 'NgayKetThuc_TamNghi', width: 200 },
                // { title: 'Lý do', dataIndex: 'LyDo_TamNghi', width: 150 },
            ],
            columnBangLuongVaPhucLoi: [
                { title: 'Nhân sự', dataIndex: 'HoVaTenNhanVien', key: 'HoVaTenNhanVien', width: 250, fixed: 'left' },
                { title: 'Mã', dataIndex: 'MaNhanVien', width: 100 },
                { title: 'Trạng thái', dataIndex: 'TrangThai_LamViec', key: 'TrangThai_LamViec', align: 'center', width: 150 },
                { title: 'Thâm niên', dataIndex: '', width: 200 },
                { title: 'Vị trí', dataIndex: 'TenViTri', width: 150 },
                { title: 'Loại vị trí', dataIndex: '', width: 150 },
                { title: 'Chính sách lương', dataIndex: '', width: 150 },
                { title: 'Lương', dataIndex: '', width: 150 },
                { title: 'Bậc lương', dataIndex: 'TenBacLuong', width: 150 },
                { title: 'Bậc thưởng', dataIndex: 'TenBacThuong', width: 150 },
                { title: 'Lương cơ bản', dataIndex: 'LuongCoBan', width: 150 },
                { title: 'Phụ cấp cơm', dataIndex: '', width: 150 },
                { title: 'Lương nhận tuyển', dataIndex: '', width: 200 },
                { title: 'Thăng tiến gần nhất', dataIndex: 'NgayThangTien', width: 150 },
                { title: 'Số tài khoản ngân hàng', dataIndex: 'SoTaiKhoan_NganHang', width: 200 },
                { title: 'Tên chủ tài khoản', dataIndex: 'TenTaiKhoan_NganHang', width: 200 },
                { title: 'Tên Ngân hàng', dataIndex: 'Ten_NganHang', width: 150 },
                { title: 'Chi nhánh ngân hàng', dataIndex: 'ChiNhanh_NganHang', width: 200 },
                { title: 'Hợp đồng', dataIndex: 'HopDong_Id', width: 150 },
                { title: 'Ngày bắt đầu', dataIndex: 'NgayBatDau', width: 150 },
                { title: 'Ngày chính thức', dataIndex: 'NgayChinhThuc', width: 150 },
                { title: 'Ngày nghỉ việc', dataIndex: 'NgayNghiViec', width: 150 },
                { title: 'Văn phòng', dataIndex: 'TenVanPhong', width: 350 },
                { title: 'Khu vực / Chuyên môn', dataIndex: 'TenKhuVucChuyenMon', width: 200 },
            ],
            columnThueBaoHiemVaHanhChinh: [
                { title: 'Nhân sự', dataIndex: 'HoVaTenNhanVien', key: 'HoVaTenNhanVien', width: 250, fixed: 'left' },
                { title: 'Mã', dataIndex: 'MaNhanVien', width: 100 },
                { title: 'Trạng thái', dataIndex: 'TrangThai_LamViec', key: 'TrangThai_LamViec', align: 'center', width: 150 },
                { title: 'Chính sách thuế', dataIndex: '', width: 150 },
                { title: 'Mã số thuế', dataIndex: '', width: 100 },
                { title: 'CMT/Căn cước', dataIndex: 'So_CCCD', width: 150 },
                { title: 'Ngày cấp', dataIndex: 'NgayCap_CCCD', width: 100 },
                { title: 'Nơi cấp', dataIndex: 'NoiCap_CCCD', width: 450 },
                { title: 'Địa chỉ CCCD', dataIndex: 'DiaChi_CCCD', width: 500 },
                { title: 'Hôn nhân', dataIndex: 'TrangThai_HonNhan', width: 150, key: 'TrangThai_HonNhan' },
                { title: 'Giảm trừ thuế TNCN', dataIndex: 'Is_GiamTruThue', width: 150 },
                { title: 'Người phụ thuộc', dataIndex: 'Is_CoNguoiPhuThuoc', width: 150 },
                { title: 'Chính sách bảo hiểm', dataIndex: '', width: 150 },
                { title: 'Số sổ BHXH', dataIndex: 'So_BHXH', width: 100 },
                { title: 'Nơi đăng ký BHXH', dataIndex: 'NoiDangKy_BHXH', width: 150 },
                { title: 'Nơi sinh', dataIndex: 'NoiSinh', width: 250 },
                { title: 'Địa chỉ tạm trú', dataIndex: 'DiaChi_TamTru', width: 500 },
            ],
            columnLichLamViecVaNghi: [
                { title: 'Nhân sự', dataIndex: 'HoVaTenNhanVien', key: 'HoVaTenNhanVien', width: 250, fixed: 'left' },
                { title: 'Mã', dataIndex: 'MaNhanVien', width: 100 },
                { title: 'Trạng thái', dataIndex: 'TrangThai_LamViec', key: 'TrangThai_LamViec', align: 'center', width: 150 },
                { title: 'Lịch làm việc', dataIndex: 'TenMauBangCong', width: 200 },
                { title: 'Chính sách nghỉ phép', dataIndex: '', width: 200 },
                { title: 'Tổng ngày phép đang có', dataIndex: '', width: 200 },
                { title: 'Phép trong năm', dataIndex: '', width: 150 },
                { title: 'Phép tồn', dataIndex: '', width: 100 },
                { title: 'Phép thâm niên', dataIndex: '', width: 150 },
                { title: 'Nghỉ bù', dataIndex: '', width: 100 },
                { title: 'Mã chấm công', dataIndex: 'MaChamCong', width: 150 },
                { title: 'Văn phòng', dataIndex: 'TenVanPhong', width: 400 },
                { title: 'Thâm niên', dataIndex: '', width: 100 },
                { title: 'Bắt đầu tạm nghỉ', dataIndex: 'NgayBatDau_TamNghi', width: 150 },
                { title: 'Kết thúc tạm nghỉ', dataIndex: 'NgayKetThuc_TamNghi', width: 150 },
                { title: 'Lý do tạm nghỉ', dataIndex: 'LyDo_TamNghi', width: 200 },
                { title: 'Ghi chú tạm nghỉ', dataIndex: '', width: 200 },
            ],
            columnNhomVaQuanLy: [
                { title: 'Nhân sự', dataIndex: 'HoVaTenNhanVien', key: 'HoVaTenNhanVien', width: 250, fixed: 'left' },
                { title: '', dataIndex: 'editNhomVaQuanLy', key: 'editNhomVaQuanLy', width: 40, fixed: 'left', align: 'center' },
                { title: 'Khu vực / Chuyên môn', dataIndex: 'TenKhuVucChuyenMon', width: 200 },
                { title: 'Văn phòng', dataIndex: 'TenVanPhong', width: 400 },
                { title: 'Nhóm chính thức', dataIndex: '', width: 200 },
                { title: 'Quản lý (M1)', dataIndex: '', width: 200 },
                { title: 'Quản lý (M2)', dataIndex: '', width: 200 },
                { title: 'Quản lý (M3)', dataIndex: '', width: 200 },
                { title: 'Đồng nghiệp 1 (p1)', dataIndex: '', width: 200 },
                { title: 'Đồng nghiệp 2 (p2)', dataIndex: '', width: 200 },
                { title: 'Đồng nghiệp 3 (p3)', dataIndex: '', width: 200 },
                { title: 'Đồng nghiệp 4 (p4)', dataIndex: '', width: 200 },
                { title: 'Đồng nghiệp 5 (p5)', dataIndex: '', width: 200 },
            ],
            columnThongTinCaNhan: [
                { title: 'Nhân sự', dataIndex: 'HoVaTenNhanVien', key: 'HoVaTenNhanVien', width: 250, fixed: 'left' },
                { title: '', dataIndex: 'Action', key: 'Action', width: 40, fixed: 'left', align: 'center' },
                { title: 'Mã', dataIndex: 'MaNhanVien', width: 100 },
                { title: 'Trạng thái', dataIndex: 'TrangThai_LamViec', key: 'TrangThai_LamViec', align: 'center', width: 150 },
                { title: 'Thâm niên', dataIndex: '', width: 200 },
                { title: 'Email', dataIndex: 'Email', width: 200 },
                { title: 'Điện thoại', dataIndex: 'DienThoai', width: 200 },
                { title: 'Địa chỉ', dataIndex: '', width: 500 },
                { title: 'Nơi sinh', dataIndex: 'NoiSinh', width: 200 },
                { title: 'Ngày sinh', dataIndex: 'NgaySinh', key: 'birthday', width: 150, align: 'center' },
                { title: 'Hộ khẩu thường trú', dataIndex: 'DiaChi_ThuongTru', width: 500 },
                { title: 'Quốc tịch', dataIndex: 'QuocTich', width: 120 },
                { title: 'Hôn nhân', dataIndex: 'TrangThai_HonNhan', width: 200, key: 'TrangThai_HonNhan' },
                { title: 'Thông tin học vấn', dataIndex: '', width: 200 },
                { title: 'Hết hạn', dataIndex: 'NgayHetHan', width: 200 },
            ],
            NhanVienVaiTro: [],
            dsVaiTro_Id: [],
            recordThongTinCoBan: {},
            recordNhomVaQuanLy: {},
            recordThongTinLuong: {},
            isLoadingDSNhanVien: false,
        }
    },
    async mounted() {
        this.isLoadingDSNhanVien = true
        const promise = () => {
            return new Promise(async (resolve) => {
                await this.onLoadMauBangCong()
                await this.onLoadMauBangLuong()
                await this.onLoadDSNhanSu()
                resolve()
            })
        }
        promise().then(() => {
            this.isLoadingDSNhanVien = false
        })
    },
    computed: {},
    watch: {},
    methods: {
        async handleTableChange({ pagination: _pagination, filters, sorter }) {
            this.isLoadingDSNhanVien = true
            const MauBangCong_Id_List = filters.TenMauBangCong ? filters.TenMauBangCong.join(',') : ''
            const MauBangLuong_Id_List = filters.TenMauBangLuong ? filters.TenMauBangLuong.join(',') : ''
            const TrangThai_LamViec_List = filters.TrangThai_LamViec ? filters.TrangThai_LamViec.join(',') : ''
            const ChucDanh_Id_List = filters.ChucDanh ? filters.ChucDanh.join(',') : ''
            const PhongBan_Id_List = filters.PhongBan ? filters.PhongBan.join(',') : ''
            const VanPhong_Id_List = filters.VanPhong ? filters.VanPhong.join(',') : ''
            const HinhThuc_Id_List = filters.HinhThuc ? filters.HinhThuc.join(',') : ''
            const BacThuong_Id_List = filters.BacThuong ? filters.BacThuong.join(',') : ''
            const BacLuong_Id_List = filters.BacLuong ? filters.BacLuong.join(',') : ''

            console.log('dataFilter=========>', {
                ...this.formFilter,
                PageIndex: _pagination.current,
                PageSize: _pagination.pageSize,
                MauBangCong_Id_List: MauBangCong_Id_List,
                MauBangLuong_Id_List: MauBangLuong_Id_List,
                TrangThai_LamViec_List: TrangThai_LamViec_List,
            })

            const { Pagination, DSNhanVien } = await nhanVienService
                .NhanVien_Select({
                    ...this.formFilter,
                    PageIndex: _pagination.current,
                    PageSize: _pagination.pageSize,
                    MauBangCong_Id_List: MauBangCong_Id_List,
                    MauBangLuong_Id_List: MauBangLuong_Id_List,
                    TrangThai_LamViec_List: TrangThai_LamViec_List,
                    ChucDanh_Id_List: ChucDanh_Id_List,
                    PhongBan_Id_List: PhongBan_Id_List,
                    VanPhong_Id_List: VanPhong_Id_List,
                    HinhThuc_Id_List: HinhThuc_Id_List,
                    BacThuong_Id_List: BacThuong_Id_List,
                    BacLuong_Id_List: BacLuong_Id_List,
                })
                .finally(() => (this.isLoadingDSNhanVien = false))
            this.TableDSNhanSu = { dataSource: DSNhanVien, pagination: getPagination(Pagination) }
        },
        async onSearch() {
            console.log('xxx')
            this.isLoadingDSNhanVien = true
            const { Pagination, DSNhanVien } = await nhanVienService.NhanVien_Select(this.formFilter).finally(() => (this.isLoadingDSNhanVien = false))
            this.TableDSNhanSu = { dataSource: DSNhanVien, pagination: getPagination(Pagination) }
        },
        async onLoadDSNhanSu() {
            this.isLoadingDSNhanVien = true
            const res = await nhanVienService.NhanVien_Select(this.formFilter).finally(() => (this.isLoadingDSNhanVien = false))
            const { Pagination, DSNhanVien } = res
            if (res) {
                let index = this.columnsTongQuan.findIndex((x) => x.key === 'ChucDanh')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: [...new Set(DSNhanVien.map((x) => x.ChucDanh_Id))].map((id) => ({
                            text: DSNhanVien.find((x) => x.ChucDanh_Id === id).TenChucDanh,
                            value: id,
                        })),
                    }
                }

                index = this.columnsTongQuan.findIndex((x) => x.key === 'PhongBan')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: [...new Set(DSNhanVien.map((x) => x.PhongBan_Id))].map((id) => ({
                            text: DSNhanVien.find((x) => x.PhongBan_Id === id).TenPhongBan,
                            value: id,
                        })),
                    }
                }

                index = this.columnsTongQuan.findIndex((x) => x.key === 'VanPhong')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: [...new Set(DSNhanVien.map((x) => x.VanPhong_Id))].map((id) => ({
                            text: DSNhanVien.find((x) => x.VanPhong_Id === id).TenVanPhong,
                            value: id,
                        })),
                    }
                }

                index = this.columnsTongQuan.findIndex((x) => x.key === 'BacLuong')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: [...new Set(DSNhanVien.map((x) => x.BacLuong_Id))].map((id) => ({
                            text: DSNhanVien.find((x) => x.BacLuong_Id === id).TenBacLuong,
                            value: id,
                        })),
                    }
                }

                index = this.columnsTongQuan.findIndex((x) => x.key === 'BacThuong')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: [...new Set(DSNhanVien.map((x) => x.BacThuong_Id))].map((id) => ({
                            text: DSNhanVien.find((x) => x.BacThuong_Id === id).TenBacThuong,
                            value: id,
                        })),
                    }
                }

                index = this.columnsTongQuan.findIndex((x) => x.key === 'HinhThuc')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: [...new Set(DSNhanVien.map((x) => x.HinhThuc_Id))].map((id) => ({
                            text: DSNhanVien.find((x) => x.HinhThuc_Id === id).TenHinhThuc,
                            value: id,
                        })),
                    }
                }
            }
            this.TableDSNhanSu = { dataSource: DSNhanVien, pagination: getPagination(Pagination) }
        },
        async loadNhomCaMau() {
            const $this = this
            const res = await nhomCaMauService.NhomCaMau_Select()
            if (res) {
                $this.DSNhomCaMau = res
            }
        },
        async onLoadMauBangCong() {
            const $this = this
            const res = await mauBangCongService.MauBangCong_Select()
            if (res) {
                $this.DSMauBangCong = res.DSMauBangCong
                const dsFilter = [...new Set(res.map((x) => x.MauBangCong_Id))].map((id) => ({
                    text: res.find((x) => x.MauBangCong_Id === id).TenMauBangCong,
                    value: id,
                }))
                const index = this.columnsTongQuan.findIndex((x) => x.key === 'TenMauBangCong')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: dsFilter,
                    }
                }
            }
        },
        async onLoadMauBangLuong() {
            const $this = this
            const res = await mauBangLuongService.MauBangLuong_Select()
            if (res) {
                $this.DSMauBangLuong = res.DSMauBangLuong
                const dsFilter = [...new Set(res.map((x) => x.MauBangLuong_Id))].map((id) => ({
                    text: res.find((x) => x.MauBangLuong_Id === id).TenMauBangLuong,
                    value: id,
                }))
                const index = this.columnsTongQuan.findIndex((x) => x.key === 'TenMauBangLuong')
                if (index) {
                    this.columnsTongQuan[index] = {
                        ...this.columnsTongQuan[index],
                        filters: dsFilter,
                    }
                }
            }
        },
        Edit() {
            this.isShowModalThongTinCoBan = true
        },
        onEditThongTinCongViec() {
            this.isShowModalThongTinCongViec = true
        },
        onEditTruongTuyChinh() {
            this.isShowModalTruongTuyChinh = true
        },
        async RecordCongViec(value) {
            this.recordCongViec = Object.assign({}, value)
            const res = await nhanVienService.NhanVien_VaiTro_Select_By_NhanVien_Id({
                NhanVien_Id: this.recordCongViec.NhanVien_Id,
            })
            this.recordCongViec.VaiTro_Id_List = res.map((item) => {
                return item.VaiTro_Id
            })
        },
        RecordThongTinCoBan(value) {
            this.recordThongTinCoBan = Object.assign({}, value)
            this.recordThongTinCoBan.Is_TamKhoa = this.recordThongTinCoBan.Is_TamKhoa ? 1 : 0
            this.recordThongTinCoBan.dayOfBirth = this.recordThongTinCoBan.NgaySinh.toString().padStart(2, '0') + '/' + this.recordThongTinCoBan.ThangSinh.toString().padStart(2, '0') + '/' + this.recordThongTinCoBan.NamSinh
            this.recordThongTinCoBan.dayOfBirth = dayjs(this.recordThongTinCoBan.dayOfBirth, 'DD/MM/YYYY')
            this.recordThongTinCoBan.NgayBatDau = dayjs(this.recordThongTinCoBan.NgayBatDau, 'DD/MM/YYYY')
            this.recordThongTinCoBan.NgayChinhThuc = dayjs(this.recordThongTinCoBan.NgayChinhThuc, 'DD/MM/YYYY')
        },
        onEditNhomVaQuanLy() {
            this.isShowModalNhomVaQuanLy = true
        },
        RecordNhomVaQuanLy(value) {
            this.recordNhomVaQuanLy = Object.assign({}, value)
        },
        RecordThongTinLuong(value) {
            this.recordThongTinLuong = Object.assign({}, value)
        },
        redirectAddNhanSu() {
            redirect('hr-them-nhan-su')
        },
        async filterNhanSu() {
            const { Pagination, DSNhanVien } = await nhanVienService.NhanVien_Select(this.formFilter)
            console.log('res', DSNhanVien)
            return DSNhanVien
        },
        exportExcel() {
            const $this = this
            var loadScript = new Loader()
            const arr = [...this.columnsTongQuan.filter((x) => x.title !== '')]
            const headerNhanVien = [arr.map((x) => x.dataIndex)]
            const nameHeaderNhanVien = [arr.map((x) => x.title)]
            loadScript.require(['/include/xlsx/xlsx.full.min.js'], function () {
                writeExcelFile(
                    $this.TableDSNhanSu.dataSource.map((x) => {
                        const headers = headerNhanVien[0]
                        const obj = {}
                        for (var header of headers) {
                            obj[header] = x[header]
                        }
                        return { ...obj }
                    }),
                    nameHeaderNhanVien,
                )
            })
            function writeExcelFile(data, headers) {
                var workbook = XLSX.utils.book_new()
                var worksheet = XLSX.utils.json_to_sheet(data, { origin: 'A2', skipHeader: true })
                XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' })
                XLSX.utils.book_append_sheet(workbook, worksheet, 'SheetFP')
                XLSX.writeFile(workbook, 'Danh-sach-nhan-su.xlsx')
            }
        },
    },
}
</script>
