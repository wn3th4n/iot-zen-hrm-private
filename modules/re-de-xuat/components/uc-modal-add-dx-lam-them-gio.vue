<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Chọn một ngày để đề xuất tăng ca" :formData="form" :rules="rules" :width="500" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-form-item label="Ngày tăng ca">
                    <a-date-picker format="MM/DD/YYYY" class="w-100" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
    <uc-modal-danh-sach-de-xuat-lam-them v-model:isOpen="isShowModalDSDXLamThem" />
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen'],
    data() {
        return {
            fileList: [],
            isLoading: false,
            isShowModalDSDXLamThem: false,
            form: {
                TenChucDanh: '',
                MoTa: '',
                Is_TamKhoa: 0,
            },
            rules: {
                NgayTangCa: [{ required: true, message: 'Vui lòng chọn ngày tăng ca', trigger: 'change' }],
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
        async onFinish() {
            this.handleCancel()
            this.isShowModalDSDXLamThem = true
        },
    },
}
</script>
