<template>
    <uc-layout>
        <a-card title="Chu kỳ lương" class="card-title-page"/>
        <uc-container :width="900" style="height: calc(100vh - 70px); overflow-y: auto">
            <a-card class="mt-2" v-for="chuKy in DSChuKy">
                <a-flex justify="space-between">
                    <a-space class="mb-2">
                        <h3 class="text-primary mb-0">{{ 'T' + chuKy.Thang + '/' + chuKy.Nam }}</h3>
                        <a-tag v-if="chuKy.TongBangLuong_ChuaChot > 0 && chuKy.TongBangLuong > 0" class="ms-1">
                            <template #icon><uc-icon name="clock-fast" /></template>
                            Đang chạy
                        </a-tag>
                        <a-tag v-else-if="chuKy.TongBangLuong_ChuaChot === 0 && chuKy.TongBangLuong > 0" color="success" class="ms-1">
                            <template #icon><uc-icon name="check-circle-outline" /></template>
                            Đã hoàn thành
                        </a-tag>
                    </a-space>
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent><uc-icon name="dots-horizontal" /></a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onOpenModalMauBangLuong(chuKy)"><uc-icon color="primary" name="plus" />Thêm mẫu bảng lương</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-flex>
                <div class="d-flex flex-row">
                    <div class="w-100">
                        <div class="d-flex flex-row mt-10">
                            <div class="d-flex flex-column w-50">
                                <b>Ngày bắt đầu</b>
                                <span>{{ chuKy.NgayBatDau }}</span>
                            </div>
                            <div class="d-flex flex-column w-50">
                                <b>Ngày kết thúc</b>
                                <span>{{ chuKy.NgayKetThuc }}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-2">
                            <div class="d-flex flex-column w-50">
                                <b>Mẫu bảng lương:</b>
                                <span>{{ DSMauBangLuong.filter((x) => x.ChuKyLuong_Id === chuKy.ChuKyLuong_Id).length }}</span>
                            </div>
                            <div class="d-flex flex-column w-50">
                                <b>Ngày tạo</b>
                                <span>{{ chuKy.NgayTao }} {{ chuKy.GioTao }}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-2">
                            <div class="d-flex flex-column">
                                <b>Bảng lương đã chốt:</b>
                                <span>{{ chuKy.TongBangLuong_DaChot }}/{{ chuKy.TongBangLuong }}</span>
                            </div>
                        </div>
                    </div>
                    <a-divider type="vertical" style="height: 230px; width: 4px" />
                    <div class="w-100">
                        <h3>Mẫu bảng lương</h3>
                        <uc-empty v-if="DSMauBangLuong.filter((x) => x.ChuKyLuong_Id === chuKy.ChuKyLuong_Id).length == 0" />
                        <a-list v-else item-layout="horizontal" :data-source="DSMauBangLuong.filter((x) => x.ChuKyLuong_Id === chuKy.ChuKyLuong_Id)" size="small" style="height: 200px; max-height: 200px; overflow-y: auto">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a-dropdown :trigger="['click']">
                                            <a class="ant-dropdown-link" @click.prevent><uc-icon name="dots-horizontal" /></a>
                                            <template #overlay>
                                                <a-menu>
                                                    <!-- <a-menu-item @click="onRedirectLichLamViec(chuKy, item)"><uc-icon name="calendar-month-outline" />Lịch làm việc</a-menu-item> -->
                                                    <a-menu-item @click="onDeleteMauBangLuong(chuKy, item)"><uc-icon color="red" name="trash-can-outline" />Xoá mẫu bảng lương</a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                    <a-list-item-meta>
                                        <template #title>
                                            <b class="cursor-pointer back-link-hover" @click="redirectToDetail(chuKy, item)">
                                                {{ item.TenMauBangLuong }}
                                            </b>
                                        </template>
                                    </a-list-item-meta>
                                    <small v-if="item.Is_ChotLuong" class="text-success">Đã chốt lương</small>
                                    <small v-else class="text-primary">Đang chạy</small>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </div>
            </a-card>
        </uc-container>
        <uc-modal-add-mau-bang-luong v-model:isOpen="isShowModalMauBangLuong" :record="ChuKy" @onFinish="loadChuKy()" />
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            isShowModalAdd: false,
            isShowModalMauBangLuong: false,
            DSChuKy: [],
            DSMauBangLuong: [],
            ChuKy: null,
        }
    },
    async mounted() {
        await this.loadChuKy()
    },
    computed: {},
    watch: {},
    methods: {
        async loadChuKy() {
            const { DSChuKy, DSMauBangLuong } = await chuKyLuongService.ChuKyLuong_Select()
            this.DSChuKy = DSChuKy
            this.DSMauBangLuong = DSMauBangLuong
        },
        onOpenModalMauBangLuong(chuKy) {
            this.ChuKy = chuKy
            this.isShowModalMauBangLuong = true
        },
        onDeleteMauBangLuong(chuKy, mauBangLuong) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa ${mauBangLuong.TenMauBangLuong} của ${'T' + chuKy.Thang + '/' + chuKy.Nam}`,
                async onOk() {
                    const res = await chuKyLuongService.ChuKyLuong_MauBangLuong_Delete({ ChuKyLuong_MauBangLuong_Id: mauBangLuong.ChuKyLuong_MauBangLuong_Id })
                    if (res) {
                        $this.$message.success('Xóa mẫu bảng lương thành công')
                        $this.loadChuKy()
                    }
                },
            })
        },
        redirectToDetail(chuKy, lichLamViec) {
            redirect(`/pa-tinh-toan-luong?cklid=${chuKy.ChuKyLuong_Id}&mblid=${lichLamViec.MauBangLuong_Id}`)
        },
    },
}
</script>
