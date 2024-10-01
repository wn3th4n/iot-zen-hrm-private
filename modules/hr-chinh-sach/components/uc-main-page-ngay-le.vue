<template>
    <div>
        <a-card title="Ngày lễ" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm ngày lễ</a-button>
                </a-space>
            </template>
        </a-card>
        <a-tabs v-model:activeKey="activeTabYearKey">
            <a-tab-pane v-for="item in DSTabNam" :tab="item.Nam" :key="item.Nam">
                <a-table :columns="columns" :data-source="DSNgayLe.filter((i) => i.Nam === item.Nam)" size="small" :pagination="false">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'MauNgayLe'">
                            <a-avatar size="large" :style="{ backgroundColor: record.MauLoaiCa, verticalAlign: 'middle' }"> </a-avatar>
                        </template>
                        <template v-else-if="column.key === 'MauNgayLe'">
                            <a-avatar size="large" :style="{ backgroundColor: record.MauLoaiCa, verticalAlign: 'middle' }"> </a-avatar>
                        </template>
                        <template v-else-if="column.key === 'Is_TamKhoa'">
                            <a-space size="small">
                                <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                            </a-space>
                        </template>
                        <template v-else-if="column.key === 'Is_TinhLuong'">
                            <a-space size="small">
                                <uc-icon v-if="record.Is_TinhLuong === true" name="check" class="text-success" />
                            </a-space>
                        </template>
                        <template v-else-if="column.key === 'NgayLe'">
                            <div class="d-flex flex-column">
                                <b>{{ record.TenNgayLe }}</b>
                                <span class="text-primary">{{ record.MaNgayLe }}</span>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'ThoiGian'">
                            <div class="d-flex flex-column">
                                <span>{{ record.ThoiGianNghi_Tu }} → {{ record.ThoiGianNghi_Den }}</span>
                            </div>
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
            </a-tab-pane>
        </a-tabs>
        <uc-modal-add-ngay-le v-model:isOpen="action.IsShowModalAdd" @onFinish="loadNgayLe()" />
        <uc-modal-edit-ngay-le v-model:isOpen="action.IsShowModalEdit" @onFinish="loadNgayLe()" :record="RecordItem" />
        <uc-modal-lich-lam-viec-ngay-le v-model:isOpen="action.IsShowModalAddLichLamViec" :record="RecordItem" @onFinish="loadNgayLe()" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            activeTabYearKey: dayjs().year(),
            loading: false,
            DSNgayLe: [],
            columns: [
                {
                    title: 'Màu',
                    dataIndex: 'MauNgayLe',
                    key: 'MauNgayLe',
                    width: '100px',
                    align: 'center',
                },
                {
                    title: 'Ngày lễ',
                    dataIndex: 'NgayLe',
                    key: 'NgayLe',
                },
                {
                    title: 'Thời gian nghỉ',
                    dataIndex: 'ThoiGian',
                    key: 'ThoiGian',
                },
                {
                    title: 'Năm',
                    dataIndex: 'Nam',
                    key: 'Nam',
                    align: 'center',
                },
                {
                    title: 'Tính lương',
                    dataIndex: 'Is_TinhLuong',
                    key: 'Is_TinhLuong',
                    align: 'center',
                    width: '150px',
                },
                {
                    title: 'Tạm khóa',
                    dataIndex: 'Is_TamKhoa',
                    key: 'Is_TamKhoa',
                    align: 'center',
                    width: '150px',
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
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
                IsShowModalAddLichLamViec: false,
            },
            RecordItem: {},
            DSTabNam: [
                {
                    key: 1,
                    Nam: 2025,
                },
                {
                    key: 2,
                    Nam: 2024,
                },
                {
                    key: 3,
                    Nam: 2023,
                },
                {
                    key: 4,
                    Nam: 2022,
                },
            ],
        }
    },
    created() {
        this.loadNgayLe()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.RecordItem = Object.assign({}, record)
            this.RecordItem.ThoiGianNghi_Tu = dayjs(this.RecordItem.ThoiGianNghi_Tu) //dayjs('2024-08-07').format('DD/MM/YYYY')
            this.RecordItem.ThoiGianNghi_Den = dayjs(this.RecordItem.ThoiGianNghi_Den) //dayjs('2024-08-07').format('DD/MM/YYYY')
            this.RecordItem.Is_TamKhoa = this.RecordItem.Is_TamKhoa ? 1 : 0
            this.RecordItem.Is_TinhLuong = this.RecordItem.Is_TinhLuong ? 1 : 0
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
                        '/work/HR_NgayLe_Delete',
                        {
                            NgayLe_Id: record.NgayLe_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadNgayLe()
                        },
                    )
                },
            })
        },
        loadNgayLe() {
            ajaxCALL('/work/HR_NgayLe_Select', {}, (res) => {
                this.DSNgayLe = res.data
            })
        },
        onAddFinish() {
            this.loadNgayLe()
        },
        onEditFinish() {
            this.loadNgayLe()
        },
        onAddLichLamViec(record) {
            ajaxCALL(
                '/work/HR_NgayLe_MauBangCong_Select',
                {
                    NgayLe_Id: record.NgayLe_Id,
                },
                (res) => {
                    this.RecordItem = Object.assign({}, record)
                    this.RecordItem.MauBangCong_Id_List = res.data.length > 0 ? res.data.map((x) => x.MauBangCong_Id) : []
                    this.action.IsShowModalAddLichLamViec = true
                },
            )
        },
        onAddFinishLichLamViec() {
            this.loadNgayLe()
        },
    },
}
</script>
