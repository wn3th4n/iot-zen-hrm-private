<template>
	<a-spin :spinning="isLoading">
		<a-checkbox-group :value="value" @change="onChange" class="w-100">
			<a-row :gutter="[10,10]">
					<a-col :span="4" v-for="item in dsVanPhong">
                        <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
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
			dsVanPhong: []
        }
    },
    mounted() {
        const $this = this
        $this.isLoading = true

        ajaxCALL('/work/HR_VanPhong_Select', {}, (res) => {
                $this.dsVanPhong = res.data.map((item) => ({
                    value: item.VanPhong_Id,
                    label: item.TenVanPhong,
                }))
                $this.isLoading = false
         })
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