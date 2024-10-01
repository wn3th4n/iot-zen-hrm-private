<template>
    <div>
        <a-card title="Phúc lợi" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onRedirectPhucLoi()"><uc-icon name="launch" />Xem tất cả nhân sự tham gia</a-button>
                    <a-dropdown :trigger="['click']">
                        <a-button type="primary" @click.prevent><uc-icon name="plus" />Thêm chính sách phúc lợi</a-button>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="0" @click="onSavePhucLoi"><uc-icon name="plus" />Thêm phúc lợi</a-menu-item>
                                <a-menu-item key="1" @click="onSaveLoaiPhucLoi"><uc-icon name="plus" />Thêm loại phúc lợi</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-space>
            </template>
        </a-card>
        <a-tabs v-model:activeTabKey="tabListTitleKey">
            <a-tab-pane key="1" tab="Chính sách">
                <uc-container :width="900">
                    <a-collapse expand-icon-position="left" class="bg-white">
                        <a-collapse-panel v-for="item in DSLoaiPhucLoi" :key="item.LoaiPhucLoi_Id">
                            <template #header>
                                <b>{{ item.TenLoaiPhucLoi }}</b>
                                <br />
                                {{ item.MoTa }}
                            </template>
                            <a-table :columns="columns" :data-source="DSPhucLoi.filter((x) => x.LoaiPhucLoi_Id === item.LoaiPhucLoi_Id)" :pagination="false" size="small">
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'phucloi'">
                                        <div class="d-flex flex-column">
                                            <b>{{ record.TenPhucLoi }}</b>
                                            <span class="text-primary">{{ record.MaPhucLoi }} </span>
                                        </div>
                                    </template>
                                    <template v-else-if="column.key === 'stt'">
                                        <span>{{ DSPhucLoi.filter((x) => x.LoaiPhucLoi_Id === item.LoaiPhucLoi_Id).indexOf(record) + 1 }}</span>
                                    </template>
                                    <template v-else-if="column.key === 'GiaTri'">
                                        <span>{{ record.GiaTri.toLocaleString('vi-vn') }}</span>
                                    </template>
                                    <template v-else-if="column.key === 'HinhThucLapLai'">
                                        <span v-if="record.HinhThucLapLai === 1">Bảng lương</span>
                                        <span v-if="record.HinhThucLapLai === 2">Hàng tháng</span>
                                        <span v-if="record.HinhThucLapLai === 3">Hàng tuần</span>
                                        <span v-if="record.HinhThucLapLai === 4">Hàng năm</span>
                                        <span v-if="record.HinhThucLapLai === 5">Sự kiện</span>
                                    </template>
                                    <template v-else-if="column.key === 'trangthai'">
                                        <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                                    </template>
                                    <template v-else-if="column.key === 'tinhthunhap'">
                                        <uc-icon v-if="record.Is_TinhThuNhap === true" name="check" class="text-success" />
                                    </template>
                                    <template v-else-if="column.key === 'Action'">
                                        <a-dropdown :trigger="['click']">
                                            <a class="ant-dropdown-link"><uc-icon name="dots-horizontal" /></a>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item @click="onEditPhucLoi(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                                    <a-menu-item @click="onDeletePhucLoi(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                </template>
                            </a-table>
                        </a-collapse-panel>
                    </a-collapse>
                </uc-container>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Các loại phúc lợi">
                <uc-container :width="700">
                    <a-table :columns="columnsLoaiPhucLoi" :data-source="DSLoaiPhucLoi" :pagination="false">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'stt'">
                                <span>{{ DSLoaiPhucLoi.indexOf(record) + 1 }}</span>
                            </template>
                            <template v-if="column.key === 'tenphucloi'">
                                <div class="d-flex flex-column">
                                    <b>{{ record.TenLoaiPhucLoi }}</b>
                                    <span>{{ record.MoTa }}</span>
                                </div>
                            </template>
                            <template v-else-if="column.key === 'Action'">
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link">
                                        <uc-icon name="dots-horizontal" />
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item @click="onEditLoaiPhucLoi(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                            <a-menu-item @click="onDeleteLoaiPhucLoi(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                        </template>
                    </a-table>
                </uc-container>
            </a-tab-pane>
        </a-tabs>
        <uc-modal-add-loai-phuc-loi v-model:isOpen="action.IsShowModalAddLoaiPhucLoi" @onFinish="onFinishAddLoaiPhucLoi" />
        <uc-modal-edit-loai-phuc-loi v-model:isOpen="action.IsShowModalEditLoaiPhucLoi" @onFinish="onFinishEditLoaiPhucLoi" :record="RecordItemLoaiPhucLoi" />
        <uc-modal-add-phuc-loi v-model:isOpen="action.IsShowModalAddPhucLoi" @onFinish="onFinishAddPhucLoi" :dsloaiphucloi="DSLoaiPhucLoi" :loaiphucloiid="LoaiPhucLoiId" />
        <uc-modal-edit-phuc-loi v-model:isOpen="action.IsShowModalEditPhucLoi" @onFinish="onFinishEditPhucLoi" :record="RecordItemPhucLoi" :dsloaiphucloi="DSLoaiPhucLoi"></uc-modal-edit-phuc-loi>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            tabListTitleKey: 'PhucLoi',
            loading: false,
            action: {
                IsShowModalAddLoaiPhucLoi: false,
                IsShowModalAddPhucLoi: false,
                IsShowModalEditLoaiPhucLoi: false,
                IsShowModalEditPhucLoi: false,
            },
            DSLoaiPhucLoi: [],
            DSPhucLoi: [],
            columnsLoaiPhucLoi: [
                {
                    title: '#',
                    dataIndex: 'stt',
                    key: 'stt',
                },
                {
                    title: 'Tên loại phúc lợi',
                    dataIndex: 'tenphucloi',
                    key: 'tenphucloi',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            columns: [
                {
                    title: '#',
                    dataIndex: 'stt',
                    key: 'stt',
                    scopedSlots: { customRender: 'stt' },
                },
                {
                    title: 'Phúc lợi',
                    dataIndex: 'phucloi',
                    key: 'phucloi',
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'GiaTri',
                    key: 'GiaTri',
                },
                {
                    title: 'Lặp lại',
                    dataIndex: 'HinhThucLapLai',
                    key: 'HinhThucLapLai',
                },
                {
                    title: 'Tạm khóa',
                    dataIndex: 'trangthai',
                    key: 'trangthai',
                    align: 'center',
                },
                {
                    title: 'Tính thu nhập',
                    dataIndex: 'tinhthunhap',
                    key: 'tinhthunhap',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            RecordItemLoaiPhucLoi: {},
            RecordItemPhucLoi: {},
            LoaiPhucLoiId: null,
        }
    },
    created() {
        this.loadPhucLoi()
        this.loadLoaiPhucLoi()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onRedirectPhucLoi(){
            redirect('/hr-chinh-sach-phuc-loi')
        },
        onEditLoaiPhucLoi(record) {
            record.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0
            this.RecordItemLoaiPhucLoi = Object.assign({}, record)
            this.action.IsShowModalEditLoaiPhucLoi = true
        },
        onEditPhucLoi(record) {
            record.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0
            this.RecordItemPhucLoi = Object.assign({}, record)
            this.action.IsShowModalEditPhucLoi = true
        },
        onDeleteLoaiPhucLoi(record) {
            Confirm.delete({
                content: `Bạn có chắc chắn muốn xóa ${record.TenLoaiPhucLoi}?`,
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_LoaiPhucLoi_Delete',
                        {
                            LoaiPhucLoi_Id: record.LoaiPhucLoi_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadLoaiPhucLoi()
                        },
                    )
                },
            })
        },
        onAddPhucLoi_ByLoaiPhucLoi(id) {
            this.action.IsShowModalAddPhucLoi = true
            this.LoaiPhucLoiId = id
        },
        onSavePhucLoi() {
            this.action.IsShowModalAddPhucLoi = true
        },
        onSaveLoaiPhucLoi() {
            this.action.IsShowModalAddLoaiPhucLoi = true
        },
        onDeletePhucLoi(record) {
            Confirm.delete({
                content: `Bạn có chắc chắn muốn xóa ${record.TenPhucLoi}?`,
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_PhucLoi_Delete',
                        {
                            PhucLoi_Id: record.PhucLoi_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadLoaiPhucLoi()
                            this.loadPhucLoi()
                        },
                    )
                },
            })
        },
        loadLoaiPhucLoi() {
            ajaxCALL('/work/HR_LoaiPhucLoi_Select', {}, (res) => {
                this.DSLoaiPhucLoi = res.data
            })
        },
        loadPhucLoi() {
            ajaxCALL('/work/HR_PhucLoi_Select', {}, (res) => {
                this.DSPhucLoi = res.data
            })
        },
        onFinishAddLoaiPhucLoi() {
            this.loadLoaiPhucLoi()
        },
        onFinishEditLoaiPhucLoi() {
            this.loadLoaiPhucLoi()
        },
        onFinishAddPhucLoi() {
            this.loadLoaiPhucLoi()
            this.loadPhucLoi()
        },
        onFinishEditPhucLoi() {
            this.loadLoaiPhucLoi()
            this.loadPhucLoi()
        },
    },
}
</script>
