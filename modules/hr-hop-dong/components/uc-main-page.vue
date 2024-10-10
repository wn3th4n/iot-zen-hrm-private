<template>
	<uc-layout>
		<a-card title="Hợp Đồng" class="card-title-page">
			<template #extra>
				<div class="min-w-400px">
					<a-space size="small" class="float-end">

						<a-dropdown :trigger="['click']">
							<a-button type="primary"><uc-icon name="plus" />Thêm<uc-icon
									name="chevron-down" /></a-button>
							<template #overlay>
								<a-menu>
									<a-menu-item @click="state.isOpenModalAddHopDong=true"><uc-icon name="plus" />Thêm
										hợp đồng</a-menu-item>
									<a-menu-item @click="state.isOpenModalAddLoaiHopDong=true"><uc-icon
											name="plus" />Thêm loại hợp đồng</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</a-space>
				</div>
			</template>
		</a-card>
		<a-tabs>
			<a-tab-pane key="1" tab="Hợp đồng lao động">
				<a-table size="small" :columns="columns.HDLD" :dataSource="value.dsHopDongLaoDong">
					<template #bodyCell="{ column, record }">
						<template v-if="column.key === 'Is_DaKy'">
							<!-- màu xanh -->
							<a-tag v-if="record.Is_DaKy" color="#87d068">
								Đã ký
							</a-tag>
							<!-- màu đỏ -->
							<a-tag v-else color="#f50">
								Chưa ký
							</a-tag>
						</template>
						<template v-else-if="column.key === 'Is_HopDongDaQua'">
							<a-checkbox v-model:checked="record.Is_HopDongDaQua" disabled />
						</template>
						<template v-else-if="column.key === 'Is_HopDongThuViec'">
							<a-checkbox v-model:checked="record.Is_HopDongThuViec" disabled />
						</template>
						<template v-else-if="column.key === 'Actions'">
							<a-dropdown trigger="click">
								<uc-icon color="primary" name="dots-horizontal" class="cursor-pointer" />
								<template #overlay>
									<a-menu>
										<a-menu-item @click="editHopDong(record)">
											<uc-icon name="square-edit-outline" class="text-primary" />
											Chỉnh sửa
										</a-menu-item>
										<a-menu-item @click="deleteHD(record.NhanVien_HopDong_Id)">
											<uc-icon class="text-red" name="delete-outline" /> Xóa
										</a-menu-item>
									</a-menu>
								</template>
							</a-dropdown>
						</template>
					</template>
				</a-table>
			</a-tab-pane>

			<a-tab-pane key="2" tab="Chờ hợp đồng">
				<div
					style="height: calc(100vh - 102px); width: 100%; display: flex; justify-content: center; overflow-y: auto; padding: 8px">
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
						<a-table :columns="columns.LoaiHopDong" :dataSource="value.dsLoaiHopDong"
							isloading="state.isLoadingTableLHD" :pagination="false" size="small">
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
													<uc-icon class="text-primary" name="square-edit-outline" />Trường dữ
													liệu tùy chỉnh
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
									<uc-icon v-if="record.Is_TamKhoa" name="lock" class="text-red" />
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

		<uc-modal-add-hop-dong v-model:isOpen="state.isOpenModalAddHopDong" :loaihopdonglist="value.dsLoaiHopDong"
			@onFinish="onLoadHopDongLaoDong(0, 0, 0)" />
		<uc-modal-edit-hop-dong v-model:isOpen="state.isOpenModalEditHopDong" :loaihopdonglist="value.dsLoaiHopDong"
			:record="value.recordEditHD" />
		<uc-modal-add-loai-hop-dong v-model:isOpen="state.isOpenModalAddLoaiHopDong" @onFinish="loadPhanLoaiHopDong" />
		<uc-modal-edit-loai-hop-dong v-model:isOpen="state.isOpenModalEditLoaiHopDong" @onFinish="loadPhanLoaiHopDong"
			:record="value.recordEdit" />
		<uc-modal-edit-truong-du-lieu v-model:isOpen="state.isOpenModalEditTruongDuLieu" :record="value.recordEdit" />
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
					isOpenModalEditHopDong: false,
				},
				value: {
					recordModalAddHopDong: {},
					dsLoaiHopDong: [],
					dsHopDongLaoDong: [],
					dataEditModalLoaiHopDong: {},
					recordEdit: {},
					recordEditHD: {},
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
							dataIndex: 'HoVaTenNhanVien',
							key: 'HoVaTenNhanVien'
						},
						{
							title: 'Hợp đồng',
							dataIndex: 'TenLoaiHopDong',
							key: 'TenLoaiHopDong'
						},
						{
							title: 'Trạng thái',
							dataIndex: 'Is_DaKy',
							key: 'Is_DaKy',
							align: 'center',
							width: '50'
						},
						{
							title: 'Hiện tại',
							dataIndex: 'Is_HopDongDaQua',
							key: 'Is_HopDongDaQua',
							align: 'center',
							width: '100'
						},
						{
							title: 'Thử việc',
							dataIndex: 'Is_HopDongThuViec',
							key: 'Is_HopDongThuViec',
							align: 'center',
							width: '100'
						},
						{
							title: 'Thao tác',
							key: 'Actions',
							align: 'center',
							width: '50'
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
			this.onLoadHopDongLaoDong(0, 0, 0)
		},
		computed: {
		},
		watch: {},
		methods: {
			async loadPhanLoaiHopDong() {
				const isSelect = await loaiHopDongService.LoaiHopHong_Select()
				if (isSelect)
					this.value.dsLoaiHopDong = isSelect
			},
			onEdit(record) {
				this.value.recordEdit = record
				this.state.isOpenModalEditLoaiHopDong = true
			},
			onEditTruongDuLieu(record) {
				this.value.recordEdit = record
				this.state.isOpenModalEditTruongDuLieu = true
			},
			async onDelete(record) {
				console.log("delete", record)
				Confirm.delete({
					content: 'Bạn có muốn xóa loại hợp đồng này?',
					onOk: await loaiHopDongService.LoaiHopDong_Delete(record.LoaiHopDong_Id)
				})
			},
			async onLoadHopDongLaoDong(trangThai, loaiHD, nvId) {
				const param = {
					TrangThai: trangThai,
					LoaiHopDong: loaiHD,
					NhanVien_Id: nvId,
				}
				const isSelect = await nhanVienService.NhanVien_HopDong_Select(param)
				if (isSelect) {
					this.value.dsHopDongLaoDong = isSelect
					// .map(item => {
					// 	return{
					// 		...item,
					// 		Bit_Is_DaKy: item.Is_DaKy ? 1 : 0,
					// 		Bit_Is_HopDongDaQua: item.Is_HopDongDaQua ? 1 : 0,
					// 		Bit_Is_HopDongThuViec: item.Is_HopDongThuViec ? 1 : 0,
					// 	}
					// })
					console.log("this.value.dsHopDongLaoDong", this.value.dsHopDongLaoDong)
				}
			},
			editHopDong(record) {
				this.value.recordEditHD = record
				this.state.isOpenModalEditHopDong = true
				console.log("this.value.recordEditHD", this.value.recordEditHD)
			},
			async deleteHD(id) {
				const param = {
					NhanVien_HopDong_Id: id,
				}
				const isSelect = await nhanVienService.NhanVien_HopDong_Delete(param)
	
				if (isSelect) {
					this.$message.success("Xóa hợp đồng thành công")
					this.onLoadHopDongLaoDong(0, 0, 0)
				} else {
					console.log("Fail to delete hop dong")
					this.$message.error("Xóa hợp đồng thất bại")
				}
			},
		},
	}
</script>