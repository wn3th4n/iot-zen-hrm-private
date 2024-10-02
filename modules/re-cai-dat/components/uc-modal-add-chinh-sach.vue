<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm chính sách" :formData="formData" :rules="rules" @onClose="oncancel()"
        @onSubmit="onsubmit()" :isSubmit="states.isLoadingModal" :width="1200">
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

                  

                    <a-col span="12"></a-col>

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
                </a-row>
                <a-col :span="24">
                    <a-form-item label="Mô tả">
                        <a-textarea v-model:value="formData.MoTa" class="w-100" />
                    </a-form-item>
                </a-col>
               
            </a-col>
            <a-col :span="12" class="border-start">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Người quản lý">
                            
                        </a-form-item>
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

                    <a-col :span="24" v-if="formData.Is_KhungGio_DinhNghia">
                        <a-table size="small" :columns="columns" :dataSource="formData.DS_KhungGio" :pagination="false"></a-table>
                        <a @click="states.isOpenModalKhungGioSang = true"><uc-icon name="plus" />Thêm khung giờ.</a>
                    </a-col>


                </a-row>
            </a-col>
        </a-row>
        <uc-modal-add-khung-thoi-gian v-model:isOpen="states.isOpenModalKhungGioSang" />
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
                isOpenModalKhungGioSang: false,

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
            columns: [
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
            rules: {},
        }
    },
    methods: {
        oncancel() {
            this.$emit('update:isOpen', false)
            this.states.isOpenModalKhungGioSang = false
        },
        async onsubmit() { },
        onFinishAddKhungGioSang(record) {
            this.formData.DS_KhungGio.push(record)
        }
    },
}
</script>
