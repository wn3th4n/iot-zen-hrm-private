<template>

	<uc-form-modal ref="refFormModal" v-model:isOpen="isOpen" :formData="form" :rules="rules" :width="1024"
		:title="'Thêm lịch làm việc cho ' + record?.TenNgayLe" @onSubmit="onFinish" :isSubmit="loading"
		@onClose="handleCancel()">
		<a-form-item label="Văn phòng" name="MauBangCong_Id_List">
			<uc-checkbox-mau-bang-cong v-model:value="form.MauBangCong_Id_List" @validatefield="validateField">
			</uc-checkbox-mau-bang-cong>
		</a-form-item>
	</uc-form-modal>


</template>

<script>
export default {
	emits: ['onFinish'],
	props: ["isOpen", "record"],
	data() {
		return {
			loading: false,
			form: {
				MauBangCong_Id_List: []
			},
			rules: {
				MauBangCong_Id_List: [
					{ required: true, message: 'Bạn chưa chọn lịch làm việc', trigger: 'change' },
				],
			}
		}
	},
	mounted() {

	},
	computed: {},
	watch: {
		'record.NgayLe_Id': function (val) {
			if (val) {
				const temp = this.record.MauBangCong_Id_List
				this.form.MauBangCong_Id_List = temp
			}
		}
	},
	methods: {
		handleCancel() {
			const $this = this
			$this.$emit("update:isOpen", false)
		},
		onFinish() {
			const $this = this
			ajaxCALL("/work/HR_NgayLe_MauBangCong_Insert", {
				MauBangCong_Id_List: $this.form.MauBangCong_Id_List.join(','),
				NgayLe_Id: $this.record.NgayLe_Id
			}, res => {
				$this.handleCancel()
				$this.$message.success('Thêm lịch làm việc thành công');
				$this.$emit("onFinish")
			})
		},
		validateField(field) {
			const ref = this.$refs.refFormModal.$refs.refForm
			ref.validateField(field);
		}
	},
}
</script>