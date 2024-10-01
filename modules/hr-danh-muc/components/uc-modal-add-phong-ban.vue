<template>
	<uc-form-modal :width="600" :isOpen="isOpen" title="Thêm Phòng ban" :rules="rules" :formData="formData" ref="modalRef" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="onCancel()">
		<a-row :gutter="[10]">

			<a-col :span="12">
				<a-form-item label="Tên phòng ban" name="TenPhongBan">
					<a-input v-model:value="formData.TenPhongBan" />
				</a-form-item>
			</a-col>
            <a-col :span="12">
				<a-form-item label="Mã phòng ban" name="MaPhongBan">
					<a-input v-model:value="formData.MaPhongBan" />
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<a-form-item  label="Phòng ban cha" name="PhongBan_Parent_Id">
					<uc-select-phong-ban v-model:value="formData.PhongBan_Parent_Id" />
				</a-form-item>
			</a-col>
			
			<a-col :span="12">
				<a-form-item label="Vị trí dành cho người quản lý (kế hoạch)" name="NguoiQuanLy_ViTri_Id">
					<uc-select-nhan-vien v-model:value="formData.NguoiQuanLy_ViTri_Id"></uc-select-nhan-vien>
				</a-form-item>
			</a-col>
			
<!-- 
			<a-col :span="12">
				<a-form-item label="Danh sách nhân sự quản lý" name="NguoiQuanLy_Id_List">
					<uc-select-nhan-vien v-model:value="formData.NguoiQuanLy_Id_List" mode="multiple"></uc-select-nhan-vien>
				</a-form-item>
			</a-col>
			
			
			<a-col :span="12">
				<a-form-item label="Danh sách nhân sự trợ lý" name="NguoiTroLy_Id_List">
					<uc-select-nhan-vien v-model:value="formData.NguoiTroLy_Id_List" mode="multiple"></uc-select-nhan-vien>
				</a-form-item>
			</a-col> -->
			<a-col :span="24">
				<a-form-item label="Nhiệm vụ" name="NhiemVu">
					<a-textarea v-model:value="formData.NhiemVu"></a-textarea>
				</a-form-item>
			</a-col>
		</a-row>
    </uc-form-modal>
</template>

<script>
	export default {
        emits: ["onFinish", "update:isOpen"],
        props: ["isOpen"],
		data() {
			return {
                isLoading: false,
                rules: {
					TenPhongBan: [{required: true, message: 'vui lòng nhập tên phòng ban!', trigger: "change"}],
                    MaPhongBan: [{required: true, message: 'vui lòng nhập mã phòng ban!', trigger: "change"}],
					NguoiQuanLy_ViTri_Id: [{required: true, message: 'vui lòng chọn nhân sự quản lý phòng ban!', trigger: "change"}],
				},
                formData: {
					PhongBan_Parent_Id: null,
					TenPhongBan: null,
                    MaPhongBan: null,
					NhiemVu: null,
					NguoiQuanLy_ViTri_Id: null,
					NguoiQuanLy_Id_List: [],	
					NguoiTroLy_Id_List: []
                },
				state: {
					isHavePhongBanParent: false
				}
            }
		},
		mounted() {},
		computed: {},
		watch: {},
		methods: {
            onCancel(){
                this.$emit("update:isOpen", false)
            },
            async onSubmit(){
				const $this = this
				this.isLoading = true

				const res = await phongBanService.PhongBan_Insert(
				{
					PhongBan_Parent_Id: this.formData.PhongBan_Parent_Id ?? 0,
					TenPhongBan: this.formData.TenPhongBan,
                    MaPhongBan: this.formData.MaPhongBan,
					NhiemVu: this.formData.NhiemVu,
					NguoiQuanLy_ViTri_Id: this.formData.NguoiQuanLy_ViTri_Id,
					NguoiQuanLy_Id_List: this.formData.NguoiQuanLy_Id_List.join(', '),
					NguoiTroLy_Id_List: this.formData.NguoiTroLy_Id_List.join(', ')
				})
				
				if(res){
					this.onCancel()
					this.$emit('onFinish')
					this.$message.success('Thêm phòng ban thành công!')
					this.$refs.modalRef.$refs.formRef.resetFields()
				}
				this.isLoading = false
			}
        },
	}
</script>