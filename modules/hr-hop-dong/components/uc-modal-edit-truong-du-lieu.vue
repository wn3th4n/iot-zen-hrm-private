<template>
	<div>
		<uc-form-modal :width="950" title="Trường dữ liệu tùy chỉnh" :isOpen="isOpen" :formData="record" :rules="rules"
			@onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()" :isShowBtnSave="false">
			<a-tabs>
				<a-tab-pane key="1" tab="Chỉnh sửa">
					<a-row :gutter="[10]">
						<a-col :span="17">
							<div class="mt-2">
								<a-select v-model:value="value.newField" class="truongSelect"
									placeholder="Thêm trường mới">
									<a-select-option v-for="item in value.TruongDuLieuList" :key="item.value">
										{{item.label}}
									</a-select-option>
								</a-select>
							</div>

							<!-- Load danh sách trường dữ liệu đã chỉnh -->
							<div class="mt-3">
								<div v-for="(item, index) in value.DuLieuList" :key="index">
									<a-row :gutter="[10]">
										<a-col>
											<uc-icon :name="item.Icon" color="primary" size="25" />
										</a-col>
										<a-col :span="17">
											<b>{{item.TenTruongDuLieu}}</b> <br />
											<span class="d-flex mb-0">
												<b
													class="text-primary mb-0">custom_{{item.TenTruongDuLieu.toLowerCase()}}</b>
												<p class="ms-1 mb-0">- {{item.MoTa ?
													item.MoTa : 'Không có miêu tả'}}</p>
											</span>
											<span class="d-flex">
												<b class="dark-gray-text">Bắt buộc:</b>
												<p class="ms-1">{{item.Is_BatBuoc ? 'Bắt buộc' : 'Không bắt buộc'}}</p>
											</span>
										</a-col>
										<a-col class="mt-2 align-center" :span="5">
											<a-space size="small">
												<a-button @click="onEdit(item)" type="text">Chỉnh sửa</a-button>
												<a-button @click="onDelete(item.LoaiHopDong_TruongDuLieu_Id)"
													type="text">xóa</a-button>
											</a-space>
											<p class="text-primary smallText"><b>{{item.KieuDuLieu}}</b></p>
										</a-col>
									</a-row>
								</div>
							</div>
						</a-col>
						<a-col :span="7">
							<!-- Load các trường dữ liệu -->
							<h3>Loại trường</h3>
							<div v-for="(item, index) in value.TruongDuLieuList" :key="index">
								<div class="d-flex justify-center align-center">
									<uc-icon :name="item.Icon" color="primary" size="30" />
									<div class="ms-2">
										<p>
											<b>{{item.TenTruong}}</b> <br />
										<p class="dark-gray-text">{{item.MoTa}}</p>
										</p>
									</div>
								</div>
							</div>
						</a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="2" tab="Xem trước">
					<uc-preview-form :dulieulist="value.DuLieuList" />
				</a-tab-pane>
			</a-tabs>
		</uc-form-modal>

		<uc-modal-add-field v-model:isOpen="state.isOpenModalAddField" :record="value.newField"
			:truongdulieulist="value.TruongDuLieuList" :loaihopdong="record"
			@onFinish="onLoadDuLieu(this.record.LoaiHopDong_Id)" />
		<uc-modal-update-field v-model:isOpen="state.isOpenModalEditField" :record="value.recordEdit"
			:truongdulieulist="value.TruongDuLieuList" :loaihopdong="record"
			@onFinish="onLoadDuLieu(this.record.LoaiHopDong_Id)" />
	</div>
</template>

<script>
	export default {
		props: ["record", "isOpen"],
		data() {
			return {
				state: {
					isLoading: true,
					isOpenModalAddField: false,
					isOpenModalEditField: false,
				},
				value: {
					TruongDuLieuList: [],
					DuLieuList: [],
					newField: null,
					recordEdit: null,
				},
				rules: {},
			}
		},
		mounted() { },
		computed: {},
		watch: {
			isOpen: function (val) {
				if (val) {
					this.onLoadTruongDuLieu()
					this.onLoadDuLieu(this.record.LoaiHopDong_Id)
				}
			},
			"value.newField": function (val) {
				console.log("val", val)
				this.state.isOpenModalAddField = true
			}
		},
		methods: {
			async onLoadTruongDuLieu() {
				const isSelect = await truongDuLieuService.TruongDuLieu_Select()
				if (isSelect) {
					this.value.TruongDuLieuList = isSelect.map(item => {
						return {
							...item,
							label: item.TenTruong,
							value: item.TruongDuLieu_Id
						}
					})
					console.log("TruongDuLieuList", this.value.TruongDuLieuList)
				} else {
					console.log("Fail to load Truong du lieu")
				}
			},
			async onLoadDuLieu(id) {
				const param = {
					LoaiHopDong_Id: id
				}
	
				const isSelect = await loaiHopDongLoaiDuLieuService.LoaiHopDong_TruongDuLieu_Select(param)
				if (isSelect) {
					this.value.DuLieuList = isSelect
					console.log("this.value.DuLieuList", this.value.DuLieuList)
				} else {
					console.log("Fail to load du lieu")
				}
			},
			onSubmit() {
				console.log("value", this.value)
			},
			onEdit(record) {
				this.value.recordEdit = record
				this.state.isOpenModalEditField = true
			},
			async onDelete(id) {
				const param = {
					LoaiHopDong_TruongDuLieu_Id: id
				}
	
				const isSelect = await loaiHopDongLoaiDuLieuService.LoaiHopDong_TruongDuLieu_Delete(param)
				if (isSelect) {
					this.$message.success("Xóa trường dữ liệu thành công")
					this.onLoadDuLieu(this.record.LoaiHopDong_Id)
				} else {
					console.log("Fail to load du lieu")
					this.$message.error("Xóa trường dữ liệu thất bại")
				}
			},
			onCancel() {
				this.$emit('update:isOpen', false)
				// this.resetField()
			},
		},
	}
</script>