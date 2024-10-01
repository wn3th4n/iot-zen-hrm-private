<template>
    <uc-layout>
        <a-card title="Đề xuất làm thêm giờ" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-dropdown :trigger="['click']">
                        <a-button type="primary" @click.prevent><uc-icon name="plus" />Thêm</a-button>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="0" @click="onOpenModalAddChinhSach()"><uc-icon name="plus" />Thêm chính sách</a-menu-item>
                                <a-menu-item key="1" @click="onOpenModalAddNhomChinhSach()"><uc-icon name="plus" />Thêm nhóm chính sách</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-space>
            </template>
        </a-card>
        <a-tabs>
            <a-tab-pane key="1" tab="Tất cả chính sách">
                <uc-container :width="900">
                    <a-collapse expand-icon-position="left" class="bg-white">
                        <a-collapse-panel v-for="item in DSNhomChinhSach" :key="item.ChinhSach_LamThem_Id">
                            <template #header>
                                <b>{{ item.TenNhomChinhSach_LamThem }}</b>
                                <br />
                                {{ item.MoTa }}
                            </template>
                            <a-table :columns="columns" :data-source="DSChinhSach.filter((x) => x.NhomChinhSach_LamThem_Id === item.NhomChinhSach_LamThem_Id)" :pagination="false" size="small">
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'stt'">
                                        <span>{{ DSChinhSach.filter((x) => x.NhomChinhSach_LamThem_Id === item.NhomChinhSach_LamThem_Id).indexOf(record) + 1 }}</span>
                                    </template>
                                    <template v-else-if="column.key === 'chinhsach'">
                                        <b>{{ record.TenChinhSach_LamThem }}</b
                                        ><br />
                                        <span class="text-primary">{{ record.MaChinhSach_LamThem }}</span>
                                    </template>
                                    <template v-else-if="column.key === 'HeSo'">
                                        <b>{{ record.HeSo.toFixed(2) }}</b> <br />
                                        <span class="text-primary">{{ record.MaHeSo }}</span>
                                    </template>
                                    <template v-else-if="column.key === 'trangthai'">
                                        <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                                    </template>

                                    <template v-else-if="column.key === 'Action'">
                                        <a-dropdown :trigger="['click']">
                                            <a class="ant-dropdown-link"><uc-icon name="dots-horizontal" /></a>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item @click="onOpenModalEditChinhSach(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                                    <a-menu-item @click="onOpenModalDeleteChinhSach(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
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
            <a-tab-pane key="2" tab="Tất cả nhóm">
                <uc-container :width="900">
                    <a-table :columns="columnsNhomChinhSach" :data-source="DSNhomChinhSach" :pagination="false" size="small">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'stt'">
                                <span>{{ DSNhomChinhSach.indexOf(record) + 1 }}</span>
                            </template>

                            <template v-else-if="column.key === 'tennhomchinhsach'">
                                <div class="d-flex flex-column">
                                    <b>{{ record.TenNhomChinhSach_LamThem }}</b>
                                    <span>{{ record.MoTa }}</span>
                                </div>
                            </template>

                            <template v-else-if="column.key === 'Is_TamKhoa'">
                                <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                            </template>
                            <template v-else-if="column.key === 'Action'">
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link">
                                        <uc-icon name="dots-horizontal" />
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item @click="onEditNhomChinhSach(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                            <a-menu-item @click="onDeleteNhomChinhSach(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                        </template>
                    </a-table>
                </uc-container>
            </a-tab-pane>
        </a-tabs>
        <uc-modal-add-nhom-chinh-sach v-model:isOpen="is_OpenModalAddNhomChinhSach" @onFinish="loadDSNhomChinhSach" />
        <uc-modal-edit-nhom-chinh-sach v-model:isOpen="is_OpenModalEditNhomChinhSach" :record="recordNhomChinhSach" @onFinish="loadDSNhomChinhSach" />

        <uc-modal-add-chinh-sach v-model:isOpen="is_OpenModalAddChinhSach" @onFinish="loadDSChinhSach" :dsnhomchinhsach="DSNhomChinhSach" />
        <uc-modal-edit-chinh-sach v-model:isOpen="is_OpenModalEditChinhSach" :record="recordChinhSach" @onFinish="loadDSChinhSach" :dsnhomchinhsach="DSNhomChinhSach" />
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
            is_OpenModalAddNhomChinhSach: false,
            is_OpenModalEditNhomChinhSach: false,
            is_OpenModalEditChinhSach: false,
            is_OpenModalAddChinhSach: false,
            DSNhomChinhSach: [],
            DSChinhSach: [],
            recordNhomChinhSach: {},
            recordChinhSach: {},
            DSPhucLoi: [],
            columnsNhomChinhSach: [
                {
                    title: '#',
                    dataIndex: 'stt',
                    key: 'stt',
                    align: 'center',
                },
                {
                    title: 'Tên nhóm chính sách',
                    dataIndex: 'tennhomchinhsach',
                    key: 'tennhomchinhsach',
                },
                {
                    title: 'Trạng thái',
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
            columns: [
                {
                    title: '#',
                    dataIndex: 'stt',
                    key: 'stt',
                    align: 'center',
                },
                {
                    title: 'Tên chính sách',
                    dataIndex: 'chinhsach',
                    key: 'chinhsach',
                },
                {
                    title: 'Hệ số',
                    dataIndex: 'HeSo',
                    key: 'HeSo',
                    width: '150px',
                },
                {
                    title: 'Mô tả',
                    dataIndex: 'MoTa',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'trangthai',
                    key: 'trangthai',
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
    created() {},
    mounted() {
        this.loadDSChinhSach()
        this.loadDSNhomChinhSach()
    },
    computed: {},
    watch: {},
    methods: {
        onOpenModalAddChinhSach() {
            this.is_OpenModalAddChinhSach = true
        },
        onOpenModalEditChinhSach(record) {
            this.is_OpenModalEditChinhSach = true
            this.recordChinhSach = Object.assign({}, record)
            this.recordChinhSach.Is_TamKhoa = this.recordChinhSach.Is_TamKhoa ? 1 : 0
        },
        onOpenModalAddNhomChinhSach() {
            this.is_OpenModalAddNhomChinhSach = true
        },
        onEditNhomChinhSach(record) {
            this.is_OpenModalEditNhomChinhSach = true

            this.recordNhomChinhSach = Object.assign({}, record)
            this.recordNhomChinhSach.Is_TamKhoa = this.recordNhomChinhSach.Is_TamKhoa ? 1 : 0
        },
        onDeleteNhomChinhSach(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa ${record.TenNhomChinhSach_LamThem}?`,
                onOk: async () => {
                    const res = await nhomChinhSachService.NhomChinhSach_LamThem_Delete({
                        NhomChinhSach_LamThem_Id: record.NhomChinhSach_LamThem_Id,
                    })
                    if (res) {
                        $this.$message.success(`Xóa nhóm chính sách ${record.TenNhomChinhSach_LamThem}!`)
                        $this.loadDSNhomChinhSach()
                    }
                },
            })
        },
        async loadDSNhomChinhSach() {
            const $this = this
            const res = await nhomChinhSachService.NhomChinhSach_LamThem_Select()
            if (res) {
                $this.DSNhomChinhSach = res
            }
        },
        async loadDSChinhSach() {
            const $this = this
            const res = await chinhSachService.ChinhSach_LamThem_Select()
            if (res) {
                $this.DSChinhSach = res
            }
        },
        onOpenModalDeleteChinhSach(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa ${record.TenChinhSach_LamThem}?`,
                onOk: async () => {
                    const res = await chinhSachService.ChinhSach_LamThem_Delete({
                        ChinhSach_LamThem_Id: record.ChinhSach_LamThem_Id,
                    })
                    if (res) {
                        $this.$message.success(`Xóa nhóm chính sách ${record.TenChinhSach_LamThem}!`)
                        $this.loadDSChinhSach()
                    }
                },
            })
        },
    },
}
</script>