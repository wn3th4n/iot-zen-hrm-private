<template>
    <uc-form-modal centered :isOpen="isOpen" title="Thêm chính sách" :width="1400" ref="modalRef" @onClose="onClose()" @onSubmit="onSubmit()" :isSubmit="isLoading" :formData="form" :rules="rules">
        <a-row :gutter="[25]">
            <a-col :span="12">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Tên chính sách nhân sự" name="TenChinhSach">
                            <a-input v-model:value="form.TenChinhSach" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Loại chính sách">
                            <a-input v-model:value="record.TenLoaiChinhSach" disabled />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Chọn Trạng thái" name="TrangThai">
                            <a-select v-model:value="form.TrangThai">
                                <a-select-option :value="0">Không khả dụng</a-select-option>
                                <a-select-option :value="1">Khả dụng</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Chọn người quản lý" name="NguoiQuanLy_Id_List">
                            <uc-select-nhan-vien v-model:value="form.NguoiQuanLy_Id_List" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Chọn người theo dõi" name="NguoiTheoDoi_Id_List">
                            <uc-select-nhan-vien v-model:value="form.NguoiTheoDoi_Id_List" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Thời gian thử thách (ngày)" name="ThoiGianThuThach">
                            <a-input-number v-model:value="form.ThoiGianThuThach" :min="0" :max="100" class="w-100" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Thời hạn duyệt (giờ)" name="TimeDuyet">
                            <a-input-number v-model:value="form.TimeDuyet" :min="0" :max="100" class="w-100" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Cần phê duyệt?" name="CanDuyet">
                            <a-select v-model:value="form.CanDuyet">
                                <a-select-option :value="0">Không</a-select-option>
                                <a-select-option :value="1">Có</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Người được hỏi ý kiến" name="NguoiYKien_Id_List">
                            <uc-select-nhan-vien v-model:value="form.NguoiYKien_Id_List" :disabled="form.CanDuyet === 0" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24">
                        <a-form-item label="Mô tả chi tiết quyết định" name="MoTa">
                            <a-textarea v-model:value="form.MoTa" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24">
                        <a-form-item name="checkbox">
                            <a-checkbox>Cho phép nhân sự tạo đề xuất cho bản thân</a-checkbox>
                            <a-checkbox>Cho phép người quản lý tạo đề xuất cho nhân sự cấp dưới</a-checkbox>
                        </a-form-item>
                    </a-col>

                    <a-col :span="24">
                        <a-form-item label="File mẫu (.docx)" name="File_ChinhSach">
                            <uc-file-upload v-model:modelValue="form.File_ChinhSach" :multiple="false" title="Upload file" accept=".docx, .doc, .docs" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :span="12" class="border-start">
                <a-form-item label="Áp dụng cho">
                    <a-spin :spinning="isLoading">
                        <a-checkbox-group :value="selectedItems" @change="onChange" class="w-100">
                            <a-row :gutter="[10, 10]">
                                <a-col :span="12" v-for="item in dsVanPhong.map((item) => ({ value: item.VanPhong_Id, label: item.TenVanPhong }))">
                                    <a-checkbox :value="item.value" :key="item.value">{{ item.label }}</a-checkbox>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                    </a-spin>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['update:isOpen', 'onFinish'],
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            form: {
                TenChinhSach: null,
                NguoiQuanLy_Id_List: null,
                NguoiTheoDoi_Id_List: null,
                NguoiYKien_Id_List: null,
                File_ChinhSach: null,
                TimeDuyet: null,
                TrangThai: 0,
                MoTa: null,
                CanDuyet: 0,
                ThoiGianThuThach: null,
                ApDung_VanPhong_Id_List: null,
            },
            rules: {
                Active_Id: [{ required: true, message: 'Bạn chưa chọn loại chính sách', trigger: 'change' }],
            },
            selectedItems: [],
            dsVanPhong: [],
        }
    },
    mounted() {
        this.loadVanPhong()
    },
    methods: {
        onChange(data) {
            this.selectedItems = data
        },
        loadVanPhong() {
            ajaxCALL('/work/HR_VanPhong_Select', {}, (res) => {
                this.dsVanPhong = res.data
            })
            this.selectedItems = []
        },
        validateField(field) {
            const ref = this.$refs.modalRef.$refs.formRef
            ref.validateField(field)
        },
        onClose() {
            this.$refs.modalRef.$refs.formRef.resetFields()
            this.selectedItems = []
            this.$emit('update:isOpen', false)
        },
        onSubmit() {
            const record = this.record.find((i) => {
                return i.LoaiChinhSach_Id === this.form.Active_Id
            })
            this.$emit('onFinish', record)
            this.onClose()
        },
    },
}
</script>
