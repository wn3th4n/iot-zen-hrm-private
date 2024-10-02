<template>
    <uc-modal v-model:isOpen="isOpen" title="Thông tin ca" :width="1400" @onClose="onCloseModal()" ref="refFormModal">
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
                <b>Loại vị trí:</b> <a-tag color="warning" v-if="record?.TenMaLoaiViTri_List_HienThi" v-for="item in record?.TenMaLoaiViTri_List_HienThi.split(', ')">{{ item }}</a-tag>
            </a-col>
            <a-col :xs="24" :md="24"> <b>Ghi chú:</b> {{ record?.GhiChu }} </a-col>
        </a-row>
        <a-tabs>
            <a-tab-pane :key="2" tab="Công thức">
                <a-row class="p-2">
                    <a-col :xs="24" :md="6" v-for="item in dsCongThuc" :key="item.MauBangCong_ThuocTinh_Id" class="mb-1">
                        <div class="d-flex justify-content-between pe-4">
                            <b>{{ item?.TenThuocTinh }}:</b>
                            <a-tag color="success">
                                {{ item?.LoaiDuLieu === 'NUM' ? item?.GiaTri_So : item?.GiaTri_VanBan }}
                            </a-tag>
                        </div>
                    </a-col>
                </a-row>
            </a-tab-pane>
            <a-tab-pane :key="3" tab="Lịch sử chấm công">
                <a-list v-if="DSCheckInOut.length > 0" item-layout="horizontal" :data-source="DSCheckInOut" class="mt-3">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-list-item-meta>
                                <template #title>
                                    <b><uc-icon :name="item.HinhThuc_Icon" /> {{ item.Gio }}</b> - <b>{{ item.TenVanPhong }}</b>
                                </template>
                                <template #avatar>
                                    <a-space :size="12">
                                        <a-image v-if="item.HinhAnh" :width="100" :src="apiReturnFile + item.HinhAnh" />
                                        <a-image
                                            v-else
                                            src="data:image/jpeg;base64,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"
                                            :width="100"
                                        />
                                    </a-space>
                                </template>
                                <template #description>
                                    <span>IP: {{ item.DiaChi_IP }}</span> <br />
                                    <span>Ghi chú: {{ item.GhiChu }}</span>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
                <uc-empty v-else />
            </a-tab-pane>
        </a-tabs>
    </uc-modal>
</template>
<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            dsCongThuc: [],
            DSCheckInOut: [],
            apiReturnFile: 'https://file.zentea.vn/work/FileData/',
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
                    $this.dsCongThuc = data
                })
        },
        async loadCheckInOut() {
            const $this = this
            $this.title = `Lịch sử chấm công - ${$this.record.Ngay}/${$this.record.Thang}/${$this.record.Nam}`
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
