<template>
    <uc-form-modal-2 v-model:isOpen="isOpen" title="Cập nhật nè" :width="600" :formData="formData" :rules="rules" :isLoading="isLoading" @onSubmit="onEdit()" @onClose="onCloseModal()">
        <a-row :gutter="[10]">
            <a-col :xs="24" :md="7">
                <a-form-item label="Mã nhóm ca mẫu" name="MaNhomCaMau">
                    <a-input v-model:value="formData.MaNhomCaMau" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="17">
                <a-form-item label="Tên nhóm ca mẫu" name="TenNhomCaMau">
                    <a-input v-model:value="formData.TenNhomCaMau" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="24">
                <a-form-item label="Mô tả" name="MoTa">
                    <a-textarea v-model:value="formData.MoTa" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :md="7">
                <a-form-item label="Tạm khóa" name="Is_TamKhoa">
                    <a-select v-model:value="formData.Is_TamKhoa">
                        <a-select-option :value="0" key="0"> Không </a-select-option>
                        <a-select-option :value="1" key="1"> Tạm khóa </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal-2>
</template>

<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'record'],
    data() {
        return {
            rules: {
                MaNhomCaMau: RULE_VALIDATE.CODE,
                TenNhomCaMau: [{ required: true, message: 'Vui lòng nhập tên nhóm ca mẫu', trigger: 'change' }],
            },
            isLoading: false,
        }
    },
    mounted() {},
    computed: {
        formData: function () {
            const $this = this
            return {
                NhomCaMauId: $this.record?.NhomCaMauId,
                MaNhomCaMau: $this.record?.MaNhomCaMau,
                TenNhomCaMau: $this.record?.TenNhomCaMau,
                MoTa: $this.record?.MoTa,
                Is_TamKhoa: $this.record?.Is_TamKhoa ? 1 : 0,
            }
        },
    },
    watch: {},
    methods: {
        onCloseModal() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onEdit() {
            const $this = this
            $this.isLoading = true
            const res = await nhomCaMauService.NhomCaMau_Update($this.formData)
            if (res) {
                Vue.$toast.success('Cập nhật nhóm ca mẫu thành công!', { position: 'top' })
                $this.$emit('onFinish')
                $this.onCloseModal()
            }
            $this.isLoading = false
        },
    },
}
</script>
