<template>
    <uc-layout>
        <a-card title="Thiết lập lịch làm việc" class="card-title-page">
            <template #extra>
                <a-space>
                    <a-input placeholder="Tìm theo mã, tên lịch làm việc..." />
                    <a-button type="primary" @click="formAction.IsShowModalAdd = true"><uc-icon name="plus" />Thêm lịch làm việc</a-button>
                </a-space>
            </template>
        </a-card>
        <a-table :columns="columns" :data-source="DSMauBangCong" size="small" :pagination="false" :scroll="{ y: 'calc(100vh - 95px)' }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Index'">
                    {{ DSMauBangCong.indexOf(record) + 1 }}
                </template>
                <template v-else-if="column.key === 'TenMauBangCong'">
                    <div class="d-flex flex-column">
                        <b>{{ record.TenMauBangCong }}</b>
                        <span class="text-primary">{{ record.MaMauBangCong }}</span>
                    </div>
                </template>
                <template v-else-if="column.key === 'TenNguoiQuanLy'">
                    <span>{{ record.TenNguoiQuanLy }}</span>
                </template>
                <template v-else-if="column.key === 'TenNguoiPhanCa'">
                    <span>{{ record.TenNguoiPhanCa }}</span>
                </template>
                <template v-else-if="column.key === 'TenNguoiChotCong'">
                    <span>{{ record.TenNguoiChotCong }}</span>
                </template>
                <template v-else-if="column.key === 'Is_CoDinh'">
                    <span>{{ record.Is_CoDinh ? 'Cố định' : 'Theo giờ' }}</span>
                </template>
                <template v-else-if="column.key === 'Is_CheckInOut'">
                    <uc-icon v-if="record.Is_CheckInOut" name="check" class="text-success" />
                </template>
                <template v-else-if="column.key === 'Is_TamKhoa'" slot-scope="text, record">
                    <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                </template>
                <template v-else-if="column.key === 'Action'">
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link"> <uc-icon name="dots-horizontal" /> </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onOpenModalEdit(record)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                <a-menu-item @click="onOpenModalCongThuc(record)"> <uc-icon class="text-primary" name="table-cog" />Cấu hình cột </a-menu-item>
                                <a-menu-item @click="onOpenModalDelete(record)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </template>
        </a-table>
        <uc-modal-add v-model:isOpen="formAction.IsShowModalAdd" @onFinish="onAddFinish"></uc-modal-add>
        <uc-modal-edit v-model:isOpen="formAction.IsShowModalEdit" @onFinish="onAddFinish" :mauBangCong="mauBangCongItem"></uc-modal-edit>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            columns: [
                {
                    title: '#',
                    dataIndex: 'Index',
                    key: 'Index',
                    align: 'center',
                    width: '50px',
                },
                {
                    title: 'Tên Lịch làm việc',
                    dataIndex: 'TenMauBangCong',
                    key: 'TenMauBangCong',
                    width: '250px',
                },
                {
                    title: 'Tổng nhân viên',
                    dataIndex: 'TongNhanVien',
                    align: 'center',
                },
                {
                    title: 'Người quản lý',
                    dataIndex: 'TenNguoiQuanLy',
                    key: 'TenNguoiQuanLy',
                    width: '250px',
                },
                {
                    title: 'Người phân ca',
                    dataIndex: 'TenNguoiPhanCa',
                    key: 'TenNguoiPhanCa',
                    width: '250px',
                },
                {
                    title: 'Người chốt công',
                    dataIndex: 'TenNguoiChotCong',
                    key: 'TenNguoiChotCong',
                    width: '250px',
                },
                {
                    title: 'Loại lịch',
                    dataIndex: 'Is_CoDinh',
                    key: 'Is_CoDinh',
                    align: 'center',
                },
                {
                    title: 'Chấm công',
                    dataIndex: 'Is_CheckInOut',
                    key: 'Is_CheckInOut',
                    align: 'center',
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
            DSMauBangCong: [],
            formAction: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
                IsShowModalCongThuc: false,
            },
            mauBangCongItem: null,
        }
    },
    async mounted() {
        this.DSMauBangCong = await mauBangCongService.MauBangCong_Select()
    },
    computed: {},
    watch: {},
    methods: {
        async onAddFinish() {
            this.DSMauBangCong = await mauBangCongService.MauBangCong_Select()
        },
        async onOpenModalEdit(record) {
            const $this = this
            const cloneRecord = JSON.parse(JSON.stringify(record))
            mauBangCongService
                .MauBangCong_Select_By_Id({
                    MauBangCong_Id: cloneRecord.MauBangCong_Id,
                })
                .then(async (data) => {
                    if (data) {
                        caMauService
                            .CaMau_Select()
                            .then((DSCaMau) => {
                                cloneRecord.Is_CoDinh = cloneRecord.Is_CoDinh ? 1 : 0
                                cloneRecord.Is_CheckInOut = cloneRecord.Is_CheckInOut ? 1 : 0
                                cloneRecord.Is_TamKhoa = cloneRecord.Is_TamKhoa ? 1 : 0

                                for (var thu of ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']) {
                                    cloneRecord[`${thu}_C1_VaoCa`] = cloneRecord[`${thu}_C1_VaoCa`] ? dayjs(cloneRecord[`${thu}_C1_VaoCa`], 'HH:mm') : null
                                    cloneRecord[`${thu}_C1_RaCa`] = cloneRecord[`${thu}_C1_RaCa`] ? dayjs(cloneRecord[`${thu}_C1_RaCa`], 'HH:mm') : null

                                    cloneRecord[`${thu}_C2_VaoCa`] = cloneRecord[`${thu}_C2_VaoCa`] ? dayjs(cloneRecord[`${thu}_C2_VaoCa`], 'HH:mm') : null
                                    cloneRecord[`${thu}_C2_RaCa`] = cloneRecord[`${thu}_C2_RaCa`] ? dayjs(cloneRecord[`${thu}_C2_RaCa`], 'HH:mm') : null

                                    cloneRecord[`${thu}_C3_VaoCa`] = cloneRecord[`${thu}_C3_VaoCa`] ? dayjs(cloneRecord[`${thu}_C3_VaoCa`], 'HH:mm') : null
                                    cloneRecord[`${thu}_C3_RaCa`] = cloneRecord[`${thu}_C3_RaCa`] ? dayjs(cloneRecord[`${thu}_C3_RaCa`], 'HH:mm') : null

                                    cloneRecord[`${thu}_C1_CaMau_Id`] = cloneRecord[`${thu}_C1_CaMau_Id`] === 0 ? undefined : cloneRecord[`${thu}_C1_CaMau_Id`]
                                    cloneRecord[`${thu}_C2_CaMau_Id`] = cloneRecord[`${thu}_C2_CaMau_Id`] === 0 ? undefined : cloneRecord[`${thu}_C2_CaMau_Id`]
                                    cloneRecord[`${thu}_C3_CaMau_Id`] = cloneRecord[`${thu}_C3_CaMau_Id`] === 0 ? undefined : cloneRecord[`${thu}_C3_CaMau_Id`]

                                    const CaMauCa_1 = cloneRecord[`${thu}_C1_CaMau_Id`]
                                    const CaMauCa_2 = cloneRecord[`${thu}_C2_CaMau_Id`]
                                    const CaMauCa_3 = cloneRecord[`${thu}_C3_CaMau_Id`]

                                    const caMau1Exist = DSCaMau.find((x) => x.CaMau_Id === CaMauCa_1)
                                    const caMau2Exist = DSCaMau.find((x) => x.CaMau_Id === CaMauCa_2)
                                    const caMau3Exist = DSCaMau.find((x) => x.CaMau_Id === CaMauCa_2)

                                    if (caMau1Exist) {
                                        cloneRecord[`${thu}_C1_MaCaMau`] = caMau1Exist.MaCaMau
                                    }
                                    if (caMau2Exist) {
                                        cloneRecord[`${thu}_C2_MaCaMau`] = caMau2Exist.MaCaMau
                                    }
                                    if (caMau3Exist) {
                                        cloneRecord[`${thu}_C3_MaCaMau`] = caMau3Exist.MaCaMau
                                    }
                                }
                                $this.mauBangCongItem = cloneRecord
                            })
                            .finally(() => ($this.formAction.IsShowModalEdit = true))
                    }
                })
        },
        onOpenModalCongThuc(record) {
            window.open('/ca-lich-lam-viec-cong-thuc?id=' + record.MauBangCong_Id, '_blank')
        },
        onOpenModalDelete(record) {
            const $this = this
            Confirm.delete({
                content: `Xác nhận xóa lịch làm việc ${record.TenMauBangCong}`,
                onOk() {
                    mauBangCongService
                        .MauBangCong_Delete({
                            MauBangCong_Id: record.MauBangCong_Id,
                        })
                        .then(async (isDelete) => {
                            if (isDelete) {
                                $this.$message.success('Xóa lịch làm việc thành công')
                                $this.DSMauBangCong = await mauBangCongService.MauBangCong_Select()
                            }
                        })
                },
            })
        },
    },
}
</script>
