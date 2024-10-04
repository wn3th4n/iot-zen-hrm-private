<template>
	<uc-form-modal :width="650" title="Thêm trường mới" :isOpen="isOpen" :formData="form" :rules="rules"
		@onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Tên trường" name="TenTruong">
					<a-input v-model:value="form.TenTruong" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Loại dữ liệu" name="LoaiDuLieu">
					<!-- v-model:value="value.newField" -->
					<a-select class="truongSelect">
						<a-select-option v-for="item in TruongDuLieuList" :key="item.value">
							{{item.label}}
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Các lựa chọn, cách nhau bằng một dấu phẩy" name="LuaChon">
					<a-input v-model:value="form.LuaChon" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Bắt buộc" name="BatBuoc">
					<a-select v-model:value="form.BatBuoc">
						<a-select-option :value=0>Không bắt buộc</a-select-option>
						<a-select-option :value=1>Bắt buộc</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Miêu tả" name="MieuTa">
					<a-input v-model:value="form.MieuTa" />
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
		props: ["record", "isOpen", "truongdulieulist"],
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
					BatBuoc: 0,
					MieuTa: null,
					LuaChon: null
				},
				rules: {},
			}
		},
		mounted() {
		},
		computed: {
			TruongDuLieuList: function () {
				return this.truongdulieulist
			}
		},
		watch: {
			record: function(val){
				if(val){
					this.form.LoaiDuLieu = val
				}
			}
		},
		methods: {
			onSubmit() {
				console.log("submit", this.form)
			},
			onCancel() {
				this.$emit('update:isOpen', false)
			},
		},
	}
</script>