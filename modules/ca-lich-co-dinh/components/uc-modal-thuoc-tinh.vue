<template>
    <uc-modal :isOpen="isOpen" :title="title" :width="1300" @onClose="onCloseModal()">
        <a-row class="p-2" v-if="DSThuocTinh.length > 0">
            <a-col :xs="24" :md="6" v-for="item in DSThuocTinh" :key="item.ThuTu" class="mb-1">
                <div class="d-flex justify-content-between pe-4">
                    <b>{{ item?.ThuTu }}. {{ item?.TenThuocTinh }}:</b>
                    <a-tag color="success">
                        <span>{{ item.GiaTri }}</span>
                    </a-tag>
                </div>
            </a-col>
        </a-row>
        <uc-empty v-else />
    </uc-modal>
</template>
<script>
export default {
    emits: ['update:isOpen'],
    props: ['isOpen', 'dsthuoctinh'],
    data() {
        return {
            title: '',
        }
    },
    computed: {
        DSThuocTinh() {
            this.title = `Kết quả tính công - [${this.dsthuoctinh[1][0].MaNhanVien}] ${this.dsthuoctinh[1][0].HoVaTenNhanVien} - Chu kỳ: ${this.dsthuoctinh[1][0]?.Thang}/${this.dsthuoctinh[1][0]?.Nam} - Lịch làm việc: ${this.dsthuoctinh[1][0]?.TenMauBangCong}`
            console.log('dsthuoctinh', this.dsthuoctinh)
            return this.dsthuoctinh[0]
        },
    },
    methods: {
        onCloseModal() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
    },
}
</script>
