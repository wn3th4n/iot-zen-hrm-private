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
					<a-button type="primary" @click="getTemplate()"><uc-icon name="tray-arrow-down" />Tải dữ liệu
						mẫu</a-button>
					<a-button v-if="!isViewedTemplate" type="primary" @click="onSave()"><uc-icon
							name="content-save-outline" />Lưu lịch dự trù</a-button>
					<a-button type="primary" danger @click="onDelete()"><uc-icon name="delete-outline" />Xóa lịch dự
						trù</a-button>
				</a-space>
			</template>
		</a-card>
		<uc-handsontable :data="dsLichCaMau" height="calc(100vh - 57px)">
			<hot-column title="Nhóm ca" data="TenNhomCaMau" :readOnly="true"> </hot-column>
			<hot-column title="Ca" data="MaCaMau" :readOnly="true"> </hot-column>
			<hot-column title="Vị trí" data="TenViTri" :readOnly="true"></hot-column>
			<hot-column v-for="(date, index) in dsNgay" :title="date" :data="'Ngay_' + date.toString().padStart('2', 0)"
				width="40" type="numeric" :readOnly="isViewedTemplate"> </hot-column>
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
	            dsLichCaMau: [],
	            dsNgay: [],
	            isViewedTemplate: false,
	            ctLichLamViec: null,
	            ctMauBangCong: null,
	        }
	    },
	    async mounted() {
	        const $this = this
	        await $this.getData()
	    },
	    computed: {},
	    watch: {},
	    methods: {
	        redirectToBack() {
	            history.back()
	        },
	        validateTemplate() {
	            const $this = this
	            let isError = false
	            for (let i = 0; i <= $this.dsLichCaMau.length; i++) {
	                const item = $this.dsLichCaMau[i]
	                for (var key in item) {
	                    const wordCheck = item[key]
	                    if (key.includes('Ngay_')) {
	                        if (typeof wordCheck !== 'number') {
	                            $this.$message.error(`Giá trị ở dòng ${i + 1} và cột ${key} bắt buộc là số`)
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
	            const { DSNgay, DSLichCaMau, CTBangCong, CTLichLamViec } = await lichDuTruService.LichDuTru_Select(params)
	            $this.pageTitle = `Import lịch dự trù tháng ${CTLichLamViec?.Thang}/${CTLichLamViec?.Nam} - ${CTBangCong.TenMauBangCong}`
	            $this.ctLichLamViec = CTLichLamViec
	            $this.ctMauBangCong = CTBangCong
	            const arrDate = DSNgay.map((d) => d.Ngay)
	            $this.dsNgay = arrDate
	            $this.dsLichCaMau = DSLichCaMau
	            if (DSLichCaMau.length > 0) {
	                $this.isViewedTemplate = true
	            }
	        },
	        async getTemplate() {
	            const $this = this
	            const params = {
	                MauBangCong_Id: $this.MauBangCong_Id,
	                LichLamViec_Id: $this.LichLamViec_Id,
	            }
	            const { DSNgay, DSLichCaMau } = await lichDuTruService.LichDuTru_Select_Template(params)
	            this.dsLichCaMau = DSLichCaMau
	            const arrDate = DSNgay.map((x) => x.Ngay)
	            this.dsNgay = arrDate
	            this.isViewedTemplate = false
	        },
	        async onSave() {
	            const $this = this
	            if ($this.isViewedTemplate) return
	            if ($this.validateTemplate()) return
	
	            Confirm.confirm({
	                content: 'Xác nhận lưu dịch dự trù',
	                onOk: async function () {
	                    const params = {
	                        LichLamViec_Id: $this.LichLamViec_Id,
	                        MauBangCong_Id: $this.MauBangCong_Id,
	                        LichLamViec_JSON: JSON.stringify($this.dsLichCaMau),
	                    }
	                    const res = await lichDuTruService.LichDuTru_Insert(params)
	                    if (res) {
	                        $this.$message.success('Thêm lịch dự trù thành công')
	                        $this.getData()
	                    }
	                }
	            })
	        },
	        async onDelete() {
	            const $this = this
	            Confirm.delete({
	                content: `Bạn có chắc muốn xóa lịch dự trù ${$this.ctMauBangCong.TenMauBangCong} của ${'T' + $this.ctLichLamViec.Thang + '/' + $this.ctLichLamViec.Nam}`,
	                async onOk() {
	                    const params = {
	                        LichLamViec_Id: $this.LichLamViec_Id,
	                        MauBangCong_Id: $this.MauBangCong_Id,
	                    }
	                    const res = await lichDuTruService.LichDuTru_Delete(params)
	                    if (res) {
	                        $this.$message.success('Xóa lịch dự trù thành công!')
	                        $this.dsLichCaMau = []
	                    }
	                },
	            })
	        },
	    },
	}
</script>