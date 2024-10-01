<template>
    <uc-layout>
        <a-row>
            <a-col :span="4" class="menu-left">
                <p class="menu-left-title">Chính sách</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
            <a-col :span="20">
                <uc-main-page-nghi-phep v-if="selectedKeyMenu[0] === '1'" />
                <uc-main-page-bao-hiem v-if="selectedKeyMenu[0] === '2'" />
                <uc-main-page-phuc-loi v-if="selectedKeyMenu[0] === '3'" />
                <uc-main-page-ngay-le v-if="selectedKeyMenu[0] === '4'" />
				<uc-main-page-thue v-if="selectedKeyMenu[0] === '5'"/>
                <uc-main-page-ly-do-nghi-viec v-if="selectedKeyMenu[0] === '6'"/>
                <uc-main-page-bac-luong v-if="selectedKeyMenu[0] === '7'"/>
                <uc-main-page-bac-thuong v-if="selectedKeyMenu[0] === '8'"/>
                <uc-main-page-nhan-su v-if="selectedKeyMenu[0] === '9'"/>
            </a-col>
        </a-row>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            itemMenus: [
                { key: '1', label: 'Nghỉ phép' },
                { key: '2', label: 'Bảo hiểm' },
                { key: '3', label: 'Phúc lợi' },
                { key: '4', label: 'Ngày lễ' },
				{ key: '5', label: 'Thuế' },
				{ key: '6', label: 'Lý do nghỉ việc' },
                { key: '7', label: 'Bậc lương' },
                { key: '8', label: 'Bậc thưởng' },
                { key: '9', label: 'Nhân sự' },
            ],
            selectedKeyMenu: ['1'],
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {},
}
</script>
