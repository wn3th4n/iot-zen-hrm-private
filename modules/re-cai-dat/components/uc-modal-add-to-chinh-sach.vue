<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm chính sách" :formData="formData" :rules="rules" @onClose="oncancel()"
        @onSubmit="onsubmit()" :isSubmit="states.isLoadingModal" :width="1100">

        <a-row :gutter="[25]">
            <a-col :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Tên chính sách" name="TenChinhSach_NghiPhep">
                            <a-input v-model:value="formData.TenChinhSach_NghiPhep" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã chính sách" name="MaChinhSach_NghiPhep">
                            <a-input v-model:value="formData.MaChinhSach_NghiPhep" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Nhóm nhân viên có quyền truy cập">
                            <uc-select-nhom-nhan-vien v-model:value="formData.NhomNhanVien_Id" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Loại phép" name="NhomChinhSach_NghiPhep_Id">
                            <a-select placeholder="Chọn loại phép" v-model:value="formData.NhomChinhSach_NghiPhep_Id">
                                <a-select-option v-for="item in dsNhomChinhSach"
                                    :value="item.NhomChinhSach_NghiPhep_Id">{{
                                        item.TenNhomChinhSach_NghiPhep }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12"></a-col>
                    <a-col :span="12">
                        <a-form-item>
                            <template #label>
                                <span>Thời hạn để duyệt
                                    <a-tooltip placement="topRight">
                                        <template #title>
                                            <span>Thời hạn (theo giờ) để duyệt đề xuất</span>
                                        </template>
                                        <uc-icon color="primary" name="information-outline" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-input-number v-model:value="formData.GioiHan_GioDuyet" :min="0" class="w-100">
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
                                        <uc-icon color="primary" name="information-outline" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-input-number v-model:value="formData.GioiHan_NgayDeXuat" class="w-100">
                                <template #addonAfter>Ngày</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item>
                            <template #label name="Is_GioiHanNgayNghi">
                                <span>Giới hạn số ngày đề xuất
                                    <a-tooltip placement="topRight">
                                        <template #title>
                                            <span>
                                                Giới hạn số ngày đề xuất nghỉ phép được tạo
                                            </span>
                                        </template>
                                        <uc-icon color="primary" name="information-outline" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-select class="w-100" v-model:value="formData.Is_GioiHanNgayNghi">
                                <a-select-option :value="0">Không giới hạn</a-select-option>
                                <a-select-option :value="1">Tổng số phép không vượt quá số ngày phép còn
                                    lại</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item>
                            <template #label name="Is_GioiHanNgayNghi">
                                <span>Bắt buộc theo khoảng giới hạn
                                    <a-tooltip placement="topRight">
                                        <template #title>
                                            <span>
                                                Đặt giới hạn thời gian thực thi khi thực hiện đề xuất này
                                            </span>
                                            <br />
                                            <br />
                                            <span>
                                                Bắt buộc(Không thể tạo đề xuất ngoài khoảng giới hạn)
                                            </span>
                                            <br />
                                            <br />
                                            <span>
                                                Không bắt buộc (Có thể tạo xuất nhưng sẽ có ghi chú cảnh báo trên đề
                                                xuất)
                                            </span>

                                        </template>

                                        <uc-icon color="primary" name="information-outline" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-select class="w-100" v-model:value="formData.Is_BacBuocKhoanGioiHan">
                                <a-select-option :value="0">Không bắt buộc</a-select-option>
                                <a-select-option :value="1">Bắt buộc</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item>
                            <template #label>
                                <span>Số ngày giới hạn
                                    <a-tooltip placement="topRight">
                                        <template #title>
                                            <span>
                                                Giới hạn số ngày được chọn trong 1 đề xuất (tối đa 15 ngày và bỏ qua
                                                ngày không có ca làm việc). Để trống nếu bạn muốn chọn tối đa
                                            </span>
                                            <br />
                                        </template>
                                        <uc-icon color="primary" name="information-outline" />
                                    </a-tooltip>
                                </span>
                            </template>
                            <a-input-number v-model:value="formData.GioiHan_NgayNghi" :min="0" :max="15" class="w-100">
                                <template #addonAfter>Ngày</template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Sử dụng quỹ ngày nghỉ">
                            <a-row>
                                <a-col :span="12">
                                    <a-checkbox v-model:checked="formData.Is_QuyNghiBu">Quỹ nghỉ bù</a-checkbox>
                                </a-col>
                                <a-col :span="12">
                                    <a-checkbox v-model:checked="formData.Is_QuyNghiPhep">Quỹ nghỉ phép</a-checkbox>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Ưu tiên sử dụng quỹ ngày nghỉ" name="Is_GioiHanNgayNghi">
                            <a-select allowClear class="w-100" v-model:value="formData.Is_UuTien_QuyNghiBu"
                                :disabled="formData.Is_QuyNghiBu === false && formData.Is_QuyNghiPhep === false">
                                <a-select-option :value="0">Quỹ nghỉ ngày</a-select-option>
                                <a-select-option :value="1">Quỹ nghỉ bù</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>
            <a-col class="border-start" :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="24" class="mb-3">
                        <div class="mb-2 mt-3">
                            <a-checkbox v-model:checked="formData.Is_QuanLyTrucTiep_Duyet">Cho phép quản lý duyệt
                                trực
                                tiếp.</a-checkbox>
                        </div>
                        <a-table :loading="states.isLoadingTableNGuoiQuanLy" size="small" :columns="columns.NguoiQuanLy"
                            :pagination="false"
                            :dataSource="formData.NguoiQuanLy_JSON.filter(x => x.Is_NguoiDuyet === 1)">
                            <template #emptyText>
                                <a-empty style="padding: 10px !important">
                                    <template #image>
                                        <uc-icon name="inbox" color="muted" size="25" />
                                    </template>
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
                                        <b> {{ record.MaNhanVien }} - {{ record.HoVaTenNhanVien }}</b>
                                    </a-space>
                                </template>
                            </template>
                        </a-table>
                        <div class="mt-2">
                            <a @click="onAddNguoiQuanLy(1)"><uc-icon name="plus" />Thêm người quản lý.</a>
                        </div>
                    </a-col>

                    <a-col :span="24" class="my-3">
                        <template #label>
                            <!-- <b>Danh sách người theo dõi</b> -->
                        </template>
                        <div class="mb-2">
                            <a-checkbox v-model:checked="formData.Is_QuanLyTrucTiep_TheoDoi">Cho phép quản lý trực
                                tiếp theo
                                dõi.</a-checkbox>
                        </div>
                        <a-table :loading="states.isLoadingTableNGuoiQuanLy" size="small"
                            :columns="columns.NguoiTheoDoi" :pagination="false"
                            :dataSource="formData.NguoiQuanLy_JSON.filter(x => x.Is_NguoiDuyet === 0)">
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
                        <div class="mt-2">
                            <a @click="onAddNguoiQuanLy(0)"><uc-icon name="plus" />Thêm người theo dõi.</a>
                        </div>
                    </a-col>
                    <a-col :span="24" class="mt-3">
                        <a-form-item label="Mô tả">
                            <a-textarea v-model:value="formData.MoTa" class="w-100" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

        <uc-modal-add-ot-add-nguoi-quan-ly v-model:isOpen="states.isOpenModalAddNguoiQuanLy"
            @onFinish="onFinishAddNguoiQuanLy" />

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
                isOpenModalAddNguoiQuanLy: false,
                isOpenModalEditNguoiQuanLy: false,
            },
            value: {
                indexEdit: null,
                typeDuyet: null,
                recordNguoiQuanLy: {},
            },
            formData: {
                NhomChinhSach_NghiPhep_Id: null,
                NhomNhanVien_Id: null,
                TenChinhSach_NghiPhep: null,
                MaChinhSach_NghiPhep: null,
                MoTa: null,
                GioiHan_GioDuyet: 0,
                GioiHan_NgayDeXuat: 0,
                GioiHan_NgayNghi: null,
                Is_QuanLyTrucTiep_Duyet: false,
                Is_QuanLyTrucTiep_TheoDoi: false,
                Is_GioiHanNgayNghi: 0,
                Is_QuyNghiBu: false,
                Is_QuyNghiPhep: false,
                Is_UuTien_QuyNghiBu: undefined,
                Is_BacBuocKhoanGioiHan: 0,
                NguoiQuanLy_JSON: []
            },
            dataDefault: {
                NhomChinhSach_NghiPhep_Id: null,
                NhomNhanVien_Id: null,
                TenChinhSach_NghiPhep: null,
                MaChinhSach_NghiPhep: null,
                MoTa: null,
                GioiHan_GioDuyet: 0,
                GioiHan_NgayDeXuat: 0,
                GioiHan_NgayNghi: null,
                Is_QuanLyTrucTiep_Duyet: false,
                Is_QuanLyTrucTiep_TheoDoi: false,
                Is_GioiHanNgayNghi: 0,
                Is_QuyNghiBu: false,
                Is_QuyNghiPhep: false,
                Is_UuTien_QuyNghiBu: undefined,
                Is_BacBuocKhoanGioiHan: 0,
                NguoiQuanLy_JSON: []
            },
            columns: {
                NguoiQuanLy: [
                    {
                        title: 'Họ và tên quản lý',
                        dataIndex: 'HoVaTenNhanVien',
                        key: 'HoVaTenNhanVien',
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                    },
                ],
                NguoiTheoDoi: [
                    {
                        title: 'Họ và tên người theo dõi',
                        dataIndex: 'HoVaTenNhanVien',
                        key: 'HoVaTenNhanVien',
                    },
                    {
                        title: '',
                        key: 'Action',
                        align: 'center',
                    },
                ],
            },
            rules: {
                NhomChinhSach_NghiPhep_Id: [{ required: true, message: 'Vui lòng chọn nhóm chính sách', trigger: 'change' }],
                TenChinhSach_NghiPhep: [{ required: true, message: 'Vui lòng nhập tên chính sách', trigger: 'change' }],
                MaChinhSach_NghiPhep: [{ required: true, message: 'Vui lòng nhập mã chính sách', trigger: 'change' }],
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
                ...this.formData,
                Is_GioiHanNgayNghi: this.formData.Is_GioiHanNgayNghi ? 1 : 0,
                Is_QuyNghiBu: this.formData.Is_QuyNghiBu ? 1 : 0,
                Is_QuyNghiPhep: this.formData.Is_QuyNghiPhep ? 1 : 0,
                GioiHan_NgayNghi: this.formData.GioiHan_NgayNghi ?? 0,
                Is_UuTien_QuyNghiBu: this.formData.Is_UuTien_QuyNghiBu ? 1 : 0,
                Is_QuanLyTrucTiep_Duyet: this.formData.Is_QuanLyTrucTiep_Duyet ? 1 : 0,
                Is_QuanLyTrucTiep_TheoDoi: this.formData.Is_QuanLyTrucTiep_TheoDoi ? 1 : 0,
                NguoiQuanLy_JSON: JSON.stringify(this.formData.NguoiQuanLy_JSON) ?? 0,
            }
            const res = await chinhSachService.ChinhSach_NghiPhep_Insert(params).finally(() => {
                this.states.isLoadingModal = false
            })
            if (res) {
                this.oncancel()
                this.$emit('onFinish')
                this.$message.success('Thêm chính sách thành công!')
            }
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
                    Is_NguoiDuyet: this.value.typeDuyet ?? 0,
                    ThuTu: record.ThuTu ?? 0,
                    HoVaTenNhanVien: isSelect.ThongTinNhanSu.HoVaTenNhanVien,
                    urlAvatar: isSelect.ThongTinNhanSu.AnhDaiDien_Url,
                    MaNhanVien: isSelect.ThongTinNhanSu.MaNhanVien,
                }
                this.formData.NguoiQuanLy_JSON.push(temp)
            }

            this.value.typeDuyet = null
        },
        onAddNguoiQuanLy(type) {
            this.states.isOpenModalAddNguoiQuanLy = true
            this.value.typeDuyet = type
        },
        onRemoveNguoiQuanLyAt(rc) {
            this.states.isLoadingTableNGuoiQuanLy = true
            this.formData.NguoiQuanLy_JSON = this.formData.NguoiQuanLy_JSON.filter((i) => i.HoVaTenNhanVien !== rc.HoVaTenNhanVien)
            this.states.isLoadingTableNGuoiQuanLy = false
        },
    },
}
</script>
