<template>
    <uc-form-modal title="Thêm nhân sự" :isOpen="isOpen" ref="modalRef" :width="450" :rules="rules" :formData="formData" @onSubmit="onSubmit()" :isSubmit="state.isLoadingForm" @onClose="onClose()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Chọn nhân sự" name="NhanVien_Id">
                    <uc-select-nhan-vien v-model:value="formData.NhanVien_Id" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Chọn chính sách thuế" name="ChinhSach_Thue_Id">
                    <uc-select-thue v-model:value="formData.ChinhSach_Thue_Id" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Chọn ngày tham gia" name="NgayThamGia">
                    <a-date-picker v-model:value="formData.NgayThamGia" :allowClear="false" format="DD/MM/YYYY" :formatter="formatter" class="w-100" :parse="parser" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mục đích tạo" name="MucDichTao">
                    <a-select v-model:value="formData.MucDichTao">
                        <a-select-option :value="1">Tạo đăng kí mới</a-select-option>
                        <a-select-option :value="2">Ghi đè đăng kí cuối cùng</a-select-option>
                        <a-select-option :value="3">Tạo đăng kí trong quá khứ </a-select-option>
                        <a-select-option :value="4">Tạo đăng kí đầu tiên</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Ghi chú thêm" name="GhiChu">
                    <a-textarea :rows="2" v-model:value="formData.GhiChu"></a-textarea>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen'],
    data() {
        return {
            state: {
                isLoadingForm: false,
            },
            rules: {
                NhanVien_Id: [{ required: true, message: 'Bạn chưa chọn nhân sự!', trigger: 'change' }],
                ChinhSach_Thue_Id: [{ required: true, message: 'Bạn chưa chọn chính sách thuế!', trigger: 'change' }],
                NgayThamGia: [{ required: true, message: 'Bạn chưa chọn ngày tham gia!', trigger: 'change' }],
            },
            formData: {
                NhanVien_Id: null,
                ChinhSach_Thue_Id: null,
                NgayThamGia: null,
                GhiChu: null,
                MucDichTao: 1,
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onClose() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            this.state.isLoadingForm = true
            const isInsert = await nhanVienThueService
                .NhanVien_ChinhSach_Thue_Insert({
                    ...this.formData,
                    NgayThamGia: this.formData.NgayThamGia.format('YYYY/MM/DD'),
                })
                .finally(() => (this.state.isLoadingForm = false))
            if (isInsert) {
                this.$message.success('Thêm nhân sự thành công!')
                this.onClose()
                this.$emit('onFinish')
                this.$refs.modalRef.$refs.formRef.resetFields()
            }
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
    },
}
</script>
