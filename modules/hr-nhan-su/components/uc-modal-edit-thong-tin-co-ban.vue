<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Sửa thông tin cơ bản" :formData="recordthongtincoban" :rules="rules" :width="600" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :sm="24" :md="6">
                <a-form-item label="Mã nhân sự">
                    <a-input v-model:value="recordthongtincoban.MaNhanVien" :disabled="true"></a-input>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="9">
                <a-form-item label="Họ và tên đệm">
                    <a-input v-model:value="recordthongtincoban.HoVaTenDem"></a-input>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="9">
                <a-form-item label="Tên">
                    <a-input v-model:value="recordthongtincoban.TenNhanVien"></a-input>
                </a-form-item>
            </a-col>
            <!-- <a-col :sm="24" :md="8">
                <a-form-item label="Tài khoản">
                    <a-input v-model:value="recordthongtincoban.TaiKhoan"></a-input>
                </a-form-item>
            </a-col> -->
            <a-col :sm="24" :md="8">
                <a-form-item label="Chức danh">
                    <uc-select-chuc-danh v-model:value="recordthongtincoban.ChucDanh_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="8">
                <a-form-item label="Số điện thoại">
                    <a-input v-model:value="recordthongtincoban.DienThoai" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="8">
                <a-form-item label="Ngày sinh">
                    <a-date-picker v-model:value="recordthongtincoban.dayOfBirth" format="DD/MM/YYYY" class="w-100"></a-date-picker>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="8">
                <a-form-item label="Giới tính">
                    <a-select placeholder="Chọn" v-model:value="recordthongtincoban.GioiTinh">
                        <a-select-option :value="1">Nam</a-select-option>
                        <a-select-option :value="2">Nữ</a-select-option>
                        <a-select-option :value="3">Khác</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="8">
                <a-form-item label="Tình trạng hôn nhân">
                    <a-select placeholder="Chọn" v-model:value="recordthongtincoban.TrangThai_HonNhan">
                        <a-select-option :value="1">Chưa kết hôn</a-select-option>
                        <a-select-option :value="2">Đã kết hôn</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>

            <a-col :sm="24" :md="12">
                <a-form-item label="Ngày bắt đầu">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="recordthongtincoban.NgayBatDau" class="w-100"></a-date-picker>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
                <a-form-item label="Ngày chính thức">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="recordthongtincoban.NgayChinhThuc" class="w-100"></a-date-picker>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Ghi chú">
                    <a-textarea :rows="2" v-model:value="recordthongtincoban.GhiChu"></a-textarea>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="6">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="recordthongtincoban.Is_TamKhoa">
                        <a-select-option :value="0">Không</a-select-option>
                        <a-select-option :value="1">Tạm khóa</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen', 'recordthongtincoban'],
    emits: ['onFinish', 'update:isOpen'],
    data() {
        return {
            isLoading: false,
            formData: {},
            rules: {
                NgaySinh: [{}],
            },
            dayOfBirth: null,
        }
    },
    computed: {},
    methods: {
        handleCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            $this.recordthongtincoban.NgaySinh = $this.recordthongtincoban.dayOfBirth.date()
            $this.recordthongtincoban.ThangSinh = $this.recordthongtincoban.dayOfBirth.month() + 1
            $this.recordthongtincoban.NamSinh = $this.recordthongtincoban.dayOfBirth.year()
            const res = await nhanVienService.NhanVien_Update_ThongTin_Coban({
                TaiKhoan: $this.recordthongtincoban.TaiKhoan,
                NhanVien_Id: $this.recordthongtincoban.NhanVien_Id,
                HoVaTenDem: $this.recordthongtincoban.HoVaTenDem,
                TenNhanVien: $this.recordthongtincoban.TenNhanVien,
                DienThoai: $this.recordthongtincoban.DienThoai,
                MaNhanVien: $this.recordthongtincoban.MaNhanVien,
                ChucDanh_Id: $this.recordthongtincoban.ChucDanh_Id,
                NgaySinh: $this.recordthongtincoban.NgaySinh,
                ThangSinh: $this.recordthongtincoban.ThangSinh,
                NamSinh: $this.recordthongtincoban.NamSinh,
                GioiTinh: $this.recordthongtincoban.GioiTinh,
                TrangThai_HonNhan: $this.recordthongtincoban.TrangThai_HonNhan,
                NgayBatDau: $this.recordthongtincoban.NgayBatDau.format('YYYY/MM/DD'),
                NgayChinhThuc: $this.recordthongtincoban.NgayChinhThuc.format('YYYY/MM/DD'),
                GhiChu: $this.recordthongtincoban.GhiChu,
                Is_TamKhoa: $this.recordthongtincoban.Is_TamKhoa,
            })
            if (res) {
                $this.handleCancel()
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.$message.success('Sửa thông tin cơ bản thành công!')
            }
        },
    },
}
</script>
