<template>
    <a-card title="Đề xuất làm thêm giờ" class="card-title-page">
        <template #extra>
            <div class="d-flex flex-row gap-2">
                <uc-select-nhan-vien v-model:value="paramSelect.NhanVien_Id" allowClear
                    placeholder="Chọn mã, tên nhân sự..." style="min-width: 300px;" />
                <a-select allowClear placeholder="Chọn chính sách làm thêm..."
                    v-model:value="paramSelect.ChinhSach_LamThem_Id" style="min-width: 300px;">
                    <a-select-option v-for="item in DSChinhSachLamThem" :key="item" :value="item.ChinhSach_LamThem_Id">
                        {{ item.TenChinhSach_LamThem }}
                    </a-select-option>
                </a-select>
                <a-button type="primary"><uc-icon name="magnify" />Tìm kiếm</a-button>
                <a-button type="primary" @click="onOpenModalAddDeXuat"><uc-icon name="plus" />Thêm đề xuất</a-button>
            </div>


        </template>
    </a-card>
    <a-tabs>
        <a-tab-pane key="1" tab="Tất cả">
            <a-table show-size-changer :columns="columns" :data-source="DSDeXuat" :loading="isloadingTable"
                :pagination="pagination" @change="handleTableChange" size="small" v-bind="$attrs"
                :scroll="{ x: 'fit-content', y: 'calc(100vh - 184px)' }">
                <template #bodyCell="{ column, record, value }">
                    <template v-if="column.key === 'ThuTu'"><span>{{ (DSDeXuat.indexOf(record) +
                        1).toString().padStart('2', 0) }}</span></template>
                    <template v-else-if="column.key === 'TenTieuDe'">
                        <b>{{ record.TenTieuDe }}</b><br />
                        <span>{{ record.TenDeXuat }}</span>
                    </template>
                    <template v-else-if="column.key === 'NguoiThucThi'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.DeXuat_HoVaTenNhanVien" />
                            <div>
                                <b>{{ record.DeXuat_HoVaTenNhanVien }}</b><br />
                                <span>{{ record.ViTriNguoiThucThi }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'TrangThai'">
                        <a-tag v-if="record.Is_Duyet" color="green">Đã duyệt</a-tag>
                        <a-tag v-else color="warning">Đang chờ duyệt</a-tag>
                    </template>
                    <template v-else-if="column.key === 'NgayLamThem'">
                        {{ new Date(value).toLocaleDateString('en-GB') }}
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown trigger="click">
                            <uc-icon color="primary" name="square-edit-outline" class="cursor-pointer" />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item> <uc-icon name="account-edit" /> Duyệt </a-menu-item>
                                    <a-menu-item> <uc-icon name="text-box-edit-outline" /> Từ chối </a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="onOpenModalEditDX(record)"> <uc-icon name="square-edit-outline" class="text-primary" />
                                        Sửa đề xuất </a-menu-item>
                                    <a-menu-item @click="onDelete(record)"> <uc-icon class="text-red"
                                            name="delete-outline" /> Xoá đề
                                        xuất </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </template>
            </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đang chờ duyệt">

        </a-tab-pane>
        <a-tab-pane key="3" tab="Đã duyệt">

        </a-tab-pane>
        <a-tab-pane key="4" tab="Đã từ chối">

        </a-tab-pane>
    </a-tabs>

    <uc-modal-danh-sach-de-xuat-lam-them v-model:isOpen="isShowModalAddDeXuat" :DSChinhSachLamThem @onFinish="loadDeXuatLamThem" />
    <uc-modal-edit-dx-lam-them v-model:isOpen="isOpenEditModalDX" :record="recordDataEdit" @onFinish="loadDeXuatLamThem"/>
</template>

<script>
export default {

    data() {
        return {
            columns: [
                {
                    title: '#',
                    dataIndex: 'ThuTu',
                    key: 'ThuTu',
                    align: 'center',
                    width: '50px'
                },
                {
                    title: 'Tiêu đề',
                    dataIndex: 'TieuDe',
                    key: 'TieuDe',
                },
                {
                    title: 'Mô tả',
                    dataIndex: 'MoTa',
                    key: 'MoTa',
                },
                {
                    title: 'Người đề xuất',
                    dataIndex: 'DeXuat_HoVaTenNhanVien',
                    key: 'NguoiThucThi',
                },
                {
                    title: 'Ngày tăng ca',
                    dataIndex: 'NgayLamThem',
                    key: 'NgayLamThem',
                    align: 'center',
                    width: '150px'
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'TrangThai',
                    key: 'TrangThai',
                    align: 'center',
                    width: '150px'
                },
                {
                    title: 'Ngày tạo',
                    dataIndex: 'NgayTao',
                    align: 'center',
                    width: '150px'
                },
                {
                    title: 'Thao tác',
                    key: 'Action',
                    align: 'center',
                    width: '100px'
                },
            ],
            isloadingTable: true,
            isOpenEditModalDX: false,
            DSChinhSachLamThem: [],
            recordDataEdit: {},
            isShowModalAddDeXuat: false,
            DSDeXuat: [],
            dsDangChoDuyet: [],
            dsDaDuyet: [],
            dsTuChoi: [],
            dsGioTangCa: [],
            TrangThai: {
                TatCa: 0,
                DangChoDuyet: 1,
                DaDuyet: 2,
                TuChoi: 3
            },
            paramSelect: {
                TrangThai: 0,
                ChinhSach_LamThem_Id: null,
                NhanVien_Id: null,
                PageIndex: 1,
                PageSize: 35
            },
            pagination: {
                totalPage: 0,
                totalRow: 35,
                pageIndex: 0,
                pageSize: 35,
            }
        }
    },
    mounted() {
        this.loadDeXuatLamThem()
        this.loadDSChinhSach()
    },
    methods: {
        onOpenModalEditDX(record){
            this.isOpenEditModalDX = true
            this.recordDataEdit = Object.assign({}, record)
        },
        onOpenModalAddDeXuat() {
            this.isShowModalAddDeXuat = true
        },
        async loadDSChinhSach() {
            const $this = this
            const res = await chinhSachService.ChinhSach_LamThem_Select()
            if (res) {
                this.DSChinhSachLamThem = res
            }
        },
        async loadDeXuatLamThem() {
            const $this = this
            $this.isloadingTable = true
            const res = await deXuatLamThemService.DeXuat_LamThem_Select({
                ... this.paramSelect,
                NhanVien_Id: this.paramSelect.NhanVien_Id ?? 0,
                ChinhSach_LamThem_Id: this.paramSelect.ChinhSach_LamThem_Id ?? 0,
            }).finally(() => {
                $this.isloadingTable = false
            })

            if (res) {
                this.pagination = {
                    totalPage: res[0].TotalPage,
                    totalRow: res[0].TotalRow,
                    pageIndex: res[0].PageIndex,
                    pageSize: res[0].PageSize,
                }
                const DeXuatList = res[1]
                const KhungGioList = res[2]
                const mergedData = DeXuatList.map(proposal => {
                    const matchedTimeSlot = KhungGioList.find(slot => slot.DeXuat_LamThem_Id.trim() === proposal.DeXuat_LamThem_Id.toString());
                    return {
                        ...proposal,
                        ...matchedTimeSlot,
                        DeXuat_LamThem_Id: proposal.DeXuat_LamThem_Id,
                    };
                })
                $this.DSDeXuat = Object.assign([], mergedData)
            }


        },
        onDelete(record) {
            Confirm.delete({
                content: 'Bạn có muốn xoá đề xuất?',
                onOk: async () => {
                    const res = await deXuatLamThemService.DeXuat_LamThem_Delete({
                        DeXuat_LamThem_Id: record.DeXuat_LamThem_Id
                    })
                    if (res) {
                        this.loadDeXuatLamThem()
                        this.$message.success('Xoá thành công')
                    }
                },
            })
        },
        handleTableChange(pagination) {
            if (this.isChangePag) {
                this.paramSelect.PageIndex = pagination.current
                this.paramSelect.PageSize = pagination.pageSize
            }
        },
        onDuyet(record) {
            Confirm.delete({
                content: 'Bạn chắc chắn về duyệt đề xuất này?',
                onOk: async () => {
                    const res = await deXuatLamThemService.DeXuat_LamThem_Duyet({
                        DeXuat_LamThem_Id: record.DeXuat_LamThem_Id
                    })
                    if (res) {
                        this.loadDeXuatLamThem()
                        this.$message.success('Xoá thành công')
                    }
                },
            })
        }
    },
}
</script>
