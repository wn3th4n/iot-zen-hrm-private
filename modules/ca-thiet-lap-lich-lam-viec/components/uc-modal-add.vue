<template>
    <uc-form-modal ref="refFormModal" v-model:isOpen="isOpen" title="Thêm mới" :formData="form" @onSubmit="onFinish"
        :rules="rules" :width="700" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-row :gutter="[10]">
                    <a-col :span="24">
                        <a-form-item label="Sao chép công thức">
                            <uc-select-mau-bang-cong v-model:value="form.MauBangCong_Clone_Id" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="10">
                        <a-form-item label="Mã lịch làm việc" name="MaMauBangCong">
                            <a-input v-model:value="form.MaMauBangCong" placeholder="Nhập mã Lịch làm việc..."
                                allow-clear autoFocus />
                        </a-form-item>
                    </a-col>
                    <a-col :span="14">
                        <a-form-item label="Tên lịch làm việc" name="TenMauBangCong">
                            <a-input v-model:value="form.TenMauBangCong" placeholder="Nhập tên Lịch làm việc..."
                                allow-clear />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Người quản lý" name="NguoiQuanLy_Id">
                            <uc-select-nhan-vien v-model:value="form.NguoiQuanLy_Id"></uc-select-nhan-vien>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Người phân ca" name="NguoiPhanCa_Id">
                            <uc-select-nhan-vien v-model:value="form.NguoiPhanCa_Id"></uc-select-nhan-vien>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Người chốt công" name="NguoiChotCong_Id">
                            <uc-select-nhan-vien v-model:value="form.NguoiChotCong_Id"></uc-select-nhan-vien>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Yêu cầu chấm công">
                            <a-select v-model:value="form.Is_CheckInOut" defaultActiveFirstOption>
                                <a-select-option :value="0" :key="0"> Không </a-select-option>
                                <a-select-option :value="1" :key="1"> Có </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Loại lịch" name="Is_CoDinh">
                            <a-select v-model:value="form.Is_CoDinh">
                                <a-select-option :value="0" :key="0"> Lịch theo ca </a-select-option>
                                <a-select-option :value="1" :key="1"> Lịch cố định </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item label="Tạm khóa" name="Is_TamKhoa">
                            <a-select v-model:value="form.Is_TamKhoa">
                                <a-select-option :value="0"> Không </a-select-option>
                                <a-select-option :value="1"> Có </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-col>
            <a-col v-if="IsCheckCoDinh === false" :span="24">
                <template v-for="thu in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']">
                    <a-row :gutter="[8, 8]" style="display: flex">
                        <a-col :span="5" style="display: flex; flex-direction: column; gap: 8px; align-self: center">
                            <b>Thứ {{ thu }}</b>
                            <a-checkbox v-model:value="form[thu + '_Is_NgayNghi']">Ngày nghỉ</a-checkbox>
                        </a-col>
                        <a-col :span="3" style="display: flex; flex-direction: column; gap: 12px; align-self: center">
                            <b>Ca 1</b>
                            <b>Ca 2</b>
                        </a-col>
                        <a-col :span="5" style="display: flex; flex-direction: column; gap: 8px; align-self: center">
                            <a-time-picker v-model:value="form[thu + '_C1_VaoCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" />
                            <a-time-picker v-model:value="form[thu + '_C2_VaoCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" />
                        </a-col>
                        <a-col :span="5" style="display: flex; flex-direction: column; gap: 8px; align-self: center">
                            <a-time-picker v-model:value="form[thu + '_C1_RaCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" />
                            <a-time-picker v-model:value="form[thu + '_C2_RaCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" />
                        </a-col>
                        <a-col :span="6" style="display: flex; flex-direction: column; gap: 8px; align-self: center">
                            <uc-select-ca-mau v-model:value="form[thu + '_C1_CaMau_Id']"
                                :initData="[{ text: form[thu + '_C1_MaCaMau'], value: form[thu + '_C1_CaMau_Id'] }]" />
                            <uc-select-ca-mau v-model:value="form[thu + '_C2_CaMau_Id']"
                                :initData="[{ text: form[thu + '_C2_MaCaMau'], value: form[thu + '_C2_CaMau_Id'] }]" />
                        </a-col>
                    </a-row>
                </template>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>

