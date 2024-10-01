<template>
    <div>
        <a-card title="Nghỉ phép" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="onRedirectNghiPhep">
                        <uc-icon name="launch" />Xem tất cả nhân sự tham gia
                    </a-button>
                    <a-button type="primary" @click="onAdd">
                        <uc-icon name="plus" />Thêm chính sách nghỉ phép
                    </a-button>
                </a-space>
            </template>
        </a-card>
        <a-tabs>
            <a-tab-pane key="1" tab="Chính sách">
                <a-row class="p-2">
                    <a-col v-for="item in data" class="p-1" :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }"
                        :lg="{ span: 12 }" :xl="{ span: 6 }">
                        <a-card>
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
                                    <a class="ant-dropdown-link">
                                        <uc-icon name="dots-horizontal" />
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item @click="onEdit(item)">
                                                <uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
                                            </a-menu-item>
                                            <a-menu-item @click="onDelete(item)">
                                                <uc-icon class="text-red" name="delete-outline" />Xoá
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                            <p>
                                <b>Mô tả</b> <br />
                                <span class="text-muted">{{ item.MoTa }}</span>
                            </p>
                            <p>
                                <b>Loại chính sách</b> <br />
                                <span class="text-muted">{{ item.LoaiChinhSach === 1 ? `Số ngày phép cố định hằng năm` :
                                    `Tăng hàng tháng` }}</span>
                            </p>
                            <p>
                                <b>Loại nghỉ phép</b> <br />
                                <span class="text-muted">{{ item.TenLoaiNghiPhep }}</span>
                            </p>
                        </a-card>
                    </a-col>
                </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Loại phép">
                <a-row class="p-2">
                    <a-col v-for="item in DSLoaiNghiPhep" class="p-1" :xs="{ span: 24 }" :sm="{ span: 24 }"
                        :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 6 }">
                        <a-card>
                            <template #title>
                                <div class="d-flex flex-column">
                                    <span>{{ item.TenLoaiNghiPhep }}</span>
                                    <small class="text-primary fw-normal">
                                        {{ item.MaLoaiNghiPhep }}
                                        <uc-icon v-if="item.Is_TamKhoa" class="text-red" name="lock-outline" />
                                    </small>
                                </div>
                            </template>
                            <template #extra>
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link">
                                        <uc-icon name="dots-horizontal" />
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item @click="onEditLoaiPhep(item)">
                                                <uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </template>
                            <p>
                                <b>Mô tả</b> <br />
                                <span class="text-muted">{{ item.MoTa }}</span>
                            </p>
                            <p>
                                <b>Có tính lương</b> <br />
                                <span class="text-muted">{{ item.Is_CoLuong ? 'Có' : 'Không' }}</span>
                            </p>
                            <p>
                                <b>Tham gia vào chính sách nghỉ bù</b> <br />
                                <span class="text-muted">{{ item.Is_NghiBu ? 'Có' : 'Không' }}</span>
                            </p>
                        </a-card>
                    </a-col>
                </a-row>
            </a-tab-pane>
        </a-tabs>
        <uc-modal-add-nghi-phep v-model:isOpen="action.IsShowModalAdd" @onFinish="loadNghiPhep()"
            :dsloainghiphep="DSLoaiNghiPhep" />
        <uc-modal-edit-nghi-phep v-model:isOpen="action.IsShowModalEdit" @onFinish="loadNghiPhep()" :record="RecordItem"
            :dsloainghiphep="DSLoaiNghiPhep" />
        <uc-modal-edit-loai-nghi-phep v-model:isOpen="action.IsShowModalEditLoaiNghiPhep" @onFinish="loadLoaiNghiPhep()"
            :record="RecordItemLoaiNghiPhep" />
    </div>
</template>

<script>
    export default {
    props: [],
    data() {
        return {
            loading: false,
            tabList: [
                {
                    key: 'ChinhSach',
                    tab: 'Chính sách',
                },
                {
                    key: 'NghiBu',
                    tab: 'Nghỉ bù',
                },
            ],
            tabListTitleKey: 'ChinhSach',
            action: {
                IsShowModalAdd: false,
                IsShowModalEdit: false,
                IsShowModalEditLoaiNghiPhep: false,
            },
            data: [],
            DSLoaiNghiPhep: [],
            RecordItem: {},
            RecordItemLoaiNghiPhep: {},
        }
    },
    created() {
        this.loadNghiPhep()
        this.loadLoaiNghiPhep()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onRedirectNghiPhep() {
            redirect('hr-chinh-sach-nhan-vien-nghi-phep')
        },
        onEdit(record) {
            record.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0
            this.RecordItem = Object.assign({}, record)
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
                        '/work/HR_ChinhSach_NghiPhep_Delete',
                        {
                            ChinhSach_NghiPhep_Id: record.ChinhSach_NghiPhep_Id,
                        },
                        (res) => {
                            this.$message.success('Xóa thành công!')
                            this.loadNghiPhep()
                        },
                    )
                },
            })
        },
        onTabChange(key, type) {
            this[type] = key
        },
        loadNghiPhep() {
            ajaxCALL('/work/HR_ChinhSach_NghiPhep_Select', {}, (res) => {
                this.data = res.data
            })
        },
        loadLoaiNghiPhep() {
            ajaxCALL('/work/HR_LoaiNghiPhep_Select', {}, (res) => {
                this.DSLoaiNghiPhep = res.data
            })
        },
        onEditLoaiPhep(record) {
            this.action.IsShowModalEditLoaiNghiPhep = true
            record.Is_TamKhoa = record.Is_TamKhoa ? 1 : 0
            this.RecordItemLoaiNghiPhep = Object.assign({}, record)
        },
        onFinishEditLoaiNghiPhep() {
            this.loadLoaiNghiPhep()
        },
    },
}
</script>

<style scoped>
    .card-container>.ant-tabs-card>.ant-tabs-content>.ant-tabs-tabpane {
        padding: 16px;
    }
</style>