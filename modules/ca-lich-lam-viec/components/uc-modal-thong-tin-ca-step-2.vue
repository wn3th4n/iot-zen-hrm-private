<template>
    <uc-form-modal :isOpen="isOpen" title="Thông tin ca" :width="1400" @onClose="onCloseModal()" ref="refFormModal" @onSubmit="onSubmit()" :formData="formData">
        <a-card size="small">
            <uc-avatar :src="record?.AnhDaiDien_Url" :text="record?.HoVaTenNhanVien" size="18" /> <span class="ms-2 fw-bold text-primary">[{{ record?.MaNhanVien }}] {{ record?.HoVaTenNhanVien }}</span>
            <p class="mb-0"><b>Vị trí:</b> {{ record?.TenViTri }} • <b>Địa điểm:</b> {{ record?.TenVanPhong }}</p>
            <p class="mb-0">
                <b>Ngày:</b> {{ record?.NgayThangNam }} <b> • Ca:</b> {{ record?.TenCa }}
                <a-tag class="ms-2" :color="record?.TrangThai_Mau">
                    <template #icon> <uc-icon :name="record?.TrangThai_Icon" /> </template>
                    {{ record?.TrangThai_Ten }}
                </a-tag>
            </p>
        </a-card>
        <a-row class="mt-3 mx-3">
            <a-col :xs="24" :md="6"> <b>Công chuẩn:</b> {{ record?.SoCongChuan }} </a-col>
            <a-col :xs="24" :md="6"> <b>Số phút nghỉ:</b> {{ record?.SoPhutNghi }} phút</a-col>
            <a-col :xs="24" :md="6"> <b>Loại ca:</b> [{{ record?.MaLoaiCa }}] {{ record?.TenLoaiCa }} </a-col>
            <a-col :xs="24" :md="6"> <b>Ca qua đêm:</b> {{ record?.Is_CaQuaDem ? 'Có' : 'Không' }} </a-col>
            <a-col :xs="24" :md="6"> <b>Khung giờ vào ca:</b> {{ record?.BatDauCa_Som }} → {{ record?.BatDauCa_Tre }}</a-col>
            <a-col :xs="24" :md="6"> <b>Khung giờ ra ca:</b> {{ record?.KetThucCa_Som }} → {{ record?.KetThucCa_Tre }} </a-col>
            <a-col :xs="24" :md="6"> <b>Check-In:</b> {{ record?.GioCheckIn }}</a-col>
            <a-col :xs="24" :md="6"> <b>Check-Out:</b> {{ record?.GioCheckOut }}</a-col>
            <a-col :xs="24" :md="6"> <b>Ca có đào tạo:</b> {{ record?.Is_DaoTao ? 'Có' : 'Không' }} </a-col>
            <a-col :xs="24" :md="6"> <b>Ngày lễ:</b> {{ record?.Is_NgayLe ? 'Có' : 'Không' }} </a-col>
            <a-col :xs="24" :md="6"> <b class="mb-1">Check-In thực tế:</b> {{ DSCheckInOut[0]?.Gio }} <uc-icon v-if="DSCheckInOut.length > 0" :name="DSCheckInOut[0]?.HinhThuc_Icon" /> </a-col>
            <a-col :xs="24" :md="6"> <b class="mb-1">Check-Out thực tế:</b> {{ DSCheckInOut[DSCheckInOut.length - 1]?.Gio }} <uc-icon v-if="DSCheckInOut.length > 0" :name="DSCheckInOut[DSCheckInOut.length - 1]?.HinhThuc_Icon" /> </a-col>
            <a-col :xs="24" :md="6"> <b>Người tạo:</b> {{ record?.NguoiTao }} </a-col>
            <a-col :xs="24" :md="6"> <b>Giờ tạo:</b> {{ record?.GioTao }} </a-col>
            <a-col :xs="24" :md="6"> <b>Thứ tự ca:</b> {{ record?.ThuTuCa }} </a-col>
            <a-col :xs="24" :md="6"> <b>Giờ công:</b> {{ record?.SoGioCong }} </a-col>
            <a-col :xs="24" :md="6"> <b>Đi muộn:</b> {{ record?.SoPhutDiTre }} </a-col>
            <a-col :xs="24" :md="6"> <b>Về sớm:</b> {{ record?.SoPhutVeSom }} </a-col>
            <a-col :xs="24" :md="24">
                <b>Loại vị trí:</b> <a-tag color="warning" v-for="item in LoaiViTri_List">{{ item }}</a-tag>
            </a-col>
            <a-col :xs="24" :md="24"> <b>Ghi chú:</b> {{ record?.GhiChu }} </a-col>
        </a-row>
        <a-divider class="my-2" />
        <a-row class="p-2" :gutter="[10]" v-if="dsCongThuc.length > 0">
            <a-col :xs="24" :md="6" v-for="item in dsCongThuc" :key="item.LichLamViec_TinhCong_Id">
                <div class="d-flex flex-row justify-content-between">
                    <b>{{ item?.TenThuocTinh }}:</b>
                    <a-input-number :disabled="item.Is_TheoNgay" :controls="false" size="small" class="input-number-align-right mb-1" v-if="item.LoaiDuLieu === 'NUM'" v-model:value="formData['GiaTri_' + item.LichLamViec_TinhCong_Id]" />
                    <a-input v-if="item.LoaiDuLieu === 'TEXT'" v-model:value="formData['GiaTri_' + item.LichLamViec_TinhCong_Id]" />
                </div>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            dsCongThuc: [],
            formData: {},
            DSCheckInOut: [],
        }
    },
    computed: {
        LoaiViTri_List: function () {
            return this.record.TenMaLoaiViTri_List_HienThi.split(', ')
        },
    },
    mounted() {},
    watch: {
        isOpen(val) {
            if (val) {
                console.log('record', this.record)
                this.loadCongThuc()
                this.loadCheckInOut()
            }
        },
    },
    methods: {
        onCloseModal() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        loadCongThuc() {
            const $this = this
            lichLamViecService
                .LichLamViec_TinhCong_Select_Ngay_By_NhanVien_Id({
                    LichLamViec_PhanCa_Id: $this.record.LichLamViec_PhanCa_Id,
                })
                .then((data) => {
                    const dataFormModel = {}
                    data.forEach((item) => {
                        const keyModel = `GiaTri_${item.LichLamViec_TinhCong_Id}`
                        const valueModel = item.LoaiDuLieu === 'NUM' ? item.GiaTri_So : item.GiaTri_VanBan
                        dataFormModel[keyModel] = valueModel
                    })
                    $this.formData = dataFormModel
                    $this.dsCongThuc = data
                })
        },
        async onSubmit() {
            const $this = this
            const dataParamJson = []
            $this.dsCongThuc.forEach((ct) => {
                dataParamJson.push({
                    LichLamViec_TinhCong_Id: ct.LichLamViec_TinhCong_Id,
                    GiaTri: $this.formData[`GiaTri_${ct.LichLamViec_TinhCong_Id}`],
                })
            })
            const params = {
                LichLamViec_PhanCa_Id: $this.record.LichLamViec_PhanCa_Id,
                LichLamViec_TinhCong_JSON: JSON.stringify(dataParamJson),
            }
            console.log('params', params)
            const res = await lichLamViecService.LichLamViec_TinhCong_Update(params)
            if (res) {
                $this.$message.success('Chỉnh sửa thành công!')
                $this.onCloseModal()
                $this.$emit('onFinish')
            }
        },
        async loadCheckInOut() {
            const $this = this
            const res = await checkInOutService.CheckInOut_Select_By_NhanVien_Id({
                NhanVien_Id: $this.record.NhanVien_Id,
                Ngay: $this.record.Ngay,
                Thang: $this.record.Thang,
                Nam: $this.record.Nam,
            })
            $this.DSCheckInOut = res
        },
    },
}
</script>
