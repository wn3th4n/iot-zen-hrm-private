<template>
	<uc-form-modal  tabindex="0" aria-hidden="true" ref="modalRef" :isOpen="isOpen" :formData="form" :rules="rules" :width="1024"
		:title="'Thiết lập quyền truy cập cho ' + record?.TenBoPhan" @onSubmit="onFinish()" :isSubmit="loading"
		@onClose="onCancel()">
		<a-form-item label="Quyền truy cập" name="Quyen_Id_List">
			<uc-checkbox-quyen v-model:value="form.Quyen_Id_List" @validatefield="validateField"/>
		</a-form-item>
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ['onFinish', 'update:isOpen'],
		props: ['isOpen', 'record'],
		data() {
			return {
				loading: false,
			form: {
				Quyen_Id_List: [],
			},
			rules: {
				Quyen_Id_List: [{ required: true, message: 'Bạn chưa chọn quyền truy cập cho bộ phận', trigger: 'change' }],
			},
			}
		},
		mounted() {},
		computed: {},
		watch: {
			'record.BoPhan_Id': function (val) {
				if (val) {
					const temp = this.record.Quyen_Id_List
					this.form.Quyen_Id_List = temp
				}
			},
		},
		methods: {
			validateField(field) {
            	const ref = this.$refs.modalRef.$refs.formRef
            	ref.validateField(field)
        	},
			onCancel() {
				this.$emit('update:isOpen', false)
			},
			onFinish() {
				this.loading = true
				const res = quyenService.BoPhan_Quyen_Update({
					BoPhan_Id: this.record.BoPhan_Id,
					Quyen_Id_List: this.form.Quyen_Id_List.join(",")
				})
				if(res){
					this.onCancel()
					this.$message.success('Thêm quyền truy cập cho bộ phận thành công')
					this.$emit('onFinish')	
				}
				this.loading = false
			},
		},
	}
</script>