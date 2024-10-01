<template>
	<div>
		<a-card title="Thuế" class="card-title-page">
			<template #extra>
				<a-space size="small">
                    <a-button type="primary" @click="onRedirect()"><uc-icon name="launch" />Xem tất cả nhân sự tham gia</a-button>
					<a-button type="primary" @click="state.isOpenModalAdd = true"><uc-icon name="plus" />Thêm chính sách thuế</a-button>
				</a-space>
			</template>
		</a-card>
		<a-row class="p-2">
			<a-col v-for="item in value.dsThue" class="p-1" :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }"
				:lg="{ span: 12 }" :xl="{ span: 6 }">
				<a-card class="card-nghi-phep">
					<template #title>
						<div class="d-flex flex-column">
							<span>{{ item.TenChinhSach }}</span>
							<small class="text-primary fw-normal">
								{{ item.MaChinhSach }}
								<uc-icon v-if="item.Is_TamKhoa" class="text-red" name="lock-outline" />
							</small>
						</div>
					</template>
					<template #extra>
						<a-dropdown :trigger="['click']">
							<a class="ant-dropdown-link">
								<uc-icon name="dots-horizontal" />
							</a>
							<template #overlay>
								<a-menu>
									<a-menu-item @click="onEdit(item)">
										<uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
									</a-menu-item>
									<a-menu-item @click="onDelete(item)">
										<uc-icon class="text-red" name="delete-outline" />Xoá
									</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</template>
					<p>
						<b>Mô tả</b> <br />
						<span class="text-muted text-truncate-3">{{ item.MoTa }}</span>
					</p>

				</a-card>
			</a-col>
		</a-row>
		<uc-modal-add-thue v-model:isOpen="state.isOpenModalAdd" @onFinish="loadChinhSach()" />
		<uc-modal-edit-thue v-model:isOpen="state.isOpenModalEdit" @onFinish="loadChinhSach()"
			:record="value.recordEdit" />
	</div>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				state: {
					isLoading: false,
					isOpenModalAdd: false,
					isOpenModalEdit: false
				},
				value: {
					dsThue: [],
					recordEdit: {}
				}
	
			}
		},
		mounted() {
			this.loadChinhSach()
		},
		computed: {},
		watch: {},
		methods: {
			onRedirect(){
                redirect('/hr-chinh-sach-thue')
            },
			onDelete(record) {
				const $this = this
				Confirm.delete({
					content: 'Bạn có chắc muốn xoá ' + record.TenChinhSach + '?',
					onOk: async () => {
						const isDelete = await thueService.ChinhSach_Thue_Delete({
							ChinhSach_Thue_Id: record.ChinhSach_Thue_Id
						})
						if (isDelete) {
							$this.$message.success('xoá thành công chính sách')
							$this.loadChinhSach()
						}
					}
				})
			},
			onEdit(record) {
				this.value.recordEdit = Object.assign({}, record)
				this.value.recordEdit.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0
				this.state.isOpenModalEdit = true
			},
			async loadChinhSach() {
				this.state.isLoading = false
				this.value.dsThue = await thueService.ChinhSach_Thue_Select().finally(() => this.state.isLoading = true)
			},
		},
	}
</script>