<script>
export default {
    props: ['isOpen'],
    emits: ['onFinish'],
    data() {
        return {
            form: {
                MaMauBangCong: null,
                TenMauBangCong: null,
                NguoiQuanLy_Id: undefined,
                NguoiPhanCa_Id: undefined,
                NguoiChotCong_Id: undefined,
                Is_CoDinh: 0, // 0: theo giờ, 1: cố định
                Is_CheckInOut: 0, // 0: Không, 1: có
                Is_TamKhoa: 0,
                T2_Is_NgayNghi: false,
                T2_C1_VaoCa: null,
                T2_C1_RaCa: null,
                T2_C1_CaMau_Id: undefined,
                T2_C2_VaoCa: null,
                T2_C2_RaCa: null,
                T2_C2_CaMau_Id: undefined,
                T2_C3_VaoCa: null,
                T2_C3_RaCa: null,
                T2_C3_CaMau_Id: undefined,
                T3_Is_NgayNghi: false,
                T3_C1_VaoCa: null,
                T3_C1_RaCa: null,
                T3_C1_CaMau_Id: undefined,
                T3_C2_VaoCa: null,
                T3_C2_RaCa: null,
                T3_C2_CaMau_Id: undefined,
                T3_C3_VaoCa: null,
                T3_C3_RaCa: null,
                T3_C3_CaMau_Id: undefined,
                T4_Is_NgayNghi: false,
                T4_C1_VaoCa: null,
                T4_C1_RaCa: null,
                T4_C1_CaMau_Id: undefined,
                T4_C2_VaoCa: null,
                T4_C2_RaCa: null,
                T4_C2_CaMau_Id: undefined,
                T4_C3_VaoCa: null,
                T4_C3_RaCa: null,
                T4_C3_CaMau_Id: undefined,
                T5_Is_NgayNghi: false,
                T5_C1_VaoCa: null,
                T5_C1_RaCa: null,
                T5_C1_CaMau_Id: undefined,
                T5_C2_VaoCa: null,
                T5_C2_RaCa: null,
                T5_C2_CaMau_Id: undefined,
                T5_C3_VaoCa: null,
                T5_C3_RaCa: null,
                T5_C3_CaMau_Id: undefined,
                T6_Is_NgayNghi: false,
                T6_C1_VaoCa: null,
                T6_C1_RaCa: null,
                T6_C1_CaMau_Id: undefined,
                T6_C2_VaoCa: null,
                T6_C2_RaCa: null,
                T6_C2_CaMau_Id: undefined,
                T6_C3_VaoCa: null,
                T6_C3_RaCa: null,
                T6_C3_CaMau_Id: undefined,
                T7_Is_NgayNghi: false,
                T7_C1_VaoCa: null,
                T7_C1_RaCa: null,
                T7_C1_CaMau_Id: undefined,
                T7_C2_VaoCa: null,
                T7_C2_RaCa: null,
                T7_C2_CaMau_Id: undefined,
                T7_C3_VaoCa: null,
                T7_C3_RaCa: null,
                T7_C3_CaMau_Id: undefined,
                CN_Is_NgayNghi: false,
                CN_C1_VaoCa: null,
                CN_C1_RaCa: null,
                CN_C1_CaMau_Id: undefined,
                CN_C2_VaoCa: null,
                CN_C2_RaCa: null,
                CN_C2_CaMau_Id: undefined,
                CN_C3_VaoCa: null,
                CN_C3_RaCa: null,
                CN_C3_CaMau_Id: undefined,
                MauBangCong_Clone_Id: 1
            },
            columns: [
                { title: 'Lịch cố định', dataIndex: 'Ngay', scopedSlots: { customRender: 'combineNgay' } },
                { title: '', dataIndex: 'Ca_1', scopedSlots: { customRender: 'combineCa_1' } },
            ],
            rules: {
                MaMauBangCong: RULE_VALIDATE.CODE,
                TenMauBangCong: [{ required: true, message: 'Vui lòng nhập tên lịch làm việc', trigger: 'change' }],
                NguoiChotCong_Id: [{ required: true, message: 'Vui lòng nhập người chốt công', trigger: 'change' }],
                NguoiPhanCa_Id: [{ required: true, message: 'Vui lòng nhập người phân ca', trigger: 'change' }],
                NguoiQuanLy_Id: [{ required: true, message: 'Vui lòng nhập người quản lý', trigger: 'change' }],
            },
        }
    },
    computed: {
        IsCheckCoDinh() {
            let flag = this.form.Is_CoDinh === 0
            return flag
        },
    },
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        async onFinish() {
            const cloneForm = { ...this.form }
            for (let key in cloneForm) {
                if (key.includes('VaoCa') || key.includes('RaCa')) {
                    cloneForm[key] = cloneForm[key] ? moment(cloneForm[key]).format('HH:mm') : null
                }
                if (key.includes('CaMau_Id')) {
                    cloneForm[key] = cloneForm[key] === undefined ? 0 : cloneForm[key]
                }
                if (key.includes('Is_NgayNghi')) {
                    cloneForm[key] = cloneForm[key] ? 1 : 0
                }
            }
            const isInsert = await mauBangCongService.MauBangCong_Insert(cloneForm)
            if (isInsert) {
                this.$message.success('Thêm lịch làm việc thành công')
                this.handleCancel()
                this.$emit('onFinish')
            }
        },
    },
}
</script>
