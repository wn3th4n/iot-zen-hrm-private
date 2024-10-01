<template>
	<uc-layout>
			<a-card class="card-title-page">
				<template #title>
					 
					<a-space>
						<span> Danh sách nhân sự của {{ value.phongBan?.TenPhongBan }}</span>
						<a-tag color="blue">
							<span style="font-size:12px" class="text-primary">{{ value?.dsNhanSu?.length ?? 0 }}
								<uc-icon name="account" />
							</span>
						</a-tag>
					</a-space>
				</template>
				<template #extra>
					<a-space>
						<a-button type="primary" @click="state.isOpenModalAdd = true">
							<uc-icon name="plus" />Thêm nhân sự
						</a-button>
					</a-space>
				</template>	
			</a-card>
			<uc-container :width="800">
				<a-table size="small" :columns="columns" :pagination="false" :loading="state.isLoadingTable" :dataSource="value.dsNhanSu">
					<template #bodyCell="{column, record}">
						<template v-if="column.key === 'HoTenNhanSu'">
							<a-space size="small">
								<uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien" />
								<b @click="onClickUserInfo(record)" class="cursor-pointer">{{record.HoVaTenNhanVien}}</b>
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

			<uc-modal-add-nhan-su v-model:isOpen="state.isOpenModalAdd" :PhongBanId="value.PhongBan_Id" @onFinish="loadDsNhanSu()"/>
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			const url = new URL(window.location.href).searchParams
			const PhongBan_Id = parseInt(url.get('id'))
			return {
				state: {
                    isLoadingTable: false,
					isOpenModalAdd: false,
				},
				value: {
					dsNhanSu: [],
					phongBan: {},
					PhongBan_Id: PhongBan_Id,

				},
				columns: [
					{
						title: 'Tên nhân sự',
						dataIndex: 'HoVaTenNhanVien',
						key: 'HoTenNhanSu',
						width: 350
					},
					{
						title: 'Mã nhân sự',
						dataIndex: 'MaNhanVien',
						align: 'center'
					},
					{
						title: 'Tên chức danh',
						dataIndex: 'TenChucDanh',
					},
					{
						title: '',
						key: 'Action',
						align: 'center'
					}
				]
			}
		},
		mounted() {
			this.loadDsNhanSu()
		},
		computed: {
			getTenPhongBanLower: function(){
				return this.value.phongBan?.TenPhongBan?.toLowerCase()
			}
		},
		watch: {},
		methods: {
			async loadDsNhanSu(){
				this.state.isLoadingTable = true

				const reps = await phongBanService.PhongBan_Select_NhanVien({
					PhongBan_Id: this.value.PhongBan_Id
				}).finally(()=> this.state.isLoadingTable = false)

				if(reps) {
					this.value.phongBan = reps[0][0]
				    this.value.dsNhanSu = reps[1]
				}
			},
			onDelete(record) {
				Confirm.delete({
					content: 'Xác nhận xóa ' + record.HoVaTenNhanVien + ' ra khỏi phòng ban '+  this.value.phongBan?.TenPhongBan +'?',
					onOk: async () => {
				        this.state.isLoadingTable = true
						const res = await phongBanService.PhongBan_Delete_NhanVien({
						PhongBan_Id: this.value.PhongBan_Id,
						NhanVien_Id: record.NhanVien_Id
						}).finally(() => this.state.isLoadingTable = false)
						if (res) {
							this.loadDsNhanSu()
							this.$message.success('Xóa nhân sự ra khỏi phòng ban thành công!')
						}
					},
				})
			},
			onClickUserInfo(record) {
				redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
			},
		},
	}
</script>