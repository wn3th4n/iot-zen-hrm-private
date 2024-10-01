<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm loại phúc lợi" :formData="form" :rules="rules"
        :width="500" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Tên loại phúc lợi" name="TenLoaiPhucLoi">
                    <a-input v-model:value="form.TenLoaiPhucLoi" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="form.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="form.Is_TamKhoa">
                        <a-select-option :value="0">
                            Không
                        </a-select-option>
                        <a-select-option :value="1">
                            Có
                        </a-select-option>
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
                TenLoaiPhucLoi: "",
                MoTa: "",
                Is_TamKhoa: 0
            },
            rules: {
                TenLoaiPhucLoi: [{ required: true, message: "Vui lòng nhập tên loại phúc lợi", trigger: "change" }],
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
        onFinish() {
            const $this = this
            $this.isLoading = true
            ajaxCALL("/work/HR_LoaiPhucLoi_Insert", {
                TenLoaiPhucLoi: $this.form.TenLoaiPhucLoi,
                MoTa: $this.form.MoTa,
                Is_TamKhoa: $this.form.Is_TamKhoa
            }, (res) => {
                $this.handleCancel()
                $this.$emit('onFinish')
                Vue.$toast.success("Thêm loại phúc lợi thành công!", { position: "top" })
                $this.$refs.refFormModal.$refs.formRef.resetFields()
            })
            $this.isLoading = false
        },
    },
}
</script>