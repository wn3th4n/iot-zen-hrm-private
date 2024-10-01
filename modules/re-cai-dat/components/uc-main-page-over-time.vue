<template>
      <a-card title="Cấu hình đề xuất làm thêm giờ" class="card-title-page">
        <template #extra>
            <a-space size="small">
                <a-dropdown :trigger="['click']">
                    <a-button type="primary" @click.prevent><uc-icon name="plus" />Thêm</a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="0"><uc-icon name="plus" />Thêm chính sách</a-menu-item>
                            <a-menu-item key="1"><uc-icon name="plus" />Thêm nhóm chính sách</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-space>
        </template>
    </a-card>

    <a-tabs>
      <a-tab-pane key="1" tab="Tất cả chính sách">
        <a-table></a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tất cả nhóm">
        <a-table></a-table>
      </a-tab-pane>
    </a-tabs>



</template>

<script>
    export default {
        
    }
</script>
