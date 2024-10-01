<template>
	<a-modal v-model="action.isShowModalAddCot" title="Thêm cấu hình cột" :width="1500" class="v-application">
		<template slot="footer">
			<a-button key="back" type="default" icon="close" @click="handleCancel"> Hủy</a-button>
			<a-button key="submit" type="primary" icon="save" :loading="loading" @click="onSubmit"> Tạo</a-button>
		</template>
		<a-row :gutter="ROW_GUTTER" justify="end">
			<a-col :span="6">
				<a-tabs default-active-key="1">
					<a-tab-pane key="1" tab="Biến hệ thống">
						<a-menu mode="inline" style="width: 100%;height: 534px;overflow-y: scroll;overflow-x: hidden;">
							<a-sub-menu :key="item.NhomBien_Id" v-for="item in DSBienHeThong.Nhom_OfBien">
								<span slot="title"><a-icon type="folder" /><strong>{{ item.TenNhomBien
										}}</strong></span>
								<a-menu-item style="min-height:120px;line-height:1.5"
									v-for="v in DSBienHeThong.Bien_ByNhom.filter(x => x.NhomBien_Id === item.NhomBien_Id)"
									:key="v.Bien_Id">
									<div style="display: flex; flex-direction:column ;">
										<div style="display: flex; justify-content: space-between; ">
											<strong class="menu-item">{{ v.TenBien }} </strong> <a-icon
												@click="onCopy(v.MaBien)" type="copy" :style="{ fontSize: '18px' }" />
										</div>
										<span class="menu-item">ID hệ thống: <span
											class="primary--text font-weight-medium">{{ v.MaHeThong }}</span></span>
										<span class="menu-item">ID:
											<span class="primary--text font-weight-medium"> {{ v.MaBien}}</span>
										</span>
										<span class="menu-item">Mô tả: {{ v.MoTa }}</span>
										<a-divider style="margin-top:10px;margin-bottom: 0px;"></a-divider>
									</div>
								</a-menu-item>
							</a-sub-menu>
						</a-menu>
					</a-tab-pane>
					<a-tab-pane key="2" tab="Hàm">
						<a-list item-layout="horizontal" :data-source="DSBienHeThong.Ham"
							style="width: 100%;height: 534px;overflow-y: scroll;">
							<a-list-item slot="renderItem" slot-scope="item, index">
								<a-list-item-meta :description="item.MoTa">
									<strong slot="title">{{ item.TenHam }}</strong>
								</a-list-item-meta>
								<a-icon @click="onCopy(item.TenHam)" type="copy"
									:style="{ fontSize: '18px', alignSelf: 'flex-start' }" />
							</a-list-item>
						</a-list>
					</a-tab-pane>
				</a-tabs>
			</a-col>
			<a-col :span="18">
				<a-form-item :model="form" :rules="rules" ref="ruleForm">
					<a-row :gutter="ROW_GUTTER">
						<a-col :span="8">
							<a-form-item label="ID hệ thống" prop="MaHeThong">
								<a-input v-model="form.MaHeThong" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="Loại" prop="LoaiThuocTinh">
								<a-select v-model="form.LoaiThuocTinh">
									<a-select-option value="CT">
										Công thức
									</a-select-option>
									<a-select-option value="NL">
										Nhập liệu
									</a-select-option>
									<a-select-option value="HS">
										Hằng số
									</a-select-option>
									<a-select-option value="TD">
										Tự động
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="Loại dữ liệu" prop="LoaiDuLieu">
								<a-select v-model="form.LoaiDuLieu">
									<a-select-option value="TEXT">
										TEXT
									</a-select-option>
									<a-select-option value="NUM">
										NUM
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="Tên hiển thị" prop="TenThuocTinh">
								<a-input v-model="form.TenThuocTinh" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="Mã thuộc tính" prop="MaThuocTinh">
								<a-input v-model="form.MaThuocTinh" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="Công thức" prop="CongThuc">
								<a-textarea v-model="form.CongThuc" :auto-size="{ minRows: 5 }" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="Mô tả">
								<a-textarea v-model="form.MoTa" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="Hiển thị">
								<a-select v-model="form.Is_HienThi" style="width: 100px;">
									<a-select-option :value="false">Không</a-select-option>
									<a-select-option :value="true">Có</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form-item>
			</a-col>
		</a-row>

	</a-modal>
</template>

<script>
	export default {
		props: ["action", "onCreateFinish", "maubangluongid", "DSBienHeThong"],
		data() {
			return {
				loading: false,
				form: {
					MaHeThong: "",
					LoaiThuocTinh: "TD",
					LoaiDuLieu: "TEXT",
					MaThuocTinh: "",
					TenThuocTinh: "",
					CongThuc: "",
					MoTa: "",
					Is_HienThi: true
				},
				form_default: {
					MaHeThong: "",
					LoaiThuocTinh: "TD",
					LoaiDuLieu: "TEXT",
					MaThuocTinh: "",
					TenThuocTinh: "",
					CongThuc: "",
					MoTa: "",
					Is_HienThi: true
				},
				rules: {
					MaThuocTinh: [
						{ required: true, message: "Vui lòng nhập mã thuộc tính", trigger: "change" }
					],
					LoaiDuLieu: [
						{ required: true, message: "Vui lòng chọn loại dữ liệu", trigger: "change" }
					],
					LoaiThuocTinh: [
						{ required: true, message: "Vui lòng chọn loại thuộc tính", trigger: "change" }
					],
	
				}
			}
		},
		mounted() { },
		computed: {
		},
		watch: {
			"action.isShowModalAddCot": function (val) {
				val || this.handleCancel()
			}
		},
		methods: {
			handleCancel() {
				this.action.isShowModalAddCot = false
				this.form = Object.assign({}, this.form_default)
				this.$refs.ruleForm.resetFields()
			},
			onSubmit() {
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
						ajaxCALL("/work/PA_MauBangLuong_ThuocTinh_Insert", {
							MauBangLuong_Id: this.maubangluongid,
							CongThuc: this.form.CongThuc,
							MaThuocTinh: this.form.MaThuocTinh,
							TenThuocTinh: this.form.TenThuocTinh,
							MoTa: this.form.MoTa,
							MaHeThong: this.form.MaHeThong,
							LoaiThuocTinh: this.form.LoaiThuocTinh,
							LoaiDuLieu: this.form.LoaiDuLieu,
						}, res => {
							this.handleCancel()
							this.$message.success("Thêm mẫu bảng lương thành công!")
							this.$emit("onCreateFinish", true)
						}, err => {
	
						})
					}
				})
			},
			onCopy(text) {
				navigator.clipboard.writeText(text);
				this.$message.success("Đã sao chép " + text)
			}
		},
	}
</script>