<template>
    <uc-form-modal :isOpen="isOpen" ref="modalRef" title="Thêm dữ liệu bảo hiểm" :formData="formData" :rules="rules" :width="600" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="onCancel()">
        <a-row :gutter="[10]">
            <a-col :sm="12" :md="12">
                <a-form-item label="Chọn nhân sự" name="NhanVien_Id">
                    <uc-select-nhan-vien v-model:value="formData.NhanVien_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Mục đích tạo ra" name="MucDichTao">
                    <a-select v-model:value="formData.MucDichTao">
                        <a-select-option :value="1">Tạo đăng ký mới</a-select-option>
                        <a-select-option :value="2">Ghi đè đăng ký cuối cùng</a-select-option>
                        <a-select-option :value="3">Tạo đăng ký trong quá khứ</a-select-option>
                        <a-select-option :value="4">Tạo đăng ký đầu tiên</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Ngày tham gia" name="LoaiNgayThamGia">
                    <a-select v-model:value="formData.LoaiNgayThamGia">
                        <a-select-option :value="1">Ngày bắt đầu làm việc</a-select-option>
                        <a-select-option :value="2">Ngày tùy chỉnh</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Chọn ngày tham gia" v-if="formData.LoaiNgayThamGia === 2" name="NgayThamGia">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayThamGia" :formatter="formatter" :parser="parser" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Chính sách bảo hiểm" name="ChinhSach_BaoHiem_Id">
                    <a-select v-model:value="formData.ChinhSach_BaoHiem_Id">
                        <a-select-option v-for="bh in dsBaoHiem" :value="bh.ChinhSach_BaoHiem_Id">{{ bh.TenChinhSach }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Lương đóng bảo hiểm" v-if="dsBaoHiem.filter((e) => e.ChinhSach_BaoHiem_Id === formData.ChinhSach_BaoHiem_Id)[0]?.LoaiLuong === 3" name="LuongDongBaoHiem">
                    <a-input-number v-model:value="formData.LuongDongBaoHiem" :formatter="formatter" :parser="parser" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Ghi chú thêm" name="GhiChu">
                    <a-textarea :rows="2" v-model:value="formData.GhiChu" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen'],
    emits: ['onFinish', 'update:isOpen'],
    mounted() {
        this.loadBaoHiem()
    },
    data() {
        return {
            isLoading: false,
            rules: {},
            formData: {
                NhanVien_Id: null,
                LoaiNgayThamGia: null,
                NgayThamGia: null,
                LuongDongBaoHiem: null,
                ChinhSach_BaoHiem_Id: null,
                GhiChu: '',
                MucDichTao: 1,
            },
            dsBaoHiem: [],
        }
    },
    methods: {
        loadBaoHiem() {
            ajaxCALL('/work/HR_ChinhSach_BaoHiem_Select', {}, (res) => {
                this.dsBaoHiem = res.data
            })
        },
        onCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            this.isLoading = true
            const res = await nhanVienBaoHiemService.NhanVien_ChinhSach_BaoHiem_Insert({
                NhanVien_Id: $this.formData.NhanVien_Id,
                NgayThamGia: $this.formData.NgayThamGia.format('YYYY/MM/DD'),
                LuongDongBaoHiem: $this.formData.LuongDongBaoHiem ?? 0,
                ChinhSach_BaoHiem_Id: $this.formData.ChinhSach_BaoHiem_Id,
                GhiChu: this.formData.GhiChu,
                MucDichTao: this.formData.MucDichTao,
            })
            if (res) {
                $this.onCancel()
                $this.$emit('onFinish')
                $this.$message.success('Thêm dữ liệu thành công!')
                $this.$refs.modalRef.$refs.formRef.resetFields()
            }
            $this.isLoading = false
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
