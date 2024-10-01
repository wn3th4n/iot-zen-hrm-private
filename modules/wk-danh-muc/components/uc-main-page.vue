<template>
    <uc-layout>
        <a-card title="Nhóm công việc" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary"><uc-icon name="plus" />Thêm nhóm công việc</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="900">
            <a-table :columns="columns" :data-source="dataTable" :pagination="false" size="small"> </a-table>
        </uc-container>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            columns: [
                { title: 'Mã nhóm', dataIndex: 'MaNhomCongViec', width: 150 },
                { title: 'Tên nhóm', dataIndex: 'TenNhomCongViec', width: 400 },
                { title: 'Mô tả', dataIndex: 'MoTa' },
                { title: '', dataIndex: 'action', width: 60, align: 'center', scopedSlots: { customRender: 'action' } },
            ],
            dataTable: [
                {
                    NhomCongViec_Id: 1,
                    TenNhomCongViec: 'Chấm công',
                    MaNhomCongViec: `CCONG`,
                    MoTa: `Chấm công`,
                },
                {
                    NhomCongViec_Id: 2,
                    TenNhomCongViec: 'Mở/ Tắt thiết bị điện tử',
                    MaNhomCongViec: `MTTBDT`,
                    MoTa: `Nhân viên sử dụng thiết bị điện tử`,
                },
                {
                    NhomCongViec_Id: 3,
                    TenNhomCongViec: 'Nhóm pha chế phụ 1',
                    MaNhomCongViec: `PC_PHU_1`,
                    MoTa: `Danh cho nhân viên pha chế phụ 1`,
                },
                {
                    NhomCongViec_Id: 4,
                    TenNhomCongViec: 'Sắp xếp',
                    MaNhomCongViec: `SXEP`,
                    MoTa: `Nhân viên thu ngân sắp xếp công cụ`,
                },
                {
                    NhomCongViec_Id: 5,
                    TenNhomCongViec: 'Bàn giao',
                    MaNhomCongViec: `BGIAO`,
                    MoTa: `Nhân viên bàn giao ca`,
                },
            ],
        }
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {},
}
</script>