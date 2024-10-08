<template>
	<uc-form-modal :width="500" title="Thêm trường mới" :isOpen="isOpen" ref="modalRef" :formData="form" :rules="rules"
		@onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Loại dữ liệu" name="LoaiDuLieu">
					<!-- v-model:value="value.newField" -->
					<a-select v-model:value="form.LoaiDuLieu" class="truongSelect">
						<a-select-option v-for="item in TruongDuLieuList" :key="item.value">
							{{item.label}}
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Thứ tự" name="ThuTu ">
					<a-input-number class="w-100" v-model:value="form.ThuTu" />
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Bắt buộc" name="BatBuoc">
					<a-select v-model:value="form.BatBuoc">
						<a-select-option :value=0>Không bắt buộc</a-select-option>
						<a-select-option :value=1>Bắt buộc</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Tên trường" name="TenTruong">
					<a-input v-model:value="form.TenTruong" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mã trường dữ liệu" name="MaTruong">
					<a-input v-model:value="form.MaTruong" />
				</a-form-item>
			</a-col>
			<a-col :span="24" v-if="form.LoaiDuLieu === 6 || form.LoaiDuLieu === 7">
				<a-form-item label="Các lựa chọn, cách nhau bằng một dấu phẩy" name="LuaChon">
					<a-input v-model:value="form.LuaChon" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Miêu tả ngắn" name="MieuTa">
					<a-textarea v-model:value="form.MieuTa" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		props: ["record", "isOpen", "truongdulieulist", "loaihopdong"],
		data() {
			return {
				state: {
					isLoading: true
				},
				value: {
					TruongDuLieuList: [],
					newField: null,
				},
				form: {
					TenTruong: null,
					LoaiDuLieu: null,
					BatBuoc: 1,
					MieuTa: null,
					LuaChon: null,
					MaTruong: null,
					ThuTu: null,
				},
				rules: {
					TenTruong: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					LoaiDuLieu: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					BatBuoc: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					MieuTa: [{ required: false, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					MaTruong: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }, 
					{ pattern: /^[a-zA-Z0-9]+([-]?[a-zA-Z0-9])*$/, message: 'Mã không được chứa ký tự đặc biệt' },],
					LuaChon: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
				},
			}
		},
		mounted() {
		},
		computed: {
			TruongDuLieuList: function () {
				return this.truongdulieulist
			},
			LoaiHopDong: function () {
				return this.loaihopdong
			}
		},
		watch: {
			record: function (val) {
				if (val) {
					this.form.LoaiDuLieu = val
				}
			}
		},
		methods: {
			async onSubmit() {
				console.log("submit", this.form)
	
				const param = {
					LoaiHopDong_Id: this.LoaiHopDong.LoaiHopDong_Id,
					TruongDuLieu_Id: this.form.LoaiDuLieu,
					TenTruongDuLieu: this.form.TenTruong,
					MaTruongDuLieu: this.form.MaTruong,
					LuaChon_List: this.form.LuaChon,
					MoTa: this.form.MieuTa,
					Is_BatBuoc: this.form.BatBuoc,
					ThuTu: this.form.ThuTu,
				}
	
				console.log("Insert", param)
	
				const reps = await loaiHopDongLoaiDuLieuService.LoaiHopDong_TruongDuLieu_Insert(param).finally(() => this.state.isLoading = false)
	
				if (reps) {
					this.onCancel()
					this.$message.success("Thêm trường dữ liệu thành công")
					this.$emit('onFinish')
					this.resetField()
				}
	
			},
			filterKieuDuLieu(id) {
				const filter = this.TruongDuLieuList.find(item => item.TruongDuLieu_Id === id)
				return filter.KieuDuLieu ?? null
			},
			onCancel() {
				this.$emit('update:isOpen', false)
				// this.$emit('update:record', null)
			},
			resetField() {
				this.$refs.modalRef.$refs.formRef.resetFields()
			},
		},
	}
</script>