<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Chỉnh sửa chính sách bảo hiểm" :formData="record" :rules="rules" :width="700" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="18">
                <a-form-item label="Mã chính sách" name="MaChinhSach">
                    <a-input v-model:value="record.MaChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Màu chính sách" name="MauChinhSach">
                    <a-input v-model:value="record.MauChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên chính sách" name="TenChinhSach">
                    <a-input v-model:value="record.TenChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Loại lương" name="LoaiLuong">
                    <a-select v-model:value="record.LoaiLuong">
                        <a-select-option :value="1">Lương cơ bản </a-select-option>
                        <a-select-option :value="2">Tổng lương</a-select-option>
                        <a-select-option :value="3">Tùy chỉnh</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Phần trăm công ty" name="PhanTram_CongTy">
                    <a-input-number v-model:value="record.PhanTram_CongTy" style="width: 100%" :min="0" :max="100" :formatter="formatter" :parser="parser" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Phần trăm nhân viên" name="PhanTram_NhanVien">
                    <a-input-number v-model:value="record.PhanTram_NhanVien" style="width: 100%" :min="0" :max="100" :formatter="formatter" :parser="parser" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="record.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
                    <a-select v-model:value="record.Is_TamKhoa">
                        <a-select-option :value="0" key="0"> Không </a-select-option>
                        <a-select-option :value="1" key="1"> Tạm khóa </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            rules: {
                MaChinhSach: [{ required: true, message: 'Vui lòng nhập mã chính sách', trigger: 'change' }],
                TenChinhSach: [{ required: true, message: 'Vui lòng nhập tên chính sách', trigger: 'change' }],
                MauChinhSach: [{ required: true, message: 'Vui lòng nhập màu chính sách', trigger: 'change' }],
                LoaiLuong: [{ required: true, message: 'Vui lòng chọn loại chính sách', trigger: 'change' }],
                PhanTram_CongTy: [{ required: true, message: 'Vui lòng nhập phần trăm công ty', trigger: 'change' }],
                PhanTram_NhanVien: [{ required: true, message: 'Vui lòng nhập phần trăm nhân viên', trigger: 'change' }],
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
                '/work/HR_ChinhSach_BaoHiem_Update',
                {
                    ChinhSach_BaoHiem_Id: $this.record.ChinhSach_BaoHiem_Id,
                    MaChinhSach: $this.record.MaChinhSach,
                    TenChinhSach: $this.record.TenChinhSach,
                    MauChinhSach: $this.record.MauChinhSach,
                    LoaiLuong: $this.record.LoaiLuong,
                    PhanTram_CongTy: $this.record.PhanTram_CongTy,
                    PhanTram_NhanVien: $this.record.PhanTram_NhanVien,
                    MoTa: $this.record.MoTa,
                    Is_TamKhoa: $this.record.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Chỉnh sửa chính sách bảo hiểm thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
        formatter(value) {
            if (value) {
                return `${value}%`
            }
        },
        parser(value) {
            if (value) {
                return value.replace('%', '')
            }
        },
    },
}
</script>
