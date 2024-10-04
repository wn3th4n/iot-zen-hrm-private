<template>
    <div>
        <a-card title="Ca cần, ca đủ" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Khai báo ca cần, ca đủ</a-button>
                </a-space>
            </template>
        </a-card>
        <a-row>
            <a-col :span="5">
                <a-menu v-model:selectedKeys="MauBangCongId" class="scrollbar-thin" mode="vertical" style="max-height: calc(100vh - 58px); overflow: auto">
                    <a-menu-item v-for="item in DSMauBangCong" :key="item.MauBangCong_Id">
                        {{ item.TenMauBangCong }}
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="19">
                <a-table :columns="Columns" :data-source="DSCaMacDinh" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'stt'">
                            <span>{{ DSCaMacDinh.indexOf(record) + 1 }}</span>
                        </template>
                        <template v-else-if="column.key === 'TenNhomCaMau'">
                            <div class="d-flex flex-column">
                                <b>{{ record.TenNhomCaMau }}</b>
                                <span class="text-primary">{{ record.MaNhomCaMau }}</span>
                            </div>
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
            </a-col>
        </a-row>
        <uc-modal-add-ca-mac-dinh v-if="action.IsShowModalAdd" v-model:isOpen="action.IsShowModalAdd" @onFinish="loadCaMacDinh()" :maubangcongid="MauBangCongId" :dsnhomcamau="DSNhomCaMau" :dsvitri="DSViTri" />
        <uc-modal-edit-ca-mac-dinh v-if="action.IsShowModalEdit" v-model:isOpen="action.IsShowModalEdit" @onFinish="loadCaMacDinh()" :dsnhomcamau="DSNhomCaMau" :dsvitri="DSViTri" :maubangcongid="MauBangCongId" :record="recordItem" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            DSMauBangCong: [],
            DSLoaiViTri: [],
            LoaiViTriId: null,
            recordItem: {},
            Columns: [
                {
                    title: 'STT',
                    dataIndex: 'stt',
                    key: 'stt',
                    align: 'center',
                },
                {
                    title: 'Nhóm ca mẫu',
                    dataIndex: 'TenNhomCaMau',
                    key: 'TenNhomCaMau',
                },
                {
                    title: 'Vị trí',
                    dataIndex: 'TenViTri',
                },
                {
                    title: 'Số người',
                    dataIndex: 'SoNguoi',
                    align: 'center',
                },
                {
                    title: 'Mô tả',
                    dataIndex: 'MoTa',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            DSCaMacDinh: [],
            MauBangCongId: [1],
            DSNhomCaMau: [],
            DSViTri: [],
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
            },
            VanPhong_Id: null,
            mode: 'top',
        }
    },
    created() {
        this.loadMauBangCong()
        this.loadNhomCaMau()
        this.loadCaMacDinh()
        this.loadViTri()
    },
    mounted() {},
    computed: {},
    watch: {
        MauBangCongId: function (val) {
            if (val) {
                this.loadCaMacDinh()
            }
        },
    },
    methods: {
        loadCaMacDinh() {
            ajaxCALL(
                '/work/CA_CaMacDinh_Select_By_MauBangCong_Id',
                {
                    MauBangCong_Id: this.MauBangCongId[0],
                },
                (res) => {
                    this.DSCaMacDinh = res.data
                },
                (err) => {},
            )
        },
        loadViTri() {
            ajaxCALL(
                '/work/HR_ViTri_Select',
                {},
                (res) => {
                    this.DSViTri = res.data
                },
                (err) => {},
            )
        },
        loadNhomCaMau() {
            ajaxCALL(
                '/work/CA_NhomCaMau_Select',
                {},
                (res) => {
                    this.DSNhomCaMau = res.data
                },
                (err) => {},
            )
        },
        loadMauBangCong() {
            ajaxCALL(
                '/work/CA_MauBangCong_Select',
                {},
                (res) => {
                    this.DSMauBangCong = res.data
                },
                (err) => {},
            )
        },
        onEdit(record) {
            this.recordItem = Object.assign({}, record)
            this.action.IsShowModalEdit = true
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xóa ca dự báo?',
                onOk: () => {
                    ajaxCALL(
                        '/work/CA_CaMacDinh_Delete',
                        {
                            CaMacDinh_Id: record.CaMacDinh_Id,
                        },
                        (res) => {
                            this.loadCaMacDinh()
                            this.$message.success('Xoá ca dự báo thành công!')
                        },
                        (err) => {},
                    )
                },
            })
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        onAddFinish() {
            this.loadCaMacDinh()
        },
        onEditFinish() {
            this.loadCaMacDinh()
        },
    },
}
</script>
