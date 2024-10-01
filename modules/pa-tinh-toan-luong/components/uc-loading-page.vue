<template>
    <uc-modal aria-hidden="false" v-model:isOpen="modelValue" :title="Title" @onClose="onCloseModal()" :width="800">
        <a-row :gutter="[10]">
            <a-col :span="24">
                Đang tính ({{ processIndex }}/{{ processTotal }}): <b v-if="DSNhanVienProcess.length > 0">[{{ DSNhanVienProcess[0]?.MaNhanVien }}] {{ DSNhanVienProcess[0]?.HoVaTenNhanVien }}</b>
            </a-col>
            <a-col :span="20">
                <a-progress :percent="percentProcess" class="mb-0 w-100" />
            </a-col>
            <a-col :span="4">
                <a-button block type="primary" @click="onSubmit" :disabled="!localItems.find((x) => x.IsTinhCong === true)"><uc-icon name="calculator-variant-outline" />Tính lương</a-button>
            </a-col>
            <a-col :span="6">
                Tính từ: <span v-if="ThoiGianBatDauTinh">{{ ThoiGianBatDauTinh }}</span>
                <span v-else>---</span>
            </a-col>
            <a-col :span="6">
                Hoàn thành: <span v-if="ThoiGianKetThucTinh">{{ ThoiGianKetThucTinh }}</span>
                <span v-else>---</span>
            </a-col>
            <a-col :span="12"></a-col>
        </a-row>
        <a-divider />
        <a-checkbox class="px-3 mb-2" v-model:checked="is_TatCa" @change="onHandleChange()"
            ><b>Chọn tất cả ({{ localItems.filter((x) => x.IsTinhCong === true).length }} nhân sự)</b>
        </a-checkbox>
        <a-list :data-source="localItems" size="small" style="overflow-y: auto; max-height: 470px">
            <template #renderItem="{ item }">
                <a-list-item class="py-0" style="height: 30px">
                    <a-list-item-meta>
                        <template #title>
                            <a-checkbox v-model:checked="item.IsTinhCong" style="margin-right: 4px" /> <span class="fw-medium">[{{ item.MaNhanVien }}] {{ item.HoVaTenNhanVien }}</span>
                        </template>
                    </a-list-item-meta>
                    <a-tag v-if="item.TrangThaiTinh === 1" color="blue"><a-spin class="me-1" size="small" />Đang tính</a-tag>
                    <a-tag v-if="item.TrangThaiTinh === 2" color="success"><uc-icon class="me-1" name="check-circle-outline" />Hoàn thành</a-tag>
                    <a-tag v-if="item.TrangThaiTinh === 4"><uc-icon class="me-1" name="alert-circle-outline" />Chưa phân ca</a-tag>
                    <a-tag v-if="item.TrangThaiTinh === 3" class="cursor-pointer" @click="onRedirectToError(item)" color="error"><uc-icon class="me-1" name="minus-circle-outline" />Lỗi</a-tag>
                </a-list-item>
            </template>
        </a-list>
        <uc-modal v-model:isOpen="isOpenModalLoi" :title="titleModalLoi" :width="600" @onClose="onCloseModalLoi()" ref="refFormModalLoi">
            <a-table :columns="columnsDSLoi" :data-source="nhanVienLoi.DSLoi.slice(0, 10)" size="small" :pagination="false" />
        </uc-modal>
    </uc-modal>
</template>
<script>
export default {
    emits: ['ConfirmTinhLuong', 'DSNhanVienTinhLuong', 'update:modelValue', 'onFinish', 'onCloseModal'],
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        processIndex: {
            type: Number,
            default: 0,
        },
        processTotal: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
            default: '',
        },
        ThoiGianBatDauTinh: {
            type: String,
            default: '',
        },
        ThoiGianKetThucTinh: {
            type: String,
            default: '',
        },
        DSNhanVienProcess: {
            type: Array,
            default: [],
        },
        dsnhanvien: {
            type: Array,
            default: [],
        },
        dsnhanvienloi: {
            type: Array,
            default: [],
        },
        thangchuky: {
            type: String,
            default: '',
        },
        namchuky: {
            type: String,
            default: '',
        },
        ctmaubangluong: {
            type: Object,
            default: {},
        },
        ctchukyluong: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            is_TatCa: true,
            localItems: [],
            isOpenModalLoi: false,
            nhanVienLoi: {
                HoVaTenNhanVien: '',
                MaNhanVien: '',
                NhanVien_Id: null,
                DSLoi: [],
            },
            DSNhanVienLoi: [],
            columnsDSLoi: [
                {
                    title: 'ID',
                    dataIndex: 'Id',
                    align: 'center',
                },
                {
                    title: 'Biến lỗi',
                    dataIndex: 'Ma',
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'GiaTri',
                    align: 'center',
                },
                {
                    title: 'Loại thuộc tính',
                    dataIndex: 'Loai',
                },

                {
                    title: 'Lỗi',
                    dataIndex: 'ErrorMessage',
                },
            ],
        }
    },
    watch: {
        modelValue: function (val) {
            if (val) {
                this.localItems = Object.assign([], this.dsnhanvien)
                this.localItems = this.localItems.map((x) => {
                    return { ...x, IsTinhCong: false, TrangThaiTinh: null }
                })
                this.onHandleChange()
            }
        },
    },
    computed: {
        percentProcess: function () {
            const $this = this
            const percent = ($this.processIndex / $this.processTotal) * 100
            return parseInt(percent)
        },
        Title: function () {
            return `Tính lương - Chu kỳ: ${this.ctchukyluong.Thang}/${this.ctchukyluong.Nam} - Bảng lương: ${this.ctmaubangluong?.TenMauBangLuong}`
        },
        titleModalLoi: function () {
            return `Kết quả lỗi [${this.nhanVienLoi.MaNhanVien}] ${this.nhanVienLoi.HoVaTenNhanVien}`
        },
    },
    methods: {
        onCloseModal() {
            this.$emit('onFinish')
            this.$emit('onCloseModal')
        },
        onSubmit() {
            this.$emit(
                'DSNhanVienTinhLuong',
                this.localItems.map((x) => {
                    x.TrangThaiTinh = null
                    return x
                }),
            )
            this.$emit('ConfirmTinhLuong')
        },
        onHandleChange() {
            if (this.is_TatCa) {
                this.localItems = this.localItems.map((x) => {
                    x.IsTinhCong = true
                    return x
                })
            } else {
                this.localItems = this.localItems.map((x) => {
                    x.IsTinhCong = false
                    return x
                })
            }
        },
        onRedirectToError(item) {
            this.isOpenModalLoi = true
            this.nhanVienLoi = this.dsnhanvienloi.find((x) => x.NhanVien_Id === item.NhanVien_Id)
        },
        onCloseModalLoi() {
            this.isOpenModalLoi = false
        },
    },
}
</script>
