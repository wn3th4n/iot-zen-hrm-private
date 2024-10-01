<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <span>Cấu hình cột - Chu kỳ: {{ ThongTinChuKyLuong.Thang }}/{{ ThongTinChuKyLuong.Nam }} - Bảng lương: {{ ThongTinBangLuong.TenMauBangLuong }} {{ heightTitle }}</span>
            </template>
            <template #extra>
                <a-space size="small">
                    <a-button class="py-0" size="large" @click="exportExcel" shape="circle" type="text" ghost><uc-icon class="me-0" name="microsoft-excel" color="success" size="24" /></a-button>
                    <a-button type="primary" @click="onCreate"><uc-icon name="plus" />Thêm cột</a-button>
                </a-space>
            </template>
        </a-card>
        <a-table :columns="columns" :data-source="DSCauHinhCot" :pagination="false" size="small" :scroll="{ x: 300, y: `calc(100vh - 83px)` }" class="ant-table-striped" :row-class-name="rowClassName">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'MaHeThong'">
                    <b @click="onEdit(record)" class="back-link-hover cursor-pointer">{{ record.MaHeThong }}</b>
                </template>
                <template v-else-if="column.key === 'isshow'">
                    <uc-icon v-if="!record.Is_HienThi" color="red" name="eye-off-outline" />
                </template>
                <template v-else-if="column.key === 'STT'">
                    {{ DSCauHinhCot.indexOf(record) + 1 }}
                </template>
                <template v-else-if="column.key === 'Action'">
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link"> <uc-icon name="dots-horizontal" /> </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onEdit(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                <a-menu-item @click="onDelete(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </template>
        </a-table>
        <uc-modal-add-cau-hinh-cot v-model:isOpen="isShowModalAddCot" @onFinish="loadCauHinhCot()" :DSBienHeThong="DSBienHeThong" :maubangluongid="MauBangLuong_Id" :chukyluongid="ChuKyLuong_Id" />
        <uc-modal-edit-cau-hinh-cot :record="recordCongThucLuong" v-model:isOpen="isShowModalEditCot" @onFinish="loadCauHinhCot()" :DSBienHeThong="DSBienHeThong" :maubangluongid="MauBangLuong_Id" :chukyluongid="ChuKyLuong_Id" />
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        const urlParam = new URL(window.location.href).searchParams
        const ChuKyLuong_Id = parseInt(urlParam.get('cklid'))
        const MauBangLuong_Id = parseInt(urlParam.get('mblid'))
        const element = document.getElementsByClassName('.card-title-page')
        const height = element.clientHeight
        return {
            columns: [
                {
                    title: '#',
                    dataIndex: 'ThuTu',
                    width: '50px',
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                    width: '80px',
                    fixed: 'left',
                },
                {
                    title: 'Hiển thị',
                    dataIndex: 'isshow',
                    key: 'isshow',
                    align: 'center',
                    width: '80px',
                    fixed: 'left',
                },
                {
                    title: 'Loại',
                    dataIndex: 'LoaiThuocTinh_Ten',
                    align: 'center',
                    width: '100px',
                },
                {
                    title: 'Dữ liệu',
                    dataIndex: 'LoaiDuLieu_Ten',
                    align: 'center',
                    width: '100px',
                },
                {
                    title: 'ID hệ thống',
                    dataIndex: 'MaHeThong',
                    width: '250px',
                    key: 'MaHeThong',
                },
                {
                    title: 'Mã thuộc tính',
                    dataIndex: 'MaThuocTinh',
                    width: '250px',
                },
                {
                    title: 'Tên thuộc tính',
                    dataIndex: 'TenThuocTinh',
                    width: '250px',
                },
                {
                    title: 'Công thức',
                    dataIndex: 'CongThuc',
                    width: '1400px',
                },
            ],
            DSCauHinhCot: [],
            height: height,
            ChuKyLuong_Id: isNaN(ChuKyLuong_Id) ? null : ChuKyLuong_Id,
            MauBangLuong_Id: isNaN(MauBangLuong_Id) ? null : MauBangLuong_Id,
            isShowModalAddCot: false,
            isShowModalEditCot: false,
            DSBienHeThong: {
                NhomBien: [],
                Bien: [],
                Ham: [],
            },
            ThongTinBangLuong: {},
            ThongTinChuKyLuong: {},
            recordCongThucLuong: {},
        }
    },
    mounted() {
        this.loadCauHinhCot()
        this.loadBienHeThong()
    },
    computed: {
        heightTitle: function () {
            console.log('this.height', this.height)
            return this.height
        },
    },
    watch: {},
    methods: {
        loadBienHeThong() {
            ajaxCALL('/work/CT_Bien_Select_Payroll', {}, (res) => {
                this.DSBienHeThong.NhomBien = res.data[0]
                this.DSBienHeThong.Bien = res.data[1]
                this.DSBienHeThong.Ham = res.data[2]
            })
        },
        async loadCauHinhCot() {
            const $this = this
            const { CongThucLuong, ThongTinBangLuong, ThongTinChuKyLuong } = await chuKyLuongService.ChuKyLuong_MauBangLuong_ThuocTinh_Select({
                ChuKyLuong_Id: $this.ChuKyLuong_Id,
                MauBangLuong_Id: $this.MauBangLuong_Id,
            })
            $this.DSCauHinhCot = CongThucLuong
            $this.ThongTinBangLuong = ThongTinBangLuong
            $this.ThongTinChuKyLuong = ThongTinChuKyLuong
        },
        onCreate() {
            this.isShowModalAddCot = true
        },
        onEdit(record) {
            this.isShowModalEditCot = true
            this.recordCongThucLuong = Object.assign({}, record)
            this.recordCongThucLuong.Is_HienThi = this.recordCongThucLuong.Is_HienThi ? 1 : 0
            this.recordCongThucLuong.Is_TamKhoa = this.recordCongThucLuong.Is_TamKhoa ? 1 : 0
            console.log('this.recordCongThucLuong', this.recordCongThucLuong)
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xoá cấu hình cột ' + `${record.TenThuocTinh}`,
                onOk: async () => {
                    const res = await chuKyLuongService.ChuKyLuong_MauBangLuong_ThuocTinh_Delete({
                        ChuKyLuong_MauBangLuong_ThuocTinh_Id: record.ChuKyLuong_MauBangLuong_ThuocTinh_Id,
                    })
                    if (res) {
                        this.$message.success('Xóa cấu hình cột thành công!')
                        this.loadCauHinhCot()
                    }
                },
            })
        },
        exportExcel() {
            const $this = this
            var loadScript = new Loader()
            const arr = [...this.columns.filter((x) => x.title !== '')]
            const headerCauHinhCot = [arr.map((x) => x.dataIndex)]
            const nameHeaderCauHinhCot = [arr.map((x) => x.title)]

            loadScript.require(['/include/xlsx/xlsx.full.min.js'], function () {
                writeExcelFile(
                    $this.DSCauHinhCot.map((x) => {
                        const headers = headerCauHinhCot[0]
                        const obj = {}
                        for (var header of headers) {
                            obj[header] = x[header]
                        }

                        return { ...obj }
                    }),
                    nameHeaderCauHinhCot,
                )
            })

            function writeExcelFile(data, headers) {
                var workbook = XLSX.utils.book_new()
                var worksheet = XLSX.utils.json_to_sheet(data, { origin: 'A2', skipHeader: true })
                XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' })
                XLSX.utils.book_append_sheet(workbook, worksheet, 'SheetFP')
                XLSX.writeFile(workbook, 'Danh-sach-cau-hinh-cot-mau-bang-luong.xlsx')
            }
        },
        rowClassName(record, index) {
            const isEven = index % 2 === 0
            return isEven ? 'grey' : ''
        },
    },
}
</script>
