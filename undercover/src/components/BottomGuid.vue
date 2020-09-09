<template>
    <div>
        <van-grid clickable :column-num="3" class="guid">
            <van-grid-item icon="smile-o" text="开始游戏" to="/home" />
            <van-grid-item icon="search" text="游戏词库" to="/word" />
            <van-grid-item icon="user-o" text="我的账户" to="/my" />
        </van-grid>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
    .van-grid {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

</style>