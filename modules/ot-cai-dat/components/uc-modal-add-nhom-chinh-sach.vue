<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Thêm nhóm chính sách" :formData="form" :rules="rules" :width="500" @onSubmit="onFinish()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Tên nhóm" name="TenNhomChinhSach_LamThem">
                    <a-input v-model:value="form.TenNhomChinhSach_LamThem" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-input v-model:value="form.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
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
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen'],
    data() {
        return {
            isLoading: false,
            form: {
                TenNhomChinhSach_LamThem: '',
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                TenNhomChinhSach_LamThem: [{ required: true, message: 'Vui lòng nhập tên nhóm chính sách', trigger: 'change' }],
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
        async onFinish() {
            const $this = this
            let params = { ...$this.form }
            const res = await nhomChinhSachService.NhomChinhSach_LamThem_Insert(params)
            if (res) {
                $this.handleCancel()
                $this.$emit('onFinish')
                $this.$message.success('Thêm nhóm chính sách thành công!')
                $this.$refs.modalRef.$refs.formRef.resetFields()
            }
        },
    },
}
</script>