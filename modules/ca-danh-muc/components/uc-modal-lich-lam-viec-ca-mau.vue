<template>
    <uc-form-modal :isOpen="isOpen" :title="'Thêm lịch làm việc cho ca mẫu ' + record?.TenCa" :width="1024" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-form-item label="Lịch làm việc" name="MauBangCong_Id_List">
            <uc-checkbox-mau-bang-cong v-model:value="formData.MauBangCong_Id_List" />
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
            $this.isLoading = true
            ajaxCALL(
                '/work/CA_CaMau_MauBangCong_Insert',
                {
                    MauBangCong_Id_List: $this.formData.MauBangCong_Id_List.join(','),
                    CaMau_Id: $this.record.CaMau_Id,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$message.success('Thêm lịch làm việc thành công')
                    $this.$emit('onFinish')
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
