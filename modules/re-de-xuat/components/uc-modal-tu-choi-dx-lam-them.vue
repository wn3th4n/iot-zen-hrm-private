<template>
    <uc-form-modal :width="450" :isOpen="isOpen" ref="modalRef" :formData="form" title="Từ chối đề xuất làm thêm" @onSubmit="onFinish" @onClose="closeModal" :isSubmit="state.isLoadingModal">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Tiêu đề" name="TieuDe">
                    <a-input v-model:value="record.TieuDe" placeholder="Nhập tiêu đề" disabled=""></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Người đề xuất" name="TieuDe">
                    <a-input v-model:value="record.DeXuat_HoVaTenNhanVien" disabled=""></a-input>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Lí do từ chối" name="LiDoTuChoi">
                    <a-textarea v-model:value="form.LiDoTuChoi"/>
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
                form: {
                    LiDoTuChoi: undefined
                }
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
                    LyDoTuChoi: this.form.LiDoTuChoi
                }

                const isUpdate = deXuatLamThemService.DeXuat_LamThem_TuChoi(params).finally(()=> this.state.isLoadingModal = false)
                
                if(isUpdate){
                    this.$message.success("Từ chối thành công")
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