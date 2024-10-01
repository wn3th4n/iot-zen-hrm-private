<template>
    <uc-form-modal v-model:isOpen="isOpen" :width="500" title="Thêm dữ liệu chấm công" :formData="formData" :rules="rules" @onClose="onHandleCancel()" ref="modalRef" @onSubmit="onSubmit()">
        <a-row :gutter="[10]">
            <a-col :span="8">
                <a-form-item label="Giờ chấm công" name="Gio">
                    <a-input v-model:value="formData.Gio" placeholder="08:00" />
                </a-form-item>
            </a-col>
            <a-col :span="16">
                <a-form-item label="Địa điểm" name="VanPhong_Id">
                    <uc-select-van-phong v-model:value="formData.VanPhong_Id"></uc-select-van-phong>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Ghi chú" name="GhiChu">
                    <a-input v-model:value="formData.GhiChu"></a-input>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen', 'nhanvienid', 'cong'],
    emits: ['update:isOpen'],
    data() {
        return {
            rules: {
                Gio: [
                    { required: true, message: 'Vui lòng nhập giờ', trigger: 'change' },
                    { pattern: /^([01]\d|2[0-3]):([0-5]\d)$/, message: 'Vui lòng nhập đúng định dạng' },
                ],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
            },
            formData: {
                VanPhong_Id: null,
                NhanVien_Id: null,
                Ngay: null,
                Thang: null,
                Nam: null,
                Gio: null,
                GhiChu: '',
            },
        }
    },
    methods: {
        onHandleCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            const res = await checkInOutService.CheckInOut_Insert({
                VanPhong_Id: $this.formData.VanPhong_Id,
                NhanVien_Id: $this.nhanvienid,
                Ngay: $this.cong.Ngay,
                Thang: $this.cong.Thang,
                Nam: $this.cong.Nam,
                Gio: $this.formData.Gio,
                GhiChu: $this.formData.GhiChu,
            })
            if (res) {
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.$message.success('Thêm thành công!')
                $this.onHandleCancel()
            }
        },
    },
}
</script>
