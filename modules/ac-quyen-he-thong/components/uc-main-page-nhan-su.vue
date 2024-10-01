<template>
	<a-card class="card-title-page">
		<template #title>
			<a-space>
				<span>Danh sách nhân sự</span>
				<a-tag color="blue">
					<span style="font-size:12px" class="text-primary">{{ record?.data?.TongSoLuongNhanVien }} 
						<uc-icon name="account"/>
					</span>
				</a-tag>
			</a-space>
		</template>

		<template #extra>
			<a-space>
				<a-button type="primary" @click="openModalAdd()">
					<uc-icon name="plus" />Thêm nhân sự
				</a-button>
			</a-space>
		</template>
	</a-card>

	<uc-container :width="650">
		<a-table :loading="state.isLoadingBoPhanNhanSu" size="small" :dataSource="dsNhanSu" :pagination="false"
			:columns="columns">
			<template #bodyCell="{column, record}">
				<template v-if="column.key === 'HoVaTen'">
					<a-space size="small">
						<uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien"/> 
						<b @click="onClickUserInfo(record)" class="cursor-pointer">{{ record.HoVaTenNhanVien }} </b>
					</a-space>
				</template>

				<template v-else-if="column.key === 'Action'">
					<a-dropdown :trigger="['click']">
						<a class="ant-dropdown-link">
							<uc-icon name="dots-horizontal" />
						</a>
						<template #overlay>
							<a-menu>
								<a-menu-item @click="onDelete(record)">
									<uc-icon class="text-red" name="delete-outline" />Xoá
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</template>
			</template>
		</a-table>
	</uc-container>
	<uc-modal-add-nhan-su v-model:isOpen="state.isOpenAdd" :record="recordModal" @onFinish="onFinish" />
</template>

<script>
	export default {
		emits: ["onFinish"],
		props: ["record"],
		data() {
			return {
				state: {
					isLoadingBoPhanNhanSu: false,
					isLoadingDelete: false,
					isOpenAdd: false
				},
				columns: [
					{
						title: 'Tên nhân sự',
						dataIndex: 'HoVaTenNhanVien',
						key: 'HoVaTen'
					},
					{
						title: 'Mã nhân sự',
						dataIndex: 'MaNhanVien',
						key: 'MaNhanSu',
						align: 'center',
						width: 150
					},
					{
						title: '',
						key: 'Action',
						align: 'center',
						width: 100
					}
				],
				dsNhanSu: [],
				recordModal: {}
			}
		},
		mounted() { },
		computed: {},
		watch: {
			'record.data.BoPhan_Id': function (val) {
				this.loadBoPhanNhanSu()
			}
		},
		methods: {
			async loadBoPhanNhanSu() {
				this.state.isLoadingBoPhanNhanSu = true;
				const res = await boPhanService.BoPhan_Select_NhanVien({
					BoPhan_Id: this.record.data.BoPhan_Id
				}).finally(() => this.state.isLoadingBoPhanNhanSu = false)
				this.dsNhanSu = res
			},
			openModalAdd() {
				this.state.isOpenAdd = true
				this.recordModal = {
					...this.record.data,
					NhanVien_Id: null
				}
			},
			onDelete(record) {
				Confirm.delete({
					content: 'Xác nhận xoá ' + record.HoVaTenNhanVien + ' ra khỏi bộ phận?',
					onOk: async () => {
						const res = await boPhanService.BoPhan_Delete_NhanVien({
							BoPhan_Id: this.record.data.BoPhan_Id,
							NhanVien_Id: record.NhanVien_Id
						})
						if (res) {
							this.$message.success("Xoá nhân sự ra khỏi bộ phận thành công!")
							this.onFinish()
						}
					}
				})
			},
			onClickUserInfo(record) {
				redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
			},
			onFinish() {
				this.loadBoPhanNhanSu();
				this.$emit("onFinish")
			},
			
		},
	}
</script>