<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm đề xuất" :formData="form" :rules="rules"
        :width="530" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-tag style="font-size: 14px; line-height: 2" :bordered="false" color="warning" class="w-100 py-3">[Bắt
                    buộc] Bạn có thể tạo đề xuất muộn tối đa 30 ngày</a-tag>
            </a-col>
            <a-col :span="24">
                <a-tag :bordered="false" color="success" class="w-100 py-3" style="font-size: 14px; line-height: 2">
                    <span>Tên đề xuất ghi rõ họ và tên</span><br />
                    <span>Chọn ngày phát sinh quên chấm công và chọn cả 2 ca có trong ngày</span><br />
                    <span>Trường hợp quên chấm công vào ‘VÀ’ quên chấm công ra</span><br />
                    <span>* Tạo đề xuất sau không quá 03 ngày kể từ ngày quên chấm công.</span><br />
                    <span>* Ngoài thời gian trên, sẽ không tạo được đề xuất và sẽ không tính công.</span>
                </a-tag>
            </a-col>
            <a-col :span="12" class="mt-3">
                <a-form-item label="Tên nhóm chính sách đề xuất" name="TenNhomChinhSach">
                    <a-input v-model:value="recordChinhSach.ChinhSach.TenNhomChinhSach_LamThem" disabled/>
                </a-form-item>
            </a-col>
            <a-col :span="12" class="mt-3">
                <a-form-item label="Tên chính sách đề xuất" name="TenChinhSach">
                    <a-input v-model:value="recordChinhSach.ChinhSach.TenChinhSach_LamThem" disabled/>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tiêu đề" name="TieuDe">
                    <a-input v-model:value="form.TieuDe" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Người đề xuất" name="NhanVien_Id">
                    <uc-select-nhan-vien v-model:value="form.NhanVien_Id" />
                </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
                <a-form-item label="Chính sách" name="NhomDeXuat_Id">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Nhóm" name="LoaiDeXuat_Id">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col> -->
            <a-col :span="24">
                <a-form-item label="Mô tả">
                    <a-textarea v-model:value="form.MoTa" :rows="3" />
                </a-form-item>
            </a-col>

            <a-col :span="24" class="mt-2">
                <a-table :data-source="recordChinhSach.dsNhanSu" :columns="columnsDSNguoiQuanLy" size="small" :pagination="false">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'Is_NguoiDuyet'">
                            <uc-icon v-if="record.Is_NguoiDuyet" name="check-outline" color="success" />
                        </template>
                        <template v-else-if="column.key === 'Action'">
                            <uc-icon name="delete-outline" color="red" @click="onRemoveNQL(record)"/>
                        </template>
                    </template>
                </a-table>
                <div class="mt-2">
                    <a-button type="link" class="ps-0" @click="onOpenModalAddNQL"><uc-icon name="plus" /> Thêm người
                        quản lý</a-button>
                </div>
                <uc-form-modal :isOpen="isShowModalNQL" ref="refFormModalNQL" title="Thêm người quản lý"
                    :formData="formNQL" :rules="rulesNQL" :width="450" @onSubmit="onFinishNQL" :isSubmit="isLoadingNQL"
                    @onClose="handleCancelNQL()">
                    <a-row :gutter="[10]">
                        <a-col :span="24">
                            <a-form-item label="Người quản lý">
                                <!-- <uc-select-nhan-vien v-model:value="formNQL.NguoiQuanLy_Id" /> -->
                                <a-select v-model:value="formNQL.NguoiQuanLy_Id" show-search
                                    placeholder="Select a person" @search="handleSearch" @focus="loadDSNhanVien"
                                    :loading="loadingSelect" :filterOption="false">
                                    <a-select-option v-for="item in DSNhanVien" :value="item.NhanVien_Id">{{
                                        item.TenNhanVien
                                    }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                        <a-col :span="24">
                            <a-form-item name="Is_NguoiDuyet">
                                <a-checkbox v-model:checked="formNQL.Is_NguoiDuyet"> Người duyệt?</a-checkbox>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </uc-form-modal>
            </a-col>

            <a-col :span="24" class="mt-2">
                <a-table :data-source="DSKhungGio" :columns="columnsDSKhungGio" size="small" :pagination="false">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'Is_QuaDem'">
                            <uc-icon v-if="record.Is_QuaDem" name="check" color="green" />
                        </template>
                        <template v-else-if="column.key === 'HoVaTenNhanVien'">
                            <span>{{ record.MaNhanVien }} - {{ record.HoVaTenNhanVien }}</span>
                        </template>
                        <template v-else-if="column.key === 'Action'">
                            <uc-icon name="delete-outline" color="red" />
                        </template>
                    </template>
                </a-table>
                <div class="mt-2">
                    <a-button type="link" class="ps-0" @click="onOpenModalAddTGTC"><uc-icon name="plus" /> Chọn ngày tăng
                        ca</a-button>
                </div>
                <uc-form-modal :isOpen="isShowModalTGTC" ref="refFormModalTGTC" title="Thêm thời gian tăng ca"
                    :formData="formTGTC" :rules="rulesTGTC" :width="450" @onSubmit="onFinishTGTC"
                    :isSubmit="isLoadingTGTC" @onClose="handleCancelTGTC()">
                    <a-row :gutter="[10]">
                        <a-col :span="24">
                            <a-form-item label="Chọn ngày tăng ca">
                                <a-date-picker v-model:value="formTGTC.NgayLamThem" format="DD/MM/YYYY" class="w-100" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="">
                                <a-checkbox v-model:checked="isCheck">Chọn khung giờ đã định nghĩa trước</a-checkbox>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" v-if="isCheck">
                            <a-form-item label="Khung giờ đã định nghĩa" >
                                <a-select v-model:value="formTGTC">
                                  <a-select-option v-for="item in recordChinhSach.DSKhungGio" :value="{GioBatDau: item.GioBatDau, GioKetThuc: item.GioKetThuc}">{{ item.GioBatDau }} - {{ item.GioKetThuc }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" v-if="!isCheck">
                            <a-form-item label="Giờ bắt đầu">
                                <a-time-picker  v-model:value="formTGTC.GioBatDau" format="HH:mm" :minuteStep="5" class="w-100" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" v-if="!isCheck">
                            <a-form-item label="Giờ kết thúc">
                                <a-time-picker  v-model:value="formTGTC.GioKetThuc" format="HH:mm" :minuteStep="5" class="w-100" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item name="Is_QuanLyTrucTiep_Duyet">
                                <a-checkbox v-model:checked="formTGTC.Is_QuaDem"> Ca qua đêm?</a-checkbox>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </uc-form-modal>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'recordChinhSach'],
    data() {
        return {
            keyword: '',
            rulesTGTC: {},
            rulesNQL: {},
            fileList: [],
            isLoading: false,
            isShowModalTGTC: false,
            isLoadingTGTC: false,
            isShowModalNQL: false,
            isLoadingNQL: false,
            isCheck: false,
            form: {
                ChinhSach_LamThem_Id: null,
                NhanVien_Id: null,
                TieuDe: '',
                MoTa: '',
                KhungGio_JSON: '',
                NguoiQuanLy_JSON: '',
            },
            formTGTC: {
                NgayLamThem: '',
                GioBatDau: '',
                GioKetThuc: '',
                Is_QuaDem: false,
            },
            formTGTC_Default: {
                NgayLamThem: '',
                GioBatDau: '',
                GioKetThuc: '',
                Is_QuaDem: false,
            },

            formNQL: {
                NguoiQuanLy_Id: null,
                Is_NguoiDuyet: false,
            },
            formNQL_Default: {
                NguoiQuanLy_Id: null,
                Is_NguoiDuyet: false,
            },
            DSNhanVien: [],
            DSKhungGio: [],
            DSNguoiQuanLy: [],
            rules: {
                TieuDe: [{ required: true, message: 'Vui lòng nhập tên tiêu đề', trigger: 'change' }],
                NhanVien_Id: [{ required: true, message: 'Vui lòng chọn nhân viên', trigger: 'change' }],
            },
            columnsDSKhungGio: [
                {
                    title: 'Ngày tăng ca',
                    dataIndex: 'NgayLamThem',
                },
                {
                    title: 'Giờ bắt đầu',
                    dataIndex: 'GioBatDau',
                },
                {
                    title: 'Giờ kết thúc',
                    dataIndex: 'GioKetThuc',
                },
                {
                    title: 'Ca qua đêm',
                    dataIndex: 'Is_QuaDem',
                    key: 'Is_QuaDem',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            columnsDSNguoiQuanLy: [
                {
                    title: 'Họ và tên quản lý',
                    dataIndex: 'HoVaTenNhanVien',
                },
                {
                    title: 'Người duyệt',
                    dataIndex: 'Is_NguoiDuyet',
                    key: 'Is_NguoiDuyet',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            loadingSelect: false,
            recordItem: {}
        }
    },
    mounted() { },
    computed: {},
    watch: {
        isOpen: {
            immediate: true,
            handler() {
               
            },
        },
    },
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onFinish() {
            let NguoiQuanLy_JSON = JSON.stringify(this.DSNguoiQuanLy.map(x => { return { NguoiQuanLy_Id: x.NguoiQuanLy_Id, Is_NguoiDuyet: x.Is_NguoiDuyet } }))
            let KhungGio_JSON = JSON.stringify(this.DSKhungGio)
            let ChinhSach_LamThem_Id = this.recordChinhSach.ChinhSach_LamThem_Id
            let params = { ...this.form, KhungGio_JSON: KhungGio_JSON, ChinhSach_LamThem_Id: ChinhSach_LamThem_Id, NguoiQuanLy_JSON }
            const $this = this
            const res = await deXuatLamThemService.DeXuat_LamThem_Insert(params)
            if (res) {
                $this.handleCancel()
                $this.$refs.refFormModal.$refs.formRef.resetFields()
                $this.$message.success('Thêm đề xuất thành công!')
            }
        },
        onFinishTGTC() {
            this.formTGTC.NgayLamThem = this.formTGTC.NgayLamThem.format('YYYY-MM-DD')
            this.formTGTC.GioBatDau = this.formTGTC.GioBatDau.format('HH:mm')
            this.formTGTC.GioKetThuc = this.formTGTC.GioKetThuc.format('HH:mm')
            this.DSKhungGio.push(this.formTGTC)
            console.log('this.formTGTC', this.formTGTC)
            this.formTGTC = Object.assign({}, this.formTGTC_Default)
            this.isShowModalTGTC = false
        },
        handleCancelTGTC() {
            this.isShowModalTGTC = false
        },
        onOpenModalAddTGTC() {
            this.isShowModalTGTC = true
        },
        onRemoveNQL(rc) {
            this.recordChinhSach.dsNhanSu = this.recordChinhSach.dsNhanSu.filter((i) => i.HoVaTenNhanVien !== rc.HoVaTenNhanVien)
        },
        async onFinishNQL() {
            const isSelect = await nhanVienService
                .NhanVien_Select_By_Id({
                    NhanVien_Id: this.formNQL.NguoiQuanLy_Id,
                })
                .finally(() => {
                    this.isShowModalNQL = false
                })

            if (isSelect) {
                const temp = {
                    ... this.formNQL,
                    Is_NguoiDuyet: this.formNQL.Is_NguoiDuyet ?? 0,
                    HoVaTenNhanVien: isSelect.ThongTinNhanSu.HoVaTenNhanVien,
                    urlAvatar: isSelect.ThongTinNhanSu.AnhDaiDien_Url,
                    MaNhanVien: isSelect.ThongTinNhanSu.MaNhanVien,
                }
                this.recordChinhSach.dsNhanSu .push(temp)
                this.formNQL = Object.assign({}, this.formNQL_Default)
            }
        },
        handleCancelNQL() {
            this.isShowModalNQL = false
        },
        onOpenModalAddNQL() {
            this.isShowModalNQL = true
        },
        async loadDSNhanVien() {
            const params = {
                TimKiem: '',
            }
            const res = await nhanVienService.NhanVien_Select_Search(params)
            if (res) {
                this.DSNhanVien = res
            }
        },
        async handleSearch(value) {
            this.loadingSelect = true
            this.keyword = value
            const params = {
                TimKiem: this.keyword.trim(),
            }
            const res = await nhanVienService.NhanVien_Select_Search(params).finally(() => this.loadingSelect = false)
            if (res) {
                this.DSNhanVien = Object.assign([], res)
            }

        },
        BindingValue(value) {
            this.formNQL.NguoiQuanLy_Id = this.recordItem.NhanVien_Id
            console.log(' this.formNQL.NguoiQuanLy_Id', this.formNQL.NguoiQuanLy_Id)
        }
    },
}
</script>
