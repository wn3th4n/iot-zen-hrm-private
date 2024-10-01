<template>
    <uc-form-modal v-model:isOpen="isOpen" title="Chỉnh sửa ca" :width="600" :formData="record" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="14">
                <a-form-item label="Chọn nhanh theo ca mẫu">
                    <a-select v-model:value="record.CaMau_Id" placeholder="Chọn" @change="loadCaMau_Select_By_Id()">
                        <a-select-option v-for="item in dscamau" :value="item.CaMau_Id" :key="item"> [{{ item.TenNhomCaMau }}] {{ item.TenCa }} </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Công chuẩn" name="SoCongChuan">
                    <a-input-number v-model:value="record.SoCongChuan" :step="0.1" style="width: 100%"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Nghỉ (phút)" name="SoPhutNghi">
                    <a-input-number v-model:value="record.SoPhutNghi" style="width: 100%"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Loại vị trí / Vai trò" name="MaLoaiViTri_List">
                    <uc-select-loai-vi-tri v-model:value="record.MaLoaiViTri_List" :isMultiple="true" />
                </a-form-item>
            </a-col>
            <a-col :span="10">
                <a-form-item label="Loại ca" name="LoaiCa_Id">
                    <a-select v-model:value="record.LoaiCa_Id" placeholder="Chọn loại ca">
                        <a-select-option v-for="item in dsloaica" :value="item.LoaiCa_Id" :key="item">
                            {{ item.TenLoaiCa }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="14">
                <a-form-item label="Văn phòng" name="VanPhong_Id">
                    <a-select v-model:value="record.VanPhong_Id" placeholder="Chọn văn phòng">
                        <a-select-option v-for="item in dsvanphong" :value="item.VanPhong_Id">
                            {{ item.TenVanPhong }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Ghi chú" name="GhiChu">
                    <a-textarea v-model:value="record.GhiChu"></a-textarea>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Vào ca" name="GioBatDau">
                    <a-time-picker format="HH:mm" v-model:value="record.GioBatDau" placeholder="hh:mm" :minuteStep="5" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Sớm nhất (Phút)" name="BatDauCa_Som_Phut">
                    <a-input-number v-model:value="record.BatDauCa_Som_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Muộn nhất (Phút)" name="BatDauCa_Tre_Phut">
                    <a-input-number v-model:value="record.BatDauCa_Tre_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Ra ca" name="GioKetThuc">
                    <a-time-picker format="HH:mm" v-model:value="record.GioKetThuc" placeholder="hh:mm" :minuteStep="5" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Sớm nhất (Phút)" name="KetThucCa_Som_Phut">
                    <a-input-number v-model:value="record.KetThucCa_Som_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Muộn nhất (Phút)" name="KetThucCa_Tre_Phut">
                    <a-input-number v-model:value="record.KetThucCa_Tre_Phut" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item name="Is_CaQuaDem">
                    <a-checkbox v-model:checked="record.Is_CaQuaDem">Ca qua đêm</a-checkbox>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item name="Is_DaoTao">
                    <a-checkbox v-model:checked="record.Is_DaoTao">Đào tạo</a-checkbox>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record', 'dsvanphong', 'dsvaitro', 'dsloaica', 'dscamau'],
    data() {
        return {
            isLoading: false,
            // MaLoaiViTri_List_Id: [1, 2, 3],
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
            CaMau_Id: null,
        }
    },
    mounted() {},

    computed: {},
    watch: {},
    methods: {
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
            $this.isLoading = false
            $this.CaMau_Id = null
        },
        async onSubmit() {
            const $this = this
            $this.isLoading = true
            let arrLoaiViTriId = $this.record.MaLoaiViTri_List.join(',')
            const res = await caService.LichLamViec_PhanCa_Update({
                LichLamViec_PhanCa_Id: $this.record.LichLamViec_PhanCa_Id,
                CaMau_Id: $this.record.CaMau_Id ?? 0,
                LoaiCa_Id: $this.record.LoaiCa_Id,
                VanPhong_Id: $this.record.VanPhong_Id,
                MaLoaiViTri_List: arrLoaiViTriId,
                GioBatDau: $this.record.GioBatDau.format('HH:mm'),
                GioKetThuc: $this.record.GioKetThuc.format('HH:mm'),
                SoPhutNghi: $this.record.SoPhutNghi,
                SoCongChuan: $this.record.SoCongChuan,
                BatDauCa_Som_Phut: $this.record.BatDauCa_Som_Phut,
                BatDauCa_Tre_Phut: $this.record.BatDauCa_Tre_Phut,
                KetThucCa_Som_Phut: $this.record.KetThucCa_Som_Phut,
                KetThucCa_Tre_Phut: $this.record.KetThucCa_Tre_Phut,
                Is_CaQuaDem: $this.record.Is_CaQuaDem,
                Is_DaoTao: $this.record.Is_DaoTao,
                GhiChu: $this.record.GhiChu ?? '',
            })
            if (res) {
                Vue.$toast.success('Chỉnh sửa ca thành công!', { position: 'top' })
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.handleCancel()
            }
            $this.isLoading = false
        },
        async loadCaMau_Select_By_Id() {
            const res = await caService.CaMau_Select_By_Id({ CaMau_Id: this.record.CaMau_Id })
            if (res) {
                this.$refs.modalRef.$refs.formRef.clearValidate()
                this.record.VanPhong_Id = res[0].VanPhong_Id === 0 ? null : res[0].VanPhong_Id
                this.record.GioBatDau = dayjs(res[0].GioBatDau, 'HH:mm')
                this.record.GioKetThuc = dayjs(res[0].GioKetThuc, 'HH:mm')
            }
        },
    },
}
</script>
