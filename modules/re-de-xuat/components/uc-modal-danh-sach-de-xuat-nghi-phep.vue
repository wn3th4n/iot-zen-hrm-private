<template>
    <a-spin :spinning="spinning" :delay="0">
        <uc-modal v-model:isOpen="isOpen" title="Tìm nhóm đề xuất" :width="500" @onClose="onCloseModal()" ref="refFormModal">
            <a-row class="mt-4">
                <a-col :span="24">
                    <a-input-search v-model:value="searchText" placeholder="Tìm nhanh" @search="onSearch" />
                </a-col>
                <a-col :span="24" class="mt-2">
                    <a-list item-layout="horizontal" :data-source="DSNhomNghiPhep">
                        <template #renderItem="{ item }">
                            <a-list-item class="px-2 cursor-pointer" @click="onOpenModalAddDeXuat(item)">
                                <a-list-item-meta>
                                    <template #title>
                                        <b>{{ item.TenNhomChinhSach_NghiPhep }}</b>
                                    </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-col>
            </a-row>
        </uc-modal>
        <uc-modal-add-dx-nghi-phep v-model:isOpen="states.isShowModalAddDeXuat" :recordChinhSach />
    </a-spin>
</template>

<script>
export default {
    props: ['isOpen', 'DSNhomNghiPhep'],
    emits: ['update:isOpen'],
    data() {
        return {
            searchText: '',
            spinning: false,
            states: {
                isShowModalAddDeXuat: false,
            },

            recordChinhSach: {
                ChinhSach: {},
                dsNhanSu: [],
            },
        }
    },
    methods: {
        onCloseModal() {
            this.$emit('update:isOpen', false)
        },
        onSearch() {},
        async onOpenModalAddDeXuat(record) {
            console.log('rêcord', record)
            this.states.isShowModalAddDeXuat = true
            const isSelect = await chinhSachService.ChinhSach_NghiPhep_Select_By_Id({
                ChinhSach_LamThem_Id: record.ChinhSach_NghiPhep_Id,
            })
            if (isSelect) {
                this.recordChinhSach.ChinhSach = Object.assign({}, isSelect[0][0])
                this.recordChinhSach.ChinhSach.Is_TamKhoa = isSelect[0][0].Is_TamKhoa === true ? 1 : 0
                this.recordChinhSach.dsKhungGio = Object.assign([], isSelect[1])
                this.recordChinhSach.dsNhanSu = Object.assign([], isSelect[2])
            }
            this.onCloseModal()
        },
    },
}
</script>
