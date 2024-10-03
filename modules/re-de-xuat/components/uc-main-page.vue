<template>
    <uc-layout>
        <a-row>
            <a-col :span="4" class="menu-left">
                <p class="menu-left-title">Đề xuất</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
            <a-col :span="20">
                <uc-main-page-lam-them-gio v-if="selectedKeyMenu[0] === '1'" />
                <uc-main-page-nghi-phep v-if="selectedKeyMenu[0] === '2'" />
                <!-- <uc-main-page-ung-luong v-if="selectedKeyMenu[0] === '3'" />
                <uc-main-page-cham-cong v-if="selectedKeyMenu[0] === '4'" /> -->
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
                { key: '1', label: 'Làm thêm giờ' },
                { key: '2', label: 'Nghỉ phép' },
                { key: '3', label: 'Ứng lương' },
                { key: '4', label: 'Chấm công' },
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
