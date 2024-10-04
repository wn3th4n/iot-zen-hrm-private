<template>
    <uc-form-modal :isOpen="isOpen" title="Sửa chính sách" :formData="record.ChinhSach" :rules="rules"
        @onClose="oncancel()" @onSubmit="onsubmit()" :isSubmit="states.isLoadingModal" :width="1200">
        <a-row :gutter="[25]">
            <a-col :span="10">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Tên chính sách" name="TenChinhSach_LamThem">
                            <a-input v-model:value="record.ChinhSach.TenChinhSach_LamThem" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã chính sách" name="MaChinhSach_LamThem">
                            <a-input v-model:value="record.ChinhSach.MaChinhSach_LamThem" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Loại ngày áp dụng chính sách">
                            <a-select v-model:value="record.ChinhSach.LoaiNgayApDung">
                                <a-select-option :value="1">Tất cả</a-select-option>
                                <a-select-option :value="2">Ngày đi làm</a-select-option>
                                <a-select-option :value="3">Ngày nghỉ hằng tuần</a-select-option>
                                <a-select-option :value="4">Ngày lễ</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Nhóm chính sách" name="NhomChinhSach_LamThem_Id">
                            <a-select v-model:value="record.ChinhSach.NhomChinhSach_LamThem_Id">
                                <a-select-option v-for="item in record.NhomChinhSach"
                                    :value="item.NhomChinhSach_LamThem_Id">{{
                                        item.TenNhomChinhSach_LamThem }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Nhóm nhân viên có quyền truy cập">
                            <uc-select-nhom-nhan-vien v-model:value="record.ChinhSach.NhomNhanVien_Id" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã hệ số" name="MaHeSo">
                            <a-input v-model:value="record.ChinhSach.MaHeSo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Hệ số" name="HeSo">
                            <a-input-number v-model:value="record.ChinhSach.HeSo" :step="0.01" class="w-100" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item>
                            <template #label>
                                <span>Thời hạn để duyệt
                                    <a-tooltip placement="topRight">
                                        <template #title>
                                            <span>Thời hạn (theo giờ) để duyệt đề xuất</span>
                                        </template>
                                        <uc-icon name="information" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-input-number v-model:value="record.ChinhSach.GioiHan_GioDuyet" :min="0" class="w-100">
                                <template #addonAfter>Giờ</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item>
                            <template #label>
                                <span>Khoảng ngày giới hạn
                                    <a-tooltip placement="topRight">
                                        <template #title>
                                            <span>
                                                Số ngày tối thiểu tạo trước đề xuất.
                                            </span>
                                            <br />
                                            <br />
                                            <span>
                                                Điền số âm để thiết lập số ngày có thể tạo đề xuất muộn tối đa.
                                            </span>
                                            <br />
                                            <br />
                                            <span>
                                                Để trống và nhân viên sẽ không tạo được đề xuất cho ngày trong quá khứ.
                                            </span>
                                        </template>
                                        <uc-icon name="information" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-input-number v-model:value="record.ChinhSach.GioiHan_NgayDeXuat" class="w-100">
                                <template #addonAfter>Ngày</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Giới hạn giờ tăng ca trong ngày">
                            <a-input-number v-model:value="record.ChinhSach.GioiHan_GioTangCa_Ngay" :min="0"
                                class="w-100">
                                <template #addonAfter>Giờ</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Giới hạn giờ tăng ca trong chu kỳ">
                            <a-input-number v-model:value="record.ChinhSach.GioiHan_GioTangCa_ChuKy" :min="0"
                                class="w-100">
                                <template #addonAfter>Giờ</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Mô tả">
                            <a-textarea v-model:value="record.ChinhSach.MoTa" class="w-100" />
                        </a-form-item>
                    </a-col>

                </a-row>
            </a-col>

            <a-col class="border-start" :span="14">
                <a-row :gutter="[10]">

                    <a-col :span="24" class="mb-3">
                        <a-form-item label="Danh sách người quản lý" class="mb-2">
                            <a-table size="small" :columns="columns.NguoiQuanLy" :pagination="false"
                                :loading="states.isLoadingTableNGuoiQuanLy"
                                :dataSource="record.dsNhanSu.filter(x => x.Is_NguoiDuyet === true)">
                                <template #emptyText>
                                    <a-empty style="padding: 10px !important">
                                        <template #image><uc-icon name="inbox" color="muted" size="25" /></template>
                                        <template #description><span style="font-size: 10px;" class="text-muted">Không
                                                có dữ liệu</span></template>
                                    </a-empty>
                                </template>
                                <template #bodyCell="{ record, index, column }">

                                    <template v-if="column.key === 'Action'">
                                        <span @click="onRemoveNguoiQuanLyAt(record)"><uc-icon class="text-red"
                                                name="delete-outline" /></span>
                                    </template>
                                    <template v-else-if="column.key === 'HoVaTenNhanVien'">
                                        <a-space size="small">
                                            <uc-avatar :src="record.AnhDaiDien_Url"
                                                :text="record.HoVaTenNhanVien"></uc-avatar>

                                            <b>{{ record.HoVaTenNhanVien }} </b> <br />
                                        </a-space>
                                    </template>
                                </template>
                            </a-table>
                        </a-form-item>
                        <div class="d-flex d-flex-row justify-content-between align-items-center mb-3">
                            <a-checkbox v-model:checked="record.ChinhSach.Is_QuanLyTrucTiep_Duyet">Cho phép quản lý
                                duyệt
                                trực
                                tiếp.</a-checkbox>
                            <a @click="onAddNguoiQuanLy(1)"><uc-icon name="plus" />Thêm người quản lý.</a>
                        </div>
                    </a-col>

                    <a-col :span="24" class="mb-3">
                        <a-form-item label="Danh sách người theo dõi" class="mb-2">
                            <a-table size="small" :columns="columns.NguoiQuanLy" :pagination="false"
                                :loading="states.isLoadingTableNGuoiQuanLy"
                                :dataSource="record.dsNhanSu.filter(x => x.Is_NguoiDuyet === false)">
                                <template #emptyText>
                                    <a-empty style="padding: 10px !important">
                                        <template #image><uc-icon name="inbox" color="muted" size="25" /></template>
                                        <template #description><span style="font-size: 10px;" class="text-muted">Không
                                                có dữ liệu</span></template>
                                    </a-empty>
                                </template>
                                <template #bodyCell="{ record, index, column }">
                                    <template v-if="column.key === 'Action'">
                                        <span @click="onRemoveNguoiQuanLyAt(record)"><uc-icon class="text-red"
                                                name="delete-outline" /></span>
                                    </template>
                                    <template v-else-if="column.key === 'HoVaTenNhanVien'">
                                        <a-space size="small">
                                            <uc-avatar :src="record.AnhDaiDien_Url"
                                                :text="record.HoVaTenNhanVien"></uc-avatar>

                                            <b>{{ record.HoVaTenNhanVien }} </b> <br />
                                        </a-space>
                                    </template>
                                </template>
                            </a-table>
                        </a-form-item>
                        <div class="d-flex d-flex-row justify-content-between align-items-center mb-3">
                            <a-checkbox v-model:checked="record.ChinhSach.Is_QuanLyTrucTiep_TheoDoi">Cho phép quản lý
                                trực tiếp
                                theo dõi.</a-checkbox>
                            <a @click="onAddNguoiQuanLy(0)"><uc-icon name="plus" />Thêm người theo dõi.</a>
                        </div>

                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="">
                            <a-checkbox v-model:checked="record.ChinhSach.Is_KhungGio">Yêu cầu đề xuất thời gian tăng
                                ca trong
                                khung giờ đã định nghĩa.</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" v-if="record.ChinhSach.Is_KhungGio">
                        <a-form-item class="mb-2">
                            <a-table size="small" :columns="columns.KhungGio" :dataSource="record.dsKhungGio"
                                :pagination="false">
                                <template #emptyText>
                                    <a-empty style="padding: 10px !important">
                                        <template #image><uc-icon name="inbox" color="muted" size="25" /></template>
                                        <template #description><span style="font-size: 10px;" class="text-muted">Không
                                                có dữ liệu</span></template>
                                    </a-empty>
                                </template>
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

                                    <template v-else-if="column.key === 'KhungGio'">
                                        <a-tag color="blue">
                                            <template #icon>
                                                <uc-icon name="clock-outline" />
                                            </template>
                                            {{ record.GioBatDau }} - {{ record.GioKetThuc }}
                                        </a-tag>
                                    </template>
                                    <template v-else-if="column.key === 'QuaDem'">
                                        <uc-icon class="text-success" v-if="record.Is_QuaDem" name="check-outline" />
                                    </template>
                                </template>
                            </a-table>
                        </a-form-item>
                        <div class="d-flex d-flex-row justify-content-between align-items-center mb-3">
                            <b></b>
                            <a @click="states.isOpenModalAddKhungGio = true"><uc-icon name="plus" />Thêm khung giờ.</a>
                        </div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

        <uc-modal-edit-add-khung-thoi-gian v-model:isOpen="states.isOpenModalAddKhungGio"
            :ChinhSach_LamThem_Id="record.ChinhSach.ChinhSach_LamThem_Id"
            @onFinish="onFinishAddKhungGio" />
        <uc-modal-edit-khung-thoi-gian :record="value.recordEditKhungThoiGian"
            :ChinhSach_LamThem_Id="record.ChinhSach.ChinhSach_LamThem_Id"
            v-model:isOpen="states.isOpenModalEditKhungGio" @onFinish="onFinishEditKhungThoiGian" />

        <uc-modal-edit-add-nhan-su :Is_NguoiDuyet="value.typeDuyet"
            :ChinhSach_LamThem_Id="record.ChinhSach.ChinhSach_LamThem_Id"
            v-model:isOpen="states.isOpenModalAddNguoiQuanLy" @onFinish="onFinishAddNguoiQuanLy" />

    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            states: {
                isLoadingTableKhungGio: false,
                isLoadingTableNGuoiQuanLy: false,
                isLoadingModal: false,
                isOpenModalAddKhungGio: false,
                isOpenModalEditKhungGio: false,
                isOpenModalAddNguoiQuanLy: false,
                isOpenModalEditNguoiQuanLy: false,

            },
            value: {
                indexEdit: null,
                typeDuyet: null,
                recordEditKhungThoiGian: {},
                recordNguoiQuanLy: {},
            },
            columns: {
                KhungGio: [
                    {
                        title: 'Khung giờ',
                        key: 'KhungGio',
                        align: 'center',
                    },
                    {
                        title: 'Ca qua đêm',
                        key: 'QuaDem',
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
                        title: 'Họ và tên',
                        dataIndex: 'HoVaTenNhanVien',
                        key: 'HoVaTenNhanVien',
                    },
                    {
                        title: 'Mã nhân viên',
                        dataIndex: 'MaNhanVien',
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
    watch: {

    },
    async created() {

    },
    methods: {
        oncancel() {
            this.$emit('update:isOpen', false)
            this.formData = Object.assign({}, this.dataDefault)
        },
        async onsubmit() {
            this.states.isLoadingModal = true

            const params = { ...this.record.ChinhSach }

            const res = await chinhSachService.ChinhSach_LamThem_Update(params).finally(() => {
                this.states.isLoadingModal = false
            })
            if (res) {
                this.oncancel()
                this.$emit('onFinish')
                this.$message.success('Sửa chính sách thành công!')
            }
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
            this.formData.DS_KhungGio = this.formData.DS_KhungGio.filter((e) => i !== index)
        },
        onEditKhungThoiGian(record, index) {
            this.value.recordEditKhungThoiGian = Object.assign({}, record)
            this.value.recordEditKhungThoiGian.GioBatDau = dayjs(record.GioBatDau, 'HH:mm')
            this.value.recordEditKhungThoiGian.GioKetThuc = dayjs(record.GioKetThuc, 'HH:mm')
            this.states.isOpenModalEditKhungGio = true
            this.value.indexEdit = index
        },
        async onFinishAddNguoiQuanLy() {
            this.states.isLoadingTableNGuoiQuanLy = true
            const resp = await chinhSachService.ChinhSach_LamThem_Select_By_Id({
                ChinhSach_LamThem_Id: this.record.ChinhSach.ChinhSach_LamThem_Id,
            }).finally(() => {
                this.states.isLoadingTableNGuoiQuanLy = false
            })
            if (resp)
                this.record.dsNhanSu = resp[2]
            this.value.typeDuyet = null
        },
        async onFinishAddKhungGio() {
            this.states.isLoadingTableNGuoiQuanLy = true
            const resp = await chinhSachService.ChinhSach_LamThem_Select_By_Id({
                ChinhSach_LamThem_Id: this.record.ChinhSach.ChinhSach_LamThem_Id,
            }).finally(() => {
                this.states.isLoadingTableNGuoiQuanLy = false
            })
            if (resp)
                this.record.dsKhungGio = resp[1]

        },
        onAddNguoiQuanLy(type) {
            this.states.isOpenModalAddNguoiQuanLy = true
            this.value.typeDuyet = type
        },
        onRemoveNguoiQuanLyAt(rc) {
            Confirm.delete({
                content: 'Bạn có chắc chắn muốn xóa người quản lý này không?',
                onOk: async () => {
                    const res = await chinhSachService.ChinhSach_LamThem_NguoiQuanLy_Delete({
                        ChinhSach_LamThem_NguoiQuanLy_Id: rc.ChinhSach_LamThem_NguoiQuanLy_Id
                    })
                    if (res) {
                        this.onFinishAddNguoiQuanLy()
                        this.$message.success('Xóa người quản lý thành công!')
                    }
                }

            })
        },
    },
}
</script>