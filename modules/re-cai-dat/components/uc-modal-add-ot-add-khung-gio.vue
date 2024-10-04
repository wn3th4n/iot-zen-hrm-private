<template>
    <uc-form-modal ref="modalRef2" :formData="formData" :rules="rules" :width="550" :isOpen="isOpen" title="Thêm khung thời gian" @onClose="onClose()" @onSubmit="onFinish()" :isSubmit="state.isLoading">
        <a-row :gutter="[10]">
            <a-col :span="8">
                <a-form-item label="Thời gian bắt đầu" name="GioBatDau">
                    <a-time-picker format="HH:mm" v-model:value="formData.GioBatDau" placeholder="hh:mm" :minuteStep="5" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Thời gian kết thúc" name="GioKetThuc">
                    <a-time-picker format="HH:mm" v-model:value="formData.GioKetThuc" placeholder="hh:mm" :minuteStep="5" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Ca qua đêm" name="Is_QuaDem">
                    <a-select v-model:value="formData.Is_QuaDem" >
                      <a-select-option :value="0">Không</a-select-option>
                      <a-select-option :value="1">Qua đêm</a-select-option>
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
                    isLoading: false,
                },
                formData: {
                    GioBatDau: '',
                    GioKetThuc: '',
                    Is_QuaDem: 0,
                },
                formDefault: {
                    GioBatDau: '',
                    GioKetThuc: '',
                    Is_QuaDem: 0,
                },
                rules: {
                    GioBatDau : [{ required: true, message: "Vui lòng chọn thời gian bắt đầu" , trigger: "change"}],
                    GioKetThuc : [{ required: true, message: "Vui lòng chọn thời gian kết thúc" , trigger: "change"}]
                }
            }
        },
        methods: {
            onFinish(){
                const data = {
                    ...this.formData,
                    GioBatDau: this.formData.GioBatDau.format("HH:mm"),
                    GioKetThuc: this.formData.GioKetThuc.format("HH:mm")
                }
                this.$message.success("Thêm thành công");
                this.$emit("onFinish", data);
                this.formData = { ...this.formDefault };
                this.onClose();
            },
            onClose(){
                this.$emit("update:isOpen", false)
            }
        }
    }   
</script>
