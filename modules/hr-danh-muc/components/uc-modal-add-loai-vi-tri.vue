<template>
    <uc-form-modal :isOpen="isOpen" ref="refFormModal" title="Thêm nhóm vị trí công việc" :formData="form" @onClose="handleCancel()" :rules="rules" :width="600" @onSubmit="onFinish" :isSubmit="isLoading">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Tên nhóm vị trí" name="TenLoaiViTri">
                    <a-input v-model:value="form.TenLoaiViTri" />
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
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen'],
    data() {
        return {
            isLoading: false,
            form: {
                TenLoaiViTri: '',
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                TenLoaiViTri: [{ required: true, message: 'Vui lòng nhập tên nhóm vị trí', trigger: 'change' }],
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
            let params = { ...$this.form }
            const res = await loaiViTriHRService.LoaiViTri_Insert(params)
            if (res) {
                $this.handleCancel()
                $this.$emit('onFinish')
                $this.$message.success('Thêm nhóm vị trí công việc thành công!')
                $this.$refs.refFormModal.$refs.refForm.resetFields()
            }
            $this.isLoading = false
        },
    },
}
</script>
