<template>
	<uc-form-modal v-model="action.IsShowModalEditChoDuyet" ref="refFormModal" title="Chỉnh sửa thông tin công việc" :form="record" :rules="rules"
		:width="600" @onFinish="onFinish" :isSubmit="isLoading">
		<a-row :gutter="ROW_GUTTER">
			<a-col :span="12">
				<a-form-item label="Ngày bắt đầu" >
					<a-date-picker format="DD/MM/YYYY" style="width: 100%" placeholder="DD/MM/YYYY" autoFocus/>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Văn phòng" >
					<a-input ></a-input>
				</a-form-item>
			</a-col>
            <a-col :span="12">
				<a-form-item label="Lịch làm việc" >
					<a-input ></a-input>
				</a-form-item>
			</a-col>
            <a-col :span="12">
				<a-form-item label="Khu vực / Chuyên môn" >
					<a-input ></a-input>
				</a-form-item>
			</a-col>
            <a-col :span="12">
				<a-form-item label="Vị trí" >
					<a-select >
                        
                    </a-select>
				</a-form-item>
			</a-col>
            <a-col :span="12">
				<a-form-item label="Phân loại nhân sự" >
					<a-select >
                       
                    </a-select>
				</a-form-item>
			</a-col>
            <a-col :span="12">
				<a-form-item label="Chức danh hiện tại" >
                    <a-input ></a-input>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item label="Ngày chính thức">
					<a-date-picker format="DD/MM/YYYY" style="width: 100%" placeholder="DD/MM/YYYY"/>
				</a-form-item>
			</a-col>
		</a-row>
	</uc-form-modal>
</template>
<script>
export default {
	props: ['action', 'onfinish','record'],
	data() {
		return {
			isLoading: false,
			rules: {
				LoaiViTri: [{ required: true, message: "Vui lòng nhập loại vị trí", trigger: "change" }],
			}
		}
	},
	mounted() { },
	computed: {},
	watch: {},
	methods: {
		onFinish() {
			this.isLoading = true
			ajaxCALL(null, {
                LoaiViTri_Id:this.record.LoaiViTri_Id,
				LoaiViTri:this.record.LoaiViTri,
                MoTaKhaiQuat:this.record.MoTaKhaiQuat,
                KhaiQuatMTTN:this.record.KhaiQuatMTTN,
				KhaiQuatYCBN: this.record.KhaiQuatYCBN,
			}, (res) => {
				this.isLoading = false
				this.$emit('onfinish', true)
				Vue.$toast.success("Chỉnh sửa loại vị trí công việc thành công!", { position: "top" })
				this.action.IsShowModalEditChoDuyet = false
				this.$refs.refFormModal.$refs.refForm.resetFields()
			})
		},
	},
}
</script>