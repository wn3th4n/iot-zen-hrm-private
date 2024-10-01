<template>
    <uc-form-modal :isOpen="isOpen" :title="title" :width="1500" @onClose="onCloseModal()" ref="refFormModal" @onSubmit="onSubmit()" :formData="formData">
        <div class="p-2">
            <b>Công thức:</b><br />
            <a-spin :spinning="spinning">
                <a-row class="mt-2" :gutter="[10]" v-if="dsCongThuc.length > 0">
                    <a-col :xs="24" :md="6" v-for="item in dsCongThuc" :key="item.ChuKyLuong_TinhCong_Id">
                        <div class="d-flex flex-row justify-content-between">
                            <b>{{ item?.ThuTu }}. {{ item?.TenThuocTinh }}:</b>
                            <a-input-number :controls="false" size="small" class="input-number-align-right mb-1" v-if="item.LoaiDuLieu === 'NUM'" v-model:value="formData['GiaTri_' + item.ChuKyLuong_TinhCong_Id]" :formatter="formatter" :parser="parser" style="width: 100px" />
                            <a-input v-if="item.LoaiDuLieu === 'TEXT'" v-model:value="formData['GiaTri_' + item.ChuKyLuong_TinhCong_Id]" />
                        </div>
                    </a-col>
                </a-row>
                <uc-empty v-else-if="!spinning && dsCongThuc.length === 0" />
            </a-spin>
        </div>
    </uc-form-modal>
</template>

<script>
export default {
    emits: ['onFinish', 'update:isOpen'],
    props: ['isOpen', 'record', 'chukyluongid', 'maubangluongid'],
    data() {
        return {
            dsCongThuc: [],
            formData: {},
            spinning: false,
            loading: false,
        }
    },
    computed: {
        title: function () {
            return 'Bảng lương - ' + this.record.HoVaTenNhanVien
        },
    },
    mounted() {},
    watch: {
        isOpen(val) {
            if (val) {
                console.log('record', this.record)
                this.loadCongThuc()
            }
        },
        loading(val) {
            if (val) {
                this.spinning = true
            } else {
                this.spinning = false
            }
        },
    },
    methods: {
        onCloseModal() {
            const $this = this
            $this.dsCongThuc = []

            $this.$emit('update:isOpen', false)
        },
        loadCongThuc() {
            const $this = this
            $this.loading = true
            chuKyLuongService
                .ChuKyLuong_TinhCong_Select_By_NhanVien_Id({
                    ChuKyLuong_Id: $this.chukyluongid,
                    MauBangLuong_Id: $this.maubangluongid,
                    NhanVien_Id: $this.record.NhanVien_Id,
                })
                .then((data) => {
                    const dataFormModel = {}
                    data[0].forEach((item) => {
                        const keyModel = `GiaTri_${item.ChuKyLuong_TinhCong_Id}`
                        const valueModel = item.LoaiDuLieu === 'NUM' ? item.GiaTri_So : item.GiaTri_VanBan
                        dataFormModel[keyModel] = valueModel
                    })
                    $this.formData = dataFormModel
                    $this.dsCongThuc = data[0]
                    $this.loading = false

                    console.log('$this.dsCongThuc', $this.dsCongThuc)
                })
        },
        async onSubmit() {
            const $this = this
            console.log('data dau', this.formData)
            const dataParamJson = []
            $this.dsCongThuc.forEach((ct) => {
                dataParamJson.push({
                    ChuKyLuong_TinhCong_Id: ct.ChuKyLuong_TinhCong_Id,
                    GiaTri: $this.formData[`GiaTri_${ct.ChuKyLuong_TinhCong_Id}`],
                })
            })
            const params = {
                ChuKyLuong_Id: $this.chukyluongid,
                MauBangLuong_Id: $this.maubangluongid,
                NhanVien_Id: $this.record.NhanVien_Id,
                ChuKyLuong_TinhCong_JSON: JSON.stringify(dataParamJson),
            }
            console.log('params', params)
            const res = await chuKyLuongService.ChuKyLuong_TinhCong_Update(params)
            if (res) {
                $this.$message.success('Chỉnh sửa thành công!')
                $this.onCloseModal()
                $this.$emit('onFinish')
            }
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
    },
}
</script>
