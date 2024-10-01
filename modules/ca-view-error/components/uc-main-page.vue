<template>
	<uc-layout>
		<a-card class='card-title-page'>
			<template #title>
				<h4>Lỗi [NV0000111] Trần Ngọc Mẫn - Chu kỳ:10/2024 - Lịch làm việc: IOT (Tĩnh)</h4>
			</template>
		</a-card>
		<a-table :columns='columns' :data-source='DSLoiFormula' size='small':pagination='false'>

		</a-table>
	</uc-layout>
</template>

<script>
	export default {
		props: [],
		data() {
			const urlParam = new URL(window.location.href).searchParams
        const LichLamViec_Id = parseInt(urlParam.get('llvid'))
        const MauBangCong_Id = parseInt(urlParam.get('mbcid'))
		const NhanVien_Id = parseInt(urlParam.get('nvid'))
			return {
				columns:[
					{
						title:'ID ca',
						dataIndex:'Id',
						align:'center'
					},
					{
						title:'Biến lỗi',
						dataIndex:'Ma',
					},
					{
						title:'Giá trị',
						dataIndex:'GiaTri',
						align:'center'
					},
					{
						title:'Loại thuộc tính',
						dataIndex:'Loai',
					},

					{
						title:'Lỗi',
						dataIndex:'ErrorMessage',
					},
				],
				DSLoiFormula:[]
			}
		},
		mounted() {},
		computed: {},
		watch: {},
		methods: {},
	}
</script>