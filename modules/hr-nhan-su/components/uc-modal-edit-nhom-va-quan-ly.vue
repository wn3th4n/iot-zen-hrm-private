<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Sửa nhóm và quản lý" :formData="record" :rules="rules" :width="400" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-card class="mb-3" size="small">
            <a-space size="small">
                <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien" size="large" />
                <span>
                    <b class="text-primary">{{ record.HoVaTenNhanVien }}</b>
                    <br />
                    {{ record.MaNhanVien }}
                </span>
            </a-space>
        </a-card>
        <a-row :gutter="[10]">
            <a-col :sm="24" :md="24">
                <a-form-item label="Nhóm nhân sự">
                    <uc-select-nhom-nhan-vien v-model:value="record.NhomNhanVien_Id" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Quản lý 1">
                    <uc-select-nhan-vien v-model:value="record.NguoiQuanLy_1_Id" :initData="[{ text: TenNguoiQuanLy_1, value: record.NguoiQuanLy_1_Id }]" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Quản lý 2">
                    <uc-select-nhan-vien v-model:value="record.NguoiQuanLy_2_Id" :initData="[{ text: TenNguoiQuanLy_2, value: record.NguoiQuanLy_2_Id }]" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen', 'record'],
    emits: ['onFinish', 'update:isOpen'],
    data() {
        return {
            isLoading: false,
            rules: {},
        }
    },
    computed: {
        TenNguoiQuanLy_1: function () {
            return this.record.NguoiQuanLy_1_Ma + ' - ' + this.record.NguoiQuanLy_1_Ten
        },
        TenNguoiQuanLy_2: function () {
            return this.record.NguoiQuanLy_2_Ma + ' - ' + this.record.NguoiQuanLy_2_Ten
        },
    },
    methods: {
        handleCancel() {
            this.$emit('update:isOpen', false)
        },
        onSubmit() {
            const $this = this
            const res = nhanVienService.NhanVien_Update_ThongTin_NhomQuanLy({
                NhanVien_Id: $this.record.NhanVien_Id,
                NhomNhanVien_Id: $this.record.NhomNhanVien_Id,
                NguoiQuanLy_1_Id: $this.record.NguoiQuanLy_1_Id,
                NguoiQuanLy_2_Id: $this.record.NguoiQuanLy_2_Id,
            })
            if (res) {
                $this.handleCancel()
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.$message.success('Sửa nhóm quản lý thành công!')
            }
        },
        filterOption() {},
    },
}
</script>
