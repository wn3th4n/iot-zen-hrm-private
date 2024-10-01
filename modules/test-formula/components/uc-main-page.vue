<template>
    <uc-layout>
        <a-card title="Tool công thức" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <uc-select-chu-ky-lich v-model:value="filter.LichLamViec_Id" />
                    <uc-select-mau-bang-cong v-model:value="filter.MauBangCong_Id" />
                    <uc-select-nhan-vien v-model:value="filter.NhanVien_Id" :initData="[{ value: filter.NhanVien_Id, text: filter.TenNhanVien }]" />
                    <a-date-picker v-model:value="filter.NgayThangNam" format="DD/MM/YYYY" />
                    <a-button type="primary" @click="getData()"><uc-icon name="calculator-variant" />Thực hiện</a-button>
                </a-space>
            </template>
        </a-card>
        <a-card title="INPUT: Dữ liệu của ca" size="small">
            {{ DS_DuLieuCong }}
        </a-card>
        <a-card title="OUTPUT: Kết quả tính toán" size="small">
            <a-table :dataSource="dataTable" :scroll="{ x: 'max-content' }" :columns="columnTable" size="small" :pagination="false" />
        </a-card>
    </uc-layout>
</template>
<script>
export default {
    props: [],
    data() {
        return {
            columnTable: [],
            dataTable: [],
            filter: {
                LichLamViec_Id: 2,
                MauBangCong_Id: 32,
                NhanVien_Id: 1,
                TenNhanVien: 'CT001 - Nguyễn Kim Cúc',
                NgayThangNam: dayjs('2024-07-01'),
            },
            DS_DuLieuCong: [],
            DS_BienHeThong: [],
            DS_CongThucCong: [],
            dtFormulaResult: [],
        }
    },
    mounted() {},
    methods: {
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
        getData() {
            const $this = this
            if ($this.filter?.LichLamViec_Id === null) {
                $this.$message.error('Vui lòng chọn chu kỳ lịch')
                return
            }
            if ($this.filter?.MauBangCong_Id === null) {
                $this.$message.error('Vui lòng chọn mẫu bảng công')
                return
            }
            if ($this.filter?.NhanVien_Id === null) {
                $this.$message.error('Vui lòng chọn nhân viên')
                return
            }
            if ($this.filter?.NgayThangNam === null) {
                $this.$message.error('Vui lòng chọn ngày')
                return
            }
            ajaxCALL(
                '/work/CA_LichLamViec_TinhCong_Test',
                {
                    LichLamViec_Id: $this.filter?.LichLamViec_Id,
                    MauBangCong_Id: $this.filter?.MauBangCong_Id,
                    NhanVien_Id: $this.filter?.NhanVien_Id,
                    NgayThangNam: dayjs($this.filter?.NgayThangNam, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                },
                (res) => {
                    this.DS_DuLieuCong = res.data[0][0]
                    this.DS_BienHeThong = res.data[1]
                    this.DS_CongThucCong = res.data[2]
                    if (!res.data[0][0]) {
                        $this.$message.error('Không tìm thấy dữ liệu ca')
                        return
                    }
                    // Lấy dữ liệu
                    const dataFormula = []
                    this.DS_BienHeThong.forEach((item) => {
                        dataFormula.push({
                            LoaiDuLieu: item.LoaiDuLieu,
                            LoaiThuocTinh: item.LoaiThuocTinh,
                            MaThuocTinh: item.MaBien,
                            TenThuocTinh: item.TenBien,
                            CongThuc: this.DS_DuLieuCong[item.TenCot],
                            GiaTri: this.DS_DuLieuCong[item.TenCot],
                        })
                    })
                    this.DS_CongThucCong.forEach((item) => {
                        dataFormula.push({
                            LoaiDuLieu: item.LoaiDuLieu,
                            LoaiThuocTinh: item.LoaiThuocTinh,
                            MaThuocTinh: item.MaThuocTinh,
                            TenThuocTinh: item.TenThuocTinh,
                            CongThuc: item.CongThuc,
                            GiaTri: null,
                        })
                    })

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
                    const MAX_ROW = 1000
                    const MAX_COLUMN = 200

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

                    // Dòng thứ 5 (Định nghĩa)
                    const definitionRow = dataFormula.map((item) => {
                        if (item.LoaiThuocTinh === 'CT') {
                            let formula = item.CongThuc
                            // Thay thế các Id trong công thức bằng vị trí cột tương ứng đã render
                            dataFormula.forEach((innerItem, innerIndex) => {
                                const id = innerItem.MaThuocTinh
                                const colAddress = this.excelColumnName(innerIndex + 1) // Chuyển đổi số index thành ký tự A, B, C,...
                                //formula = formula.replace(new RegExp(id, 'g'), colAddress +'5');
                                const regex = new RegExp(`\\b${id}\\b`, 'g') // Tạo biểu thức chính quy với \b để xác định ranh giới của từ
                                formula = formula.replace(regex, colAddress + '7')
                            })
                            return formula
                        } else {
                            if (item.LoaiDuLieu == 'NUM') {
                                //return parseFloat(item.GiaTri ?? 0)
                                return item.GiaTri
                            } else if (item.LoaiDuLieu == 'TEXT') {
                                return item.GiaTri
                            }
                        }
                    })
                    dataFormula_Column.push(definitionRow)
                    dataFormula_Column.push([])

                    //Xử lý cột TD
                    dataFormula.forEach((item, index) => {
                        if (dataFormula_Column[1][index] === 'TD') {
                            dataFormula_Column[6][index] = dataFormula_Column[5][index]
                        }
                    })
                    //Xử lý cột CT
                    dataFormula.forEach((item, index) => {
                        if (dataFormula_Column[1][index] === 'CT') {
                            const formula = dataFormula_Column[5][index]
                            try {
                                const position = { row: 6, col: index, sheet: 'Sheet1' }
                                let result = parser.parse(formula, position)

                                dataFormula_Column[6][index] = result // Chuyển kết quả thành chuỗi và lưu vào dòng 5
                                dataFormula.forEach((item, index) => {
                                    if (dataFormula_Column[1][index] === 'CT') {
                                        const formula = dataFormula_Column[5][index]
                                        try {
                                            const position = { row: 6, col: index, sheet: 'Sheet1' }
                                            let result = parser.parse(formula, position)
                                            dataFormula_Column[6][index] = result // Chuyển kết quả thành chuỗi và lưu vào dòng 5
                                        } catch (error) {
                                            dataFormula_Column[6][index] = JSON.stringify(error) // Nếu có lỗi, đưa ra dòng "#ERROR!"
                                        }
                                    }
                                })
                            } catch (error) {
                                dataFormula_Column[6][index] = JSON.stringify(error) // Nếu có lỗi, đưa ra dòng "#ERROR!"
                            }
                        }
                    })
                    console.log('dataFormula_Column', dataFormula_Column)
                    const dataTableRow_1 = {}
                    const dataTableRow_2 = {}
                    const dataTableRow_3 = {}
                    const dataTableRow_4 = {}
                    const dataTableRow_5 = {}
                    const dataTableRow_6 = {}
                    dataFormula_Column[0].forEach((item, index) => {
                        this.columnTable.push({
                            title: item,
                            dataIndex: item,
                            key: item,
                        })
                        dataTableRow_1[item] = dataFormula_Column[1][index]
                        dataTableRow_2[item] = dataFormula_Column[2][index]
                        dataTableRow_3[item] = dataFormula_Column[3][index]
                        dataTableRow_4[item] = dataFormula_Column[4][index]
                        dataTableRow_5[item] = dataFormula_Column[5][index]
                        dataTableRow_6[item] = dataFormula_Column[6][index]
                    })
                    this.dataTable.push(dataTableRow_1)
                    this.dataTable.push(dataTableRow_2)
                    this.dataTable.push(dataTableRow_3)
                    this.dataTable.push(dataTableRow_4)
                    this.dataTable.push(dataTableRow_5)
                    this.dataTable.push(dataTableRow_6)
                },
            )
        },
    },
}
</script>
