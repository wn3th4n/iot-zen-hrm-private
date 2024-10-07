<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <a-form layout="vertical">
                    <a-row :gutter="[10]">
                        <a-col class="pt-1">
                            <b class="me-3">{{ pageTitle }}</b>
                        </a-col>
                        <a-col :span="4" class="min-w-200px">
                            <a-form-item>
                                <a-select v-model:value="LichLamViec_Id" placeholder="Chọn chu kỳ" @change="onChangeChuKy()">
                                    <a-select-option v-for="item in DSChuKy" :value="item.LichLamViec_Id" :key="item.LichLamViec_Id">Tháng {{ item.Thang }}/{{ item.Nam }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6" class="min-w-300px">
                            <a-form-item>
                                <a-select v-model:value="MauBangCong_Id" placeholder="Chọn lịch làm việc" @change="onChangeLichLamViec()" :disabled="isDisabled">
                                    <a-select-option v-for="item in DSMauBangCong.filter((item) => item.LichLamViec_Id === LichLamViec_Id)" :value="item.MauBangCong_Id" :key="item.MauBangCong_Id">{{ item.TenMauBangCong }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </template>
            <template #extra>
                <div class="min-w-400px">
                    <a-space size="small" class="float-end">
                        <a-dropdown :trigger="['click']" v-if="LichLamViec_Id > 0 && MauBangCong_Id > 0">
                            <a-button type="primary"><uc-icon name="apps" />Thao tác<uc-icon name="chevron-down" /></a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onOpenModalPhanCaHangLoat()"><uc-icon name="calendar-month-outline" />Phân ca hàng loạt</a-menu-item>
                                    <a-menu-item @click="onReleaseAll()"><uc-icon name="calendar-cursor-outline" />Xuất bản ca</a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="isShowModalSaoChepCa = true"><uc-icon name="content-copy" />Sao chép ca</a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="onDelete()"><uc-icon name="delete-outline" color="red" />Xóa lịch phân ca</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <a-dropdown :trigger="['click']" v-if="LichLamViec_Id > 0 && MauBangCong_Id > 0">
                            <a-button type="primary"><uc-icon name="calendar-import-outline" />Import lịch<uc-icon name="chevron-down" /></a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onClickImportLichPhanCa()"><uc-icon name="calendar-clock" />Lịch phân ca</a-menu-item>
                                    <a-menu-item @click="onClickImportLichOff()"><uc-icon name="calendar-remove" />Lịch nghỉ</a-menu-item>
                                    <a-menu-item @click="onClickImportLichDuBao()"><uc-icon name="calendar-month" />Lịch dự trù</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </a-space>
                </div>
            </template>
        </a-card>
        <a-card size="small" class="text-center card-title-page border-top-0 border-bottom-0">
            <a-space size="middle">
                <div v-for="(item, index) in DSTrangThaiChamCong" :key="item.id">
                    <uc-icon :name="item.Icon" :color="item.Color" />
                    {{ item.TenTrangThai }}
                </div>
            </a-space>
        </a-card>
        <a-table
            :scroll="{ x: '1200px', y: 'calc(100vh - 197px)' }"
            :columns="columns"
            :data-source="DSPhanCa"
            size="small"
            bordered
            :pagination="{
                current: currentPage,
                total: DSPhanCa.length,
                pageSize: 15,
                size: 'small',
                showTotal: (total, range) => showTotal(total, range),
                showSizeChanger: false,
            }"
            @change="handleTableChange"
            :loading="isLoading"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'NhanVien'">
                    <a-flex gap="small">
                        <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien"></uc-avatar>
                        <div>
                            <b> {{ record.HoVaTenNhanVien }}</b> <br />
                            <small>
                                <b>[{{ record.MaNhanVien }}]</b> Công: <b>{{ record.TongCongChuan }} •</b> Giờ: <b>{{ record.TongGioCong }}</b>
                            </small>
                        </div>
                    </a-flex>
                </template>
                <template v-for="day in DSNgay">
                    <template v-if="column.key === day.Cot_Ngay">
                        <div :id="day.Thu_So + '_' + day.Ngay">
                            <div v-if="record[day.Cot_Ngay] && record[day.Cot_Ngay].length > 0" class="border-bottom text-start">
                                <div>{{ record[day.Cot_Ngay] ? record[day.Cot_Ngay].length : 0 }} ca</div>
                            </div>
                            <div class="d-hover btn-add-calen">
                                <a-button @click="onOpenModalAddCa(record, day)" type="primary" size="small" block><uc-icon name="plus" class="cursor-pointer me-0" /></a-button>
                            </div>
                            <div v-for="ca in record[day.Cot_Ngay]" @click="onOpenModalThongTinCa(ca)" class="cursor-pointer">
                                <a-tag class="mt-1 w-100" :color="ca?.TrangThai_Mau" :style="{ ...(ca?.GioCheckIn ? { borderLeft: '5px solid' } : {}), ...(ca?.GioCheckOut ? { borderRight: '5px solid' } : {}) }">
                                    <template #icon><uc-icon :name="ca?.TrangThai_Icon" /></template>
                                    {{ ca?.GioBatDau }} - {{ ca?.GioKetThuc }}
                                </a-tag>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </a-table>

        <uc-modal-thong-tin-ca v-model:isOpen="isShowModalThongTinCa" :record="recordThongTinCa" :dsloaica="DSLoaiCa" :dsvaitro="DSVaiTro" :dsvanphong="DSVanPhong" :dscamau="DSCaMau" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" />
        <uc-modal-add-ca v-model:isOpen="isShowModalAddCa" :record="recordAddCa" :recordday="recordDay" :dsloaica="DSLoaiCa" :dsvaitro="DSVaiTro" :dsvanphong="DSVanPhong" :dscamau="DSCaMau" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" :maubangcongid="MauBangCong_Id" :nhanvienid="NhanVien_Id" :ngay="Ngay" />
        <uc-modal-sao-chep-ca v-model:isOpen="isShowModalSaoChepCa" :lichlamviecid="LichLamViec_Id" :dsChuKy="DSChuKy" :maubangcongid="MauBangCong_Id" :thangchuky="thangChuKy" :namchuky="namChuKy" />
        <uc-modal-phan-ca-hang-loat v-model:isOpen="isShowModalPhanCaHangLoat" :thangchuky="thangChuKy" :namchuky="namChuKy" :record="recordThongTinCa" :dsloaica="DSLoaiCa" :dsvaitro="DSVaiTro" :dsvanphong="DSVanPhong" :dscamau="DSCaMau" :dsNhanVien="DSNhanVien" @onFinish="renderLichPhanCa()" :lichlamviecid="LichLamViec_Id" :maubangcongid="MauBangCong_Id"> </uc-modal-phan-ca-hang-loat>
    </uc-layout>
</template>
<script>
export default {
    props: [],
    data() {
        const urlParam = new URL(window.location.href).searchParams
        const LichLamViec_Id = parseInt(urlParam.get('llvid'))
        const MauBangCong_Id = parseInt(urlParam.get('mbcid'))
        return {
            currentPage: 1,
            pageTitle: 'Phân ca',
            isDisabled: LichLamViec_Id ? false : true,
            LichLamViec_Id: isNaN(LichLamViec_Id) ? null : LichLamViec_Id,
            MauBangCong_Id: isNaN(MauBangCong_Id) ? null : MauBangCong_Id,
            DSChuKy: [],
            DSMauBangCong: [],
            isShowModalChonLich: false,
            isShowModalThongTinCa: false,
            isShowModalSaoChepCa: false,
            isShowModalPhanCaHangLoat: false,
            columns: [],
            DSNgay: [],
            CTLichLamViec: null,
            CTBangCong: null,
            recordThongTinCa: null,
            ChuKy: null,
            isShowModalAddCa: false,
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
            ],
            NhanVien_Id: null,
            Ngay: null,
            DSNhanVien: [],
            isLoading: false,
            recordAddCa: {},
            recordDay: {},
            thangChuKy: null,
            namChuKy: null,
            DSPhanCa: [],
            pagination: {
                current: 1,
                total: 100,
                pageSize: 20,
                size: 'small',
                showTotal: (total) => `Total ${total} items`,
                showSizeChanger: false,
            },
        }
    },
    created() {
        this.loadVaiTro()
        this.loadVanPhong()
        this.loadLoaiCa()
        this.loadCaMau()
    },
    async mounted() {
        const $this = this
        await $this.loadChuKy()
        await $this.renderLichPhanCa()
    },
    methods: {
        async loadChuKy() {
            const { DSChuKy, DSMauBangCong } = await lichLamViecService.LichLamViec_Select()
            this.DSChuKy = DSChuKy
            this.DSMauBangCong = DSMauBangCong
        },
        async renderLichPhanCa() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                this.isLoading = true
                const params = { LichLamViec_Id: $this.LichLamViec_Id, MauBangCong_Id: $this.MauBangCong_Id }
                try {
                    const { DSNgay, DSPhanCa, DSNhanVien, CTBangCong, CTLichLamViec } = await lichLamViecService.LichLamViec_PhanCa_Select_Lich(params)
                    $this.DSNhanVien = DSNhanVien
                    $this.DSNgay = DSNgay
                    $this.CTLichLamViec = CTLichLamViec
                    $this.CTBangCong = CTBangCong
                    $this.thangChuKy = CTLichLamViec?.Thang
                    $this.namChuKy = CTLichLamViec?.Nam.toString()
                    const columnDate = DSNgay.map((item) => {
                        const day = item.Ngay?.toString().padStart('2', 0)
                        const month = item.Thang?.toString().padStart('2', 0)
                        return {
                            title: `${item.Thu} - ${day}/${month}`,
                            key: item.Cot_Ngay,
                            dataIndex: item.Cot_Ngay,
                            width: 130,
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
                        cloneNhanVien.TongCongChuan = tongCongChuan
                        cloneNhanVien.TongGioCong = tongGioCong
                        newDSPhanCa.push(cloneNhanVien)
                    }
                    const columnNhanVien = {
                        title: 'Nhân sự',
                        key: 'NhanVien',
                        dataIndex: 'NhanVien',
                        width: 230,
                        fixed: 'left',
                    }

                    $this.columns = [columnNhanVien, ...columnDate]
                    $this.DSPhanCa = newDSPhanCa
                    this.isLoading = false
                    console.log(' $this.DSPhanCa', $this.DSPhanCa)
                    scrollToDate(DSNgay)
                } catch (error) {
                    console.error('Error fetching data: (Anh Tam Debug)', error)
                    this.isLoading = false
                    return
                }
            }
        },
        onOpenModalAddCa(record, day) {
            this.NhanVien_Id = record.NhanVien_Id
            this.Ngay = day.Ngay
            this.recordDay = Object.assign({}, day)
            this.recordAddCa = Object.assign({}, record)
            this.isShowModalAddCa = true
        },
        onOpenModalThongTinCa(record) {
            this.recordThongTinCa = Object.assign({}, record)
            console.log(' this.recordThongTinCa', this.recordThongTinCa)
            this.isShowModalThongTinCa = true
        },
        onClickImportLichDuBao() {
            const $this = this
            redirect(`/ca-phan-ca-import-lich-du-tru?llvid=${$this.CTLichLamViec.LichLamViec_Id}&mbcid=${$this.CTBangCong.MauBangCong_Id}`)
        },
        onClickImportLichOff() {
            const $this = this
            redirect(`/ca-phan-ca-import-lich-off?llvid=${$this.CTLichLamViec.LichLamViec_Id}&mbcid=${$this.CTBangCong.MauBangCong_Id}`)
        },
        onClickImportLichPhanCa() {
            const $this = this
            redirect(`/ca-phan-ca-import-lich?llvid=${$this.CTLichLamViec.LichLamViec_Id}&mbcid=${$this.CTBangCong.MauBangCong_Id}`)
        },
        async getDSChuKy() {
            const $this = this
            return lichLamViecService.LichLamViec_Select().then(({ DSChuKy }) => {
                const obj = DSChuKy.find((x) => x.LichLamViec_Id === $this.LichLamViec_Id)
                if (obj) {
                    $this.ChuKy = obj
                }
            })
        },
        loadVaiTro() {
            ajaxCALL('/work/HR_VaiTro_Select', {}, (res) => {
                this.DSVaiTro = res.data
            })
        },
        loadVanPhong() {
            ajaxCALL('/work/HR_VanPhong_Select', {}, (res) => {
                this.DSVanPhong = res.data
            })
        },
        loadLoaiCa() {
            ajaxCALL('/work/CA_LoaiCa_Select', {}, (res) => {
                this.DSLoaiCa = res.data
            })
        },
        async loadCaMau() {
            const res = await caMauService.CaMau_Select()
            if (res.length > 0) {
                this.DSCaMau = res
            }
        },
        onReleaseAll(record) {
            const $this = this
            Confirm.confirm({
                content: `Bạn có chắc muốn xuất bản tất cả các ca?`,
                onOk: async () => {
                    const res = await caService.LichLamViec_PhanCa_XuatBan_Lich({
                        LichLamViec_Id: $this.LichLamViec_Id,
                        MauBangCong_Id: $this.MauBangCong_Id,
                    })
                    if (res) {
                        $this.$message.success(`Xuất bản tất cả ca thành công!`)
                        $this.renderLichPhanCa()
                    }
                },
            })
        },

        onOpenModalChonLich() {
            const $this = this
            $this.isShowModalChonLich = true
        },
        onChangeChuKy() {
            const $this = this
            $this.isDisabled = false
            $this.MauBangCong_Id = null
        },
        onChangeLichLamViec() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                redirect(`/ca-phan-ca?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
            }
        },
        onOpenModalPhanCaHangLoat() {
            this.isShowModalPhanCaHangLoat = true
        },
        onDelete() {
            const $this = this
            Confirm.delete({
                content: `Xác nhận xóa lịch phân ca T${$this.CTLichLamViec?.Thang + '/' + $this.CTLichLamViec?.Nam} của ${$this.CTBangCong?.TenMauBangCong}`,
                async onOk() {
                    const params = {
                        LichLamViec_Id: $this.LichLamViec_Id,
                        MauBangCong_Id: $this.MauBangCong_Id,
                    }
                    const isDelete = await lichLamViecService.LichLamViec_PhanCa_Delete_By_MauBangCong_Id(params)
                    if (isDelete) {
                        $this.renderLichPhanCa()
                        $this.$message.success('Xóa lịch phân ca thành công')
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
    },
}
</script>
