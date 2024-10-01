<template>
    <div>
        <a-card title="Vị trí" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-dropdown :trigger="['click']">
                        <a-button type="primary" @click.prevent><uc-icon name="plus" />Thêm</a-button>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="0" @click="onSaveViTri()"><uc-icon name="plus" />Thêm vị trí</a-menu-item>
                                <a-menu-item key="1" @click="onSaveLoaiViTri()"><uc-icon name="plus" />Thêm nhóm vị trí</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-space>
            </template>
        </a-card>
        <a-tabs>
            <a-tab-pane key="1" tab="Vị trí">
                <uc-container :width="600">
                    <a-table :data-source="DSViTri" :columns="columns" :pagination="false" size="small" :scroll="{ y: 'calc(100vh - 155px)' }">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'TenViTri'">
                                <div class="d-flex flex-column">
                                    <b>{{ record.TenViTri }}</b>
                                    <span class="text-primary">{{ record.MaViTri }}</span>
                                </div>
                            </template>
                            <template v-else-if="column.key === 'trangthai'">
                                <a-space size="small">
                                    <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                                </a-space>
                            </template>
                            <template v-else-if="column.key === 'LichLamViec'">
                                <a @click="onAddLichLamViec(record)">
                                    <uc-icon name="calendar-outline" class="text-warning"/>
                                </a>
                            </template>
                            <template v-else-if="column.key === 'Action'">
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link">
                                        <uc-icon name="dots-horizontal" />
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item @click="onEditViTri(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                            <a-menu-item @click="onDeleteViTri(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                        </template>
                    </a-table>
                </uc-container>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Nhóm vị trí">
                <uc-container :width="600">
                    <a-table :data-source="DSLoaiViTri" :columns="columnsLoaiViTri" :pagination="false" size="small">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'TenViTri'">
                                <div class="d-flex flex-column">
                                    <b>{{ record.TenViTri }}</b>
                                    <span class="text-primary">{{ record.MaViTri }}</span>
                                </div>
                            </template>
                            <template v-else-if="column.key === 'trangthai'">
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
                                            <a-menu-item @click="onEditLoaiViTri(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                            <a-menu-item @click="onDeleteLoaiViTri(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                        </template>
                    </a-table>
                </uc-container>
            </a-tab-pane>
        </a-tabs>
        <uc-modal-lich-lam-viec-vi-tri v-model:isOpen="action.IsShowModalLichLamViec" @onFinish="onFinishAddLichLamViec()" :record="recordItem" />

        <uc-modal-add-vi-tri v-model:isOpen="action.IsShowModalAddViTri" @onFinish="onFinishAddViTri" />
        <uc-modal-edit-vi-tri v-model:isOpen="action.IsShowModalEditViTri" @onFinish="onFinishEditViTri" :record="RecordItemViTri" />

        <uc-modal-add-loai-vi-tri v-model:isOpen="action.IsShowModalAddLoaiViTri" @onFinish="loadLoaiViTri()" />
        <uc-modal-edit-loai-vi-tri v-model:isOpen="action.IsShowModalEditLoaiViTri" @onFinish="loadLoaiViTri()" :record="RecordItemLoaiViTri" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
            action: {
                IsShowModalAddLoaiViTri: false,
                IsShowModalAddViTri: false,
                IsShowModalEditLoaiViTri: false,
                IsShowModalEditViTri: false,
                IsShowModalEditChoDuyet: false,
                IsShowModalLichLamViec: false,
            },
            DSViTri: [],
            columnsLoaiViTri: [
                {
                    title: 'Tên nhóm vị trí',
                    dataIndex: 'TenLoaiViTri',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'trangthai',
                    key: 'trangthai',
                    align: 'center',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            columns: [
                {
                    title: 'Tên vị trí',
                    dataIndex: 'TenViTri',
                    key: 'TenViTri',
                },
                {
                    title: 'Tên nhóm vị trí',
                    dataIndex: 'TenLoaiViTri',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'trangthai',
                    key: 'trangthai',
                    align: 'center',
                },
                {
                    title: 'Lịch làm việc',
                    dataIndex: 'LichLamViec',
                    key: 'LichLamViec',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            RecordItemLoaiViTri: {},
            RecordItemViTri: {},
            DSLoaiViTri: [],
            recordItem: {},
        }
    },
    created() {
        this.loadViTri()
        this.loadLoaiViTri()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEditLoaiViTri(record) {
            this.RecordItemLoaiViTri = Object.assign({}, record)
            this.RecordItemLoaiViTri.Is_TamKhoa = this.RecordItemLoaiViTri.Is_TamKhoa ? 1 : 0
            this.action.IsShowModalEditLoaiViTri = true
        },
        onEditViTri(record) {
            this.RecordItemViTri = Object.assign({}, record)
            this.action.IsShowModalEditViTri = true
            this.RecordItemViTri.Is_TamKhoa = this.RecordItemViTri.Is_TamKhoa ? 1 : 0
        },
        onDeleteLoaiViTri(record) {
            const $this = this
            Confirm.delete({
                content: 'Bạn có chắc chắn muốn xóa?',
                onOk: async () => {
                    const res = await loaiViTriHRService.LoaiViTri_Delete({
                        LoaiViTri_Id: record.LoaiViTri_Id,
                    })
                    if (res) {
                        $this.loadLoaiViTri()
                    }
                },
            })
        },
        onDeleteViTri(record) {
            Confirm.delete({
                content: 'Bạn có chắc chắn muốn xóa ' + record.TenViTri + '?',
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_ViTri_Delete',
                        {
                            ViTri_Id: record.ViTri_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadViTri()
                        },
                    )
                },
            })
        },
        onSaveViTri() {
            this.action.IsShowModalAddViTri = true
        },
        onSaveLoaiViTri() {
            this.action.IsShowModalAddLoaiViTri = true
        },
        async loadLoaiViTri() {
            const res = await loaiViTriHRService.LoaiViTri_Select()
            if (res) {
                this.DSLoaiViTri = res
            }
        },
        loadViTri() {
            ajaxCALL('/work/HR_ViTri_Select', {}, (res) => {
                this.DSViTri = res.data
            })
        },
        async onAddLichLamViec(record) {
            const res = await viTriHRService.ViTri_MauBangCong_Select({
                ViTri_Id: record.ViTri_Id,
            })
            if (res) {
                this.recordItem = Object.assign({}, record)
                this.recordItem.MauBangCong_Id_List = res.map((i) => i.MauBangCong_Id) ?? []
                this.action.IsShowModalLichLamViec = true
            }
        },
        onFinishAddLichLamViec() {
            this.loadViTri()
        },
        onFinishAddViTri() {
            this.loadViTri()
        },
        onFinishEditViTri() {
            this.loadViTri()
        },
    },
}
</script>
