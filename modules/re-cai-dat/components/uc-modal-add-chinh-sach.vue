<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm chính sách" :formData="formData" :rules="rules" @onClose="oncancel()"
        @onSubmit="onsubmit()" :isSubmit="states.isLoadingModal" :width="1000">
        <a-row :gutter="[25]">
            <a-col :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Tên chính sách">
                            <a-input v-model:value="formData.TenChinhSach_LamThem" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã chính sách">
                            <a-input v-model:value="formData.MaChinhSach_LamThem" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Loại ngày áp dụng chính sách">
                            <a-select v-model:value="formData.LoaiNgayApDung">
                                <a-select-option :value="1">tất cả</a-select-option>
                                <a-select-option :value="2">Ngày đi làm</a-select-option>
                                <a-select-option :value="3">Ngày nghỉ hằng tuần</a-select-option>
                                <a-select-option :value="4">Ngày lễ</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã hệ số" name="MaHeSo">
                            <a-input v-model:value="formData.MaHeSo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Hệ số" name="HeSo">
                            <a-input-number v-model:value="formData.HeSo" :step="0.01" class="w-100" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Thời hạn để duyệt">
                            <a-input-number v-model:value="formData.ThoiHan_Duyet" :min="0" class="w-100">
                                <template #addonAfter>Giờ</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Khoảng ngày giới hạn">
                            <a-input-number v-model:value="formData.NgayGioiHan" :min="0" class="w-100">
                                <template #addonAfter>Ngày</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Giới hạn giờ tăng ca trong ngày">
                            <a-input-number v-model:value="formData.GioiHan_OT_Ngay" :min="0" class="w-100">
                                <template #addonAfter>Giờ</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Giới hạn giờ tăng ca trong chu kỳ">
                            <a-input-number v-model:value="formData.GioiHan_OT_ChuKy" :min="0" class="w-100">
                                <template #addonAfter>Giờ</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Mô tả">
                            <a-textarea v-model:value="formData.MoTa" class="w-100" />
                        </a-form-item>
                    </a-col>


                    <a-col :span="12">
                        <a-select v-model:value="formData.Is_TamKhoa">
                            <a-select-option :value="0">Không</a-select-option>
                            <a-select-option :value="1">Tạm Khoá</a-select-option>
                        </a-select>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :span="12" class="border-start">
                <a-row :gutter="[10]">
                    <a-col :span="24" class="mb-3">
                        <a-form-item label="Người quản lý hoặc người theo dõi">
                            <a-table class="mb-3" size="small" :columns="columns.NguoiQuanLy" :pagination="false"></a-table>
                        </a-form-item>
                        <a @click="states.isOpenModalKhungGioSang = true"><uc-icon name="plus" />Thêm nhân sự.</a>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="">
                            <a-checkbox v-model:checked="formData.Is_KhongTrungThoiGianLamViec">Yêu cầu đề xuất thời
                                gian tăng ca
                                không trùng với ca làm việc.</a-checkbox>
                            <a-checkbox v-model:checked="formData.Is_KhungGio_DinhNghia">Yêu cầu đề xuất thời gian tăng
                                ca trong
                                khung giờ đã định nghĩa.</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.Is_KhungGio_DinhNghia" class="mb-3">
                        <a-table class="mb-3" size="small" :columns="columns.KhungGio" :dataSource="formData.DS_KhungGio"
                            :pagination="false">
                            <template #bodyCell="{  record, index, column }">
                                <template v-if="column.key === 'Action'">
                                    <a-dropdown :trigger="['click']">
                                        <a class="ant-dropdown-link">
                                            <uc-icon name="dots-horizontal" />
                                        </a>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item @click="onEditKhungThoiGian(record,index)"><uc-icon class="text-primary"
                                                        name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                                <a-menu-item @click="onKhungThoiGianRemoveAt(index)"><uc-icon class="text-red"
                                                        name="delete-outline" />Xoá</a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </template>
                            </template>
                        </a-table>
                        <a @click="states.isOpenModalAddKhungGio = true"><uc-icon name="plus" />Thêm khung giờ.</a>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <uc-modal-add-khung-thoi-gian v-model:isOpen="states.isOpenModalAddKhungGio" @onFinish="onFinishAddKhungThoiGian" />
        <uc-modal-edit-khung-thoi-gian :record="value.recordEditKhungThoiGian" v-model:isOpen="states.isOpenModalEditKhungGio" @onFinish="onFinishEditKhungThoiGian" />
   </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen'],
    data() {
        return {
            states: {
                isLoadingModal: false,
                isOpenModalAddKhungGio: false,
                isOpenModalEditKhungGio: false,
            },
            value: {
                indexEdit: null,
                recordEditKhungThoiGian: {}
                
            },
            formData: {
                NhomChinhSach_LamThem_Id: null,
                TenChinhSach_LamThem: null,
                MaChinhSach_LamThem: null,
                MaCaNgay: null,
                MaCaDem: null,
                LoaiNgayApDung: null,
                LuongDuyet_Id: null,
                NgayGioiHan: 0,
                NguoiTheoDoi_Id: null,
                HeSo: null,
                MaHeSo: "",
                MoTa: null,
                ThoiHan_Duyet: 0,
                GioiHan_OT_Ngay: 0,
                GioiHan_OT_ChuKy: 0,
                Is_TamKhoa: 0,
                Is_KhongTrungThoiGianLamViec: false,
                Is_KhungGio_DinhNghia: false,
                DS_KhungGio: [],
                DS_NguoiQuanLy: []

            },
            columns: {
                KhungGio: [
                    {
                        title: "Giờ bắt đầu",
                        dataIndex: "GioBatDau",
                        align: 'center'
                    },
                    {
                        title: "Giờ kết thúc",
                        dataIndex: "GioKetThuc",
                        align: 'center'
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                    }
                ],
                NguoiQuanLy: [
                    {
                        title: "STT",
                        dataIndex: "stt",
                    },
                    {
                        title: "Họ Và Tên",
                        dataIndex: "stt",
                    },
                    {
                        tille: "Vai Trò",
                        key: "VaiTro"
                    }
                ]
            },
            rules: {},
        }
    },
    methods: {
        oncancel() {
            this.$emit('update:isOpen', false)
            isOpenModalAddKhungGio = false
        },
        async onsubmit() { },
        onFinishAddKhungThoiGian(record) {
            this.formData.DS_KhungGio.push(record)
        },
        onFinishEditKhungThoiGian(record) {
            this.formData.DS_KhungGio = this.formData.DS_KhungGio.map((e,idx) => {
                if(idx === this.value.indexEdit) {
                    return e = record
                }
            })
            this.value.indexEdit = null
        },
        onKhungThoiGianRemoveAt(index) {
            this.formData.DS_KhungGio = this.formData.DS_KhungGio.filter((_, i) => i !== index);
        },
        onEditKhungThoiGian(record,index) { 
            this.value.recordEditKhungThoiGian = Object.assign({},record)
            this.value.recordEditKhungThoiGian.GioBatDau = dayjs(record.GioBatDau, 'HH:mm')
            this.value.recordEditKhungThoiGian.GioKetThuc = dayjs(record.GioKetThuc, 'HH:mm')
            this.states.isOpenModalEditKhungGio = true
            this.value.indexEdit = index
        },
    },
}
</script>
