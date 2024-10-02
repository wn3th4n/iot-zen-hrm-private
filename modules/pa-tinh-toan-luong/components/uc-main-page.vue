<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <div class="d-flex flex-row">
                    <b class="me-3">Chu kỳ lương</b>
                    <a-select v-model:value="ChuKyLuong_Id" @change="onChangeChuKyLuong()" placeholder="Chọn chu kỳ lương" class="me-2 min-w-200px">
                        <a-select-option v-for="item in DSChuKy" :value="item.ChuKyLuong_Id" :key="item.ChuKyLuong_Id">Tháng {{ item.Thang }}/{{ item.Nam }}</a-select-option>
                    </a-select>
                    <a-select v-model:value="MauBangLuong_Id" @change="onChangeMauBangLuong()" placeholder="Chọn mẫu bảng lương" :disabled="isDisabled" class="min-w-300px">
                        <a-select-option v-for="item in DSMauBangLuong.filter((item) => item.ChuKyLuong_Id === ChuKyLuong_Id)" :value="item.MauBangLuong_Id" :key="item.MauBangLuong_Id">{{ item.TenMauBangLuong }}</a-select-option>
                    </a-select>
                </div>
            </template>
            <template #extra>
                <a-space size="small">
                    <a-dropdown :trigger="['click']" :disabled="MauBangLuong_Id === null || ChuKyLuong_Id === null">
                        <a-button type="primary"><uc-icon name="apps" />Thao tác<uc-icon name="chevron-down" /></a-button>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onOpenModalTinhLuong()"><uc-icon name="calculator-variant-outline" /> Tính lương </a-menu-item>
                                <a-divider class="my-1"></a-divider>
                                <a-menu-item @click="onChotLuong(record)"><uc-icon name="text-box-check-outline" />Chốt lương</a-menu-item>
                                <a-menu-item @click="onHuyChotLuong(record)"><uc-icon name="close-octagon-outline" />Hủy chốt lương</a-menu-item>
                                <a-divider class="my-1"></a-divider>
                                <a-menu-item @click="isShowModalDongBoDuLieu = true"><uc-icon name="sync" />Đồng bộ dữ liệu </a-menu-item>
                                <a-menu-item @click="onRedirectCauHinhCot()"><uc-icon name="table-edit" />Cấu hình cột</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-space>
            </template>
        </a-card>
        <a-table
            :scroll="{ x: 'max-content', y: 'calc(100vh - 182px)' }"
            class="table-vertical-top"
            :columns="columns"
            :data-source="DSLuong"
            size="small"
            :loading="isLoadingPage"
            :pagination="{
                current: currentPage,
                total: DSLuong.length,
                pageSize: 20,
                size: 'small',
                showTotal: (total, range) => showTotal(total, range),
                showSizeChanger: false,
            }"
            @change="handleTableChange"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'NhanVien'">
                    <a-flex gap="small">
                        <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien"></uc-avatar>
                        <a-flex vertical>
                            <b @click="onClickUserInfo(record)" class="mb-0 cursor-pointer back-link-hover">[{{ record.MaNhanVien }}] {{ record.HoVaTenNhanVien }}</b>
                            <a-flex>
                                <div>
                                    <small v-if="record.Is_TinhLuong" class="text-success">Đã tính lương </small>
                                    <small v-else class="text-warning">Chưa tính lương </small>
                                </div>

                                <span class="mx-1">•</span>

                                <div>
                                    <small v-if="record.Is_ChotLuong"><span class="text-success">Đã chốt lương</span></small>
                                    <small v-else><span class="text-warning">Chưa chốt lương</span></small>
                                </div>

                                <div>
                                    <small v-if="record.Is_TuChoi" class="cursor-pointer" @click="onOpenModalReject(record)"> <span class="mx-1">•</span><span class="text-red">Từ chối</span></small>
                                </div>
                            </a-flex>
                        </a-flex>
                    </a-flex>
                </template>
                <template v-else-if="column.key === 'Action'">
                    <a-dropdown trigger="click">
                        <uc-icon color="primary" name="square-edit-outline" class="cursor-pointer" />
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onOpenModalPhieuLuong(record)"> <uc-icon name="text-box-search-outline" />Xem phiếu lương </a-menu-item>
                                <a-menu-item @click="onPrintBangLuong(record)"><uc-icon name="printer" /> In phiếu lương </a-menu-item>
                                <a-divider class="my-1"></a-divider>
                                <a-menu-item @click="onChotLuongByNhanVienId(record)"><uc-icon name="text-box-check-outline" /> Chốt lương </a-menu-item>
                                <a-menu-item @click="onHuyChotLuongByNhanVienId(record)"><uc-icon name="close-octagon-outline" />Hủy chốt lương</a-menu-item>
                                <a-divider class="my-1"></a-divider>
                                <a-menu-item @click="openModalEditBLNV(record)"><uc-icon name="text-box-edit-outline" /> Sửa giá trị</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
                <div v-for="item in DSCTLuong">
                    <template v-if="column.key === item.MaThuocTinh">
                        <div v-if="item.LoaiThuocTinh === 'CT'" class="justify-content-end d-flex align-items">
                            <span>
                                {{ record[item.MaThuocTinh].toLocaleString('en-us') }}
                            </span>
                        </div>
                        <div v-else class="justify-content-end d-flex align-items">
                            <span>
                                {{ record[item.MaThuocTinh].toLocaleString('en-us') }}
                            </span>
                        </div>
                    </template>
                </div>
            </template>
        </a-table>
        <a-modal aria-hidden="false" v-model:open="isShowModalPhieuLuong" width="100%" wrap-class-name="full-modal" :closable="false" :style="{ padding: '0px' }" :footer="null">
            <template #title>
                <div class="d-flex justify-content-between">
                    <h3>Chi tiết phiếu lương</h3>
                    <uc-icon @click="onCloseModalPhieuLuong()" name="close" class="cursor-pointer" size="20" />
                </div>
            </template>
            <a-divider class="my-0"></a-divider>
            <div style="background-color: #ececec; padding: 20px; border-radius: 10px">
                <a-row :gutter="16">
                    <a-col :span="16">
                        <a-card :bordered="false" size="small">
                            <template #title>
                                <div class="py-1 d-flex flex-row align-items-center" style="height: 70px">
                                    <uc-avatar :src="recordPhieuLuongNhanVien.AnhDaiDien_Url" :text="recordPhieuLuongNhanVien.HoVaTenNhanVien" size="40" />
                                    <div class="ms-4">
                                        <b>{{ recordPhieuLuongNhanVien.HoVaTenNhanVien }}</b> <br />
                                        <span style="font-size: 14px; font-weight: 400">{{ recordMauBangLuong.TenMauBangLuong }} - {{ recordChuKyLuong.NgayBatDau }} - {{ recordChuKyLuong.NgayKetThuc }}</span>
                                    </div>
                                </div>
                            </template>
                            <a-row>
                                <a-col :span="6" v-for="item in DSThuocTinhBangLuong" :key="item.MauBangLuong_ThuocTinh_Id" class="mb-3">
                                    <div class="d-flex justify-content-between pe-3">
                                        <b>{{ item.TenThuocTinh }}: </b>
                                        <a-tag color="success">
                                            <span>{{ item.LoaiDuLieu === 'NUM' ? item.GiaTri_So.toLocaleString('en-US') : item.GiaTri_VanBan }}</span>
                                        </a-tag>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="8">
                        <a-card title="Lịch sử" :bordered="false" size="small">
                            <uc-empty />
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </a-modal>

        <uc-modal :isOpen="isShowModalReject" :title="titleTuChoi" :width="500" @onClose="onCloseModalReject()">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="Lý do" class="mb-0">
                        <span>{{ recordReject.LyDo_TuChoi }}</span>
                    </a-form-item>
                </a-col>
            </a-row>
        </uc-modal>
        <uc-modal-dong-bo-du-lieu v-model:isOpen="isShowModalDongBoDuLieu" :chukyluongid="ChuKyLuong_Id" :maubangluongid="MauBangLuong_Id" @onFinish="renderBangLuong()" />
        <uc-modal-edit-bang-luong-nhan-vien v-model:isOpen="isShowModalEditBLNV" :record="recordBLNV" :chukyluongid="ChuKyLuong_Id" :maubangluongid="MauBangLuong_Id" @onFinish="renderBangLuong()" />
        <uc-loading-page v-model:modelValue="Loading.IsLoadingPage" :text="Loading.text" @onCloseModal="onCloseModalTinhLuong" :ctchukyluong="recordChuKyLuong" :ctmaubangluong="recordMauBangLuong" :title="titleProcessTinhLuong" :dsnhanvienloi="DSNhanVienLoi" :processIndex="Loading.processIndex" :processTotal="Loading.processTotal" :DSNhanVienProcess="DSNhanVienProcess" @DSNhanVienTinhLuong="DSNhanVienTinhLuong" @onFinish="onFinishTinhLuong" :dsnhanvien="DSNhanVien" @ConfirmTinhLuong="ConfirmTinhLuong" :ThoiGianBatDauTinh="timeStart" :ThoiGianKetThucTinh="timeEnd" />
    </uc-layout>
