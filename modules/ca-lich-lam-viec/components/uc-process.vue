<template>
    <div class="pe-3">
        <a-progress :percent="percentProcess" />
    </div>
</template>
<script>
export default {
    props: ['processIndex', 'processTotal'],
    computed: {
        percentProcess: function () {
            const $this = this
            const percent = ($this.processIndex / $this.processTotal) * 100
            return parseInt(percent)
        },
    },
    methods: {},
}
</script>
