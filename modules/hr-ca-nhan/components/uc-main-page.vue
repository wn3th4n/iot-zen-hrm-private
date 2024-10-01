<template>
	<div class="me-container">
		<div class="screen-devices">
			<div class="group-info">
				<a-avatar :size="100" icon="user" />
				<div class="infomation">
					<p class="title">NGÔ ĐÌNH LUÂN</p>
					<p class="subtitle">Chưa nhập chức danh</p>
					<p class="infomation">
						<b>Địa chỉ email: </b>
						<span>
							ngodinhluan567@gmail.com
						</span>
					</p>
					<p class="infomation">
						<b>Số điện thoại: </b>
						0329924722
					</p>
				</div>
			</div>
			<div class="lich-lam-viec">
				<a-card title="Lịch làm việc">
					<a-list item-layout="horizontal" :data-source="newData" size="small">
						<a-list-item slot="renderItem" slot-scope="item, index"
							:style="{ 'background-color': item.isShowToday ? '#00800029' : 'white' }">
							<a-list-item-meta>
								<a-badge status="default" :text="item.title" slot="title" />
							</a-list-item-meta>
							<div>
								<a-tag color="#87d068">
									{{ item.timeStart }}
								</a-tag>
								<a-tag color="#f50">
									{{ item.timeEnd }}
								</a-tag>
							</div>
						</a-list-item>
					</a-list>
				</a-card>
			</div>
			<div class="cham-cong">
				<a-card title="Chấm công">

				</a-card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [],
	data() {
		//['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
		return {
			data: [
				{
					title: 'Thứ 2',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 1,
					isShowToday: false
				},
				{
					title: 'Thứ 3',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 2,
					isShowToday: false
				},
				{
					title: 'Thứ 4',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 3,
					isShowToday: false
				},
				{
					title: 'Thứ 5',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 4,
					isShowToday: false
				},
				{
					title: 'Thứ 6',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 5,
					isShowToday: false
				},
				{
					title: 'Thứ 7',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 6,
					isShowToday: false
				},
				{
					title: 'Chủ nhật',
					timeStart: '8:00-12:00',
					timeEnd: '13:15-17:00',
					indexDay: 0,
					isShowToday: false
				},
			],
			today: new Date()
		}
	},
	mounted() { },
	computed: {
		newData: function () {
			const day = this.today.getDay()
			console.log("day", day)
			const newArr = this.data.map(x => {
				if (x.indexDay === day) {
					x.isShowToday = true
				}
				return x
			})
			return newArr
		}
	},
	watch: {},
	methods: {},
}
</script>