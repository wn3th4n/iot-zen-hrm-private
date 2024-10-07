<template>
    <a-spin :spinning="spinning" :delay="0">
        <uc-modal v-model:isOpen="isOpen" title="Tìm nhóm đề xuất" :width="500" @onClose="onCloseModal()"
            ref="refFormModal">
            <a-row class="mt-4">
                <a-col :span="24">
                    <a-input-search v-model:value="value" placeholder="Tìm nhanh" @search="onSearch" />
                </a-col>
                <a-col :span="24" class="mt-2">
                    <a-list item-layout="horizontal" :data-source="DSChinhSachLamThem">
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
        <uc-modal-add-dx-lam-them v-model:isOpen="isShowModalAddDeXuat" :recordChinhSach />
    </a-spin>
</template>

<script>
export default {
    props: ['isOpen', 'DSChinhSachLamThem'],
    emits: ['update:isOpen'],
    data() {
        return {
            spinning: false,
            isShowModalAddDeXuat: false,
            DSDeXuat: [
                {
                    TenDeXuat: 'Quên chấm công vào hoặc ra (QLCM_QLCH)',
                    MoTa: `Tên đề xuất ghi rõ họ và tên, Chọn ngày phát sinh quên chấm công và chọn cả 2 ca có trong ngày, 
                    Trường hợp quên chấm công vào ‘Hoặc’ quên chấm công ra, * Tạo đề xuất sau không quá 03 ngày kể từ ngày quên chấm công., 
                    * Ngoài thời gian trên,sẽ không tạo được đề xuất và sẽ không tính công.`,
                    LoaiDeXuat: 1,
                },
                {
                    TenDeXuat: 'Quên chấm công vào hoặc ra (Shipper)',
                    MoTa: `Tên đề xuất ghi rõ họ và tên, Chọn ngày phát sinh quên chấm công và chọn cả 2 ca có trong ngày, 
                    Trường hợp quên chấm công vào ‘Hoặc’ quên chấm công ra, * Tạo đề xuất sau không quá 03 ngày kể từ ngày quên chấm công., 
                    * Ngoài thời gian trên,sẽ không tạo được đề xuất và sẽ không tính công.`,
                    LoaiDeXuat: 1,
                },
                {
                    TenDeXuat: 'Quên chấm công vào hoặc ra (TTBH)',
                    MoTa: `Áp dụng đối với bộ phận Truyền Thông - Bán Hàng, Tên đề xuất ghi rõ họ và tên, 
                    Chọn ngày phát sinh quên chấm công và chọn cả 2 ca có trong ngày, Trường hợp quên chấm công vào ‘Hoặc’ quên chấm công ra, 
                    * Tạo đề xuất sau không quá 03 ngày kể từ ngày quên chấm công., * Ngoài thời gian trên, sẽ không tạo được đề xuất và sẽ không tính công.`,
                    LoaiDeXuat: 1,
                },
            ],
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
