<template>
    <div>
        <a-card title="Chính sách lương" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm chính sách
                        lương</a-button>
                </a-space>
            </template>
        </a-card>
        <a-table :columns="columns" :data-source="DSLuong" :pagination="false" size="small" :scroll="{ y: 865 }"
            style="height: calc(100vh - 53px)">
            <template slot="TenCa" slot-scope="text, record">
                <b>{{ record.TenCa }}</b><br />
                <span style="color: green">{{ record.MaCaMau }}</span>
            </template>
            <template slot="ThoiGian" slot-scope="text, record"> {{ record.GioBatDau }} → {{ record.GioKetThuc }}
            </template>
            <template slot="LichLamViec" slot-scope="text, record">
                <a>
                    <a-icon type="calendar" style="color: orange" />
                </a>
            </template>
            <template slot="TrangThai" slot-scope="text, record">
                <a-space size="small">
                    <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                </a-space>
            </template>
            <template slot="Action" slot-scope="text, record">
                <a-space>
                    <a @click="onEdit(record)"><a-icon type="form" :loading="loading" /></a>
                    <a-icon type="delete" @click="onDelete(record)" :style="{ color: 'red' }" />
                </a-space>
            </template>
        </a-table>
        <uc-modal-add-luong :action="action" @onfinish="onAddFinish" />
        <uc-modal-edit-luong :action="action" @onfinish="onEditFinish" :record="RecordItem" />
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
                    title: 'Tên chính sách',
                    dataIndex: 'TenChinhSach',
                    scopedSlots: { customRender: 'TenChinhSach' },
                },
                {
                    title: 'Mã',
                    dataIndex: 'MaChinhSach',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'TrangThai',
                    scopedSlots: { customRender: 'TrangThai' },
                    align: 'center',
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    scopedSlots: { customRender: 'Action' },
                    align: 'center',
                },
            ],
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
            },
            DSLuong: [],
            RecordItem: {},
        }
    },
    created() {
        this.loadChinhSachLuong()
    },
    mounted() { },
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.action.IsShowModalEdit = true
            this.RecordItem = Object.assign({}, record)
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        onDelete(record) {
            Confirm.delete({
                content: 'Bạn có chắc chắn muốn xóa?',
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_ChinhSach_Luong_Delete',
                        {
                            ChinhSach_Luong_Id: record.ChinhSach_Luong_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadChinhSachLuong()
                        },
                    )
                },
            })
        },
        loadChinhSachLuong() {
            ajaxCALL('/work/HR_ChinhSach_Luong_Select', {}, (res) => {
                this.DSLuong = res.data
            })
        },
        onAddFinish() {
            this.loadChinhSachLuong()
        },
        onEditFinish() {
            this.loadChinhSachLuong()
        },
    },
}
</script>
