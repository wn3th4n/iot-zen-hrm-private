<template>
	<uc-layout>
		<a-card>
			<template #title>
				<a-space size="small" class="card-title-page">
					<a-button @click="redirectToBack()"><uc-icon name="keyboard-backspace" />Trở về</a-button>
					{{ pageTitle }}
				</a-space>
			</template>
			<template #extra>
				<a-space size="small">
					<uc-select-nhom-ca-mau v-model:value="NhomCaMau_Id" style="width: 200px !important" />
					<a-button type="primary" @click="getData()"><uc-icon name="table-arrow-down" />
						Tải dữ liệu đã phân ca
					</a-button>
					<a-button type="primary" @click="getTemplate()"><uc-icon name="tray-arrow-down" />
						Tải dữ liệu mẫu
					</a-button>
					<a-button v-if="!isViewedTemplate" type="primary" @click="onSave()"><uc-icon
							name="content-save-outline" />Lưu lịch phân ca</a-button>
				</a-space>
			</template>
		</a-card>
		<div v-if="!isViewedTemplate" class="bg-white">
			<a-row class="border-bottom">
				<a-col :span="6">
					<a-card title="Số lượng ca cần / ca có" size="small" class="card-title-page border-0">
						<div>
							<b>Ca cần:</b>
							<a-tag v-for="item in dsCaCan" color="blue">
								{{ item.MaViTri }}: <b>{{ item.SoNguoi }}</b>
							</a-tag>
						</div>
						<div class="mt-2">
							<b>Ca có:</b>
							<a-tag v-for="item in dsCaCo" color="green">
								{{ item.MaViTri }}: <b>{{ item.SoNguoi }}</b>
							</a-tag>
						</div>
					</a-card>
				</a-col>
				<a-col :span="18">
					<a-card title="Số lượng thiếu/dư" size="small" class="card-title-page border-0 table-x-small">
						<a-table :columns="columnsNhanSu" :data-source="dataNhanSu" size="small" :pagination="false"
							bordered></a-table>
					</a-card>
				</a-col>
				<a-col :span="24">
					<a-card :bodyStyle="{ display: 'flex', 'flex-direction': 'column', gap: '8px', padding: '5px' }">
						<div class="d-flex" style="flex-wrap: wrap">
							<b style="margin-right: 8px">Lịch làm việc (Ca mẫu):</b>
							<a-tag v-for="item in dsCaMau" color="default">
								<b>{{ item.MaCaMau }}</b>
							</a-tag>
						</div>
						<div class="d-flex">
							<b style="margin-right: 8px">Loại vị trí:</b>
							<a-tag v-for="item in DSVaiTro"> {{ item.MaVaiTro }} </a-tag>
						</div>
						<div><b>Đào tạo:</b> <a-tag>V</a-tag></div>
					</a-card>
				</a-col>
			</a-row>
		</div>
		<uc-handsontable ref="refExcel" :data="dsLichPhanCa" :nestedHeaders="templateHeader" :afterChange="afterChange"
			:height="IsGetData ? 'calc(100vh - 57px)' : 'calc(100vh - 305px)'" :key="keyExcel">
			<hot-column title=" Mã" data="MaNhanVien" :readOnly="true"> </hot-column>
			<hot-column title="Tên nhân viên" data="TenNhanVien" :readOnly="true"> </hot-column>
			<hot-column title="Vị trí" data="TenViTri" :readOnly="true"></hot-column>
			<hot-column title="Phân ca" data="ThongTinPhanCa" :readOnly="true"></hot-column>
			<hot-column v-for="(date, index) in dsNgay" :title="date" :data="'Ngay_' + date.toString().padStart('2', 0)"
				:readOnly="isViewedTemplate"> </hot-column> 
		
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
	            LichLamViec_Id: LichLamViec_Id,
	            MauBangCong_Id: MauBangCong_Id,
	            pageTitle: 'Import lịch phân ca',
	            isLoading: false,
	            NhomCaMau_Id: 1,
	            dsNgay: [],
	            dsCaCan: [],
	            dsCaCo: [],
	            dsCaMau: [],
	            ctLichLamViec: null,
	            ctMauBangCong: null,
	            columnsNhanSu: [],
	            dataNhanSu: [],
	            dsLichPhanCa: [],
	            templateHeader: [[]],
	            isViewedTemplate: true,
	            keyExcel: 0,
	            IsGetData: false,
	            DSVaiTro: [],
	        }
	    },
	    watch: {},
	    mounted() {
	        const $this = this
	        //Lấy danh sách Vai trò ra rồi mới xử lý tiếp
	        ajaxCALL('/work/HR_VaiTro_Select', {}, (res) => {
	            this.DSVaiTro = res.data
	            $this.getData()
	        })
	    },
	    methods: {
	        redirectToBack() {
	            history.back()
	        },
	        async getData() {
	            const $this = this
	            if ($this.NhomCaMau_Id === null) {
	                $this.$message.error('Vui lòng chọn nhóm ca mẫu')
	                return
	            }
	
	            $this.IsGetData = true
	
	            const params = {
	                LichLamViec_Id: $this.LichLamViec_Id,
	                MauBangCong_Id: $this.MauBangCong_Id,
	                NhomCaMau_Id: $this.NhomCaMau_Id,
	            }
	            await lichLamViecService.LichLamViec_PhanCa_Select(params).then(({ DSNgay, DSNhanVien, CTBangCong, CTLichLamViec }) => {
	                $this.pageTitle = `Import lịch phân ca tháng ${CTLichLamViec?.Thang}/${CTLichLamViec?.Nam} - ${CTBangCong.TenMauBangCong}`
	                $this.ctLichLamViec = CTLichLamViec
	                $this.ctMauBangCong = CTBangCong
	                const arrNgay = DSNgay.map((d) => d.Ngay)
	                const arrThu = DSNgay.map((d) => d.Thu)
	                const arrNgayPadStart = DSNgay.map((d) => d.Ngay.toString().padStart('2', 0))
	                $this.dsNgay = arrNgay
	                //Xử lý header
	                $this.templateHeader = [
	                    [{ label: 'Thứ', colspan: 4 }, ...arrThu],
	                    ['Mã', 'Tên nhân viên', 'Vị trí', 'Phân ca', ...arrNgayPadStart],
	                ]
	                //Xử lý dữ liệu nhân viên
	                const dataLichPhanCa = []
	                const dsNhanVien = []
	                const arrNhanVienId = []
	                //Remove duplicate nhân viên
	                DSNhanVien.forEach((nv) => {
	                    if (arrNhanVienId.indexOf(nv.NhanVien_Id) < 0) {
	                        arrNhanVienId.push(nv.NhanVien_Id)
	                        dsNhanVien.push({
	                            NhanVien_Id: nv.NhanVien_Id,
	                            MaNhanVien: nv.MaNhanVien.trim(),
	                            TenNhanVien: nv.TenNhanVien.trim(),
	                            TenViTri: nv.TenViTri,
	                        })
	                    }
	                })
	                //Xử lý dữ liệu lịch, vị trí, đào tạo
	                dsNhanVien.forEach((nv) => {
	                    const dtLich = {}
	                    const dtViTri = {}
	                    const dtDaoTao = {}
	                    const filterArr = DSNhanVien.filter((filter) => filter.NhanVien_Id === nv.NhanVien_Id)
	                    for (var item of filterArr) {
	                        for (var key in item) {
	                            if (key === 'Ngay') {
	                                const ngay = item.Ngay.toString().padStart('2', 0)
	                                dtLich.ThongTinPhanCa = 'LỊCH LÀM VIỆC'
	                                dtLich[`Ngay_${ngay}`] = item.MaCaMau
	                                dtViTri.ThongTinPhanCa = 'LOẠI VỊ TRÍ / VAI TRÒ'
	                                dtViTri[`Ngay_${ngay}`] = this.convertMaLoaiViTri_List_IDToText(item.MaLoaiViTri_List)
	                                dtDaoTao.ThongTinPhanCa = 'ĐÀO TẠO'
	                                dtDaoTao[`Ngay_${ngay}`] = item.Is_DaoTao ? 'V' : ''
	                            }
	                        }
	                    }
	                    dataLichPhanCa.push({ ...nv, ...dtLich })
	                    dataLichPhanCa.push({ ...nv, ...dtViTri })
	                    dataLichPhanCa.push({ ...nv, ...dtDaoTao })
	                })
	
	                $this.dsLichPhanCa = dataLichPhanCa
	                $this.keyExcel += 1
	                if (DSNhanVien.length > 0) {
	                    $this.isViewedTemplate = true
	                }
	            })
	        },
	        async getTemplate() {
	            const $this = this
	            if ($this.NhomCaMau_Id === null) {
	                $this.$message.error('Vui lòng chọn nhóm ca mẫu')
	                return
	            }
	            $this.IsGetData = false
	            const params = {
	                LichLamViec_Id: $this.LichLamViec_Id,
	                MauBangCong_Id: $this.MauBangCong_Id,
	                NhomCaMau_Id: $this.NhomCaMau_Id,
	            }
	            await lichLamViecService.LichLamViec_PhanCa_Select_Template(params).then(({ DSNgay, DSCaCan, DSCaCo, DSCaMau, CTNhanSuDuBao, CTNhanSuOff, DSNhanVien }) => {
	                $this.dsCaCan = DSCaCan
	                $this.dsCaCo = DSCaCo
	                $this.dsCaMau = DSCaMau
	                $this.dsLichPhanCa = []
	                //Xử lý header dữ liệu bảng số lượng thiếu / dư
	                const dtColumnNhanSu = []
	                DSNgay.forEach((n) => {
	                    dtColumnNhanSu.push({
	                        title: n.Thu,
	                        align: 'center',
	                        children: [{ title: n.Ten_Cot_Ngay, dataIndex: n.Cot_Ngay, align: 'center', class: "12312321" }],
	                    })
	                })
	                $this.columnsNhanSu = dtColumnNhanSu
	                //Xử lý data dữ liệu bảng số lượng thiếu / dư
	                const dtNhanSu = [
	                    {
	                        Ngay_01: CTNhanSuDuBao.Ngay_01 * -1,
	                        Ngay_02: CTNhanSuDuBao.Ngay_02 * -1,
	                        Ngay_03: CTNhanSuDuBao.Ngay_03 * -1,
	                        Ngay_04: CTNhanSuDuBao.Ngay_04 * -1,
	                        Ngay_05: CTNhanSuDuBao.Ngay_05 * -1,
	                        Ngay_06: CTNhanSuDuBao.Ngay_06 * -1,
	                        Ngay_07: CTNhanSuDuBao.Ngay_07 * -1,
	                        Ngay_08: CTNhanSuDuBao.Ngay_08 * -1,
	                        Ngay_09: CTNhanSuDuBao.Ngay_09 * -1,
	                        Ngay_10: CTNhanSuDuBao.Ngay_10 * -1,
	                        Ngay_11: CTNhanSuDuBao.Ngay_11 * -1,
	                        Ngay_12: CTNhanSuDuBao.Ngay_12 * -1,
	                        Ngay_13: CTNhanSuDuBao.Ngay_13 * -1,
	                        Ngay_14: CTNhanSuDuBao.Ngay_14 * -1,
	                        Ngay_15: CTNhanSuDuBao.Ngay_15 * -1,
	                        Ngay_16: CTNhanSuDuBao.Ngay_16 * -1,
	                        Ngay_17: CTNhanSuDuBao.Ngay_17 * -1,
	                        Ngay_18: CTNhanSuDuBao.Ngay_18 * -1,
	                        Ngay_19: CTNhanSuDuBao.Ngay_19 * -1,
	                        Ngay_20: CTNhanSuDuBao.Ngay_20 * -1,
	                        Ngay_21: CTNhanSuDuBao.Ngay_21 * -1,
	                        Ngay_22: CTNhanSuDuBao.Ngay_22 * -1,
	                        Ngay_23: CTNhanSuDuBao.Ngay_23 * -1,
	                        Ngay_24: CTNhanSuDuBao.Ngay_24 * -1,
	                        Ngay_25: CTNhanSuDuBao.Ngay_25 * -1,
	                        Ngay_26: CTNhanSuDuBao.Ngay_26 * -1,
	                        Ngay_27: CTNhanSuDuBao.Ngay_27 * -1,
	                        Ngay_28: CTNhanSuDuBao.Ngay_28 * -1,
	                        Ngay_29: CTNhanSuDuBao.Ngay_29 * -1,
	                        Ngay_30: CTNhanSuDuBao.Ngay_30 * -1,
	                        Ngay_31: CTNhanSuDuBao.Ngay_31 * -1,
	                    },
	                ]
	                $this.dataNhanSu = dtNhanSu
	                //Xửu lý render handsontable
	                const arrNgay = DSNgay.map((d) => d.Ngay)
	                const arrThu = DSNgay.map((d) => d.Thu)
	                //Xử lý dòng nhân sự dự báo
	                const arrNhanSuDuBao = DSNgay.map((d) => {
	                    return CTNhanSuDuBao[d.Cot_Ngay] ?? 0
	                })
	                //Xử lý dòng nhân sự có dựa vào tổng nhân sự và lịch off
	                const tongSoLuongNhanSuCo = DSNhanVien.length
	                const arrNhanSuCo = DSNgay.map((d) => {
	                    return tongSoLuongNhanSuCo - (CTNhanSuOff[d.Cot_Ngay] ?? 0)
	                })
	                const arrNgayPadStart = DSNgay.map((d) => d.Ngay.toString().padStart('2', 0))
	                $this.dsNgay = arrNgay
	                $this.templateHeader = [
	                    [{ label: 'Thứ', colspan: 4 }, ...arrThu],
	                    [{ label: 'Nhân sự dự báo', colspan: 4 }, ...arrNhanSuDuBao],
	                    [{ label: 'Tổng nhân sự dự có', colspan: 4 }, ...arrNhanSuCo],
	                    ['Mã', 'Tên nhân viên', 'Vị trí', 'Phân ca', ...arrNgayPadStart],
	                ]
	
	                console.log(DSNhanVien)
	                $this.dsLichPhanCa = DSNhanVien
	                $this.keyExcel += 1
	                $this.isViewedTemplate = false
	            })
	        },
	        onDelete() {
	            const $this = this
	            Confirm.delete({
	                content: `Xác nhận xóa lịch phân ca T${$this.ctLichLamViec?.Thang + '/' + $this.ctLichLamViec?.Nam} của ${$this.ctMauBangCong?.TenMauBangCong}`,
	                async onOk() {
	                    const params = {
	                        LichLamViec_Id: $this.LichLamViec_Id,
	                        MauBangCong_Id: $this.MauBangCong_Id,
	                    }
	                    const isDelete = await lichLamViecService.LichLamViec_PhanCa_Delete_By_MauBangCong_Id(params)
	                    if (isDelete) {
	                        $this.$message.success('Xóa lịch phân ca thành công')
	                        $this.getTemplate()
	                    }
	                },
	            })
	        },
	        afterChange(changes) {
	            const $this = this
	            changes?.forEach(([row, prop, oldValue, newValue]) => {
	                const isRowLichLamViec = row % 3 === 0
	                const trimOldValue = oldValue ? oldValue.trim() : ''
	                const trimNewValue = newValue ? newValue.trim() : ''
	                //Nếu đúng là lịch làm việc
	                if (isRowLichLamViec && trimOldValue !== trimNewValue) {
	                    //Nếu giá trị cũ không phải mã ca mẫu
	                    if (!trimOldValue || (trimOldValue && trimOldValue.length !== 5 && trimOldValue.indexOf('-') < 0)) {
	                        if (trimNewValue.length === 5 && trimNewValue.indexOf('-') >= 0) {
	                            $this.dataNhanSu[0][prop] += 1
	                        }
	                    } else {
	                        if (trimNewValue.length !== 5 && trimNewValue.indexOf('-') < 0) {
	                            $this.dataNhanSu[0][prop] -= 1
	                        }
	                    }
	                }
	            })
	        },

	        onSave() {
	            const $this = this
	            const jsonLichLamViec = []
	            const jsonViTri = []
	            const jsonDaoTao = []
	            $this.dsLichPhanCa.forEach((item) => {
	                Object.keys(item).forEach((key) => {
	                    if (key.includes('Ngay_')) {
	                        if (item.ThongTinPhanCa === 'LỊCH LÀM VIỆC') {
	                            jsonLichLamViec.push({
	                                NhanVien_Id: item.NhanVien_Id,
	                                Ngay: key.split('_')[1],
	                                MaCaMau: item[key] ? item[key].trim() : '',
	                            })
	                        }
	                        if (item.ThongTinPhanCa === 'LOẠI VỊ TRÍ / VAI TRÒ') {
	                            jsonViTri.push({
	                                NhanVien_Id: item.NhanVien_Id,
	                                Ngay: key.split('_')[1],
	                                MaLoaiViTri_List: item[key] ? this.convertMaLoaiViTri_List_TextToID(item[key].trim()) : '',
	                            })
	                        }
	                        if (item.ThongTinPhanCa === 'ĐÀO TẠO') {
	                            jsonDaoTao.push({
	                                NhanVien_Id: item.NhanVien_Id,
	                                Ngay: key.split('_')[1],
	                                Is_DaoTao: item[key] === 'V' ? 1 : 0,
	                            })
	                        }
	                    }
	                })
	            })
	            console.log(jsonViTri)
	            const jsonLichLamViecPhanCa = []
	            jsonLichLamViec.forEach((item, index) => {
	                const mergeLich_ViTri = Object.assign(jsonLichLamViec[index], jsonViTri[index])
	                const mergeLich_ViTri_DaoTao = Object.assign(mergeLich_ViTri, jsonDaoTao[index])
	                jsonLichLamViecPhanCa.push(mergeLich_ViTri_DaoTao)
	            })
	            const params = {
	                LichLamViec_Id: $this.LichLamViec_Id,
	                MauBangCong_Id: $this.MauBangCong_Id,
	                LichLamViec_PhanCa_JSON: jsonLichLamViecPhanCa,
	            }
	            lichLamViecService.LichLamViec_PhanCa_Import(params).then((res) => {
	                if (res) {
	                    $this.$message.success('Thêm lịch phân ca thành công')
	                }
	            })
	        },
	        convertMaLoaiViTri_List_TextToID(MaLoaiViTri_List) {
	            let str_list = MaLoaiViTri_List.split(',')
	            const arrList = []
	            for (var str of str_list) {
	                const obj = this.DSVaiTro.find((x) => x.MaVaiTro === str.trim())
	                if (obj) {
	                    arrList.push(obj.VaiTro_Id)
	                }
	            }
	            return arrList.join(',')
	        },
	        convertMaLoaiViTri_List_IDToText(MaLoaiViTri_List) {
	            console.log(MaLoaiViTri_List)
	            let str_list = MaLoaiViTri_List.split(',')
	            const arrList = []
	            for (var str of str_list) {
	                const obj = this.DSVaiTro.find((x) => x.VaiTro_Id === parseInt(str))
	                if (obj) {
	                    arrList.push(obj.MaVaiTro)
	                }
	            }
	            return arrList.join(',')
	        }
	    }
	},
</script>