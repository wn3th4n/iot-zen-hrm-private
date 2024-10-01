<template>
    <div>
        <a-card title="Bậc thưởng" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm chính sách bậc thưởng</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :columns="columns" :data-source="DSBacThuong" size="small" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'TenBacThuong'">
                        <b>{{ record.TenBacThuong }}</b>
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
            <uc-modal-add-bac-thuong v-model:isOpen="action.IsShowModalAdd" @onFinish="loadBacThuong()" />
            <uc-modal-edit-bac-thuong v-model:isOpen="action.IsShowModalEdit" @onFinish="loadBacThuong()" :record="RecordItem" />
        </uc-container>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
            DSBacThuong: [],
            columns: [
                {
                    title: 'Tên bậc thưởng',
                    dataIndex: 'TenBacThuong',
                    key: 'TenBacThuong',
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
        this.loadBacThuong()
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
                        '/work/HR_BacThuong_Delete',
                        {
                            BacThuong_Id: record.BacThuong_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadBacThuong()
                        },
                    )
                },
            })
        },
        loadBacThuong() {
            ajaxCALL('/work/HR_BacThuong_Select', {}, (res) => {
                this.DSBacThuong = res.data
            })
        },
        onAddFinish() {
            this.loadBacThuong()
        },
        onEditFinish() {
            this.loadBacThuong()
        },
    },
}
</script>
