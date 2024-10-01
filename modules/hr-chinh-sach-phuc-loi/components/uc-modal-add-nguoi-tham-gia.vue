<template>
    <uc-form-modal :isOpen="isOpen" ref="modalRef" title="Thêm phúc lợi cho nhân sự" :rules="rules" :formData="formData" :width="600" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="onCancel()">
        <a-row :gutter="[10]">
            <a-col :sm="16" :md="16">
                <a-form-item label="Chọn nhân sự" name="NhanVien_Id">
                    <uc-select-nhan-vien v-model:value="formData.NhanVien_Id"></uc-select-nhan-vien>
                </a-form-item>
            </a-col>

			<a-col :sm="8" :md="8">
				<a-form-item label="Ngày áp dụng" name="NgayApDung">
					<a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayApDung" class="w-100" :allowClear="false" :formatter="formatter" :parser="parser">
					</a-date-picker>
				</a-form-item>
			</a-col>

			<a-col :sm="24" :md="24">
				<a-form-item label="Phúc lợi" name="PhucLoi_Id">
					<uc-select-phuc-loi v-model:value="formData.PhucLoi_Id"></uc-select-phuc-loi>
				</a-form-item>
			</a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Ghi chú thêm" name="GhiChu">
                    <a-textarea :rows="2" v-model:value="formData.GhiChu"></a-textarea>
                </a-form-item>
            </a-col>

        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    props: ['isOpen'],
    emits: ['onFinish', 'update:isOpen'],
    data() {
        return {
            isLoading: false,
            rules: {
                NgayApDung: [{ required: true, message: 'Vui lòng chọn ngày áp dụng', trigger: 'change' }],
            },
            formData: {
                NhanVien_Id: null,
                PhucLoi_Id: null,
                NgayApDung: null,
                GhiChu: '',
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        async onSubmit() {
            this.isLoading = true
            const params = {
                ...this.formData,
                NgayApDung: this.formData.NgayApDung.format('YYYY/MM/DD'),
            }
            const reps = await nhanVienPhucLoiService.NhanVien_PhucLoi_Insert(params)
            if (reps) {
                this.onCancel()
                this.$emit('onFinish')
                this.$message.success('Thêm phúc lợi cho nhân sự thành công!')
                this.$refs.modalRef.$refs.formRef.resetFields()
            }
            this.isLoading = false
        },
		onCancel() {
            this.$emit('update:isOpen', false)
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
