<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm vai trò" :width="500" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="18">
                <a-form-item label="Mã vai trò" name="MaVaiTro">
                    <a-input v-model:value="formData.MaVaiTro" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Màu" name="MauVaiTro">
                    <a-input v-model:value="formData.MauVaiTro" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên vai trò" name="TenVaiTro">
                    <a-input v-model:value="formData.TenVaiTro" />
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
                MaVaiTro: '',
                TenVaiTro: '',
                MauVaiTro: '',
                MoTa: '',
                Is_TamKhoa: false,
            },
            rules: {
                MaVaiTro: [{ required: true, message: 'Vui lòng nhập mã vai trò', trigger: 'change' }],
                TenVaiTro: [{ required: true, message: 'Vui lòng nhập tên vai trò', trigger: 'change' }],
                MauVaiTro: [{ required: true, message: 'Vui lòng nhập màu vai trò', trigger: 'change' }],
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
            this.isLoading = true
            ajaxCALL(
                '/work/HR_VaiTro_Insert',
                {
                    MaVaiTro: $this.formData.MaVaiTro,
                    TenVaiTro: $this.formData.TenVaiTro,
                    MauVaiTro: $this.formData.MauVaiTro,
                    MoTa: $this.formData.MoTa,
                    Is_TamKhoa: $this.formData.Is_TamKhoa,
                },
                (res) => {
                    $this.$refs.modalRef.$refs.formRef.resetFields()
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Thêm vai trò thành công!', { position: 'top' })
                },
                (err) => {},
            )
            $this.isLoading = false
        },
    },
}
</script>
