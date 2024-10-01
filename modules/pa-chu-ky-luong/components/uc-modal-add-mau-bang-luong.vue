<template>
    <uc-form-modal v-model:isOpen="isOpen" :title="modalTitle" :width="800" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onAdd()" @onClose="onCloseModal()">
        <a-row :gutter="[10]">
            <a-col :xs="24" :md="24">
                <a-form-item label="Bảng lương" name="MauBangLuong_Id_List">
                    <uc-checkbox-mau-bang-luong v-model:value="formData.MauBangLuong_Id_List" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            formData: {
                MauBangLuong_Id_List: [],
            },
            rules: {
                MauBangLuong_Id_List: [{ required: true, message: 'Bạn chưa chọn bảng lương', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {
        recordData: function () {
            const $this = this
            return $this.record ?? null
        },
        modalTitle: function () {
            return `Thêm bảng lương cho chu kỳ  T${this.record?.Thang}/${this.record?.Nam}`
        },
    },
    methods: {
        onCloseModal() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onAdd() {
            const $this = this
            $this.isLoading = true
            const params = {
                MauBangLuong_Id_List: $this.formData.MauBangLuong_Id_List.join(','),
                ChuKyLuong_Id: $this.recordData.ChuKyLuong_Id,
            }
            const res = await chuKyLuongService.ChuKyLuong_MauBangLuong_Insert(params).finally(() => {
                $this.isLoading = false
            })
            if (res) {
                $this.$message.success('Thêm bảng lương thành công')
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.onCloseModal()
            }
        },
    },
}
</script>
