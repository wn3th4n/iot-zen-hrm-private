<template>
    <uc-modal v-model:isOpen="isOpen" title="Thông tin ca" :width="1200" @onClose="onCloseModal()">
        <a-card size="small">
            <a-dropdown :trigger="['click']" class="float-end">
                <a-button type="primary"><uc-icon name="apps" />Thao tác<uc-icon name="chevron-down" /></a-button>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="onRelease(record)" v-if="record.TrangThai_Mau !== 'blue'"><uc-icon name="calendar-check" />Xuất bản ca</a-menu-item>
                        <a-divider class="my-1"></a-divider>
                        <a-menu-item @click="onOpenModalHandOver(record)"><uc-icon name="account-switch" />Giao lại</a-menu-item>
                        <a-menu-item @click="onOpenModalEdit()"><uc-icon name="table-edit" />Chỉnh sửa</a-menu-item>
                        <a-divider class="my-1"></a-divider>
                        <a-menu-item @click="onDelete(record)"><uc-icon name="trash-can-outline" color="red" />Xóa ca</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <p class="mb-0 fw-bold text-primary">
                <uc-avatar :src="record?.AnhDaiDien_Url" :text="record?.HoVaTenNhanVien" size="18" /><span class="ms-2">[{{ record?.MaNhanVien }}] {{ record?.HoVaTenNhanVien }}</span>
            </p>
            <p class="mb-0"><b>Vị trí:</b> {{ record?.TenViTri }} • <b>Địa điểm:</b> {{ record?.TenVanPhong }}</p>
            <p class="mb-0"><b>Ngày:</b> {{ record?.NgayThangNam }} <b> • Ca:</b> {{ record?.TenCa }}</p>
            <p class="mb-0 mt-2">
                <a-tag :color="record?.TrangThai_Mau">
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

        <uc-modal-edit-ca v-model:isOpen="isOpenModalEdit" :record="RecordItem" :dsloaica="dsloaica" :dsvaitro="dsvaitro" :dsvanphong="dsvanphong" :dscamau="dscamau" @onFinish="onFinishEdit" />
        <uc-modal-giao-lai v-model:isOpen="isOpenModalGiaoLai" :record="RecordItem" @onFinish="onFinishEdit" />
    </uc-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record', 'dsvanphong', 'dsvaitro', 'dsloaica', 'dscamau'],
    data() {
        return {
            activeKey: 1,
            dsCongThuc: [],
            isOpenModalEdit: false,
            isOpenModalGiaoLai: false,
            RecordItem: {},
        }
    },
    watch: {},
    computed: {
        LoaiViTri_List: function () {
            return this.record.TenMaLoaiViTri_List_HienThi.split(', ')
        },
    },
    methods: {
        onCloseModal() {
            const $this = this
            $this.activeKey = 1
            $this.dsCongThuc = []
            $this.$emit('update:isOpen', false)
        },
        onRelease(record) {
            const $this = this
            Confirm.confirm({
                content: `Bạn có chắc muốn xuất bản ca ${record.GioBatDau} - ${record.GioKetThuc}`,
                onOk: async () => {
                    const res = await caService.LichLamViec_PhanCa_XuatBan_Ca({
                        LichLamViec_PhanCa_Id: record.LichLamViec_PhanCa_Id,
                    })
                    if (res) {
                        $this.onCloseModal()
                        $this.$emit('onFinish')
                        $this.$message.success(`Xuất bản thành công ca ${record.GioBatDau} - ${record.GioKetThuc}!`)
                    }
                },
            })
        },
        onOpenModalHandOver(record) {
            this.RecordItem = Object.assign({}, record)
            this.isOpenModalGiaoLai = true
        },
        onOpenModalEdit() {
            this.RecordItem = Object.assign({}, { ...this.record })
            this.RecordItem.GioBatDau = dayjs(this.RecordItem.GioBatDau, 'HH:mm')
            this.RecordItem.BatDauCa_Som = dayjs(this.RecordItem.BatDauCa_Som, 'HH:mm')
            this.RecordItem.BatDauCa_Tre = dayjs(this.RecordItem.BatDauCa_Tre, 'HH:mm')
            this.RecordItem.GioKetThuc = dayjs(this.RecordItem.GioKetThuc, 'HH:mm')
            this.RecordItem.KetThucCa_Som = dayjs(this.RecordItem.KetThucCa_Som, 'HH:mm')
            this.RecordItem.KetThucCa_Tre = dayjs(this.RecordItem.KetThucCa_Tre, 'HH:mm')
            this.RecordItem.MaLoaiViTri_List = this.RecordItem.MaLoaiViTri_List.split(',').map(Number)
            this.isOpenModalEdit = true
        },
        onDelete(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc chắn muốn xóa ca ${record.GioBatDau} - ${record.GioKetThuc}`,
                onOk: async () => {
                    const res = await caService.LichLamViec_PhanCa_Delete({
                        LichLamViec_PhanCa_Id: record.LichLamViec_PhanCa_Id,
                    })
                    if (res) {
                        $this.onCloseModal()
                        $this.$emit('onFinish')
                        $this.$message.success(`Xóa thành công ca ${record.GioBatDau} - ${record.GioKetThuc}!`)
                    }
                },
            })
        },
        async handleChangeTab(tab) {
            const $this = this
            if (tab === 2) {
                await lichLamViecService
                    .LichLamViec_TinhCong_Select_Ngay_By_NhanVien_Id({
                        LichLamViec_PhanCa_Id: $this.record.LichLamViec_PhanCa_Id,
                    })
                    .then((data) => {
                        $this.dsCongThuc = data
                    })
            }
        },
        onFinishEdit() {
            const $this = this
            $this.onCloseModal()
            $this.$emit('onFinish')
        },
    },
}
</script>
