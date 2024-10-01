<template>
    <uc-form-modal v-model:isOpen="isOpen" :formData="form" :rules="rules" title="Sao chép ca" :width="400" @onSubmit="onSubmit()" @onClose="handleCancel()" okText="Sao chép">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Sao chép từ chu kỳ" name="LichLamViec_Id_Clone">
                    <a-select v-model:value="form.LichLamViec_Id_Clone">
                        <a-select-option :key="item.LichLamViec_Id" v-for="item in dsChuKy" :value="item.LichLamViec_Id">
                            <span>Tháng {{ item.Thang }}/{{ item.Nam }} </span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Lựa chọn">
                    <a-select v-model:value="form.CachTinh">
                        <a-select-option :key="item.id" v-for="item in CachTinhArr" :value="item.id">
                            <span>{{ item.TenCachTinh }}</span>
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Từ ngày">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="form.TuNgay" :disabled="form.CachTinh === 1" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Đến ngày">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="form.DenNgay" :disabled="form.CachTinh === 1" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" class="w-100" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record', 'lichlamviecid', 'maubangcongid', 'dsChuKy', 'thangchuky', 'namchuky'],
    data() {
        return {
            CachTinhArr: [
                {
                    id: 1,
                    TenCachTinh: 'Tất cả các ngày',
                },
                {
                    id: 0,
                    TenCachTinh: 'Từ ngày đến ngày',
                },
            ],
            form: {
                LichLamViec_Id: this.lichlamviecid,
                LichLamViec_Id_Clone: null,
                MauBangCong_Id: this.maubangcongid,
                CachTinh: 1,
                TuNgay: '',
                DenNgay: '',
            },
            rules: {
                LichLamViec_Id_Clone: [{ required: true, message: 'Vui lòng chọn Sao chép từ chu kỳ', trigger: 'change' }],
            },
            DinhDangNgay: '',
        }
    },
    watch: {
        'form.CachTinh': function (CachTinh) {
            if (CachTinh === 1) {
                this.form.TuNgay = null
                this.form.DenNgay = null
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
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
            $this.search = ''
            $this.selectedRowKeys = []
        },
        async onSubmit() {
            const $this = this
            console.log(this.form)
            $this.isLoading = true
            const res = await lichLamViecService.LichLamViec_PhanCa_Clone({
                LichLamViec_Id_Clone: this.form.LichLamViec_Id_Clone,
                LichLamViec_Id: this.form.LichLamViec_Id,
                MauBangCong_Id: this.form.MauBangCong_Id,
                Is_TatCaNgay: this.form.CachTinh === 1 ? true : false,
                TuNgay: this.form.CachTinh === 1 ? null : this.form.TuNgay.format('YYYY-MM-DD'),
                DenNgay: this.form.CachTinh === 1 ? null : this.form.DenNgay.format('YYYY-MM-DD'),
            })
            if (res) {
                $this.$emit('onFinish')
                $this.handleCancel()
                this.$message.success('Sao chép ca thành công!')
            }
            $this.isLoading = false
        },
        disabledDate(current) {
            let startOfMonth = this.DinhDangNgay.startOf('month')
            let endOfMonth = this.DinhDangNgay.endOf('month')
            return current && (current < startOfMonth || current > endOfMonth)
        },
    },
}
</script>
