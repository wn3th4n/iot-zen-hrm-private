<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" :title="title" :formData="record" :rules="rules" :width="600" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Nhóm vị trí" name="LoaiViTri_Id">
                    <uc-select-hr-loai-vi-tri v-model:value="record.LoaiViTri_Id" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mã vị trí" name="MaViTri">
                    <a-input v-model:value="record.MaViTri" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên vị trí" name="TenViTri">
                    <a-input v-model:value="record.TenViTri" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="record.MoTa"></a-textarea>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="record.Is_TamKhoa">
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
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            rules: {
                LoaiViTri_Id: [{ required: true, message: 'Vui lòng chọn nhóm vị trí', trigger: 'change' }],
                MaViTri: [{ required: true, message: 'Vui lòng nhập mã vị trí', trigger: 'change' }],
                TenViTri: [{ required: true, message: 'Vui lòng nhập tên vị trí', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {
        title: function () {
            return 'Chỉnh sửa vị trí ' + this.record.TenViTri
        },
    },
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
                '/work/HR_ViTri_Update',
                {
                    ViTri_Id: $this.record.ViTri_Id,
                    LoaiViTri_Id: $this.record.LoaiViTri_Id,
                    MaViTri: $this.record.MaViTri,
                    TenViTri: $this.record.TenViTri,
                    MoTa: $this.record.MoTa,
                    Is_TamKhoa: $this.record.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Chỉnh sửa vị trí thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
