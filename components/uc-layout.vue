<template>
	<a-config-provider :theme="{
      token: {
        motionUnit: 0,
		borderRadius: 5
      },
    }">
		<a-layout style="min-height: calc(100vh)">
			<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible style="background: #fff">
				<div>
					<div class="d-flex layout-logo" style="gap:8px; border-right: 1px solid rgba(5, 5, 5, 0.06);">
						<a-avatar v-if="!collapsed" src="https://work.zentea.vn/_cdn/zen-work/logo_hrm_tm.jpg"
							size="large" />
						<div style="align-self: center;" :style="{ width: collapsed ? '100%' : '' }">
							{{ collapsed ? 'HRM' : 'HRM - TÔ MINH' }}
						</div>
					</div>
					<a-divider style="margin:0px"></a-divider>
					<a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
						:mode="collapsed ? 'vertical' : 'inline'" :inline-collapsed="false" theme="light"
						style="overflow:auto" :style="{ height: heightSilder }">
						<template v-for="item in menu">
							<a-sub-menu v-if="item.children" :key="item.key">
								<template #title>
									<span>
										<uc-icon :name="item.icon" size="18" />
										<span v-if="!collapsed">{{ item.title }}</span>
									</span>
								</template>
								<a-menu-item v-for="sub in item.children" :key="sub.key">
									<a :href="sub.url">{{ sub.title }}</a>
								</a-menu-item>
							</a-sub-menu>
							<a-menu-item v-else>
								<uc-icon :name="item.icon" size="18" />
								<a :href="item.url">{{ item.title }}</a>
							</a-menu-item>
							<a-divider style="margin: 0;"></a-divider>
						</template>
					</a-menu>
				</div>
				<div class="d-flex"
					style="justify-content: space-between; border-right: 1px solid rgba(5, 5, 5, 0.06); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
					<a-dropdown class="w-75" :arrow="{ pointAtCenter: true }">
						<a @click.prevent>
							<div class="d-flex "
								style="min-width: 38px; gap:8px; padding: 8px; border-right: 1px solid rgba(5, 5, 5, 0.06);">
								<uc-avatar :src="null"
									:text="vueData?.user?.FirstName + ' ' + vueData?.user?.LastName" />
								<div v-if="!collapsed">
									<p class="mb-1 text-black"><b>{{ vueData?.user?.LastName }}</b></p>
									<small class="mb-1" style="color:black">{{ vueData?.user?.UserID }}</small>
								</div>
							</div>
						</a>
						<template #overlay>
							<a-menu>
								<a-menu-item>
									<uc-icon name="lock-reset" size="18" />
									<a href="https://login.zentea.vn/ChangePassword">Đổi mật khẩu</a>
								</a-menu-item>
								<a-menu-item>
									<uc-icon name="logout" size="18" color="red" />
									<a href="https://login.zentea.vn/Signout" style="color:red">Đăng xuất </a>
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
					<div class="cursor-pointer w-25 text-center" style="align-self: center; min-width: 35px"
						@click="() => (collapsed = !collapsed)">
						<uc-icon name="backburger" size="20" color="primary"></uc-icon>
					</div>
				</div>
			</a-layout-sider>
			<a-layout>
				<a-layout-content>
					<slot></slot>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-config-provider>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				collapsed: false,
				menu: [
					{
						key: 'menu-nhan-su',
						title: 'Nhân sự',
						label: 'Nhân sự',
						icon: 'account-outline',
						children: [
							{
								key: 'hr-nhan-su',
								title: 'Nhân sự',
								label: 'Nhân sự',
								url: '/hr-nhan-su',
							},
							{
								key: 'hr-chinh-sach',
								title: 'Chính sách',
								label: 'Chính sách',
								url: '/hr-chinh-sach',
							},
							{
								key: 'hr-danh-muc',
								title: 'Danh mục',
								label: 'Danh mục',
								url: '/hr-danh-muc',
							},
							{
								key: 'hr-hop-dong',
								title: 'Hợp đồng',
								label: 'Hợp đồng',
								url: '/hr-hop-dong',
							},
							{
								key: 'hr-phat-trien-su-nghiep',
								title: 'Sự nghiệp',
								label: 'Sự nghiệp',
								url: '/hr-phat-trien-su-nghiep',
							},
						],
					},
	
					{
						key: 'menu-de-xuat',
						title: 'Đề xuất',
						icon: 'alarm-light-outline',
						children: [
							{
								key: 're-de-xuat',
								title: 'Đề xuất',
								url: '/re-de-xuat',
							},
							{
								key: 're-cai-dat',
								title: 'Cài đặt',
								url: '/re-cai-dat',
							}
						],
					},
					// {
					//     key: 'menu-cong-viec',
					//     title: 'Quản lý KPI',
					//     icon: 'invoice-list-outline',
					//     children: [
					//         {
					//             key: 'wk-cong-viec',
					//             title: 'Công việc',
					//             url: '/wk-cong-viec',
					//         },
					//         {
					//             key: 'wk-loai-vi-tri',
					//             title: 'Loại vị trí',
					//             url: '/wk-loai-vi-tri',
					//         },
					//         {
					//             key: 'wk-danh-muc',
					//             title: 'Danh mục',
					//             url: '/wk-danh-muc',
					//         },
					//     ],
					// },
					{
						key: 'menu-quan-ly-cong',
						title: 'Quản lý công',
						icon: 'calendar-check-outline',
						children: [
							{
								key: 'ca-chu-ky',
								title: 'Chu kỳ',
								url: '/ca-chu-ky',
							},
							{
								key: 'ca-phan-ca',
								title: 'Phân ca',
								url: '/ca-phan-ca',
							},
							{
								key: 'pa-check-in-out',
								title: 'Chấm công',
								url: '/pa-check-in-out',
							},
							{
								key: 'ca-lich-lam-viec',
								title: 'Lịch làm việc',
								url: '/ca-lich-lam-viec',
							},
							{
								key: 'ca-thiet-lap-lich-lam-viec',
								title: 'Thiết lập lịch',
								url: '/ca-thiet-lap-lich-lam-viec',
							},
							{
								key: 'ca-danh-muc',
								title: 'Danh mục',
								url: '/ca-danh-muc',
							},
						],
					},
					{
						key: 'menu-quan-ly-luong',
						title: 'Quản lý lương',
						icon: 'cash-edit',
						children: [
							{
								key: 'pa-chu-ky-luong',
								title: 'Chu kỳ lương',
								url: '/pa-chu-ky-luong',
							},
							{
								key: 'pa-mau-bang-luong',
								title: 'Mẫu bảng lương',
								url: '/pa-mau-bang-luong',
							},
						],
					},
					{
						key: 'menu-setting',
						title: 'Thiết lập',
						icon: 'cog',
						children: [
							{
								key: 'ac-quyen-he-thong',
								title: 'Quyền hệ thống',
								url: '/ac-quyen-he-thong',
							}
						],
					},
				],
				vueData: vueData,
				heightSilder: 'calc(100vh - 107px)'
	
			}
		},
		mounted() { },
		computed: {
			selectedKeys: function () {
				let selectedKey = [window.location.pathname.replace('/', '')]
				return selectedKey
			},
			openKeys: function () {
				let openKey = []
				this.menu.forEach((item, index) => {
					if (item.children) {
						item.children.forEach((sub) => {
							const keySub = window.location.pathname.replace('/', '')
							if (keySub === sub.key) {
								openKey.push(this.menu[index].key)
							}
						})
					}
				})
				return openKey
			},
		},
		watch: {
			collapsed: function (isCollapsed) {
				if (isCollapsed) {
					this.heightSilder = 'calc(100vh - 75px)'
				} else {
					this.heightSilder = 'calc(100vh - 107px)'
				}
			}
		},
		methods: {},
	}
</script>