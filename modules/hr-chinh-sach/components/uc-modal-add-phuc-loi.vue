<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm phúc lợi" :formData="form" :rules="rules" :width="600" @onSubmit="onFinish()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="12">
                <a-form-item label="Mã phúc lợi" name="MaPhucLoi">
                    <a-input v-model:value="form.MaPhucLoi" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tên phúc lợi" name="TenPhucLoi">
                    <a-input v-model:value="form.TenPhucLoi" />
                </a-form-item>
            </a-col>
            <a-col :span="18">
                <a-form-item label="Loại phúc lợi" name="LoaiPhucLoi_Id">
                    <a-select v-model:value="form.LoaiPhucLoi_Id">
                        <a-select-option v-for="item in dsloaiphucloi" :value="item.LoaiPhucLoi_Id">
                            {{ item.TenLoaiPhucLoi }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Giá trị" name="GiaTri">
                    <a-input-number v-model:value="form.GiaTri" :formatter="formatter" :parser="parser" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tính thu nhập" name="Is_TinhThuNhap">
                    <a-select v-model:value="form.Is_TinhThuNhap">
                        <a-select-option :value="false"> Không tính vào thu nhập </a-select-option>
                        <a-select-option :value="true"> Tính vào thu nhập </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Hình thức lặp lại" name="HinhThucLapLai">
                    <a-select v-model:value="form.HinhThucLapLai">
                        <a-select-option :value="1"> Bảng lương </a-select-option>
                        <a-select-option :value="2"> Hàng tháng </a-select-option>
                        <a-select-option :value="3"> Hàng tuần </a-select-option>
                        <a-select-option :value="4"> Hàng năm </a-select-option>
                        <a-select-option :value="5"> Sự kiện </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="form.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="form.Is_TamKhoa">
                        <a-select-option :value="0"> Không </a-select-option>
                        <a-select-option :value="1"> Có </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'dsloaiphucloi', 'loaiphucloiid'],
    data() {
        return {
            isLoading: false,
            form: {
                LoaiPhucLoi_Id: 1,
                MaPhucLoi: '',
                TenPhucLoi: '',
                HinhThucLapLai: 1,
                GiaTri: null,
                MoTa: '',
                Is_TinhThuNhap: false,
                Is_TamKhoa: 0,
            },
            rules: {
                TenPhucLoi: [{ required: true, message: 'Vui lòng nhập tên phúc lợi', trigger: 'change' }],
                MaPhucLoi: [{ required: true, message: 'Vui lòng nhập mã phúc lợi', trigger: 'change' }],
                GiaTri: [{ required: true, message: 'Vui lòng nhập giá trị', trigger: 'change' }],
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
        onFinish() {
            const $this = this
            $this.isLoading = true
            ajaxCALL(
                '/work/HR_PhucLoi_Insert',
                {
                    LoaiPhucLoi_Id: $this.form.LoaiPhucLoi_Id,
                    MaPhucLoi: $this.form.MaPhucLoi,
                    TenPhucLoi: $this.form.TenPhucLoi,
                    HinhThucLapLai: $this.form.HinhThucLapLai,
                    GiaTri: $this.form.GiaTri,
                    MoTa: $this.form.MoTa,
                    Is_TinhThuNhap: $this.form.Is_TinhThuNhap,
                    Is_TamKhoa: $this.form.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Thêm phúc lợi thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
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
