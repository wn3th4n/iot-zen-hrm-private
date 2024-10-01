<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm nhóm ca mẫu" :width="600" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onAdd()" @onClose="onCloseModal()">
        <a-row :gutter="[10]">
            <a-col :span="7">
                <a-form-item label="Mã nhóm ca mẫu" name="MaNhomCaMau">
                    <a-input v-model:value="formData.MaNhomCaMau" />
                </a-form-item>
            </a-col>
            <a-col :span="17">
                <a-form-item label="Tên nhóm ca mẫu" name="TenNhomCaMau">
                    <a-input v-model:value="formData.TenNhomCaMau" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="formData.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
                    <a-select v-model:value="formData.Is_TamKhoa">
                        <a-select-option :value="0" key="0"> Không </a-select-option>
                        <a-select-option :value="1" key="1"> Có </a-select-option>
                    </a-select>
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
                TenNhomCaMau: '',
                MaNhomCaMau: '',
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                MaNhomCaMau: RULE_VALIDATE.CODE,
                TenNhomCaMau: [{ required: true, message: 'Vui lòng nhập tên nhóm ca mẫu', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onCloseModal() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onAdd() {
            const $this = this
            $this.isLoading = true
            const res = await nhomCaMauService.NhomCaMau_Insert($this.formData)
            if (res) {
                Vue.$toast.success('Thêm nhóm ca mẫu thành công!', { position: 'top' })
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.onCloseModal()
            }
            $this.isLoading = false
        },
    },
}
</script>
