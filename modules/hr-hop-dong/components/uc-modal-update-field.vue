<template>
	<uc-form-modal :width="500" title="Cập nhật trường dữ liệu" :isOpen="isOpen" ref="modalRef"
		:formData="value.copyRecord" :rules="rules" @onSubmit="onSubmit()" :isSubmit="state.isLoading"
		@onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Loại dữ liệu" name="TruongDuLieu_Id">
					<!-- v-model:value="value.newField" -->
					<a-select v-model:value="value.copyRecord.TruongDuLieu_Id" class="truongSelect">
						<a-select-option v-for="item in TruongDuLieuList" :key="item.value">
							{{item.label}}
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Thứ tự" name="ThuTu ">
					<a-input-number class="w-100" v-model:value="value.copyRecord.ThuTu" />
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Bắt buộc" name="Is_BatBuoc">
					<a-select v-model:value="value.copyRecord.Is_BatBuoc">
						<a-select-option :value=0>Không bắt buộc</a-select-option>
						<a-select-option :value=1>Bắt buộc</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Tên trường" name="TenTruongDuLieu">
					<a-input v-model:value="value.copyRecord.TenTruongDuLieu" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mã trường dữ liệu" name="MaTruongDuLieu">
					<a-input v-model:value="value.copyRecord.MaTruongDuLieu" />
				</a-form-item>
			</a-col>
			<a-col :span="24" v-if="value.copyRecord.TruongDuLieu_Id === 6 || value.copyRecord.TruongDuLieu_Id === 7">
				<a-form-item label="Các lựa chọn, cách nhau bằng một dấu phẩy" name="LuaChon_List">
					<a-input v-model:value="value.copyRecord.LuaChon_List" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Miêu tả ngắn" name="MoTa">
					<a-textarea v-model:value="value.copyRecord.MoTa" />
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
					copyRecord: {},
				},
				rules: {
					TruongDuLieu_Id: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					ThuTu: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					Is_BatBuoc: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					TenTruongDuLieu: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					MaTruongDuLieu: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' },
					{ pattern: /^[a-zA-Z0-9]+([-]?[a-zA-Z0-9])*$/, message: 'Mã không được chứa ký tự đặc biệt' },],
					LuaChon_List: [{ required: true, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
					MoTa: [{ required: false, message: 'Bạn chưa nhập lựa chọn', trigger: 'change' }],
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
					// this.form.LoaiDuLieu = val
					this.record.Is_BatBuoc = this.record.Is_BatBuoc ? 1 : 0
					this.value.copyRecord = Object.assign({}, this.record);
				}
			}
		},
		methods: {
			async onSubmit() {
				const param = {
					LoaiHopDong_TruongDuLieu_Id: this.value.copyRecord.LoaiHopDong_TruongDuLieu_Id,
					LoaiHopDong_Id: this.value.copyRecord.LoaiHopDong_Id,
					TruongDuLieu_Id: this.value.copyRecord.TruongDuLieu_Id,
					TenTruongDuLieu: this.value.copyRecord.TenTruongDuLieu.trim() ?? this.value.copyRecord.TenTruongDuLieu,
					MaTruongDuLieu: this.value.copyRecord.MaTruongDuLieu.trim() ?? this.value.copyRecord.MaTruongDuLieu,
					LuaChon_List: this.value.copyRecord.LuaChon_List.trim() ?? this.value.copyRecord.LuaChon_List,
					MoTa: this.value.copyRecord.MoTa.trim() ?? this.value.copyRecord.MoTa,
					Is_BatBuoc: this.value.copyRecord.Is_BatBuoc,
					ThuTu: this.value.copyRecord.ThuTu,
				}
	
				console.log("submit", param)
	
				// console.log("Insert", param)
	
				const reps = await loaiHopDongLoaiDuLieuService.LoaiHopDong_TruongDuLieu_Update(param).finally(() => this.state.isLoading = false)
	
				if (reps) {
					this.onCancel()
					this.$message.success("Cập nhật trường dữ liệu thành công")
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