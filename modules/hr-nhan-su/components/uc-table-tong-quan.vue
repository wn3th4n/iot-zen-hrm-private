<template>
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="isLoadingDSNhanVien" @change="handleTableChange" v-bind="$attrs" size="small" :scroll="{ x: 'fit-content', y: 'calc(100vh - 184px)' }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'HoVaTenNhanVien'">
                <a-space size="small">
                    <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien"></uc-avatar>

                    <b @click="onClickUserInfo(record)" class="cursor-pointer back-link-hover">{{ record.HoVaTenDem }} {{ record.TenNhanVien }} </b> <br />
                </a-space>
            </template>
            <template v-else-if="column.key === 'birthday'">
                <span>{{ record.NgaySinh.toString().padStart('2', 0) }}/{{ record.ThangSinh.toString().padStart('2', 0) }}/{{ record.NamSinh }}</span>
            </template>
            <template v-else-if="column.key === 'Action'">
                <a-dropdown trigger="click">
                    <uc-icon color="primary" name="square-edit-outline" class="cursor-pointer" />
                    <template #overlay>
                        <a-menu>
                            <a-menu-item @click="handleEdit(record)"> <uc-icon name="account-edit" /> Sửa thông tin cơ bản </a-menu-item>
                            <a-menu-item @click="handleEditThongTinCongViec(record)"> <uc-icon name="text-box-edit-outline" /> Sửa thông tin công </a-menu-item>
                            <a-menu-item @click="handleEditTruongTuyChinh(record)"> <uc-icon name="cash-edit" /> Sửa thông tin lương </a-menu-item>
                            <a-menu-item @click="handleEditNhomVaQuanLy(record)"> <uc-icon name="account-group-outline" /> Sửa nhóm và quản lý </a-menu-item>
                            <a-divider class="my-1"></a-divider>
                            <a-menu-item @click="redirect('/hr-sua-nhan-su?id=' + record.NhanVien_Id)"> <uc-icon name="account" /> Sửa nhân sự </a-menu-item>
                            <a-divider class="my-1"></a-divider>
                            <a-menu-item @click="onDelete(record)"> <uc-icon name="trash-can-outline" color="red" /> Xóa nhân sự </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </template>
            <template v-else-if="column.key === 'LuongCoBan'">
                <span class="float-end me-2">{{ record.LuongCoBan.toLocaleString('us-en') }}</span>
            </template>
            <template v-else-if="column.key === 'TrangThai_HonNhan'">
                <span>{{ record.TrangThai_HonNhan === 2 ? 'Đã kết hôn' : 'Chưa kết hôn' }}</span>
            </template>
            <template v-else-if="column.key === 'GioiTinh'">
                <span v-if="record.GioiTinh === 1">Nam</span>
                <span v-else-if="record.GioiTinh === 2">Nữ</span>
                <span v-else-if="record.GioiTinh === 3">Khác</span>
            </template>
            <template v-else-if="column.key === 'TrangThai_LamViec'">
                <a-tag :color="record.TrangThai_LamViec_Mau">
                    {{ record.TrangThai_LamViec_Ten }}
                </a-tag>
            </template>
        </template>
    </a-table>
</template>

<script>
export default {
    props: ['dataSource', 'columns', 'pagination', 'handletablechange', 'isLoadingDSNhanVien'],
    emits: ['onFinishDelete', 'onEdit', 'onEditThongTinCongViec', 'onEditTruongTuyChinh', 'recordCongViec', 'onEditNhomVaQuanLy', 'recordNhomVaQuanLy', 'recordThongTinLuong', 'recordThongTinCoBan', 'handletablechange'],
    data() {
        return {
            isChangePag: true,
        }
    },
    methods: {
        onClickUserInfo(record) {
            // redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
            // window.location.href = `/lhu%20scientific%20research/test-layout-2?id=${record.id}`;
            const url = '/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id
            window.open(url, '_blank')
        },
        handleEdit(record) {
            this.$emit('recordThongTinCoBan', record)
            this.$emit('onEdit')
        },
        async handleEditThongTinCongViec(recordCongViec) {
            this.$emit('recordCongViec', recordCongViec)
            this.$emit('onEditThongTinCongViec')
        },
        handleEditTruongTuyChinh(record) {
            this.$emit('onEditTruongTuyChinh')
            this.$emit('recordThongTinLuong', record)
        },
        handleTableChange(pagination, filters, sorter) {
            if (this.isChangePag) {
                this.$emit('handletablechange', { pagination, filters, sorter })
            }
        },
        handleEditNhomVaQuanLy(record) {
            this.$emit('recordNhomVaQuanLy', record)
            this.$emit('onEditNhomVaQuanLy')
        },
        onFinish() {
            this.$emit('onFinish')
        },
        onDelete(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa nhân sự ${record.HoVaTenDem} ${record.TenNhanVien}?`,
                onOk: async () => {
                    const res = await nhanVienService.NhanVien_Delete({
                        NhanVien_Id: record.NhanVien_Id,
                    })
                    if (res) {
                        $this.$message.success('Xóa nhân sự thành công!')
                        $this.$emit('onFinishDelete')
                    }
                },
            })
        },
        redirect: redirect,
    },
}
</script>
