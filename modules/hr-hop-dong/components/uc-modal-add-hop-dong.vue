<template>
    <uc-form-modal :rules="rules" :formData="formData" :isOpen="isOpen" title="Thêm hợp đồng mới" :width="600" :isSubmit="state.isLoadingModal" ref="modalRef" @onClose="onCancel()" @onSubmit="onSubmit()">
        <a-row :gutter="[10]">
            <a-col :sm="12" :md="12">
                <a-form-item label="Chọn nhân sự" name="NhanVien_Id">
                    <uc-select-nhan-vien v-model:value="formData.NhanVien_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Chọn loại hợp đồng" name="LoaiHopDong_Id">
                    <a-select v-model:value="formData.LoaiHopDong_Id"> </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Hợp đồng" name="Is_HopDong_HienTai">
                    <a-select v-model:value="formData.Is_HopDong_HienTai">
                        <a-select-option :value="0">Hợp đồng hiện tại hoặc tương lai</a-select-option>
                        <a-select-option :value="1">Hợp đồng đã qua</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Hợp đồng thử việc?" name="Is_HopDong_ThuViec">
                    <a-select v-model:value="formData.Is_HopDong_ThuViec">
                        <a-select-option :value="0">Hợp đồng thử việc</a-select-option>
                        <a-select-option :value="1">Hợp đồng tiêu chuẩn</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Ngày bắt đầu" name="NgayBatDau">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayHieuLuc" class="w-100" :allowClear="false"> </a-date-picker>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Ngày bắt đầu" name="NgayKetThuc">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="formData.NgayKetThuc" class="w-100" :allowClear="false"> </a-date-picker>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Mã hợp đồng" name="MaHopDong">
                    <a-input v-model:value="formData.MaHopDong" />
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Trạng thái hợp đồng" name="TrangThai_HopDong">
                    <a-select v-model:value="formData.TrangThai_HopDong">
                        <a-select-option :value="0">Đang xử lý</a-select-option>
                        <a-select-option :value="1">Đã ký</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Gửi thông báo cho nhân sự qua email" name="TrangThai_ThongBao">
                    <a-select v-model:value="formData.TrangThai_ThongBao">
                        <a-select-option :value="0">Không gửi email</a-select-option>
                        <a-select-option :value="1">Gửi email cho nhân sự không kèm chi tiết hợp đồng</a-select-option>
                        <a-select-option :value="2">Gửi email cho nhân sự kèm chi tiết hợp đồng</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="File đính kèm" name="File_DinhKem">
                    <uc-file-upload v-model:value="formData.File_DinhKem" :multiple="true" title="Upload File" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Chi tiết hợp đồng và các yêu cầu khác" name="MoTa">
                    <a-textarea v-model:value="formData.MoTa" />
                </a-form-item>
            </a-col>

            <a-col :sm="24" :md="24">
                <a-checkbox v-model:value="Is_XuLy_FileMau">Xử lý file mẫu</a-checkbox><br />
                <a-checkbox v-model:value="Is_XuLy_FileMau">Thông báo tới người có liên quan</a-checkbox>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            state: {
                isLoadingModal: false,
            },
            formData: {
                NhanVien_Id: null,
                LoaiHopDong_Id: null,
                Is_HopDong_HienTai: null,
                Is_HopDong_ThuViec: null,
                NgayBatDau: null,
                NgayKetThuc: null,
                MaHopDong: null,
                TrangThai_HopDong: 0,
                TrangThai_ThongBao: 0,
                File_DinhKem: [],
                MoTa: null,
                Is_XuLy_FileMau: 0,
            },
            rules: {},
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onCancel() {
            this.$emit('update:isOpen', false)
            this.$refs.modalRef.$refs.formRef.resetFields()
        },
        onSubmit() {},
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
    },
}
</script>
