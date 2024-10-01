<template>
    <uc-form-modal v-model:isOpen="isOpen" ref="refFormModal" title="Chỉnh sửa địa điểm" :formData="record" :rules="rules" :width="700" @onSubmit="onFinish" :isSubmit="isLoading" @onClose="handleCancel()">
        <a-row :gutter="[10]">
            <a-col :span="12">
                <a-form-item label="Mã địa điểm" name="MaVanPhong">
                    <a-input v-model:value="record.MaVanPhong" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="Tên địa điểm" name="TenVanPhong">
                    <a-input v-model:value="record.TenVanPhong" />
                </a-form-item>
            </a-col>
            <a-col :span="10">
                <a-form-item label="Khu vực chuyên môn" name="KhuVucChuyenMon_Id">
                    <a-select v-model:value="record.KhuVucChuyenMon_Id">
                        <a-select-option v-for="item in dskhuvucchuyenmon" :value="item.KhuVucChuyenMon_Id">
                            {{ item.TenKhuVucChuyenMon }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Điện thoại" name="DienThoai">
                    <a-input v-model:value="record.DienThoai" />
                </a-form-item>
            </a-col>
            <a-col :span="7">
                <a-form-item label="Email" name="Email">
                    <a-input v-model:value="record.Email" />
                </a-form-item>
            </a-col>

            <a-col :span="10">
                <a-form-item label="Vị trí cửa hàng (X, Y)" name="ToaDoChung">
                    <a-input v-model:value="record.ToaDoChung" placeholder="10.946562214, 106.82432239" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Trụ sở chính" name="Is_TruSoChinh">
                    <a-select v-model:value="record.Is_TruSoChinh">
                        <a-select-option :value="0"> Không </a-select-option>
                        <a-select-option :value="1"> Có </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item label="Địa chỉ" name="DiaChi">
                    <a-textarea v-model:value="record.DiaChi" />
                </a-form-item>
            </a-col>
        </a-row>
    </uc-form-modal>
</template>
<script>
export default {
    emits: ['onFinish'],
    props: ['isOpen', 'record', 'dskhuvucchuyenmon'],
    data() {
        return {
            isLoading: false,
            rules: {
                KhuVucChuyenMon_Id: [{ required: true, message: 'Vui lòng chọn khu vực chuyên môn', trigger: 'change' }],
                TenVanPhong: [{ required: true, message: 'Vui lòng nhập tên địa điểm', trigger: 'change' }],
                MaVanPhong: [{ required: true, message: 'Vui lòng nhập mã địa điểm', trigger: 'change' }],
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
    watch: {
        isOpen: function (val) {
            if (val) {
                this.record.ToaDoChung = this.record.ToaDo_Lat + ', ' + this.record.ToaDo_Lng
            }
        },
    },
    methods: {
        handleCancel() {
            const $this = this
            $this.$emit('update:isOpen', false)
        },
        onFinish() {
            const $this = this
            $this.isLoading = true
            let sliceToaDo = $this.record.ToaDoChung.split(', ')
            ajaxCALL(
                '/work/HR_VanPhong_Update',
                {
                    VanPhong_Id: $this.record.VanPhong_Id,
                    MaVanPhong: $this.record.MaVanPhong,
                    KhuVucChuyenMon_Id: $this.record.KhuVucChuyenMon_Id,
                    TenVanPhong: $this.record.TenVanPhong,
                    DiaChi: $this.record.DiaChi,
                    DienThoai: $this.record.DienThoai,
                    Email: $this.record.Email,
                    ToaDo_Lat: sliceToaDo[0],
                    ToaDo_Lng: sliceToaDo[1],
                    Is_TruSoChinh: $this.record.Is_TruSoChinh,
                },
                (res) => {
                    $this.handleCancel()
                    $this.$emit('onFinish')
                    Vue.$toast.success('Chỉnh sửa địa điểm thành công!', { position: 'top' })
                    $this.$refs.refFormModal.$refs.formRef.resetFields()
                },
            )
            $this.isLoading = false
        },
    },
}
</script>
