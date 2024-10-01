<template>
    <uc-form-modal :isOpen="isOpen" :title="'Thêm lịch làm việc cho vai trò ' + record?.TenVaiTro" :width="1024" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-form-item label="Lịch làm việc" name="MauBangCong_Id_List">
            <uc-checkbox-mau-bang-cong v-model:value="formData.MauBangCong_Id_List"> </uc-checkbox-mau-bang-cong>
        </a-form-item>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        const mauBangCongIdList = this.record.MauBangCong_Id_List
        return {
            isLoading: false,
            formData: {
                MauBangCong_Id_List: mauBangCongIdList ?? [],
            },
            rules: {
                MauBangCong_Id_List: [{ required: true, message: 'Bạn chưa chọn lịch làm việc', trigger: 'change' }],
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
        onSubmit() {
            const $this = this
            vaiTroService
                .VaiTro_MauBangCong_Insert({
                    MauBangCong_Id_List: $this.formData.MauBangCong_Id_List.join(','),
                    VaiTro_Id: $this.record.VaiTro_Id,
                })
                .then((res) => {
                    $this.$message.success('Thêm lịch làm việc thành công')
                })
                .finally(() => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                })
        },
        validateField(field) {
            const ref = this.$refs.modalRef.$refs.refForm
            ref.validateField(field)
        },
    },
}
</script>
