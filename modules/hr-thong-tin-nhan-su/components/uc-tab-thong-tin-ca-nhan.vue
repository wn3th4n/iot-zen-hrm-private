<template>
    <a-card class="card-title-page" :bodyStyle="{ 'height': 'calc(100vh - 1px)', overflow: 'auto' }">
        <h2 class="text-primary mb-0">{{ itemtab.tab }}</h2>
        <span>{{ itemtab.subcontent }}</span>
        <a-divider></a-divider>
        <div class="mt-3">
            <a-collapse v-model:activeKey="activeKey" ghost collapsible="header" :accordion="false">
                <a-collapse-panel :key="item.id" v-for="(item, indexTitle) in itemtab.Title">
                    <template #header>
                        <b class="fs-6">{{ item.Ten }}</b> <br />
                        <span>{{ item.MoTa }} </span>
                    </template>
                    <a-row :gutter="[10, 15]" class="ps-4" v-if="item.DuLieu.length > 0 && !item.isTable">
                        <a-col :span="6" v-for="x in item.DuLieu">
                            <div class="d-flex flex-column">
                                <b>{{ x.label }}:</b>
                                <span v-if="x.value">{{ x.value }}</span>
                                <span v-else>-</span>
                            </div>
                        </a-col>
                    </a-row>
                    <a-table v-else-if="item.isTable && item.isNameTable === 'thong-tin-hoc-van'"
                        :columns="item.Columns" :data-source="item.DuLieu" size="small" :pagination="false">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'Is_BangCapCaoNhat'">
                                <uc-icon v-if="record.Is_BangCapCaoNhat" name="check" class="text-success" />
                            </template>
                        </template>
                    </a-table>
                    <a-table v-else-if="item.isTable && item.isNameTable === 'lich-su-lam-viec'" :columns="item.Columns"
                        :data-source="item.DuLieu" size="small" :pagination="false">
                    </a-table>
                    <a-table v-else-if="item.isTable && item.isNameTable === 'thong-tin-nguoi-than'"
                        :columns="item.Columns" :data-source="item.DuLieu" size="small" :pagination="false">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'NgaySinh'">
                                {{ dayjs(record.NgaySinh).format('DD/MM/YYYY') }}
                            </template>
                        </template>
                    </a-table>
                    <a-table v-else-if="item.isTable && item.isNameTable === 'ho-so-xin-viec'" :columns="item.Columns"
                        :data-source="item.DuLieu" size="small" :pagination="false">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'FileName'">
                                <a target="_blank" :href="urlReadFile + record.File_Id">{{ record.FileName }}</a>
                            </template>
                        </template>
                    </a-table>
                    <uc-empty v-else />
                    <a-divider v-if="indexTitle !== itemtab?.Title?.length - 1"></a-divider>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </a-card>
</template>

<script>
export default {
    props: ['itemtab', "user"],
    data() {
        return {
            activeKey: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            urlReadFile: vueData.v_Set.urlReadFile
        }
    },
    mounted() { },
    computed: {},
    watch: {},
    methods: {
        dayjs: dayjs
    },
}
</script>
