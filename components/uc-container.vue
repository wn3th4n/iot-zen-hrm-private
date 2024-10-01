<template>
    <!-- class="uc-container" -->
    <div style="display: flex; justify-content: center; overflow: auto; height: calc(100vh - 66px); padding: 8px">
        <div :style="'width:' + width + 'px'">
            <slot></slot>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        width: { type: Number, default: 600 },
    },
}
</script>
