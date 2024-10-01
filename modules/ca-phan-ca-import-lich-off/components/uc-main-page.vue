<template>
    <uc-layout>
        <a-card class="card-title-page">
            <template #title>
                <a-space size="small">
                    <a-button @click="redirectToBack()"><uc-icon name="keyboard-backspace" />Trở về</a-button>
                    {{ pageTitle }}
                </a-space>
            </template>
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="getTemplate()"><uc-icon name="tray-arrow-down" />Tải dữ liệu mẫu</a-button>
                    <a-button v-if="!isViewedTemplate" type="primary" @click="onSave()"><uc-icon name="content-save-outline" />Lưu lịch nghỉ</a-button>
                    <a-button type="primary" danger @click="onDelete()"><uc-icon name="delete-outline" />Xóa lịch nghỉ</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-handsontable :data="dsNhanVien" :nestedHeaders="templateHeader" height="calc(100vh - 57px)">
            <hot-column title="Mã" data="MaNhanVien" :readOnly="true"> </hot-column>
            <hot-column title="Tên nhân viên" data="TenNhanVien" :readOnly="true"> </hot-column>
            <hot-column title="Ngày" data="TenViTri" :readOnly="true"></hot-column>
            <hot-column v-for="(date, index) in dsNgay" :title="date" :data="'Ngay_' + date.toString().padStart('2', 0)" width="30" :readOnly="isViewedTemplate"></hot-column>
        </uc-handsontable>
    </uc-layout>
</template>
<script>
export default {
    props: [],
    components: {
        HotColumn: Handsontable.vue.HotColumn,
    },
    data() {
        const urlParam = new URL(window.location.href).searchParams
        const LichLamViec_Id = parseInt(urlParam.get('llvid'))
        const MauBangCong_Id = parseInt(urlParam.get('mbcid'))
        return {
            pageTitle: '',
            LichLamViec_Id: LichLamViec_Id,
            MauBangCong_Id: MauBangCong_Id,
            isLoading: false,
            dsNhanVien: [],
            dsNgay: [],
            templateHeader: [[]],
            isViewedTemplate: false,
            ctLichLamViec: null,
            ctMauBangCong: null,
        }
    },
    async mounted() {
        const $this = this
        await $this.getData()
    },
    methods: {
        redirectToBack() {
            history.back()
        },
        validateTemplate() {
            const $this = this
            let isError = false
            for (let i = 0; i <= $this.dsNhanVien.length; i++) {
                const item = $this.dsNhanVien[i]
                for (var key in item) {
                    const wordCheck = item[key]
                    if (key.includes('Ngay_')) {
                        if (wordCheck !== 'X' && wordCheck !== 'x') {
                            $this.$message.error(`Giá trị ở dòng ${i + 1} và cột ${key} bắt buộc là chữ 'X'`)
                            isError = true
                        }
                    }
                }
            }
            return isError
        },
        async getData() {
            const $this = this
            const params = {
                LichLamViec_Id: $this.LichLamViec_Id,
                MauBangCong_Id: $this.MauBangCong_Id,
            }
            const { DSNgay, DSNhanVien, CTBangCong, CTLichLamViec } = await lichOffService.LichOff_Select(params)
            $this.pageTitle = `Import lịch nghỉ tháng ${CTLichLamViec?.Thang}/${CTLichLamViec?.Nam} - ${CTBangCong.TenMauBangCong}`
            $this.ctLichLamViec = CTLichLamViec
            $this.ctMauBangCong = CTBangCong
            const arrThu = DSNgay.map((d) => d.Thu)
            const arrNgay = DSNgay.map((d) => d.Ngay?.toString().padStart('2', 0))
            $this.templateHeader = [
                [{ label: 'Thứ', colspan: 3 }, ...arrThu],
                ['Mã', 'Tên nhân viên', 'Ngày', ...arrNgay],
            ]
            $this.dsNgay = arrNgay
            $this.dsNhanVien = DSNhanVien
            if (DSNhanVien.length > 0) {
                $this.isViewedTemplate = true
            }
        },
        async getTemplate() {
            const $this = this
            const params = {
                LichLamViec_Id: $this.LichLamViec_Id,
                MauBangCong_Id: $this.MauBangCong_Id,
            }
            const { DSNgay, DSNhanVien } = await lichOffService.LichOff_Select_Template(params)
            const arrThu = DSNgay.map((d) => d.Thu)
            const arrNgay = DSNgay.map((d) => d.Ngay?.toString().padStart('2', 0))
            $this.templateHeader = [
                [{ label: 'Thứ', colspan: 3 }, ...arrThu],
                ['Mã', 'Tên nhân viên', 'Ngày', ...arrNgay],
            ]
            $this.dsNhanVien = DSNhanVien
            $this.dsNgay = arrNgay
            $this.isViewedTemplate = false
        },
        async onSave() {
            const $this = this
            if ($this.isViewedTemplate) {
                return
            }
            if ($this.validateTemplate()) {
                return
            }
            const params = {
                LichLamViec_Id: $this.LichLamViec_Id,
                MauBangCong_Id: $this.MauBangCong_Id,
                LichOff_JSON: JSON.stringify($this.dsNhanVien),
            }
            $this.isLoading = true
            const res = await lichOffService.LichOff_Insert(params).finally(() => {
                $this.isLoading = false
            })
            if (res) {
                $this.$message.success('Import lịch nghỉ thành công')
            }
        },
        async onDelete() {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa lịch nghỉ ${$this.ctMauBangCong.TenMauBangCong} của ${'T' + $this.ctLichLamViec.Thang + '/' + $this.ctLichLamViec.Nam}`,
                async onOk() {
                    const params = {
                        LichLamViec_Id: $this.LichLamViec_Id,
                        MauBangCong_Id: $this.MauBangCong_Id,
                    }
                    const res = await lichOffService.LichOff_Delete(params)
                    if (res) {
                        $this.$message.success('Xóa lịch nghỉ thành công')
                        $this.dsNhanVien = []
                    }
                },
            })
        },
    },
}
</script>
