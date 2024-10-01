<template>
    <uc-modal v-model:isOpen="isOpen" title="Hủy khóa công" :width="500" @onClose="onCloseModal()" ref="refFormModal" @onSubmit="onSubmit()" okText="Hủy khóa công">
        <a-form layout="vertical" class="mt-3">
            <a-row :gutter="[10]">
                <a-col :span="24">
                    <a-form-item label="Lựa chọn">
                        <a-select v-model:value="cachTinh">
                            <a-select-option v-for="item in cachTinhArr" :value="item.id">
                                <span>{{ item.TenCachTinh }}</span>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <!-- <a-col :span="12">
                    <a-form-item label="Từ ngày">
                        <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="TuNgay" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" :disabled="cachTinh === 1" class="w-100" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Đến ngày">
                        <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="DenNgay" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" :disabled="cachTinh === 1" class="w-100" />
                    </a-form-item>
                </a-col> -->
            </a-row>
        </a-form>
    </uc-modal>
</template>
<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'lichlamviecid', 'maubangcongid', 'thangchuky', 'namchuky'],
    data() {
        return {
            cachTinh: 1,
            TuNgay: '',
            DenNgay: '',
            cachTinhArr: [
                {
                    id: 1,
                    TenCachTinh: 'Tất cả các ngày',
                },
                {
                    id: 0,
                    TenCachTinh: 'Từ ngày đến ngày',
                },
            ],
            DinhDangNgay: '',
        }
    },
    watch: {
        cachTinh: function (val) {
            if (val === 1) {
                this.TuNgay = ''
                this.DenNgay = ''
            }
        },
    },
    computed: {
        defaultPickerValue: function () {
            let thangNamChuKy = '01/' + this.thangchuky + '/' + this.namchuky
            this.DinhDangNgay = dayjs(thangNamChuKy, 'DD/MM/YYYY')
            return dayjs(thangNamChuKy, 'DD/MM/YYYY')
        },
    },
    methods: {
        onCloseModal() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            if ($this.cachTinh === 0) {
                if ($this.TuNgay === '' || $this.DenNgay === '') {
                    $this.$message.warning('Vui lòng nhập ngày')
                    return
                }
            }
            const res = await lichLamViecService.LichLamViec_TinhCong_HuyChotCong({
                MauBangCong_Id: $this.maubangcongid,
                LichLamViec_Id: $this.lichlamviecid,
                // Is_TatCaNgay: $this.cachTinh,
                // TuNgay: $this.TuNgay === '' ? $this.TuNgay : $this.TuNgay === null ? '' : $this.TuNgay.format('YYYY-MM-DD'),
                // DenNgay: $this.DenNgay === '' ? $this.DenNgay : $this.DenNgay === null ? '' : $this.DenNgay.format('YYYY-MM-DD'),
            })
            if (res) {
                $this.onCloseModal()
                $this.$emit('onFinish')
                $this.$message.success('Hủy khóa công thành công!')
            }
        },
        disabledDate(current) {
            let startOfMonth = this.DinhDangNgay.startOf('month')
            let endOfMonth = this.DinhDangNgay.endOf('month')
            return current && (current < startOfMonth || current > endOfMonth)
        },
    },
}
</script>
