<template>
	<span :class="iconClass" :style="iconStyle"></span>
</template>

<script>
	export default {
		props: {
			name: { type: String, default: 'circle' },
			size: { type: String },
			color: { type: String, default: '' },
			class: { type: String, default: '' },
		},
		computed: {
			iconClass: function () {
				const $this = this
				const icName = `mdi mdi-${$this.name}`
				const icColor = $this.color ? `text-${$this.color}` : ''
				return icName + ' ' + icColor + ' ' + $this.class
			},
			iconStyle: function () {
				const $this = this
				return `font-size: ${$this.size}px`
			},
		},
	}
</script>