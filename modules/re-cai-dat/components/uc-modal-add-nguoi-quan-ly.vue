<template>
    <div>
        <uc-form-modal :width="450" :formData="formData" :isOpen="isOpen" @onClose="$emit('update:IsOpen', false)" @onSubmit="submit()">
            <a-row :gutter="[10]"> 
                <a-col :span="12">

                </a-col>
            </a-row>
        </uc-form-modal>
    </div>
</template>

<script>
export default {
    emits: ["update:IsOpen", "onFinish"],
    props: ["isOpen"],
    data() {
        return {
            formData: {
                NhanVien_Id: null,

            }
        }
    },
    methods: {
        async submit() {
        
        }
    }
}
</script>
