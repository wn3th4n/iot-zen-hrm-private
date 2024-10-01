<template>
	<uc-form-modal :formData="record" :rules="rules" :isOpen="isOpen" title="Thêm chính sách thuế" :width="450" ref="modalRef" :isSubmit="state.isLoadingModal" @onSubmit="onSubmit()" @onClose="onClose()">
		<a-row :gutter="[10]">
			<a-col :span="24">
				<a-form-item label="Tên chính sách" name="TenChinhSach">
					<a-input v-model:value="record.TenChinhSach"/>
				</a-form-item>
			</a-col>
			<a-col :span="16">
				<a-form-item label="Mã chính sách" name="MaChinhSach">
					<a-input v-model:value="record.MaChinhSach" />
				</a-form-item>
			</a-col>
			<a-col :span="8">
				<a-form-item label="Màu chính sách" name="MauChinhSach">
					<a-input v-model:value="record.MauChinhSach" />
				</a-form-item>
			</a-col>
			<a-col :span="24">
				<a-form-item label="Mô tả" name="MoTa">
					<a-textarea v-model:value="record.MoTa"/>
				</a-form-item>
			</a-col>
            <a-col :span="8">
                <a-form-item label="Tạm khoá" name="Is_TamKhoa">
                    <a-select v-model:value="record.Is_TamKhoa" >
                        <a-select-option :value="0" >Không</a-select-option>
                        <a-select-option :value="1">Tạm Khoá</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
		</a-row>
		
	</uc-form-modal>
</template>

<script>
	export default {
		emits: ["onFinish", "update:isOpen"],
		props: ["isOpen", "record"],
		data() {
			return {
				state: {
					isLoadingModal: false,
				},
				rules: {
					TenChinhSach: [{required:true, message: "Bạn chưa nhập tên chính sách", trigger: "change"}],
					MaChinhSach: [{required:true, message: "Bạn chưa nhập mã tên chính sách", trigger: "change"}],
                    MauChinhSach: [{required:true, message: "Bạn chưa nhập mã màu chính sách", trigger: "change"}],
				},
				
			}
		},
		mounted() {},
		computed: {},
		watch: {},
		methods: {
			onClose(){
				this.$emit("update:isOpen", false)
			},
			async onSubmit(){
				this.state.isLoadingModal = true
				const reps = await thueService.ChinhSach_Thue_Update(this.record).finally(()=>this.state.isLoadingModal = false)
				if(reps) {
					this.$emit("onFinish")
					this.onClose()
					this.$message.success("Cập nhật chính sách thuế thành công!")
					this.$refs.modalRef.$refs.formRef.resetFields()
				}
			}
		},
	}
</script>