<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm mới chu kỳ" :width="500" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onAdd()" @onClose="onCloseModal()">
        <a-row :gutter="[10]">
            <a-col :xs="24" :md="12">
                <a-form-item label="Tháng" name="Thang">
                    <uc-select-month v-model:value="formData.Thang" placeholder="Chọn tháng..." />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
                <a-form-item label="Năm" name="Nam">
                    <uc-select-year v-model:value="formData.Nam" placeholder="Chọn năm..." />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen'],
    data() {
        return {
            isLoading: false,
            formData: {
                Thang: dayjs().month() + 1,
                Nam: dayjs().year(),
            },
            rules: {
                Thang: [{ required: true, message: 'Bạn chưa chọn Tháng', trigger: 'change' }],
                Nam: [{ required: true, message: 'Bạn chưa chọn Năm', trigger: 'change' }],
            },
        }
    },
    methods: {
        onCloseModal() {
            const $this = this

            $this.$emit('update:isOpen', false)
        },
        async onAdd() {
            const $this = this
            $this.isLoading = true
            const res = await lichLamViecService.LichLamViec_Insert($this.formData).finally(() => {
                $this.isLoading = false
            })
            if (res) {
                $this.$message.success('Thêm chu kỳ thành công')
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.onCloseModal()
            }
        },
    },
}
</script>
