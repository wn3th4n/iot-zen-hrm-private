<template>
    <uc-form-modal :value="action.isShowModalEdit" ref="refFormModal" title="Thêm chính sách bậc thưởng" :form="record"
        :rules="rules" :width="700" @onFinish="onFinish" :isSubmit="isLoading">
        <a-row :gutter="ROW_GUTTER">
            <a-col :span="12">
                <a-form-item label="Mã chính sách" prop="MaChinhSach">
                    <a-input v-model="record.MaChinhSach" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tên chính sách" prop="TenChinhSach">
                    <a-input v-model="record.TenChinhSach"  />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" prop="MoTa">
                    <a-input v-model="record.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item style=" display: flex; justify-content: end;">
                    <a-checkbox v-model="record.Is_TamKhoa"> Tạm khóa </a-checkbox>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['action', 'onfinish','record'],
    data() {
        return {
            isLoading: false,
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
            ajaxCALL("/work/HR_ChinhSach_Luong_Update", {
                ChinhSach_Luong_Id: this.record.ChinhSach_Luong_Id,
                MaChinhSach: this.record.MaChinhSach,
                TenChinhSach: this.record.TenChinhSach,
                MoTa: this.record.MoTa,
                Is_TamKhoa: this.record.Is_TamKhoa
            }, (res) => {
                this.isLoading = false
                this.$emit('onfinish', true)
                Vue.$toast.success("Cập nhật chính sách thành công!", { position: "top" })
                this.action.IsShowModalEdit = false
                this.$refs.refFormModal.$refs.refForm.resetFields()
            })
        },
    },
}
</script>