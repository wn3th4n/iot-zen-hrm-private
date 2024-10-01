<template>
    <uc-layout>
        <a-card title="Chu kỳ lịch làm việc" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="isShowModalAdd = true"><uc-icon name="plus" />Thêm chu kỳ</a-button>
                </a-space>
            </template>
        </a-card>
        <uc-container :width="900" style="height: calc(100vh - 70px); overflow-y: auto">
            <a-card class="mt-2" v-for="chuKy in DSChuKy">
                <a-flex justify="space-between">
                    <a-space class="mb-2">
                        <h3 class="text-primary mb-0">{{ 'T' + chuKy.Thang + '/' + chuKy.Nam }}</h3>
                        <a-tag v-if="chuKy.TongLich_ChuaChot > 0" class="ms-1">
                            <template #icon><uc-icon name="clock-fast" /></template>
                            Đang chạy
                        </a-tag>
                        <a-tag v-else color="success" class="ms-1">
                            <template #icon><uc-icon name="check-circle-outline" /></template>
                            Đã hoàn thành
                        </a-tag>
                    </a-space>
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click.prevent><uc-icon name="dots-horizontal" /></a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onOpenModalMauBangCong(chuKy)"><uc-icon color="primary" name="plus" />Thêm lịch làm việc</a-menu-item>
                                <a-menu-item @click="onDeleteChuKy(chuKy)"><uc-icon color="red" name="trash-can-outline" />Xoá chu kỳ</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-flex>
                <div class="d-flex flex-row">
                    <div class="w-100">
                        <div class="d-flex flex-row mt-10">
                            <div class="d-flex flex-column w-50">
                                <b>Ngày bắt đầu</b>
                                <span>{{ chuKy.TuNgay }}</span>
                            </div>
                            <div class="d-flex flex-column w-50">
                                <b>Ngày kết thúc</b>
                                <span>{{ chuKy.DenNgay }}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-2">
                            <div class="d-flex flex-column w-50">
                                <b>Lịch làm việc:</b>
                                <span>{{ DSMauBangCong.filter((x) => x.LichLamViec_Id === chuKy.LichLamViec_Id).length }}</span>
                            </div>
                            <div class="d-flex flex-column w-50">
                                <b>Ngày tạo</b>
                                <span>{{ chuKy.NgayTao }} {{ chuKy.GioTao }}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-2">
                            <div class="d-flex flex-column">
                                <b>Lịch đã chốt:</b>
                                <span>{{ chuKy.TongLich_DaChot }}/{{ chuKy.TongLich }}</span>
                            </div>
                        </div>
                    </div>
                    <a-divider type="vertical" style="height: 230px; width: 4px" />
                    <div class="w-100">
                        <h3>Lịch làm việc</h3>
                        <uc-empty v-if="DSMauBangCong.filter((x) => x.LichLamViec_Id === chuKy.LichLamViec_Id).length == 0" />
                        <a-list v-else item-layout="horizontal" :data-source="DSMauBangCong.filter((x) => x.LichLamViec_Id === chuKy.LichLamViec_Id)" size="small" style="height: 200px; max-height: 200px; overflow-y: auto">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a-dropdown :trigger="['click']">
                                            <a class="ant-dropdown-link" @click.prevent><uc-icon name="dots-horizontal" /></a>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item @click="onRedirectPhanCa(chuKy, item)"><uc-icon name="calendar-plus-outline" />Phân ca</a-menu-item>
                                                    <a-menu-item @click="onRedirectChamCong(chuKy, item)"><uc-icon name="calendar-account-outline" />Chấm công</a-menu-item>
                                                    <a-menu-item @click="onRedirectLichLamViec(chuKy, item)"><uc-icon name="calendar-month-outline" />Lịch làm việc</a-menu-item>
                                                    <a-divider class="my-1"></a-divider>
                                                    <a-menu-item @click="onDeleteMauBangCong(chuKy, item)"><uc-icon color="red" name="trash-can-outline" />Xoá lịch</a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                    <a-list-item-meta>
                                        <template #title>
                                            <b class="cursor-pointer back-link-hover" @click="onRedirectLichLamViec(chuKy, item)">{{ item.TenMauBangCong }}</b>
                                        </template>
                                    </a-list-item-meta>
                                    <small v-if="item.Is_ChotCong" class="text-success">Đã chốt công</small>
                                    <small v-else class="text-primary">Đang chạy</small>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </div>
            </a-card>
        </uc-container>
        <uc-modal-add-chu-ky v-model:isOpen="isShowModalAdd" @onFinish="loadChuKy()" />
        <uc-modal-add-lich v-model:isOpen="isShowModalMauBangCong" :record="ChuKy" @onFinish="loadChuKy()" />
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            isShowModalAdd: false,
            isShowModalMauBangCong: false,
            DSChuKy: [],
            DSMauBangCong: [],
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
            const { DSChuKy, DSMauBangCong } = await lichLamViecService.LichLamViec_Select()
            this.DSChuKy = DSChuKy
            this.DSMauBangCong = DSMauBangCong
        },
        onDeleteChuKy(chuKy) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa chu kỳ ${'T' + chuKy.Thang + '/' + chuKy.Nam}`,
                async onOk() {
                    const res = await lichLamViecService.LichLamViec_Delete({ LichLamViec_Id: chuKy.LichLamViec_Id })
                    if (res) {
                        $this.$message.success('Xóa chu kỳ thành công!')
                        $this.loadChuKy()
                    }
                },
            })
        },
        onOpenModalMauBangCong(chuKy) {
            this.ChuKy = chuKy
            this.isShowModalMauBangCong = true
        },
        onDeleteMauBangCong(chuKy, mauBangCong) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc muốn xóa ${mauBangCong.TenMauBangCong} của ${'T' + chuKy.Thang + '/' + chuKy.Nam}`,
                async onOk() {
                    const res = await lichLamViecService.LichLamViec_MauBangCong_Delete({ LichLamViec_MauBangCong_Id: mauBangCong.LichLamViec_MauBangCong_Id })
                    if (res) {
                        $this.$message.success('Xóa lịch làm việc thành công!')
                        $this.loadChuKy()
                    }
                },
            })
        },
        onRedirectChamCong(chuKy, lichLamViec) {
            redirect(`/pa-check-in-out?llvid=${chuKy.LichLamViec_Id}&mbcid=${lichLamViec.MauBangCong_Id}`)
        },
        onRedirectLichLamViec(chuKy, lichLamViec) {
            if (lichLamViec.Is_CoDinh) {
                redirect(`/ca-lich-co-dinh?llvid=${chuKy.LichLamViec_Id}&mbcid=${lichLamViec.MauBangCong_Id}`)
            } else {
                redirect(`/ca-lich-lam-viec?llvid=${chuKy.LichLamViec_Id}&mbcid=${lichLamViec.MauBangCong_Id}`)
            }
        },
        onRedirectPhanCa(chuKy, lichLamViec) {
            redirect(`/ca-phan-ca?llvid=${chuKy.LichLamViec_Id}&mbcid=${lichLamViec.MauBangCong_Id}`)
        },
        redirectToDetail(chuKy, lichLamViec) {
            redirect(`/ca-lich-lam-viec?llvid=${chuKy.LichLamViec_Id}&mbcid=${lichLamViec.MauBangCong_Id}`)
        },
    },
}
</script>
