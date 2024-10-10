<template>
    <div>
        <uc-modal v-model:isOpen="isOpen" :title="Title" :width="800" @onClose="onCloseModal()" ref="refFormModal">
            <a-spin :spinning="spinning" :delay="delayTime">
                <a-form layout="vertical" class="mt-3">
                    <a-row :gutter="[10]">
                        <a-col :span="6">
                            <a-form-item label="Lựa chọn">
                                <a-select v-model:value="cachTinh">
                                    <a-select-option v-for="item in cachTinhArr" :value="item.id">
                                        <span>{{ item.TenCachTinh }}</span>
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="5">
                            <a-form-item label="Từ ngày">
                                <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="TuNgay" :disabled="cachTinh === 1" class="w-100" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="5">
                            <a-form-item label="Đến ngày">
                                <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="DenNgay" :disabled="cachTinh === 1" class="w-100" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="4">
                            <a-form-item label="Tính từ">
                                <span>{{ timeStart ?? '---' }}</span>
                            </a-form-item>
                        </a-col>
                        <a-col :span="4">
                            <a-form-item label="Hoàn thành">
                                <span>{{ timeEnd ?? '---' }}</span>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
                <a-row>
                    <a-col :span="24">
                        Đang tính ({{ Loading.processIndex }}/{{ Loading.processTotal }}): <b v-if="DSNhanVienProcess.length > 0">[{{ DSNhanVienProcess[0]?.MaNhanVien }}] {{ DSNhanVienProcess[0]?.HoVaTenNhanVien }}</b>
                    </a-col>
                    <a-col :span="20">
                        <a-progress :percent="percentProcess" class="mb-0 w-100" />
                    </a-col>
                    <a-col :span="4">
                        <a-button block type="primary" @click="onSubmit" :disabled="!localItems.find((x) => x.IsTinhCong === true)"><uc-icon name="calculator-variant-outline" />Tính công</a-button>
                    </a-col>
                    <a-col :span="24">
                        <i>(Thao tác tính công có thể mất một vài phút!)</i>
                    </a-col>
                </a-row>
                <a-divider />
                <a-checkbox class="px-3 mb-2" v-model:checked="is_TatCa" @change="onHandleChange()"
                    ><b>Chọn tất cả ({{ localItems.filter((x) => x.IsTinhCong === true).length }} nhân sự)</b>
                </a-checkbox>
                <a-list :data-source="localItems" size="small" style="overflow-y: auto; max-height: 470px">
                    <template #renderItem="{ item }">
                        <a-list-item class="py-0" style="height: 30px">
                            <a-list-item-meta>
                                <template #title>
                                    <a-checkbox v-model:checked="item.IsTinhCong" style="margin-right: 4px" /> <span class="fw-medium">[{{ item.MaNhanVien }}] {{ item.HoVaTenNhanVien }}</span>
                                </template>
                            </a-list-item-meta>
                            <a-tag v-if="item.TrangThaiTinh === 1" color="blue"><a-spin class="me-1" size="small" />Đang tính</a-tag>
                            <a-tag v-if="item.TrangThaiTinh === 2" color="success"><uc-icon class="me-1" name="check-circle-outline" />Hoàn thành</a-tag>
                            <a-tag v-if="item.TrangThaiTinh === 4"><uc-icon class="me-1" name="alert-circle-outline" />Chưa phân ca</a-tag>
                            <a-tag v-if="item.TrangThaiTinh === 3" class="cursor-pointer" @click="onRedirectToError(item)" color="error"><uc-icon class="me-1" name="minus-circle-outline" />Lỗi</a-tag>
                        </a-list-item>
                    </template>
                </a-list>
            </a-spin>
        </uc-modal>
        <uc-modal v-model:isOpen="isOpenModalLoi" :title="titleModalLoi" :width="600" @onClose="onCloseModalLoi()" ref="refFormModalLoi">
            <a-table :columns="columnsDSLoi" :data-source="nhanVienLoi.DSLoi.slice(0, 10)" size="small" :pagination="false" />
        </uc-modal>
    </div>
