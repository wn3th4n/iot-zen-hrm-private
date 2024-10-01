<template>
    <div>
        <a-card title="Vai trò" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onSave"><uc-icon name="plus" />Thêm vai trò</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :data-source="DSVaiTro" :columns="columns" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'MauVaiTro'">
                        <a-avatar size="large" :style="{ backgroundColor: record.MauVaiTro, verticalAlign: 'middle' }"> </a-avatar>
                    </template>
                    <template v-else-if="column.key === 'TenVaiTro'">
                        <b>{{ record.TenVaiTro }}</b
                        ><br />
                        <span class="text-primary">{{ record.MaVaiTro }}</span>
                    </template>
                    <template v-else-if="column.key === 'LichLamViec'">
                        <a @click="onAddLichLamViec(record)">
                            <uc-icon name="calendar-outline" class="text-warning" />
                        </a>
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
            <uc-modal-add-vai-tro v-if="formAction.isShowModalAdd" v-model:isOpen="formAction.isShowModalAdd" @onFinish="loadVaiTro()" />
            <uc-modal-edit-vai-tro v-if="formAction.isShowModalEdit" v-model:isOpen="formAction.isShowModalEdit" :record="recordItem" @onFinish="loadVaiTro()" />
            <uc-modal-lich-lam-viec-vai-tro v-if="formAction.isShowModalLichLamViec" v-model:isOpen="formAction.isShowModalLichLamViec" :record="recordItem" @onFinish="loadVaiTro()" />
        </uc-container>
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
                    title: 'Màu',
                    dataIndex: 'MauVaiTro',
                    key: 'MauVaiTro',
                    align: 'center',
                },
                {
                    title: 'Tên vai trò',
                    dataIndex: 'TenVaiTro',
                    key: 'TenVaiTro',
                },
                {
                    title: 'Lịch làm việc',
                    dataIndex: 'LichLamViec',
                    key: 'LichLamViec',
                    align: 'center',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            formAction: {
                isShowModalAdd: false,
                isShowModalEdit: false,
                isShowModalLichLamViec: false,
            },
            recordItem: {},
            DSVaiTro: [],
        }
    },
    created() {
        this.loadVaiTro()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.formAction.isShowModalEdit = true
            this.recordItem = Object.assign({}, record)
        },
        onSave() {
            this.formAction.isShowModalAdd = true
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xoá vai trò?',
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_VaiTro_Delete',
                        {
                            VaiTro_Id: record.VaiTro_Id,
                        },
                        (res) => {
                            this.loadVaiTro()
                            this.$message.success('Xoá vai trò thành công')
                        },
                    )
                },
            })
        },
        loadVaiTro() {
            ajaxCALL('/work/HR_VaiTro_Select', {}, (res) => {
                this.DSVaiTro = res.data
            })
        },
        onFinish() {
            this.loadVaiTro()
        },
        async onAddLichLamViec(record) {
            vaiTroService
                .VaiTro_MauBangCong_Select({
                    VaiTro_Id: record.VaiTro_Id,
                })
                .then((data) => {
                    this.recordItem = record
                    this.recordItem.MauBangCong_Id_List = data.length > 0 ? data.map((x) => x.MauBangCong_Id) : []
                })
                .finally(() => {
                    this.formAction.isShowModalLichLamViec = true
                })
        },
        onAddFinishLichLamViec(record) {
            this.loadVaiTro()
        },
    },
}
</script>
