<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <b>Báo cáo nhân sự theo khu vực (Table đang truyền param tĩnh LichLamViec_Id: 70, MauBangCong_Id: 32 )</b>
            </template>
        </a-card>
        <a-card size="small" class="text-center card-title-page border-top-0 border-bottom-0">
            <a-space size="middle">
                <div v-for="(item, index) in TrangThaiMauThongTin" :key="item.id" class="d-flex align-items-center justify-content-center gap-5">
                    <div class="d-flex align-items-center justify-content-center">
                        <a-avatar :style="{ backgroundColor: item.color }" style="width: 16px; height: 16px" class="me-1"> </a-avatar>
                        {{ item.TenTrangThai }}
                    </div>
                </div>
            </a-space>
        </a-card>
        <a-table
            :scroll="{ x: 'max-content', y: 'calc(100vh - 185px)' }"
            :columns="columns"
            :data-source="DSPhanCa"
            size="small"
            bordered
            class="table-vertical-top"
            :loading="isLoading"
            :pagination="{
                current: currentPage,
                total: DSPhanCa.length,
                pageSize: 30,
                size: 'small',
                showTotal: (total, range) => showTotal(total, range),
                showSizeChanger: false,
            }"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'NhanVien'">
                    <a-flex gap="small">
                        <div>
                            <b>{{ record.HoVaTenNhanVien }}</b>
                        </div>
                    </a-flex>
                </template>
                <template
                    v-for="day in DSNgay.filter((x) => {
                        return Object.keys(record).some((key) => key in x)
                    })"
                >
                    <template v-if="column?.key === day?.Cot_Ngay">
                        <div :id="day?.Thu_So + '_' + day?.Ngay" style="background-color: red">
                            <div v-for="ca in record[day.Cot_Ngay]" class="cursor-pointer" @click="onOpenModalThongTin(ca, record)">
                                <span>{{ ca.XData }}</span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </a-table>
        <uc-modal :isOpen="isShowModalThongTin" title="Thông tin" :width="500" @onClose="onCloseModalThongTin()">
            <a-table :columns="columnsModalThongTin" :data-source="DataModalThongTin" size="small" :pagination="false"> </a-table>
        </uc-modal>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            columnsModalThongTin: [
                {
                    title: 'Cửa hàng',
                    dataIndex: 'TenCuaHang',
                },
                {
                    title: 'Ca làm việc',
                    dataIndex: 'CaLamViec',
                },
                {
                    title: 'Vị trí',
                    dataIndex: 'ViTri',
                },
            ],
            TrangThaiMauThongTin: [
                {
                    TenTrangThai: 'Thiếu nhân sự / vị trí',
                    color: 'red',
                },
                {
                    TenTrangThai: 'Dư nhân sự',
                    color: 'green',
                },
                {
                    TenTrangThai: 'Thiếu vị trí',
                    color: 'grey',
                },
            ],
            DataModalThongTin: [
                {
                    TenCuaHang: 'Trảng Bom',
                    CaLamViec: '07:00 - 18:00',
                    ViTri: 'Kiểm Kho',
                },
                {
                    TenCuaHang: 'Tea foodcourt',
                    CaLamViec: '07:00 - 18:00',
                    ViTri: '',
                },
                {
                    TenCuaHang: 'Hố Nai',
                    CaLamViec: '09:00 - 15:00',
                    ViTri: '',
                },
            ],
            currentPage: 1,
            current: null,
            isShowModalThongTin: false,
            steps: [
                {
                    title: 'Xem công',
                },
                {
                    title: 'Chỉnh sửa công',
                },
            ],
            pageTitle: 'Lịch làm việc',
            LichLamViec_Id: 70,
            MauBangCong_Id: 32,
            DSChuKy: [],
            DSMauBangCong: [],
            columns: [],
            DSNgay: [],
            DSPhanCa: [],
            CTLichLamViec: null,
            CTBangCong: null,
            recordThongTinCa: null,
            ChuKy: null,
            statusStep: '1',
            DSLoaiCa: [],
            DSVanPhong: [],
            DSVaiTro: [],
            DSCaMau: [],
            DSTrangThaiChamCong: [
                {
                    id: 1,
                    TenTrangThai: 'Chưa xuất bản',
                    Color: 'muted',
                    Icon: 'progress-pencil',
                },
                {
                    id: 2,
                    TenTrangThai: 'Đã xuất bản',
                    Color: 'primary',
                    Icon: 'account-check',
                },
                {
                    id: 3,
                    TenTrangThai: 'Đủ vào, ra',
                    Color: 'success',
                    Icon: 'check-circle-outline',
                },
                {
                    id: 4,
                    TenTrangThai: 'Vắng mặt',
                    Color: 'red',
                    Icon: 'close-circle-outline',
                },
                {
                    id: 5,
                    TenTrangThai: 'Đi muộn',
                    Color: 'warning',
                    Icon: 'clock-minus-outline',
                },
                {
                    id: 6,
                    TenTrangThai: 'Nghỉ tính công',
                    Color: 'success',
                    Icon: 'currency-usd',
                },
                {
                    id: 7,
                    TenTrangThai: 'Nghỉ lễ',
                    Color: 'success',
                    Icon: 'white-balance-sunny',
                },
                {
                    id: 8,
                    TenTrangThai: 'Không tính công',
                    Color: 'red',
                    Icon: 'currency-usd-off',
                },
                {
                    id: 9,
                    TenTrangThai: 'Chưa tính công',
                    Color: 'primary',
                    Icon: 'square-rounded',
                    ShowAtStep: 1,
                },
                {
                    id: 10,
                    TenTrangThai: 'Đã tính công',
                    Color: 'success',
                    Icon: 'square-rounded',
                    ShowAtStep: 1,
                },
                {
                    id: 11,
                    TenTrangThai: 'Đã chốt công',
                    Color: 'warning',
                    Icon: 'square-rounded',
                    ShowAtStep: 1,
                },
            ],
            NhanVien_Id: null,
            Ngay: null,
            isShowModalThuocTinh: false,
            DSThuocThuocTinh: [],
            DS_PhanCa_Origin: [],
            DS_NhanVien: [],
            thangChuKy: '',
            namChuKy: '',
            isLoading: false,
        }
    },
    mounted() {
        this.renderLichPhanCa()
        this.getDSChuKy()
    },
    computed: {},
    watch: {},
    methods: {
        async renderLichPhanCa() {
            const $this = this
            try {
                if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                    this.isLoading = true
                    const params = { LichLamViec_Id: 70, MauBangCong_Id: 32 }
                    const { DSNgay, DSPhanCa, DSNhanVien, CTBangCong, CTLichLamViec } = await lichLamViecService.LichLamViec_PhanCa_Select_Lich(params)
                    $this.DSNgay = DSNgay
                    $this.CTLichLamViec = CTLichLamViec
                    $this.CTBangCong = CTBangCong
                    // $this.DS_NhanVien = DSNhanVien.map((x) => {
                    //     return { ...x, TrangThaiTinh: null, IsTinhCong: false }
                    // })
                    $this.DS_NhanVien = [
                        {
                            NhanVien_Id: 180,
                            AnhDaiDien_Url: '83FC7D76CD31427FA821F459AE658B05',
                            MaNhanVien: 'NV0000008',
                            TenNhanVien: 'Yến',
                            HoVaTenNhanVien: 'TEA',
                        },
                        {
                            NhanVien_Id: 181,
                            AnhDaiDien_Url: '',
                            MaNhanVien: 'FC039',
                            TenNhanVien: 'Dương',
                            HoVaTenNhanVien: 'Khu vực Biên Hoà',
                        },
                        {
                            NhanVien_Id: 188,
                            AnhDaiDien_Url: null,
                            MaNhanVien: 'QT021',
                            TenNhanVien: 'Thành',
                            HoVaTenNhanVien: 'Khu vực Hố Nai',
                        },
                        {
                            NhanVien_Id: 260,
                            AnhDaiDien_Url: null,
                            MaNhanVien: 'QT043',
                            TenNhanVien: 'Quân',
                            HoVaTenNhanVien: 'Khu vực Bình Dương',
                        },
                        {
                            NhanVien_Id: 283,
                            AnhDaiDien_Url: null,
                            MaNhanVien: 'FC029',
                            TenNhanVien: 'Trang',
                            HoVaTenNhanVien: 'Khu vực Long Thành',
                        },
                        {
                            NhanVien_Id: 284,
                            AnhDaiDien_Url: null,
                            MaNhanVien: 'VTS090',
                            TenNhanVien: 'Tùng',
                            HoVaTenNhanVien: 'Khu vực Long Khánh',
                        },
                        {
                            NhanVien_Id: 285,
                            AnhDaiDien_Url: null,
                            MaNhanVien: 'VTS066',
                            TenNhanVien: 'Hiển',
                            HoVaTenNhanVien: 'RESTAUTANT',
                        },
                        {
                            NhanVien_Id: 286,
                            AnhDaiDien_Url: null,
                            MaNhanVien: 'VTS069',
                            TenNhanVien: 'Đài',
                            HoVaTenNhanVien: 'Khu vực Biên Hoà',
                        },
                    ]

                    $this.DSPhanCa = [
                        {
                            LichLamViec_PhanCa_Id: 56175,
                            LichLamViec_Id: 70,
                            MauBangCong_Id: 32,
                            NhomCaMau_Id: 2,
                            CaMau_Id: 31,
                            MaCaMau: '13-23',
                            LoaiCa_Id: 1,
                            TenLoaiCa: 'Chính Thức',
                            MaLoaiCa: 'lamchinhthuc',
                            ViTri_Id: 22,
                            MaViTri: 'TN',
                            TenViTri: 'Thu Ngân',
                            VanPhong_Id: 25,
                            MaVanPhong: 'ztea-41-vts',
                            TenVanPhong: 'ZEN Tea 41 Võ Thị Sáu',
                            TimeOff_Id: 0,
                            MaTimeOff: '',
                            NgayLe_Id: null,
                            MaNgayLe: null,
                            NhanVien_Id: 180,
                            MaNhanVien: 'NV0000008',
                            TenNhanVien: 'Yến',
                            HoVaTenNhanVien: 'Huỳnh Bảo Yến',
                            MaLoaiViTri_List: '2,3',
                            MaLoaiViTri_List_HienThi: 'kiemkho,kiemtbdc',
                            TenMaLoaiViTri_List_HienThi: ' [kiemkho] Kiểm kho, [kiemtbdc] Kiểm thiết bị dụng cụ',
                            ThuTuCa: 0,
                            TenCa: '13:00 - 23:00',
                            NgayBatDau: '02/10/2024',
                            GioBatDau: '13:00',
                            NgayKetThuc: '02/10/2024',
                            GioKetThuc: '23:00',
                            SoGioCong: 10,
                            SoPhutDiTre: 0,
                            SoPhutVeSom: 0,
                            SoPhutNghi: 0,
                            SoCongChuan: 10,
                            BatDauCa_Som_Phut: 30,
                            BatDauCa_Tre_Phut: 30,
                            KetThucCa_Som_Phut: 30,
                            KetThucCa_Tre_Phut: 30,
                            BatDauCa_Som: '12:30',
                            BatDauCa_Tre: '13:30',
                            KetThucCa_Som: '22:30',
                            KetThucCa_Tre: '23:30',
                            NgayCheckIn: '02/10/2024',
                            GioCheckIn: '13:00',
                            NgayCheckOut: '02/10/2024',
                            GioCheckOut: '23:00',
                            Thu: 4,
                            Ngay: 2,
                            Thang: 10,
                            Nam: 2024,
                            NgayThangNam: '02/10/2024',
                            GhiChu: '',
                            Is_CaQuaDem: false,
                            Is_DaoTao: false,
                            Is_LichOff: false,
                            Is_TimeOff: false,
                            Is_NgayLe: false,
                            NguoiTao: 'NV0000008',
                            GioTao: '17:08 25/09/2024',
                            TrangThai: 2,
                            TrangThai_Icon: 'account-check',
                            TrangThai_Ten: 'Đã xuất bản',
                            TrangThai_Mau: 'blue',
                            TrangThai_Cong: 2,
                            TrangThai_Cong_Icon: 'shield-check',
                            TrangThai_Cong_Ten: 'Đã tính công',
                            TrangThai_Cong_Mau: 'bg-success',
                            XData: '-1/3',
                        },
                        {
                            LichLamViec_PhanCa_Id: 56176,
                            LichLamViec_Id: 70,
                            MauBangCong_Id: 32,
                            NhomCaMau_Id: 2,
                            CaMau_Id: 31,
                            MaCaMau: '13-23',
                            LoaiCa_Id: 1,
                            TenLoaiCa: 'Chính Thức',
                            MaLoaiCa: 'lamchinhthuc',
                            ViTri_Id: 22,
                            MaViTri: 'TN',
                            TenViTri: 'Thu Ngân',
                            VanPhong_Id: 1,
                            MaVanPhong: 'bdh-bh',
                            TenVanPhong: 'Văn Phòng BĐH Biên Hòa',
                            TimeOff_Id: 0,
                            MaTimeOff: '',
                            NgayLe_Id: null,
                            MaNgayLe: null,
                            NhanVien_Id: 180,
                            MaNhanVien: 'NV0000008',
                            TenNhanVien: 'Yến',
                            HoVaTenNhanVien: 'Huỳnh Bảo Yến',
                            MaLoaiViTri_List: '1',
                            MaLoaiViTri_List_HienThi: 'docbill',
                            TenMaLoaiViTri_List_HienThi: ' [docbill] Đọc bill',
                            ThuTuCa: 0,
                            TenCa: '13:00 - 23:00',
                            NgayBatDau: '03/10/2024',
                            GioBatDau: '13:00',
                            NgayKetThuc: '03/10/2024',
                            GioKetThuc: '23:00',
                            SoGioCong: 10,
                            SoPhutDiTre: 0,
                            SoPhutVeSom: 0,
                            SoPhutNghi: 60,
                            SoCongChuan: 10,
                            BatDauCa_Som_Phut: 30,
                            BatDauCa_Tre_Phut: 30,
                            KetThucCa_Som_Phut: 30,
                            KetThucCa_Tre_Phut: 30,
                            BatDauCa_Som: '12:30',
                            BatDauCa_Tre: '13:30',
                            KetThucCa_Som: '22:30',
                            KetThucCa_Tre: '23:30',
                            NgayCheckIn: '',
                            GioCheckIn: '',
                            NgayCheckOut: '07/10/2024',
                            GioCheckOut: '23:00',
                            Thu: 5,
                            Ngay: 3,
                            Thang: 10,
                            Nam: 2024,
                            NgayThangNam: '03/10/2024',
                            GhiChu: '',
                            Is_CaQuaDem: false,
                            Is_DaoTao: false,
                            Is_LichOff: false,
                            Is_TimeOff: false,
                            Is_NgayLe: false,
                            NguoiTao: 'NV0000389',
                            GioTao: '15:06 26/09/2024',
                            TrangThai: 2,
                            TrangThai_Icon: 'account-check',
                            TrangThai_Ten: 'Đã xuất bản',
                            TrangThai_Mau: 'blue',
                            TrangThai_Cong: 2,
                            TrangThai_Cong_Icon: 'shield-check',
                            TrangThai_Cong_Ten: 'Đã tính công',
                            TrangThai_Cong_Mau: 'bg-success',
                            XData: '-2/3',
                        },
                        {
                            LichLamViec_PhanCa_Id: 56177,
                            LichLamViec_Id: 70,
                            MauBangCong_Id: 32,
                            NhomCaMau_Id: 2,
                            CaMau_Id: 31,
                            MaCaMau: '13-23',
                            LoaiCa_Id: 1,
                            TenLoaiCa: 'Chính Thức',
                            MaLoaiCa: 'lamchinhthuc',
                            ViTri_Id: 22,
                            MaViTri: 'TN',
                            TenViTri: 'Thu Ngân',
                            VanPhong_Id: 1,
                            MaVanPhong: 'bdh-bh',
                            TenVanPhong: 'Văn Phòng BĐH Biên Hòa',
                            TimeOff_Id: 0,
                            MaTimeOff: '',
                            NgayLe_Id: null,
                            MaNgayLe: null,
                            NhanVien_Id: 180,
                            MaNhanVien: 'NV0000008',
                            TenNhanVien: 'Yến',
                            HoVaTenNhanVien: 'Huỳnh Bảo Yến',
                            MaLoaiViTri_List: '1',
                            MaLoaiViTri_List_HienThi: 'docbill',
                            TenMaLoaiViTri_List_HienThi: ' [docbill] Đọc bill',
                            ThuTuCa: 0,
                            TenCa: '13:00 - 23:00',
                            NgayBatDau: '4/10/2024',
                            GioBatDau: '13:00',
                            NgayKetThuc: '4/10/2024',
                            GioKetThuc: '23:00',
                            SoGioCong: 10,
                            SoPhutDiTre: 0,
                            SoPhutVeSom: 0,
                            SoPhutNghi: 60,
                            SoCongChuan: 10,
                            BatDauCa_Som_Phut: 30,
                            BatDauCa_Tre_Phut: 30,
                            KetThucCa_Som_Phut: 30,
                            KetThucCa_Tre_Phut: 30,
                            BatDauCa_Som: '12:30',
                            BatDauCa_Tre: '13:30',
                            KetThucCa_Som: '22:30',
                            KetThucCa_Tre: '23:30',
                            NgayCheckIn: '',
                            GioCheckIn: '',
                            NgayCheckOut: '',
                            GioCheckOut: '',
                            Thu: 6,
                            Ngay: 4,
                            Thang: 10,
                            Nam: 2024,
                            NgayThangNam: '4/10/2024',
                            GhiChu: '',
                            Is_CaQuaDem: false,
                            Is_DaoTao: false,
                            Is_LichOff: false,
                            Is_TimeOff: false,
                            Is_NgayLe: false,
                            NguoiTao: 'NV0000389',
                            GioTao: '15:06 26/09/2024',
                            TrangThai: 2,
                            TrangThai_Icon: 'account-check',
                            TrangThai_Ten: 'Đã xuất bản',
                            TrangThai_Mau: 'blue',
                            TrangThai_Cong: 2,
                            TrangThai_Cong_Icon: 'shield-check',
                            TrangThai_Cong_Ten: 'Đã tính công',
                            TrangThai_Cong_Mau: 'bg-success',
                            XData: '3/3',
                        },
                    ]
                    $this.thangChuKy = CTLichLamViec?.Thang.toString()
                    $this.namChuKy = CTLichLamViec?.Nam.toString()
                    const columnDate = DSNgay.map((item) => {
                        const day = item.Ngay.toString().padStart('2', 0)
                        const month = item.Thang.toString().padStart('2', 0)
                        return {
                            title: `${day}/${month}`,
                            key: item.Cot_Ngay,
                            dataIndex: item.Cot_Ngay,
                            width: 70,
                            align: 'center',
                            class: item.Thu === 'T7' || item.Thu === 'CN' ? `text-red ${item.Cot_Ngay}` : `${item.Cot_Ngay}`,
                        }
                    })
                    const newDSPhanCa = []
                    for (var nv of $this.DS_NhanVien) {
                        const cloneNhanVien = { ...nv }
                        const DSFilterNhanVienPhanCa = $this.DSPhanCa.filter((x) => x.NhanVien_Id === nv.NhanVien_Id)
                        let tongCongChuan = 0
                        let tongGioCong = 0
                        for (var phanCa of DSFilterNhanVienPhanCa) {
                            //Xử lý dữ liệu ca của nhân viên
                            const CaCuaNhanVienID = DSFilterNhanVienPhanCa.filter((x) => x.Ngay === phanCa.Ngay).map((ca) => {
                                return { ...ca, ...CTBangCong }
                            })
                            //Tính tổng số công, giờ công
                            tongCongChuan += phanCa.SoCongChuan
                            tongGioCong += phanCa.SoGioCong
                            cloneNhanVien['Ngay_' + phanCa.Ngay.toString().padStart('2', 0)] = CaCuaNhanVienID
                        }
                        cloneNhanVien.TenMauBangCong = CTBangCong.TenMauBangCong
                        cloneNhanVien.Thang = CTLichLamViec.Thang
                        cloneNhanVien.Nam = CTLichLamViec.Nam
                        cloneNhanVien.TongCongChuan = tongCongChuan
                        cloneNhanVien.TongGioCong = tongGioCong
                        newDSPhanCa.push(cloneNhanVien)
                    }
                    $this.DSPhanCa = newDSPhanCa
                    $this.current = $this.CTBangCong.TrangThai_Buoc
                    $this.DS_PhanCa_Origin = DSPhanCa
                    $this.DSPhanCa = $this.DSPhanCa.slice(0, 10)
                    const columnNhanVien = {
                        title: 'Khu vực',
                        key: 'NhanVien',
                        dataIndex: 'NhanVien',
                        width: 230,
                        fixed: 'left',
                    }
                    $this.columns = [columnNhanVien, ...columnDate]
                    this.isLoading = false
                    scrollToDate(DSNgay)
                }
            } catch (err) {}
        },
        async getDSChuKy() {
            const $this = this
            return lichLamViecService.LichLamViec_Select().then(({ DSChuKy, DSMauBangCong }) => {
                $this.DSChuKy = DSChuKy
                $this.DSMauBangCong = DSMauBangCong
            })
        },
        async onModalThuocTinh(record) {
            const res = await caService.LichLamViec_TinhCong_Select_Thang_By_NhanVien_Id({
                LichLamViec_Id: this.LichLamViec_Id,
                NhanVien_Id: record.NhanVien_Id,
                MauBangCong_Id: this.MauBangCong_Id,
            })
            if (res) {
                this.DSThuocThuocTinh = [
                    [...res],
                    [
                        {
                            MaNhanVien: record.MaNhanVien,
                            HoVaTenNhanVien: record.HoVaTenNhanVien,
                            TenMauBangCong: record.TenMauBangCong,
                            Thang: record.Thang,
                            Nam: record.Nam,
                        },
                    ],
                ]
            }
            this.isShowModalThuocTinh = true
        },
        showTotal(total, range) {
            return `${range[0]} - ${range[1]} / ${total} mục`
        },
        onOpenModalThongTin() {
            this.isShowModalThongTin = true
        },
        onCloseModalThongTin() {
            this.isShowModalThongTin = false
        },
    },
}
</script>
