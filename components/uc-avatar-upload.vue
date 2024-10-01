<template>
	<div>
		<a-upload-dragger class="circle-avatar-upload" :style="styleImage" name="file" :action="apiFile"
			:headers="headers" @change="handleChange" :show-upload-list="false" :before-upload="beforeUpload"
			accept=".JPG, .PNG, .TIFF">
			<a-spin v-if="isUploadFile"> </a-spin>
		</a-upload-dragger>
	</div>
</template>
<script>
	export default {
	    props: {
	        modelValue: {
	            type: String,
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
	            urlReadFile: vueData.v_Set.urlReadFile,
	            styleImage: {
	                'background-image': `url(${this.modelValue})`,
	                'background-position': 'center',
	                'background-repeat': 'no-repeat',
	                'background-size': 'cover',
	            },
	            isUploadFile: false,
	        }
	    },
	    watch: {
	        modelValue: function (FileID) {
	            if (FileID) {
	                this.styleImage = {
	                    'background-image': `url(${this.urlReadFile + FileID})`,
	                    'background-position': 'center',
	                    'background-repeat': 'no-repeat',
	                    'background-size': 'cover',
	                }
	
	            }
	        }
	    },
	    methods: {
	        beforeUpload(file) {
	            console.log("before========>", file)
	            return new Promise((resolve, reject) => {
	                // Sử dụng CompressorJS để resize ảnh
	                new Compressor(file, {
	                    quality: 0.5, // Đặt chất lượng ảnh (0.0 đến 1.0)
	                    maxWidth: 800,
	                    maxHeight: 800,
	                    success: (compressedFile) => {
	                        resolve(compressedFile); // Trả file sau khi đã resize
	                        console.log("compressedFile========>", compressedFile)
	                    },
	                    error(err) {
	                        this.$message.error('Resize ảnh thất bại');
	                        reject(err);
	                    }
	                });
	            });
	        },
	        handleChange(info) {
	            const status = info.file.status;
	            if (status !== 'uploading') this.isUploadFile = true
	            if (status === 'done') {
	                this.isUploadFile = false
	                const url = this.urlReadFile + info.file.response.Files[0].FileID
	                this.styleImage = {
	                    ...this.styleImage,
	                    'background-image': `url(${url})`,
	                }
	                this.$emit('update:modelValue', info.file.response.Files[0].FileID)
	                this.$message.success(`Thêm ảnh thành công`);
	            } else if (status === 'error') {
	                this.isUploadFile = false
	                this.$message.error(`${info.file.name} file upload failed.`);
	            }
	        }
	    }
	}
</script>