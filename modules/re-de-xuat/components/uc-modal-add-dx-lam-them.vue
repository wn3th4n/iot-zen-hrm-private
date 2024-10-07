<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm đề xuất" :formData="form" :rules="rules"
        :width="1000" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-alert message="[Bắt buộc] Bạn có thể tạo đề xuất muộn tối đa 30 ngày" type="warning" showIcon
                    close-text="Đóng" />
            </a-col>
            <a-col :span="24" class="mt-2">
                <a-alert type="info" close-text="Đóng" >
                    <template #description>
                        <span>Tên đề xuất ghi rõ họ và tên</span><br />
                        <span>Chọn ngày phát sinh quên chấm công và chọn cả 2 ca có trong ngày</span><br />
                        <span>Trường hợp quên chấm công vào ‘VÀ’ quên chấm công ra</span><br />
                        <span>* Tạo đề xuất sau không quá 03 ngày kể từ ngày quên chấm công.</span><br />
                        <span>* Ngoài thời gian trên, sẽ không tạo được đề xuất và sẽ không tính công.</span>
                    </template>

                </a-alert>
            </a-col>
        </a-row>
        <a-row :gutter="[25]">
            <a-col :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="24" class="mt-3">
                        <a-form-item label="Tên nhóm chính sách đề xuất" name="TenNhomChinhSach">
                            <a-input v-model:value="recordChinhSach.ChinhSach.TenNhomChinhSach_LamThem" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" class="mt-3">
                        <a-form-item label="Tên chính sách đề xuất" name="TenChinhSach">
                            <a-input v-model:value="recordChinhSach.ChinhSach.TenChinhSach_LamThem" disabled />
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
                </a-row>
            </a-col>
            <a-col :span="12" class="border-start mt-3">
                <a-col :span="24">
                    <a-table :data-source="recordChinhSach.dsNhanSu.filter(e => e.Is_NguoiDuyet)"
                        :columns="columnsDSNguoiQuanLy" size="small" :pagination="false">
                        <template #emptyText>
                            <a-empty style="padding: 10px !important">
                                <template #image>
                                    <uc-icon name="inbox" color="muted" size="25" />
                                </template>
                                <template #description><span style="font-size: 10px;" class="text-muted">Không
                                        có dữ liệu</span></template>
                            </a-empty>
                        </template>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'Is_NguoiDuyet'">
                                <uc-icon v-if="record.Is_NguoiDuyet" name="check-outline" color="success" />
                            </template>
                            <template v-else-if="column.key === 'Action'">
                                <uc-icon name="delete-outline" color="red" @click="onRemoveNQL(record)" />
                            </template>
                        </template>
                    </a-table>
                    <div class="mt-2">
                        <a-button type="link" class="ps-0" @click="onOpenModalAddNQL"><uc-icon name="plus" /> Thêm người
                            quản lý</a-button>
                    </div>
                    <uc-form-modal :isOpen="isShowModalNQL" ref="refFormModalNQL" title="Thêm người quản lý"
                        :formData="formNQL" :rules="rulesNQL" :width="450" @onSubmit="onFinishNQL"
                        :isSubmit="isLoadingNQL" @onClose="handleCancelNQL()">
                        <a-row :gutter="[10]">
                            <a-col :span="24">
                                <a-form-item label="Chọn nhân sự">
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

                        </a-row>
                    </uc-form-modal>
                </a-col>

                <a-col :span="24" class="mt-4">
                    <a-table :data-source="recordChinhSach.dsNhanSu.filter(e => !e.Is_NguoiDuyet)"
                        :columns="columnsDSNguoiTheoDoi" size="small" :pagination="false">
                        <template #emptyText>
                            <a-empty style="padding: 10px !important">
                                <template #image>
                                    <uc-icon name="inbox" color="muted" size="25" />
                                </template>
                                <template #description><span style="font-size: 10px;" class="text-muted">Không
                                        có dữ liệu</span></template>
                            </a-empty>
                        </template>
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'Is_NguoiDuyet'">
                                <uc-icon v-if="record.Is_NguoiDuyet" name="check-outline" color="success" />
                            </template>
                            <template v-else-if="column.key === 'Action'">
                                <uc-icon name="delete-outline" color="red" @click="onRemoveNQL(record)" />
                            </template>
                        </template>
                    </a-table>
                    <div class="mt-2">
                        <a-button type="link" class="ps-0" @click="isShowModalNTD = true"><uc-icon name="plus" /> Thêm người
                            theo dõi</a-button>
                    </div>
                    <uc-form-modal :isOpen="isShowModalNTD" ref="refFormModalNTD" title="Thêm người theo dõi"
                        :formData="formNTD" :rules="rulesNQL" :width="450" @onSubmit="onFinishNTD"
                        :isSubmit="isLoadingNTD" @onClose="handleCancelNTD()">
                        <a-row :gutter="[10]">
                            <a-col :span="24">
                                <a-form-item label="Chọn nhân sự">
                                    <!-- <uc-select-nhan-vien v-model:value="formNQL.NguoiQuanLy_Id" /> -->
                                    <a-select v-model:value="formNTD.NguoiQuanLy_Id" show-search
                                        placeholder="Select a person" @search="handleSearch" @focus="loadDSNhanVien"
                                        :loading="loadingSelect" :filterOption="false">
                                        <a-select-option v-for="item in DSNhanVien" :value="item.NhanVien_Id">{{
                                            item.TenNhanVien
                                        }}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </uc-form-modal>
                </a-col>

                <a-col :span="24" class="mt-4">
                    <a-table :data-source="DSKhungGio" :columns="columnsDSKhungGio" size="small" :pagination="false">
                        <template #emptyText>
                            <a-empty style="padding: 10px !important">
                                <template #image>
                                    <uc-icon name="inbox" color="muted" size="25" />
                                </template>
                                <template #description><span style="font-size: 10px;" class="text-muted">Không
                                        có dữ liệu</span></template>
                            </a-empty>
                        </template>
                        <template #bodyCell="{ column, record, index }">
                            <template v-if="column.key === 'Is_QuaDem'">
                                <uc-icon v-if="record.Is_QuaDem" name="check-outline" color="success" />
                            </template>
                            <template v-else-if="column.key === 'HoVaTenNhanVien'">
                                <span>{{ record.MaNhanVien }} - {{ record.HoVaTenNhanVien }}</span>
                            </template>
                            <template v-else-if="column.key === 'khunggio'">
                                <a-tag color="blue">
                                    <template #icon>
                                        <uc-icon name="clock-outline" />
                                    </template>
                                    {{ record.GioBatDau }} - {{ record.GioKetThuc }}
                                </a-tag>
                            </template>
                            <template v-else-if="column.key === 'Action'">
                                <uc-icon name="delete-outline" color="red" @click="onRemoveTGTC(index)" />
                            </template>
                        </template>
                    </a-table>
                    <div class="mt-2">
                        <a-button type="link" class="ps-0" @click="onOpenModalAddTGTC"><uc-icon name="plus" /> Chọn ngày
                            tăng
                            ca</a-button>
                    </div>
                    <uc-form-modal :isOpen="isShowModalTGTC" ref="refFormModalTGTC" title="Thêm thời gian tăng ca"
                        :formData="formTGTC" :rules="rulesTGTC" :width="450" @onSubmit="onFinishTGTC"
                        :isSubmit="isLoadingTGTC" @onClose="handleCancelTGTC()">
                        <a-row :gutter="[10]">
                            <a-col :span="24">
                                <a-form-item label="Chọn ngày tăng ca">
                                    <a-date-picker v-model:value="formTGTC.NgayLamThem" format="DD/MM/YYYY"
                                        class="w-100" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="Khung giờ đã định nghĩa"
                                    v-if="recordChinhSach.ChinhSach.Is_KhungGio">
                                    <a-select v-model:value="formTGTC.ChinhSach_LamThem_KhungGio_Id" class="w-100">
                                        <a-select-option v-for="item in recordChinhSach.dsKhungGio"
                                            :value="item.ChinhSach_LamThem_KhungGio_Id">{{
                                                item.GioBatDau }} - {{
                                                item.GioKetThuc }} [{{ recordChinhSach.dsKhungGio ? 'ca qua đêm' : 'ca không qua đêm'}}]</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12" v-if="!recordChinhSach.ChinhSach.Is_KhungGio">
                                <a-form-item label="Giờ bắt đầu">
                                    <a-time-picker v-model:value="formTGTC.GioBatDau" format="HH:mm" :minuteStep="5"
                                        class="w-100" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12" v-if="!recordChinhSach.ChinhSach.Is_KhungGio">
                                <a-form-item label="Giờ kết thúc">
                                    <a-time-picker v-model:value="formTGTC.GioKetThuc" format="HH:mm" :minuteStep="5"
                                        class="w-100" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="24" v-if="!recordChinhSach.ChinhSach.Is_KhungGio">
                                <a-form-item name="Is_QuanLyTrucTiep_Duyet">
                                    <a-checkbox :disabled="recordChinhSach.ChinhSach.Is_KhungGio"
                                        v-model:checked="formTGTC.Is_QuaDem">
                                        Ca qua đêm?</a-checkbox>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </uc-form-modal>
                </a-col>
            </a-col>

        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['update:isOpen','onFinish'],
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
            isShowModalNTD: false,
            isLoadingNTD: false,
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
                ChinhSach_LamThem_KhungGio_Id: ''
            },
            formTGTC_Default: {
                NgayLamThem: '',
                GioBatDau: '',
                GioKetThuc: '',
                Is_QuaDem: false,
                ChinhSach_LamThem_KhungGio_Id: ''
            },

            formNQL: {
                NguoiQuanLy_Id: null,
                Is_NguoiDuyet: true,
            },
            formNQL_Default: {
                NguoiQuanLy_Id: null,
                Is_NguoiDuyet: true,
            },
            formNTD: {
                NguoiQuanLy_Id: null,
                Is_NguoiDuyet: false,
            },
            formNTD_Default: {
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
                    title: 'Khung giờ',
                    key: 'khunggio',
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
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ], columnsDSNguoiTheoDoi: [
                {
                    title: 'Họ và tên người theo dõi',
                    dataIndex: 'HoVaTenNhanVien',
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
            $this.resetAll()
            $this.$emit('update:isOpen', false)
        },
        resetAll() {
            const $this = this
            $this.formNQL = Object.assign({}, $this.formNQL_Default)
            $this.formTGTC = Object.assign({}, $this.formTGTC_Default)
            $this.DSNhanVien = []
            $this.DSKhungGio = []
            $this.DSNguoiQuanLy = []
        },
        async onFinish() {
            let NguoiQuanLy_JSON = JSON.stringify(this.recordChinhSach.dsNhanSu)
            let KhungGio_JSON = JSON.stringify(this.DSKhungGio)
            let ChinhSach_LamThem_Id = this.recordChinhSach.ChinhSach.ChinhSach_LamThem_Id
            let params = { ...this.form, KhungGio_JSON: KhungGio_JSON, ChinhSach_LamThem_Id: ChinhSach_LamThem_Id, NguoiQuanLy_JSON }
            const $this = this
            const res = await deXuatLamThemService.DeXuat_LamThem_Insert(params)
            if (res) {
                $this.handleCancel()
                $this.$emit("onFinish")
                $this.$message.success('Thêm đề xuất thành công!')
            }
        },
        onFinishTGTC() {
            if (!this.recordChinhSach.ChinhSach.Is_KhungGio) {
                this.formTGTC.NgayLamThem = this.formTGTC.NgayLamThem.format('YYYY-MM-DD')
                this.formTGTC.GioBatDau = this.formTGTC.GioBatDau.format('HH:mm')
                this.formTGTC.GioKetThuc = this.formTGTC.GioKetThuc.format('HH:mm')
                this.DSKhungGio.push(this.formTGTC)
                this.formTGTC = Object.assign({}, this.formTGTC_Default)
                this.isShowModalTGTC = false
                return
            }
            const newKG = this.recordChinhSach.dsKhungGio.find((i) => i.ChinhSach_LamThem_KhungGio_Id === this.formTGTC.ChinhSach_LamThem_KhungGio_Id)
            this.formTGTC = {
                NgayLamThem: this.formTGTC.NgayLamThem.format('YYYY-MM-DD'),
                GioBatDau: newKG.GioBatDau,
                GioKetThuc: newKG.GioKetThuc,
                Is_QuaDem: newKG.Is_QuaDem,
            }
            this.DSKhungGio.push(this.formTGTC)
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
        onRemoveTGTC(index) {
            this.DSKhungGio.splice(index, 1)
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
                this.recordChinhSach.dsNhanSu.push(temp)
                this.formNQL = Object.assign({}, this.formNQL_Default)
            }
        },
        async onFinishNTD() {
            const isSelect = await nhanVienService
                .NhanVien_Select_By_Id({
                    NhanVien_Id: this.formNTD.NguoiQuanLy_Id,
                })
                .finally(() => {
                    this.isShowModalNTD = false
                })

            if (isSelect) {
                const temp = {
                    ... this.formNTD,
                    Is_NguoiDuyet: this.formNTD.Is_NguoiDuyet ?? 0,
                    HoVaTenNhanVien: isSelect.ThongTinNhanSu.HoVaTenNhanVien,
                    urlAvatar: isSelect.ThongTinNhanSu.AnhDaiDien_Url,
                    MaNhanVien: isSelect.ThongTinNhanSu.MaNhanVien,
                }
                this.recordChinhSach.dsNhanSu.push(temp)
                this.formNTD = Object.assign({}, this.formNTD_Default)
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
            console.log('this.formNQL.NguoiQuanLy_Id', this.formNQL.NguoiQuanLy_Id)
        }
    },
}
</script>
