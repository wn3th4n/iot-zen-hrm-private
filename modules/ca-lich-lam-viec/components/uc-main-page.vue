<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <div class="d-flex flex-row">
                    <b class="me-3">Lịch làm việc</b>
                    <a-select v-model:value="LichLamViec_Id" placeholder="Chọn chu kỳ" @change="onChangeChuKy()" class="me-2 min-w-200px" :loading="isLoadingSelect">
                        <a-select-option v-for="item in DSChuKy" :value="item.LichLamViec_Id" :key="item.LichLamViec_Id">Tháng {{ item.Thang }}/{{ item.Nam }}</a-select-option>
                    </a-select>
                    <a-select v-model:value="MauBangCong_Id" placeholder="Chọn lịch làm việc" @change="onChangeLichLamViec()" :disabled="!LichLamViec_Id" class="min-w-300px">
                        <a-select-option v-for="item in DSMauBangCong.filter((item) => item.LichLamViec_Id === LichLamViec_Id && item.Is_CoDinh === false)" :value="item.MauBangCong_Id" :key="item.MauBangCong_Id">{{ item.TenMauBangCong }}</a-select-option>
                    </a-select>
                    <div class="w-100 ps-5 d-flex align-items-center">
                        <a-steps style="width: 300px" :current="current" :items="steps" @change="onChangeStep(current)" />
                    </div>
                </div>
            </template>
            <template #extra>
                <div>
                    <a-space size="small" v-if="LichLamViec_Id > 0 && MauBangCong_Id > 0" class="d-flex justify-content-end">
                        <a-dropdown :trigger="['click']" v-if="current === 1">
                            <a-button type="primary"><uc-icon name="apps" />Thao tác<uc-icon name="chevron-down" /></a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onOpenModalTinhToan()"><uc-icon name="calculator-variant-outline" />Tính toán</a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="onKhoaCong()"> <uc-icon name="lock-outline" /> Khóa công </a-menu-item>
                                    <a-menu-item @click="onHuyKhoaCong()"> <uc-icon name="lock-open-outline" />Hủy khóa công </a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="isShowModalDongBoDuLieu = true"> <uc-icon name="sync" />Đồng bộ dữ liệu </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <a-dropdown :trigger="['click']" v-if="current === 0">
                            <a-button type="primary"><uc-icon name="apps" />Tùy chỉnh<uc-icon name="chevron-down" /></a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="RedirectPhanCa()"><uc-icon name="calendar-plus-outline" />Phân ca</a-menu-item>
                                    <a-menu-item @click="RedirectCheckInOut()"><uc-icon name="calendar-account-outline" />Chấm công</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </a-space>
                </div>
            </template>
        </a-card>
        <a-card size="small" class="text-center card-title-page border-top-0 border-bottom-0">
            <a-space size="middle">
                <div v-for="(item, index) in current === 0 ? DSTrangThaiChamCong.filter((item) => item.ShowAtStep !== 1) : DSTrangThaiChamCong" :key="item.id">
                    <div>
                        <uc-icon :name="item.Icon" :color="item.Color" />
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
            @change="handleTableChange"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'NhanVien'">
                    <a-flex gap="small">
                        <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien" />
                        <div>
                            <b>{{ record.HoVaTenNhanVien }} </b> <br />
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
                                <a-tag class="mt-1 w-100" :color="ca?.TrangThai_Mau" :style="{ ...(ca?.GioCheckIn ? { borderLeft: '5px solid' } : {}), ...(ca?.GioCheckOut ? { borderRight: '5px solid' } : {}), ...(ca?.VanPhong_Id !== CTBangCong.VanPhong_Id ? { opacity: 0.4 } : { opacity: 1 }) }" @click="onOpenModalThongTinCa(ca, record)">
                                    <template #icon><uc-icon :name="ca?.TrangThai_Icon" /></template>
                                    <span>{{ ca?.GioBatDau }} - {{ ca?.GioKetThuc }} </span>
                                    <span class="float-end shift-number" :class="ca?.TrangThai_Cong_Mau" v-if="current === 1">{{ ca.SoCongChuan }}</span>
                                </a-tag>
                            </div>
                        </div>
                    </template>
                </template>
                <!-- <template v-for="item in record">
                    <template v-if="column.key === record[item]">
                        <div v-for="ca in record[item]" class="cursor-pointer">
                            <a-tag class="mt-1 w-100" :color="ca?.TrangThai_Mau" :style="{ ...(ca?.GioCheckIn ? { borderLeft: '5px solid' } : {}), ...(ca?.GioCheckOut ? { borderRight: '5px solid' } : {}) }" @click="onOpenModalThongTinCa(ca)">
                                <template #icon><uc-icon :name="ca?.TrangThai_Icon" /></template>
                                <span>{{ ca?.GioBatDau }} - {{ ca?.GioKetThuc }} </span>
                                <span class="float-end shift-number" :class="ca?.TrangThai_Cong_Mau" v-if="current === 1">{{ ca.SoCongChuan }}</span>
                            </a-tag>
                        </div>
                    </template>
                </template> -->
            </template>
        </a-table>
        <uc-modal-thuoc-tinh v-model:isOpen="isShowModalThuocTinh" :dsthuoctinh="DSThuocThuocTinh" />
        <uc-modal-thong-tin-ca v-model:isOpen="isShowModalThongTinCa" :record="recordThongTinCa" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" />
        <uc-modal-thong-tin-ca-step-2 v-model:isOpen="isShowModalThongTinCaStep2" :record="recordThongTinCa" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" />
        <uc-modal-tinh-toan v-model:isOpen="isShowModalTinhToan" :thangchuky="thangChuKy" :namchuky="namChuKy" :ctbangcong="CTBangCong" :lichlamviecid="LichLamViec_Id" :maubangcongid="MauBangCong_Id" :dsnhanvien="DS_NhanVien" @onFinish="renderLichPhanCa()" />
        <uc-modal-khoa-cong v-model:isOpen="isShowModalKhoaCong" :thangchuky="thangChuKy" :namchuky="namChuKy" :lichlamviecid="LichLamViec_Id" :maubangcongid="MauBangCong_Id" @onFinish="renderLichPhanCa()" />
        <uc-modal-huy-khoa-cong v-model:isOpen="isShowModalHuyKhoaCong" :thangchuky="thangChuKy" :namchuky="namChuKy" :lichlamviecid="LichLamViec_Id" :maubangcongid="MauBangCong_Id" @onFinish="renderLichPhanCa()" />
        <uc-modal-dong-bo-du-lieu v-model:isOpen="isShowModalDongBoDuLieu" :lichlamviecid="LichLamViec_Id" :maubangcongid="MauBangCong_Id" />
    </uc-layout>
