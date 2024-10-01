<template>
	<a-upload name="file" :action="apiFile" :headers="headers" @change="handleChange" :multiple="multiple"
		:max-count="multiple ? 10 : 1">
		<a-button type="primary">
			<uc-icon name="tray-arrow-up" />
			{{title}}
		</a-button>
	</a-upload>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: 'Thêm ảnh'
	
			},
			modelValue: {
				type: Array
			},
			multiple: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				apiFile: vueData.v_Set.apiFile,
				headers: {
					"X-Requested-With": null, // chan cors
					authorization: 'Bearer ' + getCookie('awt'),
					uploaddata: Date.now()
				},
				fileList: []
			}
		},
		mounted() { },
		computed: {},
		watch: {},
		methods: {
			handleChange(info) {
				if (info.file.status === 'done') {
					const fileList = info.fileList.map(x => x.response.Files[0].FileID)
					this.$emit('update:modelValue', fileList)
					this.$message.success(`Thêm ảnh thành công`);
				} else if (info.file.status === "removed") {
					console.log('removed', info)
					const fileList = info.fileList.map(x => x.response.Files[0].FileID)
					this.$emit('update:modelValue', fileList)
				}
				else if (info.file.status === 'error') {
					this.$message.error(info.file.response.Message);
				}
			}
		},
	}
</script>