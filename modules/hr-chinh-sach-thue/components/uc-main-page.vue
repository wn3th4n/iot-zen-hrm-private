<template>
	<uc-layout>
		<a-card class="card-title-page">
			<template #title>
				Danh sách nhân sự 
				<a-tag color="blue">
					<span style="font-size:12px" class="text-primary">
						{{dsNhanSu?.length ?? 0}}
						<uc-icon name="account" />
					</span>
				</a-tag>
			</template>
			<template #extra>
				<a-space size="small">
					<a-button type="primary" @click="state.isOpenModalAdd = true">
						<uc-icon name="plus"/>Thêm nhân sự
					</a-button>
				</a-space>
			</template>
		</a-card>
        <uc-container :width="750">
            <a-table :columns='columns' :pagination="false" size="small" :dataSource="dsNhanSu">
				<template #bodyCell="{ column, record }">
					<template v-if="column.key === 'NhanSu'">
						<a-space size="small">
							<uc-avatar :text="record.HoVaTenNhanVien" :src="record.AnhDaiDien_Url" size="small" />
							<b @click="onClickUserInfo(record)" class="cursor-pointer">{{ record.HoVaTenNhanVien }} </b>
						</a-space>
					</template>
					<template v-else-if="column.key === 'TenChinhSach'">
						<div class="d-flex flex-column">
							<b>{{ record.TenChinhSach }}</b>
							<span class="text-primary">{{ record.MaChinhSach }}</span>
						</div>
					</template>
					<template v-else-if="column.key === 'Actions'">
						<a-dropdown :trigger="['click']">
							<a class="ant-dropdown-link">
								<uc-icon name="dots-horizontal" />
							</a>
							<template #overlay>
								<a-menu>
									<a-menu-item @click="onEdit(record)">
										<uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
									</a-menu-item>
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
		<uc-modal-add-nhan-su v-model:isOpen="state.isOpenModalAdd" @onFinish="loadNhanSu()"/>
		<uc-modal-edit-nhan-su v-model:isOpen="state.isOpenModalEdit" @onFinish="loadNhanSu()" :record="recordEdit"/>
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				state: {
                    isLoadingTable: false,
					isOpenModalAdd: false,
					isOpenModalEdit: false,
				},
				columns: [
					{
						title: 'Nhân sự',
						dataIndex: 'HoVaTenNhanVien',
						key: 'NhanSu'
					},
					{
						title: 'Tên vị trí',
						dataIndex: 'TenViTri',
						key: 'TenViTri'
					},
					{
						title: 'Tên chính sách',
						dataIndex: 'TenChinhSach',
						key: 'TenChinhSach'
					},
					{
						title: 'Ngày tham gia',
						dataIndex: 'NgayThamGia',
						key: 'NgayThamGia',
						align: 'center'
					},
					{
						title:  '',
						key: 'Actions',
						width: 100,
						align: 'center'
					}
				],
				dsNhanSu: [],
				recordEdit: {}

			}
		},
		mounted() {
            this.loadNhanSu()
        },
		computed: {},
		watch: {},
		methods: {
            async loadNhanSu(){
                this.isLoadingTable = true
                const isSelect = await nhanVienThueService.NhanVien_ChinhSach_Thue_Select().finally(()=> this.isLoadingTablet = false)
				if(isSelect) this.dsNhanSu = isSelect
            },
			onClickUserInfo(record) {
				redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
			},
			onEdit(record){
				this.recordEdit = Object.assign({}, record)
				console.log(this.recordEdit)
				this.state.isOpenModalEdit = true
				this.recordEdit.NgayThamGia = dayjs(this.recordEdit.NgayThamGia, 'DD/MM/YYYY')
			},
			onDelete(record){
				Confirm.delete({
					content: 'Bạn có chắc muốn xoá ' + record.HoVaTenNhanVien + ' ra khỏi chính sách thuế?',
					onOk: async () => {
						const isDelete = await nhanVienThueService.NhanVien_ChinhSach_Thue_Delete({
							NhanVien_ChinhSach_Thue_Id: record.NhanVien_ChinhSach_Thue_Id
						})

						if(isDelete) {
							this.$message.success("Xoá nhân sự thành công!")
							this.loadNhanSu()
						}
					}

				})
				
			}

        },
	}
</script>