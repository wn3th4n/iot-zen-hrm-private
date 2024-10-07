<template>
	<uc-form-modal :isOpen="isOpen" ref="modalRef" title="Thêm ca dự báo" :formData="formData" :rules="rules"
		:width="500" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
		<a-row :gutter="[10]">
			<a-col :span="12">
				<a-form-item label="Nhóm ca mẫu" name="NhomCaMau_Id">
					<a-select v-model:value="formData.NhomCaMau_Id">
						<a-select-option v-for="item in dsnhomcamau" :key="item.NhomCaMau_Id">
							{{ item.TenNhomCaMau }}
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Vị trí" name="ViTri_Id">
					<a-select v-model:value="formData.ViTri_Id">
						<a-select-option v-for="item in dsvitri" :key="item.ViTri_Id">
							{{ item.TenViTri }}
						</a-select-option>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Số ca cần" name="SoCaCan">
					<a-input-number v-model:value="formData.SoCaCan" style="width: 100%" />
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Số ca đủ" name="SoCaDu">
					<a-input-number v-model:value="formData.SoCaDu" style="width: 100%" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mô tả">
					<a-textarea v-model:value="formData.MoTa"></a-textarea>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>

<script>
	export default {
	    emits: ['onFinish', 'update:isOpen'],
	    props: ['isOpen', 'maubangcongid', 'dsnhomcamau', 'dsvitri'],
	    data() {
	        return {
	            isLoading: false,
	            formData: {
	                NhomCaMau_Id: 1,
	                ViTri_Id: 1,
	                SoCaCan: 0,
	                SoCaDu: 0,
	                MoTa: '',
	            },
	            rules: {
	                NhomCaMau_Id: [{ required: true, message: 'Vui lòng chọn nhóm ca mẫu', trigger: 'change' }],
	                ViTri_Id: [{ required: true, message: 'Vui lòng chọn vị trí', trigger: 'change' }],
	                SoCaCan: [{ required: true, message: 'Vui lòng nhập số ca cần', trigger: 'change' }],
	                SoCaDu: [{ required: true, message: 'Vui lòng nhập số ca đủ', trigger: 'change' }],
	            },
	        }
	    },
	    mounted() { },
	    computed: {},
	    watch: {},
	    methods: {
	        handleCancel(e) {
	            const $this = this
	            $this.$emit('update:isOpen', false)
	        },
	        formatter(value) {
	            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	        },
	        parser(value) {
	            return value.replace(/\$\s?|(,*)/g, '')
	        },
	        onSubmit() {
	            const $this = this
	            ajaxCALL(
	                '/work/CA_CaMacDinh_Insert',
	                {
	                    MauBangCong_Id: $this.maubangcongid[0],
	                    NhomCaMau_Id: $this.formData.NhomCaMau_Id,
	                    ViTri_Id: $this.formData.ViTri_Id,
	                    SoCaCan: $this.formData.SoCaCan,
	                    SoCaDu: $this.formData.SoCaDu,
	                    MoTa: $this.formData.MoTa,
	                },
	                (res) => {
	                    $this.$refs.modalRef.$refs.formRef.resetFields()
	                    $this.handleCancel()
	                    $this.$emit('onFinish')
	                    $this.$message.success('Thêm thiết lập thành công!')
	                },
	            )
	        },
	    },
	}
</script>