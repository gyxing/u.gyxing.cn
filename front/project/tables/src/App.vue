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
            <div class="table" v-for="(t,i) in fields" :key="'t_'+i">
                <div class="name" v-if="t.name">{{t.name}}</div>
                <div class="row head">
                    <span>字段</span>
                    <span>说明</span>
                </div>
                <div class="row" v-for="(d,k) in t.fields" :key="'f_'+k">
                    <span>{{d.key}}</span>
                    <span>{{d.text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./app.js"></script>

<style lang="less" src="./app.less"></style>
