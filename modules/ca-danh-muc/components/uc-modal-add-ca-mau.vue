<template>
    <uc-form-modal :isOpen="isOpen" title="Thêm ca mẫu" :width="800" :formData="formData" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="6">
                <a-form-item label="Nhóm ca mẫu" name="NhomCaMau_Id">
                    <a-select v-model:value="formData.NhomCaMau_Id" placeholder="Chọn nhóm ca mẫu">
                        <a-select-option v-for="item in DSNhomCaMau" :value="item.NhomCaMau_Id" :key="item">
                            {{ item.TenNhomCaMau ?? '' }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Mã ca mẫu" name="MaCaMau">
                    <a-input v-model:value="formData.MaCaMau" @keydown.enter="handleMaCaMau()" />
                </a-form-item>
            </a-col>
            <a-col :span="11">
                <a-form-item label="Tên ca mẫu" name="TenCa">
                    <a-input v-model:value="formData.TenCa" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item>
                    <a-checkbox v-model:checked="formData.Is_CaQuaDem">Đây là ca qua đêm?</a-checkbox>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Công chuẩn" name="SoCongChuan">
                    <a-input-number v-model:value="formData.SoCongChuan" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Nghỉ (phút)" name="SoPhutNghi">
                    <a-input-number v-model:value="formData.SoPhutNghi" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="14">
                <a-form-item label="Loại ca" name="LoaiCa_Id">
                    <a-select v-model:value="formData.LoaiCa_Id" placeholder="Chọn loại ca">
                        <a-select-option v-for="item in DSLoaiCa" :value="item.LoaiCa_Id" :key="item">
                            {{ item.TenLoaiCa }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="10">
                <a-form-item label="Vai trò" name="VaiTro_Id">
                    <a-select v-model:value="formData.VaiTro_Id" placeholder="Chọn vai trò">
                        <a-select-option v-for="item in DSVaiTro" :value="item.VaiTro_Id">
                            {{ item.TenVaiTro }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="14">
                <a-form-item label="Văn phòng" name="VanPhong_Id">
                    <a-select v-model:value="formData.VanPhong_Id" placeholder="Chọn văn phòng">
                        <a-select-option v-for="item in DSVanPhong" :value="item.VanPhong_Id">
                            {{ item.TenVanPhong }}
                        </a-select-option>
                    </a-select>
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
            <a-col :span="24">
                <a-form-item label="Mô tả">
                    <a-textarea v-model:value="formData.MoTa"></a-textarea>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'dsnhomcamau', 'dsloaica', 'DSVaiTro', 'DSVanPhong'],
    data() {
        return {
            isLoading: false,
            formData: {
                NhomCaMau_Id: null,
                LoaiCa_Id: 1,
                VaiTro_Id: null, //MỚi
                VanPhong_Id: undefined, //MỚi
                MaCaMau: '',
                TenCa: '',
                GioBatDau: '',
                GioKetThuc: '',
                SoPhutNghi: 0,
                SoCongChuan: 1,
                BatDauCa_Som_Phut: 30,
                BatDauCa_Tre_Phut: 30,
                KetThucCa_Som_Phut: 30,
                KetThucCa_Tre_Phut: 30,
                MoTa: '', //MỚi
                Is_CaQuaDem: false,
            },
            rules: {
                NhomCaMau_Id: [{ required: true, message: 'Vui lòng chọn nhóm ca mẫu', trigger: 'change' }],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
                TenCa: [{ required: true, message: 'Vui lòng nhập tên ca', trigger: 'change' }],
                GioBatDau: [{ required: true, message: 'Vui lòng chọn thời gian bắt đầu', trigger: 'change' }],
                GioKetThuc: [{ required: true, message: 'Vui lòng chọn thời gian kết thúc', trigger: 'change' }],
                SoCongChuan: [{ required: true, message: 'Vui lòng nhập công chuẩn', trigger: 'change' }],
                LoaiCa_Id: [{ required: true, message: 'Vui lòng chọn loại ca', trigger: 'change' }],
                SoPhutNghi: [{ required: true, message: 'Vui lòng nhập số phút nghỉ', trigger: 'change' }],
                BatDauCa_Som_Phut: [{ required: true, message: 'Vui lòng nhập số phút vào ca sớm nhất', trigger: 'change' }],
                BatDauCa_Tre_Phut: [{ required: true, message: 'Vui lòng nhập số phút vào ca trễ nhất', trigger: 'change' }],
                KetThucCa_Som_Phut: [{ required: true, message: 'Vui lòng nhập số phút ra ca sớm nhất', trigger: 'change' }],
                KetThucCa_Tre_Phut: [{ required: true, message: 'Vui lòng nhập số phút ra ca trễ nhất', trigger: 'change' }],
                MaCaMau: [{ required: true, message: 'Vui lòng nhập mã ca mẫu', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {
        DSNhomCaMau: function () {
            return this.dsnhomcamau
        },
        DSLoaiCa: function () {
            return this.dsloaica
        },
    },
    watch: {},
    methods: {
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            $this.isLoading = true
            ajaxCALL(
                '/work/CA_CaMau_Insert',
                {
                    LoaiCa_Id: $this.formData.LoaiCa_Id,
                    NhomCaMau_Id: $this.formData.NhomCaMau_Id,
                    VaiTro_Id: $this.formData.VaiTro_Id ?? 0,
                    VanPhong_Id: $this.formData.VanPhong_Id,
                    TenCa: $this.formData.TenCa,
                    MaCaMau: $this.formData.MaCaMau,
                    GioBatDau: $this.formData.GioBatDau.format('HH:mm'),
                    GioKetThuc: $this.formData.GioKetThuc.format('HH:mm'),
                    SoPhutNghi: $this.formData.SoPhutNghi,
                    SoCongChuan: $this.formData.SoCongChuan,
                    BatDauCa_Som_Phut: $this.formData.BatDauCa_Som_Phut,
                    BatDauCa_Tre_Phut: $this.formData.BatDauCa_Tre_Phut,
                    KetThucCa_Som_Phut: $this.formData.KetThucCa_Som_Phut,
                    KetThucCa_Tre_Phut: $this.formData.KetThucCa_Tre_Phut,
                    Is_CaQuaDem: $this.formData.Is_CaQuaDem,
                    Is_TamKhoa: $this.formData.Is_TamKhoa,
                    MoTa: $this.formData.MoTa,
                },
                (res) => {
                    Vue.$toast.success('Thêm ca mẫu thành công!', { position: 'top' })
                    $this.$refs.modalRef.$refs.formRef.resetFields()
                    $this.$emit('onFinish')
                    $this.handleCancel()
                },
            )
            $this.isLoading = false
        },
        handleMaCaMau() {
            let splitTime = this.formData.MaCaMau.split('-')
            let beginTime = splitTime[0]
            let endTime = splitTime[1]
            let beginSoonTime = splitTime[0] - 2
            let beginLateTime = parseInt(splitTime[0]) + 2
            let endSoonTime = splitTime[1] - 2
            let endLateTime = parseInt(splitTime[1]) + 2
            this.formData.GioBatDau = dayjs(beginTime + ':00', 'HH:mm')
            this.formData.GioKetThuc = dayjs(endTime + ':00', 'HH:mm')
        },
    },
}
</script>
