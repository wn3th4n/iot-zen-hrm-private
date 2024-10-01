<template>
	<a-card title="Phòng ban" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd()"><uc-icon name="plus" />Thêm phòng ban</a-button>
                </a-space>

            </template>

        </a-card>
        <uc-container :width="800">
			<a-table :loading="isLoading" size="small" :columns="columns" :dataSource="danhSachPhongBan" :expandColumnWidth="100" rowKey="PhongBan_Id" :pagination="false" >
				<template #bodyCell="{ column, record }">
                    <template v-if="column.key ==='TenPhongBan'">
						<div class="d-flex flex-column">
                            <a style="color: #000 !important" class="cursor-pointer" @click="onRedirect(record)"><b>{{ record.TenPhongBan }}</b></a>
                            <span class="text-primary">{{ record.MaPhongBan }}</span>
                        </div>
					</template>

					<template v-else-if="column.key ==='Is_TamKhoa'">
						<uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
					</template>

					<template v-else-if="column.key ==='NguoiQuanLy_ViTri'">
						<a-space size="small">
							<uc-avatar :src="record.NguoiQuanLy_ViTri_AnhDaiDien" size="small" :text="record.NguoiQuanLy_ViTri_Ten"/>
                            <span>{{ record.NguoiQuanLy_ViTri_Ten }}</span>
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
		<uc-modal-add-phong-ban v-model:isOpen="isOpenModalAdd" @onFinish="loadPhongBan()"/>
		<uc-modal-edit-phong-ban v-model:isOpen="isOpenModalEdit" @onFinish="loadPhongBan()" :record="dataEdit" />
</template>

<script>
	export default {
		props: [],
		data() {
			return {
                isLoading: false,
                danhSachPhongBan: [],
				isOpenModalAdd: false,
				isOpenModalEdit: false,
				columns: [
				{
					title: 'Tên Phòng Ban',
					dataIndex: 'TenPhongBan',
					key: 'TenPhongBan',
                    width: 450
				},
				{
					title: 'Người quản lý vị trí',
					dataIndex: 'NguoiQuanLy_ViTri_Ten',
					key: 'NguoiQuanLy_ViTri',
				},
				{
					title: 'Tạm Khoá',
					dataIndex: 'Is_TamKhoa',
					key: 'Is_TamKhoa',
					align: 'center',
				},
				 {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
				],
				dataEdit: {}
            }
		},
		mounted() {
            this.loadPhongBan()
        },
		computed: {
		},
		watch: {},
		methods: {
            async loadPhongBan(){
				this.isLoading = true
                const reps = await phongBanService.PhongBan_Select()
                if(reps){
                    this.danhSachPhongBan = this.buildTree(reps.DSPhongBan)
                }
				this.isLoading = false

            },
			onAdd() {
				this.isOpenModalAdd = true
			},
			onDelete(record){
				Confirm.delete({
				content: 'Xác nhận xóa phòng ban ' + record.TenPhongBan + '?',
				onOk: async () => {
					const res = await phongBanService.PhongBan_Delete({PhongBan_Id: record.PhongBan_Id})
					if(res){
						this.loadPhongBan()
						this.$message.success('Xóa phòng ban thành công!')
					}
				},
				})
			},
			onEdit(record) {
				this.isOpenModalEdit = true
				this.dataEdit = Object.assign({},record)
			},
			buildTree(data, parentId = 0) {
				const result = [];
				data.forEach(item => {
				if (item.PhongBan_Parent_Id === parentId) {
					const children = this.buildTree(data, item.PhongBan_Id);
					if (children.length) {
						item.children = children;
					}
					result.push(item);
				}});
				return result;
			},
			onRedirect(record){
				redirect('/hr-danh-muc-phong-ban?id=' + record.PhongBan_Id)
			}	
		}
	}
</script>