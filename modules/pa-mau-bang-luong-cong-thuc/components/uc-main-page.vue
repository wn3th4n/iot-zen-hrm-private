<template>
	<uc-layout>
		<a-card class="card-title-page">
			<template #title>
				<b>Cấu hình cột - {{ MauBangLuong_Item.TenMauBangLuong }}</b>
			</template>
			<template #extra>
				<a-space size="small">
					<a-button class="py-0" size="large" @click="exportExcel" shape="circle" type="text" ghost><uc-icon
							class="me-0" name="microsoft-excel" color="success" size="24" /></a-button>
					<a-button type="primary" @click="onCreate"><uc-icon name="plus" />Thêm cột</a-button>
				</a-space>
			</template>
		</a-card>
		<a-table :columns="columns" :data-source="DSCauHinhCot" :pagination="false" size="small"
			:scroll="{ x: 300, y: 'calc(100vh - 96px)' }" class="ant-table-striped" :row-class-name="rowClassName">
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'MaThuocTinh'">
					<b @click="onEdit(record)" class="back-link-hover cursor-pointer">{{ record.MaThuocTinh }}</b>
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
								<a-menu-item @click="onEdit(record)"><uc-icon class="text-primary"
										name="square-edit-outline" />Chỉnh sửa</a-menu-item>
								<a-menu-item @click="onDelete(record)"><uc-icon class="text-red"
										name="delete-outline" />Xoá</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</template>
			</template>
		</a-table>
		<uc-modal-add-cau-hinh-cot v-model:isOpen="modal.isShowModalAddCot" @onFinish="loadCauHinhCot()"
			:maubangluong="MauBangLuong_Item" :DSBienHeThong="DSBienHeThong" :maubangluongid="MauBangLuongID" />
		<uc-modal-edit-cau-hinh-cot :cauhinhcot="CauHinhCot_Item" v-model:isOpen="modal.isShowModalEditCot"
			@onFinish="loadCauHinhCot()" :maubangluong="MauBangLuong_Item" :DSBienHeThong="DSBienHeThong" />
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
	                    dataIndex: 'STT',
	                    width: '50px',
	                    key: 'STT',
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
                        key: 'MaThuocTinh',
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
	            MauBangLuong_Item: {},
	            DSCauHinhCot: [],
	            CauHinhCot_Item: {},
	            DSBienHeThong: {
	                NhomBien: [],
	                Bien: [],
	                Ham: [],
	            },
	        }
	    },
	    created() {
	        this.loadCauHinhCot()
	    },
	    mounted() {
	        this.loadBienHeThong()
	        this.loadMauBangLuong()
	    },
	    computed: {
	        MauBangLuongID: function () {
	            return parseInt(vueData.id)
	        },
	    },
	    watch: {},
	    methods: {
	        rowClassName(record, index) {
	            const isEven = index % 2 === 0
	            return isEven ? 'grey' : ''
	        },
	        onCreate() {
	            this.modal.isShowModalAddCot = true
	        },
	        onCreateFinish() {
	            this.loadCauHinhCot()
	        },
	        loadCauHinhCot() {
	            if (this.MauBangLuongID) {
	                ajaxCALL(
	                    '/work/PA_MauBangLuong_ThuocTinh_Select',
	                    {
	                        MauBangLuong_Id: this.MauBangLuongID,
	                    },
	                    (res) => {
	                        this.DSCauHinhCot = res.data
	                    },
	                    (err) => { },
	                )
	            }
	        },
	        loadBienHeThong() {
	            ajaxCALL('/work/CT_Bien_Select_Payroll', {}, (res) => {
	                this.DSBienHeThong.NhomBien = res.data[0]
	                this.DSBienHeThong.Bien = res.data[1]
	                this.DSBienHeThong.Ham = res.data[2]
	            })
	        },
	        onEdit(record) {
	            this.modal.isShowModalEditCot = true
	            record.Is_HienThi = record.Is_HienThi ? 1 : 0
	            this.CauHinhCot_Item = Object.assign({}, record)
	        },
	        onDelete(record) {
	            Confirm.delete({
	                content: 'Xác nhận xoá cấu hình cột ' + `${record.TenThuocTinh}`,
	                onOk: () => {
	                    ajaxCALL(
	                        '/work/PA_MauBangLuong_ThuocTinh_Delete',
	                        {
	                            MauBangLuong_Id: this.MauBangLuongID,
	                            MauBangLuong_ThuocTinh_Id: record.MauBangLuong_ThuocTinh_Id,
	                        },
	                        (res) => {
	                            this.loadCauHinhCot()
	                            this.$message.success('Xoá thành công!')
	                        },
	                        (err) => { },
	                    )
	                },
	            })
	        },
	        async loadMauBangLuong() {
	            const res = await mauBangLuongCongThucService.MauBangLuong_Select_By_Id({
	                MauBangLuong_Id: this.MauBangLuongID,
	            })
	            if (res) {
	                this.MauBangLuong_Item = res[0]
	                console.log(this.MauBangLuong_Item)
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
                XLSX.writeFile(workbook, 'Danh-sach-cau-hinh-cot-mau-bang-luong.xlsx')
            }
        },
    },
}
</script>