<template>
	<uc-layout>
		{{FileID}}
		<uc-file-upload v-model="FileID" />
		<a-card title="Page Test Ant 4 - Page Test Ant 4 - Page Test Ant 4">
			<template #extra>
				<a-space size="small">
					<a-input placeholder="Tìm kiếm theo..." allow-clear @pressEnter="onSearch">
						<template #suffix>
							<span class="mdi mdi-search"></span>
						</template>
					</a-input>
					<a-button type="primary" @click="this.isShowModalAdd = true"> <span class="mdi mdi-plus"></span>Thêm
						mới</a-button>
				</a-space>
			</template>
		</a-card>
		<uc-container :width="600">
			<div class="component-hover" style="width: 100px; height: 100px; background-color: azure">
				<div class="d-hover">display on hover parent</div>
			</div>
			<a-card title="uc-icon">
				<uc-icon name="plus" size="24" color="red" class="cursor-pointer" />
				<uc-icon name="account-arrow-left" />
				<uc-icon name="label" size="36" color="danger" />
				<uc-icon name="account-remove" />
			</a-card>
			<a-table :data-source="dataTable" :columns="columns" :pagination="false" size="small">
				<template #bodyCell="{ column, record }">
					<template v-if="column.key === 'MaNhomCaMau'">
						<b>{{ record.TenNhomCaMau }}</b>
						<br />
						<span class="text-primary">{{ record.MaNhomCaMau }}</span>
					</template>
					<template v-else-if="column.key === 'Is_TamKhoa'">
						<span v-if="record.Is_TamKhoa" class="text-red mdi mdi-lock"></span>
					</template>
					<template v-else-if="column.key === 'Action'">
						<a-dropdown :trigger="['click']">
							<a class="ant-dropdown-link" @click.prevent><span name="mdi mdi-dots"></span></a>
							<template #overlay>
								<a-menu>
									<a-menu-item @click="onOpenModalEdit(record)"><span
											class="text-primary mdi mdi-square-edit-outline"></span>Chỉnh
										sửa</a-menu-item>
									<a-menu-item @click="onDelete(record)"><span class="text-red"
											name="mdi mdi-trash-can"></span>Xoá</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</template>
				</template>
			</a-table>
		</uc-container>

		<uc-modal-add v-model:isOpen="isShowModalAdd" @onFinish="getNhomCaMau()" />
		<uc-modal-edit v-model:isOpen="isShowModalEdit" @onFinish="getNhomCaMau()" :record="dataRecord" />
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				FileID: null,
				columns: [
					{
						title: 'Nhóm ca mẫu',
						dataIndex: 'MaNhomCaMau',
						key: 'MaNhomCaMau',
					},
					{
						title: 'Tạm khóa',
						dataIndex: 'Is_TamKhoa',
						key: 'Is_TamKhoa',
						align: 'center',
					},
					{
						title: 'Thao tác',
						dataIndex: 'Action',
						key: 'Action',
						align: 'center',
					},
				],
				dataTable: [],
				dataRecord: null,
				isLoading: false,
				isShowModalAdd: false,
				isShowModalEdit: false,
			}
		},
		mounted() {
			this.getNhomCaMau()
		},
		computed: {},
		watch: {},
		methods: {
			async getNhomCaMau() {
				const $this = this
				const res = await nhomCaMauService.NhomCaMau_Select()
				$this.dataTable = res
			},
			onOpenModalEdit(record) {
				const $this = this
				$this.dataRecord = record
				$this.isShowModalEdit = true
			},
			onDelete(record) {
				const $this = this
				Confirm.delete({
					content: `Bạn có chắc muốn xóa nhóm ca mẫu ${record.TenNhomCaMau}?`,
					onOk: async () => {
						const params = { NhomCaMau_Id: record.NhomCaMau_Id }
						const res = await nhomCaMauService.NhomCaMau_Delete(params)
						$this.getNhomCaMau()
					},
				})
			},
			onSearch() {
				console.log('search')
			},
		},
	}
</script>