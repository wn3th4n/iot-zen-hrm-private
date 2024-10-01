<template>
    <uc-form-modal :value="action.isShowModalAdd" ref="refFormModal" title="Thêm chính sách bậc thưởng" :form="form"
        :rules="rules" :width="700" @onFinish="onFinish" :isSubmit="isLoading">
        <a-row :gutter="ROW_GUTTER">
            <a-col :span="12">
                <a-form-item label="Mã chính sách" prop="MaChinhSach">
                    <a-input v-model="form.MaChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tên chính sách" prop="TenChinhSach">
                    <a-input v-model="form.TenChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" prop="MoTa">
                    <a-input v-model="form.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item style=" display: flex; justify-content: end;">
                    <a-checkbox v-model="form.Is_TamKhoa"> Tạm khóa </a-checkbox>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['action', 'onfinish'],
    data() {
        return {
            isLoading: false,
            form: {
                MaChinhSach: "",
                TenChinhSach: "",
                MoTa: "",
                Is_TamKhoa: false
            },
            rules: {
                MaChinhSach: [{ required: true, message: "Vui lòng nhập mã chính sách", trigger: "change" }],
                TenChinhSach: [{ required: true, message: "Vui lòng tên chính sách", trigger: "change" }],
            }
        }
    },
    mounted() { },
    computed: {},
    watch: {},
    methods: {
        onFinish() {
            this.isLoading = true
            ajaxCALL("/work/HR_ChinhSach_Luong_Insert", {
                MaChinhSach: this.form.MaChinhSach,
                TenChinhSach: this.form.TenChinhSach,
                MoTa: this.form.MoTa,
                Is_TamKhoa: this.form.Is_TamKhoa
            }, (res) => {
                this.isLoading = false
                this.$emit('onfinish', true)
                Vue.$toast.success("Thêm chính sách thành công!", { position: "top" })
                this.action.IsShowModalAdd = false
                this.$refs.refFormModal.$refs.refForm.resetFields()
            })
        },
    },
}
</script>