<template>
    <uc-form-modal v-model:isOpen="isOpen" title="Chỉnh sửa cột" :width="800" :formData="record" ref="modalRef" :rules="rules" :isLoading="isLoading" @onSubmit="onSubmit()" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="9">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" tab="Biến hệ thống" style="max-height: 550px; overflow-y: auto" class="pt-3">
                        <a-collapse ghost>
                            <a-collapse-panel v-for="(group, index) in DSBienHeThong.NhomBien" :key="group.NhomBien_Id">
                                <template #header>
                                    <b>{{ group.TenNhomBien }}</b>
                                </template>
                                <div class="p-1" v-for="item in DSBienHeThong.Bien.filter((g) => g?.NhomBien_Id === group?.NhomBien_Id)" :key="item?.Bien_Id">
                                    <p class="mb-0" @click="onCopy(item.MaHeThong)">
                                        <b>{{ item.MaHeThong }}</b>
                                        <uc-icon name="content-copy" class="float-end" />
                                    </p>
                                    <span class="text-muted">{{ item.MoTa }}</span>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Hàm" style="max-height: 550px; overflow-y: auto" class="pt-3">
                        <div class="p-1" v-for="item in DSBienHeThong.Ham" :key="item?.Ham_Id">
                            <p class="mb-0" @click="onCopy(item.TenHam)">
                                <b>{{ item.TenHam }}</b>
                                <uc-icon name="content-copy" class="float-end" />
                            </p>
                            <span class="text-muted">{{ item.MoTa }}</span>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </a-col>
            <a-col :span="15">
                <a-row :gutter="[10]">
                    <a-col :span="4">
                        <a-form-item label="Thứ tự" name="ThuTu">
                            <a-input-number v-model:value="record.ThuTu" class="w-100" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Dữ liệu" name="LoaiDuLieu">
                            <a-select v-model:value="record.LoaiDuLieu">
                                <a-select-option value="TEXT"> Văn bản </a-select-option>
                                <a-select-option value="NUM"> Số </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Loại biến" name="LoaiThuocTinh">
                            <a-select v-model:value="record.LoaiThuocTinh">
                                <a-select-option value="CT"> Công thức </a-select-option>
                                <a-select-option value="NL"> Nhập liệu </a-select-option>
                                <a-select-option value="HS"> Hằng số </a-select-option>
                                <a-select-option value="TD"> Tự động </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="Hiển thị">
                            <a-select v-model:value="record.Is_HienThi">
                                <a-select-option :value="0" key="0">Không</a-select-option>
                                <a-select-option :value="1" key="1">Có</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="ID hệ thống" name="MaHeThong">
                            <a-input v-model:value="record.MaHeThong" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Mã thuộc tính" name="MaThuocTinh">
                            <a-input v-model:value="record.MaThuocTinh" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Tên hiển thị" name="TenThuocTinh">
                            <a-input v-model:value="record.TenThuocTinh" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Mô tả" name="MoTa">
                            <a-textarea v-model:value="record.MoTa" :auto-size="{ minRows: 1 }" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Công thức" name="CongThuc">
                            <a-textarea v-model:value="record.CongThuc" :auto-size="{ minRows: 5 }" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'record', 'DSBienHeThong', 'chukyluongid', 'maubangluongid'],
    data() {
        return {
            isLoading: false,
            rules: {
                MaThuocTinh: [
                    { required: true, message: 'Vui lòng nhập mã thuộc tính', trigger: 'change' },
                    //{ pattern: /^[A-Za-z\s]+$/, message: 'Mã không được chứa ký tự đặc biệt, chữ có dấu và số' },
                ],
                LoaiDuLieu: [{ required: true, message: 'Vui lòng chọn loại dữ liệu', trigger: 'change' }],
                LoaiThuocTinh: [{ required: true, message: 'Vui lòng chọn loại thuộc tính', trigger: 'change' }],
            },
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onSubmit() {
            const $this = this
            $this.isLoading = true
            const res = await chuKyLuongService.ChuKyLuong_MauBangLuong_ThuocTinh_Update({
                ChuKyLuong_MauBangLuong_ThuocTinh_Id: $this.record.ChuKyLuong_MauBangLuong_ThuocTinh_Id,
                ChuKyLuong_Id: $this.chukyluongid,
                MauBangLuong_Id: $this.maubangluongid,
                ThuTu: $this.record.ThuTu,
                MaHeThong: $this.record.MaHeThong,
                LoaiThuocTinh: $this.record.LoaiThuocTinh,
                LoaiDuLieu: $this.record.LoaiDuLieu,
                MaThuocTinh: $this.record.MaThuocTinh,
                TenThuocTinh: $this.record.TenThuocTinh,
                CongThuc: $this.record.CongThuc,
                MoTa: $this.record.MoTa,
                Is_HienThi: $this.record.Is_HienThi,
                Is_TamKhoa: $this.record.Is_TamKhoa,
            })
            console.log('xxxx', res)
            if (res) {
                $this.handleCancel()
                $this.$refs.modalRef.$refs.formRef.resetFields()
                $this.$message.success('Chỉnh sửa cấu hình cột thành công!')
                $this.$emit('onFinish')
            }
            $this.isLoading = false
        },
        onCopy(text) {
            navigator.clipboard.writeText(text)
            this.$message.success('Đã sao chép ' + text)
        },
    },
}
</script>
