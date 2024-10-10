<template>
	<uc-form-modal :rules="rules" :value="record" :isOpen="isOpen" title="Cập nhật hợp đồng" :width="600"
		:isSubmit="state.isLoadingModal" ref="modalRef" @onClose="onCancel()" @onSubmit="onSubmit()">
		<a-row :gutter="[10]">
			<a-col :sm="12" :md="12">
				<a-form-item label="Chọn nhân sự" name="NhanVien_HopDong_Id">
					<uc-select-nhan-vien v-model:value="value.HopDongInfo.NhanVien_HopDong_Id"
						:initData="[{ text: value.HopDongInfo.MaNhanVien +' - ' + value.HopDongInfo.HoVaTenNhanVien, value: value.HopDongInfo.NhanVien_HopDong_Id }]" />
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Chọn loại hợp đồng" name="LoaiHopDong_Id">
					<a-select v-model:value="value.HopDongInfo.LoaiHopDong_Id"
						:options="LoaiHopDongList.map(item => ({value: item.LoaiHopDong_Id, label: item.TenLoaiHopDong}))">
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Hợp đồng" name="Is_HopDongDaQua">
					<a-select v-model:value="value.HopDongInfo.Is_HopDongDaQua">
						<a-select-option :value="0">Hợp đồng hiện tại hoặc tương lai</a-select-option>
						<a-select-option :value="1">Hợp đồng đã qua</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :sm="12" :md="12">
				<a-form-item label="Hợp đồng thử việc?" name="Is_HopDongThuViec">
					<a-select v-model:value="value.HopDongInfo.Is_HopDongThuViec">
						<a-select-option :value="0">Hợp đồng thử việc</a-select-option>
						<a-select-option :value="1">Hợp đồng tiêu chuẩn</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>

			<a-col :sm="8" :md="8">
				<a-form-item label="Ngày bắt đầu" name="NgayBatDau_HienThi">
					<a-date-picker format="DD/MM/YYYY" v-model:value="value.HopDongInfo.NgayBatDau_HienThi"
						class="w-100" :allowClear="false"> </a-date-picker>
				</a-form-item>
			</a-col>
			<a-col :sm="8" :md="8">
				<a-form-item label="Ngày kết thúc" name="NgayKetThuc_HienThi">
					<a-date-picker format="DD/MM/YYYY" v-model:value="value.HopDongInfo.NgayKetThuc_HienThi"
						class="w-100" :allowClear="false"> </a-date-picker>
				</a-form-item>
			</a-col>
			<a-col :sm="8" :md="8">
				<a-form-item label="Trạng thái hợp đồng" name="Is_DaKy">
					<a-select v-model:value="value.HopDongInfo.Is_DaKy">
						<a-select-option :value="0">Đang xử lý</a-select-option>
						<a-select-option :value="1">Đã ký</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>

			<a-col :sm="8" :md="8">
				<a-form-item label="Mã hợp đồng" name="MaHopDong">
					<a-input v-model:value="value.HopDongInfo.MaHopDong" />
				</a-form-item>
			</a-col>

			<a-col :sm="16" :md="16">
				<a-form-item label="Gửi thông báo cho nhân sự qua email" name="LoaiGuiEmail">
					<a-select v-model:value="value.HopDongInfo.LoaiGuiEmail">
						<a-select-option :value="1">Không gửi email</a-select-option>
						<a-select-option :value="2">Gửi email cho nhân sự không kèm chi tiết hợp đồng</a-select-option>
						<a-select-option :value="3">Gửi email cho nhân sự kèm chi tiết hợp đồng</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>

			<!-- gen truong du lieu -->
			<div v-if="value.HopDongInfo.LoaiHopDong_Id">
				<h3>Trường dữ liệu</h3>
				<a-row :gutter="[10]" v-for="(item, index) in value.DuLieuHDList" :key="index">
					<a-col :sm="24" :md="24">
						<a-form-item :label="item.TenTruongDuLieu" class="w-100">
							<a-input v-model:value="value.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'TEXT'" />
							<!-- Chỉ cho phép số nguyên -->
							<a-input-number v-model:value="value.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'INT'" :step="1" />
							<!-- Chỉ cho phép số thập phân -->
							<a-input-number v-model:value="value.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'FLOAT'" :step="0.01" />

							<a-date-picker v-model:value="value.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'DATE'" format="DD/MM/YYYY" />
							<a-date-picker v-model:value="value.DataDuLieuList[index].GiaTri" class="w-100"
								v-if="item.KieuDuLieu === 'DATETIME'" :minuteStep="5" showTime
								format="DD/MM/YYYY HH:mm" />

							<!-- Select đơn -->
							<a-select v-model:value="value.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'SELECT'"
								:options="item.value.map(option => ({ value: option, label: option }))" />

							<!-- Select nhiều -->
							<a-select v-model:value="value.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'SELECT_M'" mode="multiple"
								:options="item.value.map(option => ({ value: option, label: option }))" />

							<a-checkbox v-model:value="value.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'CHECKBOX'">
								{{item.MoTa}}</a-checkbox>

							<a-textarea v-model:value="value.DataDuLieuList[index].GiaTri"
								v-if="item.KieuDuLieu === 'TEXTAREA'" />
						</a-form-item>
					</a-col>
				</a-row>
			</div>

			<a-col :sm="24" :md="24">
				<a-form-item label="File đính kèm" name="fileList">
					<uc-file-upload v-model="fileList" :multiple="false" title="Upload File" />
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="24">
				<a-form-item label="Chi tiết hợp đồng và các yêu cầu khác" name="MoTa">
					<a-textarea v-model:value="value.HopDongInfo.MoTa" />
				</a-form-item>
			</a-col>

			<a-col :sm="24" :md="8">
				<a-form-item label="Bậc lương" name="BacLuong_Id">
					<uc-select-bac-luong v-model:value="value.HopDongInfo.BacLuong_Id"
						:initData="[{ text: value.HopDongInfo.BacLuong_Id +' - ' + value.HopDongInfo.TenBacLuong, value: value.HopDongInfo.BacLuong_Id }]" />
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="8">
				<a-form-item label="Bậc thưởng" name="BacThuong_Id">
					<uc-select-bac-thuong v-model:value="value.HopDongInfo.BacThuong_Id"
						:initData="[{ text: value.HopDongInfo.BacThuong_Id +' - ' + value.HopDongInfo.TenBacThuong, value: value.HopDongInfo.BacThuong_Id }]" />
				</a-form-item>
			</a-col>
			<a-col :sm="24" :md="12">
				<a-form-item label="Lương cơ bản" name="LuongCoBan">
					<a-input-number v-model:value="value.HopDongInfo.LuongCoBan" :formatter="formatter" :parser="parser"
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
				value: {
					DuLieuList: [],
					DuLieuHDList: [],
					DataDuLieuList: [],
					RootDataDLList: [],
					HopDongInfo: {},
					RootLoaiHopDong_Id: null,
				},
				fileList: [],
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
			record: function (val) {
				if (val) {
					this.record.Is_DaKy = val.Is_DaKy ? 1 : 0
					this.record.Is_HopDongDaQua = val.Is_HopDongDaQua ? 1 : 0
					this.record.Is_HopDongThuViec = val.Is_HopDongThuViec ? 1 : 0
	
					this.record.NgayBatDau = dayjs(this.record.NgayBatDau, "DD/MM/YYYY")
					this.record.NgayKetThuc = dayjs(this.record.NgayKetThuc, "DD/MM/YYYY")
	
					this.onLoadNhanVienHD(val.NhanVien_HopDong_Id)
	
					this.fileList.push(
						{
							uid: val.File_Id,
							name: val.FileName,
							status: 'done',
							// size: val.Size
							url: this.urlReadFile + val.File_Id,
						}
					)
				}
			},
			"value.HopDongInfo.LoaiHopDong_Id": function (val) {
				this.onLoadDuLieu(val)
			}
		},
		methods: {
			//load truong du lieu
			async onLoadDuLieu(id) {
				const param = {
					LoaiHopDong_Id: id
				}
	
				const isSelect = await loaiHopDongLoaiDuLieuService.LoaiHopDong_TruongDuLieu_Select(param)
				if (isSelect) {
					this.value.DuLieuHDList = isSelect.map(item => {
						return {
							...item,
							value: item.KieuDuLieu === 'SELECT' || item.KieuDuLieu === 'SELECT_M' ? this.strToArr(item.LuaChon_List) :
								item.LuaChon_List
						}
					})
					// this.value.DuLieuHDList.forEach(item => {
					// 	const obj = {
					// 		LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
					// 		GiaTri: null,
					// 		KieuDuLieu: item.KieuDuLieu,
					// 	}
					// 	this.value.DataDuLieuList.push(obj)
					// })
					if (this.value.RootLoaiHopDong_Id === id) {
						this.value.DataDuLieuList = []
						this.value.RootDataDLList.forEach(item => {
							const obj = {
								LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
								GiaTri: item.GiaTri,
								KieuDuLieu: item.KieuDuLieu,
							}
							this.value.DataDuLieuList.push(obj)
						})
					} else {
						this.value.DataDuLieuList = []
						this.value.DuLieuHDList.forEach(item => {
							const obj = {
								LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
								GiaTri: null,
								KieuDuLieu: item.KieuDuLieu,
							}
							this.value.DataDuLieuList.push(obj)
						})
					}
					console.log("this.value.DuLieuList", this.value.DuLieuHDList)
					console.log("clone array", this.value.DataDuLieuList)
				} else {
					console.log("Fail to load du lieu")
				}
			},
	
			//load hop dong info
			async onLoadNhanVienHD(id) {
				const param = {
					NhanVien_HopDong_Id: id
				}
	
				const isSelect = await nhanVienService.NhanVien_HopDong_Select_By_Id(param)
	
				if (isSelect) {
					this.value.HopDongInfo = isSelect[0][0]
	
					this.value.HopDongInfo.Is_DaKy = this.value.HopDongInfo.Is_DaKy ? 1 : 0
					this.value.HopDongInfo.Is_HopDongDaQua = this.value.HopDongInfo.Is_HopDongDaQua ? 1 : 0
					this.value.HopDongInfo.Is_HopDongThuViec = this.value.HopDongInfo.Is_HopDongThuViec ? 1 : 0
	
					this.value.HopDongInfo.NgayBatDau_HienThi = dayjs(this.value.HopDongInfo?.NgayBatDau_HienThi, "DD/MM/YYYY")
					this.value.HopDongInfo.NgayKetThuc_HienThi = dayjs(this.value.HopDongInfo?.NgayKetThuc_HienThi, "DD/MM/YYYY")
	
					// this.value.DuLieuHDList = isSelect[1]

					console.log("xxxxxxx", typeof isSelect[1][0].GiaTri)
	
					isSelect[1].forEach(item => {
						const obj = {
							LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
							GiaTri: item.GiaTri && (item.KieuDuLieu === 'DATE') ? dayjs(item.GiaTri, "DD-MM-YYYY") : item.GiaTri &&
								item.KieuDuLieu === 'DATETIME' ? dayjs(item.GiaTri, "DD-MM-YYYY HH:mm") : item.GiaTri,
							KieuDuLieu: item.KieuDuLieu,
						}
						this.value.DataDuLieuList.push(obj)
					})
	
					this.value.RootDataDLList = this.value.DataDuLieuList
					this.value.RootLoaiHopDong_Id = this.value.HopDongInfo.LoaiHopDong_Id
	
					console.log("this.value.HopDongInfo", this.value.HopDongInfo)
					console.log("this.value.DataDuLieuList", this.value.DataDuLieuList)
					// console.log("this.value.DuLieuHDList", this.value.DuLieuHDList)
				} else {
					console.log("Fail to load nhan vien hop dong")
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
				const ngayBatDau = this.value.NgayBatDau?.format("YYYY-MM-DD")
				const ngayKetThuc = this.value.NgayKetThuc?.format("YYYY-MM-DD")
				console.log("value", this.value)
				console.log("binding data", this.value.DataDuLieuList)
	
				const apiData = []
				this.value.DataDuLieuList.forEach(item => {
					const obj = {
						LoaiHopDong_TruongDuLieu_Id: item.LoaiHopDong_TruongDuLieu_Id,
						GiaTri: item.GiaTri && (item.KieuDuLieu === 'DATE') ? item.GiaTri.format("YYYY-MM-DD") : item.GiaTri && item.KieuDuLieu
							=== 'DATETIME' ?
							item.GiaTri?.format("YYYY-MM-DD HH:mm") : item.GiaTri
					}
					apiData.push(obj)
				})
	
				const param = {
					NhanVien_Id: this.value.NhanVien_Id,
					LoaiHopDong_Id: this.value.LoaiHopDong_Id,
					Is_HopDongThuViec: this.value.Is_HopDong_ThuViec,
					Is_HopDongDaQua: this.value.Is_HopDong_HienTai,
					NgayBatDau: ngayBatDau,
					NgayKetThuc: ngayKetThuc,
					MaHopDong: this.value.MaHopDong,
					Is_DaKy: this.value.TrangThai_HopDong,
					LoaiGuiEmail: this.value.TrangThai_ThongBao,
					File_Id: this.value.File_DinhKem[0]?.uid,
					MoTa: this.value.MoTa,
					LuongCoBan: this.value.LuongCoBan,
					BacLuong_Id: this.value.BacLuong_Id,
					BacThuong_Id: this.value.BacThuong_Id,
					TruongDuLieu_JSON: apiData
				}
	
				console.log("param", param)
	
				// const reps = await nhanVienService.NhanVien_HopDong_Insert(param).finally(() => this.state.isLoadingModal = false)
	
				// if (reps) {
				// 	this.onCancel()
				// 	this.$message.success("Thêm hợp đồng thành công")
				// 	this.$emit('onFinish')
				// }
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