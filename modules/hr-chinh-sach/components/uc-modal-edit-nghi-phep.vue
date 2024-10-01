<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Chỉnh sửa chính sách nghỉ phép" :formData="record" :rules="rules" :width="600" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
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
                <a-form-item label="Loại nghỉ phép" name="LoaiNghiPhep_Id">
                    <a-select v-model:value="record.LoaiNghiPhep_Id">
                        <a-select-option v-for="item in dsloainghiphep" :value="item.LoaiNghiPhep_Id" :key="item.LoaiNghiPhep_Id">{{ item.TenLoaiNghiPhep }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Số ngày phép hàng năm" name="SoNgayPhepNam">
                    <a-input-number v-model:value="record.SoNgayPhepNam" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Số ngày phép tồn tối đa" name="SoNgayPhepTon">
                    <a-input-number v-model:value="record.SoNgayPhepTon" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Loại chính sách" name="LoaiChinhSach">
                    <a-select v-model:value="record.LoaiChinhSach">
                        <a-select-option :value="1" key="1">Số ngày nghỉ phép cố định hằng năm </a-select-option>
                        <a-select-option :value="2" key="2">Tăng hàng tháng</a-select-option>
                    </a-select>
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
    emits: ['onFinish'],
    props: ['isOpen', 'record', 'dsloainghiphep'],
    data() {
        return {
            isLoading: false,
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
                '/work/HR_ChinhSach_NghiPhep_Update',
                {
                    ChinhSach_NghiPhep_Id: $this.record.ChinhSach_NghiPhep_Id,
                    LoaiNghiPhep_Id: $this.record.LoaiNghiPhep_Id,
                    MaChinhSach: $this.record.MaChinhSach,
                    TenChinhSach: $this.record.TenChinhSach,
                    MauChinhSach: $this.record.MauChinhSach,
                    LoaiChinhSach: $this.record.LoaiChinhSach,
                    SoNgayPhepNam: $this.record.SoNgayPhepNam,
                    SoNgayPhepTon: $this.record.SoNgayPhepTon,
                    MoTa: $this.record.MoTa,
                    Is_TamKhoa: $this.record.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Chỉnh sửa chính sách nghỉ phép thành công!', { position: 'top' })
                    $this.$refs.modalRef.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
