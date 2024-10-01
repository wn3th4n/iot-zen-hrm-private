<template>
    <a-spin :spinning="spinning" :delay="0">
        <uc-modal v-model:isOpen="isOpen" title="Đồng bộ dữ liệu" :width="500" @onClose="onCloseModal()" ref="refFormModal" @onSubmit="onSubmit()" okText="Đồng bộ">
            <a-form layout="vertical" class="mt-3">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-checkbox v-model:checked="is_DongBoNhanSu">Dữ liệu nhân sự</a-checkbox>
                    </a-col>
                    <a-col :span="24">
                        <a-checkbox v-model:checked="is_DongBoCauHinhCot">Dữ liệu công thức từ cấu hình cột</a-checkbox>
                    </a-col>
                    <a-col :span="24">
                        <a-checkbox v-model:checked="is_DongBoCongThuc">Dữ liệu công thức từ mẫu bảng lương</a-checkbox>
                    </a-col>
                </a-row>
            </a-form>
        </uc-modal>
    </a-spin>
</template>
<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'chukyluongid', 'maubangluongid'],
    data() {
        return {
            spinning: false,
            is_DongBoNhanSu: false,
            is_DongBoCauHinhCot: false,
            is_DongBoCongThuc: false,
        }
    },
    watch: {},
    methods: {
        onCloseModal() {
            this.is_DongBoCauHinhCot = false
            this.is_DongBoCauHinhCot = false
            this.is_DongBoNhanSu = false

            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            this.spinning = true
            const $this = this
            const res = await chuKyLuongService.ChuKyLuong_TinhCong_DongBoDuLieu({
                MauBangLuong_Id: $this.maubangluongid,
                ChuKyLuong_Id: $this.chukyluongid,
                Is_DongBo_NhanSu: $this.is_DongBoNhanSu,

                Is_DongBo_CauHinhCot: $this.is_DongBoCauHinhCot,
                Is_DongBo_CongThuc: $this.is_DongBoCongThuc,
            })
            if (res) {
                $this.onCloseModal()
                $this.$emit('onFinish')
                $this.$message.success('Đồng bộ dữ liệu thành công!')
            }
            this.spinning = false
        },
    },
}
</script>
