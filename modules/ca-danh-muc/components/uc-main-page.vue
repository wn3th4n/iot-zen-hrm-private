<template>
    <uc-layout>
        <a-row>
            <a-col :span="4" class="menu-left">
                <p class="menu-left-title">Danh mục</p>
                <a-menu v-model:selectedKeys="selectedKeyMenu" mode="vertical" :items="itemMenus" />
            </a-col>
            <a-col :span="20">
                <uc-main-page-nhom-ca-mau v-if="selectedKeyMenu[0] === '1'" />
                <uc-main-page-ca-mau v-if="selectedKeyMenu[0] === '2'" />
                <uc-main-page-loai-ca v-if="selectedKeyMenu[0] === '3'" />
                <uc-main-page-vai-tro v-if="selectedKeyMenu[0] === '4'" />
                <uc-main-page-ca-mac-dinh v-if="selectedKeyMenu[0] === '5'" />
                <uc-main-page-loai-vi-tri v-if="selectedKeyMenu[0] === '6'" />
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
                { key: '1', label: 'Nhóm ca mẫu' },
                { key: '2', label: 'Ca mẫu' },
                { key: '3', label: 'Loại ca' },
                { key: '4', label: 'Vai trò' },
                { key: '5', label: 'Ca cần, ca đủ' },
                { key: '6', label: 'Loại vị trí' },
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
