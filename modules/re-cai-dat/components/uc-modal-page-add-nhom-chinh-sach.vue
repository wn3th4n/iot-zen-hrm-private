<template>
    <uc-form-modal title="Thêm nhóm chính sách" :width="650" ref="modalRef" :formData>

    </uc-form-modal>
</template>

<script>
    export default {
        props: ["isOpen"],
        data(){
            return {
                formData: {
                    
                }
            }
        },

    }
</script>
