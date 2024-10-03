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
                <a-form-item label="Chính sách" name="NhomDeXuat_Id">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Nhóm" name="LoaiDeXuat_Id">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="LoaiDeXuat_Id">
                    <a-textarea :rows="3" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <span>NGƯỜI DUYỆT</span>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Quản lý trực tiếp phê duyệt">
                    <a-input />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <span>NGƯỜI LIÊN QUAN KHÁC</span>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Người xác nhận">
                    <a-input :disabled="true" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Quản lý trực tiếp xác nhận">
                    <a-input />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Người theo dõi">
                    <a-input />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Thời gian tăng ca">
                    <a-date-picker format="MM/DD/YYYY" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Giờ bắt đầu">
                    <a-time-picker format="HH:mm" class="w-100" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Giờ kết thúc">
                    <a-time-picker format="HH:mm" class="w-100" />
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
        async onFinish() {},
    },
}
</script>
