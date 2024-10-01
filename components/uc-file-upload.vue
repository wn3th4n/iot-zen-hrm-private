<template>
	<a-upload v-model:file-list="fileList" name="file" @change="change" :action="apiFile" :headers="headers"
		:multiple="multiple" :show-upload-list="{ showPreviewIcon: true, showDownloadIcon: true, showRemoveIcon: true }"
		:max-count="multiple ? 10 : 1">
		<a-button type="primary">
			<uc-icon name="tray-arrow-up" />
			{{ title }}
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
			default: false
		},
		actionDelete: {
			type: Function
		},
		onDelete: {
			type: Function,
		},
		onInsert: {
			type: Function,
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
			urlReadFile: vueData.v_Set.urlReadFile
		}
	},
	mounted() { },
	computed: {

		fileList: {
			get: function () {
				if (this.modelValue?.length > 0) {
					return this.modelValue
				}
			},
			set: function (fileList) {
				this.$emit('update:modelValue', fileList)
			}
		}
	},
	watch: {

	},
	methods: {
		change({ file, fileList }) {
			if (file.status === 'uploading') return
			if (file.status === 'done') {

				this.$emit('onInsert', file?.response?.Files?.map(x => {
					return {
						...x,
						uid: x?.FileID,
						name: x?.FileName,
						status: 'done',
						url: this.urlReadFile + x?.FileID,
						isRes: true
					}
				})[0])
				this.fileList = fileList.map(x => {
					const fileRes = x?.response?.Files[0]
					if (fileRes) {
						return {
							...x,
							uid: fileRes?.FileID,
							name: fileRes?.FileName,
							status: 'done',
							url: this.urlReadFile + fileRes?.FileID,
							isRes: true
						}
					} else {
						return { ...x, isRes: false }
					}
				})
			} else if (file.status === 'removed') {
				this.$emit('onDelete', file)
			}
		},
		// handleChange(info) {
		// 	console.log(info);
		// 	if (info.file.status === 'done') {
		// 		let fileList = []
		// 		for (var file of info.fileList) {
		// 			//Kiểm tra Files có tồn tại trong respone khi upload API
		// 			if (file.response?.Files?.length > 0) {
		// 				fileList.push(file.response?.Files[0]?.FileID)
		// 			} else {
		// 				fileList.push(file.uid)
		// 			}
		// 		}
		// 		this.$emit('update:modelValue', fileList)
		// 		this.$message.success(`Thêm file thành công`);
		// 	} else if (info.file.status === "removed") {
		// 		const fileList = []
		// 		for (var file of info.fileList) {
		// 			//Kiểm tra Files có tồn tại trong respone khi upload API
		// 			if (file.response?.Files?.length > 0) {
		// 				fileList.push(file.response?.Files[0]?.FileID)
		// 			} else {
		// 				fileList.push(file.uid)
		// 			}
		// 		}
		// 		this.$emit('update:modelValue', fileList)
		// 	}
		// 	else if (info.file.status === 'error') {
		// 		this.$message.error(info.file.response.Message);
		// 	}
		// }
	},
}
</script>