</template>
<script>
export default {
    props: [],
    data() {
        const urlParam = new URL(window.location.href).searchParams
        const ChuKyLuong_Id = parseInt(urlParam.get('cklid'))
        const MauBangLuong_Id = parseInt(urlParam.get('mblid'))
        return {
            currentPage: 1,
            DSLuong: [],
            isShowModalReject: false,
            isShowModalPhieuLuong: false,
            isShowModalEditBLNV: false,
            isShowModalDongBoDuLieu: false,
            isShowModalTinhLuong: false,
            isShowModalEditBangLuong: false,
            isShowModalCauHinhBangLuong: false,
            columns: [],
            ChuKyLuong_Id: isNaN(ChuKyLuong_Id) ? null : ChuKyLuong_Id,
            MauBangLuong_Id: isNaN(MauBangLuong_Id) ? null : MauBangLuong_Id,
            isDisabled: false,
            DSChuKy: [],
            DSMauBangLuong: [],
            DSCTLuong: [],
            DSNhanVien: [],
            recordBLNV: {},
            Loading: {
                text: null,
                IsLoadingPage: false,
                processIndex: 0,
                processTotal: 0,
            },
            Loading_Default: {
                text: null,
                IsLoadingPage: false,
                processIndex: 0,
                processTotal: 0,
            },
            ThongTinDuLieuLuong: {},
            DSBienHeThong: [],
            DSBienTuDinhNghia: [],
            DSCongThucLuong: [],
            isLoadingPage: false,
            recordPhieuLuongNhanVien: {},
            recordMauBangLuong: {},
            recordChuKyLuong: {},
            DSThuocTinhBangLuong: [],
            titleProcessTinhLuong: '',
            DSNhanVienProcess: [],
            DSNhanVienLoi: [],
            isBreakTinhLuong: false,
            timeEnd: null,
            timeStart: null,
            recordReject: {},
        }
    },
    created() {},
    async mounted() {
        await this.getDSChuKyLuong()
        await this.renderBangLuong()
    },
    computed: {
        titlePhieuLuong: function () {
            return 'Phiếu lương - ' + this.recordPhieuLuongNhanVien.HoVaTenNhanVien
        },
        titleTuChoi: function () {
            return `Từ chối xác nhận lương - [${this.recordReject.MaNhanVien}] ${this.recordReject.HoVaTenNhanVien}`
        },
    },
    methods: {
        async renderBangLuong() {
            const $this = this
            if ($this.ChuKyLuong_Id && $this.MauBangLuong_Id) {
                this.isLoadingPage = true
                const { DSCongThucLuong, DSNhanVien, MauBangLuong, ChuKyLuong } = await chuKyLuongService.ChuKyLuong_TinhCong_Select({
                    ChuKyLuong_Id: $this.ChuKyLuong_Id,
                    MauBangLuong_Id: $this.MauBangLuong_Id,
                })
                if (DSCongThucLuong.length === 0 || DSNhanVien.length === 0) {
                    this.isLoadingPage = false
                    return
                }
                $this.recordMauBangLuong = Object.assign({}, MauBangLuong)
                $this.recordChuKyLuong = Object.assign({}, ChuKyLuong)
                $this.DSNhanVien = DSNhanVien
                $this.DSCTLuong = DSCongThucLuong.filter((item) => item.NhanVien_Id === DSNhanVien[0].NhanVien_Id)
                let columnsCongThuc = DSCongThucLuong.filter((item) => (item.Is_HienThi && item.NhanVien_Id === DSNhanVien[0].NhanVien_Id)).map((item) => {
                    return {
                        title: item.TenThuocTinh,
                        dataIndex: item.MaThuocTinh,
                        key: item.MaThuocTinh,
                        width: 120,
                        align: 'center',
                    }
                })
                let newDSBangLuong = []
                for (var nv of DSNhanVien) {
                    const cloneNhanVien = { ...nv }
                    const DSFilterCongThucLuongNhanVien = DSCongThucLuong.filter((x) => x.NhanVien_Id === nv.NhanVien_Id)
                    for (ct of DSFilterCongThucLuongNhanVien) {
                        cloneNhanVien[ct.MaThuocTinh] = ct.LoaiDuLieu === 'NUM' ? ct.GiaTri_So : ct.GiaTri_VanBan
                    }
                    newDSBangLuong.push(cloneNhanVien)
                }
                let columnNhanVien = [
                    {
                        title: 'Nhân viên',
                        key: 'NhanVien',
                        dataIndex: 'NhanVien',
                        width: 300,
                        fixed: 'left',
                    },
                    {
                        title: '',
                        dataIndex: 'Action',
                        key: 'Action',
                        fixed: 'left',
                    },
                ]
                $this.DSLuong = newDSBangLuong
                $this.columns = [...columnNhanVien, ...columnsCongThuc]
                this.isLoadingPage = false
            }
        },
        async getDSChuKyLuong() {
            const $this = this
            const { DSChuKy, DSMauBangLuong } = await chuKyLuongService.ChuKyLuong_Select()
            $this.DSChuKy = DSChuKy
            $this.DSMauBangLuong = DSMauBangLuong
        },
        onChangeChuKyLuong() {
            const $this = this
            $this.isDisabled = false
            $this.MauBangLuong_Id = null
        },
        onChangeMauBangLuong() {
            const $this = this
            if ($this.ChuKyLuong_Id && $this.MauBangLuong_Id) {
                redirect(`/pa-tinh-toan-luong?cklid=${this.ChuKyLuong_Id}&mblid=${this.MauBangLuong_Id}`)
            }
        },
        onRedirectCauHinhCot() {
            const $this = this
            if ($this.MauBangLuong_Id && $this.ChuKyLuong_Id) {
                redirect(`/pa-tinh-toan-luong-cau-hinh-cot?cklid=${$this.ChuKyLuong_Id}&mblid=${$this.MauBangLuong_Id}`)
            }
        },
        excelColumnName(index) {
            s = 1 // Start index for column titles (A = 1)
            e = 26 // End index for column titles (Z = 26)
            result = '' // Initialize the result variable to store the column title
            while ((index -= s) >= 0) {
                // Loop until the column number is greater than or equal to the start index
                result = String.fromCharCode(parseInt((index % e) / s) + 65) + result // Calculate the character for the current digit and prepend it to the result
                s = e // Update the start index for the next digit
                e *= 26 // Update the end index for the next digit
            }
            return result // Return the Excel column title
        },
        ConfirmTinhLuong() {
            const $this = this
            console.log('  $this.DSNhanVienProcess  before', $this.DSNhanVienProcess)
            const promise = () => {
                return new Promise(async (resolve) => {
                    this.isBreakTinhLuong = false
                    $this.timeStart = null
                    $this.timeEnd = null
                    $this.timeStart = dayjs().format('HH:mm:ss')
                    $this.Loading.processTotal = $this.DSNhanVien.filter((x) => x.IsTinhCong === true).length
                    $this.Loading.processIndex = 0
                    $this.titleProcessTinhLuong = `tháng ${$this.recordChuKyLuong.Thang}/${$this.recordChuKyLuong.Nam} - ${$this.recordMauBangLuong.TenMauBangLuong}`
                    $this.Loading.IsLoadingPage = true
                    for (var nv of $this.DSNhanVien.filter((x) => x.IsTinhCong === true)) {
                        if ($this.isBreakTinhLuong) {
                            $this.DSNhanVienProcess = Object.assign([], [])
                            $this.timeStart = null
                            $this.timeEnd = null
                            $this.Loading.processIndex = 0
                            break
                        }
                        nv.TrangThaiTinh = 1
                        let nhanVienObj = { ...nv, TrangThai: 1, SoThuTu: $this.DSNhanVien.indexOf(nv) + 1, ThoiGianTinh: null }
                        $this.DSNhanVienProcess.unshift(nhanVienObj)
                        const { ThongTinBangLuong, ThongTinDuLieuLuong, DSBienHeThong, DSBienTuDinhNghia, DSCongThucLuong } = await chuKyLuongService.ChuKyLuong_TinhCong_Select_Formula_By_NhanVien_Id({
                            ChuKyLuong_Id: $this.ChuKyLuong_Id,
                            MauBangLuong_Id: $this.MauBangLuong_Id,
                            NhanVien_Id: nv.NhanVien_Id,
                        })
                        if (ThongTinDuLieuLuong === undefined) {
                            $this.Loading.processIndex++
                            nv.TrangThaiTinh = 4
                            continue
                        }
                        $this.Loading.processIndex++
                        $this.isBusy = true
                        $this.Loading.text = `[${nv.MaNhanVien}] ` + `${nv.HoVaTenNhanVien}`
                        $this.ThongTinDuLieuLuong = ThongTinDuLieuLuong ?? {}
                        $this.DSBienHeThong = DSBienHeThong
                        $this.DSBienTuDinhNghia = DSBienTuDinhNghia
                        $this.DSCongThucLuong = DSCongThucLuong
                        $this.DSBienTuDinhNghia.forEach((item) => {
                            $this.ThongTinDuLieuLuong[item.MaHeThong] = item.GiaTri_So
                            let obj = {
                                Bien_Id: 0,
                                NhomBien_Id: 0,
                                MaHeThong: item.MaHeThong,
                                MaBien: item.MaBien,
                                TenBien: item.TenBien,
                                LoaiThuocTinh: item.LoaiThuocTinh,
                                LoaiDuLieu: item.LoaiDuLieu,
                                MoTa: item.MoTa,
                                TenBang: item.TenBang,
                                TenCot: item.TenCot,
                            }
                            $this.DSBienHeThong.push(obj)
                        })
                        let length_DSBienHeThong_And_DSBienTuDinhNghia = $this.DSBienHeThong.length
                        let dataFormula = []
                        $this.DSBienHeThong.forEach((item) => {
                            let obj = {
                                LoaiDuLieu: item.LoaiDuLieu,
                                LoaiThuocTinh: item.LoaiThuocTinh,
                                MaThuocTinh: item.MaBien,
                                TenThuocTinh: item.TenBien,
                                CongThuc: $this.ThongTinDuLieuLuong[item.TenCot],
                                GiaTri: $this.ThongTinDuLieuLuong[item.TenCot],
                            }
                            dataFormula.push(obj)
                        })
                        $this.DSCongThucLuong.forEach((item) => {
                            let tenCot = ''
                            if (item.LoaiThuocTinh === 'TD') {
                                tenCot = $this.DSBienHeThong.filter((bht) => bht.MaHeThong === item.MaHeThong)[0]?.TenCot
                            }

                            let obj = {
                                LoaiDuLieu: item.LoaiDuLieu,
                                LoaiThuocTinh: item.LoaiThuocTinh,
                                MaThuocTinh: item.MaThuocTinh,
                                TenThuocTinh: item.TenThuocTinh,
                                CongThuc: item.LoaiThuocTinh === 'TD' ? $this.ThongTinDuLieuLuong[tenCot] : item.CongThuc,
                                GiaTri: item.LoaiThuocTinh === 'TD' ? $this.ThongTinDuLieuLuong[tenCot] : item.GiaTri_So,
                            }
                            dataFormula.push(obj)
                        })
                        // Chuyển đổi index thành ký tự A, B, C,...
                        const totalRow = dataFormula.length
                        const arrColumnName = []
                        for (let i = 0; i < totalRow; i++) {
                            arrColumnName.push($this.excelColumnName(i + 1))
                        }
                        //Chuyển dòng thành cột
                        const dataFormula_Column = []
                        dataFormula_Column.push(arrColumnName)
                        const row1 = dataFormula.map((item) => item.LoaiThuocTinh)
                        dataFormula_Column.push(row1)
                        const row2 = dataFormula.map((item) => item.LoaiDuLieu)
                        dataFormula_Column.push(row2)
                        const row3 = dataFormula.map((item) => item.MaThuocTinh)
                        dataFormula_Column.push(row3)
                        const row4 = dataFormula.map((item) => item.TenThuocTinh)
                        dataFormula_Column.push(row4)
                        console.log('dataFormula_Column', dataFormula_Column)
                        // Định nghĩa một số hàm hỗ trợ
                        const FormulaHelpers = {
                            accept: (value, type) => {
                                // Giả sử hàm này chấp nhận kiểm tra và chuyển đổi kiểu dữ liệu
                                // Nếu cần, bạn có thể triển khai hàm chuyển đổi kiểu dữ liệu ở đây
                                return value
                            },
                        }
                        // Định nghĩa các loại dữ liệu
                        const Types = {
                            NUMBER: 'number',
                            BOOLEAN: 'boolean',
                        }
                        // Định nghĩa lỗi
                        const FormulaError = {
                            VALUE: 'VALUE',
                        }
                        // Định nghĩa hằng số MAX_ROW và MAX_COLUMN
                        const MAX_ROW = 10000
                        const MAX_COLUMN = 2000
                        const parser = new FormulaParser({
                            functions: {
                                MIN: (...args) => {
                                    // Extract numeric values from 'args' objects
                                    const numbers = args.map((arg) => {
                                        // Ensure 'arg.value' is a number and validate
                                        const number = FormulaHelpers.accept(arg.value, Types.NUMBER)
                                        if (isNaN(number)) {
                                            throw FormulaError.VALUE
                                        }
                                        return number
                                    })
                                    // Ensure there are at least two numeric parameters
                                    if (numbers.length < 2) {
                                        throw FormulaError.NUM
                                    }
                                    // Calculate the minimum value
                                    return Math.min(...numbers)
                                },
                                MAX: (...args) => {
                                    // Extract numeric values from 'args' objects
                                    const numbers = args.map((arg) => {
                                        // Ensure 'arg.value' is a number and validate
                                        const number = FormulaHelpers.accept(arg.value, Types.NUMBER)
                                        if (isNaN(number)) {
                                            throw FormulaError.VALUE
                                        }
                                        return number
                                    })
                                    // Ensure there are at least two numeric parameters
                                    if (numbers.length < 2) {
                                        throw FormulaError.NUM
                                    }
                                    // Calculate the minimum value
                                    return Math.max(...numbers)
                                },
                            },
                            // Variable used in formulas (defined name)
                            // Should only return range reference or cell reference
                            onVariable: (name, sheetName) => {
                                // If it is a range reference (A1:B2)
                                return {
                                    sheet: 'sheet name',
                                    from: {
                                        row: 1,
                                        col: 1,
                                    },
                                    to: {
                                        row: 2,
                                        col: 2,
                                    },
                                }
                                // If it is a cell reference (A1)
                                return {
                                    sheet: 'sheet name',
                                    row: 1,
                                    col: 1,
                                }
                            },
                            // retrieve cell value
                            onCell: ({ sheet, row, col }) => {
                                // using 1-based index
                                // return the cell value, see possible types in next section.
                                return dataFormula_Column[row - 1][col - 1]
                            },
                            // retrieve range values
                            onRange: (ref) => {
                                // using 1-based index
                                // Be careful when ref.to.col is MAX_COLUMN or ref.to.row is MAX_ROW, this will result in
                                // unnecessary loops in this approach.
                                const arr = []
                                for (let row = ref.from.row; row <= ref.to.row; row++) {
                                    const innerArr = []
                                    if (dataFormula_Column[row - 1]) {
                                        for (let col = ref.from.col; col <= ref.to.col; col++) {
                                            innerArr.push(dataFormula_Column[row - 1][col - 1])
                                        }
                                    }
                                    arr.push(innerArr)
                                }
                                return arr
                            },
                        })
                        const definitionRow = dataFormula.map((item) => {
                            if (item.LoaiThuocTinh === 'CT') {
                                let formula = item['CongThuc']

                                // Thay thế các Id trong công thức bằng vị trí cột tương ứng đã render
                                dataFormula.forEach((innerItem, innerIndex) => {
                                    const id = innerItem.MaThuocTinh
                                    const colAddress = $this.excelColumnName(innerIndex + 1) // Chuyển đổi số index thành ký tự A, B, C,...
                                    const regex = new RegExp(`\\b${id}\\b`, 'g') // Tạo biểu thức chính quy với \b để xác định ranh giới của từ
                                    let col_number = 7
                                    formula = formula.replace(regex, colAddress + `${col_number}`)
                                })
                                return formula
                            } else {
                                if (item.LoaiDuLieu == 'NUM') {
                                    return item['GiaTri'] ?? 0
                                } else if (item.LoaiDuLieu == 'TEXT') {
                                    return item['GiaTri'] ?? ''
                                }
                            }
                        })
                        dataFormula_Column.push(definitionRow)
                        dataFormula_Column.push([])
                        dataFormula.forEach((item, index) => {
                            //Xử lý cột CT
                            if (dataFormula_Column[1][index] === 'CT' || dataFormula_Column[1][index] === 'HS') {
                                const formula = dataFormula_Column[5][index]
                                try {
                                    const position = { row: 6, col: index, sheet: 'Sheet1' }
                                    let result = parser.parse(formula, position)
                                    dataFormula_Column[6][index] = result
                                    dataFormula.forEach((item, index) => {
                                        if (dataFormula_Column[1][index] === 'CT' || dataFormula_Column[1][index] === 'HS') {
                                            const formula = dataFormula_Column[5][index]
                                            try {
                                                const position = { row: 6, col: index, sheet: 'Sheet1' }
                                                let result = parser.parse(formula, position)
                                                dataFormula_Column[6][index] = result
                                            } catch (error) {
                                                //Nếu công thức lỗi và có kiểu dữ liệu là NUM thì gán giá trị = -1
                                                if (dataFormula_Column[2][index] === 'NUM') {
                                                    dataFormula_Column[6][index] = -1
                                                }
                                                //Nếu công thức lỗi và có kiểu dữ liệu là TEXT thì gán giá trị = 'error'
                                                else {
                                                    dataFormula_Column[6][index] = 'error'
                                                }
                                            }
                                        }
                                    })
                                } catch (error) {
                                    //Nếu công thức lỗi và có kiểu dữ liệu là NUM thì gán giá trị = -1
                                    if (dataFormula_Column[2][index] === 'NUM') {
                                        dataFormula_Column[6][index] = -1
                                    }
                                    //Nếu công thức lỗi và có kiểu dữ liệu là TEXT thì gán giá trị = 'error'
                                    else {
                                        dataFormula_Column[6][index] = 'error'
                                    }
                                }
                                //Xử lý cột TD
                            } else if (dataFormula_Column[1][index] === 'TD' || dataFormula_Column[1][index] === 'NL') {
                                dataFormula_Column[6][index] = dataFormula_Column[5][index]
                            }
                        })
                        let ChuKyLuong_TinhCong_Arr = []
                        // Tách giá trị của các biến công thức lương để insert
                        let dataFormula_Column_6_Clone = dataFormula_Column[6].splice(length_DSBienHeThong_And_DSBienTuDinhNghia, dataFormula_Column[6].length)
                        console.log('dataFormula_Column_6_Clone', dataFormula_Column_6_Clone)
                        let Gia_Tri_ChuKyLuong_TinhCong_Arr = dataFormula_Column_6_Clone
                        $this.DSCongThucLuong.map((item, index) => {
                            let obj = {}
                            obj.Id = item.ChuKyLuong_TinhCong_Id
                            obj.Ma = item.MaThuocTinh
                            obj.Loai = item.LoaiDuLieu
                            obj.GiaTri = Gia_Tri_ChuKyLuong_TinhCong_Arr[index]
                            obj.IsError = Gia_Tri_ChuKyLuong_TinhCong_Arr[index] === -1 ? 1 : 0
                            ChuKyLuong_TinhCong_Arr.push(obj)
                        })
                        let ChuKyLuong_TinhCong_JSON = JSON.stringify(ChuKyLuong_TinhCong_Arr)
                        const res = await chuKyLuongService.ChuKyLuong_TinhCong_Apply_Formula_By_NhanVien_Id({
                            NhanVien_Id: nv.NhanVien_Id,
                            MauBangLuong_Id: $this.MauBangLuong_Id,
                            ChuKyLuong_Id: $this.ChuKyLuong_Id,
                            ChuKyLuong_TinhCong_JSON: ChuKyLuong_TinhCong_JSON,
                        })
                        if (res.length === 0) {
                            nv.TrangThaiTinh = 2
                        } else {
                            nv.TrangThaiTinh = 3
                            let objLoi = {}
                            objLoi.HoVaTenNhanVien = nv.HoVaTenNhanVien
                            objLoi.NhanVien_Id = nv.NhanVien_Id
                            objLoi.MaNhanVien = nv.MaNhanVien
                            objLoi.DSLoi = res
                            $this.DSNhanVienLoi.push(objLoi)
                        }
                    }
                    resolve()
                })
            }
            promise().then(async () => {
                if ($this.isBreakTinhLuong) {
                    $this.timeEnd = null
                } else {
                    $this.timeEnd = dayjs().format('HH:mm:ss')
                }
                $this.DSNhanVienProcess = Object.assign([], [])

                // this.Loading.IsLoadingPage = false
                $this.renderBangLuong()
            })
        },
        openModalEditBLNV(record) {
            this.isShowModalEditBLNV = true
            this.recordBLNV = Object.assign({}, record)
        },

        onClickUserInfo(record) {
            redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
        },
        onChotLuong(record) {
            const $this = this
            Confirm.confirm({
                content: 'Xác nhận chốt lương tất cả nhân viên?',
                onOk: async () => {
                    const res = await chuKyLuongService.ChuKyLuong_TinhCong_ChotLuong({
                        MauBangLuong_Id: $this.MauBangLuong_Id,
                        ChuKyLuong_Id: $this.ChuKyLuong_Id,
                    })
                    if (res) {
                        $this.renderBangLuong()
                        $this.$message.success('Chốt lương thành công!')
                    }
                },
            })
        },
        onHuyChotLuong(record) {
            const $this = this
            Confirm.confirm({
                content: 'Xác nhận hủy chốt lương tất cả nhân viên?',
                onOk: async () => {
                    const res = await chuKyLuongService.ChuKyLuong_TinhCong_HuyChotLuong({
                        MauBangLuong_Id: $this.MauBangLuong_Id,
                        ChuKyLuong_Id: $this.ChuKyLuong_Id,
                    })
                    if (res) {
                        $this.renderBangLuong()
                        $this.$message.success('Hủy chốt lương thành công!')
                    }
                },
            })
        },
        onHuyChotLuongByNhanVienId(record) {
            const $this = this
            Confirm.confirm({
                content: `Xác nhận hủy chốt lương cho ${record.HoVaTenNhanVien}?`,
                onOk: async () => {
                    const res = await chuKyLuongService.ChuKyLuong_TinhCong_HuyChotLuong_By_NhanVien_Id({
                        MauBangLuong_Id: $this.MauBangLuong_Id,
                        ChuKyLuong_Id: $this.ChuKyLuong_Id,
                        NhanVien_Id: record.NhanVien_Id,
                    })
                    if (res) {
                        $this.renderBangLuong()
                        $this.$message.success(`Hủy chốt lương cho ${record.HoVaTenNhanVien} thành công!`)
                    }
                },
            })
        },
        onChotLuongByNhanVienId(record) {
            const $this = this
            Confirm.confirm({
                content: `Xác nhận chốt lương cho ${record.HoVaTenNhanVien}?`,
                onOk: async () => {
                    const res = await chuKyLuongService.ChuKyLuong_TinhCong_ChotLuong_By_NhanVien_Id({
                        MauBangLuong_Id: $this.MauBangLuong_Id,
                        ChuKyLuong_Id: $this.ChuKyLuong_Id,
                        NhanVien_Id: record.NhanVien_Id,
                    })
                    if (res) {
                        $this.renderBangLuong()
                        $this.$message.success(`Chốt lương cho ${record.HoVaTenNhanVien} thành công!`)
                    }
                },
            })
        },
        onCloseModalPhieuLuong() {
            this.isShowModalPhieuLuong = false
        },
        onOpenModalPhieuLuong(record) {
            const $this = this
            $this.recordPhieuLuongNhanVien = Object.assign({}, record)

            chuKyLuongService
                .ChuKyLuong_TinhCong_Select_By_NhanVien_Id({
                    ChuKyLuong_Id: $this.ChuKyLuong_Id,
                    MauBangLuong_Id: $this.MauBangLuong_Id,
                    NhanVien_Id: record.NhanVien_Id,
                })
                .then((data) => {
                    $this.DSThuocTinhBangLuong = data[0]
                })
            console.log(' $this.recordPhieuLuongNhanVien', $this.recordPhieuLuongNhanVien)
            $this.isShowModalPhieuLuong = true
        },
        showTotal(total, range) {
            return `${range[0]} - ${range[1]} / ${total} mục`
        },
        handleTableChange(pagination) {
            this.currentPage = pagination.current
        },
        async onPrintBangLuong(record) {
            const res = await chuKyLuongService.ChuKyLuong_TinhCong_Select_By_NhanVien_Id({
                MauBangLuong_Id: this.MauBangLuong_Id,
                ChuKyLuong_Id: this.ChuKyLuong_Id,
                NhanVien_Id: record.NhanVien_Id,
            })
            if (res) {
                let bodyTableArray = []
                bodyTableArray.push([
                    { text: 'Thuộc tính', alignment: 'center', bold: true, fontSize: 11 },
                    { text: 'Giá trị', alignment: 'center', bold: true, fontSize: 11 },
                ])
                res[0].forEach((item, index) => {
                    bodyTableArray.push([
                        { text: item.TenThuocTinh, fontSize: 10 },
                        { text: item.GiaTri_So.toLocaleString('us-en'), alignment: 'right', fontSize: 10 },
                    ])
                })
                let dd = {
                    pageSize: {
                        width: 350, // Chiều rộng tính bằng points (ví dụ: 595.28pt ~ 8.27 inches cho khổ A4)
                        height: 1400, // Chiều cao (841.89pt ~ 11.69 inches cho khổ A4)
                    },
                    content: [
                        { text: `Bảng lương tháng ${res[2][0].Thang}/${res[2][0].Nam}`, fontSize: 12, margin: [0, 0, 0, 5], bold: true, alignment: 'center' },
                        { text: `Kính gửi: Anh/ Chị  [${record.MaNhanVien}] ${record.HoVaTenNhanVien}`, fontSize: 10, margin: [0, 0, 0, 20], alignment: 'center' },
                        {
                            table: {
                                widths: ['*', 70],
                                body: bodyTableArray,
                            },
                            layout: 'lightHorizontalLines',
                        },
                    ],
                }
                const pdf = pdfMake.createPdf(dd)
                pdf.open()
            }
        },

        onOpenModalTinhLuong() {
            this.Loading.IsLoadingPage = true
        },

        DSNhanVienTinhLuong(value) {
            this.DSNhanVien = Object.assign([], value)
        },
        onFinishTinhLuong() {
            this.isBreakTinhLuong = true
        },
        onCloseModalTinhLuong() {
            this.Loading = Object.assign({}, this.Loading_Default)
            this.timeStart = null
            this.timeEnd = null
        },

        onOpenModalReject(record) {
            this.recordReject = Object.assign({}, record)
            this.isShowModalReject = true
        },
        onCloseModalReject() {
            this.isShowModalReject = false
            this.recordReject = Object.assign({}, {})
        },
    },
}
</script>
