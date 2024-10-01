<template>
    <div>
        <a-card title="Bảo hiểm" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="redirectBaoHiem()"><uc-icon name="launch" />Xem tất cả nhân sự tham gia</a-button>
                    <a-button type="primary" @click="onAdd"><uc-icon name="plus" />Thêm chính sách bảo hiểm</a-button>
                </a-space>
            </template>
        </a-card>
        <a-row class="p-2">
            <a-col v-for="item in DSBaoHiem" class="p-1" :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 6 }">
                <a-card class="card-nghi-phep">
                    <template #title>
                        <div class="d-flex flex-column">
                            <span>{{ item.TenChinhSach }}</span>
                            <small class="text-primary fw-normal">
                                {{ item.MaChinhSach }}
                                <uc-icon v-if="item.Is_TamKhoa" class="text-red" name="lock-outline" />
                            </small>
                        </div>
                    </template>
                    <template #extra>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link"><uc-icon name="dots-horizontal" /></a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onEdit(item)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                    <a-menu-item @click="onDelete(item)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                    <p>
                        <b>Mô tả</b> <br />
                        <span class="text-muted text-truncate-3">{{ item.MoTa }}</span>
                    </p>
                    <p>
                        <b>Dựa trên</b> <br />
                        <span class="text-muted" v-if="item.LoaiLuong === 1">Lương cơ bản</span>
                        <span class="text-muted" v-if="item.LoaiLuong === 2">Tổng lương</span>
                        <span class="text-muted" v-if="item.LoaiLuong === 3">Tùy chỉnh</span>
                    </p>
                    <p>
                        <b>Đóng góp</b> <br />
                        <span class="text-muted">{{ item.PhanTram_CongTy }}% - {{ item.PhanTram_NhanVien }}%</span>
                    </p>
                </a-card>
            </a-col>
        </a-row>
        <uc-modal-add-bao-hiem v-model:isOpen="action.IsShowModalAdd" @onFinish="loadBaoHiem()" />
        <uc-modal-edit-bao-hiem v-model:isOpen="action.IsShowModalEdit" @onFinish="loadBaoHiem()" :record="RecordItem" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            loading: false,
            DSBaoHiem: [],
            tabList: [
                {
                    key: 'ChinhSach',
                    tab: 'Chính sách',
                },
            ],
            tabListTitleKey: 'ChinhSach',
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
            },
            RecordItem: {},
        }
    },
    created() {
        this.loadBaoHiem()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.RecordItem = Object.assign({}, record)
            this.RecordItem.Is_TamKhoa = this.RecordItem.Is_TamKhoa ? 1 : 0
            this.action.IsShowModalEdit = true
        },
        onAdd() {
            this.action.IsShowModalAdd = true
        },
        onDelete(record) {
            Confirm.delete({
                content: `Bạn có chắc chắn muốn xóa ${record.TenChinhSach}?`,
                onOk: () => {
                    ajaxCALL(
                        '/work/HR_ChinhSach_BaoHiem_Delete',
                        {
                            ChinhSach_BaoHiem_Id: record.ChinhSach_BaoHiem_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công')
                            this.loadBaoHiem()
                        },
                    )
                },
            })
        },
        loadBaoHiem() {
            ajaxCALL('/work/HR_ChinhSach_BaoHiem_Select', {}, (res) => {
                this.DSBaoHiem = res.data
            })
        },
        onAddFinish() {
            this.loadBaoHiem()
        },
        onEditFinish() {
            this.loadBaoHiem()
        },

        redirectBaoHiem() {
            redirect('/hr-chinh-sach-bao-hiem')
        },
    },
}
</script>
