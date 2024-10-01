<template>
    <div>
        <a-card title="Nhóm ca mẫu" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onSave"><uc-icon name="plus" />Thêm nhóm ca mẫu</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :data-source="DSNhomCaMau" :columns="columns" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'MaNhomCaMau'">
                        <b>{{ record.TenNhomCaMau }}</b>
                        <br />
                        <span class="text-primary">{{ record.MaNhomCaMau }}</span>
                    </template>
                    <template v-else-if="column.key === 'Is_TamKhoa'">
                        <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent><uc-icon name="dots-horizontal" /></a>
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
        <uc-modal-add-nhom-ca-mau v-model:isOpen="isShowModalAdd" @onFinish="loadNhomCaMau()" />
        <uc-modal-edit-nhom-ca-mau v-model:isOpen="isShowModalEdit" @onFinish="loadNhomCaMau()" :record="recordItem" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
            columns: [
                {
                    title: 'Nhóm ca mẫu',
                    dataIndex: 'MaNhomCaMau',
                    key: 'MaNhomCaMau',
                },
                {
                    title: 'Tạm khóa',
                    dataIndex: 'Is_TamKhoa',
                    key: 'Is_TamKhoa',
                    align: 'center',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            isShowModalAdd: false,
            isShowModalEdit: false,
            recordItem: {},
            DSNhomCaMau: [],
        }
    },
    mounted() {
        this.loadNhomCaMau()
    },
    computed: {},
    created() {},
    watch: {},
    methods: {
        onEdit(record) {
            this.isShowModalEdit = true
            record.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0
            this.recordItem = record
        },
        onSave() {
            this.isShowModalAdd = true
        },
        onDelete(record) {
            Confirm.delete({
                content: `Bạn có chắc muốn xóa nhóm ca mẫu ${record.TenNhomCaMau}?`,
                onOk: () => {
                    const $this = this
                    const params = { NhomCaMau_Id: record.NhomCaMau_Id }
                    const res = nhomCaMauService.NhomCaMau_Delete(params)
                    if (res) {
                        $this.loadNhomCaMau()
                        Vue.$toast.success('Xoá nhóm ca mẫu thành công', { position: 'top' })
                    }
                },
            })
        },
        async loadNhomCaMau() {
            const $this = this
            const res = await nhomCaMauService.NhomCaMau_Select()
            $this.DSNhomCaMau = res
        },
    },
}
</script>
