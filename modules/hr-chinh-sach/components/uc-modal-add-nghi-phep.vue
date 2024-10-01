<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Thêm chính sách nghỉ phép" :formData="formData" :rules="rules" :width="600" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="18">
                <a-form-item label="Mã chính sách" name="MaChinhSach">
                    <a-input v-model:value="formData.MaChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Màu chính sách" name="MauChinhSach">
                    <a-input v-model:value="formData.MauChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên chính sách" name="TenChinhSach">
                    <a-input v-model:value="formData.TenChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Loại nghỉ phép" name="LoaiNghiPhep_Id">
                    <a-select v-model:value="formData.LoaiNghiPhep_Id">
                        <a-select-option v-for="item in dsloainghiphep" :value="item.LoaiNghiPhep_Id" :key="item.LoaiNghiPhep_Id">{{ item.TenLoaiNghiPhep }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Số ngày phép hàng năm" name="SoNgayPhepNam">
                    <a-input-number v-model:value="formData.SoNgayPhepNam" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Số ngày phép tồn tối đa" name="SoNgayPhepTon">
                    <a-input-number v-model:value="formData.SoNgayPhepTon" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Loại chính sách" name="LoaiChinhSach">
                    <a-select v-model:value="formData.LoaiChinhSach">
                        <a-select-option :value="1">Số ngày nghỉ phép cố định hằng năm </a-select-option>
                        <a-select-option :value="2">Tăng hàng tháng</a-select-option>
                    </a-select>
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
                        <a-select-option :value="1" key="1"> Tạm khóa </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'dsloainghiphep'],
    data() {
        return {
            isLoading: false,
            formData: {
                LoaiNghiPhep_Id: 1,
                MaChinhSach: '',
                TenChinhSach: '',
                MauChinhSach: '',
                LoaiChinhSach: 1,
                SoNgayPhepNam: null,
                SoNgayPhepTon: null,
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                LoaiNghiPhep_Id: [{ required: true, message: 'Vui lòng chọn loại nghỉ phép', trigger: 'change' }],
                MaChinhSach: [{ required: true, message: 'Vui lòng nhập mã chính sách', trigger: 'change' }],
                TenChinhSach: [{ required: true, message: 'Vui lòng nhập tên chính sách', trigger: 'change' }],
                MauChinhSach: [{ required: true, message: 'Vui lòng nhập màu chính sách', trigger: 'change' }],
                LoaiChinhSach: [{ required: true, message: 'Vui lòng chọn loại chính sách', trigger: 'change' }],
                SoNgayPhepNam: [{ required: true, message: 'Vui lòng nhập số ngày phép năm', trigger: 'change' }],
                SoNgayPhepTon: [{ required: true, message: 'Vui lòng nhập số ngày phép tồn', trigger: 'change' }],
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
        onSubmit() {
            const $this = this
            $this.isLoading = true
            ajaxCALL(
                '/work/HR_ChinhSach_NghiPhep_Insert',
                {
                    LoaiNghiPhep_Id: $this.formData.LoaiNghiPhep_Id,
                    MaChinhSach: $this.formData.MaChinhSach,
                    TenChinhSach: $this.formData.TenChinhSach,
                    MauChinhSach: $this.formData.MauChinhSach,
                    LoaiChinhSach: $this.formData.LoaiChinhSach,
                    SoNgayPhepNam: $this.formData.SoNgayPhepNam,
                    SoNgayPhepTon: $this.formData.SoNgayPhepTon,
                    MoTa: $this.formData.MoTa,
                    Is_TamKhoa: $this.formData.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Tạo chính sách nghỉ phép thành công!', { position: 'top' })
                    $this.$refs.modalRef.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
