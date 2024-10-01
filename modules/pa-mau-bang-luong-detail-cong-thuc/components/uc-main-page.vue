<template>
	<uc-layout titlePage="Cấu hình cột của chu kỳ .....">
		<template v-slot:rightHeader>
		<a-space>
			<a-button icon="plus" type="primary" @click="onCreate">Thêm</a-button>
		</a-space>
	</template>
		<a-table :columns="columns" :data-source="DSCauHinhCot" :pagination="false" size="small"
			:scroll="{ x: 300, y: 'calc(100vh - 91px)' }" :rowClassName="rowClassName">
			<template slot="MaHeThong" slot-scope="text,record">
				<span class="text-primary">{{ record.MaHeThong }}</span>
			</template>
			<template slot="STT" slot-scope="text,record">
				<span class="font-weight-medium">{{ DSCauHinhCot.indexOf(record) + 1 }}</span>
			</template>
			<template slot="Action" slot-scope="text, record">
					<a-dropdown>
						<a class="ant-dropdown-link">
							<a-icon type="appstore" />
						</a>
						<a-menu slot="overlay">
							<a-menu-item @click="onEdit(record)"><a-icon type="form" 
									style="color:#1890ff" />Chỉnh
								sửa</a-menu-item>
							<a-menu-item @click="onDelete(record)"><a-icon type="delete"
									style="color:red" />Xoá</a-menu-item>
						</a-menu>
					</a-dropdown>
			</template>
			<template slot="isshow" slot-scope="text,record">
				<a-space size="small">
					<a-icon v-if="record.Is_HienThi" type="eye" />
					<a-icon v-else type="eye-invisible" />
				</a-space>
			</template>
		</a-table>
		<uc-modal-add-cau-hinh-cot :action="modal" @onCreateFinish="onCreateFinish"
			:maubangluong="MauBangLuong_Item" :DSBienHeThong="DSBienHeThong" :maubangluongid="MauBangLuongID"/>
		<uc-modal-edit-cau-hinh-cot :cauhinhcot="CauHinhCot_Item" :action="modal" @onCreateFinish="onCreateFinish"
			:maubangluong="MauBangLuong_Item" :DSBienHeThong="DSBienHeThong" />
	</uc-layout>
</template>

<script>
export default {
props: [],
data() {
	return {
		modal: {
			isShowModalAddCot: false,
			isShowModalEditCot: false
		},
		columns: [
			{
				title: "#",
				dataIndex: "STT",
				width: "50px",
				scopedSlots: { customRender: 'STT' },
				align: "center",
				fixed: "left"
			},
			{
				title: "Thao tác",
				dataIndex: "Action",
				scopedSlots: { customRender: 'Action' },
				align: "center",
				width: "80px",
				fixed: "left"
			},
			{
				title: "ID hệ thống",
				dataIndex: "MaHeThong",
				width: "250px",
				scopedSlots: { customRender: 'MaHeThong' },
				fixed: "left"
			},
			{
				title: "Hiển thị",
				dataIndex: "isshow",
				scopedSlots: { customRender: 'isshow' },
				align: "center",
				width: "70px",
				fixed: "left"
			},
			{
				title: "Loại",
				dataIndex: "LoaiThuocTinh_Ten",
				width: "100px"
			},
			{
				title: "Loại dữ liệu",
				dataIndex: "LoaiDuLieu_Ten",
				width: "100px"
			},
			{
				title: "Tên thuộc tính",
				dataIndex: "TenThuocTinh",
				width: "150px"

			},
			{
				title: "Mã thuộc tính",
				dataIndex: "MaThuocTinh",
				width: "200px"
			},
			{
				title: "Công thức",
				dataIndex: "CongThuc",
				width: "1400px"
			},
			{
				title: "Mô tả",
				dataIndex: "MoTa",
				width: "250px"
			},
			

		],
		MauBangLuong_Item: {},
		DSCauHinhCot: [],
		CauHinhCot_Item: {},
		DSBienHeThong: {
			Nhom_OfBien: [],
			Bien_ByNhom: [],
			Ham: []
		}
	}
},
created() {
	this.loadCauHinhCot()
},
mounted() {
	this.loadBienHeThong()
},
computed: {
	MauBangLuongID: function () {
		return parseInt(vueData.id)
	},
},
watch: {
},
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
		ajaxCALL("/work/PA_MauBangLuong_ThuocTinh_Select", {
			MauBangLuong_Id: this.MauBangLuongID
		}, res => {
			this.DSCauHinhCot = res.data
		}, err => {

		})
	},
	loadBienHeThong() {
		ajaxCALL("/work/CT_Bien_Select_Payroll", {}, res => {
			this.DSBienHeThong.Nhom_OfBien = res.data[0]
			this.DSBienHeThong.Bien_ByNhom = res.data[1]
			this.DSBienHeThong.Ham = res.data[2]
		})
	},
	onEdit(record) {
		this.modal.isShowModalEditCot = true
		this.CauHinhCot_Item = Object.assign({}, record)
	},
	onDelete(record) {
		Confirm.delete({
			content: "Xác nhận xoá cấu hình cột " + `${record.TenThuocTinh}`,
			onOk: () => {
				ajaxCALL("/work/PA_MauBangLuong_ThuocTinh_Delete", {
					MauBangLuong_Id: this.MauBangLuongID,
					MauBangLuong_ThuocTinh_Id: record.MauBangLuong_ThuocTinh_Id
				}, res => {
					this.loadCauHinhCot()
					this.$message.success("Xoá thành công!")
				}, err => {

				})
			}
		})
	}
},
}
</script>