<template>
    <uc-modal :title="title" v-model:isOpen="isOpen" :width="700" @onClose="handleCancel()" ref="refFormModal">

        <a-card class="mt-4" :bordered="false">
            <template #extra>
                <a-button type="primary" @click="onAddIPAdress()"><uc-icon name="plus" />Thêm mới</a-button>
            </template>
            <a-table :dataSource="DSIPAdress" :columns="columns" :pagination="false" size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Action'">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link">
                                <uc-icon name="dots-horizontal" />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="onEdit(record)"><uc-icon class="text-primary"
                                            name="square-edit-outline" />Chỉnh
                                        sửa</a-menu-item>
                                    <a-menu-item @click="onDelete(record)"><uc-icon class="text-red"
                                            name="delete-outline" />Xoá</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                    <template v-else-if="column.key === 'Is_TamKhoa'">
                        <a-space size="small">
                            <uc-icon v-if="record.Is_TamKhoa" class="text-red" name="lock-outline" />
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-card>
        <uc-form-modal v-model:isOpen="isShowModalAdd" @onClose="handleCancelAddIPAdress" ref="formAddRef"
            title="Thêm địa chỉ IP" @onSubmit="onSubmitIPAdress" :width="500" :formData="formData" :rules="rules">
            <a-row :gutter="[10]">
                <a-col :span="18">
                    <a-form-item label="Địa chỉ IP" name="DiaChiIP">
                        <a-input v-model:value="formData.DiaChiIP"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Tạm khóa">
                        <a-select v-model:value="formData.Is_TamKhoa">
                            <a-select-option :value="0"> Không </a-select-option>
                            <a-select-option :value="1"> Có </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </uc-form-modal>
        <uc-form-modal v-model:isOpen="isShowModalEdit" @onClose="handleCancelEditIPAdress" title="Chỉnh sửa địa chỉ IP"
            @onSubmit="onSubmitEditIPAdress" ref="formEditRef" :width="500" :formData="editItem" :rules="rules">
            <a-row :gutter="[10]">
                <a-col :span="18">
                    <a-form-item label="Địa chỉ IP" name="DiaChiIP">
                        <a-input v-model:value="editItem.DiaChiIP"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Tạm khóa">
                        <a-select v-model:value="editItem.Is_TamKhoa">
                            <a-select-option :value="0"> Không </a-select-option>
                            <a-select-option :value="1"> Có </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </uc-form-modal>
    </uc-modal>
</template>
<script>
export default {
    props: ['isOpen', 'diadiemid', 'record'],
    data() {
        return {
            isShowModalAdd: false,
            isShowModalEdit: false,
            DSIPAdress: [],
            columns: [
                {
                    title: 'Địa chỉ IP',
                    dataIndex: 'DiaChiIP',
                },
                {
                    title: 'Tạm khóa',
                    dataIndex: 'Is_TamKhoa',
                    key: 'Is_TamKhoa',
                    align: 'center'
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'Action',
                    key: 'Action',
                    align: 'center',
                },
            ],
            formData: {
                DiaChiIP: '',
                Is_TamKhoa: 0
            },
            formData_Default: {
                DiaChiIP: '',
                Is_TamKhoa: 0
            },
            editItem: {},
            title: '',
            rules: {
                DiaChiIP: [{ required: true, message: "Vui lòng nhập địa chỉ IP", trigger: "change" }],
            }
        }
    },
    mounted() { },
    computed: {},
    watch: {
        isOpen: function (val) {
            if (val) {
                this.title = 'Danh sách địa chỉ IP - ' + this.record.TenVanPhong
                this.loadIPAddress()
            }
        }
    },
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
            $this.DSIPAdress = []
        },
        async onSubmitIPAdress() {
            const $this = this
            let params = {
                VanPhong_Id: $this.diadiemid,
                DiaChiIP: $this.formData.DiaChiIP,
                Is_TamKhoa: $this.formData.Is_TamKhoa
            }
            const res = await diaDiemService.VanPhong_IP_Insert(params)
            if (res) {
                $this.isShowModalAdd = false
                $this.$message.success('Thêm địa chỉ IP thành công!')
                $this.loadIPAddress()
                $this.handleCancelAddIPAdress()
            }
        },
        onEdit(record) {
            this.editItem = Object.assign({}, record)
            this.editItem.Is_TamKhoa = this.editItem.Is_TamKhoa ? 1 : 0
            this.isShowModalEdit = true
        },
        onDelete(record) {
            const $this = this
            Confirm.delete({
                content: `Xác nhận xóa địa chỉ IP ${record.DiaChiIP}?`,
                onOk: async () => {
                    const res = await diaDiemService.VanPhong_IP_Delete({ VanPhong_IP_Id: record.VanPhong_IP_Id })
                    if (res) {
                        $this.$message.success('Xóa địa chỉ IP thành công!')
                        $this.loadIPAddress()
                    }
                }
            })

        },
        onAddIPAdress() {
            this.isShowModalAdd = true

        },
        handleCancelAddIPAdress() {
            const $this = this
            $this.isShowModalAdd = false
            $this.formData = Object.assign({}, $this.formData_Default)
        },
        handleCancelEditIPAdress() {
            this.isShowModalEdit = false

        },
        async loadIPAddress() {
            const res = await diaDiemService.VanPhong_IP_Select({ VanPhong_Id: this.diadiemid })
            this.DSIPAdress = res
        },
        async onSubmitEditIPAdress() {
            const $this = this
            let params = {
                VanPhong_IP_Id: $this.editItem.VanPhong_IP_Id,
                VanPhong_Id: $this.diadiemid,
                DiaChiIP: $this.editItem.DiaChiIP,
                Is_TamKhoa: $this.editItem.Is_TamKhoa
            }
            const res = await diaDiemService.VanPhong_IP_Update(params)
            if (res) {
                $this.isShowModalEdit = false
                $this.$message.success('Chỉnh sửa địa chỉ IP thành công!')
                $this.loadIPAddress()
                $this.$refs.formEditRef.$refs.formRef.resetFields()
            }
        }
    },
}
</script>