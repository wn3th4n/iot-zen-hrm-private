<template>
	<uc-form-modal :rules="rules" :formData="formData" :isOpen="isOpen" title="Thêm hợp đồng mới" :width="600"
		:isSubmit="state.isLoadingModal" ref="modalRef" @onClose="onCancel()" @onSubmit="onSubmit()">
		<a-row :gutter="[10]">
			<a-col :sm="12" :md="12">
				<a-form-item label="Chọn nhân sự" name="NhanVien_Id">
					<uc-select-nhan-vien v-model:value="formData.NhanVien_Id" />
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Chọn loại hợp đồng" name="LoaiHopDong_Id">
					<a-select v-model:value="formData.LoaiHopDong_Id"
						:options="LoaiHopDongList.map(item => ({value: item.LoaiHopDong_Id, label: item.TenLoaiHopDong}))">
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Hợp đồng" name="Is_HopDong_HienTai">
					<a-select v-model:value="formData.Is_HopDong_HienTai">
						<a-select-option :value="0">Hợp đồng hiện tại hoặc tương lai</a-select-option>
						<a-select-option :value="1">Hợp đồng đã qua</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Hợp đồng thử việc?" name="Is_HopDong_ThuViec">
					<a-select v-model:value="formData.Is_HopDong_ThuViec">
						<a-select-option :value="0">Hợp đồng thử việc</a-select-option>
						<a-select-option :value="1">Hợp đồng tiêu chuẩn</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :sm="8" :md="8">
				<a-form-item label="Ngày bắt đầu" name="NgayBatDau">
					<a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayBatDau" class="w-100"
						:allowClear="false"> </a-date-picker>
				</a-form-item>
			</a-col>
			<a-col :sm="8" :md="8">
				<a-form-item label="Ngày kết thúc" name="NgayKetThuc">
					<a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayKetThuc" class="w-100"
						:allowClear="false"> </a-date-picker>
				</a-form-item>
			</a-col>
			<a-col :sm="8" :md="8">
				<a-form-item label="Trạng thái hợp đồng" name="TrangThai_HopDong">
					<a-select v-model:value="formData.TrangThai_HopDong">
						<a-select-option :value="0">Đang xử lý</a-select-option>
						<a-select-option :value="1">Đã ký</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :sm="8" :md="8">
				<a-form-item label="Mã hợp đồng" name="MaHopDong">
					<a-input v-model:value="formData.MaHopDong" />
				</a-form-item>
			</a-col>
			
			<a-col :sm="16" :md="16">
				<a-form-item label="Gửi thông báo cho nhân sự qua email" name="TrangThai_ThongBao">
					<a-select v-model:value="formData.TrangThai_ThongBao">
						<a-select-option :value="1">Không gửi email</a-select-option>
						<a-select-option :value="2">Gửi email cho nhân sự không kèm chi tiết hợp đồng</a-select-option>
						<a-select-option :value="3">Gửi email cho nhân sự kèm chi tiết hợp đồng</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>

			<div v-if="formData.LoaiHopDong_Id">
				<h3>Trường dữ liệu</h3>
				<a-row :gutter="[10]" v-for="(item, index) in formData.DuLieuList" :key="index">
					<a-col :sm="24" :md="24">
						<a-form-item :label="item.TenTruongDuLieu" class="w-100">
							<a-input v-model:value="formData.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'TEXT'" />
							<!-- Chỉ cho phép số nguyên -->
							<a-input-number v-model:value="formData.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'INT'" :step="1" />
							<!-- Chỉ cho phép số thập phân -->
							<a-input-number v-model:value="formData.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'FLOAT'" :step="0.01" />
							<a-date-picker v-model:value="formData.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'DATE'" format="DD/MM/YYYY" />
							<a-date-picker v-model:value="formData.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'DATETIME'" :minuteStep="5" showTime
								format="DD/MM/YYYY HH:mm" />
							<!-- Select đơn -->
							<a-select v-model:value="formData.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'SELECT'"
								:options="item.value.map(option => ({ value: option, label: option }))" />

							<!-- Select nhiều -->
							<a-select v-model:value="formData.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'SELECT_M'" mode="multiple"
								:options="item.value.map(option => ({ value: option, label: option }))" />

							<a-checkbox v-model:value="formData.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'CHECKBOX'">{{item.MoTa}}</a-checkbox>

							<a-textarea v-model:value="formData.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'TEXTAREA'" />
						</a-form-item>
					</a-col>
				</a-row>
			</div>

			<a-col :sm="24" :md="24">
				<a-form-item label="File đính kèm" name="File_DinhKem">
					<uc-file-upload v-model="formData.File_DinhKem" :multiple="false" title="Upload File" />
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="24">
				<a-form-item label="Chi tiết hợp đồng và các yêu cầu khác" name="MoTa">
					<a-textarea v-model:value="formData.MoTa" />
				</a-form-item>
			</a-col>

			<a-col :sm="24" :md="8">
				<a-form-item label="Bậc lương" name="BacLuong_Id">
					<uc-select-bac-luong v-model:value="formData.BacLuong_Id" />
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="8">
				<a-form-item label="Bậc thưởng" name="BacThuong_Id">
					<uc-select-bac-thuong v-model:value="formData.BacThuong_Id" />
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="12">
				<a-form-item label="Lương cơ bản" name="LuongCoBan">
					<a-input-number v-model:value="formData.LuongCoBan" :formatter="formatter" :parser="parser"
						class="w-100" />
				</a-form-item>
			</a-col>
		</a-row>


	</uc-form-modal>
