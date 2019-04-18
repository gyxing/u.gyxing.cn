<template>
    <div class="main">
        <div class="title">表结构说明</div>
        <div class="tabs">
            <span
                v-for="(item,i) in tables"
                :key="i"
                :class="{active: tab === i}"
                @click="onTab(item, i)"
            >{{item.name}}</span>
        </div>
        <div class="content" v-if="fields.length > 0">
            <div class="row head">
                <span>字段</span>
                <span>说明</span>
            </div>
            <div class="row" v-for="(d,i) in fields">
                <span>{{d.key}}</span>
                <span>{{d.text}}</span>
            </div>
        </div>
    </div>
</template>

<script src="./app.js"></script>

<style lang="less" src="./app.less"></style>
