<template>
    <uc-form-modal :width="350" :isOpen="isOpen" title="Thêm khung thời gian" @onClose="onClose()" @onSubmit="onFinish()" :isSubmit="state.isLoading">
        <a-row :gutter="[10]">
            <a-col :span="12">
                <a-form-item label="Thời gian bắt đầu">
                    <a-time-picker v-model:value="formData.timeBatDau" format="h:mm" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Thời gian kết thúc">
                    <a-time-picker v-model:value="formData.timeKetThuc" format="h:mm" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
    export default {
        emits: ["update:isOpen", "onFinish"],
        props: ["isOpen", "data"],
        data(){
            return {
                state: {
                    isLoading: false,
                },
                formData: {
                    timeBatDau: null,
                    timeKetThuc: null,
                }
            }
        },
        methods: {
            async onFinish(){
                this.onClose();
            },
            onClose(){
                this.$emit("update:isOpen", false)
            }
        }
    }   
</script>
