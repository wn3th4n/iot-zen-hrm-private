<template>
    <a-card title="Cấu hình đề xuất làm thêm giờ" class="card-title-page">
        <template #extra>
            <a-space size="small">
                <a-dropdown :trigger="['click']">
                    <a-button type="primary" @click.prevent><uc-icon name="plus" />Thêm chính sách</a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="0" @click="states.isOpenModalAddChinhSach = true"><uc-icon
                                    name="plus" />Thêm chính sách</a-menu-item>
                            <a-menu-item key="1" @click="states.isOpenModalAddNhomChinhSach = true"><uc-icon
                                    name="plus" />Thêm nhóm chính sách</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-space>
        </template>
    </a-card>

    <a-tabs>
        <a-tab-pane key="1" tab="Tất cả chính sách">
            <a-table></a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tất cả nhóm">
            <uc-container :width="900">
                <a-table :columns="columns.NhomChinhSach" :dataSource="values.dsNhomChinhSach"
                    :loading="states.isLoadingTableNhomChinhSach" :pagination="false">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'stt'">
                            <span>{{ values.dsNhomChinhSach.indexOf(record) + 1 }}</span>
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
                                        <a-menu-item @click="onEditNhomChinhSach(record)"><uc-icon class="text-primary"
                                                name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                        <a-menu-item @click="onDeleteNhomChinhSach(record)"><uc-icon class="text-red"
                                                name="delete-outline" />Xoá</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </template>
                    </template>
                </a-table>
            </uc-container>
        </a-tab-pane>
    </a-tabs>

    <uc-modal-add-chinh-sach :dsNhomChinhSach="values.dsNhomChinhSach" v-model:isOpen="states.isOpenModalAddChinhSach"
        @onFinish="loadDSChinhSach()" />

    <uc-modal-add-nhom-chinh-sach v-model:isOpen="states.isOpenModalAddNhomChinhSach"
        @onFinish="loadDSNhomChinhSach()" />
    <uc-modal-edit-nhom-chinh-sach :record="values.record.NhomChinhSach"
        v-model:isOpen="states.isOpenModalEditNhomChinhSach" @onFinish="loadDSNhomChinhSach()" />
</template>

<script>
export default {
    data() {
        return {
            states: {
                isLoadingTableNhomChinhSach: false,

                isOpenModalAddChinhSach: false,
                isOpenModalEditChinhSach: false,
                isOpenModalAddNhomChinhSach: false,
                isOpenModalEditNhomChinhSach: false,
            },
            columns: {
                NhomChinhSach: [
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
            },
            values: {
                record: {
                    NhomChinhSach: {},
                    ChinhSach: {},
                },
                dsNhomChinhSach: [],
                dsChinhSach: [],
            },
        }
    },
    mounted() {
        this.loadDSChinhSach()
        this.loadDSNhomChinhSach()
    },
    methods: {
        async loadDSNhomChinhSach() {
            this.isLoadingTableNhomChinhSach = true
            const resp = await nhomChinhSachService.NhomChinhSach_LamThem_Select().finally(() => {
                this.isLoadingTableNhomChinhSach = false
            })
            if (resp) this.values.dsNhomChinhSach = resp
        },
        async loadDSChinhSach() {
            const resp = await nhomChinhSachService.ChinhSach_LamThem_Select()
            if (resp) this.values.dsChinhSach = resp
        },
        async loadDSChinhSach() {
            const res = await chinhSachService.ChinhSach_LamThem_Select()
            if (res) {
                this.values.DSChinhSach = res
            }
        },
        onEditNhomChinhSach(record) {
            this.values.record.NhomChinhSach = Object.assign({}, record)
            this.values.record.NhomChinhSach.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0 
            this.states.isOpenModalEditNhomChinhSach = true
        },
        async onDeleteNhomChinhSach(record) {
            Confirm.delete({
                content: 'Bạn có chắc chắn muốn xóa nhóm chính sách này không?',
                onOk: async () => {
                    await nhomChinhSachService
                        .NhomChinhSach_LamThem_Delete({
                            NhomChinhSach_LamThem_Id: record.NhomChinhSach_LamThem_Id,
                        })
                        .finally(() => {
                            this.$message.success('Đã xóa thành công nhóm chính sách!')
                            this.loadDSNhomChinhSach()
                        })
                },
            })
        },
    },
}
</script>
