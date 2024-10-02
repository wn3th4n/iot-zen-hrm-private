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
                                <a-select-option :value="0">tất cả</a-select-option>
                                <a-select-option :value="1">Ngày đi làm</a-select-option>
                                <a-select-option :value="2">Ngày nghỉ hằng tuần</a-select-option>
                                <a-select-option :value="2">Ngày lễ</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã ca ngày">
                            <a-input v-model:value="formData.MaCaNgay" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã ca đêm">
                            <a-input v-model:value="formData.MaCaDem" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Luồng duyệt">
                            <a-select v-model:value="formData.LuongDuyet_Id">
                                <a-select-option :value="0">Một người duyệt</a-select-option>
                                <a-select-option :value="1">Duyệt lần lượt</a-select-option>
                                <a-select-option :value="2">Duyệt duyệt song song</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Người theo dõi">
                            <uc-select-nhan-vien v-model:value="formData.NguoiTheoDoi_Id" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Hệ số nhân của tăng ca trong ngày">
                            <a-input-number v-model:value="formData.HeSoCaNgay" :min="0" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Hệ số nhân của tăng ca qua đêm">
                            <a-input-number v-model:value="formData.HeSoCaDem" :min="0" />
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
            </a-col>
            <a-col :span="12" class="border-start">
                {{ formData }}
                <a-row :gutter="[10]">
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
                        <a-card title="Giờ trong ngày">
                            <a-table columns="columns" :data-source="formData.DS_KhungGio_TrongNgay"
                                :pagination="false">
                            </a-table>
                        </a-card>
                        <a @click=""></a>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </uc-form-modal>
    <uc-modal-add-khung-gio :isOpen="states.isOpenModalKhungGioSang" @onFinish="onFinishAddKhungGioSang" />
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
                LoaiNgayApDung: 0,
                LuongDuyet_Id: 0,
                NgayGioiHan: 0,
                NguoiTheoDoi_Id: null,
                HeSoCaNgay: 0,
                HeSoCaDem: 0,
                MoTa: null,
                ThoiHan_Duyet: 0,
                GioiHan_OT_Ngay: 0,
                GioiHan_OT_ChuKy: 0,
                Is_TamKhoa: 0,
                Is_KhongTrungThoiGianLamViec: false,
                Is_KhungGio_DinhNghia: false,
                DS_KhungGio_TrongNgay: [],
                DS_KhungGio_QuaDem: [],
                /*
                    {
                        GioBatDau: "",
                        GioKetThuc: """
                    }
                */
            },
            columns: [
                {
                    title: "giờ bắt đầu",
                    dataIndex: "",
                    align: 'center'
                },
                {
                    title: "giờ kết thúc",
                    dataIndex: "",
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
        },
        async onsubmit() { },
        onFinishAddKhungGioSang(record){
            this.formData.DS_KhungGio_TrongNgay.push(record)
        }
    },
}
</script>
