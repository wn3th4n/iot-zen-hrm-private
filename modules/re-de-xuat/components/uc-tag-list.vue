<template>
    <a-tag  v-for="KhungGio of dsKhungGio" :color="!KhungGio.Is_QuaDem? 'blue' : 'warning'" :class="[dsKhungGio.length > 1 ? 'mt-2': '']">
        <template #icon>
            <uc-icon name="clock-outline" />
        </template>
       [{{KhungGio.NgayLamThem}}] {{ KhungGio.GioBatDau }}  - {{ KhungGio.GioKetThuc }} 
    </a-tag>
</template>
<script>
    export default { 
        props: ["dsKhungGio"] ,
    } 
</script>