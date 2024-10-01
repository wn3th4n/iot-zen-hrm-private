<template>
    <uc-form-modal :width="400" title="Thêm nhân sự vào phòng ban" :isOpen="isOpen" ref="modalRef" @onClose="onCancel()" @onSubmit="onSubmit()" :isSubmit="isLoading" :formData="form">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item name="NhanVien_Id" label="Chọn nhân sự">
                    <uc-select-nhan-vien v-model:value="form.NhanVien_Id" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ["PhongBanId", "isOpen"],
    data() {
        return {
            isLoading: false,
            form: {
                NhanVien_Id: null,
            },
            rules: {
                NhanVien_Id: [{ requried: true, message: 'Bạn chưa chọn nhân sự', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            this.isLoading = true
            const reps = await phongBanService
                .PhongBan_Insert_NhanVien({
                    PhongBan_Id: this.PhongBanId,
                    NhanVien_Id: this.form.NhanVien_Id,
                })
                .finally(() => this.isLoading = false)
                
            if (reps) {
                this.$message.success('Thêm nhân sự thành công!')
			    this.$refs.modalRef.$refs.formRef.resetFields()
                this.onCancel()
                this.$emit('onFinish')
            }
        },
    },
}
</script>
