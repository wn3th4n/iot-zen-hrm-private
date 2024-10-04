<template>
	<a-modal centered aria-hidden="false" v-model:open="isOpen" :title="title" @cancel="onCancel"
		:width="isFullScreen ? '100%' : width" :wrap-class-name="isFullScreen ? 'full-modal' : ''"
		:destroyOnClose="true" :maskClosable="false" :closable="false">
		<template #footer>
			<a-button key=" back" type="default" @click="onCancel"><uc-icon name="close" />Hủy</a-button>
			<a-button v-if="isShowBtnSave" key="submit" type="primary" :loading="isLoading" @click="onSubmit">
				<uc-icon name="content-save" />
				{{ okText ? okText : 'Lưu' }}
			</a-button>
		</template>
		<a-form :model="formData" :rules="rules" ref="formRef" layout="vertical">
			<slot></slot>
		</a-form>
	</a-modal>
</template>

<script>
	export default {
	    emits: ['onSubmit', 'onClose',],
	    props: {
	        isOpen: { type: Boolean, required: true },
	        title: { type: String, default: '' },
	        width: { type: Number, default: 650 },
	        isFullScreen: { type: Boolean, default: false },
	        isLoading: { type: Boolean, default: false },
	        formData: { type: Object, required: true },
	        rules: { type: Object },
	        okText: { type: String },
	        isShowBtnSave: { type: Boolean, default: true }
	    },
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