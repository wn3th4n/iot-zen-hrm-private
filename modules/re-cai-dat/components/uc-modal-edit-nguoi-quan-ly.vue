<template>
    <uc-form-modal :isOpen="isOpen" title="Sửa người quản lý" :width="450" ref="modalRef"
        :formData="record" @onClose="onCancel()" @onSubmit="onSubmit()" :isSubmit="state.isLoadingModal">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Chọn nhân sự" name="HoVaTenNhanVien">
                   <a-input v-model:value="record.HoVaTenNhanVien" disabled/>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Vai trò" name="Is_NguoiDuyet">
                    <a-select class="w-100" v-model:value="record.Is_NguoiDuyet">
                        <a-select-option :value="0">Người theo dõi</a-select-option>
                        <a-select-option :value="1">Người duyệt</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Thứ tự duyệt" name="ThuTu">
                    <a-input v-model:value="record.ThuTu" :disabled="record.Is_NguoiDuyet !== 1"/>
                </a-form-item>

            </a-col>

        </a-row>
    </uc-form-modal>
</template>

<script>
    export default {
        emits: ["update:isOpen", "onFinish"],
        props: ["isOpen", "record"],
        data(){
            return {
                state: {
                    isLoadingModal: false
                },
                form: {
                    Is_NguoiDuyet: 0,
                    NguoiQuanLy_Id: null,
                    ThuTu: null,
                },
                formDefault: {
                    Is_NguoiDuyet: 0,
                    NguoiQuanLy_Id: null,
                    ThuTu: null,
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
                this.$emit("onFinish", this.record)
                this.onCancel()
            },
			
           
        }

    }
</script>