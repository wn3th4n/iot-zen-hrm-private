<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="modalRef" title="Sửa thông tin lương" :formData="record" :rules="rules" :width="550" @onSubmit="onSubmit()" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-card class="mb-3" size="small">
            <a-space size="small">
                <uc-avatar :src="record.AnhDaiDien_Url" :text="record.HoVaTenNhanVien" size="large" />
                <span>
                    <b class="text-primary">{{ record.HoVaTenNhanVien }}</b>
                    <br />
                    {{ record.MaNhanVien }}
                </span>
            </a-space>
        </a-card>
        <a-row :gutter="[10]">
            <a-col :sm="24" :md="24">
                <a-form-item label="Lương cơ bản" name="LuongCoBan">
                    <a-input-number v-model:value="record.LuongCoBan" :formatter="formatter" :parser="parser" class="w-100" />
                </a-form-item>
            </a-col>

            <a-col :sm="24" :md="24">
                <a-table :columns="columnsLuong" :data-source="DSBacLuong" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'TenBacLuong'">
                            <span>{{ record.TenBacLuong }} - {{ formatter(record.GiaTri) }}đ</span>
                        </template>
                        <template v-else-if="column.key === 'Is_HienTai'">
                            <uc-icon v-if="record.Is_HienTai" name="check" class="text-success" />
                        </template>
                        <template v-else-if="column.key === 'NgayBatDau'">
                            <span>{{ record.NgayBatDau }}</span>
                        </template>
                        <template v-else-if="column.key === 'Action'">
                            <uc-icon @click="onDeleteLuong(record)" class="text-red cursor-pointer" name="delete-outline" />
                        </template>
                    </template>
                </a-table>
                <div class="mb-3">
                    <a-button type="link" @click="onOpenModalAddLuong" class="ps-0"><uc-icon name="plus" /> Thêm bậc lương</a-button>
                </div>
                <uc-form-modal v-model:isOpen="isShowModalAddLuong" title="Thêm bậc lương" :width="400" :formData="formDataLuong" ref="modalRefLuong" :rules="rulesLuong" @onSubmit="onSubmitLuong()" @onClose="handleCancelLuong()">
                    <a-row :gutter="[10]">
                        <a-col :sm="24" :md="24">
                            <a-form-item label="Bậc lương" name="BacLuong_Id">
                                <uc-select-bac-luong v-model:value="formDataLuong.BacLuong_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24">
                            <a-form-item label="Ngày bắt đầu" name="NgayBatDau">
                                <a-date-picker format="DD/MM/YYYY" v-model:value="formDataLuong.NgayBatDau" class="w-100" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24"> <a-checkbox v-model:checked="formDataLuong.Is_HienTai" /> Đang áp dụng? </a-col>
                    </a-row>
                </uc-form-modal>
            </a-col>

            <a-col :sm="24" :md="24">
                <a-table :columns="columnsThuong" :data-source="DSBacThuong" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'Is_HienTai'">
                            <uc-icon v-if="record.Is_HienTai" name="check" class="text-success" />
                        </template>
                        <template v-else-if="column.key === 'TenBacThuong'">
                            <span>{{ record.TenBacThuong }} - {{ formatter(record.GiaTri) }}đ</span>
                        </template>
                        <template v-else-if="column.key === 'NgayBatDau'">
                            <span>{{ record.NgayBatDau }}</span>
                        </template>
                        <template v-else-if="column.key === 'Action'">
                            <uc-icon @click="onDeleteThuong(record)" class="text-red cursor-pointer" name="delete-outline" />
                        </template>
                    </template>
                </a-table>
                <div>
                    <a-button type="link" class="ps-0" @click="onOpenModalAddThuong"><uc-icon name="plus" /> Thêm bậc thưởng</a-button>
                </div>
                <uc-form-modal v-model:isOpen="isShowModalAddThuong" title="Thêm bậc thưởng" :width="400" :formData="formDataThuong" ref="modalRefThuong" :rules="rulesThuong" @onSubmit="onSubmitThuong()" @onClose="handleCancelThuong()">
                    <a-row :gutter="[10]">
                        <a-col :sm="24" :md="24">
                            <a-form-item label="Bậc thưởng" name="BacThuong_Id">
                                <uc-select-bac-luong v-model:value="formDataThuong.BacThuong_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24">
                            <a-form-item label="Ngày bắt đầu" name="NgayBatDau">
                                <a-date-picker format="DD/MM/YYYY" v-model:value="formDataThuong.NgayBatDau" class="w-100" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24"> <a-checkbox v-model:checked="formDataThuong.Is_HienTai" /> Đang áp dụng? </a-col>
                    </a-row>
                </uc-form-modal>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    props: ['isOpen', 'record'],
    emits: ['onFinish', 'update:isOpen'],
    data() {
        return {
            isLoading: false,
            isShowModalAddLuong: false,
            isShowModalAddThuong: false,
            formData: {},
            rules: {},
            columnsLuong: [
                {
                    title: 'Bậc lương',
                    dataIndex: 'TenBacLuong',
                    key: 'TenBacLuong',
                },
                {
                    title: 'Ngày bắt đầu',
                    dataIndex: 'NgayBatDau',
                    key: 'NgayBatDau',
                    align: 'center',
                },
                {
                    title: 'Đang áp dụng',
                    dataIndex: 'Is_HienTai',
                    key: 'Is_HienTai',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                },
            ],
            columnsThuong: [
                {
                    title: 'Bậc thưởng',
                    dataIndex: 'TenBacThuong',
                    key: 'TenBacThuong',
                },
                {
                    title: 'Ngày bắt đầu',
                    dataIndex: 'NgayBatDau',
                    key: 'NgayBatDau',
                    align: 'center',
                },
                {
                    title: 'Đang áp dụng',
                    dataIndex: 'Is_HienTai',
                    key: 'Is_HienTai',
                    align: 'center',
                },
                {
                    title: '',
                    dataIndex: 'Action',
                    key: 'Action',
                },
            ],
            formDataLuong: {
                BacLuong_Id: null,
                GiaTri: null,
                NgayBatDau: null,
                Is_HienTai: true,
            },
            formDataLuong_Default: {
                BacLuong_Id: null,
                GiaTri: null,
                NgayBatDau: null,
                Is_HienTai: true,
            },

            formDataThuong: {
                BacThuong_Id: null,
                NgayBatDau: null,
                GiaTri: null,
                Is_HienTai: true,
            },
            formDataThuong_Default: {
                BacThuong_Id: null,
                NgayBatDau: null,
                GiaTri: null,
                Is_HienTai: true,
            },
            rulesLuong: {
                BacLuong_Id: [{ required: true, message: 'Vui lòng chọn bậc lương', trigger: 'change' }],
                NgayBatDau: [{ required: true, message: 'Vui lòng chọn ngày bắt đầu', trigger: 'change' }],
            },
            DSBacLuong: [],
            rulesThuong: {
                BacThuong_Id: [{ required: true, message: 'Vui lòng chọn bậc thưởng', trigger: 'change' }],
                NgayBatDau: [{ required: true, message: 'Vui lòng chọn ngày bắt đầu', trigger: 'change' }],
            },
            DSBacThuong: [],
        }
    },
    watch: {
        isOpen: function (val) {
            if (val) {
                this.loadBacLuong()
                this.loadBacThuong()
            }
        },
    },

    methods: {
        handleCancel() {
            this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            const res = await nhanVienService.NhanVien_Update_ThongTin_Luong({
                NhanVien_Id: $this.record.NhanVien_Id,
                LuongCoBan: $this.record.LuongCoBan,
            })
            if (res) {
                $this.handleCancel()
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$emit('onFinish')
                $this.$message.success('Sửa thông tin lương thành công!')
            }
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
        onDeleteLuong(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có muốn xóa bậc lương ${record.TenBacLuong}?`,
                onOk: async () => {
                    const res = await nhanVienBacLuong.NhanVien_BacLuong_Delete({
                        NhanVien_BacLuong_Id: record.NhanVien_BacLuong_Id,
                    })
                    if (res) {
                        $this.$message.success(`Xóa bậc lương ${record.TenBacLuong} thành công!`)
                        $this.loadBacLuong()
                    }
                },
            })
        },
        onOpenModalAddLuong() {
            this.isShowModalAddLuong = true
        },
        async onSubmitLuong() {
            let params = { ...this.formDataLuong, NhanVien_Id: this.record.NhanVien_Id, NgayBatDau: this.formDataLuong.NgayBatDau.format('YYYY-MM-DD') }
            const res = await nhanVienBacLuong.NhanVien_BacLuong_Insert(params)
            if (res) {
                this.handleCancelLuong()
                this.$message.success('Thêm bậc lương thành công!')
                this.formDataLuong = Object.assign({}, this.formDataLuong_Default)
                this.loadBacLuong()
            }
        },
        handleCancelLuong() {
            this.isShowModalAddLuong = false
        },
        async loadBacLuong() {
            const res = await nhanVienBacLuong.NhanVien_BacLuong_Select({
                NhanVien_Id: this.record.NhanVien_Id,
            })
            if (res) {
                this.DSBacLuong = res
                console.log(res)
            }
        },

        onDeleteThuong(record) {
            const $this = this
            Confirm.delete({
                content: `Bạn có muốn xóa bậc thưởng ${record.TenBacThuong}?`,
                onOk: async () => {
                    const res = await nhanVienBacThuong.NhanVien_BacThuong_Delete({
                        NhanVien_BacThuong_Id: record.NhanVien_BacThuong_Id,
                    })
                    if (res) {
                        $this.$message.success(`Xóa bậc thưởng ${record.TenBacThuong} thành công!`)
                        $this.loadBacThuong()
                    }
                },
            })
        },
        onOpenModalAddThuong() {
            this.isShowModalAddThuong = true
        },
        async onSubmitThuong() {
            let params = { ...this.formDataThuong, NhanVien_Id: this.record.NhanVien_Id, NgayBatDau: this.formDataThuong.NgayBatDau.format('YYYY-MM-DD') }
            const res = await nhanVienBacThuong.NhanVien_BacThuong_Insert(params)
            if (res) {
                this.handleCancelThuong()
                this.$message.success('Thêm bậc thưởng thành công!')
                this.formDataThuong = Object.assign({}, this.formDataThuong_Default)
                this.loadBacThuong()
            }
        },
        handleCancelThuong() {
            this.isShowModalAddThuong = false
        },
        async loadBacThuong() {
            const res = await nhanVienBacThuong.NhanVien_BacThuong_Select({
                NhanVien_Id: this.record.NhanVien_Id,
            })
            if (res) {
                this.DSBacThuong = res
                console.log('res', res)
            }
        },
    },
}
</script>
