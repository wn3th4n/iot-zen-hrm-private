<template>
	<div>
		<uc-form-modal :width="950" title="Trường dữ liệu tùy chỉnh" :isOpen="isOpen" :formData="record" :rules="rules"
			@onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()">
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
						</a-col>
						<a-col :span="7">
							<h3>Loại trường</h3>
							<div v-for="(item, index) in value.TruongDuLieuList" :key="index">
								<div class="d-flex justify-center align-center">
									<uc-icon :name="item.Icon" color="primary" size="30" />
									<div class="ms-2">
										<p><b>{{item.TenTruong}}</b> <br />
										<p>{{item.MoTa}}</p>
										</p>
									</div>
								</div>
							</div>
						</a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="2" tab="Xem trước">
					<p>bbbbbb</p>
				</a-tab-pane>
			</a-tabs>
		</uc-form-modal>

		<uc-modal-add-field v-model:isOpen="state.isOpenModalAddField" :record="value.newField" :truongdulieulist="value.TruongDuLieuList"/>
	</div>
</template>

<script>
	export default {
		props: ["record", "isOpen"],
		data() {
			return {
				state: {
					isLoading: true,
					isOpenModalAddField: false
				},
				value: {
					TruongDuLieuList: [],
					newField: null,
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
			onSubmit() {
				console.log("value", this.value)
			},
			onCancel() {
				this.$emit('update:isOpen', false)
				// this.resetField()
			},
		},
	}
</script>