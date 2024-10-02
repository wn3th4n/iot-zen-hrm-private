<template>
    <div>
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
                        </div>
                    </template>
                </template>
            </template>
        </a-table>
        <uc-table-tinh-cong v-else-if="currentSteps === 1" />
        <uc-modal-check-in-out v-model:isOpen="isShowModalCheckInOut" :dschamcong="DSCheckInOut" :dsca="DSCa" />
    </div>
</template>
<script>
export default {
    props: ['llvid', 'mbcid'],
    data() {
        return {
            currentSteps: 0,
            selectedDate: null,
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
        this.onLoadTable()
    },
    computed: {
        LichLamViec_Id: function () {
            return this.llvid
        },
        MauBangCong_Id: function () {
            return this.mbcid
        },
    },
    watch: {},
    methods: {
        dateCellRender() {
            let event = this.DSNgay.map((x) => (x.NgayThangNam = dayjs(x.NgayThangNam, 'DD-MM-YYYY')))
            if (event) {
            }
        },
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
                console.log(' this.DSPhanCa', this.DSPhanCa)
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
            if (Object.keys(record).filter((x) => x.startsWith('Ca')).length > 0) {
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
            }
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
