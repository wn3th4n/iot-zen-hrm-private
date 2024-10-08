<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Thêm đề xuất" :formData="form" :rules="rules" :width="800" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-tag style="font-size: 14px; line-height: 2" :bordered="false" color="warning" class="w-100 py-3">[Bắt buộc] Bạn có thể tạo đề xuất muộn tối đa 30 ngày</a-tag>
            </a-col>
            <a-col :span="24">
                <a-tag :bordered="false" color="success" class="w-100 py-3" style="font-size: 14px; line-height: 2">
                    <span>Tên đề xuất ghi rõ họ và tên</span><br />
                    <span>Chọn ngày phát sinh quên chấm công và chọn cả 2 ca có trong ngày</span><br />
                    <span>Trường hợp quên chấm công vào ‘VÀ’ quên chấm công ra</span><br />
                    <span>* Tạo đề xuất sau không quá 03 ngày kể từ ngày quên chấm công.</span><br />
                    <span>* Ngoài thời gian trên, sẽ không tạo được đề xuất và sẽ không tính công.</span>
                </a-tag>
            </a-col>
            <a-col :span="24" class="mt-3">
                <a-form-item label="Tiêu đề" name="TenTieuDe">
                    <a-input />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Nhóm đề xuất" name="NhomDeXuat_Id">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Loại đề xuất" name="LoaiDeXuat_Id">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Ngày quên chấm công" name="LoaiDeXuat_Id">
                    <a-date-picker format="MM/DD/YYYY" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Giờ quên chấm công" name="LoaiDeXuat_Id">
                    <a-time-picker format="HH:mm" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Địa điểm làm việc">
                    <a-select class="w-100">
                        <a-select-option :value="1">Chọn</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Người duyệt cố định 1">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Người theo dõi">
                    <a-input />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tài liệu đính kèm">
                    <uc-file-upload v-model:modelValue="fileList" :multiple="true" title="Upload" accept=".pdf, .docx, .doc, .docs"></uc-file-upload>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Ca đề xuất">
                    <a-select>
                        <a-select-option :value="1">Ca làm tiêu chuẩn</a-select-option>
                        <a-select-option :value="2">Ca làm thực tế</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Ngày bắt đầu">
                    <a-date-picker format="MM/DD/YYYY" class="w-100" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen'],
    data() {
        return {
            fileList: [],
            isLoading: false,
            form: {
                TenChucDanh: '',
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                TenTieuDe: [{ required: true, message: 'Vui lòng nhập tên chức danh', trigger: 'change' }],
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
        onFinish() {

        },
    },
}
</script>
