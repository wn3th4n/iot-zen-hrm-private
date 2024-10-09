<template>
    <a-card title="Đề xuất làm thêm giờ" class="card-title-page">
        <template #extra>
            <div class="d-flex flex-row gap-2">
                <uc-select-nhan-vien v-model:value="values.paramSelect.NhanVien_Id" allowClear
                    placeholder="Chọn mã, tên nhân sự..." style="min-width: 300px;" />
                <a-select allowClear placeholder="Chọn chính sách làm thêm..."
                    v-model:value="values.paramSelect.ChinhSach_LamThem_Id" style="min-width: 300px;">
                    <a-select-option v-for="item in values.DSChinhSachLamThem" :key="item"
                        :value="item.ChinhSach_LamThem_Id">
                        {{ item.TenChinhSach_LamThem }}
                    </a-select-option>
                </a-select>
                <a-button type="primary" @click="onSearch"><uc-icon name="magnify" />Tìm kiếm</a-button>
                <a-button type="primary" @click="onOpenModalAddDeXuat"><uc-icon name="plus" />Thêm đề xuất</a-button>
            </div>


        </template>
    </a-card>
    <a-tabs @change="onChangeLoad">
        <a-tab-pane key="1" tab="Tất cả" @handletablechange="handleTableChange">
            <a-table show-size-changer :columns="columns.All" :data-source="values.DSDeXuat"
                :loading="states.isloadingTableSellectAll" :pagination="values.pagination" @change="handleTableChange"
                size="small" v-bind="$attrs" :scroll="{ x: 'fit-content', y: 'calc(100vh - 184px)' }">
                <template #bodyCell="{ column, record, value }">
                    <template v-if="column.key === 'ThuTu'"><span>{{ (values.DSDeXuat.indexOf(record) +
                        1).toString().padStart('2', 0) }}</span></template>
                    <template v-else-if="column.key === 'TenTieuDe'">
                        <b>{{ record.TenTieuDe }}</b><br/>
                        <span>{{ record.TenDeXuat }}</span>
                    </template>
                    <template v-else-if="column.key === 'NguoiThucThi'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.DeXuat_HoVaTenNhanVien" :src="record.DeXuat_AnhDaiDien_Url"/>
                            <div>
                                <b>{{ record.DeXuat_HoVaTenNhanVien }}</b><br />
                                <span class="text-primary">{{ record.DeXuat_MaNhanVien }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'TrangThai'">
                        <a-tag v-if="record.Is_Duyet" color="green">Đã duyệt</a-tag>
                        <a-tag v-else-if="!record.Is_Duyet && !record.Is_TuChoi" color="warning">Đang chờ duyệt</a-tag>
                        <a-tag v-if="record.Is_TuChoi && !record.Is_Duyet" color="red">Đã từ chối</a-tag>
                    </template>
                    <template v-else-if="column.key === 'NgayLamThem'">
                        {{ new Date(value).toLocaleDateString('en-GB') }}
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown trigger="click">
                            <uc-icon color="primary" name="dots-horizontal" class="cursor-pointer" />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onDuyet(record)"> <uc-icon color="success"
                                            name="account-edit" /> Duyệt
                                    </a-menu-item>
                                    <a-menu-item @click="onOpenModalTuChoiDX(record)"> <uc-icon
                                            name="text-box-edit-outline" class="text-red" /> Từ chối </a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="onOpenModalEditDX(record)"> <uc-icon name="square-edit-outline"
                                            class="text-primary" />
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
            <a-table show-size-changer :columns="columns.All" :data-source="values.dsDangChoDuyet"
                :loading="states.isloadingTableDangChoDuyet" :pagination="values.pagination" @change="handleTableChange"
                size="small" v-bind="$attrs" :scroll="{ x: 'fit-content', y: 'calc(100vh - 184px)' }">
                <template #bodyCell="{ column, record, value }">
                    <template v-if="column.key === 'ThuTu'"><span>{{ (values.DSDeXuat.indexOf(record) +
                        1).toString().padStart('2', 0) }}</span></template>
                    <template v-else-if="column.key === 'TenTieuDe'">
                        <b>{{ record.TenTieuDe }}</b><br />
                        <span>{{ record.TenDeXuat }}</span>
                    </template>
                    <template v-else-if="column.key === 'NguoiThucThi'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.DeXuat_HoVaTenNhanVien" :src="record.DeXuat_AnhDaiDien_Url"/>
                            <div>
                                <b>{{ record.DeXuat_HoVaTenNhanVien }}</b><br />
                                <span class="text-primary">{{ record.DeXuat_MaNhanVien }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'TrangThai'">
                        <a-tag v-if="record.Is_Duyet" color="green">Đã duyệt</a-tag>
                        <a-tag v-else-if="!record.Is_Duyet && !record.Is_TuChoi" color="warning">Đang chờ duyệt</a-tag>
                        <a-tag v-if="record.Is_TuChoi && !record.Is_Duyet" color="red">Đã từ chối</a-tag>
                    </template>
                    <template v-else-if="column.key === 'NgayLamThem'">
                        {{ new Date(value).toLocaleDateString('en-GB') }}
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown trigger="click">
                            <uc-icon color="primary" name="dots-horizontal" class="cursor-pointer" />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onDuyet(record)"> <uc-icon color="success"
                                            name="account-edit" /> Duyệt
                                    </a-menu-item>
                                    <a-menu-item @click="onOpenModalTuChoiDX(record)"> <uc-icon
                                            name="text-box-edit-outline" class="text-red" /> Từ chối </a-menu-item>
                                    <a-divider class="my-1"></a-divider>
                                    <a-menu-item @click="onOpenModalEditDX(record)"> <uc-icon name="square-edit-outline"
                                            class="text-primary" />
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
        <a-tab-pane key="3" tab="Đã duyệt">
            <a-table show-size-changer :columns="columns.DaDuyet" :data-source="values.dsDaDuyet"
                :loading="states.isloadingTableDaDuyet" :pagination="values.pagination" @change="handleTableChange"
                size="small" v-bind="$attrs" :scroll="{ x: 'fit-content', y: 'calc(100vh - 184px)' }">
                <template #bodyCell="{ column, record, value }">
                    <template v-if="column.key === 'ThuTu'"><span>{{ (values.DSDeXuat.indexOf(record) +
                        1).toString().padStart('2', 0) }}</span></template>
                    <template v-else-if="column.key === 'TenTieuDe'">
                        <b>{{ record.TenTieuDe }}</b><br />
                        <span>{{ record.TenDeXuat }}</span>
                    </template>
                    <template v-else-if="column.key === 'NguoiThucThi'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.DeXuat_HoVaTenNhanVien" :src="record.DeXuat_AnhDaiDien_Url"/>
                            <div>
                                <b>{{ record.DeXuat_HoVaTenNhanVien }}</b><br />
                                <span class="text-primary">{{ record.DeXuat_MaNhanVien }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'NguoiDuyet'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.Duyet_HoVaTenNhanVien" :src="record.Duyet_AnhDaiDien_Url"/>
                            <div>
                                <b>{{ record.Duyet_HoVaTenNhanVien }}</b><br />
                                <span class="text-primary">{{ record.Duyet_MaNhanVien }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'TrangThai'">
                        <a-tag v-if="record.Is_Duyet" color="green">Đã duyệt</a-tag>
                        <a-tag v-else-if="!record.Is_Duyet && !record.Is_TuChoi" color="warning">Đang chờ duyệt</a-tag>
                        <a-tag v-if="record.Is_TuChoi && !record.Is_Duyet" color="red">Đã từ chối</a-tag>
                    </template>
                    <template v-else-if="column.key === 'NgayLamThem'">
                        {{ new Date(value).toLocaleDateString('en-GB') }}
                    </template>
                    <template v-else-if="column.key === 'NgayDuyet'">
                        {{ new Date(record.NgayDuyet).toLocaleDateString('en-GB') }} - {{ record.GioDuyet }}
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown trigger="click">
                            <uc-icon color="primary" name="dots-horizontal" class="cursor-pointer" />
                            <template #overlay>
                                <a-menu>
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
        <a-tab-pane key="4" tab="Đã từ chối">
            <a-table show-size-changer :columns="columns" :data-source="values.dsTuChoi"
                :loading="states.isloadingTableTuChoi" :pagination="values.pagination" @change="handleTableChange"
                size="small" v-bind="$attrs" :scroll="{ x: 'fit-content', y: 'calc(100vh - 184px)' }">
                <template #bodyCell="{ column, record, value }">
                    <template v-if="column.key === 'ThuTu'"><span>{{ (values.DSDeXuat.indexOf(record) +
                        1).toString().padStart('2', 0) }}</span></template>
                    <template v-else-if="column.key === 'TenTieuDe'">
                        <b>{{ record.TenTieuDe }}</b><br />
                        <span>{{ record.TenDeXuat }}</span>
                    </template>
                    <template v-else-if="column.key === 'NguoiThucThi'">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <uc-avatar :text="record.DeXuat_HoVaTenNhanVien" :src="record.DeXuat_AnhDaiDien_Url"/>
                            <div>
                                <b>{{ record.DeXuat_HoVaTenNhanVien }}</b><br />
                                <span class="text-primary">{{ record.DeXuat_MaNhanVien }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'TrangThai'">
                        <a-tag v-if="record.Is_Duyet" color="green">Đã duyệt</a-tag>
                        <a-tag v-else-if="!record.Is_Duyet && !record.Is_TuChoi" color="warning">Đang chờ duyệt</a-tag>
                        <a-tag v-if="record.Is_TuChoi && !record.Is_Duyet" color="red">Đã từ chối</a-tag>
                    </template>
                    <template v-else-if="column.key === 'NgayLamThem'">
                        {{ new Date(value).toLocaleDateString('en-GB') }}
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown trigger="click">
                            <uc-icon color="primary" name="dots-horizontal" class="cursor-pointer" />
                            <template #overlay>
                                <a-menu>
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
    </a-tabs>

    <uc-modal-danh-sach-de-xuat-lam-them v-model:isOpen="states.isShowModalAddDeXuat"
        :DSChinhSachLamThem="values.DSChinhSachLamThem" @onFinish="loadDeXuatLamThem" />
    <uc-modal-edit-dx-lam-them v-model:isOpen="states.isOpenEditModalDX" :record="values.record.DataEdit"
        @onFinish="loadDeXuatLamThem" />

    <uc-modal-tu-choi-dx-lam-them v-model:isOpen="states.isOpenModalTuChoiDX" :record="values.record.DataEdit"
        @onFinish="loadDeXuatLamThem" />
</template>

<script>
export default {

    data() {
        return {
            columns: {
                All: [
                    {
                        title: '#',
                        dataIndex: 'ThuTu',
                        key: 'ThuTu',
                        align: 'center',
                        width: '50px',
                        fixed: 'left'
                    },
                    {
                        title: 'Tiêu đề',
                        dataIndex: 'TieuDe',
                        key: 'TieuDe',
                         fixed: 'left'
                    },
                    
                    {
                        title: 'Người đề xuất',
                        dataIndex: 'DeXuat_HoVaTenNhanVien',
                        key: 'NguoiThucThi',
                         fixed: 'left'
                    },
                    
                    
                    {
                        title: 'Mô tả',
                        dataIndex: 'MoTa',
                        key: 'MoTa',
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'TrangThai',
                        key: 'TrangThai',
                        align: 'center',
                        width: '150px'
                    },
                    {
                        title: 'Ngày tăng ca',
                        dataIndex: 'NgayLamThem',
                        key: 'NgayLamThem',
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
                DaDuyet: [
                    {
                        title: '#',
                        dataIndex: 'ThuTu',
                        key: 'ThuTu',
                        align: 'center',
                        width: '50px',
                    },
                    {
                        title: 'Tiêu đề',
                        dataIndex: 'TieuDe',
                        key: 'TieuDe',
                        width:'250px',
                    },
                    {
                        title: 'Người đề xuất',
                        dataIndex: 'DeXuat_HoVaTenNhanVien',
                        key: 'NguoiThucThi',
                        width:'250px',
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'MoTa',
                        key: 'MoTa',
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'TrangThai',
                        key: 'TrangThai',
                        align: 'center',
                        width: '150px'
                    },

                    {
                        title: 'Ngày tăng ca',
                        dataIndex: 'NgayLamThem',
                        key: 'NgayLamThem',
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
                        title: 'Ngày Duyệt',
                        dataIndex: 'NgayDuyet',
                        align: 'center',
                        width: '150px'
                    },
                    {
                        title: 'Người đã duyệt',
                        dataIndex: 'Duyet_HoVaTenNhanVien',
                        key: 'NguoiDuyet',
                        width:'250px',
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                        width: '50px'
                    },
                ],
                
            },
            states: {
                isloadingTableSellectAll: false,
                isloadingTableDangChoDuyet: false,
                isloadingTableDaDuyet: false,
                isloadingTableTuChoi: false,

                isOpenModalTuChoiDX: false,
                isOpenEditModalDX: false,

                isShowModalAddDeXuat: false,
            },
            values: {
                DSChinhSachLamThem: [],
                DSDeXuat: [],
                dsDangChoDuyet: [],
                dsDaDuyet: [],
                dsTuChoi: [],
                dsGioTangCa: [],

                activeKey: 1,

                record: {
                    DataEdit: {}
                },

                paramSelect: {
                    TrangThai: 0,
                    ChinhSach_LamThem_Id: null,
                    NhanVien_Id: null,
                    PageIndex: 1,
                    PageSize: 35
                },
                pagination: {}
            },
        }
    },
    mounted() {
        this.loadDeXuatLamThem()
        this.loadDSChinhSach()
    },
    methods: {
        onChangeLoad(activeKey) {
            const $this = this
            $this.values.activeKey = activeKey
            if (activeKey == 1) $this.loadDeXuatLamThem()
            else if (activeKey == 2) $this.loadDSDeXuatDangChoDuyet()
            else if (activeKey == 3) $this.loadDSDeXuatDaDuyet()
            else $this.loadDSDeXuatTuChoi()
        },
        onSearch() {
            const $this = this
            if ($this.values.activeKey == 1) $this.loadDeXuatLamThem()
            else if (this.values.activeKey == 2) $this.loadDSDeXuatDangChoDuyet()
            else if ($this.values.activeKey == 3) $this.loadDSDeXuatDaDuyet()
            else $this.loadDSDeXuatTuChoi()
        },
        onOpenModalTuChoiDX(record) {
            this.states.isOpenModalTuChoiDX = true
            this.values.record.DataEdit = Object.assign({}, record)
        },
        onOpenModalEditDX(record) {
            this.states.isOpenEditModalDX = true
            this.values.record.DataEdit = Object.assign({}, record)
        },
        onOpenModalAddDeXuat() {
            this.states.isShowModalAddDeXuat = true
        },
        async loadDSChinhSach() {
            const $this = this
            const res = await chinhSachService.ChinhSach_LamThem_Select()
            if (res) {
                this.values.DSChinhSachLamThem = res
            }
        },
        async loadDSDeXuatDangChoDuyet() {
            const $this = this
            $this.states.isloadingTableDangChoDuyet = true
            const isSelectDangChoDuyet = await deXuatLamThemService.DeXuat_LamThem_Select({
                ... this.values.paramSelect,
                TrangThai: TrangThai.DangChoDuyet,
                NhanVien_Id: this.values.paramSelect.NhanVien_Id ?? 0,
                ChinhSach_LamThem_Id: this.values.paramSelect.ChinhSach_LamThem_Id ?? 0,
            }).finally(() => {
                $this.states.isloadingTableDangChoDuyet = false
            })

            if (isSelectDangChoDuyet) {
                $this.values.pagination = getPaginationDeXuat(isSelectDangChoDuyet[0][0])
                const DeXuatList = isSelectDangChoDuyet[1]
                const KhungGioList = isSelectDangChoDuyet[2]
                const mergedData = DeXuatList.map(proposal => {
                    const matchedTimeSlot = KhungGioList.find(slot => slot.DeXuat_LamThem_Id.trim() === proposal.DeXuat_LamThem_Id.toString());
                    return {
                        ...proposal,
                        ...matchedTimeSlot,
                        DeXuat_LamThem_Id: proposal.DeXuat_LamThem_Id,
                    };
                })
                $this.values.dsDangChoDuyet = Object.assign([], mergedData)
            }
        },
        async loadDSDeXuatDaDuyet() {
            const $this = this
            $this.states.isloadingTableDaDuyet = true
            const isSelectDaDuyet = await deXuatLamThemService.DeXuat_LamThem_Select({
                ... this.values.paramSelect,
                TrangThai: TrangThai.DaDuyet,
                NhanVien_Id: this.values.paramSelect.NhanVien_Id ?? 0,
                ChinhSach_LamThem_Id: this.values.paramSelect.ChinhSach_LamThem_Id ?? 0,
            }).finally(() => {
                $this.states.isloadingTableDaDuyet = false
            })

            if (isSelectDaDuyet) {
                $this.values.pagination = getPaginationDeXuat(isSelectDaDuyet[0][0])
                const DeXuatList = isSelectDaDuyet[1]
                const KhungGioList = isSelectDaDuyet[2]
                const mergedData = DeXuatList.map(proposal => {
                    const matchedTimeSlot = KhungGioList.find(slot => slot.DeXuat_LamThem_Id.trim() === proposal.DeXuat_LamThem_Id.toString());
                    return {
                        ...proposal,
                        ...matchedTimeSlot,
                        DeXuat_LamThem_Id: proposal.DeXuat_LamThem_Id,
                    };
                })
                $this.values.dsDaDuyet = Object.assign([], mergedData)
            }
        },
        async loadDSDeXuatTuChoi() {
            const $this = this
            $this.states.isloadingTableTuChoi = true
            const isSelectTuChoi = await deXuatLamThemService.DeXuat_LamThem_Select({
                ... this.values.paramSelect,
                TrangThai: TrangThai.TuChoi,
                NhanVien_Id: this.values.paramSelect.NhanVien_Id ?? 0,
                ChinhSach_LamThem_Id: this.values.paramSelect.ChinhSach_LamThem_Id ?? 0,
            }).finally(() => {
                $this.states.isloadingTableTuChoi = false
            })

            if (isSelectTuChoi) {
                $this.values.pagination = getPaginationDeXuat(isSelectTuChoi[0][0])
                const DeXuatList = isSelectTuChoi[1]
                const KhungGioList = isSelectTuChoi[2]
                const mergedData = DeXuatList.map(proposal => {
                    const matchedTimeSlot = KhungGioList.find(slot => slot.DeXuat_LamThem_Id.trim() === proposal.DeXuat_LamThem_Id.toString());
                    return {
                        ...proposal,
                        ...matchedTimeSlot,
                        DeXuat_LamThem_Id: proposal.DeXuat_LamThem_Id,
                    };
                })
                $this.values.dsTuChoi = Object.assign([], mergedData)
            }
        },
        async loadDeXuatLamThem() {
            const $this = this
            $this.states.isloadingTableSellectAll = true
            const isSelectAll = await deXuatLamThemService.DeXuat_LamThem_Select({
                ... this.values.paramSelect,
                NhanVien_Id: this.values.paramSelect.NhanVien_Id ?? 0,
                ChinhSach_LamThem_Id: this.values.paramSelect.ChinhSach_LamThem_Id ?? 0,
            }).finally(() => {
                $this.states.isloadingTableSellectAll = false
            })

            if (isSelectAll) {
                $this.values.pagination = getPaginationDeXuat(isSelectAll[0][0])
                const DeXuatList = isSelectAll[1]
                const KhungGioList = isSelectAll[2]
                const mergedData = DeXuatList.map(proposal => {
                    const matchedTimeSlot = KhungGioList.find(slot => slot.DeXuat_LamThem_Id.trim() === proposal.DeXuat_LamThem_Id.toString());
                    return {
                        ...proposal,
                        ...matchedTimeSlot,
                        DeXuat_LamThem_Id: proposal.DeXuat_LamThem_Id,
                    };
                })
                $this.values.DSDeXuat = Object.assign([], mergedData)
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
        handleTableChange(_pagination) {
            console.log(_pagination)
            const $this = this
            $this.values.paramSelect = {
                ...$this.values.paramSelect,
                PageIndex: _pagination.current,
                PageSize: _pagination.pageSize,
            }
            $this.onSearch()
        },
        onDuyet(record) {
            console.log(record);
            Confirm.confirm({
                content: 'Bạn có muốn duyệt đề xuất?',
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