</template>
<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'lichlamviecid', 'maubangcongid', 'dsnhanvien', 'thangchuky', 'namchuky', 'ctbangcong'],
    data() {
        return {
            isOpenModalLoi: false,
            cachTinh: 1,
            TuNgay: '',
            DenNgay: '',
            cachTinhArr: [
                {
                    id: 1,
                    TenCachTinh: 'Tất cả các ngày',
                },
                {
                    id: 0,
                    TenCachTinh: 'Từ ngày đến ngày',
                },
            ],
            DS_BienHeThong: [],
            DS_CongThucCong: [],
            DS_DuLieuCong: [],
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
            columnsDSLoi: [
                {
                    title: 'ID',
                    dataIndex: 'Id',
                    align: 'center',
                },
                {
                    title: 'Biến lỗi',
                    dataIndex: 'Ma',
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'GiaTri',
                    align: 'center',
                },
                {
                    title: 'Loại thuộc tính',
                    dataIndex: 'Loai',
                },

                {
                    title: 'Lỗi',
                    dataIndex: 'ErrorMessage',
                },
            ],
            arr_JSON: [],
            DinhDangNgay: '',
            DSNhanVienProcess: [],
            is_TatCa: true,
            localItems: [],
            percentProcess: 0,
            timeStart: null,
            timeEnd: null,
            spinning: false,
            delayTime: 0,
            is_break: false,
            nhanVienLoi: {
                HoVaTenNhanVien: '',
                MaNhanVien: '',
                NhanVien_Id: null,
                DSLoi: [],
            },
            DSNhanVienLoi: [],
        }
    },
    watch: {
        cachTinh: function (val) {
            if (val === 1) {
                this.TuNgay = ''
                this.DenNgay = ''
            }
        },
        isOpen: function (val) {
            if (val) {
                this.localItems = Object.assign([], this.dsnhanvien)
                this.onHandleChange()
            }
        },
    },
    created() {},
    computed: {
        Title: function () {
            return `Tính công - Chu kỳ: ${this.thangchuky}/${this.namchuky} - Lịch làm việc: ${this.ctbangcong?.TenMauBangCong}`
        },
        defaultPickerValue: function () {
            let thangNamChuKy = '01/' + this.thangchuky + '/' + this.namchuky
            this.DinhDangNgay = dayjs(thangNamChuKy, 'DD/MM/YYYY')
            return dayjs(thangNamChuKy, 'DD/MM/YYYY')
        },
        titleModalLoi: function () {
            return `Công lỗi [${this.nhanVienLoi.MaNhanVien}] ${this.nhanVienLoi.HoVaTenNhanVien}`
        },
    },
    methods: {
        onCloseModal() {
            this.Loading = Object.assign({}, this.Loading_Default)
            this.percentProcess = 0
            this.spinning = false
            this.timeStart = null
            this.timeEnd = null
            this.DSNhanVienProcess = []
            this.cachTinh = 1
            this.is_break = true
            this.$emit('onFinish')
            this.$emit('update:isOpen', false)
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
        async onSubmit() {
            const $this = this
            const { DS_BienHeThong, DS_CongThucCong_CongThuc } = await lichLamViecService.LichLamViec_TinhCong_Select_CongThuc({
                LichLamViec_Id: $this.lichlamviecid,
                MauBangCong_Id: $this.maubangcongid,
            })
            if ($this.ctbangcong.Is_ChotCong) {
                $this.Loading.IsLoadingPage = false
                $this.spinning = false
                Confirm.warning({
                    content: 'Không thể thực hiện tính công vì lịch làm việc đang ở trạng thái đã chốt công!',
                })
                // $this.$message.warning('Không thể thực hiện tính công vì lịch làm việc đang ở trạng thái đã chốt công!')
                return
            }
            $this.is_break = false
            $this.spinning = true
            $this.delayTime = 0
            $this.localItems = $this.localItems.map((x) => {
                x.TrangThaiTinh = null
                return x
            })
            $this.timeStart = null
            $this.timeEnd = null
            $this.timeStart = dayjs().format('HH:mm:ss')
            $this.Loading.processIndex = 0
            $this.percentProcess = 0
            $this.Loading.processTotal = $this.localItems.filter((x) => x.IsTinhCong === true).length
            const promise = () => {
                return new Promise(async (resolve) => {
                    const BienLoiArray = []
                    //.filter((item) => item.NhanVien_Id === 180)
                    for (var nv of $this.localItems.filter((x) => x.IsTinhCong === true)) {
                        if (this.is_break) {
                            break
                        }
                        nv.TrangThaiTinh = 1
                        $this.Loading.processIndex++
                        let nhanVienObj = { ...nv, TrangThai: 1, SoThuTu: $this.localItems.indexOf(nv) + 1, ThoiGianTinh: null }
                        $this.DSNhanVienProcess.unshift(nhanVienObj)
                        $this.Loading.text = `[${nv.MaNhanVien}] ` + `${nv.HoVaTenNhanVien}`
                        // $this.Loading.IsLoadingPage = true
                        let { DS_DuLieuCong, DS_CongThucCong } = await lichLamViecService.LichLamViec_TinhCong_Select_Formula_By_NhanVien_Id({
                            LichLamViec_Id: $this.lichlamviecid,
                            MauBangCong_Id: $this.maubangcongid,
                            NhanVien_Id: nv.NhanVien_Id,
                            Is_TatCaNgay: $this.cachTinh,
                            TuNgay: $this.TuNgay === '' ? $this.TuNgay : $this.TuNgay.format('YYYY-MM-DD'),
                            DenNgay: $this.DenNgay === '' ? $this.DenNgay : $this.DenNgay.format('YYYY-MM-DD'),
                        })

                        //data bien he thong
                        //xu ly lai cai DS_CongThucCong
                        //DS_CongThucCong_CongThuc
                        //ket hop voi DS_CongThucCong

                        if (DS_DuLieuCong.length === 0) {
                            nv.TrangThaiTinh = 4
                            $this.percentProcess = parseInt((this.Loading.processIndex / this.Loading.processTotal) * 100)
                            continue
                        }
                        DS_CongThucCong = DS_CongThucCong_CongThuc.map((x, index) => {
                            x.MauBangCong_ThuocTinh_Id === DS_CongThucCong[index]?.MauBangCong_ThuocTinh_Id
                            const slicedEntries = Object.entries(x).slice(3)
                            const result = Object.fromEntries(slicedEntries)
                            return { ...DS_CongThucCong[index], ...result }
                        })
                        $this.DS_DuLieuCong = DS_DuLieuCong
                        $this.DS_BienHeThong = DS_BienHeThong
                        $this.DS_CongThucCong = DS_CongThucCong

                        // Lấy dữ liệu
                        let dataFormula = []
                        $this.DS_BienHeThong.forEach((item) => {
                            let obj = {
                                LoaiDuLieu: item.LoaiDuLieu,
                                LoaiThuocTinh: item.LoaiThuocTinh,
                                MaThuocTinh: item.MaBien,
                                TenThuocTinh: item.TenBien,
                            }
                            for (let i = 0; i < $this.DS_DuLieuCong.length; i++) {
                                obj['CongThuc_' + i] = $this.DS_DuLieuCong[i][item.TenCot]
                                obj['GiaTri_' + i] = $this.DS_DuLieuCong[i][item.TenCot]
                                obj['LichLamViec_PhanCa_Id_' + i] = $this.DS_DuLieuCong[i].LichLamViec_PhanCa_Id
                            }
                            dataFormula.push(obj)
                        })
                        // let DS_CongThucCong_1CA = $this.DS_CongThucCong.filter((item) => item.LichLamViec_PhanCa_Id === $this.DS_DuLieuCong[0].LichLamViec_PhanCa_Id)
                        // console.log('DS_CongThucCong_1CA', DS_CongThucCong_1CA)

                        $this.DS_CongThucCong.forEach((item) => {
                            let obj = {
                                LoaiDuLieu: item.LoaiDuLieu,
                                LoaiThuocTinh: item.LoaiThuocTinh,
                                MaThuocTinh: item.MaThuocTinh,
                                TenThuocTinh: item.TenThuocTinh,
                            }
                            for (let i = 0; i < $this.DS_DuLieuCong.length; i++) {
                                obj['CongThuc_' + i] = item.CongThuc
                                obj['GiaTri_' + i] = null
                                obj['LichLamViec_PhanCa_Id_' + i] = $this.DS_DuLieuCong[i].LichLamViec_PhanCa_Id
                            }
                            dataFormula.push(obj)
                        })
                        console.log(`dataFormula trước khi tính của nhân viên ID ${nv.NhanVien_Id}, mã ${nv.MaNhanVien}, tên ${nv.HoVaTenNhanVien} `, dataFormula)
                        // Chuyển đổi index thành ký tự A, B, C,...
                        const totalRow = dataFormula.length
                        const arrColumnName = []
                        for (let i = 0; i < totalRow; i++) {
                            arrColumnName.push(this.excelColumnName(i + 1))
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
                        //Dòng thứ 5 (Định nghĩa)
                        let rowIndex = 0
                        for (let i = 0; i < $this.DS_DuLieuCong.length; i++) {
                            const definitionRow = dataFormula.map((item) => {
                                if (item.LoaiThuocTinh === 'CT' || item.LoaiThuocTinh === 'HS') {
                                    let formula = item['CongThuc_' + i]
                                    // Thay thế các Id trong công thức bằng vị trí cột tương ứng đã render
                                    dataFormula.forEach((innerItem, innerIndex) => {
                                        const id = innerItem.MaThuocTinh
                                        const colAddress = this.excelColumnName(innerIndex + 1) // Chuyển đổi số index thành ký tự A, B, C,...
                                        const regex = new RegExp(`\\b${id}\\b`, 'g') // Tạo biểu thức chính quy với \b để xác định ranh giới của từ
                                        let col_number = 7 + rowIndex
                                        formula = formula.replace(regex, colAddress + `${col_number}`)
                                    })
                                    return formula
                                } else {
                                    if (item.LoaiDuLieu == 'NUM') {
                                        return item['GiaTri_' + i] ?? 0
                                    } else if (item.LoaiDuLieu == 'TEXT') {
                                        return item['GiaTri_' + i] ?? ''
                                    }
                                }
                            })
                            dataFormula_Column.push(definitionRow)
                            dataFormula_Column.push([])
                            dataFormula_Column.push([])
                            dataFormula.forEach((item, index) => {
                                //Xử lý cột CT
                                if (dataFormula_Column[1][index] === 'CT' || dataFormula_Column[1][index] === 'HS') {
                                    const formula = dataFormula_Column[5 + rowIndex][index]
                                    try {
                                        const position = { row: 6 + rowIndex, col: index, sheet: 'Sheet1' }
                                        let result = parser.parse(formula, position)
                                        dataFormula_Column[6 + rowIndex][index] = result
                                        dataFormula.forEach((item, index) => {
                                            if (dataFormula_Column[1][index] === 'CT' || dataFormula_Column[1][index] === 'HS') {
                                                const formula = dataFormula_Column[5 + rowIndex][index]
                                                try {
                                                    const position = { row: 6 + rowIndex, col: index, sheet: 'Sheet1' }
                                                    let result = parser.parse(formula, position)
                                                    dataFormula_Column[6 + rowIndex][index] = result
                                                } catch (error) {
                                                    //Nếu công thức lỗi và có kiểu dữ liệu là NUM thì gán giá trị = -1
                                                    if (dataFormula_Column[2][index] === 'NUM') {
                                                        dataFormula_Column[6 + rowIndex][index] = -1
                                                    }
                                                    //Nếu công thức lỗi và có kiểu dữ liệu là TEXT thì gán giá trị = 'error'
                                                    else {
                                                        dataFormula_Column[6 + rowIndex][index] = 'error'
                                                    }
                                                }
                                            }
                                        })
                                    } catch (error) {
                                        //Nếu công thức lỗi và có kiểu dữ liệu là NUM thì gán giá trị = -1
                                        if (dataFormula_Column[2][index] === 'NUM') {
                                            dataFormula_Column[6 + rowIndex][index] = -1
                                        }
                                        //Nếu công thức lỗi và có kiểu dữ liệu là TEXT thì gán giá trị = 'error'
                                        else {
                                            dataFormula_Column[6 + rowIndex][index] = 'error'
                                        }
                                    }
                                    //Xử lý cột TD
                                } else if (dataFormula_Column[1][index] === 'TD') {
                                    dataFormula_Column[6 + rowIndex][index] = dataFormula_Column[5 + rowIndex][index]
                                }
                                dataFormula_Column[7 + rowIndex][index] = $this.DS_DuLieuCong[i].LichLamViec_PhanCa_Id
                            })
                            rowIndex += 3
                        }
                        let arr = []
                        let splice_formula_colunm = dataFormula_Column.slice(5, dataFormula_Column.length)
                        let LoaiMa = dataFormula_Column.slice(1, 5)
                        for (var i = 0; i < splice_formula_colunm.length; i += 3) {
                            for (var j = 0; j < splice_formula_colunm[0].length; j++) {
                                const obj = {}
                                obj.GiaTri = splice_formula_colunm[i + 1][j]
                                obj.Id = splice_formula_colunm[i + 2][j]
                                if (obj.GiaTri === -1) {
                                    obj.IsError = 1
                                } else {
                                    obj.IsError = 0
                                }
                                arr.push(obj)
                            }
                        }
                        //Xử lý tạo LichLamViec_TinhCong_JSON
                        let index = 0
                        arr = arr.map((item) => {
                            if (index >= LoaiMa[1].length) {
                                index = 0
                            }
                            item.Ma = LoaiMa[2][index]
                            index++
                            return { ...item }
                        })
                        // let arr_DSCongThucCong = arr.slice(21, arr.length)
                        let arr_DSCongThucCong = arr.slice($this.DS_BienHeThong.length, arr.length)
                        console.log(`Giá trị của biến công thức ca sau khi tính của nhân viên ID ${nv.NhanVien_Id}, mã ${nv.MaNhanVien}, tên ${nv.HoVaTenNhanVien}`, arr_DSCongThucCong)
                        arr_JSON = JSON.stringify(arr_DSCongThucCong)
                        let err = []
                        for (var item of arr_DSCongThucCong) {
                            if (item.GiaTri === -1) {
                                err.push(item.Ma)
                            }
                        }
                        let BienLoi = err.join(', ')
                        BienLoiArray.push({
                            NhanVien: nv,
                            BienLoi: BienLoi,
                        })
                        const res_insert = await lichLamViecService.LichLamViec_TinhCong_Apply_Formula_By_NhanVien_Id({
                            MauBangCong_Id: this.maubangcongid,
                            LichLamViec_Id: this.lichlamviecid,
                            LichLamViec_TinhCong_JSON: arr_JSON,
                        })
                        if (res_insert.length === 0) {
                            nv.TrangThaiTinh = 2
                        } else {
                            nv.TrangThaiTinh = 3
                            let objLoi = {}
                            objLoi.HoVaTenNhanVien = nv.HoVaTenNhanVien
                            objLoi.NhanVien_Id = nv.NhanVien_Id
                            objLoi.MaNhanVien = nv.MaNhanVien
                            objLoi.DSLoi = res_insert
                            $this.DSNhanVienLoi.push(objLoi)
                        }
                        $this.percentProcess = parseInt((this.Loading.processIndex / this.Loading.processTotal) * 100)
                    }
                    resolve()
                })
            }
            promise().then(async () => {
                $this.delayTime = 500
                $this.spinning = false
                $this.timeEnd = dayjs().format('HH:mm:ss')
            })
        },
        disabledDate(current) {
            let startOfMonth = this.DinhDangNgay.startOf('month')
            let endOfMonth = this.DinhDangNgay.endOf('month')
            return current && (current < startOfMonth || current > endOfMonth)
        },
        onHandleChange() {
            if (this.is_TatCa) {
                this.localItems = this.localItems.map((x) => {
                    x.IsTinhCong = true
                    return x
                })
            } else {
                this.localItems = this.localItems.map((x) => {
                    x.IsTinhCong = false
                    return x
                })
            }
        },
        onRedirectToError(item) {
            this.isOpenModalLoi = true
            this.nhanVienLoi = this.DSNhanVienLoi.find((x) => x.NhanVien_Id === item.NhanVien_Id)
        },
        onCloseModalLoi() {
            this.isOpenModalLoi = false
        },
    },
}
</script>
