<template>
    <uc-layout>
        <a-row>
            <a-col :span="4" class="menu-left">
                <p class="menu-left-title">Danh mục</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
            <a-col :span="20">
                <uc-main-page-dia-diem v-if="selectedKeyMenu[0] === '1'" />
                <uc-main-page-phan-loai-nhan-su v-if="selectedKeyMenu[0] === '2'" />
                <uc-main-page-vi-tri-cong-viec v-if="selectedKeyMenu[0] === '3'" />
                <uc-main-page-khu-vuc-chuyen-mon v-if="selectedKeyMenu[0] === '4'" />
                <uc-main-page-chuc-danh v-if="selectedKeyMenu[0] === '5'" />
                <uc-main-page-nhom-nhan-vien v-if="selectedKeyMenu[0] === '6'" />
                <uc-main-page-phong-ban v-if="selectedKeyMenu[0] === '7'" />
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
                { key: '1', label: 'Địa điểm' },
                { key: '2', label: 'Phân loại nhân sự' },
                { key: '3', label: 'Vị trí' },
                { key: '4', label: 'Khu vực chuyên môn' },
                { key: '5', label: 'Chức danh' },
                { key: '6', label: 'Nhóm nhân sự' },
                { key: '7', label: 'Phòng ban' },
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
