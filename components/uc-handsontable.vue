<template>
	<div>
		<hot-table ref="refHandsontable" v-if="data.length > 0" :data="data" :settings="settings" v-bind="$attrs"
			:cell="cell">
			<slot></slot>
		</hot-table>
		<uc-empty v-if="data.length === 0" />
	</div>
</template>

<script>
	export default {
	    components: {
	        HotTable: Handsontable.vue.HotTable,
	    },
	    props: {
	        data: {
	            type: Array,
	            required: true,
	            default: [],
	        },
	        height: {
	            type: String,
	            default: 'auto',
	        },
	    },
	    data() {
	        const heightTable = this.height
	        return {
	            settings: {
	                autoWrapCol: true,
	                colHeaders: true,
	                rowHeaders: true,
	                height: heightTable,
	                licenseKey: 'non-commercial-and-evaluation',
	                // enable the plugin with the default configuration
	                contextMenu: true,
	                copyPaste: {
	                    copyColumnHeaders: true,
	                    copyColumnGroupHeaders: true,
	                    copyColumnHeadersOnly: true,
	                },
					contextMenu:  ['copy', 'copy_with_column_headers', 'copy_with_column_group_headers', 'copy_column_headers_only']
	            },
	        }
	    },
	    methods: {
	        cell(row, col) {
	            console.log('runinng cell');
	        }
	    }
	}
</script>