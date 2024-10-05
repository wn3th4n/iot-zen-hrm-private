<template>
    <uc-form-modal v-model:isOpen="isOpen" title="Cập nhật" :formData="form" ref="refFormModal" @onSubmit="onFinish"
        :rules="rules" :width="800" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="24">
                <a-row :gutter="[10]">
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
                            <uc-select-nhan-vien v-model:value="form.NguoiQuanLy_Id"
                                :initData="[{ text: form.TenNguoiQuanLy, value: form.NguoiQuanLy_Id }]"></uc-select-nhan-vien>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Người phân ca" name="NguoiPhanCa_Id">
                            <uc-select-nhan-vien v-model:value="form.NguoiPhanCa_Id"
                                :initData="[{ text: form.TenNguoiPhanCa, value: form.NguoiPhanCa_Id }]"></uc-select-nhan-vien>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Người chốt công" name="NguoiChotCong_Id">
                            <uc-select-nhan-vien v-model:value="form.NguoiChotCong_Id"
                                :initData="[{ text: form.TenNguoiChotCong, value: form.NguoiChotCong_Id }]"></uc-select-nhan-vien>
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
                    <a-col :span="12">
                        <a-form-item label="Chọn văn phòng" name="VanPhong_Id">
                            <uc-select-van-phong v-model:value="form.VanPhong_Id"></uc-select-van-phong>
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
            <a-col v-if="form.Is_CoDinh === 1" :span="24" class="mb-3">
                <template v-for="thu in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']">
                    <a-row :gutter="[10, 10]" style="display: flex" class="mt-4">
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
                                format="HH:mm" style="width: 100%" :disabled="form.Is_CoDinh === 1" />
                            <a-time-picker v-model:value="form[thu + '_C2_VaoCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" :disabled="form.Is_CoDinh === 1" />
                        </a-col>
                        <a-col :span="5" style="display: flex; flex-direction: column; gap: 8px; align-self: center">
                            <a-time-picker v-model:value="form[thu + '_C1_RaCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" :disabled="form.Is_CoDinh === 1" />
                            <a-time-picker v-model:value="form[thu + '_C2_RaCa']" placeholder="hh:mm" :minuteStep="5"
                                format="HH:mm" style="width: 100%" :disabled="form.Is_CoDinh === 1" />
                        </a-col>
                        <a-col :span="6" style="display: flex; flex-direction: column; gap: 8px; align-self: center">
                            <!-- <uc-select-ca-mau v-model:value="form[thu + '_C1_CaMau_Id']" :initData="[{ text: form[thu + '_C1_MaCaMau'], value: form[thu + '_C1_CaMau_Id'] }]" /> -->
                            <!-- <uc-select-ca-mau v-model:value="form[thu + '_C2_CaMau_Id']" :initData="[{ text: form[thu + '_C2_MaCaMau'], value: form[thu + '_C2_CaMau_Id'] }]" /> -->
                            <a-select v-model:value="form[thu + '_C1_CaMau_Id']" placeholder="Chọn ca mẫu..."
                                @change="loadCaMau_C1_Select_By_Id(form[thu + '_C1_CaMau_Id'], thu)">
                                <a-select-option v-for="item in DSCaMau" :value="item.CaMau_Id">[{{ item.MaCaMau }}] {{
                                    item.TenCa }}</a-select-option>
                            </a-select>
                            <a-select v-model:value="form[thu + '_C2_CaMau_Id']" placeholder="Chọn ca mẫu..."
                                @change="loadCaMau_C2_Select_By_Id(form[thu + '_C2_CaMau_Id'], thu)">
                                <a-select-option v-for="item in DSCaMau" :value="item.CaMau_Id">[{{ item.MaCaMau }}] {{
                                    item.TenCa }}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                </template>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'mauBangCong', 'DSCaMau'],
    data() {
        return {
            form: {
                MaMauBangCong: null,
                TenMauBangCong: null,
                NguoiQuanLy_Id: undefined,
                NguoiPhanCa_Id: undefined,
                NguoiChotCong_Id: undefined,
                VanPhong_Id: null,
                Is_CoDinh: 0, // 0: theo giờ, 1: cố định
                Is_CheckInOut: 0, // 0: Không, 1: có
                Is_TamKhoa: 0,
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
    watch: {
        isOpen: function (isShow) {
            if (isShow && this.mauBangCong.MauBangCong_Id) {
                this.form = { ...this.mauBangCong }
                console.log(' this.form', this.form)
            }
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
                    cloneForm[key] = cloneForm[key] !== null ? cloneForm[key].format('HH:mm') : null
                }
                if (key.includes('CaMau_Id')) {
                    cloneForm[key] = cloneForm[key] === undefined ? 0 : cloneForm[key]
                }
                if (key.includes('Is_NgayNghi')) {
                    cloneForm[key] = cloneForm[key] ? 1 : 0
                }
            }

            const isUpdate = await mauBangCongService.MauBangCong_Update(cloneForm)
            if (isUpdate) {
                this.handleCancel()
                this.$message.success('Chỉnh sửa lịch làm việc thành công')
                this.$emit('onFinish')
            }
        },
        async loadCaMau_C1_Select_By_Id(camauid, thu) {
            const res = await caService.CaMau_Select_By_Id({ CaMau_Id: camauid })
            if (res) {
                this.$refs.refFormModal.$refs.formRef.clearValidate()
                this.form[thu + '_C1_VaoCa'] = dayjs(res[0].GioBatDau, 'HH:mm')
                this.form[thu + '_C1_RaCa'] = dayjs(res[0].GioKetThuc, 'HH:mm')
            }
        },
        async loadCaMau_C2_Select_By_Id(camauid, thu) {
            const res = await caService.CaMau_Select_By_Id({ CaMau_Id: camauid })
            if (res) {
                console.log('this.form[thu + _C2_VaoCa]', this.form[thu + '_C2_VaoCa'])
                this.$refs.refFormModal.$refs.formRef.clearValidate()
                this.form[thu + '_C2_VaoCa'] = dayjs(res[0].GioBatDau, 'HH:mm')
                this.form[thu + '_C2_RaCa'] = dayjs(res[0].GioKetThuc, 'HH:mm')
            }
        },
    },
}
</script>
