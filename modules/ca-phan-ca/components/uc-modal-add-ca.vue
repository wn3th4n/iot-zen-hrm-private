<template>
    <uc-form-modal v-model:isOpen="isOpen" :title="title" :width="600" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="14">
                <a-form-item label="Chọn nhanh theo ca mẫu">
                    <a-select v-model:value="CaMau_Id" placeholder="Chọn" @change="loadCaMau_Select_By_Id()">
                        <a-select-option v-for="item in dscamau" :value="item.CaMau_Id" :key="item"> [{{ item.TenNhomCaMau }}] {{ item.TenCa }} </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Công chuẩn" name="SoCongChuan">
                    <a-input-number v-model:value="formData.SoCongChuan" :step="0.1" style="width: 100%"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Nghỉ (phút)" name="SoPhutNghi">
                    <a-input-number v-model:value="formData.SoPhutNghi" style="width: 100%"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Loại vị trí / Vai trò" name="MaLoaiViTri_List">
                    <uc-select-loai-vi-tri v-model:value="formData.MaLoaiViTri_List" :isMultiple="true"> </uc-select-loai-vi-tri>
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
                <a-form-item label="Ghi chú" name="GhiChu">
                    <a-textarea v-model:value="formData.GhiChu"></a-textarea>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Vào ca" name="GioBatDau">
                    <a-time-picker format="HH:mm" v-model:value="formData.GioBatDau" placeholder="hh:mm" :minuteStep="5" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Sớm nhất (Phút)" name="BatDauCa_Som_Phut">
                    <a-input-number v-model:value="formData.BatDauCa_Som_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Muộn nhất (Phút)" name="BatDauCa_Tre_Phut">
                    <a-input-number v-model:value="formData.BatDauCa_Tre_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Ra ca" name="GioKetThuc">
                    <a-time-picker format="HH:mm" v-model:value="formData.GioKetThuc" placeholder="hh:mm" :minuteStep="5" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Sớm nhất (Phút)" name="KetThucCa_Som_Phut">
                    <a-input-number v-model:value="formData.KetThucCa_Som_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Muộn nhất (Phút)" name="KetThucCa_Tre_Phut">
                    <a-input-number v-model:value="formData.KetThucCa_Tre_Phut" style="width: 100%" />
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
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record', 'recordday', 'dsvanphong', 'dsvaitro', 'dsloaica', 'dscamau', 'lichlamviecid', 'maubangcongid', 'nhanvienid', 'ngay'],
    data() {
        return {
            isLoading: false,
            CaMau_Id: null,
            formData: {
                LichLamViec_Id: null,
                MauBangCong_Id: null,
                Ngay: null,
                CaMau_Id: null,
                LoaiCa_Id: null,
                NhanVien_Id: null,
                VanPhong_Id: null,
                MaLoaiViTri_List: [],
                GioBatDau: null,
                GioKetThuc: null,
                SoPhutNghi: 0,
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
        }
    },

    mounted() {},
    computed: {
        LichLamViec_Id: function () {
            return this.lichlamviecid
        },
        MauBangCong_Id: function () {
            return this.maubangcongid
        },
        NhanVien_Id: function () {
            return this.nhanvienid
        },
        Ngay: function () {
            return this.ngay
        },
        title: function () {
            return `Thêm ca - [${this.record.MaNhanVien}] ${this.record.HoVaTenNhanVien} - ${this.recordday.Ngay}/${this.recordday.Thang}`
        },
    },
    watch: {},
    methods: {
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
            $this.CaMau_Id = null
        },
        async onSubmit() {
            const $this = this
            $this.isLoading = true
            let arrLoaiViTriId = $this.formData.MaLoaiViTri_List.join(',')
            const res = await caService
                .LichLamViec_PhanCa_Insert({
                    LichLamViec_Id: $this.LichLamViec_Id,
                    MauBangCong_Id: $this.MauBangCong_Id,
                    Ngay: $this.Ngay,
                    CaMau_Id: $this.CaMau_Id ?? 0,
                    LoaiCa_Id: $this.formData.LoaiCa_Id,
                    NhanVien_Id: $this.NhanVien_Id,
                    SoPhutNghi: $this.formData.SoPhutNghi,
                    VanPhong_Id: $this.formData.VanPhong_Id,
                    MaLoaiViTri_List: arrLoaiViTriId,
                    GioBatDau: $this.formData.GioBatDau.format('HH:mm'),
                    GioKetThuc: $this.formData.GioKetThuc.format('HH:mm'),
                    SoCongChuan: $this.formData.SoCongChuan,
                    BatDauCa_Som_Phut: $this.formData.BatDauCa_Som_Phut,
                    BatDauCa_Tre_Phut: $this.formData.BatDauCa_Tre_Phut,
                    KetThucCa_Som_Phut: $this.formData.KetThucCa_Som_Phut,
                    KetThucCa_Tre_Phut: $this.formData.KetThucCa_Tre_Phut,
                    Is_CaQuaDem: $this.formData.Is_CaQuaDem,
                    Is_DaoTao: $this.formData.Is_DaoTao,
                    Is_XuatBan: $this.formData.Is_XuatBan,
                    GhiChu: $this.formData.GhiChu ?? '',
                })
                .finally(() => ($this.isLoading = false))
            if (res) {
                $this.$emit('onFinish')
                $this.handleCancel()
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$message.success('Thêm ca thành công!')
            }
        },
        async loadCaMau_Select_By_Id() {
            const res = await caService.CaMau_Select_By_Id({ CaMau_Id: this.CaMau_Id })
            if (res) {
                this.$refs.modalRef.$refs.formRef.clearValidate()
                this.formData = Object.assign({}, res[0])
                this.formData.VanPhong_Id = this.formData.VanPhong_Id === 0 ? null : this.formData.VanPhong_Id
                this.formData.GioBatDau = dayjs(this.formData.GioBatDau, 'HH:mm')
                this.formData.BatDauCa_Som = dayjs(this.formData.BatDauCa_Som, 'HH:mm')
                this.formData.BatDauCa_Tre = dayjs(this.formData.BatDauCa_Tre, 'HH:mm')
                this.formData.GioKetThuc = dayjs(this.formData.GioKetThuc, 'HH:mm')
                this.formData.KetThucCa_Som = dayjs(this.formData.KetThucCa_Som, 'HH:mm')
                this.formData.KetThucCa_Tre = dayjs(this.formData.KetThucCa_Tre, 'HH:mm')
            }
        },
    },
}
</script>
