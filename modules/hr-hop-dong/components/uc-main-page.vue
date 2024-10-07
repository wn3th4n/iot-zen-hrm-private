<template>
	<uc-layout>
		<a-card title="Hợp Đồng" class="card-title-page">
			<template #extra>
				<div class="min-w-400px">
					<a-space size="small" class="float-end">
						
						 <a-dropdown :trigger="['click']">
                            <a-button type="primary"><uc-icon name="plus" />Thêm<uc-icon name="chevron-down" /></a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="state.isOpenModalAddHopDong=true"><uc-icon name="plus" />Thêm hợp đồng</a-menu-item>
                                    <a-menu-item @click="state.isOpenModalAddLoaiHopDong=true"><uc-icon name="plus" />Thêm loại hợp đồng</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
					</a-space>
				</div>
			</template>
		</a-card>
		<a-tabs>
			<a-tab-pane key="1" tab="Hợp đồng lao động">
				<a-table size="small" :columns="columns.HDLD" >
				</a-table>
			</a-tab-pane>
		
			<a-tab-pane key="2" tab="Chờ hợp đồng">
				<div style="height: calc(100vh - 102px); width: 100%; display: flex; justify-content: center; overflow-y: auto; padding: 8px">
					<a-table style="width:600px" size="small" :columns="columns.ChoHopDong">
					</a-table>
				</div>
			</a-tab-pane>
			<a-tab-pane key="3" tab="Sắp hết hạn">
			</a-tab-pane>
			<a-tab-pane key="4" tab="Phân loại hợp đồng">
				<div
					style="height: calc(100vh - 102px); width: 100%; display: flex; justify-content: center; overflow-y: auto; padding: 8px">
					<div style="width:850px">
						<a-table :columns="columns.LoaiHopDong" :dataSource="value.dsLoaiHopDong" isloading="state.isLoadingTableLHD"
							:pagination="false" size="small">
							<template #bodyCell="{column, record}">
								<template v-if="column.key === 'Actions'">
									<a-dropdown :trigger="['click']">
										<a class="ant-dropdown-link">
											<uc-icon name="dots-horizontal" />
										</a>
										<template #overlay>
											<a-menu>
												<a-menu-item @click="onEdit(record)">
													<uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
												</a-menu-item>
												<a-menu-item @click="onEditTruongDuLieu(record)">
													<uc-icon class="text-primary" name="square-edit-outline" />Trường dữ liệu tùy chỉnh
												</a-menu-item>
												<a-menu-item @click="onDelete(record)">
													<uc-icon class="text-red" name="delete-outline" />Xoá
												</a-menu-item>
											</a-menu>
										</template>
									</a-dropdown>
								</template>
								<template v-else-if="column.key === 'Thue'">
									<div class="d-flex flex-column">
										<b>{{record.TenChinhSach}}</b>
										<span class="text-primary">{{record.MaChinhSach}}</span>
									</div>
								</template>
								<template v-else-if="column.key === 'TamKhoa'">
								<uc-icon v-if="record.Is_TamKhoa"  name="lock" class="text-red"/>
								</template>
								<template v-else-if="column.key === 'BaoHiem'">
									<div class="d-flex flex-column">
										<b>{{record.TenChinhSach_BaoHiem}}</b>
										<span class="text-primary">{{record.MaChinhSach_BaoHiem}}</span>
									</div>
								</template>
							</template>
						</a-table>

					</div>
				</div>
			</a-tab-pane>
		</a-tabs>

		<uc-modal-add-hop-dong v-model:isOpen="state.isOpenModalAddHopDong" :loaihopdonglist="value.dsLoaiHopDong"/>
		<uc-modal-add-loai-hop-dong v-model:isOpen="state.isOpenModalAddLoaiHopDong" @onFinish="loadPhanLoaiHopDong"/>
		<uc-modal-edit-loai-hop-dong v-model:isOpen="state.isOpenModalEditLoaiHopDong" @onFinish="loadPhanLoaiHopDong" :record="value.recordEdit" />
		<uc-modal-edit-truong-du-lieu v-model:isOpen="state.isOpenModalEditTruongDuLieu" :record="value.recordEdit"/>
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				state: {
					isLoading: false,
					isLoadingTableLHD: false,
					isOpenModalChonLoaiHopDong: false,
					isOpenModalAddHopDong: false,
					isOpenModalAddLoaiHopDong: false,
					isOpenModalEditLoaiHopDong: false,
					isOpenModalEditTruongDuLieu: false,
				},	
				value:{
					recordModalAddHopDong: {},
					dsLoaiHopDong: [],
					dataEditModalLoaiHopDong: {},
					recordEdit:{}
				},
				columns: {
					LoaiHopDong: [
						{
							title: 'Tên Loại hợp đồng',
							dataIndex: 'TenLoaiHopDong',
						},
						{
							title: 'Chính sách thuế mặc định',
							dataIndex: 'TenChinhSach',
							key: "Thue"
						},
						{
							title: 'Chính sách bảo hiểm mặc định',
							dataIndex: 'TenChinhSach_BaoHiem',
							key: 'BaoHiem'	
						},
						{
							title: 'Tạm khoá',
							key: 'TamKhoa',
							align: 'center'
						},
						{
							title: '',
							dataIndex: '',
							key: 'Actions',
							align: 'center',
							width: 50		
						},
					],
					HDLD: [
						{
							title: 'Nhân sự',
							dataIndex: '',
							key: 'NhanSu'
						},
						{
							title: 'Hợp đồng',
							dataIndex: '',
							key: ''
						},
						{
							title: 'Trạng thái',
							dataIndex: '',
							key: ''
						},
						{
							title: 'Hiện tại',
							dataIndex: '',
							key: ''
						},
						{
							title: 'Thử việc',
							dataIndex: '',
							key: ''
						},
						{
							title: '',
							key: 'Action'
						}
					],
					ChoHopDong: [
						{
							title: 'Nhân sự'
						},
						{
							title: '',
							key: 'Action'
						},
					]
				}
			
			}
		},
		mounted() {
			this.loadPhanLoaiHopDong()
		},
		computed: {
		},
		watch: {},
		methods: {
			async loadPhanLoaiHopDong(){
				const isSelect = await loaiHopDongService.LoaiHopHong_Select()
				if(isSelect) 
					this.value.dsLoaiHopDong = isSelect
			},
			onEdit(record){
				this.value.recordEdit = record
				this.state.isOpenModalEditLoaiHopDong = true
			},
			onEditTruongDuLieu(record) {
				this.value.recordEdit = record
				this.state.isOpenModalEditTruongDuLieu = true
			},
			async onDelete(record){
				console.log("delete", record)
				Confirm.delete({
					content: 'Bạn có muốn xóa loại hợp đồng này?',
					onOk: await loaiHopDongService.LoaiHopDong_Delete(record.LoaiHopDong_Id)
				})
			},
			
		},
	}
</script>