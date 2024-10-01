<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm vị trí" :formData="form" :rules="rules" :width="600" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Nhóm vị trí" name="LoaiViTri_Id">
                    <uc-select-hr-loai-vi-tri v-model:value="form.LoaiViTri_Id" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mã vị trí" name="MaViTri">
                    <a-input v-model:value="form.MaViTri" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên vị trí" name="TenViTri">
                    <a-input v-model:value="form.TenViTri" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="form.MoTa"></a-textarea>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="form.Is_TamKhoa">
                        <a-select-option :value="0"> Không </a-select-option>
                        <a-select-option :value="1"> Có </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen'],
    data() {
        return {
            isLoading: false,
            form: {
                LoaiViTri_Id: null,
                MaViTri: '',
                TenViTri: '',
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                LoaiViTri_Id: [{ required: true, message: 'Vui lòng chọn nhóm vị trí', trigger: 'change' }],
                MaViTri: [{ required: true, message: 'Vui lòng nhập mã vị trí', trigger: 'change' }],
                TenViTri: [{ required: true, message: 'Vui lòng nhập tên vị trí', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        onFinish() {
            const $this = this
            $this.isLoading = true
            ajaxCALL(
                '/work/HR_ViTri_Insert',
                {
                    LoaiViTri_Id: $this.form.LoaiViTri_Id,
                    MaViTri: $this.form.MaViTri,
                    TenViTri: $this.form.TenViTri,
                    MoTa: $this.form.MoTa,
                    Is_TamKhoa: $this.form.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    $this.$message.success('Thêm vị trí thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
