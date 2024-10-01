<template>
    <div>
        <a-card title="Nhân sự" class="card-title-page">
            <template #extra>
                <a-space size="small">
                    <a-button type="primary" @click="openModalChonLCS()"><uc-icon name="plus" />Thêm chính sách</a-button>
                </a-space>
            </template>
        </a-card>
        <a-tabs>
			<a-tab-pane key="1" tab="Chính sách nhân sự">
                <div style="height: calc(100vh - 102px); display: flex; justify-content: center; overflow: auto; padding: 8px">
                    <div style="width:900px">
                        <a-collapse expandIconPosition="start" class="bg-white">
                            <a-collapse-panel v-for="item in value.dataLSPT" :key="item.LoaiChinhSach_Id">
                                <template #header>
                                    <a-space :size="15">
                                        <!-- <div>
                                            <a-avatar :style="{color:item.ChinhSach_Mau, backgroundColor:item.ChinhSach_Nen}">
                                                <template #icon>
                                                    <uc-icon size="25" :name="item.ChinhSach_Icon" />
                                                </template>
                                            </a-avatar>
                                        </div> -->
                                        <div>
                                            <b>{{ item.TenLoaiChinhSach }}</b>
                                            <br />
                                            {{ item.SoChinhSach }} chính sách.
                                        </div>
                                    </a-space>
                                    
                                </template>
                                {{item}}
                                <!-- <a-table :columns="columns.ChinhSach" :data-source="DSLSPT.filter((x) => x.LoaiChinhSach_Id === item.LoaiChinhSach_Id)"
                                    :pagination="false" size="small">
                                    <template #bodyCell="{ column, record }">
                                        <template v-if="column.key === 'Action'">
                                            <a-dropdown :trigger="['click']">
                                                <a class="ant-dropdown-link">
                                                    <uc-icon name="dots-horizontal" />
                                                </a>
                                                <template #overlay>
                                                    <a-menu>
                                                        <a-menu-item @click="onEditPhucLoi(record)">
                                                            <uc-icon class="text-primary" name="square-edit-outline" />Chỉnh sửa
                                                        </a-menu-item>
                                                        <a-menu-item @click="onDeletePhucLoi(record)">
                                                            <uc-icon class="text-red" name="delete-outline" />Xoá
                                                        </a-menu-item>
                                                    </a-menu>
                                                </template>
                                            </a-dropdown>
                                        </template>
                                    </template>
                                </a-table> -->
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                </div>
                       
			</a-tab-pane>
			<a-tab-pane key="2" tab="Lịch sử phát triển sự nghiệp">
                <div style=" width: 100%; display: flex; justify-content: center; padding: 8px">
                    <a-row :gutter="[10,10]" style="width:1000px">
                        <a-col :span="12" v-for="cs in value.dataLSPT"> 
                            <a-card hoverable class="card-title-page">
                                <template #title>
                                    <a-space :size="15">  
                                        <div>
                                            <a-avatar size="large" :style="{color:cs.ChinhSach_Mau, backgroundColor:cs.ChinhSach_Nen}">
                                                <template #icon>
                                                    <uc-icon size="25" :name="cs.ChinhSach_Icon" />
                                                </template>
                                            </a-avatar>
                                        </div>
                                       <div style="padding:15px">
                                            <b style="fontSize:16px">{{cs.TenLoaiChinhSach}}</b><br/>
                                            <span style="fontWeight:400;fontSize:12px">{{cs.SoChinhSach}} chính sách</span>
                                       </div>
                                    </a-space>
                                </template>
                                <template #extra>
                                    <uc-icon name="chevron-right" />
                                </template>
                            </a-card>
                        </a-col>
                        
                    </a-row>
                </div>
			</a-tab-pane>
		</a-tabs>

    <uc-modal-chon-loai-chinh-sach-nhan-su v-model:isOpen="state.isOpenModalChonLCS" :record="value.dataLSPT" @onFinish="openModalAddChinhSach"/>
    <uc-modal-add-chinh-sach-nhan-su v-model:isOpen="state.isOpenModalAddChinhSach" :record="value" @onFinish="" />
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            state: {
                isOpenModalChonLCS: false,
                isOpenModalAddChinhSach: false
            },
            value: {
                DSLSPT: {},
				recordModalAdd: {},
                dataLSPT: [
                {
                    LoaiChinhSach_Id: 0,
                    TenLoaiChinhSach: 'Chính sách nhận tuyển (offers)',
                    SoChinhSach: 3,
                    ChinhSach_Icon: 'access-point',
                    ChinhSach_Mau: '#0ca22f',
                    ChinhSach_Nen: '#c9fad4',
                },
                {
                    LoaiChinhSach_Id: 1,
                    TenLoaiChinhSach: 'Chính sách bổ nhiệm',
                    ChinhSach_Icon: 'arrow-up-circle-outline',
                    SoChinhSach: 2,
                    ChinhSach_Mau: '#0ca22f',
                    ChinhSach_Nen: '#c9fad4',
                },
                {   
                    LoaiChinhSach_Id: 2,
                    ChinhSach_Mau: '#188a7f',
                    ChinhSach_Nen: '#ccf4f0',
                    ChinhSach_Icon: 'trending-up',
                    TenLoaiChinhSach: 'Chính sách tăng lương',
                    SoChinhSach: 2
                },
                {   
                    LoaiChinhSach_Id: 3,
                    ChinhSach_Mau: '#188a7f',
                    ChinhSach_Nen: '#ccf4f0',
                    ChinhSach_Icon: 'swap-horizontal-hidden',
                    TenLoaiChinhSach: 'Chính sách điều chuyển',
                    SoChinhSach: 2
                },
                {
                    LoaiChinhSach_Id: 4,
                    ChinhSach_Mau: '#309734',
                    ChinhSach_Nen: '#d9f0da',
                    ChinhSach_Icon: 'finance',
                    TenLoaiChinhSach: 'Kế hoạch phát triển',
                    SoChinhSach: 2
                },
                {
                    LoaiChinhSach_Id: 5,
                    ChinhSach_Mau: '#d09c00',
                    ChinhSach_Nen: '#fff2cd',
                    ChinhSach_Icon: 'clock-star-four-points-outline',
                    TenLoaiChinhSach: 'Kế hoạch cải thiện hiệu xuất',
                    SoChinhSach: 2
                },
                {
                    LoaiChinhSach_Id: 6,
                    ChinhSach_Mau: '#a72828',
                    ChinhSach_Nen: '#f3d8d8',
                    ChinhSach_Icon: 'slope-downhill',
                    TenLoaiChinhSach: 'Chính sách giảm cấp',
                    SoChinhSach: 2
                },
                {
                    LoaiChinhSach_Id: 7,
                    ChinhSach_Mau: '#a72828',
                    ChinhSach_Nen: '#f3d8d8',
                    ChinhSach_Icon: 'account-multiple-minus-outline',
                    TenLoaiChinhSach: 'Chính sách thôi việc',
                    SoChinhSach: 10
                },
                 {
                    LoaiChinhSach_Id: 8,
                    ChinhSach_Mau: '#d4400f',
                    ChinhSach_Nen: '#fbdfd5',
                    ChinhSach_Icon: 'hail',
                    TenLoaiChinhSach: 'Chính sách tạm nghỉ',
                    SoChinhSach: 10
                },
            ]
            },
            columns: {
                ChinhSach: [
                    {
                        title: '#',
                        dataIndex: 'stt',
                        key: 'stt',
                    },
                    {
                        title: 'Tên Chính Sách',
                        dataIndex: '',
                        key: '',
                    },
                    {
                        title: '',
                        dataIndex: 'Action',
                        key: 'Action',
                        align: 'center',
                    },
                ],
            }
        }
    },
    created() {

    },
    mounted() {

    },
    computed: {},
    watch: {},
    methods: {
        openModalChonLCS(){
            this.state.isOpenModalChonLCS = true
        },
        openModalAddChinhSach(record){
			this.value.recordModalAdd = record
			this.state.isOpenModalAddChinhSach = true
        },
        onEdit(record) {

        },
        onSave() {

        },
        onDelete(record) {

        },
    },
}
</script>