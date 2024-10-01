<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm loại ca" :width="600" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="6">
                <a-form-item label="Mã loại ca" name="MaLoaiCa">
                    <a-input v-model:value="formData.MaLoaiCa" />
                </a-form-item>
            </a-col>
            <a-col :span="14">
                <a-form-item label="Tên loại ca" name="TenLoaiCa">
                    <a-input v-model:value="formData.TenLoaiCa" />
                </a-form-item>
            </a-col>
            <a-col :span="4">
                <a-form-item label="Màu" name="MauLoaiCa">
                    <a-input v-model:value="formData.MauLoaiCa" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả">
                    <a-textarea v-model:value="formData.MoTa" :auto-size="{ minRows: 2 }" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen'],
    data() {
        return {
            isLoading: false,
            formData: {
                MaLoaiCa: '',
                TenLoaiCa: '',
                MauLoaiCa: '',
                MoTa: '',
                Is_TamKhoa: false,
            },
            rules: {
                MaLoaiCa: [{ required: true, message: 'Vui lòng nhập mã loại ca', trigger: 'change' }],
                TenLoaiCa: [{ required: true, message: 'Vui lòng nhập tên loại ca', trigger: 'change' }],
                MauLoaiCa: [{ required: true, message: 'Vui lòng nhập màu loại ca', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        onSubmit() {
            const $this = this
            $this.isLoading = true
            ajaxCALL(
                '/work/CA_LoaiCa_Insert',
                {
                    MaLoaiCa: $this.formData.MaLoaiCa,
                    TenLoaiCa: $this.formData.TenLoaiCa,
                    MauLoaiCa: $this.formData.MauLoaiCa,
                    MoTa: $this.formData.MoTa,
                    Is_TamKhoa: $this.formData.Is_TamKhoa,
                },
                (res) => {
                    $this.$refs.modalRef.$refs.formRef.resetFields()
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Tạo loại ca thành công!', { position: 'top' })
                },
                (err) => {},
            )
            $this.isLoading = false
        },
    },
}
</script>
