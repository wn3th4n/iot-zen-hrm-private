<template>
    <uc-layout>
        <a-card title="Mẫu bảng lương"  class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onCreate"><uc-icon name="plus" />Thêm mẫu bảng lương</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="800" style="height: calc(100vh - 70px); overflow-y: auto">
            <a-table :data-source="DSMauBangLuong" :columns="columns" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'ten'">
                        <span>{{ record.NguoiChotLuong_Ten }}</span>
                    </template>
                    <template v-else-if="column.key === 'TenMauBangLuong'">
                        <div class="d-flex flex-column">
                            <b>{{ record.TenMauBangLuong }}</b>
                            <span class="text-primary">{{ record.MaMauBangLuong }}</span>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'STT'">
                        <span>{{ DSMauBangLuong.indexOf(record) + 1 }}</span>
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link"> <uc-icon name="dots-horizontal" /> </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onEdit(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                    <a-menu-item @click="openDinhNghiaCot(record)"> <uc-icon class="text-primary" name="table-cog" />Cấu hình cột </a-menu-item>
                                    <a-menu-item @click="onDelete(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </template>
            </a-table>
        </uc-container>
        <uc-modal-add v-model:isOpen="action.isShowModalAdd" @onFinish="loadMauBangLuong()"></uc-modal-add>
        <uc-modal-edit v-model:isOpen="action.isShowModalEdit" @onFinish="loadMauBangLuong()" :record="recordItem"></uc-modal-edit>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            recordItem: {},
            columns: [
                {
                    title: '#',
                    dataIndex: 'STT',
                    key: 'STT',
                    align: 'center',
                },
                {
                    title: 'Tên mẫu bảng lương',
                    dataIndex: 'TenMauBangLuong',
                    key: 'TenMauBangLuong',
                },
                {
                    title: 'Người chốt lương',
                    dataIndex: 'ten',
                    key: 'ten',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            DSMauBangLuong: [],
            action: {
                isShowModalAdd: false,
                isShowModalEdit: false,
                isShowTableCot: false,
            },
        }
    },
    created() {
        this.loadMauBangLuong()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onCreate() {
            this.action.isShowModalAdd = true
        },
        loadMauBangLuong() {
            ajaxCALL(
                '/work/PA_MauBangLuong_Select',
                {},
                (res) => {
                    this.DSMauBangLuong = res.data
                },
                (err) => {},
            )
        },
        onAddFinish() {
            this.loadMauBangLuong()
        },
        openDinhNghiaCot(record) {
            window.open('/pa-mau-bang-luong-cong-thuc?id=' + record.MauBangLuong_Id, '_blank')
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xoá mẫu ' + `${record.TenMauBangLuong}`,
                onOk: () => {
                    ajaxCALL(
                        '/work/PA_MauBangLuong_Delete',
                        {
                            MauBangLuong_Id: record.MauBangLuong_Id,
                        },
                        (res) => {
                            this.loadMauBangLuong()
                            this.$message.success('Xoá mẫu bảng lương thành công!')
                        },
                        (err) => {},
                    )
                },
            })
        },
        onEdit(record) {
            this.action.isShowModalEdit = true
            this.recordItem = JSON.parse(JSON.stringify(record))
        },
    },
}
</script>
