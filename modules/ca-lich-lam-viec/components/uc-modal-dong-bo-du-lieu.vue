<template>
    <uc-modal v-model:isOpen="isOpen" title="Đồng bộ dữ liệu" :width="350" @onClose="onCloseModal()" ref="refFormModal" @onSubmit="onSubmit()" okText="Đồng bộ">
        <a-form layout="vertical" class="mt-3">
            <a-row :gutter="[10]">
                <a-col :span="24">
                    <a-checkbox v-model:checked="is_DongBoChamCong">Dữ liệu chấm công</a-checkbox>
                </a-col>
                <a-col :span="24">
                    <a-checkbox v-model:checked="is_DongBoCongThuc">Dữ liệu công thức từ lịch làm việc</a-checkbox>
                </a-col>
            </a-row>
        </a-form>
    </uc-modal>
</template>
<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'maubangcongid', 'lichlamviecid'],
    data() {
        return {
            is_DongBoCongThuc: false,
            is_DongBoChamCong: false,
        }
    },
    watch: {},
    methods: {
        onCloseModal() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            const res = await lichLamViecService.LichLamViec_TinhCong_DongBoDuLieu({
                MauBangCong_Id: $this.maubangcongid,
                LichLamViec_Id: $this.lichlamviecid,
                Is_DongBo_CongThuc: $this.is_DongBoCongThuc,
                Is_DongBo_ChamCong: $this.is_DongBoChamCong,
            })
            if (res) {
                $this.onCloseModal()
                $this.$emit('onFinish')
                $this.$message.success('Đồng bộ dữ liệu thành công!')
            }
        },
    },
}
</script>
