<template>
    <div>
        <a-card title="Ca mẫu" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onSave"><uc-icon name="plus" />Thêm ca mẫu</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="1100">
            <a-table :columns="columns" :data-source="DSCaMau" :pagination="false" size="small" :scroll="{ y: 'calc(100vh - 105px)' }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'TenCa'">
                        <b>{{ record.TenCa }}</b
                        ><br />
                        <span class="text-primary">{{ record.MaCaMau }}</span>
                    </template>
                    <template v-else-if="column.key === 'ThoiGian'">
                        <span>{{ record.GioBatDau }} → {{ record.GioKetThuc }}</span>
                    </template>

                    <template v-else-if="column.key === 'LichLamViec'">
                        <a @click="onAddLichLamViec(record)">
                            <uc-icon name="calendar-outline" class="text-warning" />
                        </a>
                    </template>
                    <template v-else-if="column.key === 'NhomCaMau'">
                        <span v-if="record.Is_CaQuaDem" class="fw-bold">{{ record.TenNhomCaMau }}</span>
                        <span v-else>{{ record.TenNhomCaMau }}</span>
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
            <uc-modal-add-ca-mau v-if="formAction.isShowModalAdd" v-model:isOpen="formAction.isShowModalAdd" :dsnhomcamau="DSNhomCaMau" :dsloaica="DSLoaiCa" @onFinish="loadCaMau()" :DSVaiTro="DSVaiTro" :DSVanPhong="DSVanPhong" />
            <uc-modal-edit-ca-mau v-if="formAction.isShowModalEdit" v-model:isOpen="formAction.isShowModalEdit" :record="RecordItem" :dsnhomcamau="DSNhomCaMau" :dsloaica="DSLoaiCa" @onFinish="loadCaMau()" :DSVaiTro="DSVaiTro" :DSVanPhong="DSVanPhong" />
            <uc-modal-lich-lam-viec-ca-mau v-if="formAction.isShowModalLichLamViec" v-model:isOpen="formAction.isShowModalLichLamViec" :record="RecordItem" @onFinish="loadCaMau()" />
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
                    title: 'Ca mẫu',
                    dataIndex: 'TenCa',
                    key: 'TenCa',
                },
                {
                    title: 'Vào ca → Ra ca',
                    dataIndex: 'GioBatDau',
                    key: 'ThoiGian',
                },
                {
                    title: 'Công chuẩn',
                    dataIndex: 'SoCongChuan',
                    align: 'center',
                },
                {
                    title: 'Nhóm ca mẫu',
                    dataIndex: 'TenNhomCaMau',
                    key: 'NhomCaMau',
                },
                {
                    title: 'Loại ca',
                    dataIndex: 'TenLoaiCa',
                },
                {
                    title: 'Vai trò',
                    dataIndex: 'TenVaiTro',
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
            RecordItem: {},
            DSCaMau: [],
            DSLoaiCa: [],
            DSNhomCaMau: [],
            DSVaiTro: [],
            DSVanPhong: [],
        }
    },
    created() {
        this.loadCaMau()
        this.loadLoaiCa()
        this.loadNhomCaMau()
        this.loadVaiTro()
        this.loadVanPhong()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.formAction.isShowModalEdit = true
            this.RecordItem = Object.assign(
                {},
                {
                    ...record,
                    GioBatDau: dayjs(record.GioBatDau, 'HH:mm'),
                    GioKetThuc: dayjs(record.GioKetThuc, 'HH:mm'),
                    BatDauCa_Som_Phut: record.BatDauCa_Som_Phut,
                    BatDauCa_Tre_Phut: record.BatDauCa_Tre_Phut, 
                    KetThucCa_Som_Phut: record.KetThucCa_Som_Phut, 
                    KetThucCa_Tre_Phut: record.KetThucCa_Tre_Phut, 
                },
            )
        },
        onSave() {
            this.formAction.isShowModalAdd = true
        },
        onDelete(record) {
            Confirm.delete({
                content: `Bạn có chắc chắn muốn xóa ${record.TenCa}?`,
                onOk: () => {
                    ajaxCALL(
                        '/work/CA_CaMau_Delete',
                        {
                            CaMau_Id: record.CaMau_Id,
                        },
                        (res) => {
                            this.loadCaMau()
                            this.$message.success('Xoá ca mẫu thành công!')
                        },
                    )
                },
            })
        },
        loadCaMau() {
            ajaxCALL('/work/CA_CaMau_Select', {}, (res) => {
                this.DSCaMau = res.data
            })
        },
        loadLoaiCa() {
            ajaxCALL('/work/CA_LoaiCa_Select', {}, (res) => {
                this.DSLoaiCa = res.data
            })
        },
        loadNhomCaMau() {
            ajaxCALL('/work/CA_NhomCaMau_Select', {}, (res) => {
                this.DSNhomCaMau = res.data
            })
        },
        onFinish() {
            this.loadCaMau()
        },
        async onAddLichLamViec(record) {
            const res = await caMauService.CaMau_MauBangCong_Select({
                CaMau_Id: record.CaMau_Id,
            })
            if (res) {
                this.RecordItem = record
                this.RecordItem.MauBangCong_Id_List = res.map((x) => x.MauBangCong_Id)
            }
            this.formAction.isShowModalLichLamViec = true
        },
        onAddFinish() {
            this.loadCaMau()
        },
        loadVaiTro() {
            ajaxCALL('/work/HR_VaiTro_Select', {}, (res) => {
                this.DSVaiTro = res.data
            })
        },
        loadVanPhong() {
            ajaxCALL('/work/HR_VanPhong_Select', {}, (res) => {
                this.DSVanPhong = res.data
            })
        },
    },
}
</script>
