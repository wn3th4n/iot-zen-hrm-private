<template>
    <uc-form-modal v-model:isOpen="isOpen" title="Thêm cấu hình cột" :width="800" :formData="form" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[20]">
            <a-col :span="9">
                <a-tabs v-model:activeKey="activeDefault">
                    <a-tab-pane v-for="(group, index) in DSBienHeThong.NhomBien" :key="index" :tab="group?.TenNhomBien" class="pt-3" style="height: 450px; overflow-y: auto">
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
            <a-col :span="15">
                <a-row :gutter="[10]">
                    <a-col :span="4">
                        <a-form-item label="Thứ tự" name="ThuTu">
                            <a-input-number v-model:value="form.ThuTu" class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Cách tính" name="Is_TheoNgay">
                            <a-select v-model:value="form.Is_TheoNgay">
                                <a-select-option :value="0"> Theo ngày </a-select-option>
                                <a-select-option :value="1"> Theo ca </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Dữ liệu" name="LoaiDuLieu">
                            <a-select v-model:value="form.LoaiDuLieu">
                                <a-select-option value="TEXT"> Văn bản </a-select-option>
                                <a-select-option value="NUM"> Số </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="Hiển thị">
                            <a-select v-model:value="form.Is_HienThi">
                                <a-select-option :value="0">Không</a-select-option>
                                <a-select-option :value="1">Có</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Mã thuộc tính" name="MaThuocTinh">
                            <a-input v-model:value="form.MaThuocTinh" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Tên hiển thị" name="TenThuocTinh">
                            <a-input v-model:value="form.TenThuocTinh" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Mô tả">
                            <a-textarea v-model:value="form.MoTa" :auto-size="{ minRows: 1 }" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Công thức" name="CongThuc">
                            <a-textarea v-model:value="form.CongThuc" :auto-size="{ minRows: 5 }" />
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
    props: ['isOpen', 'maubangcongid', 'DSBienHeThong', 'DSCauHinhCot', 'MauBangCong_Item'],
    data() {
        return {
            activeDefault: 0,
            isLoading: false,
            form: {
                MaHeThong: '',
                LoaiDuLieu: 'NUM',
                MaThuocTinh: '',
                ThuTu: null,
                TenThuocTinh: '',
                CongThuc: '',
                MoTa: '',
                Is_HienThi: 1,
                Is_TheoNgay: 0,
            },
            rules: {
                ThuTu: [{ required: true, message: 'Vui lòng nhập số thứ tự', trigger: 'change' }],
                MaThuocTinh: [
                    { required: true, message: 'Vui lòng nhập mã thuộc tính', trigger: 'change' },
                    { pattern: /^[a-z_]+$/, message: 'Mã không được chứa ký tự đặc biệt, chữ có dấu và số' },
                ],
                LoaiDuLieu: [{ required: true, message: 'Vui lòng chọn loại dữ liệu', trigger: 'change' }],
                Is_TheoNgay: [{ required: true, message: 'Vui lòng chọn loại công thức', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {
        isOpen: function (val) {
            if (val) {
                this.form.ThuTu = this.DSCauHinhCot?.length + 1
                if (this.MauBangCong_Item.Is_CoDinh) {
                    this.activeDefault = 1
                }
            }
        },
    },
    methods: {
        handleCancel() {
            this.$emit('update:isOpen', false)
        },
        onSubmit() {
            ajaxCALL(
                '/work/CA_MauBangCong_ThuocTinh_Insert',
                {
                    ThuTu: this.form.ThuTu,
                    MauBangCong_Id: this.maubangcongid,
                    CongThuc: this.form.CongThuc,
                    MaThuocTinh: this.form.MaThuocTinh,
                    TenThuocTinh: this.form.TenThuocTinh,
                    MoTa: this.form.MoTa,
                    MaHeThong: this.form.MaHeThong,
                    LoaiDuLieu: this.form.LoaiDuLieu,
                    Is_TheoNgay: this.form.Is_TheoNgay,
                },
                (res) => {
                    this.handleCancel()
                    this.$refs.modalRef.$refs.formRef.resetFields()
                    this.$message.success('Thêm công thức công thành công!')
                    this.$emit('onFinish')
                },
            )
        },
        onCopy(text) {
            navigator.clipboard.writeText(text)
            this.$message.success('Đã sao chép ' + text)
        },
    },
}
</script>
