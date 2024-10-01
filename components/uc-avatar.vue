<template>
    <a-avatar :size="size" :style="{ 'background-color': src ? 'unset' : stringToColor(text) }">
        <template #icon>
            <a-image v-if="src" :src="urlReadFile + src" alt="Avatar" :preview="false"></a-image>
            <p v-else :style="{ 'font-size': size / 2 + 'px' }">{{ text && text.split(' ').pop()[0] }}</p>
        </template>
    </a-avatar>
</template>
<script>
export default {
    props: {
        size: {
            default: 28
        },
        src: {
            type: String,
        },
        text: {
            type: String,
        }
    },
    data() {
        return {
            urlReadFile: vueData.v_Set.urlReadFile
        }
    },
    methods: {
        stringToColor(str) {
            if (str) {
                let hash = 0
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash)
                }
                let color = '#'
                for (let i = 0; i < 3; i++) {
                    let value = (hash >> (i * 8)) & 0xFF
                    color += ('00' + value.toString(16)).slice(-2)
                }
                return color
            }
        }
    }
}
</script>