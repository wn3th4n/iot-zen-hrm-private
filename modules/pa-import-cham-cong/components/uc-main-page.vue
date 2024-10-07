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
					<a-button type="primary" @click="getTemplate()"><uc-icon name="tray-arrow-down" />
						Tải dữ liệu mẫu
					</a-button>
					<a-button :loading="isLoadingSaveImport" v-if="!isViewedTemplate" type="primary"
						@click="onSave()"><uc-icon name="content-save-outline" />Lưu chấm công</a-button>
				</a-space>
			</template>
		</a-card>
		<uc-handsontable :data="dsNhanVien" :nestedHeaders="templateHeader" :cell="cellStyle" height="calc(100vh - 57px)"  :afterGetColHeader="setHeaderClass">
			<hot-column title="Mã" data="MaNhanVien" :readOnly="true"> </hot-column>
			<hot-column title="Tên nhân viên" data="HoVaTenNhanVien" :readOnly="true"> </hot-column>
			<hot-column title="Tên vị trí" data="TenViTri" :readOnly="true"></hot-column>
			<hot-column title="Mẫu chấm công" data="MauChamCong" :readOnly="true"></hot-column>
			<hot-column v-for="(date, index) in dsNgay" :title="date" :data="'Ngay_' + date.toString().padStart('2', 0)"
				width="90" :readOnly="isViewedTemplate" style="background-color:red"  :className="getColumnClassNgay(date, index, dsThu)"></hot-column>
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
				dsThu: [],
	            templateHeader: [[]],
	            isViewedTemplate: false,
	            ctLichLamViec: null,
	            ctMauBangCong: null,
	            isLoadingSaveImport: false,
	        }
	    },
	    async mounted() {
	        const $this = this
	        this.getTemplate()
	    },
		
	    methods: {
	        redirectToBack() {
	            history.back()
	        },
	        cellStyle(row, col) {
	            // const $this = this
	            // const cellProperties = {};
				// console.log($this.dsNhanVien[row][col]);

	            // if (row === 1 && col === 1) {
	            //     cellProperties.className = 'my-custom-cell';
	            // }
	            // for (let i = 0; i <= $this.dsNhanVien.length; i++) {
	            //     const item = $this.dsNhanVien[i]
	            //     for (var key in item) {
	            //         const wordCheck = item[key]
	            //         console.log('wordCheck', wordCheck)
	            //         if (key.includes('Ngay_') && wordCheck) {
	            //             console.log(key, $this.dsNhanVien[i])
	            //             const isCheckLength = wordCheck?.length !== 11
	            //             const isCheckSubtractTime = !wordCheck.includes('-')
	            //             if (isCheckLength) {
	            //                 $this.$message.error(`Giá trị ở dòng ${i + 1} và cột ${key} không đủ độ đài`)
	            //                 isError = true
	            //             }
	            //             if (isCheckSubtractTime) {
	            //                 $this.$message.error(`Giá trị ở dòng ${i + 1} và cột ${key} phải có dấu '-' ngăn cách giờ`)
	            //                 isError = true
	            //             }
	            //         }
	            //     }
	            // }
				
				const cellProperties = {};
				console.log('cellStyle called', row, col); // Để kiểm tra xem hàm có được gọi không
				return cellProperties;
	        },

			getColumnClassNgay(date, index, dsThu) {
				if (index <= 3) {
					return '';
				}

				const thu = dsThu[index];
				return thu === 'CN' ? 'thu-cn-new' : '';
			},

			setHeaderClass(col, TH) {
				// Sao chép mảng và thêm 4 phần tử vào đầu
				const thu = ['', '', '', '', ...this.dsThu]; // Ví dụ giá trị thứ
				const ngay = ['', '', '', '', ...this.dsNgay]; // Ví dụ các ngày
				
				const currentThu = thu[col]; // Lấy giá trị thứ từ mảng mới
				const currentNgay = ngay[col]; // Lấy giá trị ngày từ mảng mới
				
				const columnLabel = TH.innerText.trim();
				// Kiểm tra xem tiêu đề có phải là 'CN' không
				if (currentThu === 'CN') {
					TH.classList.add('thu-cn-new'); // Thêm class
				}
			},
			
			// Bỏ ràn buộc
	        // validateTemplate() {
	        //     const $this = this
	        //     let isError = false
	        //     for (let i = 0; i <= $this.dsNhanVien.length; i++) {
	        //         const item = $this.dsNhanVien[i]
	        //         for (var key in item) {
	        //             const wordCheck = item[key]
	        //             if (key.includes('Ngay_') && wordCheck) {
	        //                 // const isCheckLength = wordCheck.length !== 11
	        //                 const isCheckSubtractTime = !wordCheck.includes('-')
	        //                 // if (isCheckLength) {
	        //                 //     $this.$message.error(`Giá trị ở dòng ${i + 1} và cột ${key} ko đủ độ đài`)
	        //                 //     isError = true
	        //                 // }
	        //                 if (isCheckSubtractTime) {
	        //                     $this.$message.error(`Giá trị ở dòng ${i + 1} và cột ${key} phải có dấu '-' ngăn cách giờ`)
	        //                     isError = true
	        //                 }
	        //             }
	        //         }
	        //     }
	        //     return isError
	        // },

	        async getTemplate() {
	            const $this = this
	            const params = {
	                LichLamViec_Id: $this.LichLamViec_Id,
	                MauBangCong_Id: $this.MauBangCong_Id,
	            }
	            const { DSNgay, DSNhanVien, CTMauBangCong, CTLichLamViec } = await checkInOutService.CheckInOut_Select_Template(params)
	            $this.pageTitle = `Import chấm công tháng ${CTLichLamViec?.Thang}/${CTLichLamViec?.Nam} - ${CTMauBangCong.TenMauBangCong}`
	            $this.ctLichLamViec = CTLichLamViec
	            $this.ctMauBangCong = CTMauBangCong
	            const arrThu = DSNgay.map((d) => d.Thu)
	            const arrNgay = DSNgay.map((d) => d.Ngay?.toString().padStart('2', 0))
	            $this.templateHeader = [
	                [{ label: 'Thứ', colspan: 4 }, ...arrThu],
	                ['Mã', 'Tên nhân viên', 'Vị trí', 'Mẫu chấm công', ...arrNgay],
	            ]
	            $this.dsNhanVien = DSNhanVien
	            $this.dsNgay = arrNgay
				$this.dsThu	= arrThu
	            $this.isViewedTemplate = false
				
	        },
	        async onSave() {
	            const $this = this
	            if ($this.isViewedTemplate) return
	            //if ($this.validateTemplate()) return //Bỏ ràng buộc
	
	            const cloneNhanVien = [...$this.dsNhanVien]
	            const newdsNhanVien = []
	            for (var nv of cloneNhanVien) {
	                const obj = {}
	                for (var key in nv) {
	                    if (key.includes('Ngay_')) {
	                        const splitNgay = key.split('_')
	                        const ngay = splitNgay[1]
	                        obj.Id = nv.NhanVien_Id
	                        obj.Ngay = parseInt(ngay)
	                        obj.Gio = nv[key].replaceAll(' ', '').trim()
	                        newdsNhanVien.push({
	                            ...obj,
	                        })
	                    }
	                }
	
	            }
	
	            const params = {
	                LichLamViec_Id: $this.LichLamViec_Id,
	                MauBangCong_Id: $this.MauBangCong_Id,
	                CheckInOut_JSON: JSON.stringify(newdsNhanVien.filter(x => x.Gio !== null)),
	            }
	            $this.isLoadingSaveImport = true
	            const res = await checkInOutService.CheckInOut_Import(params)
	            if (res) {
	                $this.$message.success('Import chấm công thành công')
	                $this.isLoadingSaveImport = false
	            } else {
	                $this.isLoadingSaveImport = false
	            }
	        },
	        async onDelete() {
	            const $this = this
	            Confirm.delete({
	                content: `Bạn có chắc muốn xóa chấm công ${$this.ctMauBangCong.TenMauBangCong} của ${'T' + $this.ctLichLamViec.Thang + '/' + $this.ctLichLamViec.Nam}`,
	                async onOk() {
	                    const params = {
	                        LichLamViec_Id: $this.LichLamViec_Id,
	                        MauBangCong_Id: $this.MauBangCong_Id,
	                    }
	                    const res = await checkInOutService.LichOff_Delete(params)
	                    if (res) {
	                        $this.$message.success('Xóa chấm công thành công')
	                        $this.dsNhanVien = []
	                    }
	                },
	            })
	        },
	    },
	}
</script>
