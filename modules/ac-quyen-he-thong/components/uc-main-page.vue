<template>
	<uc-layout>
		<a-row>
			<a-col :span="4" class="menu-left">
				<a-spin :spinning="state.isLoadingBoPhan">
					<div class="d-flex flex-row align-items-center justify-content-between">
						<p class="menu-left-title">Bộ phận</p>
						<a style="padding: 15px;"><uc-icon name="plus" size="20" @click="openModalAddBoPhan()" /></a>
					</div>

					<a-menu class="scrollbar-thin" v-model:selectedKeys="selectedKeyMenu" mode="vertical"
						style="max-height: calc(100vh - 58px); overflow: auto">
						<a-menu-item v-for="item in dsBoPhan" :key="item.key">
							<a-row :gutter="[10]">
								<a-col :span="16">
									<span>{{ item.label }}</span>
								</a-col>

								<a-col :span="5">
									<uc-icon v-if="item.data.Is_TamKhoa" class="text-red"
										name="lock-outline" />
								</a-col>

								<a-col :span="3">
									<a-dropdown :trigger="['click']">
										<a class="ant-dropdown-link">
											<uc-icon name="dots-horizontal"/>
										</a>
										<template #overlay>
											<a-menu>
												<a-menu-item @click="openModalPhanQuyen(item.data)">
													<uc-icon class="text-primary"
														name="application-variable-outline" />Phân quyền
												</a-menu-item>
												<a-menu-item @click="onEdit(item.data)">
													<uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
												</a-menu-item>
												<a-menu-item @click="onDelete(item.data)">
													<uc-icon class="text-red" name="delete-outline" />Xoá
												</a-menu-item>
											</a-menu>
										</template>
									</a-dropdown>
								</a-col>
							</a-row>

						</a-menu-item>
					</a-menu>
				</a-spin>
			</a-col>
			<a-col :span="20">
				<uc-main-page-nhan-su :record="dsBoPhan[selectedKeyMenu[0]-1]" @onFinish="loadBoPhan()" />
			</a-col>
		</a-row>

		<uc-modal-add-bo-phan v-model:isOpen="state.isOpenModalAddBoPhan" @onFinish="loadBoPhan()" />
		<uc-modal-edit-bo-phan :record="recordEdit" v-model:isOpen="state.isOpenModalEditBoPhan"
			@onFinish="loadBoPhan()" />
		<uc-modal-quyen v-model:isOpen="state.isOpenModalPhanQuyen" :record="recordModalPhanQuyen" />
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				state: {
					isOpenModalAddBoPhan: false,
					isOpenModalEditBoPhan: false,
					isOpenModalPhanQuyen: false,
					isOpenModalShowDsNhanSu: false,
					isLoadingBoPhan: false,
				},
				recordModalPhanQuyen: {},
				recordModalShowDsNhanSu: {},
				selectedKeyMenu: [1],
				dsBoPhan: [],
				recordEdit: {},
			}
		},
		mounted() {
			this.loadBoPhan();
		},
		computed: {},
		watch: {},
		methods: {
			async loadBoPhan() {
				this.state.isLoadingBoPhan = true
				const res = await boPhanService.BoPhan_Select().finally(() => {
					this.state.isLoadingBoPhan = false
				})
	
				if (res) {
					let idx = 0
					this.dsBoPhan = res.map((i) => ({
						key: ++idx,
						label: i.TenBoPhan,
						data: i
					}));
				}
			},
			onEdit(record) {
				this.state.isOpenModalEditBoPhan = true;
				this.recordEdit = Object.assign({}, record)
				this.recordEdit.Is_TamKhoa = this.recordEdit.Is_TamKhoa ? 1 : 0
			},
			async onDelete(record) {
				Confirm.delete({
					content: 'Bạn có muốn xoá bộ phận '+ record.TenBoPhan+'?',
					onOk: async () => {
						const res = await boPhanService.BoPhan_Delete({ BoPhan_Id: record.BoPhan_Id })
						if (res){
							this.$message.success('Xoá bộ phận thành công!')
							this.loadBoPhan()
						}
					}
				})
			},
			openModalAddBoPhan() {
				this.state.isOpenModalAddBoPhan = true;
			},
			async openModalPhanQuyen(record) {
				const quyen_Id_list_select = await quyenService.BoPhan_Quyen_Select_By_BoPhan_Id({
					BoPhan_Id: record.BoPhan_Id
				})
	
				if (quyen_Id_list_select) {
					this.state.isOpenModalPhanQuyen = true;
					this.recordModalPhanQuyen = Object.assign({}, record)
					this.recordModalPhanQuyen.Quyen_Id_List = Array.isArray(quyen_Id_list_select) ? quyen_Id_list_select.map((e) => (e.Quyen_Id)) : []
                }
			},
		},
	}
</script>