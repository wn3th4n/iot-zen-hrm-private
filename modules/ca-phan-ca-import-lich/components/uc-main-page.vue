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
                    <a-button type="primary" @click="getTemplate()"
                        ><uc-icon name="tray-arrow-down" />
                        Tải dữ liệu mẫu
                    </a-button>
                    <a-button v-if="!isViewedTemplate" type="primary" @click="onSave()"><uc-icon name="content-save-outline" />Lưu lịch phân ca</a-button>
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
                        <a-table :columns="columnsNhanSu" :data-source="dataNhanSu" size="small" :pagination="false" bordered></a-table>
                    </a-card>
                </a-col>
                <a-col :span="24">
                    <a-card size="small" class="card-title-page">
                        <div class="mb-1">
                            <b class="me-2">Ca mẫu:</b>
                            <a-tag v-for="item in dsCaMau">
                                <b>{{ item.MaCaMau }}</b>
                            </a-tag>
                        </div>
                        <div class="mb-1">
                            <b class="me-2">Loại vị trí / Vai trò:</b>
                            <a-tag v-for="item in DSVaiTro"> {{ item.MaVaiTro }} </a-tag>
                        </div>
                        <div>
                            <b class="me-2">Loại ca:</b>
                            <a-tag v-for="item in DSLoaiCa"> {{ item.MaLoaiCa }} </a-tag>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <uc-handsontable ref="refExcel" :data="dsLichPhanCa" :nestedHeaders="templateHeader" :afterChange="afterChange" height="calc(100vh - 305px)" :key="keyExcel" :afterRender="afterRender" :afterGetColHeader="setHeaderClass">
            <hot-column title="Mã" data="MaNhanVien" :readOnly="true"> </hot-column>
            <hot-column title="Tên nhân viên" data="HoVaTenNhanVien" :readOnly="true"> </hot-column>
            <hot-column title="Vị trí" data="TenViTri" :readOnly="true"></hot-column>
            <hot-column title="Phân ca" data="ThongTinPhanCa" width="150" :readOnly="true"></hot-column>
            <hot-column v-for="(date, index) in dsNgay" :title="date" :data="'Ngay_' + date.toString().padStart('2', 0)" :readOnly="isViewedTemplate" :className="getColumnClassNgay(date, index, dsThu)"> </hot-column>
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
			dsThu: [],
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
			DSVaiTro: [],
			DSLoaiCa: []
		}
	},
	watch: {},
	mounted() {
	},
	methods: {
		redirectToBack() {
			history.back()
		},
		getVaiTro() {
			//Lấy danh sách Vai trò
			ajaxCALL('/work/HR_VaiTro_Select', {}, (res) => {
				this.DSVaiTro = res.data
				})
		},
		getLoaiCa() {
			//Lấy danh sách loại ca
			ajaxCALL('/work/CA_LoaiCa_Select', {}, (res) => {
				this.DSLoaiCa = res.data
			})
		},
		getColumnClassNgay(date, index, dsThu) {
			const thu = dsThu[index];
			return thu === 'CN' ? 'thu-cn-new' : '';
		},
		cells: function (row, col) {
			const cellProperties = {};
			const $this = this
			if (col === 3) {
				const className = this.getColumnClassPhanCa(row, col);
				cellProperties.className = className; // Gọi hàm để lấy lớp
			}
			return cellProperties;
		},
		getColumnClassPhanCa(row, col) {
			let className = ''; // Giá trị mặc định
			const $this = this
			if ($this.$refs.refExcel) {
				const hotElement = $this.$refs.refExcel.$el; // Lấy phần tử DOM từ Vue component
				const cellSelector = `.ht_master .htCore tr:nth-child(${row + 1}) td:nth-child(${col + 2})`;
				const cellElement = hotElement.querySelector(cellSelector); // Lấy element

				if (cellElement) {
					const content = cellElement.textContent; // Lấy giá trị ô
					// Xử lý giá trị
					if (content === 'LOẠI CA') {
						className = 'phanca-bg-training';
					} else if (content === 'CA MẪU') {
						className = 'phanca-bg-schedule';
					} else if (content === 'VỊ TRÍ / VAI TRÒ') {
						className = 'phanca-bg-role';
					}
				}
			}
			return className;
		},
		afterRender() {
			const hotElement = this.$refs.refExcel.$el; // Lấy phần tử DOM từ Vue component
			let col = 3
			// Lặp qua tất cả các hàng và cột
			for (let row = 0; row < this.dsLichPhanCa.length; row++) {
				const cellSelector = `.ht_master .htCore tr:nth-child(${row + 1}) td:nth-child(${col + 2})`;
				const cellElement = hotElement.querySelector(cellSelector);
				if (cellElement) {
					const content = cellElement.textContent.trim();
					if (content === 'LOẠI CA') {
						cellElement.classList.add('phanca-bg-training');
					} else if (content === 'CA MẪU') {
						cellElement.classList.add('phanca-bg-schedule');
					} else if (content === 'VỊ TRÍ / VAI TRÒ') {
						cellElement.classList.add('phanca-bg-role');
					}
				}
			}
		},
		setHeaderClass(col, TH) {
			// Sao chép mảng và thêm 4 phần tử vào đầu
			const thu = ['', '', '', '', ...this.dsThu]; // Ví dụ giá trị thứ
			const ngay = ['', '', '', '', ...this.dsNgay]; // Ví dụ các ngày
			const currentThu = thu[col]; // Lấy giá trị thứ từ mảng mới
			const currentNgay = ngay[col]; // Lấy giá trị ngày từ mảng mới
			// Kiểm tra xem tiêu đề có phải là 'CN' không
			if (currentThu === 'CN') {
				TH.classList.add('thu-cn-new'); // Thêm class
			}
		},
		async getTemplate() {
			const $this = this
			if ($this.NhomCaMau_Id === null) {
				$this.$message.error('Vui lòng chọn nhóm ca mẫu')
				return
			}
			$this.getVaiTro()
			$this.getLoaiCa()
			const params = {
				LichLamViec_Id: $this.LichLamViec_Id,
				MauBangCong_Id: $this.MauBangCong_Id,
				NhomCaMau_Id: $this.NhomCaMau_Id,
			}
			await lichLamViecService.LichLamViec_PhanCa_Select_Template(params).then(({ DSNgay, DSCaCan, DSCaCo, DSCaMau, CTNhanSuDuBao, CTNhanSuOff, DSNhanVien, CTLichLamViec, CTBangCong }) => {
				console.log('CTLichLamViec', CTLichLamViec)
				$this.pageTitle = `Import lịch phân ca tháng ${CTLichLamViec?.Thang}/${CTLichLamViec?.Nam} - ${CTBangCong.TenMauBangCong}`
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
				const tongSoLuongNhanSuCo = DSNhanVien?.length / 3 //Lấy tổng nhân sự có dựa vào danh sách (Chia 3 vì 1 nhân sự có 3 dòng)
				const arrNhanSuCo = DSNgay.map((d) => {
					return tongSoLuongNhanSuCo - (CTNhanSuOff[d.Cot_Ngay] ?? 0)
				})
				const arrNgayPadStart = DSNgay.map((d) => d.Ngay.toString().padStart('2', 0))
				$this.dsNgay = arrNgay
				$this.dsThu = arrThu
				$this.templateHeader = [
					[{ label: 'Thứ', colspan: 4 }, ...arrThu],
					[{ label: 'Nhân sự dự báo', colspan: 4 }, ...arrNhanSuDuBao],
					[{ label: 'Tổng nhân sự dự có', colspan: 4 }, ...arrNhanSuCo],
					['Mã', 'Tên nhân viên', 'Vị trí', 'Phân ca', ...arrNgayPadStart],
				]

				$this.dsLichPhanCa = DSNhanVien
				$this.keyExcel += 1
				$this.isViewedTemplate = false
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
			const jsonLoaiCa = []
			$this.dsLichPhanCa.forEach((item) => {
				Object.keys(item).forEach((key) => {
					if (key.includes('Ngay_')) {
						if (item.ThongTinPhanCa === 'CA MẪU') {
							jsonLichLamViec.push({
								NhanVien_Id: item.NhanVien_Id,
								Ngay: key.split('_')[1],
								MaCaMau: item[key] ? item[key].trim() : '',
							})
						}
						if (item.ThongTinPhanCa === 'VỊ TRÍ / VAI TRÒ') {
							jsonViTri.push({
								NhanVien_Id: item.NhanVien_Id,
								Ngay: key.split('_')[1],
								MaLoaiViTri_List: item[key] ? this.convertMaLoaiViTri_List_TextToID(item[key].trim()) : '',
							})
						}
						if (item.ThongTinPhanCa === 'LOẠI CA') {
							jsonLoaiCa.push({
								NhanVien_Id: item.NhanVien_Id,
								Ngay: key.split('_')[1],
								MaLoaiCa: item[key] ? item[key].trim() : '',
							})
						}
					}
				})
			})
			const jsonLichLamViecPhanCa = []
			jsonLichLamViec.forEach((item, index) => {
				const mergeLich_ViTri = Object.assign(jsonLichLamViec[index], jsonViTri[index])
				const mergeLich_ViTri_LoaiCa = Object.assign(mergeLich_ViTri, jsonLoaiCa[index])
				jsonLichLamViecPhanCa.push(mergeLich_ViTri_LoaiCa)
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
