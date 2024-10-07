<template>
    <div>
        <a-card title="Cấu hình đề xuất nghỉ phép" class="card-title-page">
            <template #extra>
                <a-button  type="primary" @click="states.isOpenModalAddChinhSach = true"><uc-icon name="plus" />Thêm chính sách</a-button>
            </template>
        </a-card>
        <a-tabs>
            <a-tab-pane key="1" tab="Tất cả chính sách">
                <uc-container :width="900">
                    <a-collapse expand-icon-position="left" class="bg-white">
                        <a-collapse-panel v-for="item in values.dsNhomChinhSach" :key="item.NhomChinhSach_LamThem_Id">

                            <template #header>
                                <b>{{ item.TenNhomChinhSach_NghiPhep }}</b>
                                <br />
                                {{ item.MoTa }}
                            </template>
                            <a-table :columns="columns.ChinhSach"
                                :dataSource="values.dsChinhSach.filter((i) => { return i.NhomChinhSach_NghiPhep_Id === item.NhomChinhSach_NghiPhep_Id })"
                                :pagination="false">
                                <template #bodyCell="{ column, record, index }">
                                    <template v-if="column.key === 'stt'">
                                        <span>{{ index + 1 }}</span>
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
                                                    <a-menu-item @click="onEditChinhSach(record)"><uc-icon
                                                            class="text-primary" name="square-edit-outline" />Chỉnh
                                                        sửa</a-menu-item>
                                                    <a-menu-item @click="onDeleteChinhSach(record)"><uc-icon
                                                            class="text-red" name="delete-outline" />Xoá</a-menu-item>
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
                <uc-container :width="600">
                    <a-table :columns="columns.NhomChinhSach" :dataSource="values.dsNhomChinhSach"
                        :loading="states.isLoadingTableNhomChinhSach" :pagination="false">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'stt'">
                                <span>{{ values.dsNhomChinhSach.indexOf(record) + 1 }}</span>
                            </template>

                            <template v-else-if="column.key === 'tennhomchinhsach'">
                                <div class="d-flex flex-column">
                                    <b>{{ record.TenNhomChinhSach_NghiPhep }}</b>
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
                                            <a-menu-item @click="onEditNhomChinhSach(record)"><uc-icon
                                                    class="text-primary" name="square-edit-outline" />Chỉnh
                                                sửa</a-menu-item>
                                            <a-menu-item @click="onDeleteNhomChinhSach(record)"><uc-icon
                                                    class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                        </template>
                    </a-table>
                </uc-container>
            </a-tab-pane>
        </a-tabs>
        <uc-modal-add-to-chinh-sach :dsNhomChinhSach="values.dsNhomChinhSach"
            v-model:isOpen="states.isOpenModalAddChinhSach" @onFinish="loadDSChinhSach()" />
        <uc-modal-edit-to-chinh-sach :record="values.record" :dsNhomChinhSach="values.dsNhomChinhSach"
            v-model:isOpen="states.isOpenModalEditChinhSach" @onFinish="loadDSChinhSach()" />

    </div>
</template>

<script>
export default {
    data() {
        return {
            states: {
                isLoadingTableNhomChinhSach: false,

                isOpenModalEditChinhSach: false,
                isOpenModalAddChinhSach: false,
                isOpenModalEditChinhSach: false,
            },
            values: {
                record: {
                    NhomChinhSach: {},
                    ChinhSach: {},
                    dsNhanSu: [],
                },
                dsNhomChinhSach: [],
                dsChinhSach: [],
            },
            columns: {
                ChinhSach: [
                    {
                        title: '#',
                        dataIndex: 'stt',
                        key: 'stt',
                        width: '50px',
                        align: 'center',
                    },
                    {
                        title: 'Tên chính sách',
                        dataIndex: 'TenChinhSach_NghiPhep',
                        key: 'chinhsach',
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'MoTa',
                    },
                    {
                        title: 'Tạm khoá',
                        dataIndex: 'Is_TamKhoa',
                        key: 'trangthai',
                        align: 'center',
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                    },
                ],
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
                ],
            },

        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadDSNhomChinhSach() {
            this.isLoadingTableNhomChinhSach = true
            const resp = await nhomChinhSachService.NhomChinhSach_NghiPhep_Select().finally(() => {
                this.isLoadingTableNhomChinhSach = false
            })
            if (resp) {
                this.values.dsNhomChinhSach = resp
                this.values.record.NhomChinhSach = resp
            }
        },
        async loadDSChinhSach() {
            const res = await chinhSachService.ChinhSach_NghiPhep_Select()
            if (res) {
                this.values.dsChinhSach = res[0]
            }
        },
        loadData() {
            this.loadDSChinhSach()
            this.loadDSNhomChinhSach()
        },
        async onEditChinhSach(record) {
            const resp = await chinhSachService.ChinhSach_NghiPhep_Select_By_Id({
                ChinhSach_NghiPhep_Id: record.ChinhSach_NghiPhep_Id,
            }).finally(() => {
                this.states.isOpenModalEditChinhSach = true
            })
            if (resp) {
                this.values.record.ChinhSach = Object.assign({}, record)
                this.values.record.ChinhSach.Is_BacBuocKhoanGioiHan =  this.values.record.ChinhSach.Is_BacBuocKhoanGioiHan ? 1 : 0
                this.values.record.ChinhSach.Is_GioiHanNgayNghi =  this.values.record.ChinhSach.Is_GioiHanNgayNghi ? 1 : 0
                this.values.record.ChinhSach.Is_TamKhoa =  this.values.record.ChinhSach.Is_TamKhoa ? 1 : 0
                this.values.record.ChinhSach.Is_UuTien_QuyNghiBu =  this.values.record.ChinhSach.Is_UuTien_QuyNghiBu ? 1 : 0
                this.values.record.dsNhanSu = Object.assign([], resp[1])
                console.log(this.values.record)
            }
        },
        onDeleteChinhSach(record) {
            Confirm.delete({
                content: `Bạn có chắc muốn xóa ${record.TenChinhSach_NghiPhep}?`,
                onOk: async () => {
                    const res = await chinhSachService.ChinhSach_NghiPhep_Delete({
                        ChinhSach_NghiPhep_Id: record.ChinhSach_NghiPhep_Id,
                    })
                    if (res) {
                        this.$message.success(`Đã xóa chính sách thành công!`)
                        this.loadDSChinhSach()
                    }
                },
            })
        }
    },
}
</script>
