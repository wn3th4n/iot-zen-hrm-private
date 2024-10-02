<template>
	<uc-form-modal :width="950" title="Trường dữ liệu tùy chỉnh" :isOpen="isOpen" :formData="record" :rules="rules"
		@onSubmit="onSubmit()" :isSubmit="state.isLoading" @onClose="onCancel()">
		<a-tabs>
			<a-tab-pane key="1" tab="Chỉnh sửa">
				<a-row gutter="10">
					<a-col span="18">
						cccc
					</a-col>
					<a-col span="6">
						<h3>Loại trường</h3>
						<div v-for="(item, index) in value.TruongDuLieuList" :key="index">
							<div class="d-flex justify-center align-center">
								<uc-icon :name="item.Icon" color="primary" size="40" />
								<div>
									<p>{{item.TenTruong}}</p>
									<p>{{item.MoTa}}</p>
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
</template>

<script>
	export default {
		props: ["record", "isOpen"],
		data() {
			return {
				state: {
					isLoading: true
				},
				value: {
					TruongDuLieuList: []
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
			}
		},
		methods: {
			async onLoadTruongDuLieu() {
				const isSelect = await truongDuLieuService.TruongDuLieu_Select()
				if (isSelect) {
					this.value.TruongDuLieuList = isSelect
					console.log("TruongDuLieuList", this.value.TruongDuLieuList)
				} else {
					console.log("Fail to load Truong du lieu")
				}
			},
			onSubmit() {
	
			},
			onCancel() {
				this.$emit('update:isOpen', false)
				// this.resetField()
			},
		},
	}
</script>