<template>
    <div>
        <uc-modal v-model:isOpen="isOpen" :title="Title" :width="800" @onClose="onCloseModal()" ref="refFormModal" okText="Xóa" @onSubmit="onDeleteCaHangLoat()">
            <a-spin :spinning="spinning" :delay="delayTime">
                <a-form layout="vertical" class="mt-3">
                    <a-row :gutter="[10]">
                        <a-col :span="6">
                            <a-form-item label="Lựa chọn">
                                <a-select v-model:value="cachTinh">
                                    <a-select-option v-for="item in cachTinhArr" :value="item.id">
                                        <span>{{ item.TenCachTinh }}</span>
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="5">
                            <a-form-item label="Từ ngày">
                                <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="TuNgay" :disabled="cachTinh === 1" class="w-100" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="5">
                            <a-form-item label="Đến ngày">
                                <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="DenNgay" :disabled="cachTinh === 1" class="w-100" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
                <a-divider />
                <a-checkbox class="px-3 mb-2" v-model:checked="is_TatCa" @change="onHandleChange()"
                    ><b>Chọn tất cả ({{ localItems.filter((x) => x.Is_Xoa === true).length }} nhân sự)</b>
                </a-checkbox>
                <a-list :data-source="localItems" size="small" style="overflow-y: auto; max-height: 470px">
                    <template #renderItem="{ item }">
                        <a-list-item class="py-0" style="height: 30px">
                            <a-list-item-meta>
                                <template #title>
                                    <a-checkbox v-model:checked="item.Is_Xoa" style="margin-right: 4px" /> <span class="fw-medium">[{{ item.MaNhanVien }}] {{ item.HoVaTenNhanVien }}</span>
                                </template>
                            </a-list-item-meta>
                            <a-tag v-if="item.TrangThaiTinh === 1" color="blue"><a-spin class="me-1" size="small" />Đang tính</a-tag>
                            <a-tag v-if="item.TrangThaiTinh === 2" color="success"><uc-icon class="me-1" name="check-circle-outline" />Hoàn thành</a-tag>
                            <a-tag v-if="item.TrangThaiTinh === 4"><uc-icon class="me-1" name="alert-circle-outline" />Chưa phân ca</a-tag>
                            <a-tag v-if="item.TrangThaiTinh === 3" class="cursor-pointer" @click="onRedirectToError(item)" color="error"><uc-icon class="me-1" name="minus-circle-outline" />Lỗi</a-tag>
                        </a-list-item>
                    </template>
                </a-list>
            </a-spin>
        </uc-modal>
    </div>
</template>
<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'lichlamviecid', 'maubangcongid', 'dsnhanvien', 'thangchuky', 'namchuky', 'ctbangcong'],
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
            Loading: {
                text: null,
                IsLoadingPage: false,
                processIndex: 0,
                processTotal: 0,
            },
            Loading_Default: {
                text: null,
                IsLoadingPage: false,
                processIndex: 0,
                processTotal: 0,
            },
            DinhDangNgay: '',
            is_TatCa: true,
            localItems: [],
            spinning: false,
            delayTime: 0,
        }
    },
    watch: {
        cachTinh: function (val) {
            if (val === 1) {
                this.TuNgay = ''
                this.DenNgay = ''
            }
        },
        isOpen: function (val) {
            if (val) {
                let DSNhanVien = Object.assign([], this.dsnhanvien)
                this.localItems = DSNhanVien.map((x) => {
                    return { ...x, Is_Xoa: null }
                })
                this.onHandleChange()
            }
        },
    },
    created() {},
    computed: {
        Title: function () {
            return `Xóa ca hàng loạt: ${this.thangchuky}/${this.namchuky} - Lịch làm việc: ${this.ctbangcong?.TenMauBangCong}`
        },
        defaultPickerValue: function () {
            let thangNamChuKy = '01/' + this.thangchuky + '/' + this.namchuky
            this.DinhDangNgay = dayjs(thangNamChuKy, 'DD/MM/YYYY')
            return dayjs(thangNamChuKy, 'DD/MM/YYYY')
        },
    },
    methods: {
        onCloseModal() {
            this.spinning = false
            this.cachTinh = 1
            this.$emit('onFinish')
            this.$emit('update:isOpen', false)
        },
        disabledDate(current) {
            let startOfMonth = this.DinhDangNgay.startOf('month')
            let endOfMonth = this.DinhDangNgay.endOf('month')
            return current && (current < startOfMonth || current > endOfMonth)
        },
        onHandleChange() {
            if (this.is_TatCa) {
                this.localItems = this.localItems.map((x) => {
                    x.Is_Xoa = true
                    return x
                })
            } else {
                this.localItems = this.localItems.map((x) => {
                    x.Is_Xoa = false
                    return x
                })
            }
        },
        onDeleteCaHangLoat() {
            let NhanVien_Id_List = this.localItems
                .filter((x) => x.Is_Xoa === true)
                .map((item) => {
                    return item.NhanVien_Id
                })
            Confirm.confirm({
                content: 'Xác nhận xóa ca hàng loạt',
                onOk: async () => {
                    let params = {
                        LichLamViec_Id: this.lichlamviecid,
                        MauBangCong_Id: this.maubangcongid,
                        Is_TatCaNgay: this.cachTinh,
                        TuNgay: this.TuNgay === '' ? '' : this.TuNgay.format('YYYY-MM-DD'),
                        DenNgay: this.DenNgay === '' ? '' : this.DenNgay.format('YYYY-MM-DD'),
                        Is_TatCaNhanVien: this.is_TatCa,
                        NhanVien_Id_List: NhanVien_Id_List.join(','),
                    }
                    const res = await lichLamViecService.LichLamViec_PhanCa_Delete_HangLoat(params)
                    if (res) {
                        this.$message.success('Xóa ca hàng loạt thành công')
                        this.onCloseModal()
                    }
                },
            })
        },
    },
}
</script>
