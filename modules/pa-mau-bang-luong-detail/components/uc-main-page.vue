<template>
    <div>
        <uc-layout titlePage="Mẫu bảng lương chi tiết">
            <template slot="rightHeader">
                <a-dropdown>
                    <a-button type="primary"> <a-icon type="plus" />Thao tác </a-button>
                    <a-menu slot="overlay">
                        <a-menu-item @click="RedirectCauHinhCot()">
                            <a-icon type="table" style="color: rgb(112 191 255)" />
                            <span>Cấu hình cột</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </template>
            <a-tabs>
                <a-tab-pane key="1" tab="Các bản ghi">
                    <a-table :columns="columns" :data-source="DSBanGhi" :pagination="false" size="small">
                        <template slot="stt" slot-scope="text, record">
                            <span>{{ DSBanGhi.indexOf(record) + 1 }}</span>
                        </template>
                        <template slot="TenNhanSu" slot-scope="text, record">
                            <div class="d-flex flex-column">
                                <span class="font-weight-medium">{{ record.TenNhanSu }}</span>
                                <span class="text-primary">{{ record.MaNhanSu }}</span>
                            </div>
                        </template>
                        <template slot="Action" slot-scope="text, record">
                            <a-dropdown>
                                <a-button type="link">
                                    <a-icon type="appstore" />
                                </a-button>
                                <a-menu slot="overlay">
                                    <a-menu-item @click="onEdit(record)">
                                        <a-icon type="form" style="color: rgb(112 191 255)" />
                                        <span>Chỉnh sửa</span>
                                    </a-menu-item>
                                    <a-menu-item @click="onDelete(record)">
                                        <a-icon type="delete" style="color: red" />
                                        <span>Xoá</span>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </template>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Xác nhận "></a-tab-pane>
                <a-tab-pane key="3" tab="Điều chỉnh"></a-tab-pane>
            </a-tabs>
        </uc-layout>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            columns: [
                {
                    title: '#',
                    dataIndex: 'stt',
                    scopedSlots: { customRender: 'stt' },
                    align: 'center',
                },
                {
                    title: 'Tên	nhân sự',
                    dataIndex: 'TenNhanSu',
                    scopedSlots: { customRender: 'TenNhanSu' },
                },
                {
                    title: 'Lương hiện tại',
                    dataIndex: 'LuongHienTai',
                },
                {
                    title: 'Lương căn bản 1 giờ',
                    dataIndex: 'LuongCanBan',
                },
                {
                    title: 'Ngày công thực tế',
                    dataIndex: '',
                },
                {
                    title: 'Số giờ nghỉ phép',
                    dataIndex: '',
                },
                {
                    title: 'Số giờ nghỉ có hưởng',
                    dataIndex: '',
                },
                {
                    title: 'Số giờ làm thực tế',
                    dataIndex: '',
                },
            ],
            DSBanGhi: [
                {
                    MaNhanSu: 'NV001',
                    TenNhanSu: 'Trần Ngọc Mẫn',
                    LuongHienTai: 7500000,
                    LuongCanBan: 40000,
                    CongThucTe: 11,
                },
                {
                    MaNhanSu: 'NV002',
                    TenNhanSu: 'Ngô Đình Luân',
                    LuongHienTai: 7500000,
                    LuongCanBan: 40000,
                    CongThucTe: 15,
                },
                {
                    MaNhanSu: 'NV003',
                    TenNhanSu: 'Nam Trần',
                    LuongHienTai: 7500000,
                    LuongCanBan: 40000,
                    CongThucTe: 13,
                },
            ],
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        onEdit(record) {},
        onDelete(record) {},
        RedirectCauHinhCot() {
            window.open('/pa-mau-bang-luong-detail-cong-thuc', '_blank')
        },
    },
}
</script>
