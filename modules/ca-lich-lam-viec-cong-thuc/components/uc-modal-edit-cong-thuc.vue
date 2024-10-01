<template>
    <uc-form-modal v-model:isOpen="isOpen" title="Chỉnh sửa thuộc tính" :width="1400" :formData="cauhinhcot" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[20]">
            <a-col :span="7">
                <a-tabs default-active-key="1">
                    <a-tab-pane v-for="group in DSBienHeThong.NhomBien" :key="group?.NhomBien_Id" :tab="group?.TenNhomBien" class="pt-3" style="height: 400px; overflow-y: auto">
                        <div class="p-1" v-for="item in DSBienHeThong.Bien.filter((g) => g?.NhomBien_Id === group?.NhomBien_Id)" :key="item?.Bien_Id">
                            <p class="mb-0" @click="onCopy(item.MaHeThong)">
                                <b>{{ item.MaHeThong }}</b>
                                <uc-icon name="content-copy" class="float-end" />
                            </p>
                            <span class="text-muted">{{ item.MoTa }}</span>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </a-col>
            <a-col :span="17">
                <a-row :gutter="[10]">
                    <a-col :span="2">
                        <a-form-item label="Thứ tự" name="ThuTu">
                            <a-input-number v-model:value="cauhinhcot.ThuTu" class="w-100" />
                        </a-form-item>
                    </a-col>
                    <!-- <a-col :span="6">
                        <a-form-item label="Loại biến" name="LoaiThuocTinh">
                            <a-select v-model:value="cauhinhcot.LoaiThuocTinh">
                                <a-select-option value="CT"> Công thức </a-select-option>
                                <a-select-option value="NL"> Nhập liệu </a-select-option>
                                <a-select-option value="HS"> Hằng số </a-select-option>
                                <a-select-option value="TD"> Tự động </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col> -->

                    <!-- <a-col :span="5">
                        <a-form-item label="Cách tính" name="Is_TheoNgay">
                            <a-select v-model:value="cauhinhcot.Is_TheoNgay">
                                <a-select-option :value="false"> Theo ngày </a-select-option>
                                <a-select-option :value="true"> Theo ca </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col> -->

                    <a-col :span="8">
                        <a-form-item label="Mã thuộc tính" name="MaThuocTinh">
                            <a-input v-model:value="cauhinhcot.MaThuocTinh" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Tên hiển thị" name="TenThuocTinh">
                            <a-input v-model:value="cauhinhcot.TenThuocTinh" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Dữ liệu" name="LoaiDuLieu">
                            <a-select v-model:value="cauhinhcot.LoaiDuLieu">
                                <a-select-option :value="TEXT"> Số </a-select-option>
                                <a-select-option :value="NUM"> Văn bản </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Mô tả" name="MoTa">
                            <a-textarea v-model:value="cauhinhcot.MoTa" :auto-size="{ minRows: 1 }" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Công thức" name="CongThuc">
                            <a-textarea v-model:value="cauhinhcot.CongThuc" :auto-size="{ minRows: 5 }" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item label="Hiển thị">
                            <a-select v-model:value="cauhinhcot.Is_HienThi">
                                <a-select-option :value="0" key="0">Không</a-select-option>
                                <a-select-option :value="1" key="1">Có</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'maubangcongid', 'cauhinhcot', 'DSBienHeThong'],
    data() {
        return {
            isLoading: false,
            rules: {
                ThuTu: [{ required: true, message: 'Vui lòng nhập số thứ tự', trigger: 'change' }],
                MaThuocTinh: [
                    { required: true, message: 'Vui lòng nhập mã thuộc tính', trigger: 'change' },
                    { pattern: /^[a-z_]+$/, message: 'Mã không được chứa ký tự đặc biệt, chữ có dấu và số' },
                ],
                LoaiDuLieu: [{ required: true, message: 'Vui lòng chọn loại dữ liệu', trigger: 'change' }],
                LoaiThuocTinh: [{ required: true, message: 'Vui lòng chọn loại thuộc tính', trigger: 'change' }],
                Is_TheoNgay: [{ required: true, message: 'Vui lòng chọn loại công thức', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {
        isOpen: function (val) {
            val || this.handleCancel()
        },
    },
    methods: {
        handleCancel() {
            this.$emit('update:isOpen', false)
        },
        onSubmit() {
            ajaxCALL(
                '/work/CA_MauBangCong_ThuocTinh_Update',
                {
                    MaHeThong: this.cauhinhcot.MaHeThong,
                    ThuTu: this.cauhinhcot.ThuTu,
                    // LoaiThuocTinh: this.cauhinhcot.LoaiThuocTinh,
                    LoaiDuLieu: this.cauhinhcot.LoaiDuLieu,
                    MauBangCong_ThuocTinh_Id: this.cauhinhcot.MauBangCong_ThuocTinh_Id,
                    MauBangCong_Id: this.cauhinhcot.MauBangCong_Id,
                    CongThuc: this.cauhinhcot.CongThuc,
                    MaThuocTinh: this.cauhinhcot.MaThuocTinh,
                    TenThuocTinh: this.cauhinhcot.TenThuocTinh,
                    MoTa: this.cauhinhcot.MoTa,
                    Is_TamKhoa: this.cauhinhcot.Is_TamKhoa,
                    Is_HienThi: this.cauhinhcot.Is_HienThi,
                    // Is_TheoNgay: this.cauhinhcot.Is_TheoNgay,
                },
                (res) => {
                    this.handleCancel()
                    this.$refs.modalRef.$refs.formRef.resetFields()
                    this.$message.success('Chỉnh sửa công thức công thành công!')
                    this.$emit('onFinish', true)
                },
                (err) => {},
            )
        },
        onCopy(text) {
            navigator.clipboard.writeText(text)
            this.$message.success('Đã sao chép ' + text)
        },
    },
}
</script>
