<template>
    <div>
        <a-card size="small" class="text-center card-title-page border-top-0 border-bottom-0">
            <a-space size="middle">
                <div v-for="(item, index) in DSTrangThaiChamCong" :key="item.id">
                    <div>
                        <uc-icon :name="item.Icon" :color="item.Color" />
                        {{ item.TenTrangThai }}
                    </div>
                </div>
            </a-space>
        </a-card>
        <a-table :columns="columns" :data-source="DSPhanCa" bordered :pagination="false" :scroll="{ x: 'max-content', y: 'calc(100vh - 185px)' }" :loading="isLoading">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'NhanVien'">
                    <a-flex gap="small">
                        <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien" />
                        <div>
                            <b>{{ record.HoVaTenNhanVien }}</b> <br />
                            <small>
                                <b>[{{ record.MaNhanVien }}]</b>
                                <a @click="onModalThuocTinh(record)">
                                    Công: <b>{{ record.TongCongChuan }} •</b> Giờ: <b>{{ record.TongGioCong }}</b>
                                </a>
                                <!-- <a @click="onModalThuocTinh(record)">Xem thêm</a> -->
                            </small>
                        </div>
                    </a-flex>
                </template>
                <template
                    v-for="day in DSNgay.filter((x) => {
                        return Object.keys(record).some((key) => key in x)
                    })"
                >
                    <template v-if="column?.key === day?.Cot_Ngay">
                        <div :id="day?.Thu_So + '_' + day?.Ngay">
                            <div v-for="ca in record[day.Cot_Ngay]" class="cursor-pointer">
                                <a-tag class="mt-1 w-100" :color="ca?.TrangThai_Mau" :style="{ ...(ca?.GioCheckIn ? { borderLeft: '5px solid' } : {}), ...(ca?.GioCheckOut ? { borderRight: '5px solid' } : {}) }" @click="onOpenModalThongTinCa(ca)">
                                    <template #icon><uc-icon :name="ca?.TrangThai_Icon" /></template>
                                    <span>{{ ca?.GioBatDau }} - {{ ca?.GioKetThuc }} </span>
                                    <span class="float-end shift-number" :class="ca?.TrangThai_Cong_Mau" v-if="current === 1">{{ ca.SoCongChuan }}</span>
                                </a-tag>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </a-table>
        <uc-modal-thuoc-tinh v-model:isOpen="isShowModalThuocTinh" :dsthuoctinh="DSThuocThuocTinh" />
        <uc-modal-thong-tin-ca v-model:isOpen="isShowModalThongTinCa" :record="recordThongTinCa" :dsloaica="DSLoaiCa" :dsvaitro="DSVaiTro" :dsvanphong="DSVanPhong" :dscamau="DSCaMau" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" />
        <uc-modal-thong-tin-ca-step-2 v-model:isOpen="isShowModalThongTinCaStep2" :record="recordThongTinCa" :dsloaica="DSLoaiCa" :dsvaitro="DSVaiTro" :dsvanphong="DSVanPhong" :dscamau="DSCaMau" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" />
    </div>
</template>
<script>
export default {
    props: ['llvid', 'mbcid', 'currentSteps'],
    data() {
        return {
            isDisabled: false,
            isShowModalThongTinCa: false,
            isShowModalThongTinCaStep2: false,
            recordThongTinCa: {},
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
            columns: [],
            DSNgay: [],
            DSPhanCa: [],
            listData: [],
            value: dayjs(),
            DSCheckInOut: [],
            DSCa: [],
            isLoading: false,
            isShowModalThuocTinh: false,
            DSThuocThuocTinh: [],
        }
    },
    mounted() {
        this.renderLichPhanCa()
    },
    computed: {
        LichLamViec_Id: function () {
            return this.llvid
        },
        MauBangCong_Id: function () {
            return this.mbcid
        },
    },
    watch: {},
    methods: {
        // async onLoadTable() {
        //     const $this = this
        //     if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
        //         const { DSNgay, DSPhanCa, TTMauBangCong, TTChuKy } = await lichLamViecService.LichLamViec_CoDinh_Select_Lich({
        //             LichLamViec_Id: $this.LichLamViec_Id,
        //             MauBangCong_Id: $this.MauBangCong_Id,
        //         })
        //         this.DSNgay = DSNgay
        //         const columnDate = DSNgay.map((item) => {
        //             const day = item.Ngay.toString().padStart('2', 0)
        //             const month = item.Thang.toString().padStart('2', 0)
        //             return {
        //                 title: `${item.Thu} - ${day}/${month}`,
        //                 key: item.Cot_Ngay,
        //                 dataIndex: item.Cot_Ngay,
        //                 width: 200,
        //                 align: 'center',
        //                 class: item.Thu === 'T7' || item.Thu === 'CN' ? `text-red ${item.Cot_Ngay}` : `${item.Cot_Ngay}`,
        //             }
        //         })
        //         let DSPhanCaNew = []
        //         for (let day of DSNgay) {
        //             let cloneDay = { ...day }
        //             let DSPhanCaFilter = DSPhanCa.filter((x) => x.Ngay === day.Ngay)
        //             cloneDay['Ngay_' + day.Ngay.toString().padStart('2', 0)] = DSPhanCaFilter
        //             // for (let ca of DSPhanCaFilter) {
        //             // }
        //             DSPhanCaNew.push(cloneDay)
        //         }
        //         this.DSPhanCa = Object.assign([], DSPhanCaNew)
        //         console.log('DSPhanCaNew', DSPhanCaNew)
        //         this.columns = [...columnDate]
        //     }
        // },

        async renderLichPhanCa() {
            const $this = this
            try {
                if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                    this.isLoading = true
                    const params = { LichLamViec_Id: $this.LichLamViec_Id, MauBangCong_Id: $this.MauBangCong_Id }
                    const { DSNgay, DSPhanCa, DSNhanVien, CTBangCong, CTLichLamViec } = await lichLamViecService.LichLamViec_PhanCa_Select_Lich(params)
                    $this.DSNgay = DSNgay
                    $this.CTLichLamViec = CTLichLamViec
                    $this.CTBangCong = CTBangCong
                    $this.DS_NhanVien = DSNhanVien.map((x) => {
                        return { ...x, TrangThaiTinh: null, IsTinhCong: false }
                    })
                    $this.thangChuKy = CTLichLamViec?.Thang.toString()
                    $this.namChuKy = CTLichLamViec?.Nam.toString()
                    const columnDate = DSNgay.map((item) => {
                        const day = item.Ngay.toString().padStart('2', 0)
                        const month = item.Thang.toString().padStart('2', 0)
                        return {
                            title: `${item.Thu} - ${day}/${month}`,
                            key: item.Cot_Ngay,
                            dataIndex: item.Cot_Ngay,
                            width: 160,
                            align: 'center',
                            class: item.Thu === 'T7' || item.Thu === 'CN' ? `text-red ${item.Cot_Ngay}` : `${item.Cot_Ngay}`,
                        }
                    })
                    const newDSPhanCa = []
                    for (var nv of DSNhanVien) {
                        const cloneNhanVien = { ...nv }
                        const DSFilterNhanVienPhanCa = DSPhanCa.filter((x) => x.NhanVien_Id === nv.NhanVien_Id)
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
                    const columnNhanVien = {
                        title: 'Nhân sự',
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

        onOpenModalThongTinCa(record) {
            this.recordThongTinCa = record
            if (this.currentSteps === 1) {
                this.isShowModalThongTinCaStep2 = true
            } else {
                this.isShowModalThongTinCa = true
            }
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
    },
}
</script>
