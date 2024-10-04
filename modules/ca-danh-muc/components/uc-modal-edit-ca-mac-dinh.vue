<template>
    <uc-form-modal :isOpen="isOpen" ref="modalRef" title="Chỉnh sửa ca dự báo" :formData="formData" :rules="rules" :width="500" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
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
                <a-form-item label="Số người" name="SoNguoi">
                    <a-input-number v-model:value="formData.SoNguoi" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Ca cần, ca đủ" name="SoNguoi">
                    <a-input-number style="width: 100%" />
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
    props: ['isOpen', 'maubangcongid', 'dsnhomcamau', 'dsvitri', 'record'],
    data() {
        return {
            isLoading: false,
            rules: {
                NhomCaMau_Id: [{ required: true, message: 'Vui lòng chọn nhóm ca mẫu', trigger: 'change' }],
                ViTri_Id: [{ required: true, message: 'Vui lòng chọn vị trí', trigger: 'change' }],
                SoNguoi: [{ required: true, message: 'Vui lòng nhập số người', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {
        formData: function () {
            return this.record
        },
    },
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
                '/work/CA_CaMacDinh_Update',
                {
                    CaMacDinh_Id: $this.formData.CaMacDinh_Id,
                    ViTri_Id: $this.formData.ViTri_Id,
                    SoNguoi: $this.formData.SoNguoi,
                    MoTa: $this.formData.MoTa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Chỉnh sửa ca dự báo thành công!', { position: 'top' })
                    $this.$refs.modalRef.$refs.formRef.resetFields()
                },
            )
        },
    },
}
</script>
