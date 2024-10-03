<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm chính sách" :formData="formData" :rules="rules" @onClose="oncancel()"
        @onSubmit="onsubmit()" :isSubmit="states.isLoadingModal" :width="1000">
        <a-row :gutter="[25]">
            <a-col :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Tên chính sách" name="TenChinhSach_LamThem">
                            <a-input v-model:value="formData.TenChinhSach_LamThem" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã chính sách" name="MaChinhSach_LamThem">
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
                        <a-form-item label="Nhóm chính sách" name="NhomChinhSach_LamThem_Id">
                            <a-select v-model:value="formData.NhomChinhSach_LamThem_Id">
                                <a-select-option v-for="item in dsNhomChinhSach"
                                    :value="item.NhomChinhSach_LamThem_Id">{{ item.TenNhomChinhSach_LamThem }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Cách Duyệt">
                            <a-select v-model:value="formData.LuongDuyet_Id">
                                <a-select-option :value="1">Một người duyệt</a-select-option>
                                <a-select-option :value="2">Duyệt lần lượt</a-select-option>
                                <a-select-option :value="3">Duyệt song song</a-select-option>
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
                </a-row>
            </a-col>

            <a-col :span="12" class="border-start">
                <a-row :gutter="[10]">
                    <a-col :span="24" class="mb-3">
                        <a-form-item label="Người quản lý hoặc người theo dõi" class="mb-2">
                            <a-table size="small" :columns="columns.NguoiQuanLy" :dataSource="formData.DS_NguoiQuanLy"
                                :pagination="false">
                                <template #bodyCell="{ record, index, column }">
                                    <template v-if="column.key === 'VaiTro'">
                                        <span>{{ record.Is_NguoiDuyet === 0 ? 'Người theo dõi' : 'Người Duyệt' }}</span>
                                    </template>

                                    <template v-else-if="column.key === 'Action'">
                                        <a-dropdown :trigger="['click']">
                                            <a class="ant-dropdown-link">
                                                <uc-icon name="dots-horizontal" />
                                            </a>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item @click="onEditNguoiQuanLy(record, index)"><uc-icon
                                                            class="text-primary" name="square-edit-outline" />Chỉnh
                                                        sửa</a-menu-item>
                                                    <a-menu-item @click="onRemoveNguoiQuanLyAt(index)"><uc-icon
                                                            class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                </template>
                            </a-table>
                        </a-form-item>
                        <a @click="states.isOpenModalAddNguoiQuanLy = true"><uc-icon name="plus" />Thêm nhân sự.</a>
                    </a-col>
                    <a-col :span="24" class="mb-3">
                        <a-form-item label="">
                            <a-checkbox v-model:checked="formData.Is_TrungCa">Yêu cầu đề xuất thời gian tăng ca không
                                trùng với ca
                                làm việc.</a-checkbox>
                            <a-checkbox v-model:checked="formData.Is_KhungGio_DinhNghia">Yêu cầu đề xuất thời gian tăng
                                ca trong
                                khung giờ đã định nghĩa.</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.Is_KhungGio_DinhNghia">
                        <a-form-item class="mb-2">
                            <a-table size="small" :columns="columns.KhungGio" :dataSource="formData.DS_KhungGio"
                                :pagination="false">
                                <template #bodyCell="{ record, index, column }">
                                    <template v-if="column.key === 'Action'">
                                        <a-dropdown :trigger="['click']">
                                            <a class="ant-dropdown-link">
                                                <uc-icon name="dots-horizontal" />
                                            </a>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item @click="onEditKhungThoiGian(record, index)"><uc-icon
                                                            class="text-primary" name="square-edit-outline" />Chỉnh
                                                        sửa</a-menu-item>
                                                    <a-menu-item @click="onKhungThoiGianRemoveAt(index)"><uc-icon
                                                            class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                </template>
                            </a-table>
                        </a-form-item>
                        <a @click="states.isOpenModalAddKhungGio = true"><uc-icon name="plus" />Thêm khung giờ.</a>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <uc-modal-add-khung-thoi-gian v-model:isOpen="states.isOpenModalAddKhungGio"
            @onFinish="onFinishAddKhungThoiGian" />
        <uc-modal-edit-khung-thoi-gian :record="value.recordEditKhungThoiGian"
            v-model:isOpen="states.isOpenModalEditKhungGio" @onFinish="onFinishEditKhungThoiGian" />

        <uc-modal-add-nguoi-quan-ly v-model:isOpen="states.isOpenModalAddNguoiQuanLy"
            @onFinish="onFinishAddNguoiQuanLy" />
        <uc-modal-edit-nguoi-quan-ly :record="value.recordNguoiQuanLy"
            v-model:isOpen="states.isOpenModalEditNguoiQuanLy" @onFinish="onFinishEditNguoiQuanLy" />
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'dsNhomChinhSach'],
    data() {
        return {
            states: {
                isLoadingTableNGuoiQuanLy: false,
                isLoadingModal: false,
                isOpenModalAddKhungGio: false,
                isOpenModalEditKhungGio: false,
                isOpenModalAddNguoiQuanLy: false,
                isOpenModalEditNguoiQuanLy: false,
            },
            value: {
                indexEdit: null,
                recordEditKhungThoiGian: {},
                recordNguoiQuanLy: {},
            },
            formData: {
                NhomChinhSach_LamThem_Id: null,
                TenChinhSach_LamThem: null,
                MaChinhSach_LamThem: null,
                LoaiNgayApDung: null,
                LuongDuyet_Id: null,
                NgayGioiHan: 0,
                NguoiTheoDoi_Id: null,
                HeSo: null,
                MaHeSo: '',
                MoTa: null,
                ThoiHan_Duyet: 0,
                GioiHan_OT_Ngay: 0,
                GioiHan_OT_ChuKy: 0,
                Is_TamKhoa: 0,
                Is_TrungCa: false,
                Is_KhungGio_DinhNghia: false,
                DS_KhungGio: [],
                DS_NguoiQuanLy: [],
            },
            dataDefault: {
                NhomChinhSach_LamThem_Id: null,
                TenChinhSach_LamThem: null,
                MaChinhSach_LamThem: null,
                LoaiNgayApDung: null,
                LuongDuyet_Id: null,
                NgayGioiHan: 0,
                NguoiTheoDoi_Id: null,
                HeSo: null,
                MaHeSo: '',
                MoTa: null,
                ThoiHan_Duyet: 0,
                GioiHan_OT_Ngay: 0,
                GioiHan_OT_ChuKy: 0,
                Is_TamKhoa: 0,
                Is_TrungCa: false,
                Is_KhungGio_DinhNghia: false,
                DS_KhungGio: [],
                DS_NguoiQuanLy: [],
            },
            columns: {
                KhungGio: [
                    {
                        title: 'Giờ bắt đầu',
                        dataIndex: 'GioBatDau',
                        align: 'center',
                    },
                    {
                        title: 'Giờ kết thúc',
                        dataIndex: 'GioKetThuc',
                        align: 'center',
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                    },
                ],
                NguoiQuanLy: [
                    {
                        title: 'STT duyệt',
                        dataIndex: 'ThuTu',
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'HoVaTenNhanVien',
                    },
                    {
                        title: 'Vai trò',
                        dataIndex: 'Is_NguoiDuyet',
                        key: 'VaiTro',
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                    },
                ],
            },
            rules: {
                NhomChinhSach_LamThem_Id: [{ required: true, message: 'Vui lòng chọn nhóm chính sách', trigger: 'change' }],
                TenChinhSach_LamThem: [{ required: true, message: 'Vui lòng nhập tên chính sách', trigger: 'change' }],
                MaChinhSach_LamThem: [{ required: true, message: 'Vui lòng nhập mã chính sách', trigger: 'change' }],
            },
        }
    },
    methods: {
        oncancel() {
            this.$emit('update:isOpen', false)
            this.formData = Object.assign({}, this.dataDefault)
        },
        async onsubmit() {
            this.states.isLoadingModal = true
            const params = {
                NhomChinhSach_LamThem_Id: this.formData.NhomChinhSach_LamThem_Id,
                TenChinhSach_LamThem: this.formData.TenChinhSach_LamThem,
                MaChinhSach_LamThem: this.formData.MaChinhSach_LamThem,
                LoaiNgayApDung: this.formData.LoaiNgayApDung,
                CachDuyet: this.formData.LuongDuyet_Id,
                MaHeSo: this.formData.MaHeSo,
                HeSo: this.formData.HeSo,
                MoTa: this.formData.MoTa,
                GioiHan_GioDuyet: this.formData.ThoiHan_Duyet,
                GioiHan_NgayDeXuat: this.formData.NgayGioiHan,
                GioiHan_GioTangCa_Ngay: this.formData.GioiHan_OT_Ngay,
                GioiHan_GioTangCa_ChuKy: this.formData.GioiHan_OT_ChuKy,
                Is_TrungCa: this.formData.Is_TrungCa ? 1 : 0,
                Is_KhungGio: this.formData.Is_KhungGio ? 1 : 0,
                KhungGio_JSON: this.formData.DS_KhungGio,
                NguoiQuanLy_JSON: this.formData.DS_NguoiQuanLy,
            }
            const res = await chinhSachService.ChinhSach_LamThem_Insert(params).finally(() => {
                this.states.isLoadingModal = false
            })
            if (res) {
                this.oncancel()
                this.$emit('onFinish')
                this.$message.success('Thêm chính sách thành công!')
            }
        },
        onFinishAddKhungThoiGian(record) {
            this.formData.DS_KhungGio.push(record)
        },
        onFinishEditKhungThoiGian(record) {
            this.formData.DS_KhungGio = this.formData.DS_KhungGio.map((e, idx) => {
                if (idx === this.value.indexEdit) {
                    return (e = record)
                }
            })
            this.value.indexEdit = null
        },
        onKhungThoiGianRemoveAt(index) {
            this.formData.DS_KhungGio = this.formData.DS_KhungGio.filter((_, i) => i !== index)
        },
        onEditKhungThoiGian(record, index) {
            this.value.recordEditKhungThoiGian = Object.assign({}, record)
            this.value.recordEditKhungThoiGian.GioBatDau = dayjs(record.GioBatDau, 'HH:mm')
            this.value.recordEditKhungThoiGian.GioKetThuc = dayjs(record.GioKetThuc, 'HH:mm')
            this.states.isOpenModalEditKhungGio = true
            this.value.indexEdit = index
        },
        async onFinishAddNguoiQuanLy(record) {
            this.states.isLoadingTableNGuoiQuanLy = true
            const isSelect = await nhanVienService
                .NhanVien_Select_By_Id({
                    NhanVien_Id: record.NguoiQuanLy_Id,
                })
                .finally(() => {
                    this.states.isLoadingTableNGuoiQuanLy = false
                })

            if (isSelect) {
                const temp = {
                    ...record,
                    "ThuTu": record.ThuTu ?? 0,
                    HoVaTenNhanVien: isSelect.ThongTinNhanSu.HoVaTenNhanVien,
                }
                this.formData.DS_NguoiQuanLy.push(temp)
            }
        },
        onFinishEditNguoiQuanLy(record) {
            this.formData.DS_NguoiQuanLy = this.formData.DS_NguoiQuanLy.map((e, idx) => {
                if (idx === this.value.indexEdit) {
                    return (e = record)
                }
            })
            this.value.indexEdit = null
        },
        onRemoveNguoiQuanLyAt(index) {
            this.formData.DS_NguoiQuanLy = this.formData.DS_NguoiQuanLy.filter((_, i) => i !== index)
        },
        onEditNguoiQuanLy(record, index) {
            this.value.recordNguoiQuanLy = Object.assign({}, record)
            this.states.isOpenModalEditNguoiQuanLy = true
            this.value.indexEdit = index
        },
    },
}
</script>
