<template>
    <uc-form-modal :isOpen="isOpen" ref="refFormModal" title="Chỉnh sửa khu vực địa lý" :formData="record" :rules="rules" :width="700" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="12">
                <a-form-item label="Mã khu vực địa lý" name="MaKhuVucDiaLy">
                    <a-input v-model:value="record.MaKhuVucDiaLy" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tên khu vực địa lý" name="TenKhuVucDiaLy">
                    <a-input v-model:value="record.TenKhuVucDiaLy" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="record.MoTa"></a-textarea>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="record.Is_TamKhoa">
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
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            rules: {
                MaKhuVucDiaLy: [{ required: true, message: 'Vui lòng nhập mã khu vực địa lý', trigger: 'change' }],
                TenKhuVucDiaLy: [{ required: true, message: 'Vui lòng nhập tên khu vực địa lý', trigger: 'change' }],
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
        async onFinish() {
            const $this = this
            $this.isLoading = true
            const params = { ...$this.record }
            const res = await khuVucDiaLyService.KhuVucDiaLy_Update(params)
            if (res) {
                $this.handleCancel()
                $this.$emit('onFinish')
                $this.$message.success('Chỉnh sửa khu vực địa lý thành công!')
                $this.$refs.refFormModal.$refs.formRef.resetFields()
            }
            $this.isLoading = false
        },
    },
}
</script>
