<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm nhân sự" :width="400" ref="modalRef"
        :formData="form" @onClose="onCancel()" @onSubmit="onSubmit()" :isSubmit="state.isLoadingModal">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Chọn nhân sự" name="NguoiQuanLy_Id">
                   <uc-select-nhan-vien v-model:value="form.NguoiQuanLy_Id" />
                </a-form-item>
            </a-col>

        </a-row>
    </uc-form-modal>
</template>

<script>
    export default {
        emits: ["update:isOpen", "onFinish"],
        props: ["isOpen", "ChinhSach_NghiPhep_Id", "Is_NguoiDuyet"],
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
                    NguoiQuanLy_Id : [{Required: true, message: "Vui lòng chọn nhân sự", trigger: "change"}],
                }
            }
        },
        methods: {
            onCancel(){
                this.$emit("update:isOpen", false)
            },
            async onSubmit(){
                const res = await chinhSachService.ChinhSach_NghiPhep_NguoiQuanLy_Insert({
                    ChinhSach_NghiPhep_Id: this.ChinhSach_NghiPhep_Id,
                    Is_NguoiDuyet: this.Is_NguoiDuyet,
                    NguoiQuanLy_Id : this.form.NguoiQuanLy_Id
                })
                if(res){
                    this.$emit("onFinish")
                    this.$message.success("Thêm thành công")
                    this.form = this.formDefault
                    this.onCancel()
                }
            },
			
           
        }

    }
</script>