<template>
	<div>
		<a-card title="Loại vị trí" class="card-title-page">
			
		</a-card>
		
		<a-tabs>
			<a-tab-pane key="1" tab="Vị trí">
				<uc-container :width="750">
						<a-table size="small" :loading="state.isLoadingVitri" :columns="columnsViTri" :dataSource="danhSachLoaiViTri" :pagination="false">
							<template #bodyCell="{column, record}">
                                    <template v-if="column.key === 'TenVitri'">
                                            <b>{{ record.TenViTri }}</b><br />
                                            <span class="text-primary">{{ record.MaViTri }}</span>
                                    </template>

                                    <template v-else-if="column.key === 'Is_TamKhoa'">
                                        <a-space size="small">
                                            <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                                        </a-space>
                                    </template>

                                    <template v-else-if="column.key === 'ThemCongViec'">
                                        <a @click="onAddCongViecViTri(record)">
                                            <uc-icon name="briefcase-variant-outline" class="text-warning" />
                                        </a>
                                    </template>

                            </template>
						</a-table>
				</uc-container>
			</a-tab-pane>

			<a-tab-pane key="2" tab="Vai trò" force-render>
                <uc-container :width="750">
                    <a-table size="small" :loading="state.isLoadingVaiTro" :columns="columnsVaiTro" :dataSource="danhSachVaiTro"
                        :pagination="false">
                        <template #bodyCell="{column, record}">
                            <template v-if="column.key === 'TenVaiTro'">
                                <b>{{ record.TenVaiTro }}</b><br />
                                <span class="text-primary">{{ record.MaVaiTro }}</span>
                            </template>
                
                            <template v-else-if="column.key === 'Is_TamKhoa'">
                                <a-space size="small">
                                    <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                                </a-space>
                            </template>
                
                            <template v-else-if="column.key === 'ThemCongViec'">
                                <a @click="onAddCongViecVaiTro(record)">
                                    <uc-icon name="briefcase-variant-outline" class="text-warning" />
                                </a>
                            </template>

                        </template>
                    </a-table>
                </uc-container>
            </a-tab-pane>
		</a-tabs>

	</div>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				state: {
                    isLoadingVitri: false,
                    isLoadingVaiTro: false
				},
                columnsViTri: [
                    {
                        title: "Tên vị trí công việc",
                        dataIndex: 'TenViTri',
                        key: 'TenVitri'
                    },
                     {
                        title: "SL công việc",
                        dataIndex: 'TongCongViec',
                        key: 'TongCongViec',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: "Tạm Khóa",
                        dataIndex: 'Is_TamKhoa',
                        key: 'Is_TamKhoa',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: "Thêm công việc",
                        key: 'ThemCongViec',
                        align: 'center',
                        width: 150
                    },
                   
                ],
                columnsVaiTro: [
                {
                    title: "Tên vai trò",
                    dataIndex: 'TenVaiTro',
                    key: 'TenVaiTro'
                },
                {
                    title: "SL công việc",
                    dataIndex: 'TongCongViec',
                    key: 'TongCongViec',
                    align: 'center',
                    width: 120
                },
                {
                    title: "Tạm Khóa",
                    dataIndex: 'Is_TamKhoa',
                    key: 'Is_TamKhoa',
                    align: 'center',
                    width: 100
                },
                {
                    title: "Thêm công việc",
                    key: 'ThemCongViec',
                    align: 'center',
                    width: 150
                },
               
                ],
				danhSachLoaiViTri: [],
                danhSachVaiTro: []

			}
		},
		mounted() {
			this.loadLoaiViTri();
            this.loadVaiTro();
		},
		computed: {},
		watch: {},
		methods: {
			async loadLoaiViTri() {
                this.isLoadingVitri = true
				const reps  = await loaiViTriService.LoaiViTri_Select_ViTri()
				if(reps){
					console.log(reps)
					this.danhSachLoaiViTri = reps
				}
                this.isLoadingVitri = false
			},
            async loadVaiTro() {
                this.isLoadingVaiTro = true
                const reps = await loaiViTriService.LoaiViTri_Select_VaiTro()
                if(reps){
                    console.log(reps)
                    this.danhSachVaiTro = reps
                }
                this.isLoadingVaiTro = false
            },
            addCongViecViTri(record){},
            addCongViecVaiTro(record){},
            onDeleteViTri(record){},
            onDeleteVaiTro(record){},
		},
	}
</script>