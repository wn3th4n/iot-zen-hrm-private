<template>
    <uc-form-modal :isOpen="isOpen" title="Chỉnh sửa chính sách" :formData="record" :rules="rules" @onClose="onCancel()"
        @onSubmit="onsubmit()" :isSubmit="states.isLoadingModal" :width="650">
            
      
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'dsNhomChinhSach', 'record'],
    data() {
        return {
            states: {
               
            },
            rules: {
             
            },
        }
    },
    methods: {
        onCancel() {
            this.$emit('update:isOpen', false)
        },
        async onsubmit() {
           
        },
     
    },
}
</script>
