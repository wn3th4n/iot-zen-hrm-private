<template>
    <a-modal aria-hidden="false" v-model:open="modelValue" :maskClosable="false" @cancel="StopProcess" @onSubmit="onSubmit" :closable="false" :centered="true" :width="700">
        <p>
            <b>Tính công {{ title }}</b>
        </p>
        <p class="mb-0 px-3">
            Đang tính ({{ processIndex }}/{{ processTotal }}): <b>{{ text }}</b>
            <span class="float-end" v-if="isfinish">{{ parseInt(timeexecute) }} giây</span>
        </p>
        <div class="px-3"><a-progress :percent="percentProcess" /></div>
        <a-divider class="mt-1" />
        <a-list :data-source="DSNhanVienProcess" size="small" style="overflow-y: auto; max-height: 600px">
            <template #renderItem="{ item }">
                <a-list-item class="py-0" style="height: 30px">
                    <a-list-item-meta>
                        <template #title>
                            <span class="fw-medium">{{ item.SoThuTu }}. [{{ item.MaNhanVien }}] {{ item.HoVaTenNhanVien }}</span>
                        </template>
                    </a-list-item-meta>
                    <a-spin v-if="item.TrangThai === 1" />
                    <uc-icon name="check-circle-outline" v-else-if="item.TrangThai === 2" size="20" color="success" />
                    <uc-icon v-else name="minus-circle-outline" :size="20" color="red" />
                </a-list-item>
            </template>
        </a-list>
        <template #footer>
            <a-button type="primary" @click="onSubmit" v-if="isfinish || ErrorProcess">Xác nhận</a-button>
        </template>
    </a-modal>
</template>
<script>
export default {
    emits: ['onStop', 'onSubmit', 'onFinish'],
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        processIndex: {
            type: Number,
            default: 0,
        },
        processTotal: {
            type: Number,
            default: 0,
        },
        dsnhanvienprocess: {
            type: Array,
            default: [],
        },
        title: {
            type: String,
            default: '',
        },
        isfinish: {
            type: Boolean,
            default: false,
        },
        timeexecute: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {}
    },
    computed: {
        percentProcess: function () {
            const $this = this
            const percent = ($this.processIndex / $this.processTotal) * 100
            return parseInt(percent)
        },
        DSNhanVienProcess: function () {
            return this.dsnhanvienprocess
        },
        ErrorProcess: function () {
            let indexError = this.DSNhanVienProcess.findIndex((item) => item.TrangThai === 3)
            if (indexError !== -1) {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        StopProcess() {
            this.$emit('onStop')
        },
        onSubmit() {
            this.$emit('onFinish')
            this.$emit('onSubmit')
        },
    },
}
</script>
