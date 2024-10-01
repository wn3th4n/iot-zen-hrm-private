<template>
	<a-spin :spinning="isLoading">
		<a-checkbox-group :value="value" @change="onChange" class="w-100">
			<a-row :gutter="[10]">
					<a-col :span="4" v-for="item in dsPhanHe">
							<b class="text-primary">{{item.TenPhanHe}}</b><br/>
							<div v-for="item2 in dsQuyen" class="d-flex flex-column" :key="item2.value">
								<a-checkbox v-if="item2.key === item.PhanHe_Id":value="item2.value">{{ item2.label }}</a-checkbox>
							</div>
					</a-col>
			</a-row>
		</a-checkbox-group>
	</a-spin>
</template>
<script>
	export default {
    props: {
        value: { type: Array, required: true },
    },
    data() {
        return {
            isLoading: false,
            selectedItems: [],
			dsPhanHe: [],
			dsQuyen: []
        }
    },
    async mounted() {
        const $this = this
        $this.isLoading = true
        const res = await quyenService.Quyen_Select().finally(() => {
            $this.isLoading = false
        })
        
		$this.dsPhanHe = res[0]
		$this.dsQuyen = res[1].map((item) => ({
			value: item.Quyen_Id,
			label: item.TenQuyen,
			key: item.PhanHe_Id,
		}))

        $this.selectedItems = $this.value
    },
    methods: {
        onChange(data) {
            this.selectedItems = data
            this.$emit('update:value', data)
        },
		
    },
}
</script>