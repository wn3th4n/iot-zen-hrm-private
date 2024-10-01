<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Chỉnh sửa ngày lễ" :formData="record"
        :rules="rules" :width="600" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="19">
                <a-form-item label="Mã ngày lễ" name="MaNgayLe">
                    <a-input v-model:value="record.MaNgayLe" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Tính lương" name="Is_TinhLuong">
                    <a-select v-model:value="record.Is_TinhLuong">
                        <a-select-option :value="0">Không</a-select-option>
                        <a-select-option :value="1">Có</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Tên ngày lễ" name="TenNgayLe">
                    <a-input v-model:value="record.TenNgayLe" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Màu ngày lễ" name="MauNgayLe">
                    <a-input v-model:value="record.MauNgayLe" />
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Thời gian nghỉ" name="ThoiGianNghi_Tu">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="record.ThoiGianNghi_Tu" style="width: 100%"
                        placeholder="DD/MM/YYYY" />
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Đến ngày" name="ThoiGianNghi_Den">
                    <a-date-picker format="DD/MM/YYYY" v-model:value="record.ThoiGianNghi_Den" style="width: 100%"
                        placeholder="DD/MM/YYYY" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Năm" name="Nam">
                    <a-input-number v-model:value="record.Nam" style="width:100%" />
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
                        <a-select-option :value="0">
                            Không
                        </a-select-option>
                        <a-select-option :value="1">
                            Có
                        </a-select-option>
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
                MaNgayLe: [{ required: true, message: "Vui lòng nhập mã ngày lễ", trigger: "change" }],
                TenNgayLe: [{ required: true, message: "Vui lòng nhập tên ngày lễ", trigger: "change" }],
                MauNgayLe: [{ required: true, message: "Vui lòng nhập màu ngày lễ", trigger: "change" }],
                ThoiGianNghi_Tu: [{ required: true, message: "Vui lòng nhập thời gian bắt đầu", trigger: "change" }],
                ThoiGianNghi_Den: [{ required: true, message: "Vui lòng nhập thời gian kết thúc", trigger: "change" }],
                Nam: [{ required: true, message: "Vui lòng nhập năm", trigger: "change" }],
            }
        }
    },
    mounted() { },
    computed: {},
    watch: {},
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        onFinish() {
            const $this = this
            $this.isLoading = true
            ajaxCALL("/work/HR_NgayLe_Update", {
                NgayLe_Id: $this.record.NgayLe_Id,
                Nam: $this.record.Nam,
                MaNgayLe: $this.record.MaNgayLe,
                TenNgayLe: $this.record.TenNgayLe,
                MauNgayLe: $this.record.MauNgayLe,
                ThoiGianNghi_Tu: dayjs($this.record.ThoiGianNghi_Tu).format('YYYY-MM-DD'),
                ThoiGianNghi_Den: dayjs($this.record.ThoiGianNghi_Den).format('YYYY-MM-DD'),
                Is_TinhLuong: $this.record.Is_TinhLuong,
                Is_TamKhoa: $this.record.Is_TamKhoa
            }, (res) => {
                $this.handleCancel()
                $this.$emit('onFinish')
                Vue.$toast.success("Chỉnh sửa ngày lễ thành công!", { position: "top" })
                $this.$refs.refFormModal.$refs.formRef.resetFields()
            })
            $this.isLoading = false
        },
    },
}
</script>