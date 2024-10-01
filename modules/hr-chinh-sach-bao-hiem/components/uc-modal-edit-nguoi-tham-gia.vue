<template>
    <uc-form-modal :isOpen="isOpen" ref="modalRef" title="Cập nhật dữ liệu bảo hiểm" :formData="record" :width="600" @onSubmit="onSubmit()" isSubmit="isLoading" @onClose="onCancel()">
        <a-row :gutter="[10]">
            <a-col :sm="24" :md="24">
                <a-form-item label="Nhân sự" name="NhanVien_Id">
                    <a-input v-model:value="record.HoVaTenNhanVien" :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Chính sách bảo hiểm" name="ChinhSach_BaoHiem_Id">
                    <a-select v-model:value="record.ChinhSach_BaoHiem_Id">
                        <a-select-option v-for="bh in dsBaoHiem" :value="bh.ChinhSach_BaoHiem_Id">{{ bh.TenChinhSach }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Lương đóng bảo hiểm" v-if="dsBaoHiem.filter((e) => e.ChinhSach_BaoHiem_Id === record.ChinhSach_BaoHiem_Id)[0]?.LoaiLuong === 3" name="LuongDongBaoHiem">
                    <a-input-number v-model:value="record.LuongDongBaoHiem" :formatter="formatter" :parser="parser" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Mục đích tạo ra" name="MucDichTao">
                    <a-select v-model:value="record.MucDichTao">
                        <a-select-option :value="1">Tạo đăng ký mới</a-select-option>
                        <a-select-option :value="2">Ghi đè đăng ký cuối cùng</a-select-option>
                        <a-select-option :value="3">Tạo đăng ký trong quá khứ</a-select-option>
                        <a-select-option :value="4">Tạo đăng ký đầu tiên</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :sm="12" :md="12">
                <a-form-item label="Chọn ngày tham gia" name="NgayThamGia">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="record.NgayThamGia" :formatter="formatter" :parser="parser" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :sm="24" :md="24">
                <a-form-item label="Ghi chú thêm">
                    <a-textarea :rows="2" v-model:value="record.GhiChu" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    props: ['isOpen', 'record'],
    emits: ['update:isOpen'],
    data() {
        return {
            isLoading: false,
            dsBaoHiem: [],
        }
    },
    mounted() {
        this.loadBaoHiem()
    },
    computed: {},
    watch: {},
    methods: {
        loadBaoHiem() {
            ajaxCALL('/work/HR_ChinhSach_BaoHiem_Select', {}, (res) => {
                this.dsBaoHiem = res.data
            })
        },
        onCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            $this.isLoading = true

            const res = await nhanVienBaoHiemService.NhanVien_ChinhSach_BaoHiem_Update({
                NhanVien_ChinhSach_BaoHiem_Id: $this.record.NhanVien_ChinhSach_BaoHiem_Id,
                NgayThamGia: $this.record.NgayThamGia.format('YYYY/MM/DD'),
                LuongDongBaoHiem: $this.record.LuongDongBaoHiem,
                ChinhSach_BaoHiem_Id: $this.record.ChinhSach_BaoHiem_Id,
                GhiChu: $this.record.GhiChu,
                MucDichTao: $this.record.MucDichTao,
            })
            if (res) {
                $this.onCancel()
                $this.$emit('onFinish')
                $this.$message.success('Cập nhật dữ liệu bảo hiểm cho nhân sự thành công!')
                $this.$refs.modalRef.$refs.formRef.resetFields()
            }
            $this.isLoading = false
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
    },
}
</script>
