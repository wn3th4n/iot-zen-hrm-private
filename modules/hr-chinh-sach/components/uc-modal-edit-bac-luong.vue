<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Chỉnh sửa chính sách bậc lương" :formData="record" :rules="rules" :width="500" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="16">
                <a-form-item label="Tên bậc lương" name="TenBacLuong">
                    <a-input v-model:value="record.TenBacLuong" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Giá trị" name="GiaTri">
                    <a-input-number v-model:value="record.GiaTri" :formatter="formatter" :parser="parser" style="width: 100%" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="record.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Tạm khóa">
                    <a-select v-model:value="record.Is_TamKhoa">
                        <a-select-option :value="0">Không</a-select-option>
                        <a-select-option :value="1">Có</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'record'],
    data() {
        return {
            isLoading: false,
            rules: {
                TenBacLuong: [{ required: true, message: 'Vui lòng nhập tên bậc lương', trigger: 'change' }],
                GiaTri: [{ required: true, message: 'Vui lòng nhập giá trị', trigger: 'change' }],
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
            const $this = this
            this.isLoading = true
            ajaxCALL(
                '/work/HR_BacLuong_Update',
                {
                    BacLuong_Id: $this.record.BacLuong_Id,
                    TenBacLuong: $this.record.TenBacLuong,
                    GiaTri: $this.record.GiaTri,
                    MoTa: $this.record.MoTa,
                    Is_TamKhoa: $this.record.Is_TamKhoa,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Chỉnh sửa bậc lương thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
    },
}
</script>
