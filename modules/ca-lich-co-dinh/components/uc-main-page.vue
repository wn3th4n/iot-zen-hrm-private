<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <div class="d-flex flex-row">
                    <b class="me-3">Lịch cố định</b>
                    <a-select v-model:value="LichLamViec_Id" placeholder="Chọn chu kỳ" @change="onChangeChuKy()" class="me-2 min-w-200px">
                        <a-select-option v-for="item in DSChuKy" :value="item.LichLamViec_Id" :key="item.LichLamViec_Id">Tháng {{ item.Thang }}/{{ item.Nam }}</a-select-option>
                    </a-select>
                    <a-select v-model:value="MauBangCong_Id" placeholder="Chọn lịch làm việc" @change="onChangeLichLamViec()" :disabled="isDisabled" class="min-w-300px">
                        <a-select-option v-for="item in DSMauBangCong.filter((item) => item.LichLamViec_Id === LichLamViec_Id && item.Is_CoDinh === true)" :value="item.MauBangCong_Id" :key="item.MauBangCong_Id">{{ item.TenMauBangCong }}</a-select-option>
                    </a-select>
                    <div class="w-100 ps-5 d-flex align-items-center">
                        <a-steps style="max-width: 400px" :current="currentSteps" :items="steps" @change="onChangeStep(currentSteps)" />
                    </div>
                </div>
            </template>
        </a-card>
        <a-card size="small" class="text-center card-title-page border-top-0 border-bottom-0">
            <a-space size="middle">
                <div v-for="(item, index) in DSTrangThaiChamCong" :key="item.id">
                    <div>
                        <uc-icon :name="item.Icon" :color="item.Color" />
                        {{ item.TenTrangThai }}
                    </div>
                </div>
            </a-space>
        </a-card>
        <a-table :columns="columns" :data-source="DSPhanCa" bordered :pagination="false" v-if="currentSteps === 0">
            <template #bodyCell="{ column, record }">
                <template v-for="item in Object.keys(record)">
                    <template v-if="column?.key === item">
                        <div class="my-2" style="min-height: fit-content">
                            <div class="d-flex justify-content-between px-2 align-items-center" style="height: 30px">
                                <b> {{ record[item]?.Ngay.toString().padStart('2', 0) }}/{{ record[item]?.Thang.toString().padStart('2', 0) }} ({{ Object.keys(record[item]).filter((x) => x.startsWith('Ca')).length }} ca) </b>
                            </div>
                            <a-divider class="my-1" />
                            <div class="d-flex flex-column cursor-pointer w-100 justify-content-center px-2 justify-content-around" style="height: 100px" @click="onOpenModalCheckInOut(record[item])">
                                <a-tag v-for="(i, index) in Object.keys(record[item]).filter((x) => x.startsWith('Ca'))" class="gap-2 w-100 d-flex flex-row align-items-center" :color="record[item][i]?.TrangThai_Mau">
                                    <uc-icon :name="record[item][i].TrangThai_Icon" size="20" />
                                    <div class="d-flex flex-column">
                                        <span> Ca {{ index + 1 }}</span>
                                        <span>{{ record[item][i].GioBatDau }} → {{ record[item][i].GioKetThuc }}</span>
                                    </div>
                                </a-tag>
                            </div>

                            <!-- <a-row style="height: 106px" :style="{ 'background-color': !CompareDate(record[item]?.NgayThangNam) ? '#fff0f0' : '#ebfae6' }">
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
                            </a-row> -->
                        </div>
                    </template>
                </template>
            </template>
        </a-table>
        <uc-table-tinh-cong v-else-if="currentSteps === 1" />
        <uc-modal-check-in-out v-model:isOpen="isShowModalCheckInOut" :dschamcong="DSCheckInOut" :dsca="DSCa" />
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
            steps: [
                {
                    title: 'Xem công',
                },
                {
                    title: 'Tính và chỉnh sửa công',
                },
            ],
            currentSteps: 0,
            selectedDate: null,
            LichLamViec_Id: isNaN(LichLamViec_Id) ? null : LichLamViec_Id,
            MauBangCong_Id: isNaN(MauBangCong_Id) ? null : MauBangCong_Id,
            DSMauBangCong: [],
            DSChuKy: [],
            isDisabled: false,
            Thang: 1,
            DSTrangThaiChamCong: [
                {
                    id: 1,
                    TenTrangThai: 'Chưa xuất bản',
                    Color: 'muted',
                    Icon: 'progress-pencil',
                },
                {
                    id: 2,
                    TenTrangThai: 'Đã xuất bản',
                    Color: 'primary',
                    Icon: 'account-check',
                },
                {
                    id: 3,
                    TenTrangThai: 'Đủ vào, ra',
                    Color: 'success',
                    Icon: 'check-circle-outline',
                },
                {
                    id: 4,
                    TenTrangThai: 'Vắng mặt',
                    Color: 'red',
                    Icon: 'close-circle-outline',
                },
                {
                    id: 5,
                    TenTrangThai: 'Đi muộn',
                    Color: 'warning',
                    Icon: 'clock-minus-outline',
                },
                {
                    id: 6,
                    TenTrangThai: 'Nghỉ tính công',
                    Color: 'success',
                    Icon: 'currency-usd',
                },
                {
                    id: 7,
                    TenTrangThai: 'Nghỉ lễ',
                    Color: 'success',
                    Icon: 'white-balance-sunny',
                },
                {
                    id: 8,
                    TenTrangThai: 'Không tính công',
                    Color: 'red',
                    Icon: 'currency-usd-off',
                },
                {
                    id: 9,
                    TenTrangThai: 'Chưa tính công',
                    Color: 'primary',
                    Icon: 'square-rounded',
                    ShowAtStep: 1,
                },
                {
                    id: 10,
                    TenTrangThai: 'Đã tính công',
                    Color: 'success',
                    Icon: 'square-rounded',
                    ShowAtStep: 1,
                },
                {
                    id: 11,
                    TenTrangThai: 'Đã chốt công',
                    Color: 'warning',
                    Icon: 'square-rounded',
                    ShowAtStep: 1,
                },
            ],
            columns: [
                {
                    title: 'Thứ 2',
                    dataIndex: 'Thu_2',
                    key: 'T2',
                },
                {
                    title: 'Thứ 3',
                    dataIndex: 'Thu_3',
                    key: 'T3',
                },
                {
                    title: 'Thứ 4',
                    dataIndex: 'Thu_4',
                    key: 'T4',
                },
                {
                    title: 'Thứ 5',
                    dataIndex: 'Thu_5',
                    key: 'T6',
                },
                {
                    title: 'Thứ 7',
                    dataIndex: 'Thu_7',
                    key: 'T7',
                },
                {
                    title: 'Chủ nhật',
                    dataIndex: 'Chu_Nhat',
                    key: 'CN',
                },
            ],
            DSNgay: [],
            DSPhanCa: [],
            listData: [],
            value: dayjs(),
            isShowModalCheckInOut: false,
            DSCheckInOut: [],
            DSCa: [],
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
                let obj = {}
                for (var item of DSNgay) {
                    // let DSPhanCaFilter = Object.keys(DSPhanCa)
                    //     .filter((x) => x.startsWith(item.Thu))
                    //     .reduce((x, key) => {
                    //         x[key] = DSPhanCa[key]
                    //         return x
                    //     }, {})
                    // obj[item.Thu] = { ...item, ...DSPhanCaFilter }
                    // if (obj.hasOwnProperty('CN')) {
                    //     this.DSPhanCa.push(obj)
                    //     obj = {}
                    // }
                    // if (item.Ngay === DSNgay.length) {
                    //     this.DSPhanCa.push(obj)
                    // }

                    obj[item.Thu] = { ...item }
                    const DSFilterPhanCaNgay = DSPhanCa.filter((x) => x.Ngay === item.Ngay)
                    for (var phanCa of DSFilterPhanCaNgay) {
                        obj[item.Thu]['Ca_' + phanCa.MaCaMau] = phanCa
                    }
                    if (obj.hasOwnProperty('CN')) {
                        this.DSPhanCa.push(obj)
                        obj = {}
                    }
                    if (item.Ngay === DSNgay.length) {
                        this.DSPhanCa.push(obj)
                    }
                }
            }
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
        async onOpenModalCheckInOut(record) {
            const $this = this

            const res = await checkInOutService.CheckInOut_Select_By_NgayThangNam({
                Thang: record.Thang,
                Nam: record.Nam,
                Ngay: record.Ngay,
                MauBangCong_Id: $this.MauBangCong_Id,
            })
            if (res) {
                $this.DSCheckInOut = res
            }
            $this.isShowModalCheckInOut = true
            $this.DSCa = Object.keys(record)
                .filter((x) => x.startsWith('Ca'))
                .map((x) => {
                    return { ...record[x] }
                })
            console.log('$this.DSCa', $this.DSCa)
        },
        onChangeStep(current) {
            console.log('current', current)
            if (this.LichLamViec_Id && this.MauBangCong_Id) {
                let content = current === 0 ? 'Tính và chỉnh sửa công' : 'Xem công'
                Confirm.confirm({
                    content: `Bạn có chắc muốn chuyển sang bước ${content}?`,
                    onOk: () => {
                        if (content === 'Xem công') {
                            this.currentSteps--
                        } else {
                            this.currentSteps++
                        }
                    },
                    onCancel: () => {
                        this.currentSteps = current
                    },
                })
            }
        },
    },
}
</script>
