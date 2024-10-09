<template>
    <a-spin :spinning="spinning" :delay="0">
        <uc-modal v-model:isOpen="isOpen" title="Chọn nhóm đề xuất" :width="500" @onClose="onCloseModal()"
            ref="refFormModal">
            <a-row class="mt-4">
                <a-col :span="24">
                    <a-input-search v-model:value="searchValue" placeholder="Tìm nhanh" @search="onSearch" />
                </a-col>
                <a-col :span="24" class="mt-2">
                    <a-list item-layout="horizontal" :data-source="DSChinhSachLamThem.filter(item => item.TenChinhSach_LamThem.toLowerCase().includes(searchValue.toLowerCase()))">
                        <template #renderItem="{ item }">
                            <a-list-item class="px-2 cursor-pointer" @click="onOpenModalAddDeXuat(item)">
                                <a-list-item-meta>
                                    <template #title>
                                        <b>{{ item.TenChinhSach_LamThem }}</b>
                                    </template>
                                    <template #description>
                                        <div>
                                            
                                            <span class="mt-2">{{ item.MoTa }}</span>
                                        </div>
                                    </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-col>
            </a-row>
        </uc-modal>
        <uc-modal-add-dx-lam-them v-model:isOpen="isShowModalAddDeXuat" :recordChinhSach @onFinish="onFinish" />
    </a-spin>
</template>

<script>
export default {
    props: ['isOpen', 'DSChinhSachLamThem', ],
    emits: ['update:isOpen','onFinish'],
    data() {
        return {
            searchValue: '',
            spinning: false,
            isShowModalAddDeXuat: false,
            DSDeXuat: [],
            recordChinhSach: {
                ChinhSach: {},
                dsNhanSu: [],
            },
        }
    },
    methods: {
        onFinish(){
            console.log('finish1');
            this.$emit('onFinish')
        },
        onCloseModal() {
            this.$emit('update:isOpen', false)
        },
        onSearch() { },
        async onOpenModalAddDeXuat(record) {
            this.isShowModalAddDeXuat = true
            const isSelect = await chinhSachService.ChinhSach_LamThem_Select_By_Id({
                ChinhSach_LamThem_Id: record.ChinhSach_LamThem_Id,
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
