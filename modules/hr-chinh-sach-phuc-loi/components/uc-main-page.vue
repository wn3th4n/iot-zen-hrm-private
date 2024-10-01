<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <a-space>
                    Phúc lợi nhân sự
                    <a-tag color="blue">
                        <span style="font-size:12px" class="text-primary">
                            {{data?.length ?? 0 }}
                            <uc-icon name="account" />
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
        <uc-container :width="950">
                <a-table :columns="columns" :data-source="data" :pagination="false" size="small"
                   >
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'HoVaTenNhanVien'">
                            <a-space size="small">
                                <uc-avatar :text="record.HoVaTenNhanVien" :src="record.AnhDaiDien_Url" size="small" />
                                <b @click="onClickUserInfo(record)" class="cursor-pointer">{{ record.HoVaTenNhanVien }} </b>
                            </a-space>
                        </template>
                
                        <template v-else-if="column.key === 'PhucLoi'">
                            <div class="d-flex flex-column">
                                <b>{{ record.TenPhucLoi }}</b>
                                <span class="text-primary">{{ record.TenLoaiPhucLoi }}</span>
                            </div>
                        </template>
                
                        <template v-else-if="column.key === 'TamKhoa'">
                            <a-space size="small">
                                <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                            </a-space>
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
    props: [],
    data() {
        return {
            columns: [
                {
                    title: 'Nhân sự',
                    dataIndex: 'HoVaTenNhanVien',
                    key: 'HoVaTenNhanVien',
                    width: 250,
                },

                {
                    title: 'Phúc Lợi',
                    dataIndex: 'TenPhucLoi',
                    key: 'PhucLoi',
                    width: 350,
                },
                {
                    title: 'Ngày áp dụng',
                    dataIndex: 'NgayApDung',
                    key: 'NgayApDung',
                    width: 100,
                    align: 'center',
                },
                {
                    title: 'Tạm Khóa',
                    dataIndex: 'Is_TamKhoa',
                    key: 'TamKhoa',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                    width: 50,
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
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {
            this.isShowModalEditNguoiThamGia = true
            this.dataEdit = Object.assign({}, record)
            this.dataEdit.NgayApDung = dayjs(this.dataEdit.NgayApDung, 'DD/MM/YYYY')
        },
        onDelete(record) {
            this.isLoading = true
            Confirm.delete({
                content: 'Xác nhận xóa ' + record.HoVaTenNhanVien + ' ra khỏi phúc lợi?',
                onOk: async () => {
                    const res = await nhanVienPhucLoiService.NhanVien_PhucLoi_Delete({
                        NhanVien_PhucLoi_Id: record.NhanVien_PhucLoi_Id,
                    })
                    if (res) {
                        this.loadNguoiThamGia()
                        this.$message.success('Xóa nhân sự tham gia phúc lợi thành công!')
                    }
                },
            })
            this.isLoading = false
        },
        async loadNguoiThamGia() {
            const res = await nhanVienPhucLoiService.NhanVien_PhucLoi_Select()
            if (res) 
                this.data = res
            
        },
        openModalAddNguoiThamGia() {
            this.isShowModalAddNguoiThamGia = true
        },
        onClickUserInfo(record) {
        redirect('/hr-thong-tin-nhan-su?id=' + record.NhanVien_Id)
        },
    },
}
</script>
