<template>
    <uc-form-modal :isOpen="isOpen" ref="refFormModal" title="Thêm địa điểm" :formData="form" :rules="rules" :width="700" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="12">
                <a-form-item label="Mã địa điểm" name="MaVanPhong">
                    <a-input v-model:value="form.MaVanPhong" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tên địa điểm" name="TenVanPhong">
                    <a-input v-model:value="form.TenVanPhong" />
                </a-form-item>
            </a-col>
            <a-col :span="10">
                <a-form-item label="Khu vực chuyên môn" name="KhuVucChuyenMon_Id">
                    <a-select v-model:value="form.KhuVucChuyenMon_Id">
                        <a-select-option v-for="item in dskhuvucchuyenmon" :value="item.KhuVucChuyenMon_Id">
                            {{ item.TenKhuVucChuyenMon }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Email" name="Email">
                    <a-input v-model:value="form.Email" />
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Điện thoại" name="DienThoai">
                    <a-input v-model:value="form.DienThoai" />
                </a-form-item>
            </a-col>
            <a-col :span="9">
                <a-form-item label="Khu vực địa lý">
                    <a-select v-model:value="form.KhuVucDiaLy_Id">
                        <a-select-option v-for="item in dskhuvucdialy" :value="item.KhuVucDiaLy_Id">
                            {{ item.TenKhuVucDiaLy }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="10">
                <a-form-item label="Vị trí cửa hàng (X, Y)" name="ToaDoChung">
                    <a-input v-model:value="form.ToaDoChung" placeholder="10.946562214, 106.82432239" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Trụ sở chính" name="Is_TruSoChinh">
                    <a-select v-model:value="form.Is_TruSoChinh">
                        <a-select-option :value="false"> Không </a-select-option>
                        <a-select-option :value="true"> Có </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Địa chỉ" name="DiaChi">
                    <a-textarea v-model:value="form.DiaChi" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'dskhuvucchuyenmon', 'dskhuvucdialy'],
    data() {
        return {
            isLoading: false,
            form: {
                MaVanPhong: '',
                KhuVucChuyenMon_Id: null,
                TenVanPhong: '',
                DiaChi: '',
                DienThoai: '',
                Email: '',
                KhuVucDiaLy_Id: null,
                ToaDo_Lat: '',
                ToaDo_Lng: '',
                ToaDoChung: '', //Gộp lat,long lại
                Is_TruSoChinh: false,
            },
            rules: {
                KhuVucChuyenMon_Id: [{ required: true, message: 'Vui lòng chọn khu vực chuyên môn', trigger: 'change' }],
                MaVanPhong: [{ required: true, message: 'Vui lòng nhập mã địa điểm', trigger: 'change' }],
                TenVanPhong: [{ required: true, message: 'Vui lòng nhập tên địa điểm', trigger: 'change' }],
                // DiaChi: [{ required: true, message: 'Vui lòng nhập địa chỉ', trigger: 'change' }],
                // DienThoai: [{ required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'change' }],
                // Email: [{ required: true, message: 'Vui lòng nhập email', trigger: 'change' }],
                // ToaDoChung: [
                //     { required: true, message: 'Vui lòng nhập tọa độ', trigger: 'change' },
                //     { pattern: /^\d+(?:\.\d+)?,\s+\d+(?:\.\d+)?$/, message: 'Tọa độ không hợp lệ' },
                // ],
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
            $this.isLoading = true
            let sliceToaDo = $this.form.ToaDoChung.split(',')
            ajaxCALL(
                '/work/HR_VanPhong_Insert',
                {
                    MaVanPhong: $this.form.MaVanPhong,
                    KhuVucChuyenMon_Id: $this.form.KhuVucChuyenMon_Id,
                    TenVanPhong: $this.form.TenVanPhong,
                    DiaChi: $this.form.DiaChi,
                    DienThoai: $this.form.DienThoai,
                    KhuVucDiaLy_Id: $this.form.KhuVucDiaLy_Id,
                    Email: $this.form.Email,
                    ToaDo_Lat: sliceToaDo[0],
                    ToaDo_Lng: sliceToaDo[1],
                    Is_TruSoChinh: $this.form.Is_TruSoChinh,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Thêm địa điểm thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
