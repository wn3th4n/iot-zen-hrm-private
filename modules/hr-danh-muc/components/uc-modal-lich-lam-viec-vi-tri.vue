<template>
	 <uc-form-modal ref="refFormModal" v-model:isOpen="isOpen" :formData="form" :rules="rules" :width="1024" :title="'Thêm lịch làm việc cho ' + record?.TenViTri" @onSubmit="onFinish()" :isSubmit="loading" @onClose="handleCancel()">
        <a-form-item label="Lịch làm việc" name="MauBangCong_Id_List">
            <uc-checkbox-mau-bang-cong v-model:value="form.MauBangCong_Id_List" @validatefield="validateField"> </uc-checkbox-mau-bang-cong>
        </a-form-item>
    </uc-form-modal>
</template>

<script>
	export default {
        emits: ['onFinish', 'update:isOpen'],
        props: ['isOpen', 'record'],
        data() {
        return {
            loading: false,
            form: {
                MauBangCong_Id_List: [],
            },
            rules: {
                MauBangCong_Id_List: [{ required: true, message: 'Bạn chưa chọn lịch làm việc', trigger: 'change' }],
            },
        }
        },
		mounted() {},
		computed: {},
		watch: {
            'record.ViTri_Id': function (val) {
                if (val) {
                    const temp = this.record.MauBangCong_Id_List
                    this.form.MauBangCong_Id_List = temp
                }
            },
        },
		methods: {
            handleCancel() {
                const $this = this
                $this.$emit('update:isOpen', false)
            },
            async onFinish() {
                const $this = this
                $this.loading = true
                const res = await viTriHRService.ViTri_MauBangCong_Insert(
                {
                    ViTri_Id: $this.record.ViTri_Id,
                    MauBangCong_Id_List: $this.form.MauBangCong_Id_List.join(',')
                })

                if (res) {
                    $this.handleCancel()
                    $this.$message.success('Thêm lịch làm việc thành công')
                    $this.$emit('onFinish')
                }
                $this.loading = false
            },
            validateField(field) {
                const ref = this.$refs.refFormModal.$refs.formRef
                ref.validateField(field)
            },
        },
	}
</script>