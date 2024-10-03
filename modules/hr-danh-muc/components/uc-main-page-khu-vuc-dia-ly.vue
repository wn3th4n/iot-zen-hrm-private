<template>
    <div>
        <a-card title="Khu vực địa lý" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm khu vực địa lý</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="700">
            <a-table :columns="columns" :data-source="DSKhuVucDiaLy" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'TenKhuVuc'">
                        <div class="d-flex flex-column">
                            <b>{{ record.TenKhuVucDiaLy }}</b>
                            <span class="text-primary">{{ record.MaKhuVucDiaLy }}</span>
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
                                    <a-menu-item @click="onEdit(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                    <a-menu-item @click="onDelete(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </template>
            </a-table>
        </uc-container>

        <uc-modal-add-khu-vuc-dia-ly v-model:isOpen="action.IsShowModalAdd" @onFinish="onAddFininsh" />
        <uc-modal-edit-khu-vuc-dia-ly v-model:isOpen="action.IsShowModalEdit" @onFinish="onEditFinish" :record="recordItem" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
            },
            DSKhuVucDiaLy: [],
            columns: [
                {
                    title: 'Tên khu vực địa lý',
                    dataIndex: 'TenKhuVucDiaLy',
                    key: 'TenKhuVuc',
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
            recordItem: {},
        }
    },
    created() {
        this.loadKhuVucDiaLy()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.action.IsShowModalEdit = true
            this.recordItem = Object.assign({}, record)
            this.recordItem.Is_TamKhoa = this.recordItem.Is_TamKhoa ? 1 : 0
            console.log(' this.recordItem', this.recordItem)
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        async loadKhuVucDiaLy() {
            const res = await khuVucDiaLyService.KhuVucDiaLy_Select()
            this.DSKhuVucDiaLy = res
        },
        onDelete(record) {
            Confirm.delete({
                content: `Xác nhận xóa khu vực địa lý ${record.TenKhuVucDiaLy}?`,
                onOk: async () => {
                    let params = {
                        KhuVucDiaLy_Id: record.KhuVucDiaLy_Id,
                    }
                    const res = await khuVucDiaLyService.KhuVucDiaLy_Delete(params)
                    if (res) {
                        this.loadKhuVucDiaLy()
                        this.$message.success('Xóa thành công!')
                    }
                },
            })
        },
        onAddFininsh() {
            this.loadKhuVucDiaLy()
        },
        onEditFinish() {
            this.loadKhuVucDiaLy()
        },
    },
}
</script>
