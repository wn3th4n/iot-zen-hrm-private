<template>
    <uc-form-modal v-model:isOpen="isOpen" title="Thêm mới nè" :width="600" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onAdd()" @onClose="onCloseModal()">
        <a-row :gutter="[10]">
            <a-col :xs="24" :md="7">
                <a-form-item label="Mã nhóm ca mẫu" name="MaNhomCaMau">
                    <a-input v-model:value="formData.MaNhomCaMau" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="17">
                <a-form-item label="Tên nhóm ca mẫu" name="TenNhomCaMau">
                    <a-input v-model:value="formData.TenNhomCaMau" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="formData.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="7">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
                    <a-select v-model:value="formData.Is_TamKhoa">
                        <a-select-option :value="0" key="0"> Không </a-select-option>
                        <a-select-option :value="1" key="1"> Tạm khóa </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Ngày" name="Ngay">
                    <a-date-picker v-model:value="formData.Ngay" format="DD/MM/YYYY" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Nhân viên" name="NhanVien_Id">
                    <uc-select-nhan-vien v-model:value="formData.NhanVien_Id" :initData="[{ value: formData.NhanVien_Id, text: formData.TenNhanVien }]" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Nhóm ca mẫu" name="NhanVien_NhomCaMau_Id">
                    <uc-select-nhom-ca-mau v-model:value="formData.NhanVien_NhomCaMau_Id" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Văn phòng" name="VanPhong_Id">
                    <uc-select-van-phong v-model:value="formData.VanPhong_Id" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Lịch làm việc (Mẫu bảng công)" name="MauBangCong_Id">
                    <uc-select-mau-bang-cong v-model:value="formData.MauBangCong_Id" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Tháng" name="Thang">
                    <uc-select-month v-model:value="formData.Thang" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Năm" name="Nam">
                    <uc-select-year v-model:value="formData.Nam" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Ca mẫu" name="CaMau_Id">
                    <uc-select-ca-mau v-model:value="formData.CaMau_Id" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="24">
                <a-form-item label="Chọn mẫu bảng công" name="MauBangCong_Id_Selected">
                    <uc-checkbox-mau-bang-cong v-model:value="formData.MauBangCong_Id_Selected" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="24">
                <a-form-item label="Chọn mẫu bảng lương" name="MauBangLuong_Id_Selected">
                    <uc-checkbox-mau-bang-cong v-model:value="formData.MauBangLuong_Id_Selected" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen'],
    data() {
        return {
            formData: {
                MaNhomCaMau: '',
                TenNhomCaMau: '',
                MoTa: '',
                Is_TamKhoa: 0,
                Ngay: null,
                NhanVien_Id: 215,
                TenNhanVien: 'test init data',
                NhanVien_NhomCaMau_Id: null,
                VanPhong_Id: null,
                MauBangCong_Id: null,
                Thang: 8,
                Nam: 2024,
                CaMau_Id: null,
                MauBangCong_Id_Selected: [27, 30, 33],
                MauBangLuong_Id_Selected: [],
            },
            rules: {
                MaNhomCaMau: RULE_VALIDATE.CODE,
                TenNhomCaMau: [{ required: true, message: 'Vui lòng nhập tên nhóm ca mẫu', trigger: 'change' }],
                NhanVien_Id: [{ required: true, message: 'Vui lòng chọn nhân viên', trigger: 'change' }],
                NhanVien_NhomCaMau_Id: [{ required: true, message: 'Vui lòng chọn nhóm ca mẫu nhé', trigger: 'change' }],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
                MauBangCong_Id_Selected: [{ required: true, message: 'Vui lòng chọn mẫu bảng công', trigger: 'change' }],
            },
            isLoading: false,
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
            $this.isLoading = false
        },
    },
}
</script>
