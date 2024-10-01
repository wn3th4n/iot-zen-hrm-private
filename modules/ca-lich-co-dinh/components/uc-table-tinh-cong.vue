<template>
    <a-table :columns="columns" :data-source="DSNhanSu" bordered :pagination="false" :scroll="{ x: 'max-content', y: 'calc(100vh - 185px)' }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'NhanSu'">
                <div class="d-flex flex-row gap-2">
                    <uc-avatar class="my-auto" :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien" />
                    <div class="d-flex flex-column">
                        <b> {{ record.HoVaTenNhanVien }}</b>
                        <small> [{{ record.MaNhanVien }}] - Văn phòng: {{ record.VanPhong }} </small>
                    </div>
                </div>
            </template>
            <template v-for="item in DSNgay">
                <template v-if="column.key === 'Ngay_' + item.Ngay + '_Ca_1'">
                    <span>{{ record['Ngay_' + item?.Ngay + '_Ca_1']?.Ten }}</span>
                </template>
                <template v-else-if="column.key === 'Ngay_' + item.Ngay + '_Ca_2'">
                    <span>{{ record['Ngay_' + item?.Ngay + '_Ca_2']?.Ten }}</span>
                </template>
            </template>
        </template>
    </a-table>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            LichLamViec_Id: null,
            MauBangCong_Id: null,
            DSMauBangCong: [],
            DSChuKy: [],
            Thang: 1,
            columns: [
                {
                    title: 'THỨ HAI',
                    dataIndex: 'Thu_2',
                    key: 'Thu_2',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_T2',
                            key: 'Sang_T2',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_T2',
                            key: 'Chieu_T2',
                            align: 'center',
                        },
                    ],
                },
                {
                    title: 'THỨ BA',
                    dataIndex: 'Thu_3',
                    key: 'Thu_3',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_T3',
                            key: 'Sang_T3',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_T3',
                            key: 'Chieu_T3',
                            align: 'center',
                        },
                    ],
                },
                {
                    title: 'THỨ TƯ',
                    dataIndex: 'Thu_4',
                    key: 'Thu_4',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_T4',
                            key: 'Sang_T4',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_T4',
                            key: 'Chieu_T4',
                            align: 'center',
                        },
                    ],
                },
                {
                    title: 'THỨ NĂM',
                    dataIndex: 'Thu_5',
                    key: 'Thu_5',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_T5',
                            key: 'Sang_T5',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_T6',
                            key: 'Chieu_T6',
                            align: 'center',
                        },
                    ],
                },
                {
                    title: 'THỨ SÁU',
                    dataIndex: 'Thu_6',
                    key: 'Thu_6',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_T6',
                            key: 'Sang_T6',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_T6',
                            key: 'Chieu_T6',
                            align: 'center',
                        },
                    ],
                },
                {
                    title: 'THỨ BẢY',
                    dataIndex: 'Thu_7',
                    key: 'Thu_7',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_T7',
                            key: 'Sang_T7',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_T7',
                            key: 'Chieu_T7',
                            align: 'center',
                        },
                    ],
                },
                {
                    title: 'CHỦ NHẬT',
                    dataIndex: 'Thu_CN',
                    key: 'Thu_CN',
                    align: 'center',
                    children: [
                        {
                            title: 'Sáng',
                            dataIndex: 'Sang_CN',
                            key: 'Sang_CN',
                            align: 'center',
                        },
                        {
                            title: 'Chiều',
                            dataIndex: 'Chieu_CN',
                            key: 'Chieu_CN',
                            align: 'center',
                        },
                    ],
                },
            ],
            DataThang: [
                {
                    Thu_2: '2',
                    Thu_3: '3',
                    Thu_4: '4',
                    Thu_5: '5',
                    Thu_6: '6',
                    Thu_7: '7',
                    Thu_CN: 'CN',
                    Thang: 9,
                },
            ],
            DSNhanSu: [
                {
                    HoVaTenNhanVien: 'Trần Thanh Việt',
                    MaNhanVien: 'GD001',
                    VanPhong: 'IOT HEAD',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Lê Chân Thiện Tâm',
                    MaNhanVien: 'GD002',
                    VanPhong: 'IOT HEAD',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Trần Quốc Vương',
                    MaNhanVien: 'MN001',
                    VanPhong: 'IOT MANAGER',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Nguyễn Minh Nhựt',
                    MaNhanVien: 'MN002',
                    VanPhong: 'IOT MANAGER',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Ngô Đình Vũ',
                    MaNhanVien: 'RM001',
                    VanPhong: 'IOT MANAGER',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Ngô Đình Luân',
                    MaNhanVien: 'MN003',
                    VanPhong: 'IOT MANAGER',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Trần Nhật Nam',
                    MaNhanVien: 'NV001',
                    VanPhong: 'IOT DEV',
                    AnhDaiDien_Url: '',
                },
                {
                    HoVaTenNhanVien: 'Trần Ngọc Mẫn',
                    MaNhanVien: 'NV002',
                    VanPhong: 'IOT DEV',
                    AnhDaiDien_Url: '',
                },
            ],

            DSNgay: [],
        }
    },
    mounted() {
        this.onLoadTable()
    },
    computed: {},
    watch: {},
    methods: {
        onLoadTable() {
            let columns_dayOfMonth = []
            let dayOfMonth = []

            for (let i = 0; i < 31; i++) {
                let obj = {}
                obj.Ngay = i + 1
                obj.Thang = 9
                switch (obj.Ngay % 7) {
                    case 1:
                        obj.Thu = 'CN'
                        break
                    case 2:
                        obj.Thu = 'T2'
                        break
                    case 3:
                        obj.Thu = 'T3'
                        break
                    case 4:
                        obj.Thu = 'T4'
                        break
                    case 5:
                        obj.Thu = 'T5'
                        break
                    case 6:
                        obj.Thu = 'T6'
                        break
                    case 0:
                        obj.Thu = 'T7'
                        break
                }
                obj.Ca_1 = {
                    TenCa: 'Ca 1',
                    TrangThai: 1,
                    SoCong: 4,
                    Is_VeSom: 1,
                    Is_DiTre: 1,
                }
                obj.Ca_2 = {
                    TenCa: 'Ca 2',
                    TrangThai: 1,
                    SoCong: 3,
                    Is_VeSom: 1,
                    Is_DiTre: 1,
                }
                dayOfMonth.push(obj)
            }
            this.DSNgay = Object.assign([], dayOfMonth)

            for (item of dayOfMonth) {
                let obj_day = {}
                obj_day.title = `${item.Ngay.toString().padStart('2', 0)}/${item.Thang.toString().padStart('2', 0)} - ${item.Thu}`
                obj_day.dataIndex = 'Ngay_' + item.Ngay
                obj_day.key = 'Ngay_' + item.Ngay
                obj_day.align = 'center'
                obj_day.children = [
                    {
                        title: item.Ca_1?.TenCa,
                        dataIndex: 'Ca_1',
                        key: 'Ngay_' + item.Ngay + '_Ca_1',
                        align: 'center',
                        width: 50,
                    },
                    {
                        title: item.Ca_2?.TenCa,
                        dataIndex: 'Ca_2',
                        key: 'Ngay_' + item.Ngay + '_Ca_2',
                        align: 'center',
                        width: 50,
                    },
                ]
                obj_day.width = 100
                columns_dayOfMonth.push(obj_day)
            }

            let column_NhanVien = {
                title: 'Nhân sự',
                dataIndex: 'NhanSu',
                key: 'NhanSu',
                fixed: 'left',
                width: 300,
            }
            this.DSNhanSu = this.DSNhanSu.map((x) => {
                x.Ngay_1_Ca_1 = {
                    Ten: 'ABC',
                }
                x.Ngay_1_Ca_2 = {
                    Ten: 'XYZ',
                }
                return x
            })

            console.log('  this.DSNhanSu', this.DSNhanSu)

            this.columns = [column_NhanVien, ...columns_dayOfMonth]
            console.log('  this.columns', this.columns)
        },
        onChangeChuKy() {},
        onChangeLichLamViec() {},
    },
}
</script>
