<template>
    <uc-form-modal :width="1150" ref="modalRef" v-model:isOpen="isOpen" :formData="formData" :rules="rules" title="Phân ca hàng loạt" @onSubmit="onSubmit()" @onClose="handleCancel()" okText="Phân ca">
        <a-row :gutter="[25]">
            <a-col :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="12">
                        <a-form-item label="Từ ngày" name="TuNgay">
                            <a-date-picker format="DD/MM/YYYY" v-model:value="formData.TuNgay" class="w-100" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Đến ngày" name="DenNgay">
                            <a-date-picker format="DD/MM/YYYY" v-model:value="formData.DenNgay" class="w-100" :disabledDate="disabledDate" :defaultPickerValue="defaultPickerValue" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24">
                        <a-form-item label="Các ngày trong tuần" name="Thu_List">
                            <a-checkbox-group v-model:value="formData.Thu_List" :options="ThuList" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item name="Is_TatCaNhanVien">
                            <a-checkbox v-model:checked="formData.Is_TatCaNhanVien">Tất cả nhân sự</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.Is_TatCaNhanVien === false">
                        <a-form-item label="Nhân sự" name="NhanVien_Id_List">
                            <a-select mode="multiple" v-model:value="formData.NhanVien_Id_List" class="w-100">
                                <a-select-option v-for="item in dsNhanVien" :value="item.NhanVien_Id" :key="item.NhanVien_Id"> [{{ item.MaNhanVien }}] {{ item.HoVaTenNhanVien }} </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Ghi chú" name="GhiChu">
                            <a-textarea v-model:value="formData.GhiChu" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :span="12" class="border-start">
                <a-row :gutter="[10]">
                    <a-col :span="14">
                        <a-form-item label="Chọn nhanh theo ca mẫu" name="CaMau_Id">
                            <a-select v-model:value="CaMau_Id" placeholder="Chọn" @change="() => loadCaMau_Select_By_Id()">
                                <a-select-option v-for="item in dscamau" :value="item.CaMau_Id" :key="item"> [{{ item.TenNhomCaMau }}] {{ item.TenCa }} </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="Công chuẩn" name="SoCongChuan">
                            <a-input-number v-model:value="formData.SoCongChuan" :step="0.1" class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="Nghỉ (phút)" name="SoPhutNghi">
                            <a-input-number v-model:value="formData.SoPhutNghi" class="w-100" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="10">
                        <a-form-item label="Loại ca" name="LoaiCa_Id">
                            <a-select v-model:value="formData.LoaiCa_Id" placeholder="Chọn loại ca">
                                <a-select-option v-for="item in dsloaica" :value="item.LoaiCa_Id" :key="item">
                                    {{ item.TenLoaiCa }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="14">
                        <a-form-item label="Văn phòng" name="VanPhong_Id">
                            <a-select v-model:value="formData.VanPhong_Id" placeholder="Chọn văn phòng">
                                <a-select-option v-for="item in dsvanphong" :value="item.VanPhong_Id">
                                    {{ item.TenVanPhong }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="24">
                        <a-form-item label="Loại vị trí / Vai trò" name="MaLoaiViTri_List">
                            <uc-select-loai-vi-tri v-model:value="formData.MaLoaiViTri_List" :isMultiple="true" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item label="Vào ca" name="GioBatDau">
                            <a-time-picker format="HH:mm" v-model:value="formData.GioBatDau" placeholder="hh:mm" :minuteStep="5" class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Sớm nhất (phút)" name="BatDauCa_Som_Phut">
                            <a-input-number v-model:value="formData.BatDauCa_Som_Phut" placeholder="Nhập phút..." class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Muộn nhất (phút)" name="BatDauCa_Tre_Phut">
                            <a-input-number v-model:value="formData.BatDauCa_Tre_Phut" placeholder="Nhập phút..." class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Ra ca" name="GioKetThuc">
                            <a-time-picker format="HH:mm" v-model:value="formData.GioKetThuc" placeholder="hh:mm" :minuteStep="5" class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Sớm nhất (phút)" name="KetThucCa_Som_Phut">
                            <a-input-number v-model:value="formData.KetThucCa_Som_Phut" placeholder="Nhập phút..." class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Muộn nhất (phút)" name="KetThucCa_Tre_Phut">
                            <a-input-number v-model:value="formData.KetThucCa_Tre_Phut" placeholder="Nhập phút..." class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item name="Is_CaQuaDem">
                            <a-checkbox v-model:checked="formData.Is_CaQuaDem">Ca qua đêm</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item name="Is_XuatBan">
                            <a-checkbox v-model:checked="formData.Is_XuatBan">Xuất bản ca</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item name="Is_DaoTao">
                            <a-checkbox v-model:checked="formData.Is_DaoTao">Đào tạo</a-checkbox>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'dsvanphong', 'dsvaitro', 'dsloaica', 'dscamau', 'lichlamviecid', 'maubangcongid', 'nhanvienid', 'dsNhanVien', 'thangchuky', 'namchuky'],
    data() {
        return {
            ThuList: [
                { label: 'Thứ 2', value: 2 },
                { label: 'Thứ 3', value: 3 },
                { label: 'Thứ 4', value: 4 },
                { label: 'Thứ 5', value: 5 },
                { label: 'Thứ 6', value: 6 },
                { label: 'Thứ 7', value: 7 },
                { label: 'Chủ nhật', value: 1 }, //Chủ nhật
            ],
            CaMau_Id: null,
            formData: {
                TuNgay: '',
                DenNgay: '',
                Thu_List: [2, 3, 4, 5, 6, 7],
                NhanVien_Id_List: [],
                Is_TatCaNhanVien: false,
                LichLamViec_Id: this.lichlamviecid,
                MauBangCong_Id: this.maubangcongid,
                CaMau_Id: null,
                LoaiCa_Id: null,
                VanPhong_Id: null,
                MaLoaiViTri_List: [],
                GioBatDau: null,
                GioKetThuc: null,
                SoPhutNghi: null,
                SoCongChuan: 0.0,
                BatDauCa_Som_Phut: null,
                BatDauCa_Tre_Phut: null,
                KetThucCa_Som_Phut: null,
                KetThucCa_Tre_Phut: null,
                Is_CaQuaDem: false,
                Is_DaoTao: false,
                Is_XuatBan: true,
                GhiChu: '',
            },
            rules: {
                Thu_List: [{ required: true, message: 'Vui lòng chọn ít nhất 1 thứ', trigger: 'change' }],
                TuNgay: [{ required: true, message: 'Vui lòng chọn từ ngày', trigger: 'change' }],
                DenNgay: [{ required: true, message: 'Vui lòng chọn đến ngày', trigger: 'change' }],
                NhanVien_Id_List: [{ required: true, message: 'Vui lòng chọn nhân sự', trigger: 'change' }],
                GioBatDau: [{ required: true, message: 'Vui lòng chọn giờ vào ca', trigger: 'change' }],
                GioKetThuc: [{ required: true, message: 'Vui lòng chọn giờ ra ca', trigger: 'change' }],
                BatDauCa_Som_Phut: [{ required: true, message: 'Vui lòng nhập số phút vào ca sớm nhất', trigger: 'change' }],
                BatDauCa_Tre_Phut: [{ required: true, message: 'Vui lòng nhập số phút vào ca trễ nhất', trigger: 'change' }],
                KetThucCa_Som_Phut: [{ required: true, message: 'Vui lòng nhập số phút ra ca sớm nhất', trigger: 'change' }],
                KetThucCa_Tre_Phut: [{ required: true, message: 'Vui lòng nhập số phút ra ca trễ nhất', trigger: 'change' }],
                LoaiCa_Id: [{ required: true, message: 'Vui lòng chọn loại ca', trigger: 'change' }],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
                SoCongChuan: [{ required: true, message: 'Vui lòng nhập số công chuẩn', trigger: 'change' }],
                SoPhutNghi: [{ required: true, message: 'Vui lòng nhập số phút nghỉ', trigger: 'change' }],
                MaLoaiViTri_List: [{ required: true, message: 'Vui lòng chọn ít nhất 1 vị trí', trigger: 'change' }],
            },
            DinhDangNgay: '',
        }
    },
    watch: {},
    computed: {
        defaultPickerValue: function () {
            let thangNamChuKy = '01/' + this.thangchuky + '/' + this.namchuky
            this.DinhDangNgay = dayjs(thangNamChuKy, 'DD/MM/YYYY')
            return dayjs(thangNamChuKy, 'DD/MM/YYYY')
        },
    },
    methods: {
        async loadCaMau_Select_By_Id() {
            const res = await caService.CaMau_Select_By_Id({ CaMau_Id: this.CaMau_Id })
            if (res) {
                this.$refs.modalRef.$refs.formRef.clearValidate()
                // this.formData = Object.assign({}, res[0])
                this.formData = { ...this.formData, ...res[0], MaLoaiViTri_List: [res[0].LoaiViTri_Id] }
                this.formData.VanPhong_Id = this.formData.VanPhong_Id === 0 ? null : this.formData.VanPhong_Id
                this.formData.GioBatDau = dayjs(this.formData.GioBatDau, 'HH:mm')
                this.formData.GioKetThuc = dayjs(this.formData.GioKetThuc, 'HH:mm')
            }
        },
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
            $this.CaMau_Id = null
            $this.search = ''
            $this.selectedRowKeys = []
        },
        async onSubmit() {
            const $this = this
            // console.log(this.maubangcongid, this.lichlamviecid, this.Ngay)
            console.log(this.formData.Thu_List)
            $this.isLoading = true
            const res = await lichLamViecService.LichLamViec_PhanCa_HangLoat({
                ...this.formData,
                Thu_List: this.formData.Thu_List.join(','),
                NhanVien_Id_List: this.formData.NhanVien_Id_List.join(','),
                DenNgay: this.formData.DenNgay.format('YYYY-MM-DD'),
                TuNgay: this.formData.TuNgay.format('YYYY-MM-DD'),
                MaLoaiViTri_List: this.formData.MaLoaiViTri_List.join(','),
                GioBatDau: this.formData.GioBatDau.format('HH:mm'),
                BatDauCa_Som_Phut: parseInt(this.formData.BatDauCa_Som_Phut),
                BatDauCa_Tre_Phut: parseInt(this.formData.BatDauCa_Tre_Phut),
                GioKetThuc: this.formData.GioKetThuc.format('HH:mm'),
                KetThucCa_Som_Phut: parseInt(this.formData.KetThucCa_Som_Phut),
                KetThucCa_Tre_Phut: parseInt(this.formData.KetThucCa_Tre_Phut),
            })
            if (res) {
                $this.$emit('onFinish')
                this.$refs.modalRef.$refs.formRef.resetFields()
                $this.handleCancel()
                $this.$message.success('Phân ca hàng loạt thành công!')
                $this.isLoading = false
            }
        },
        disabledDate(current) {
            let startOfMonth = this.DinhDangNgay.startOf('month')
            let endOfMonth = this.DinhDangNgay.endOf('month')
            return current && (current < startOfMonth || current > endOfMonth)
        },
    },
}
</script>
