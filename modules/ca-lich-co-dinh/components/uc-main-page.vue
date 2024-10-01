<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <div class="d-flex flex-row">
                    <b class="me-3">Time sheet</b>
                    <a-select v-model:value="LichLamViec_Id" placeholder="Chọn chu kỳ" @change="onChangeChuKy()" class="me-2 min-w-200px">
                        <a-select-option v-for="item in DSChuKy" :value="item.LichLamViec_Id" :key="item.LichLamViec_Id">Tháng {{ item.Thang }}/{{ item.Nam }}</a-select-option>
                    </a-select>
                    <a-select v-model:value="MauBangCong_Id" placeholder="Chọn lịch làm việc" @change="onChangeLichLamViec()" :disabled="isDisabled" class="min-w-300px">
                        <a-select-option v-for="item in DSMauBangCong.filter((item) => item.LichLamViec_Id === LichLamViec_Id && item.Is_CoDinh === true)" :value="item.MauBangCong_Id" :key="item.MauBangCong_Id">{{ item.TenMauBangCong }}</a-select-option>
                    </a-select>
                </div>
            </template>
        </a-card>
        <a-table :columns="columns" :data-source="DSPhanCa" bordered :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-for="item in Object.keys(record)">
                    <template v-if="column?.key === item">
                        <div class="border border-1 rounded-5 my-2" style="max-height: fit-content">
                            <div class="d-flex justify-content-between px-2 text-white align-items-center" style="height: 30px" :style="{ 'background-color': !CompareDate(record[item]?.NgayThangNam) ? '#fd6a6a' : '#34c759' }">
                                <b>{{ record[item]?.Ngay.toString().padStart('2', 0) }}/{{ record[item]?.Thang.toString().padStart('2', 0) }}</b> <b><uc-icon name="clock-outline" class="me-2" />--:-- - --:--</b>
                            </div>
                            <a-row style="height: 100px" :style="{ 'background-color': !CompareDate(record[item]?.NgayThangNam) ? '#fff0f0' : '#ebfae6' }">
                                <a-col :span="8">
                                    <div class="h-50 border-bottom border-end border-success d-flex align-items-center justify-content-center">
                                        <b>7.75</b>
                                    </div>
                                    <div class="h-50 border-end border-success d-flex align-items-center justify-content-center">
                                        <span>Muộn: 0 phút</span>
                                    </div>
                                </a-col>
                                <a-col :span="16">
                                    <div @click="onOpenModalLichSuChamCong(record[item])" class="d-flex flex-column h-100 text-start justify-content-center ps-2 gap-3 cursor-pointer" style="font-size: 12px">
                                        <span><uc-icon name="umbrella" /> Ca 1: {{ record[item][item + `_C1_VaoCa`] }}-{{ record[item][item + `_C1_RaCa`] }}</span>
                                        <span><uc-icon name="umbrella" /> Ca 2: {{ record[item][item + `_C2_VaoCa`] }}-{{ record[item][item + `_C2_RaCa`] }}</span>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </template>
                </template>
            </template>
        </a-table>

        <!-- <a-card>

            <a-calendar v-modal:value="selectedDate">

                <template #dateCellRender="{ current }">
                    <div>
                        hello
                    </div>
                </template>
            </a-calendar>
        </a-card> -->
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        const urlParam = new URL(window.location.href).searchParams
        const LichLamViec_Id = parseInt(urlParam.get('llvid'))
        const MauBangCong_Id = parseInt(urlParam.get('mbcid'))
        return {
            selectedDate: null,
            LichLamViec_Id: isNaN(LichLamViec_Id) ? null : LichLamViec_Id,
            MauBangCong_Id: isNaN(MauBangCong_Id) ? null : MauBangCong_Id,
            DSMauBangCong: [],
            DSChuKy: [],
            isDisabled: false,
            Thang: 1,
            columns: [
                {
                    title: 'Thứ 2',
                    dataIndex: 'Thu_2',
                    key: 'T2',
                    align: 'center',
                },
                {
                    title: 'Thứ 3',
                    dataIndex: 'Thu_3',
                    key: 'T3',
                    align: 'center',
                },
                {
                    title: 'Thứ 4',
                    dataIndex: 'Thu_4',
                    key: 'T4',
                    align: 'center',
                },
                {
                    title: 'Thứ 5',
                    dataIndex: 'Thu_5',
                    key: 'T6',
                    align: 'center',
                },
                {
                    title: 'Thứ 7',
                    dataIndex: 'Thu_7',
                    key: 'T7',
                    align: 'center',
                },
                {
                    title: 'Chủ nhật',
                    dataIndex: 'Chu_Nhat',
                    key: 'CN',
                    align: 'center',
                },
            ],
            data_Thang: [
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
            DSNgay: [],
            DSPhanCa: [],
        }
    },
    mounted() {
        this.getDSChuKy()
        this.onLoadTable()
    },
    computed: {},
    watch: {},
    methods: {
        dateCellRender() {
            let event = this.DSNgay.map((x) => (x.NgayThangNam = dayjs(x.NgayThangNam, 'DD-MM-YYYY')))
            if (event) {
            }
        },
        // async onLoadTable() {
        //     const $this = this
        //     if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
        //         const { DSNgay, DSPhanCa, TTMauBangCong, TTChuKy } = await lichLamViecService.LichLamViec_CoDinh_Select_Lich({
        //             LichLamViec_Id: $this.LichLamViec_Id,
        //             MauBangCong_Id: $this.MauBangCong_Id,
        //         })
        //         this.DSNgay = DSNgay
        //         const data = []
        //         const objPhanCa_CN = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('CN'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'CN',
        //                 }
        //             })
        //         const objPhanCa_T2 = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('T2'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'T2',
        //                 }
        //             })

        //         const objPhanCa_T3 = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('T3'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'T3',
        //                 }
        //             })
        //         const objPhanCa_T4 = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('T4'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'T4',
        //                 }
        //             })
        //         const objPhanCa_T5 = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('T5'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'T5',
        //                 }
        //             })
        //         const objPhanCa_T6 = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('T6'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'T6',
        //                 }
        //             })
        //         const objPhanCa_T7 = Object.keys(DSPhanCa[0])
        //             .filter((x) => x.startsWith('T7'))
        //             .map((key) => {
        //                 return {
        //                     [key]: DSPhanCa[0][key],
        //                     Thu: 'T7',
        //                 }
        //             })
        //         // for (var phanCaCN of objPhanCa_CN) {
        //         //     console.log(phanCaCN)
        //         // }
        //         const data_PhanCa = []
        //         for (var ngay of DSNgay) {
        //             const obj = { ...ngay }
        //             if (ngay.Thu === 'CN') {
        //                 const obj_CN = {}
        //                 for (var item of objPhanCa_CN) {
        //                     for (key in item) {
        //                         obj_CN[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_CN, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //             if (ngay.Thu === 'T2') {
        //                 const obj_T2 = {}
        //                 for (var item of objPhanCa_T2) {
        //                     for (key in item) {
        //                         obj_T2[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_T2, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //             if (ngay.Thu === 'T3') {
        //                 const obj_T3 = {}
        //                 for (var item of objPhanCa_T3) {
        //                     for (key in item) {
        //                         obj_T3[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_T3, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //             if (ngay.Thu === 'T4') {
        //                 const obj_T4 = {}
        //                 for (var item of objPhanCa_T4) {
        //                     for (key in item) {
        //                         obj_T4[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_T4, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //             if (ngay.Thu === 'T5') {
        //                 const obj_T5 = {}
        //                 for (var item of objPhanCa_T5) {
        //                     for (key in item) {
        //                         obj_T5[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_T5, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //             if (ngay.Thu === 'T6') {
        //                 const obj_T6 = {}
        //                 for (var item of objPhanCa_T6) {
        //                     for (key in item) {
        //                         obj_T6[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_T6, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //             if (ngay.Thu === 'T7') {
        //                 const obj_T7 = {}
        //                 for (var item of objPhanCa_T7) {
        //                     for (key in item) {
        //                         obj_T7[key] = item[key]
        //                     }
        //                 }
        //                 data_PhanCa.push({ ...obj, ...obj_T7, keyColumn: `Ngay_${ngay.Ngay}_Thu_${ngay.Thu}` })
        //             }
        //         }
        //         console.log(data_PhanCa)
        //         for (var item of data_PhanCa) {
        //         }
        //         this.data_Thang = Object.assign([], data_PhanCa)
        //         // for (var key in objPhanCa) {
        //         //     if (key.includes('CN')) {
        //         //         if (obj[`${key}_Is_NgayNghi`] === undefined) {
        //         //             const ca = [1, 2, 3]
        //         //             for (var item of ca) {
        //         //                 obj[`${key}_C${item}_CaMau_Id`] = objPhanCa[`${key}_C${item}_CaMau_Id`]
        //         //                 obj[`${key}_C${item}_RaCa`] = objPhanCa[`${key}_C${item}_RaCa`]
        //         //                 obj[`${key}_C${item}_VaoCa`] = objPhanCa[`${key}_C${item}_VaoCa`]
        //         //             }
        //         //             obj[`${key}_Is_NgayNghi`] = objPhanCa[`${key}_Is_NgayNghi`]
        //         //             // obj[key] = DSPhanCa[0][key]
        //         //         }
        //         //     }
        //         //     // if (key.includes('T2')) {
        //         //     //     obj[key] = DSPhanCa[0][key]
        //         //     // }
        //         //     // if (key.includes('T3')) {
        //         //     //     obj[key] = DSPhanCa[0][key]
        //         //     // }
        //         //     // if (key.includes('T4')) {
        //         //     //     obj[key] = DSPhanCa[0][key]
        //         //     // }
        //         //     // if (key.includes('T5')) {
        //         //     //     obj[key] = DSPhanCa[0][key]
        //         //     // }
        //         //     // if (key.includes('T6')) {
        //         //     //     obj[key] = DSPhanCa[0][key]
        //         //     // }
        //         //     // if (key.includes('T7')) {
        //         //     //     obj[key] = DSPhanCa[0][key]
        //         //     // }
        //         // }
        //         // console.log(obj)
        //         const columns = []
        //         for (var item of DSNgay.slice(0, 7)) {
        //             let obj = {}
        //             switch (item?.Thu) {
        //                 case 'CN':
        //                     obj.title = 'Chủ nhật'
        //                     break
        //                 case 'T2':
        //                     obj.title = 'Thứ 2'
        //                     break
        //                 case 'T3':
        //                     obj.title = 'Thứ 3'
        //                     break
        //                 case 'T4':
        //                     obj.title = 'Thứ 4'
        //                     break
        //                 case 'T5':
        //                     obj.title = 'Thứ 5'
        //                     break
        //                 case 'T6':
        //                     obj.title = 'Thứ 6'
        //                     break
        //                 case 'T7':
        //                     obj.title = 'Thứ 7'
        //                     break
        //             }
        //             obj.dataIndex = 'Ngay_' + item?.Ngay + '_Thu_' + item?.Thu
        //             obj.keyColumn = 'Ngay_' + item?.Ngay + '_Thu_' + item?.Thu
        //             obj.align = 'center'
        //             obj.key = item.Thu
        //             columns.push(obj)
        //         }
        //         this.columns = columns
        //         console.log('columns', columns)
        //         // console.log('this.columns', this.columns)
        //     }
        // },
        async onLoadTable() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                const { DSNgay, DSPhanCa, TTMauBangCong, TTChuKy } = await lichLamViecService.LichLamViec_CoDinh_Select_Lich({
                    LichLamViec_Id: $this.LichLamViec_Id,
                    MauBangCong_Id: $this.MauBangCong_Id,
                })
                this.DSNgay = DSNgay
                const columns = []
                for (var item of DSNgay.slice(0, 7)) {
                    let obj = {}
                    switch (item?.Thu) {
                        case 'CN':
                            obj.title = 'Chủ nhật'
                            break
                        case 'T2':
                            obj.title = 'Thứ 2'
                            break
                        case 'T3':
                            obj.title = 'Thứ 3'
                            break
                        case 'T4':
                            obj.title = 'Thứ 4'
                            break
                        case 'T5':
                            obj.title = 'Thứ 5'
                            break
                        case 'T6':
                            obj.title = 'Thứ 6'
                            break
                        case 'T7':
                            obj.title = 'Thứ 7'
                            break
                    }
                    obj.dataIndex = 'Ngay_' + item?.Ngay + '_Thu_' + item?.Thu
                    obj.align = 'center'
                    obj.key = item.Thu
                    columns.push(obj)
                }
                // this.columns = columns
                console.log('columns', columns)
                let obj = {}
                for (var item of DSNgay) {
                    let DSPhanCaFilter = Object.keys(DSPhanCa)
                        .filter((x) => x.startsWith(item.Thu))
                        .reduce((x, key) => {
                            x[key] = DSPhanCa[key]
                            return x
                        }, {})
                    obj[item.Thu] = { ...item, ...DSPhanCaFilter }
                    console.log('obj', obj)
                    if (obj.Thu_So === 1) {
                        this.DSPhanCa.push(obj)
                        obj = {}
                    }
                    if (item.Ngay === DSNgay.length) {
                        this.DSPhanCa.push(obj)
                    }
                }
            }
            console.log('this.DSPhanCa', this.DSPhanCa)
        },
        async getDSChuKy() {
            const $this = this
            return lichLamViecService.LichLamViec_Select().then(({ DSChuKy, DSMauBangCong }) => {
                $this.DSChuKy = DSChuKy
                $this.DSMauBangCong = DSMauBangCong
            })
        },

        onChangeChuKy() {
            const $this = this
            $this.isDisabled = false
            $this.MauBangCong_Id = null
        },
        onChangeLichLamViec() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                redirect(`/ca-lich-co-dinh?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
            }
        },
        CompareDate(item) {
            return dayjs(item || '').isSame(dayjs(), 'day')
        },

        async onOpenModalLichSuChamCong(record) {
            const res = await checkInOutService.CheckInOut_Select_By_NhanVien_Id({
                // NhanVien_Id: record.NhanVien_Id,
                Ngay: record.Ngay,
                Thang: record.Thang,
                Nam: record.Nam,
            })
            console.log('record', record)
        },
    },
}
</script>
