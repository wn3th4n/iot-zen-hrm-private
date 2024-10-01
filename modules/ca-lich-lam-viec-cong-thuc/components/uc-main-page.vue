<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <b>Công thức tính công - Lịch làm việc: {{ MauBangCong_Item.TenMauBangCong }}</b>
            </template>
            <template #extra>
                <a-space>
                    <a-button class="py-0" size="large" @click="exportExcel" shape="circle" type="text" ghost><uc-icon class="me-0" name="microsoft-excel" color="success" size="24" /></a-button>
                    <a-button type="primary" @click="onCreate"><uc-icon name="plus" />Thêm thuộc tính</a-button>
                </a-space>
            </template>
        </a-card>
        <a-table :columns="columns" :data-source="DSCauHinhCot" :pagination="false" size="small" :scroll="{ x: 300, y: 'calc(100vh - 96px)' }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'MaThuocTinh'">
                    <b @click="onEdit(record)" class="back-link-hover cursor-pointer">{{ record.MaThuocTinh }}</b>
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
                <template v-else-if="column.key === 'isshow'">
                    <uc-icon v-if="!record.Is_HienThi" color="red" name="eye-off-outline" />
                </template>
                <template v-else-if="column.key === 'istheongay'">
                    <span>{{ record.Is_TheoNgay ? 'Theo ngày' : 'Theo ca' }}</span>
                </template>
            </template>
        </a-table>
        <uc-modal-add-cong-thuc v-model:isOpen="modal.isShowModalAddCot" @onFinish="onCreateFinish" :maubangcongid="MauBangCongID" :DSBienHeThong="DSBienHeThong" :DSCauHinhCot="DSCauHinhCot" :MauBangCong_Item="MauBangCong_Item" />
        <uc-modal-edit-cong-thuc :cauhinhcot="CauHinhCot_Item" v-model:isOpen="modal.isShowModalEditCot" @onFinish="onCreateFinish" :maubangcongid="MauBangCongID" :DSBienHeThong="DSBienHeThong" :MauBangCong_Item="MauBangCong_Item" />
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            modal: {
                isShowModalAddCot: false,
                isShowModalEditCot: false,
            },
            columns: [
                {
                    title: '#',
                    dataIndex: 'ThuTu',
                    width: '50px',
                    scopedSlots: { customRender: 'STT' },
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
                    width: '90px',
                    fixed: 'left',
                },
                {
                    title: 'Cách tính',
                    dataIndex: 'istheongay',
                    key: 'istheongay',
                    align: 'center',
                    width: '100px',
                },
                // {
                //     title: 'Loại',
                //     dataIndex: 'LoaiThuocTinh_Ten',
                //     width: '100px',
                //     align: 'center',
                // },
                {
                    title: 'Dữ liệu',
                    dataIndex: 'LoaiDuLieu_Ten',
                    width: '100px',
                    align: 'center',
                },
                {
                    title: 'Mã thuộc tính',
                    dataIndex: 'MaThuocTinh',
                    key: 'MaThuocTinh',
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
            MauBangCong_Item: {},
            DSCauHinhCot: [],
            CauHinhCot_Item: {},
            DSBienHeThong: {
                NhomBien: [],
                Bien: [],
            },
        }
    },
    created() {
        this.loadCauHinhCot()
    },
    mounted() {
        this.loadBienHeThong()
        this.loadMauBangCong()
    },
    computed: {
        MauBangCongID: function () {
            return parseInt(vueData.id)
        },
    },
    watch: {},
    methods: {
        onCreate() {
            this.modal.isShowModalAddCot = true
        },
        onCreateFinish() {
            this.loadCauHinhCot()
        },
        loadCauHinhCot() {
            ajaxCALL(
                '/work/CA_MauBangCong_ThuocTinh_Select',
                {
                    MauBangCong_Id: this.MauBangCongID,
                },
                (res) => {
                    this.DSCauHinhCot = res.data
                },
                (err) => {},
            )
        },
        loadBienHeThong() {
            ajaxCALL('/work/CT_Bien_Select_Calendar', {}, (res) => {
                this.DSBienHeThong.NhomBien = res.data[0]
                this.DSBienHeThong.Bien = res.data[1]
            })
        },
        onEdit(record) {
            this.modal.isShowModalEditCot = true
            this.CauHinhCot_Item = Object.assign({}, record)
            this.CauHinhCot_Item.Is_HienThi = this.CauHinhCot_Item.Is_HienThi ? 1 : 0
            this.CauHinhCot_Item.Is_TheoNgay = this.CauHinhCot_Item.Is_TheoNgay ? 1 : 0
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xoá cấu hình cột ' + `${record.TenThuocTinh}`,
                onOk: () => {
                    ajaxCALL(
                        '/work/CA_MauBangCong_ThuocTinh_Delete',
                        {
                            MauBangCong_Id: this.MauBangCongID,
                            MauBangCong_ThuocTinh_Id: record.MauBangCong_ThuocTinh_Id,
                        },
                        (res) => {
                            this.loadCauHinhCot()
                            this.$message.success('Xoá thành công!')
                        },
                        (err) => {},
                    )
                },
            })
        },
        async loadMauBangCong() {
            const res = await mauBangCongCongThucService.MauBangCong_Select_By_Id({
                MauBangCong_Id: this.MauBangCongID,
            })
            if (res) {
                this.MauBangCong_Item = res[0]
                console.log(this.MauBangCong_Item)
            }
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
                XLSX.writeFile(workbook, 'Danh-sach-thuoc-tinh-mau-bang-cong.xlsx')
            }
        },
    },
}
</script>
