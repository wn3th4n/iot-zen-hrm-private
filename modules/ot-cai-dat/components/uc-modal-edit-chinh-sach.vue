<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Chỉnh sửa chính sách" :formData="record" :rules="rules" :width="500" @onSubmit="onFinish()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Mã chính sách" name="MaChinhSach_LamThem">
                    <a-input v-model:value="record.MaChinhSach_LamThem" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên chính sách" name="TenChinhSach_LamThem">
                    <a-input v-model:value="record.TenChinhSach_LamThem" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Nhóm chính sách" name="NhomChinhSach_LamThem_Id">
                    <a-select v-model:value="record.NhomChinhSach_LamThem_Id">
                        <a-select-option v-for="item in dsnhomchinhsach" :value="item.NhomChinhSach_LamThem_Id">{{ item.TenNhomChinhSach_LamThem }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Mã hệ số" name="MaHeSo">
                    <a-input v-model:value="record.MaHeSo" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Hệ số" name="HeSo">
                    <a-input-number v-model:value="record.HeSo" :step="0.01" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-input v-model:value="record.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
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
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record', 'dsnhomchinhsach'],
    data() {
        return {
            isLoading: false,
            rules: {
                TenChinhSach_LamThem: [{ required: true, message: 'Vui lòng nhập tên chính sách', trigger: 'change' }],
                MaChinhSach_LamThem: [{ required: true, message: 'Vui lòng nhập mã chính sách', trigger: 'change' }],
                NhomChinhSach_LamThem_Id: [{ required: true, message: 'Vui lòng chọn nhóm chính sách', trigger: 'change' }],
                HeSo: [{ required: true, message: 'Vui lòng nhập hệ số tăng ca', trigger: 'change' }],
                MaHeSo: [{ required: true, message: 'Vui lòng nhập mã hệ số tăng ca', trigger: 'change' }],
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
            let params = { ...$this.record }
            const res = await chinhSachService.ChinhSach_LamThem_Update(params)
            if (res) {
                $this.handleCancel()
                $this.$emit('onFinish')
                $this.$message.success('Chỉnh sửa chính sách thành công!')
                $this.$refs.modalRef.$refs.formRef.resetFields()
            }
        },
    },
}
</script>