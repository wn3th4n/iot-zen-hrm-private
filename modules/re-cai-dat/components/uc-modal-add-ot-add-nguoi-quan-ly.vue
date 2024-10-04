<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm nhân sự" :width="400" ref="modalRef"
        :formData="form" @onClose="onCancel()" @onSubmit="onSubmit()" :isSubmit="state.isLoadingModal">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Chọn nhân sự" name="NguoiQuanLy_Id">
                   <uc-select-nhan-vien v-model:value="form.NguoiQuanLy_Id"/>
                </a-form-item>
            </a-col>

        </a-row>
    </uc-form-modal>
</template>

<script>
    export default {
        emits: ["update:isOpen", "onFinish"],
        props: ["isOpen"],
        data(){
            return {
                state: {
                    isLoadingModal: false
                },
                form: {
                    NguoiQuanLy_Id: null,
                },
                formDefault: {
                    NguoiQuanLy_Id: null,
                },
                rules: {
                    Is_NguoiDuyet : [{Required: true, message: "Vui lòng chọn vai trò", trigger: "change"}],
                }
            }
        },
        methods: {
            onCancel(){
                this.$emit("update:isOpen", false)
            },
            onSubmit(){
                this.$message.success("Thêm thành công")
                this.$emit("onFinish", this.form)
                this.form = { ...this.formDefault}
                this.onCancel()
            },
			
           
        }

    }
</script>