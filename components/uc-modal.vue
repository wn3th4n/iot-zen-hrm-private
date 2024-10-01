<template>
    <a-modal centered aria-hidden="false" v-model:open="isOpen" :title="title" @cancel="$emit('onClose')" :width="isFullScreen ? '100%' : width"
        :wrap-class-name="isFullScreen ? 'full-modal' : ''" :destroyOnClose="true" :maskClosable="false"
        :closable="false">
        <template #footer>
            <a-button key="back" type="default" @click="onCancel"><uc-icon name="close" />Đóng</a-button>
            <a-button v-if="okText" key="submit" type="primary" @click="onSubmit"> <uc-icon
                    name="content-save-outline" />{{ okText }} </a-button>
        </template>
        <slot></slot>
    </a-modal>
</template>

<script>
export default {
    emits: ['onClose', 'onSubmit'],
    props: {
        isOpen: { type: Boolean, required: true },
        title: { type: String, default: '' },
        width: { type: Number, default: 650 },
        isFullScreen: { type: Boolean, default: false },
        okText: { type: String },
    },
    methods: {
        onCancel() {
            const $this = this
            $this.$emit('onClose')
        },
        onSubmit() {
            const $this = this
            $this.$emit('onSubmit')
        },
    },
}
</script>
