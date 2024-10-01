<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm nhóm chính sách" :width="450" :rules="rules" ref="modalRef" :formData="formData" @onClose="onCancel()" @onSubmit="onSubmit()" :isSubmit="state.isLoadingModal">
        <a-row>
            <a-col :span="24">
                <a-form-item label="Tên nhóm chính sách" name="TenNhomChinhSach_LamThem" >
                    <a-input v-model:value="formData.TenNhomChinhSach_LamThem" />
                </a-form-item>
              
            </a-col>

            <a-col :span="24">
                <a-form-item label="Mô tả" name="Mota" >
                    <a-input v-model:value="formData.MoTa" />
                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item label="Tạm khoá" name="Is_TamKhoa" >
                    <a-select v-model:value="formData.Is_TamKhoa">
                      <a-select-option :value="0">Không</a-select-option>
                      <a-select-option :value="1">Tạm khoá</a-select-option>
                    </a-select>
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
                    isLoadingModal: true
                },
                formData: {
                    TenNhomChinhSach_LamThem: null,
                    MoTa: null,
                    Is_TamKhoa: 0, 
                },
                rules: {
                    TenNhomChinhSach_LamThem: [{required: true, message: 'Tên nhóm chính sách không được để trống', trigger: 'change'}]
                }
            }
        },
        methods: {
            onCancel(){
                this.$emit("update:isOpen", false)
            },
            async onSubmit(){
                this.state.isLoadingModal = true
                const isInsert = await nhomChinhSachService.NhomChinhSach_LamThem_Insert(this.formData).finally(() => {
                    this.state.isLoadingModal = false   
                })
                if(isInsert){
                    this.$emit("onFinish")
                    this.onCancel()
                    this.$message.success('Thêm mới thành công')
                    this.$refs.modalRef.$refs.formRef.resetFields()
                }
            },
           
        }

    }
</script>
