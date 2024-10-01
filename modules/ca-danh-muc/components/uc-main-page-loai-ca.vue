<template>
    <div>
        <a-card title="Loại ca" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onSave"><uc-icon name="plus" />Thêm loại ca</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="600">
            <a-table :data-source="DSLoaiCa" :columns="columns" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'MauLoaiCa'">
                        <a-avatar size="large" :style="{ backgroundColor: record.MauLoaiCa, verticalAlign: 'middle' }"> </a-avatar>
                    </template>
                    <template v-else-if="column.key === 'TenLoaiCa'">
                        <b>{{ record.TenLoaiCa }}</b
                        ><br />
                        <span class="text-primary">{{ record.MaLoaiCa }}</span>
                    </template>
                    <template v-else-if="column.key === 'LichLamViec'">
                        <a @click="onAddLichLamViec(record)">
                            <uc-icon name="calendar-outline" class="text-warning" />
                        </a>
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link"> <uc-icon name="dots-horizontal" /> </a>
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
            <uc-modal-add-loai-ca v-if="formAction.isShowModalAdd" v-model:isOpen="formAction.isShowModalAdd" @onFinish="loadLoaiCa()" />
            <uc-modal-edit-loai-ca v-if="formAction.isShowModalEdit" v-model:isOpen="formAction.isShowModalEdit" :record="recordItem" @onFinish="loadLoaiCa()" />
            <uc-modal-lich-lam-viec-loai-ca v-if="formAction.isShowModalLichLamViec" v-model:isOpen="formAction.isShowModalLichLamViec" :record="recordItem" @onFinish="loadLoaiCa()" />
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
                    dataIndex: 'MauLoaiCa',
                    key: 'MauLoaiCa',
                    align: 'center',
                },
                {
                    title: 'Tên loại ca',
                    dataIndex: 'TenLoaiCa',
                    key: 'TenLoaiCa',
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
            DSLoaiCa: [],
        }
    },
    created() {
        this.loadLoaiCa()
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
            const $this = this
            Confirm.delete({
                content: 'Xác nhận xoá loại ca?',
                onOk: () => {
                    ajaxCALL(
                        '/work/CA_LoaiCa_Delete',
                        {
                            LoaiCa_Id: record.LoaiCa_Id,
                        },
                        (res) => {
                            $this.loadLoaiCa()
                            $this.$message.success('Xoá loại ca thành công')
                        },
                    )
                },
            })
        },
        loadLoaiCa() {
            ajaxCALL('/work/CA_LoaiCa_Select', {}, (res) => {
                this.DSLoaiCa = res.data
            })
        },
        onFinish() {
            this.loadLoaiCa()
        },
        async onAddLichLamViec(record) {
            loaiCaService
                .LoaiCa_MauBangCong_Select({
                    LoaiCa_Id: record.LoaiCa_Id,
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
            this.loadLoaiCa()
        },
    },
}
</script>
