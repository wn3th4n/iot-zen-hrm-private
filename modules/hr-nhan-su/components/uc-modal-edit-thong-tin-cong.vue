<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Sửa thông tin công" :formData="recordCongViec" :rules="rules" :width="600" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-card class="mb-3" size="small">
            <a-space size="small">
                <uc-avatar :src="recordCongViec.AnhDaiDien_Url" :text="recordCongViec.HoVaTenNhanVien" size="large" />
                <span>
                    <b class="text-primary">{{ recordCongViec.HoVaTenNhanVien }}</b>
                    <br />
                    {{ recordCongViec.MaNhanVien }}
                </span>
            </a-space>
        </a-card>
        <a-row :gutter="[10]">
            <a-col :sm="24" :md="12">
                <a-form-item label="Văn phòng / Địa điểm" name="VanPhong_Id">
                    <uc-select-van-phong :allowClear="false" v-model:value="recordCongViec.VanPhong_Id"></uc-select-van-phong>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
                <a-form-item label="Nhóm ca mẫu" name="NhomCaMau_Id">
                    <uc-select-nhom-ca-mau :allowClear="false" v-model:value="recordCongViec.NhomCaMau_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
                <a-form-item label="Lịch làm việc" name="MauBangCong_Id">
                    <uc-select-mau-bang-cong :allowClear="false" v-model:value="recordCongViec.MauBangCong_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
                <a-form-item label="Mẫu bảng lương" name="MauBangLuong_Id">
                    <uc-select-mau-bang-luong :allowClear="false" v-model:value="recordCongViec.MauBangLuong_Id" />
                </a-form-item>
            </a-col>

            <a-col :sm="24" :md="12">
                <a-form-item label="Phân loại nhân sự" name="HinhThuc_Id">
                    <uc-select-hinh-thuc v-model:value="recordCongViec.HinhThuc_Id" />
                </a-form-item>
            </a-col>

            <a-col :sm="24" :md="12">
                <a-form-item label="Chức danh hiện tại" name="ChucDanh_Id">
                    <uc-select-chuc-danh :allowClear="false" v-model:value="recordCongViec.ChucDanh_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Vai trò">
                    <uc-select-vai-tro v-model:value="recordCongViec.VaiTro_Id_List" isMultiple />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
                <a-form-item :allowClear="false" label="Vị trí" name="ViTri_Id">
                    <uc-select-vi-tri v-model:value="recordCongViec.ViTri_Id"></uc-select-vi-tri>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen', 'dsnhomcamau', 'recordCongViec', 'dsvaitroid'],
    emits: ['onFinish', 'update:isOpen'],
    data() {
        return {
            isLoading: false,
            rules: {
                ViTri_Id: [{ required: true, message: 'Vui lòng chọn vị trí!', trigger: 'change' }],
                ChucDanh_Id: [{ required: true, message: 'Vui lòng chọn chức danh', trigger: 'change' }],
                HinhThuc_Id: [{ required: true, message: 'Vui lòng chọn hình thức', trigger: 'change' }],
                MauBangLuong_Id: [{ required: true, message: 'Vui lòng chọn mẫu bảng lương', trigger: 'change' }],
                NhomCaMau_Id: [{ required: true, message: 'Vui lòng chọn nhóm ca mẫu', trigger: 'change' }],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
            },
            DSKhuVucChuyenMon: [],
        }
    },
    methods: {
        handleCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            let vaiTro_Id_Arr = $this.recordCongViec.VaiTro_Id_List.join(',')
            const res = await nhanVienService.NhanVien_Update_ThongTin_Cong({
                NhanVien_Id: $this.recordCongViec.NhanVien_Id,
                VanPhong_Id: $this.recordCongViec.VanPhong_Id,
                NhomCaMau_Id: $this.recordCongViec.NhomCaMau_Id,
                MauBangCong_Id: $this.recordCongViec.MauBangCong_Id,
                MauBangLuong_Id: $this.recordCongViec.MauBangLuong_Id,
                ViTri_Id: $this.recordCongViec.ViTri_Id,
                HinhThuc_Id: $this.recordCongViec.HinhThuc_Id,
                ChucDanh_Id: $this.recordCongViec.ChucDanh_Id,
                VaiTro_Id_List: vaiTro_Id_Arr,
            })
            if (res) {
                $this.handleCancel()
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.$message.success('Sửa thông tin công thành công!')
            }
        },
        filterOption() {},
    },
}
</script>
