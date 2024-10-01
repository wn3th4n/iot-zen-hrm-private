<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Chỉnh sửa loại nghỉ phép" :formData="record"
    :rules="rules" :width="700" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="12">
                <a-form-item label="Mã loại nghỉ" name="MaLoaiNghiPhep">
                    <a-input v-model:value="record.MaLoaiNghiPhep" :disabled="true"/>
                </a-form-item>
            </a-col>
          
            <a-col :span="12">
                <a-form-item label="Tên loại nghỉ" name="TenLoaiNghiPhep">
                    <a-input v-model:value="record.TenLoaiNghiPhep" :disabled="true"/>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="record.MoTa" placeholder="Mô tả" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
                    <a-select v-model:value="record.Is_TamKhoa">
                        <a-select-option :value="0" key="0"> Không </a-select-option>
                        <a-select-option :value="1" key="1"> Tạm khóa </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits:['onFinish'],
    props: ['isOpen', "record",'dsloainghiphep'],
    data() {
        return {
            isLoading: false,
            rules:{}
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
        onSubmit() {
            const $this = this
            $this.isLoading = true
            ajaxCALL("/work/HR_LoaiNghiPhep_Update", {
                LoaiNghiPhep_Id: $this.record.LoaiNghiPhep_Id,
                MoTa: $this.record.MoTa,
                Is_TamKhoa: $this.record.Is_TamKhoa
            }, (res) => {
                $this.handleCancel()
                $this.$emit('onFinish')
                Vue.$toast.success("Chỉnh sửa loại nghỉ phép thành công!", { position: "top" })
                $this.$refs.modalRef.$refs.formRef.resetFields()
            })
        },
    },
}
</script>