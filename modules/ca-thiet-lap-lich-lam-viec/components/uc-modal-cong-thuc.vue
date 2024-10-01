<template>
	<uc-form-modal v-model="value.IsShowModalCongThuc" isFullScreen :title="Title" :width="1600" :isHasFooter="null">
		<a-table :columns="columns" :data-source="DSCauHinhCot" :pagination="false" size="small" bordered
			:scroll="{ x: 300, y: 'calc(100vh - 192px)' }">
			<template #title>
				<div class="d-flex justify-space-between">
					<h3>Cấu hình cột</h3>
					<a-button type="primary" @click="onCreate"><uc-icon name="plus" />Thêm</a-button>
				</div>
			</template>
			<template slot="MaHeThong" slot-scope="text,record">
				<span class="success--text">{{ record.MaHeThong }}</span>
			</template>
			<template slot="Action" slot-scope="text, record">
				<a-space size="small">
					<a-icon @click="onEdit(record)" type="form" style="color:#1890ff" />
					<a-icon type="delete" @click="onDelete(record)" :style="{ color: 'red' }" />
				</a-space>
			</template>
			<template slot="isshow" slot-scope="text,record">
				<a-space size="small">
					<a-icon v-if="record.Is_HienThi" type="eye" />
					<a-icon v-else type="eye-invisible" />
				</a-space>
			</template>
			<template slot="istheongay" slot-scope="text,record">
				<span>{{ record.Is_TheoNgay ? "Theo ca" : "Theo ngày" }}</span>
			</template>
		</a-table>
		<uc-modal-add-cong-thuc :action="modal" @onCreateFinish="onCreateFinish" :maubangluong="MauBangCong_Item"
			:DSBienHeThong="DSBienHeThong" />
		<uc-modal-edit-cong-thuc :cauhinhcot="CauHinhCot_Item" :action="modal" @onCreateFinish="onCreateFinish"
			:maubangluong="MauBangCong_Item" :DSBienHeThong="DSBienHeThong" />
	</uc-form-modal>
</template>

<script>
export default {
	props: ["value", "recordmaubangcong"],
	data() {
		return {
			modal: {
				isShowModalAddCot: false,
				isShowModalEditCot: false
			},
			columns: [
				{
					title: "#",
					dataIndex: "ThuTu",
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
				{
					title: "Công thức",
					dataIndex: "istheongay",
					scopedSlots: { customRender: 'istheongay' },
					align: "center",
					width: "150px",
					fixed: "right"
				},
				{
					title: "Hiển thị",
					dataIndex: "isshow",
					scopedSlots: { customRender: 'isshow' },
					align: "center",
					width: "70px",
					fixed: "right"
				},

			],
			MauBangCong_Item: {},
			DSCauHinhCot: [],
			CauHinhCot_Item: {},
			DSBienHeThong: {
				Nhom_OfBien: [],
				Bien_ByNhom: [],
			}
		}
	},
	mounted() {
		this.loadBienHeThong()
	},
	computed: {
		Title: function () {
			return `Cấu hình cột`
		}
	},
	watch: {
		"value.IsShowModalCongThuc": function (val) {
			!val || this.loadCauHinhCot()
		}
	},
	methods: {
		onCreate() {
			this.modal.isShowModalAddCot = true
			this.MauBangCong_Item = this.recordmaubangcong
		},
		onCreateFinish() {
			this.loadCauHinhCot()
		},
		loadCauHinhCot() {
			ajaxCALL("/work/CA_MauBangCong_ThuocTinh_Select", {
				MauBangCong_Id: this.recordmaubangcong.MauBangCong_Id
			}, res => {
				this.DSCauHinhCot = res.data
			}, err => {

			})
		},
		loadBienHeThong() {
			ajaxCALL("/work/CT_Bien_Select_Calendar", {}, res => {
				this.DSBienHeThong.Nhom_OfBien = res.data[0]
				this.DSBienHeThong.Bien_ByNhom = res.data[1]
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
					ajaxCALL("/work/CA_MauBangCong_ThuocTinh_Delete", {
						MauBangCong_Id: this.recordmaubangcong.MauBangCong_Id,
						MauBangCong_ThuocTinh_Id: record.MauBangCong_ThuocTinh_Id
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