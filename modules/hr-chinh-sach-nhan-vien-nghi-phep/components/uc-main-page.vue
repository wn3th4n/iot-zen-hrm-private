<template>
 	<uc-layout>
		<a-card class="card-title-page">
            <template #title>
				<a-space>
                        <span>Nghỉ phép nhân sự</span>
                        <a-tag color="blue">
                            <span style="font-size:12px" class="text-primary">
                                {{this.data?.length ?? 0}} <uc-icon name="account"/>
                            </span>
                        </a-tag>
                    </a-space>
			</template>
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="openModalAddNguoiNghiPhep()"><uc-icon name="plus" />Thêm nhân sự</a-button>
                </a-space>
            </template>
        </a-card>

		<uc-container :width="950">
				<a-table :columns="columns" :data-source="data" :pagination="false" size="small">
					<template #bodyCell="{ column, record }">
						<template v-if="column.key === 'HoVaTenNhanVien'">
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
				
						<template v-else-if="column.key === 'NgayHieuLuc'">
							<span>{{ record.NgayHieuLuc }}</span>
						</template>
				
						<template v-else-if="column.key === 'TamKhoa'">
							<a-space size="small">
								<uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
							</a-space>
						</template>
				
						<template v-else-if="column.key === 'Action'">
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
	
	
		<uc-add-nguoi-nghi-phep v-model:isOpen="isOpenModalAddNguoiNghiPhep" @onFinish="loadNguoiThamGia()"/>
		<uc-edit-nguoi-nghi-phep :record="dataEdit" v-model:isOpen="isOpenModalEditNguoiNghiPhep" @onFinish="loadNguoiThamGia()"/>
	</uc-layout>
 </template>

<script>
	export default {
		props: [],
		data() {
			return {
				isOpenModalAddNguoiNghiPhep: false,
				isOpenModalEditNguoiNghiPhep: false,
				columns: [
				{
					title: 'Nhân sự',
					dataIndex: 'HoVaTenNhanVien',
					key: 'HoVaTenNhanVien',
					width: 350,
				},
				
				{
					title: 'Tên chính sách',
					dataIndex: 'TenChinhSach',
					key: 'TenChinhSach',
					width: 200,
				},
				{
					title: 'Số phép trong năm',
					dataIndex: 'SoPhepTrongNam',
					key: 'SoPhepTrongNam',
					width: 200,
					align: 'center',
				},
				{
					title: 'Số phép tồn',
					dataIndex: 'SoPhepTon',
					key: 'SoPhepTon',
					width: 150,
					align: 'center',
				},
				{
					title: 'Ngày hiệu lực',
					dataIndex: 'NgayHieuLuc',
					key: 'NgayHieuLuc',
					width: 150,
					align: 'center',
				},
				{
					title: '',
					dataIndex: 'Action',
					key: 'Action',
					align: 'center',
					width: 50,
				},
				],
				data: [],
				dataEdit: {}
			}
		},
		mounted() {
			this.loadNguoiThamGia();
		},
		computed: {},
		watch: {},
		methods: {
			async loadNguoiThamGia(){
				const res = await nhanVienNghiPhepService.NhanVien_ChinhSach_NghiPhep_Select()
				if (res) 
                	this.data = res
            	
			},
			onEdit(record){
				this.isOpenModalEditNguoiNghiPhep = true
				this.dataEdit = Object.assign({}, record)
				this.dataEdit.NgayHieuLuc = dayjs(this.dataEdit.NgayHieuLuc, 'DD/MM/YYYY')
				this.dataEdit.Is_NghiBu = this.dataEdit.Is_NghiBu ? 0 : 1
			},
			openModalAddNguoiNghiPhep (){
				this.isOpenModalAddNguoiNghiPhep = true
			},
			onDelete(record){
				this.isLoading = true
				Confirm.delete({
					content: 'Xác nhận xóa ' + record.HoVaTenNhanVien + ' ra khỏi chính sách nghỉ phép?',
					onOk: async () => {
					const res = await nhanVienNghiPhepService.NhanVien_ChinhSach_NghiPhep_Delete({
							NhanVien_ChinhSach_NghiPhep_Id: record.NhanVien_ChinhSach_NghiPhep_Id,
						})
						if (res) {
							this.loadNguoiThamGia()
							this.$message.success('Xóa nhân sự thành công!')
						}
					},
				})
				this.isLoading = false
			},
			onClickUserInfo(record) {
				redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
			},
		},
	}
</script>