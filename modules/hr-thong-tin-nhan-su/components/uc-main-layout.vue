<template>
    <uc-layout>
        <a-row>
            <a-col :span="4" style="
                background-color:white; 
                height: 100vh; 
                overflow: auto; 
                border-right: 1px solid rgba(5, 5, 5, 0.06);">
                <a-card :bordered="false" :bodyStyle="{ padding: '0 24px', 'border-radius': 0 }">
                    <template #title>
                        <div onclick="window.history.go(-1); return false;" style="cursor:pointer; margin-top: 16px;">
                            <uc-icon name="chevron-left" size="18" />
                            Danh sách nhân sự
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center"
                            style="margin-top:12px; margin-bottom: 12px">
                            <uc-avatar :src="user?.ThongTinNhanSu?.AnhDaiDien_Url"
                                :text="user?.ThongTinNhanSu?.HoVaTenNhanVien" :size="120"></uc-avatar>
                            <span style="font-size:20px">{{ user?.ThongTinNhanSu?.HoVaTenNhanVien }}</span>
                            <span style="color:grey; font-size:14px">{{ user?.ThongTinNhanSu?.MaNhanVien }}</span>
                        </div>
                    </template>
                    <div class="d-flex flex-column" style="margin-top: 12px; margin-bottom: 12px">
                        <span class="mb-1">
                            <uc-icon style="margin-right:8px" name="account" />
                            <span> {{ user?.ThongTinNhanSu?.MaNhanVien }}</span>
                        </span>
                        <span class="mb-1">
                            <uc-icon style="margin-right:8px" name="email" />
                            <span> {{ user?.ThongTinNhanSu?.Email }}</span>
                        </span>
                        <span class="mb-1">
                            <uc-icon style="margin-right:8px" name="phone" />
                            <span> {{ user?.ThongTinNhanSu?.DienThoai }} </span>
                        </span>
                    </div>
                </a-card>
                <a-divider style="background-color:white; margin: 0" />
                <a-menu v-model:selectedKeys="menuItem">
                    <a-menu-item v-for="item in items" :key="item.id" :title="item.subcontent"
                        @click="selectItem(item)">
                        <div class="d-flex flex-column">
                            <span> <uc-icon :name="item.icon" /> {{ item.tab }} </span>
                        </div>
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="20">
                <uc-tab-thong-tin-ca-nhan :itemtab="itemTab" v-model:user="user" />
            </a-col>
        </a-row>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        const urlParam = new URL(window.location.href).searchParams
        const NhanVien_Id = parseInt(urlParam.get('id'))

        return {
            NhanVien_Id: NhanVien_Id,
            tab: null,
            menuItem: [1],
            itemTab: {},
            items: [
                {
                    id: 1,
                    icon: 'account',
                    tab: 'Thông tin cá nhân',
                    content: 'Thông tin cá nhân',
                    subcontent: 'Các thông tin cá nhân, liên hệ, học vấn và lịch sử làm việc',
                    Title: [
                        {
                            id: 1,
                            Ten: 'Thông tin chính',
                            MoTa: 'Các thông tin cá nhân quan trọng',
                            DuLieu: [
                                // { key: 'HoVaTenNhanVien', label: 'Họ và tên', icon: '', value: 'Tô Minh Quốc' },
                                // { key: 'MaNhanVien', label: 'Mã nhân sự', icon: '', value: 'TMQUOC' },
                                // { key: 'NgayBatDau', label: 'Ngày bắt đầu', icon: '', value: '30/10/2016' },
                                // { key: 'NgayChinhThuc', label: 'Ngày chính thức', icon: '', value: '30/10/2016' },
                                // { key: 'TrangThai_LamViec_Ten', label: 'Tình trạng việc làm', icon: '', value: 'Đang làm việc' },
                                // { key: '', label: 'Hợp đồng hiện tại', icon: '', value: '' },
                                // { key: 'DienThoai', label: 'Số điện thoại', icon: '', value: '' },
                                // { key: 'TenChucDanh', label: 'Chức danh', icon: '', value: 'Giám Đốc' },
                                // { key: 'NgaySinh', label: 'Ngày sinh', icon: '', value: '01/07/1988' },
                                // { key: 'Email', label: 'Email', icon: '', value: 'minhquoc@tominh.vn' },
                                // { key: 'GioiTinh', label: 'Giới tính', icon: '', value: 'Nam' },
                                // { key: 'TrangThai_HonNhan', label: 'Tình trạng hôn nhân', icon: '', value: 'Chưa kết hôn' },
                                // { key: 'TenVanPhong', label: 'Văn phòng', icon: '', value: '' },
                                // { key: '', label: 'Lịch làm việc', icon: '', value: '' },
                                // { key: '', label: 'Khu vực / Chuyên môn', icon: '', value: '' },
                                // { key: 'TenHinhThuc', label: 'Phân loại nhân sự', icon: '', value: '' },
                                // { key: '', label: 'Ghi chú thêm', icon: '', value: '' },
                            ],
                        },
                        {
                            id: 2,
                            Ten: 'Thuế và bảo hiểm',
                            MoTa: 'Thông tin về thuế, bảo hiểm và các chính sách theo kèm',
                            DuLieu: [
                                // { label: 'Mã số thuế', icon: '', value: '' },
                                // { label: 'Giảm trừ thuế thu nhập cá nhân', icon: '', value: 'Không' },
                                // { label: 'Chính sách thuế', icon: '', value: 'Không có thông tin' },
                                // { label: 'Số sổ BHXH', icon: '', value: '' },
                                // { label: 'Nơi đăng ký BHXH', icon: '', value: '' },
                                // { label: 'Chính sách bảo hiểm', icon: '', value: 'Không có thông tin' },
                            ],
                        },
                        {
                            id: 3,
                            Ten: 'Thông tin cá nhân bổ sung',
                            MoTa: 'Một số thông tin cá nhân bổ sung',
                            DuLieu: [
                                // { label: 'Địa chỉ hiện tại', icon: '', value: 'Tổ 31, Khu phố 5, Trảng Dài, Biên Hoà, Đồng Nai' },
                                // { label: 'Nơi sinh', icon: '', value: 'Ninh Bình' },
                                // { label: 'Hộ khẩu thường trú', icon: '', value: 'KP5, P. Trảng Dài, Biên Hòa, Đồng Nai' },
                                // { label: 'Quốc tịch', icon: '', value: 'Việt Nam' },
                                // { label: 'CMT/Căn cước', icon: '', value: '' },
                                // { label: 'Ngày cấp', icon: '', value: '05/06/2022' },
                                // { label: 'Email khác', icon: '', value: '' },
                                // { label: 'Biệt danh', icon: '', value: '' },
                                // { label: 'Linkedin', icon: '', value: '' },
                                // { label: 'Facebook', icon: '', value: '' },
                                // { label: 'Website', icon: '', value: '' },
                            ],
                        },
                        {
                            id: 4,
                            Ten: 'Tài khoản ngân hàng',
                            MoTa: 'Thông tin tài khoản ngân hàng',
                            DuLieu: [
                                // { label: 'Số tài khoản Ngân hàng', icon: '', value: '67910000284564' },
                                // { label: 'Tên chủ tài khoản', icon: '', value: 'Tô Minh Quốc' },
                                // { label: 'Tên Ngân hàng', icon: '', value: 'BIDV' },
                                // { label: 'Chi nhánh Ngân hàng', icon: '', value: 'Biên Hòa' },
                            ],
                        },
                        {
                            id: 5,
                            Ten: 'Thông tin học vấn',
                            MoTa: 'Chi tiết lịch sử học vấn',
                            isTable: true,
                            isNameTable: 'thong-tin-hoc-van',
                            Columns: [
                                { title: 'Trường học', dataIndex: 'TruongHoc' },
                                { title: 'Thành phố', dataIndex: 'ThanhPho' },
                                { title: 'Khoảng thời gian', dataIndex: 'KhoanThoiGian' },
                                { title: 'Bằng cấp', dataIndex: 'BangCap' },
                                { title: 'Bằng cấp cao nhất', dataIndex: 'Is_BangCapCaoNhat', key: 'Is_BangCapCaoNhat' },
                            ],
                            DuLieu: []
                        },
                        {
                            id: 6,
                            Ten: 'Lịch sử làm việc',
                            MoTa: 'Chi tiết lịch sử làm việc',
                            isTable: true,
                            isNameTable: 'lich-su-lam-viec',
                            Columns: [
                                { title: 'Công ty', dataIndex: 'CongTy' },
                                { title: 'Chức danh', dataIndex: 'ChucDanh' },
                                { title: 'Khoảng thời gian', dataIndex: 'KhoanThoiGian' },
                                { title: 'Địa chỉ', dataIndex: 'DiaChi' },
                                { title: 'Nhiệm vụ công việc', dataIndex: 'NhiemVuCongViec' },
                            ],
                            DuLieu: []
                        },
                        {
                            id: 7,
                            Ten: 'Gia đình, người phụ thuộc và người liên hệ khác',
                            MoTa: 'Lưu ý: Giảm trừ thuế theo người phụ thuộc chỉ khả dụng khi giảm trừ các nhân được kích hoạt',
                            isTable: true,
                            isNameTable: 'thong-tin-nguoi-than',
                            Columns: [
                                { title: 'Họ và tên', dataIndex: 'HoVaTen' },
                                { title: 'Mối quan hệ', dataIndex: 'MoiQuanHe' },
                                { title: 'Điện thoại', dataIndex: 'DienThoai' },
                                { title: 'Địa chỉ', dataIndex: 'DiaChi' },
                                { title: 'Ngày sinh', dataIndex: 'NgaySinh', key: 'NgaySinh' },
                            ],
                            DuLieu: []
                        },
                        {
                            id: 8,
                            Ten: 'Hồ sơ xin việc',
                            MoTa: 'Danh sách hồ sơ xin việc',
                            isTable: true,
                            isNameTable: 'ho-so-xin-viec',
                            Columns: [
                                { title: 'Tên file', dataIndex: 'FileName', key: 'FileName' },
                            ],
                            DuLieu: []
                        },
                    ],
                },
                {
                    id: 2,
                    icon: 'briefcase',
                    tab: 'Thông tin công việc',
                    content: 'Các thông tin về công việc và sự nghiệp',
                    subcontent: 'Thông tin về công việc, sự nghiệp, các kế hoạch phát triển và các nghiệp vụ được giao',
                    Title: [
                        {
                            id: 1,
                            Ten: 'Thông tin công việc',
                            MoTa: 'Thông tin quan về công việc hiện tại',
                            DuLieu: []
                        }
                    ]
                },
                // { id: 3, icon: '', tab: 'Lương & phúc lợi', content: 'Lương & phúc lợi', subcontent: 'Bảng lương và phúc lợi' },
                // { id: 4, icon: '', tab: 'Nghiệp vụ được giao', content: 'Nghiệp vụ', subcontent: 'Thông tin về công việc, sự nghiệp, các kế hoạch phát triển và các nghiệp vụ được giao' },
                // { id: 5, icon: '', tab: 'Thành tựu & giải thưởng', content: 'Thành tựu và giải thưởng', subcontent: 'Giải thưởng, chứng chỉ, cột mốc và sự ghi nhận nhân sự đã đạt được' },
                // { id: 6, icon: '', tab: 'Vi phạm', content: 'Vi phạm', subcontent: 'Các vi phạm quy định làm việc, chính sách' },
                // { id: 7, icon: '', tab: 'Đánh giá & phản hồi', content: 'Đánh giá & phản hồi', subcontent: 'Quản lí hiệu suất và phản hồi' },
                // { id: 8, icon: '', tab: 'Hợp đồng & văn bản', content: 'Hợp đồng và văn bản', subcontent: 'Hợp đồng, lịch sử hợp đồng và văn bản của nhân sự' },
                // { id: 9, icon: '', tab: 'Lịch làm việc & nghỉ phép', content: 'Lịch làm việc & nghỉ phép', subcontent: 'Lịch làm việc, chấm công, nghỉ phép và mã chấm công' },
                // { id: 10, icon: '', tab: 'Tài sản công ty', content: 'Tài sản được bàn giao', subcontent: 'Quản lí và bàn giao của tài sản' },
                // { id: 11, icon: '', tab: 'Tình trạng việc làm', content: 'Tô Minh Quốc', subcontent: 'Trạng thái chung của nhân sự' },
                // { id: 12, icon: '', tab: 'Dữ liệu hoạt động', content: 'Dữ liệu hoạt động', subcontent: 'Dữ liệu hoạt động trên hồ sơ nhân sự' },
            ],
            user: null,
            DSTinhTrangKetHon: [
                {
                    TrangThai_HonNhan: 1,
                    text: 'Chưa kết hôn'
                },
                {
                    TrangThai_HonNhan: 2,
                    text: 'Đã kết hôn'
                },
            ],
            DSGioiTinh: [
                { GioiTinh: 1, text: 'Nam' },
                { GioiTinh: 2, text: 'Nữ' },
                { GioiTinh: 3, text: 'Khác' },
            ]
        }
    },
    async mounted() {
        this.selectItem(this.items[0])
        this.user = await nhanVienService.NhanVien_Select_By_Id({
            NhanVien_Id: this.NhanVien_Id
        })
        const thongTinNhanSu = this.user.ThongTinNhanSu
        const ngaySinh = `${thongTinNhanSu.NgaySinh.toString().padStart(2, '0')}/${thongTinNhanSu.ThangSinh.toString().padStart(2, '0')}/${thongTinNhanSu.NamSinh}`
        const honNhan = this.DSTinhTrangKetHon.find(x => x.TrangThai_HonNhan === thongTinNhanSu.TrangThai_HonNhan)
        const gioiTinh = this.DSGioiTinh.find(x => x.GioiTinh === thongTinNhanSu.GioiTinh)

        //Thông tin cá nhân - Thông tin chính
        this.items[0].Title[0].DuLieu = [
            { key: 'MaNhanVien', label: 'Mã nhân sự', icon: '', value: thongTinNhanSu.MaNhanVien },
            { key: 'MaChamCong', label: 'Mã chấm công', icon: '', value: thongTinNhanSu.MaChamCong },
            { key: 'TaiKhoan', label: 'Tài khoản', icon: '', value: thongTinNhanSu.TaiKhoan },
            { key: 'HoVaTenNhanVien', label: 'Họ và tên', icon: '', value: thongTinNhanSu.HoVaTenNhanVien },
            { key: 'GioiTinh', label: 'Giới tính', icon: '', value: gioiTinh.text },
            { key: 'Email', label: 'Email', icon: '', value: thongTinNhanSu.Email },
            { key: 'DienThoai', label: 'Số điện thoại', icon: '', value: thongTinNhanSu.DienThoai },
            { key: 'NgaySinh', label: 'Ngày sinh', icon: '', value: ngaySinh },
            { key: 'TrangThai_HonNhan', label: 'Tình trạng hôn nhân', icon: '', value: honNhan.text },
            { key: 'TenVanPhong', label: 'Văn phòng', icon: '', value: thongTinNhanSu.TenVanPhong },
            { key: 'TenChucDanh', label: 'Chức danh', icon: '', value: thongTinNhanSu.TenChucDanh },
            { key: 'TenHinhThuc', label: 'Phân loại nhân sự', icon: '', value: thongTinNhanSu.TenHinhThuc },
            { key: 'TenViTri', label: 'Vị trí', icon: '', value: thongTinNhanSu.TenViTri },
            { key: 'NgayBatDau', label: 'Ngày bắt đầu', icon: '', value: dayjs(thongTinNhanSu.NgayBatDau).format('DD/MM/YYYY') },
            { key: 'NgayChinhThuc', label: 'Ngày chính thức', icon: '', value: dayjs(thongTinNhanSu.NgayChinhThuc).format('DD/MM/YYYY') },
            { key: 'TenNhomNhanVien', label: 'Nhóm nhân viên', icon: '', value: thongTinNhanSu.TenNhomNhanVien },
            { key: 'TrangThai_LamViec_Ten', label: 'Tình trạng việc làm', icon: '', value: thongTinNhanSu.TrangThai_LamViec_Ten },
            // { key: '', label: 'Hợp đồng hiện tại', icon: '', value: '' },
            // { key: '', label: 'Lịch làm việc', icon: '', value: '' },
            // { key: '', label: 'Khu vực / Chuyên môn', icon: '', value: '' },
        ]

        //Thông tin cá nhân - Thuế và bảo hiểm
        this.items[0].Title[1].DuLieu = [
            { key: 'So_BHXH', label: 'Số sổ BHXH', icon: '', value: thongTinNhanSu.So_BHXH },
            { key: 'NoiDangKy_BHXH', label: 'Nơi đăng ký BHXH', icon: '', value: thongTinNhanSu.NoiDangKy_BHXH },
            { key: 'MaSoThue', label: 'Mã số thuế', icon: '', value: thongTinNhanSu.MaSoThue },
            { key: 'Is_GiamTruThue', label: 'Giảm trừ thuế thu nhập cá nhân', icon: '', value: thongTinNhanSu.Is_GiamTruThue ? 'Có' : 'Không' },
        ]

        //Thông tin cá nhân - Thông tin cá nhân bổ sung
        this.items[0].Title[2].DuLieu = [
            { key: 'DiaChi_TamTru', label: 'Địa chỉ hiện tại', icon: '', value: thongTinNhanSu.DiaChi_TamTru },
            { key: 'DiaChi_ThuongTru', label: 'Hộ khẩu thường trú', icon: '', value: thongTinNhanSu.DiaChi_ThuongTru },
            { key: 'NoiSinh', label: 'Nơi sinh', icon: '', value: thongTinNhanSu.NoiSinh },
            { key: 'QuocTich', label: 'Quốc tịch', icon: '', value: thongTinNhanSu.QuocTich },
            { key: 'BietDanh', label: 'Biệt danh', icon: '', value: thongTinNhanSu.BietDanh },
            { key: 'So_CCCD', label: 'CMT/Căn cước', icon: '', value: thongTinNhanSu.So_CCCD },
            { key: 'NgayCap_CCCD', label: 'Ngày cấp', icon: '', value: dayjs(thongTinNhanSu.NgayCap_CCCD).format('DD/MM/YYYY') },
            { key: 'NoiCap_CCCD', label: 'Ngày cấp', icon: '', value: thongTinNhanSu.NoiCap_CCCD },
            { key: 'Email_Khac', label: 'Email khác', icon: '', value: thongTinNhanSu.Email_Khac },
            { key: 'DienThoai_Khac', label: 'Điện thoại khác', icon: '', value: thongTinNhanSu.DienThoai_Khac },
            { key: 'LinkedIn', label: 'LinkedIn', icon: '', value: thongTinNhanSu.LinkedIn },
            { key: 'Facebook', label: 'Facebook', icon: '', value: thongTinNhanSu.Facebook },
            { key: 'Website', label: 'Website', icon: '', value: thongTinNhanSu.Website },
        ]
        //Thông tin cá nhân - Tài khoản ngân hàng
        this.items[0].Title[3].DuLieu = [
            { key: 'SoTaiKhoan_NganHang', label: 'Số tài khoản Ngân hàng', icon: '', value: thongTinNhanSu.SoTaiKhoan_NganHang },
            { key: 'TenTaiKhoan_NganHang', label: 'Tên chủ tài khoản', icon: '', value: thongTinNhanSu.TenTaiKhoan_NganHang },
            { key: 'Ten_NganHang', label: 'Tên Ngân hàng', icon: '', value: thongTinNhanSu.Ten_NganHang },
            { key: 'ChiNhanh_NganHang', label: 'Chi nhánh Ngân hàng', icon: '', value: thongTinNhanSu.ChiNhanh_NganHang },
        ]

        this.items[0].Title[4].DuLieu = this.user.ThongTinHocVan
        this.items[0].Title[5].DuLieu = this.user.ThongTinLichSuLamViec
        this.items[0].Title[6].DuLieu = this.user.ThongTinGiaDinhNguoiPhuThuoc
        this.items[0].Title[7].DuLieu = this.user.ThongTinHoSo


        this.items[1].Title[0].DuLieu = [
            { key: 'TenViTri', label: 'Vị trí', icon: '', value: thongTinNhanSu.TenViTri },
            { key: 'BacLuong', label: 'Bậc lương', icon: '', value: `${thongTinNhanSu.TenBacLuong} - ${thongTinNhanSu.GiaTri_BacLuong.toLocaleString('en-US')}` },
            { key: 'BacThuong', label: 'Bậc thưởng', icon: '', value: `${thongTinNhanSu.TenBacThuong} - ${thongTinNhanSu.GiaTri_BacThuong.toLocaleString('en-US')}` },
            { key: 'LuongCoBan', label: 'Lương cơ bản', icon: '', value: thongTinNhanSu.LuongCoBan.toLocaleString('en-US') },
            { key: 'TenVanPhong', label: 'Văn phòng', icon: '', value: thongTinNhanSu.TenVanPhong },
            { key: 'TenMauBangCong', label: 'Lịch làm việc', icon: '', value: thongTinNhanSu.TenMauBangCong },
            { key: 'NgayBatDau', label: 'Ngày bắt đầu', icon: '', value: thongTinNhanSu.NgayBatDau },
            { key: 'NgayChinhThuc', label: 'Ngày chính thức', icon: '', value: thongTinNhanSu.NgayChinhThuc },
            { key: 'TenMauBangLuong', label: 'Mẫu bảng lương', icon: '', value: thongTinNhanSu.TenMauBangLuong },
            { key: 'TenHinhThuc', label: 'Phân loại nhân sự', icon: '', value: thongTinNhanSu.TenHinhThuc },
        ]

    },
    computed: {},
    watch: {},
    methods: {
        selectItem(item) {
            this.itemTab = Object.assign({}, item)
        },
    },
}
</script>