</template>
<script>
export default {
    props: [],
    data() {
        return {
            isLoadingSelect: false,
            currentPage: 1,
            current: null,
            steps: [
                {
                    title: 'Xem công',
                },
                {
                    title: 'Chỉnh sửa công',
                },
            ],
            LichLamViec_Id: null,
            MauBangCong_Id: null,
            DSChuKy: [],
            DSMauBangCong: [],
            isShowModalThongTinCa: false,
            isShowModalThongTinCaStep2: false,
            isShowModalTinhToan: false,
            isShowModalKhoaCong: false,
            isShowModalHuyKhoaCong: false,
            isShowModalDongBoDuLieu: false,
            isShowModalThuocTinh: false,
            columns: [],
            DSNgay: [],
            DSPhanCa: [],
            CTLichLamViec: null,
            CTBangCong: null,
            recordThongTinCa: null,
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
            DSThuocThuocTinh: [],
            DS_NhanVien: [],
            isDisabled: false,
            thangChuKy: '',
            namChuKy: '',
            isLoading: false,
        }
    },
    created() {
        this.getDSChuKy()
    },
    async mounted() {
        await this.getParamURL()
        await this.renderLichPhanCa()
    },
    computed() {},
    methods: {
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
                        console.log('DSFilterNhanVienPhanCa', DSFilterNhanVienPhanCa)
                        for (var phanCa of DSFilterNhanVienPhanCa) {
                            //Xử lý dữ liệu ca của nhân viên
                            console.log('PhanCa', phanCa)
                            const CaCuaNhanVienID = DSFilterNhanVienPhanCa.filter((x) => x.Ngay === phanCa.Ngay)
                            if (CaCuaNhanVienID.length > 0) {
                                //Tính tổng số công, giờ công
                                tongCongChuan += phanCa.SoCongChuan
                                tongGioCong += phanCa.SoGioCong
                                //console.log('CaCuaNhanVienID', CaCuaNhanVienID)
                                cloneNhanVien['Ngay_' + phanCa.Ngay.toString().padStart('2', 0)] = CaCuaNhanVienID

                                console.log('cloneNhanVien', cloneNhanVien)
                            }
                        }
                        cloneNhanVien.TenMauBangCong = CTBangCong.TenMauBangCong
                        cloneNhanVien.Thang = CTLichLamViec.Thang
                        cloneNhanVien.Nam = CTLichLamViec.Nam
                        cloneNhanVien.TongCongChuan = tongCongChuan
                        cloneNhanVien.TongGioCong = tongGioCong
                        // console.log('cloneNhanVien', cloneNhanVien)
                        newDSPhanCa.push(cloneNhanVien)
                    }
                    console.log('newDSPhanCa', newDSPhanCa)
                    $this.DSPhanCa = newDSPhanCa
                    $this.current = $this.CTBangCong.TrangThai_Buoc
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
        onOpenModalThongTinCa(ca, record) {
            console.log('ca', ca)
            this.recordThongTinCa = Object.assign({}, ca)
            if (this.current === 1) {
                this.isShowModalThongTinCaStep2 = true
            } else {
                this.isShowModalThongTinCa = true
            }
        },
        async getDSChuKy() {
            const $this = this
            $this.isLoadingSelect = true
            return lichLamViecService.LichLamViec_Select().then(({ DSChuKy, DSMauBangCong }) => {
                $this.DSChuKy = DSChuKy
                $this.DSMauBangCong = DSMauBangCong
                $this.isLoadingSelect = false
            })
        },
        RedirectPhanCa() {
            redirect(`/ca-phan-ca?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
        },
        RedirectCheckInOut() {
            redirect(`/pa-check-in-out?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
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
        onChangeStep(current) {
            if (this.LichLamViec_Id && this.MauBangCong_Id) {
                let content = current === 0 ? 'chỉnh sửa công' : 'xem công'
                Confirm.confirm({
                    content: `Bạn có chắc muốn chuyển sang bước ${content}?`,
                    onOk: () => {
                        if (content === 'xem công') {
                            this.current--
                            const res = lichLamViecService.LichLamViec_MauBangCong_Update_Status({
                                LichLamViec_Id: this.LichLamViec_Id,
                                MauBangCong_Id: this.MauBangCong_Id,
                                TrangThai: this.current + 1,
                            })
                        } else {
                            this.current++
                            const res = lichLamViecService.LichLamViec_MauBangCong_Update_Status({
                                LichLamViec_Id: this.LichLamViec_Id,
                                MauBangCong_Id: this.MauBangCong_Id,
                                TrangThai: this.current + 1,
                            })
                        }
                    },
                    onCancel: () => {
                        this.current = current
                    },
                })
            }
        },
        onOpenModalTinhToan() {
            this.isShowModalTinhToan = true
        },
        onChangeChuKy() {
            const $this = this
            $this.isDisabled = false
            $this.MauBangCong_Id = null
        },
        onChangeLichLamViec() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                redirect(`/ca-lich-lam-viec?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
            }
        },
        onKhoaCong() {
            Confirm.confirm({
                content: 'Xác nhận khóa công?',
                onOk: async () => {
                    const $this = this
                    const res = await lichLamViecService.LichLamViec_TinhCong_ChotCong({
                        MauBangCong_Id: $this.MauBangCong_Id,
                        LichLamViec_Id: $this.LichLamViec_Id,
                    })
                    if (res) {
                        $this.$message.success('Khóa công thành công!')
                        $this.renderLichPhanCa()
                    }
                },
            })
        },
        onHuyKhoaCong() {
            Confirm.confirm({
                content: 'Xác nhận hủy khóa công?',
                onOk: async () => {
                    const $this = this
                    const res = await lichLamViecService.LichLamViec_TinhCong_HuyChotCong({
                        MauBangCong_Id: $this.MauBangCong_Id,
                        LichLamViec_Id: $this.LichLamViec_Id,
                    })
                    if (res) {
                        $this.$message.success('Hủy khóa công thành công!')
                        $this.renderLichPhanCa()
                    }
                },
            })
        },

        showTotal(total, range) {
            return `${range[0]} - ${range[1]} / ${total} mục`
        },
        handleTableChange(pagination) {
            this.currentPage = pagination.current
        },

        getParamURL() {
            const urlParam = new URL(window.location.href).searchParams
            const LichLamViec_Id = parseInt(urlParam.get('llvid'))
            const MauBangCong_Id = parseInt(urlParam.get('mbcid'))
            this.LichLamViec_Id = isNaN(LichLamViec_Id) ? null : LichLamViec_Id
            this.MauBangCong_Id = isNaN(MauBangCong_Id) ? null : MauBangCong_Id
        },
    },
}
</script>
