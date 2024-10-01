<template>
    <uc-form-modal v-model:isOpen="isOpen" :width="500" title="Chỉnh sửa dữ liệu chấm công" ref="modalRef" :formData="record" :rules="rules" @onClose="onHandleCancel()" @onSubmit="onSubmit()">
        <a-row :gutter="[10]">
            <a-col :span="8">
                <a-form-item label="Giờ chấm công" name="Gio">
                    <a-input v-model:value="record.Gio" placeholder="08:00" />
                </a-form-item>
            </a-col>
            <a-col :span="16">
                <a-form-item label="Địa điểm" name="VanPhong_Id">
                    <uc-select-van-phong v-model:value="record.VanPhong_Id"></uc-select-van-phong>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Ghi chú" name="GhiChu">
                    <a-input v-model:value="record.GhiChu"></a-input>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen', 'record'],
    emits: ['update:isOpen', 'onFinish'],
    data() {
        return {
            rules: {
                Gio: [
                    { required: true, message: 'Vui lòng nhập giờ', trigger: 'change' },
                    { pattern: /^([01]\d|2[0-3]):([0-5]\d)$/, message: 'Vui lòng nhập đúng định dạng' },
                ],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
            },
            formData: {},
        }
    },
    methods: {
        onHandleCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            const res = await checkInOutService.CheckInOut_Update({
                CheckInOut_Id: $this.record.CheckInOut_Id,
                VanPhong_Id: $this.record.VanPhong_Id ?? 0,
                Gio: $this.record.Gio,
                GhiChu: $this.record.GhiChu,
            })
            if (res) {
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.$message.success('Chỉnh sửa thành công!')
                $this.onHandleCancel()
            }
        },
    },
}
</script>
