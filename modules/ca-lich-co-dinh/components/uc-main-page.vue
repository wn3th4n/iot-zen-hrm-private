<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <div class="d-flex flex-row justify-content-between">
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
                    <div>
                        <a-select v-if="currentSteps === 0" v-model:value="typeTable" class="min-w-200px">
                            <a-select-option :value="1">Dạng lịch</a-select-option>
                            <a-select-option :value="2">Dạng lưới</a-select-option>
                        </a-select>
                    </div>
                </div>
            </template>
        </a-card>
        <uc-table-lich-tuan :llvid="LichLamViec_Id" :mbcid="MauBangCong_Id" v-if="typeTable === 1" />
        <uc-table-lich-thang :llvid="LichLamViec_Id" :mbcid="MauBangCong_Id" v-if="typeTable === 2" :currentSteps />
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
            typeTable: 1,
            steps: [
                {
                    title: 'Xem công',
                },
                {
                    title: 'Tính và chỉnh sửa công',
                },
            ],
            currentSteps: 0,
            LichLamViec_Id: isNaN(LichLamViec_Id) ? null : LichLamViec_Id,
            MauBangCong_Id: isNaN(MauBangCong_Id) ? null : MauBangCong_Id,
            DSMauBangCong: [],
            DSChuKy: [],
            isDisabled: false,
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
        }
    },
    mounted() {
        this.getDSChuKy()
    },
    computed: {},
    watch: {},
    methods: {
        async getDSChuKy() {
            const $this = this
            return lichLamViecService.LichLamViec_Select().then(({ DSChuKy, DSMauBangCong }) => {
                $this.DSChuKy = DSChuKy
                $this.DSMauBangCong = DSMauBangCong
            })
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
                            this.typeTable = 1
                        } else {
                            this.currentSteps++
                            this.typeTable = 2
                        }
                    },
                    onCancel: () => {
                        this.currentSteps = current
                    },
                })
            }
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
    },
}
</script>
