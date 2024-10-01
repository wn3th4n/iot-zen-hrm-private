<template>
    <uc-modal :isOpen="isOpen" title="Chọn loại chính sách" :width="1100" ref="modalRef" @onClose="onClose()" >
        <a-row :gutter="[10,10]">
                <a-col :span="6" v-for="cs in record" :key="cs.LoaiChinhSach_Id">
                    <a-card hoverable :bordered="true" @click="onSubmit(cs)">
                        <div class="d-flex flex-column align-items-center" style="max-height:170px">
                            <a-avatar :size="120" :style="{color: cs.ChinhSach_Mau, backgroundColor: cs.ChinhSach_Nen}">
                                <template #icon>
                                    <uc-icon size="80" :name="cs.ChinhSach_Icon" />
                                </template>
                            </a-avatar>
                            <br />
                            <b>
                                {{ cs.LoaiChinhSach_Id === 0 ? 'QUYẾT ĐỊNH BỔ NHIỆM' :
                                cs.LoaiChinhSach_Id === 5 ? 'YÊU CẦU CẢI THIỆN HIỆU XUẤT' :
                                cs.TenLoaiChinhSach.replace('Chính sách', '').toUpperCase() }}
                            </b>
                        </div>
                    </a-card>
                </a-col>
        </a-row>
    </uc-modal>
</template>

<script>
    export default {
        emits: ["update:isOpen", "onFinish"],
		props: ["isOpen", "record"],
		data() {
			return {
                isLoading: false,
               
            };
		},
		methods: {
            onClose() {
                this.$emit("update:isOpen", false);
            },
            onSubmit(record) {
                this.$emit("onFinish",record)
                this.onClose()
            }
        }
	}
</script>