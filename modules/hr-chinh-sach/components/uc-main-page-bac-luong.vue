<template>
    <div>
        <a-card title="Bậc lương" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm chính sách bậc lương</a-button>
                </a-space>
            </template>
        </a-card>

        <uc-container :width="600">
            <a-table :columns="columns" :data-source="DSBacLuong" size="small" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'TenBacLuong'">
                        <b>{{ record.TenBacLuong }}</b>
                    </template>
                    <template v-if="column.key === 'GiaTri'">
                        <p class="text-primary text-end mb-0">{{ record.GiaTri.toLocaleString('en-US') }}</p>
                    </template>
                    <template v-else-if="column.key === 'Is_TamKhoa'">
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
            <uc-modal-add-bac-luong v-model:isOpen="action.IsShowModalAdd" @onFinish="loadBacLuong()" />
            <uc-modal-edit-bac-luong v-model:isOpen="action.IsShowModalEdit" @onFinish="loadBacLuong()" :record="RecordItem" />
        </uc-container>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
            DSBacLuong: [],
            columns: [
                {
                    title: 'Tên bậc lương',
                    dataIndex: 'TenBacLuong',
                    key: 'TenBacLuong',
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'GiaTri',
                    key: 'GiaTri',
                },
                {
                    title: 'Tạm khóa',
                    dataIndex: 'Is_TamKhoa',
                    key: 'Is_TamKhoa',
                    align: 'center',
                    width: '150px',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
            },
            RecordItem: {},
        }
    },
    created() {
        this.loadBacLuong()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.RecordItem = Object.assign({}, record)
            this.RecordItem.Is_TamKhoa = this.RecordItem.Is_TamKhoa ? 1 : 0
            this.action.IsShowModalEdit = true
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Bạn có chắc chắn muốn xóa?',
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_BacLuong_Delete',
                        {
                            BacLuong_Id: record.BacLuong_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadBacLuong()
                        },
                    )
                },
            })
        },
        loadBacLuong() {
            ajaxCALL('/work/HR_BacLuong_Select', {}, (res) => {
                this.DSBacLuong = res.data
            })
        },
        onAddFinish() {
            this.loadBacLuong()
        },
        onEditFinish() {
            this.loadBacLuong()
        },
    },
}
</script>
