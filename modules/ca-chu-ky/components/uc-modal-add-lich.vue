<template>
    <uc-form-modal :isOpen="isOpen" :title="modalTitle" :width="1024" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onAdd()" @onClose="onCloseModal()">
        <a-row :gutter="[10]">
            <a-col :xs="24" :md="24">
                <a-form-item label="Lịch làm việc" name="MauBangCong_Id_List">
                    <uc-checkbox-mau-bang-cong v-model:value="formData.MauBangCong_Id_List" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            formData: {
                MauBangCong_Id_List: [],
            },
            rules: {
                MauBangCong_Id_List: [{ required: true, message: 'Bạn chưa chọn lịch làm việc', trigger: 'change' }],
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
            return `Thêm Lịch làm việc cho chu kỳ  T${this.record?.Thang}/${this.record?.Nam}`
        },
    },
    methods: {
        onCloseModal() {
            const $this = this
            //$this.isOpen = false
            $this.$emit('update:isOpen', false)
        },
        async onAdd() {
            const $this = this
            $this.isLoading = true
            const params = {
                MauBangCong_Id_List: $this.formData.MauBangCong_Id_List.join(','),
                LichLamViec_Id: $this.recordData.LichLamViec_Id,
            }
            const res = await lichLamViecService.LichLamViec_MauBangCong_Insert(params).finally(() => {
                $this.isLoading = false
            })
            if (res) {
                $this.$message.success('Thêm lịch làm việc thành công')
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.onCloseModal()
            }
        },
    },
}
</script>
