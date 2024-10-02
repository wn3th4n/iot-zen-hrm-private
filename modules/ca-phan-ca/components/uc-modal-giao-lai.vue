<template>
    <uc-modal v-model:isOpen="isOpen" title="Giao lại" :width="500" @onSubmit="onSubmit()" @onClose="handleCancel()" okText="Xác nhận">
        <uc-select-nhan-vien v-model:value="NhanVien_Id" />
    </uc-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record'],
    data() {
        return {
            NhanVien_Id: null,
            search: '',
            selectedRowKeys: [],
            columns: [
                {
                    title: 'Nhân sự',
                    dataIndex: 'NhanVien',
                    key: 'NhanVien',
                },
            ],
        }
    },
    mounted() {},
    computed: {
        rowSelection() {
            return {
                hideSelectAll: true,
                selectedRowKeys: this.selectedRowKeys,
                onChange: (selectedRowKeys) => {
                    this.selectedRowKeys = selectedRowKeys
                },
                getCheckboxProps: (record) => ({
                    disabled: this.selectedRowKeys.length === 1 && this.selectedRowKeys[0] !== record.id,
                }),
            }
        },
    },
    watch: {},
    methods: {
        handleCancel(e) {
            const $this = this
            $this.$emit('update:isOpen', false)
            $this.NhanVien_Id = null
            $this.search = ''
            $this.selectedRowKeys = []
        },
        async onSubmit() {
            const $this = this
            $this.isLoading = true
            const res = await caService.LichLamViec_PhanCa_Update_NhanVien({
                LichLamViec_PhanCa_Id: $this.record.LichLamViec_PhanCa_Id,
                NhanVien_Id: $this.NhanVien_Id,
            })
            if (res) {
                $this.$emit('onFinish')
                $this.handleCancel()
                this.$message.success('Thành công!')
            }
            $this.isLoading = false
        },
    },
}
</script>
