<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm chức danh" :formData="form" :rules="rules"
        :width="600" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">

            <a-col :span="24">
                <a-form-item label="Tên chức danh" name="TenChucDanh">
                    <a-input v-model:value="form.TenChucDanh" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="form.MoTa"></a-textarea>
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
    props: ['isOpen'],
    data() {
        return {
            isLoading: false,
            form: {
                TenChucDanh: "",
                MoTa: "",
                Is_TamKhoa: 0
            },
            rules: {
                TenChucDanh: [{ required: true, message: "Vui lòng nhập tên chức danh", trigger: "change" }],
            }
        }
    },
    mounted() { },
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
            const res = await chucDanhService.ChucDanh_Insert({
                TenChucDanh: $this.form.TenChucDanh,
                MoTa: $this.form.MoTa,
                Is_TamKhoa: $this.form.Is_TamKhoa
            })
            if (res) {
                $this.handleCancel()
                $this.$emit('onFinish')
                $this.$message.success("Thêm chức danh thành công!")
                $this.$refs.refFormModal.$refs.formRef.resetFields()
            }
            $this.isLoading = false

        },
    },
}
</script>