</template>

<script>
	export default {
		emits: ['update:isOpen'],
		props: ['isOpen', 'record', 'loaihopdonglist'],
		data() {
			return {
				state: {
					isLoadingModal: false,
				},
				formData: {
					NhanVien_Id: null,
					LoaiHopDong_Id: null,
					Is_HopDong_HienTai: null,
					Is_HopDong_ThuViec: null,
					NgayBatDau: null,
					NgayKetThuc: null,
					MaHopDong: null,
					TrangThai_HopDong: null,
					TrangThai_ThongBao: null,
					File_DinhKem: [],
					DuLieuList: [],
					DataDuLieuList: [],
					MoTa: null,
					Is_XuLy_FileMau: null,
					Is_ThongBao_NguoiLienQuan: null,
					BacLuong_Id: null,
					BacThuong_Id: null,
					LuongCoBan: null,
				},
				rules: {},
			}
		},
		mounted() { },
		computed: {
			LoaiHopDongList: function () {
				return this.loaihopdonglist
			}
		},
		watch: {
			"formData.LoaiHopDong_Id": function (val) {
				if (val) {
					this.onLoadDuLieu(val)
				}
			}
		},
		methods: {
			async onLoadDuLieu(id) {
				const param = {
					LoaiHopDong_Id: id
				}
	
				const isSelect = await loaiHopDongLoaiDuLieuService.LoaiHopDong_TruongDuLieu_Select(param)
				if (isSelect) {
					this.formData.DuLieuList = isSelect.map(item => {
						return {
							...item,
							value: item.KieuDuLieu === 'SELECT' || item.KieuDuLieu === 'SELECT_M' ? this.strToArr(item.LuaChon_List) :
								item.LuaChon_List
						}
					})
					this.formData.DuLieuList.forEach(item => {
						const obj = {
							LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
							GiaTri: null,
							KieuDuLieu: item.KieuDuLieu,
						}
						this.formData.DataDuLieuList.push(obj)
					})
					console.log("this.formData.DuLieuList", this.formData.DuLieuList)
					console.log("clone array", this.formData.DataDuLieuList)
				} else {
					console.log("Fail to load du lieu")
				}
			},
			strToArr(str) {
				return str.split(',').map((item) => item.trim())
			},
			onCancel() {
				this.$emit('update:isOpen', false)
				this.$refs.modalRef.$refs.formRef.resetFields()
			},
			async onSubmit() {
				const ngayBatDau = this.formData.NgayBatDau?.format("YYYY-MM-DD")
				const ngayKetThuc = this.formData.NgayKetThuc?.format("YYYY-MM-DD")
				console.log("formdata", this.formData)
				console.log("binding data", this.formData.DataDuLieuList)
	
				const apiData = []
				this.formData.DataDuLieuList.forEach(item => {
					const obj = {
						LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
						GiaTri: item.GiaTri && (item.KieuDuLieu === 'DATE') ? item.GiaTri.format("YYYY-MM-DD") : item.GiaTri && item.KieuDuLieu === 'DATETIME' ?
							item.GiaTri?.format("YYYY-MM-DD HH:mm") : item.GiaTri
					}
					apiData.push(obj)
				})
	
				const param = {
					NhanVien_Id: this.formData.NhanVien_Id,
					LoaiHopDong_Id: this.formData.LoaiHopDong_Id,
					Is_HopDongThuViec: this.formData.Is_HopDong_ThuViec,
					Is_HopDongDaQua: this.formData.Is_HopDong_HienTai,
					NgayBatDau: ngayBatDau,
					NgayKetThuc: ngayKetThuc,
					MaHopDong: this.formData.MaHopDong,
					Is_DaKy: this.formData.TrangThai_HopDong,
					LoaiGuiEmail: this.formData.TrangThai_ThongBao,
					File_Id: this.formData.File_DinhKem[0]?.uid,
					MoTa: this.formData.MoTa,
					LuongCoBan: this.formData.LuongCoBan,
					BacLuong_Id: this.formData.BacLuong_Id,
					BacThuong_Id: this.formData.BacThuong_Id,
					TruongDuLieu_JSON: apiData
				}
	
				console.log("param", param)
	
				const reps = await nhanVienService.NhanVien_HopDong_Insert(param).finally(() => this.state.isLoadingModal = false)
	
				if (reps) {
					this.onCancel()
					this.$message.success("Thêm hợp đồng thành công")
					this.$emit('onFinish')
				}
			},
			formatter(value) {
				return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			},
			parser(value) {
				return value.replace(/\$\s?|(,*)/g, '')
			},
		},
	}
</script>