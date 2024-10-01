<template>
    <a-modal v-model:open="isOpen" :title="title" @cancel="onCancel" :width="isFullScreen ? '100%' : width"
        :wrap-class-name="isFullScreen ? 'full-modal' : ''" :destroyOnClose="true" :maskClosable="false">
        <template #footer>
            <a-button key="back" type="default" @click="onCancel"><uc-icon name="close" />Hủy</a-button>
            <a-button key="submit" type="primary" :loading="isLoading" @click="onSubmit"><uc-icon
                    name="content-save-outline" />Lưu</a-button>
        </template>
        <a-form :model="formData" :rules="rules" ref="formRef" layout="vertical">
            <slot></slot>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    emits: ['onSubmit', 'onClose'],
    props: ['isOpen', 'title', 'width', 'isFullScreen', 'isLoading', 'formData', 'rules'],
    methods: {
        onCancel() {
            const $this = this
            $this.$refs.formRef.resetFields()
            $this.$emit('onClose')
        },
        onSubmit() {
            const $this = this
            $this.$refs.formRef.validate().then(async () => {
                $this.$emit('onSubmit')
            })
        },
    },
}
</script>
