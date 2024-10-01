<template>
    <uc-modal v-model:isOpen="isOpen" title="Dữ liệu chấm công" :width="600" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-card size="small">
            <uc-avatar :src="record?.AnhDaiDien_Url" :text="record?.HoVaTenNhanVien" size="18" />
            <span class="ms-2 fw-bold text-primary">[{{ record?.MaNhanVien }}] {{ record?.HoVaTenNhanVien }}</span
            ><br />
            <span class="mb-0"><b>Ngày: </b>{{ dschamcong[0]?.Ngay.toString().padStart('2', 0) }}/{{ dschamcong[0]?.Thang.toString().padStart('2', 0) }}/{{ dschamcong[0]?.Nam }}</span>
        </a-card>
        <a-list :data-source="dschamcong" item-layout="horizontal">
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent><uc-icon name="dots-horizontal" /></a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onEdit(item)"><uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa</a-menu-item>
                                    <a-menu-item @click="onDelete(item)"><uc-icon class="text-red" name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                    <a-list-item-meta>
                        <template #title>
                            <b
                                ><uc-icon :name="item.HinhThuc_Icon" color="primary" /> - {{ item.Gio }} <span v-if="item.TenVanPhong">- {{ item.TenVanPhong }}</span></b
                            >
                        </template>
                        <template #description>
                            <span>IP: {{ item.DiaChi_IP }}</span
                            ><br />
                            <span>Ghi chú: {{ item.GhiChu }}</span>
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
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <uc-modal-edit-du-lieu-cham-cong v-model:isOpen="isShowModalEdit" :record="recordItem" @onFinish="onFinish" />
    </uc-modal>
</template>

<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'record', 'dschamcong'],
    data() {
        return {
            isShowModalEdit: false,
            recordItem: {},
            apiReturnFile: 'https://file.zentea.vn/work/FileData/',
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onSubmit() {},
        onEdit(item) {
            this.isShowModalEdit = true
            this.recordItem = Object.assign({}, { ...item, VanPhong_Id: item.VanPhong_Id === 0 ? null : item.VanPhong_Id })
        },
        onDelete(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có chắc chắn muốn xóa ${record.Gio}`,
                onOk: async () => {
                    const res = await checkInOutService.CheckInOut_Delete({
                        CheckInOut_Id: record.CheckInOut_Id,
                    })
                    if (res) {
                        $this.$emit('onFinish')
                        $this.$message.success('Xóa thành công!')
                        $this.handleCancel()
                    }
                },
            })
        },
        onFinish() {
            this.$emit('onFinish')
            this.handleCancel()
        },
    },
}
</script>
