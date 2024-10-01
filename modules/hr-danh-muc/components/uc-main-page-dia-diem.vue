<template>
    <div>
        <a-card title="Địa điểm" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm địa điểm</a-button>
                </a-space>
            </template>
        </a-card>
        <a-table :columns="columns" :data-source="DSVanPhong" :pagination="false" size="small" :scroll="{ y: 'calc(100vh - 95px)' }" :loading='isLoading'>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'LichLamViec'">
                    <a @click="onAddLichLamViec(record)">
                        <uc-icon name="calendar-outline" class="text-warning" size="18" />
                    </a>
                </template>
                <template v-else-if="column.key === 'TenVanPhong'">
                    <div class="d-flex flex-column">
                        <b>{{ record.TenVanPhong }}</b>
                        <span class="text-primary">{{ record.MaVanPhong }}</span>
                    </div>
                </template>
                <template v-else-if="column.key === 'KhuVucChuyenMon'">
                        <span>  {{ record.TenKhuVucChuyenMon }}</span>
                </template>
                <template v-else-if="column.key === 'DiaChiIP'">
                    <a-button type="link" @click="onOpenIPAddress(record)"><uc-icon name="ip-outline" size="18" /></a-button>
                </template>
                <template v-else-if="column.key === 'Action'">
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link">
                            <uc-icon name="dots-horizontal" />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onOpenIPAddress(record)">
                                    <uc-icon class="text-success" name="ip-outline" />Thiết lập IP
                                </a-menu-item>
                                <a-menu-item @click="onAddLichLamViec(record)">
                                    <uc-icon class="text-warning" name="calendar-outline" />Thiết lập Lịch làm việc
                                </a-menu-item>
                                <a-menu-item @click="onEdit(record)">
                                    <uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
                                </a-menu-item>
                                <a-menu-item @click="onDelete(record)">
                                    <uc-icon class="text-red" name="delete-outline" />Xoá
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </template>
        </a-table>
        <uc-modal-add-dia-diem v-model:isOpen="action.IsShowModalAdd" @onFinish="onAddFininsh" :dskhuvucchuyenmon="DSKhuVucChuyenMon" />
        <uc-modal-edit-dia-diem v-model:isOpen="action.IsShowModalEdit" @onFinish="onEditFininsh" :record="recordItem" :dskhuvucchuyenmon="DSKhuVucChuyenMon" />
        <uc-modal-lich-lam-viec-dia-diem v-model:isOpen="action.IsShowModalAddLichLamViec" :record="recordItem" @onFinish="onAddFinishLichLamViec" />
        <uc-modal-ip-address v-model:isOpen="action.IsShowModalIPAddress" :diadiemid="diaDiemId" :record="recordItem" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            isLoading: false,
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
                IsShowModalAddLichLamViec: false,
                IsShowModalIPAddress: false,
            },
            DSKhuVucChuyenMon: [],
            DSVanPhong: [],
            columns: [
                {
                    title: 'Tên địa điểm',
                    dataIndex: 'TenVanPhong',
                    key: 'TenVanPhong',
                },
                {
                    title: 'Địa chỉ',
                    dataIndex: 'DiaChi',
                },
                {
                    title: 'Điện thoại',
                    dataIndex: 'DienThoai',
                },
                {
                    title: 'Khu vực chuyên môn',
                    dataIndex: 'TenKhuVucChuyenMon',
                    key: 'KhuVucChuyenMon'
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            recordItem: {},
            diaDiemId: null,
        }
    },
    created() {
       
    },
    mounted() {
        this.loadVanPhong(), this.loadKVChuyenMon()
    },
    computed: {
        getTenKhuVucChuyenMon: function(param){
            return DSKhuVucChuyenMon.find(i => i.KhuVucChuyenMon_Id === param.KhuVucChuyenMon_Id).TenKhuVucChuyenMon
        }
    },
    watch: {},
    methods: {
        onEdit(record) {
            this.action.IsShowModalEdit = true
            this.recordItem = Object.assign({}, record)
            this.recordItem.Is_TruSoChinh = this.recordItem.Is_TruSoChinh ? 1 : 0
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        loadVanPhong() {
            ajaxCALL('/work/HR_VanPhong_Select', {}, (res) => {
                this.DSVanPhong = res.data
            })
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Xác nhận xóa văn phòng?',
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_VanPhong_Delete',
                        {
                            VanPhong_Id: record.VanPhong_Id,
                        },
                        (res) => {
                            this.loadVanPhong()
                            this.$message.success('Xóa văn phòng thành công!')
                        },
                    )
                },
            })
        },
        onAddFininsh() {
            this.loadVanPhong()
        },
        onEditFininsh() {
            this.loadVanPhong()
        },
        onAddLichLamViec(record) {
            ajaxCALL(
                '/work/HR_VanPhong_MauBangCong_Select',
                {
                    VanPhong_Id: record.VanPhong_Id,
                },
                (res) => {
                    this.recordItem = Object.assign({}, record)
                    this.recordItem.MauBangCong_Id_List = res.data.length > 0 ? res.data.map((x) => x.MauBangCong_Id) : []
                    this.action.IsShowModalAddLichLamViec = true
                },
            )
        },
        onAddFinishLichLamViec() {
            this.loadVanPhong()
        },
        loadKVChuyenMon() {
            ajaxCALL('/work/HR_KhuVucChuyenMon_Select', {}, (res) => {
                this.DSKhuVucChuyenMon = res.data;
            })
        },
        onOpenIPAddress(record) {
            this.action.IsShowModalIPAddress = true
            this.recordItem = Object.assign({}, record)
            this.diaDiemId = record.VanPhong_Id
        },
    },
}
</script>
