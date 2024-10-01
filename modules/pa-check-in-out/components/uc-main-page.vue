<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <a-form layout="vertical">
                    <a-row :gutter="[10]">
                        <a-col class="pt-1">
                            <b class="me-3">{{ pageTitle }}</b>
                        </a-col>
                        <a-col :span="4" class="min-w-200px">
                            <a-form-item>
                                <a-select v-model:value="LichLamViec_Id" placeholder="Chọn chu kỳ" @change="onChangeChuKy()" :loading="isLoadingLichLamViec">
                                    <a-select-option v-for="item in DSChuKy" :value="item.LichLamViec_Id" :key="item.LichLamViec_Id"> Tháng {{ item.Thang }}/{{ item.Nam }} </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="7" class="min-w-300px">
                            <a-form-item>
                                <a-select v-model:value="MauBangCong_Id" placeholder="Chọn lịch làm việc" @change="onChangeLichLamViec()" :disabled="isDisabled">
                                    <a-select-option v-for="item in DSMauBangCong.filter((item) => item.LichLamViec_Id === LichLamViec_Id)" :value="item.MauBangCong_Id" :key="item.MauBangCong_Id">{{ item.TenMauBangCong }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </template>
            <template #extra>
                <div class="min-w-400px">
                    <a-space size="small" class="float-end">
                        <a-button type="primary" @click="() => redirectImportChamCong()"> <uc-icon name="import" /> Import dữ liệu </a-button>
                    </a-space>
                </div>
            </template>
        </a-card>
        <a-table
            :scroll="{ x: 'max-content', y: 'calc(100vh - 151px)' }"
            :columns="columns"
            :data-source="DSPhanCa"
            size="small"
            bordered
            :loading="isLoadingPage"
            :pagination="{
                current: currentPage,
                total: DSPhanCa.length,
                pageSize: 15,
                size: 'small',
                showTotal: (total, range) => showTotal(total, range),
                showSizeChanger: false,
            }"
            @change="handleTableChange"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'NhanVien'">
                    <a-flex gap="small">
                        <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien"></uc-avatar>
                        <div>
                            <b>{{ record.HoVaTenNhanVien }}</b> <br />
                            <small>
                                <b>[{{ record.MaNhanVien }}]</b> Số lần: <b>{{ record.TongLanChamCong }} </b>
                            </small>
                        </div>
                    </a-flex>
                </template>
                <template v-for="day in DSNgay">
                    <template v-if="column.key === day.Cot_Ngay">
                        <div :id="day.Thu_So + '_' + day.Ngay">
                            <div v-if="record[day.Cot_Ngay] && record[day.Cot_Ngay].length > 0" class="border-bottom text-start">
                                <div>{{ record[day.Cot_Ngay] ? record[day.Cot_Ngay].length : 0 }} lần</div>
                            </div>
                            <div class="d-hover btn-add-calen">
                                <a-button @click="onOpenModalAddCa(record, day)" type="primary" size="small" block><uc-icon name="plus" class="cursor-pointer me-0" /></a-button>
                            </div>
                            <!-- Giờ chấm công sớm nhất -->
                            <div v-if="record[day.Cot_Ngay]?.length > 0" class="mt-1 cursor-pointer" style="background-color: #e6f4ff; border: 1px solid #91caff; border-radius: 3px; font-weight: 400">
                                <div @click="onOpenModalCheckIn(record, record[day.Cot_Ngay])">
                                    <div><uc-icon :name="record[day.Cot_Ngay][0]?.HinhThuc_Icon" /> {{ record[day.Cot_Ngay][0]?.Gio }}</div>
                                    <hr v-if="record[day.Cot_Ngay]?.length > 1" class="my-0 w-50" />
                                    <div v-if="record[day.Cot_Ngay]?.length > 1"><uc-icon :name="record[day.Cot_Ngay][record[day.Cot_Ngay]?.length - 1]?.HinhThuc_Icon" /> {{ record[day.Cot_Ngay][record[day.Cot_Ngay]?.length - 1]?.Gio }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </a-table>
        <uc-modal-du-lieu-cham-cong v-if="isShowModalCheckIn" v-model:isOpen="isShowModalCheckIn" :record="RecordItem" :dschamcong="DSChamCong" @onFinish="renderCheckInOut()" />
        <uc-modal-add-du-lieu-cham-cong v-if="isShowModalAdd" v-model:isOpen="isShowModalAdd" :nhanvienid="NhanVien_Id" :cong="cong" @onFinish="renderCheckInOut()" />
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
            currentPage: 1,
            pageTitle: 'Chấm công',
            LichLamViec_Id: isNaN(LichLamViec_Id) ? null : LichLamViec_Id,
            MauBangCong_Id: isNaN(MauBangCong_Id) ? null : MauBangCong_Id,
            DSChuKy: [],
            DSMauBangCong: [],
            isShowModalCheckIn: false,
            isShowModalAdd: false,
            columns: [],
            DSNgay: [],
            DSPhanCa: [],
            CTLichLamViec: null,
            RecordItem: {},
            DSChamCong: [],
            NhanVien_Id: null,
            cong: {},
            isDisabled: LichLamViec_Id ? false : true,
            isLoadingLichLamViec: false,
            isLoadingPage: false,
        }
    },
    created() {},
    async mounted() {
        const $this = this
        await $this.loadChuKy()
        await $this.renderCheckInOut()
    },
    methods: {
        async loadChuKy() {
            this.isLoadingLichLamViec = true
            const { DSChuKy, DSMauBangCong } = await lichLamViecService.LichLamViec_Select().finally(() => (this.isLoadingLichLamViec = false))
            this.DSChuKy = DSChuKy
            this.DSMauBangCong = DSMauBangCong
        },
        async renderCheckInOut() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                this.isLoadingPage = true
                const params = { MauBangCong_Id: $this.MauBangCong_Id, LichLamViec_Id: $this.LichLamViec_Id }
                const { DSNgay, DSChamCong, DSNhanVien, CTMauBangCong, CTLichLamViec } = await checkInOutService.CheckInOut_Select_Lich(params).finally(() => (this.isLoadingPage = false))
                $this.DSNgay = DSNgay
                $this.CTLichLamViec = CTLichLamViec
                const columnDate = DSNgay.map((item) => {
                    const day = item.Ngay.toString().padStart('2', 0)
                    const month = item.Thang.toString().padStart('2', 0)
                    return {
                        title: `${item.Thu} - ${day}/${month}`,
                        key: item.Cot_Ngay,
                        dataIndex: item.Cot_Ngay,
                        width: 100,
                        align: 'center',
                        class: item.Thu === 'T7' || item.Thu === 'CN' ? `text-red ${item.Cot_Ngay}` : `${item.Cot_Ngay}`,
                    }
                })
                const newDSChamCong = []
                for (var nv of DSNhanVien) {
                    const cloneChamCong = { ...nv }
                    const DSFilterNhanVienChamCong = DSChamCong.filter((x) => x.NhanVien_Id === nv.NhanVien_Id)
                    let tongLanChamCong = 0
                    for (var cong of DSFilterNhanVienChamCong) {
                        //Xử lý dữ liệu ca của nhân viên
                        const CongCuaNhanVienID = DSFilterNhanVienChamCong.filter((x) => x.Ngay === cong.Ngay).map((ca) => {
                            return { ...ca }
                        })
                        //Xử lý tổng ngày chấm công, tổng lần chấm công
                        tongLanChamCong += 1
                        cloneChamCong['Ngay_' + cong.Ngay.toString().padStart('2', 0)] = CongCuaNhanVienID
                    }
                    cloneChamCong.TongLanChamCong = tongLanChamCong
                    newDSChamCong.push(cloneChamCong)
                }

                const columnNhanVien = {
                    title: 'Nhân viên',
                    key: 'NhanVien',
                    dataIndex: 'NhanVien',
                    width: 230,
                    fixed: 'left',
                }

                $this.columns = [columnNhanVien, ...columnDate]
                $this.DSPhanCa = newDSChamCong
                scrollToDate(DSNgay)
                this.isLoadingPage = false
            }
        },
        onOpenModalAddCa(record, cong) {
            this.NhanVien_Id = record.NhanVien_Id
            this.isShowModalAdd = true
            this.cong = cong
        },
        onOpenModalCheckIn(record, cong) {
            this.isShowModalCheckIn = true
            this.DSChamCong = Object.assign([], cong)
            this.RecordItem = Object.assign({}, record)
        },
        onChangeChuKy() {
            const $this = this
            $this.isDisabled = false
            $this.MauBangCong_Id = null
        },
        onChangeLichLamViec() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                redirect(`/pa-check-in-out?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
            }
        },
        redirectImportChamCong() {
            const $this = this
            if ($this.LichLamViec_Id && $this.MauBangCong_Id) {
                redirect(`/pa-import-cham-cong?llvid=${this.LichLamViec_Id}&mbcid=${this.MauBangCong_Id}`)
            }
        },
        redirect: redirect,
        showTotal(total, range) {
            return `${range[0]} - ${range[1]} / ${total} mục`
        },
        handleTableChange(pagination) {
            this.currentPage = pagination.current
        },
    },
}
</script>
