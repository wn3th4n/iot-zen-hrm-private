<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                    <a-space>
                        <span>Bảo hiểm nhân sự</span>
                        <a-tag color="blue">
                            <span style="font-size:12px" class="text-primary">
                                {{this.data?.length ?? 0}} <uc-icon name="account"/>
                            </span>
                        </a-tag>
                    </a-space>
                </template>
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="openModalAddNguoiThamGia()"><uc-icon name="plus" />Thêm nhân sự</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="900">
            <a-table :columns="columns" :data-source="data" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'HoVaTenNhanVien'">
                        <a-space size="small">
                            <uc-avatar  :text="record.HoVaTenNhanVien" :src="record.AnhDaiDien_Url" />
                            <b @click="onClickUserInfo(record)" class="cursor-pointer"> {{ record.HoVaTenNhanVien }} </b>
                        </a-space>
                    </template>
                    <template v-else-if="column.key === 'ChinhSach'">
                        <div class="d-flex flex-column">
                            <b>{{ record.TenChinhSach }}</b>
                            <span class="text-primary">{{ record.MaChinhSach }}</span>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'LuongDongBaoHiem'">
                        <p class="text-primary text-end mb-0">{{ record.LuongDongBaoHiem.toLocaleString('en-US') }}</p>
                    </template>
                    <template v-else-if="column.key === 'Action'">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link">
                                <uc-icon name="dots-horizontal" />
                            </a>
                            <template #overlay>
                                <a-menu>
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
        </uc-container>
        <uc-modal-add-nguoi-tham-gia v-model:isOpen="isShowModalAddNguoiThamGia" @onFinish="loadNguoiThamGia()" />
        <uc-modal-edit-nguoi-tham-gia :record="dataEdit" v-model:isOpen="isShowModalEditNguoiThamGia" @onFinish="loadNguoiThamGia()" />
    </uc-layout>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: 'Nhân sự',
                    dataIndex: 'HoVaTenNhanVien',
                    key: 'HoVaTenNhanVien',
                    width: 500,
                },
                {
                    title: 'Chính sách bảo hiểm',
                    dataIndex: 'TenChinhSach',
                    key: 'ChinhSach',
                    width: 250,
                },
                {
                    title: 'Mức lương đóng bảo hiểm',
                    dataIndex: 'LuongDongBaoHiem',
                    key: 'LuongDongBaoHiem',
                    align: 'end',
                    width: 300,
                },
                {
                    title: 'Ngày Tham Gia',
                    dataIndex: 'NgayThamGia',
                    key: 'NgayThamGia',
                    align: 'center',
                    width: 200,
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    width: 100,
                    align: 'center',
                },
            ],
            isShowModalAddNguoiThamGia: false,
            isShowModalEditNguoiThamGia: false,
            data: [],
            dataEdit: {},
        }
    },
    mounted() {
        this.loadNguoiThamGia()
    },
    methods: {
        onEdit(record) {
            this.isShowModalEditNguoiThamGia = true
            this.dataEdit = Object.assign({}, record)
            this.dataEdit.NgayThamGia = dayjs(this.dataEdit.NgayThamGia, 'DD/MM/YYYY')
        },
        onDelete(record) {
            this.isLoading = true
            Confirm.delete({
                content: 'Xác nhận xóa ' + record.HoVaTenNhanVien + ' ra khỏi chính sách bảo hiểm?',
                onOk: async () => {
                    const res = await nhanVienBaoHiemService.NhanVien_ChinhSach_BaoHiem_Delete({
                        NhanVien_ChinhSach_BaoHiem_Id: record.NhanVien_ChinhSach_BaoHiem_Id,
                    })
                    if (res) {
                        this.loadNguoiThamGia()
                        this.$message.success('Xóa nhân sự tham gia chính sách thành công!')
                    }
                },
            })
            this.isLoading = false
        },
        async loadNguoiThamGia() {
            const res = await nhanVienBaoHiemService.NhanVien_ChinhSach_BaoHiem_Select()
            if (res) 
                this.data = res
        },
        openModalAddNguoiThamGia() {
            this.isShowModalAddNguoiThamGia = true
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
        onClickUserInfo(record) {
            redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
        },
    },
}
</script>
