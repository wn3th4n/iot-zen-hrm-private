<template>
    <uc-form-modal :width="450" :isOpen="isOpen" ref="modalRef" :formData="record" title="Chỉnh sửa đề xuất làm thêm" @onSubmit="onFinish" @onClose="closeModal" :isSubmit="state.isLoadingModal">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Tiêu đề " name="TieuDe" :rules="[{ required: true, message: 'Vui lòng nhập tiêu đề' }]">
                    <a-input v-model:value="record.TieuDe" placeholder="Nhập tiêu đề"></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả ">
                    <a-textarea v-model:value="record.MoTa"/>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
    export default {
        emits: ["update:isOpen", "onFinish"],
        props: ["isOpen","record"],
        data(){
            return{
                state: {
                    isLoadingModal: false
                },
                
            }
        },
        methods:{
            closeModal(){
                this.$emit("update:isOpen", false)
            },
            onFinish(){
                this.state.isLoadingModal = true

                const params = {
                    DeXuat_LamThem_Id: this.record.DeXuat_LamThem_Id,
                    TieuDe:  this.record.TieuDe,
                    MoTa: this.record.MoTa
                }

                const isUpdate = deXuatLamThemService.DeXuat_LamThem_Update(params).finally(()=> this.state.isLoadingModal = false)
                
                if(isUpdate){
                    this.$message.success("Cập nhật thành công")
                    this.resetData()
                    this.$emit("onFinish");
                    this.closeModal()
                }
            },
            resetData(){
                this.$refs.modalRef.$refs.formRef.resetFields()
            }
        }
    }
</script>