<script setup>
import Tabs from './components/Tabs.vue';
import { reactive, ref } from 'vue';

const tabItems = [
    {
        id: Symbol(),
        title: {
            key: Symbol(),
            value: 'Tab one',
        },
        content: 'Tab content one',
        active: true,
    },
    {
        id: Symbol(),
        title: {
            key: Symbol(),
            value: 'Tab two',
        },
        content: 'Tab content two',
        active: false,
    },
    {
        id: Symbol(),
        title: {
            key: Symbol(),
            value: 'Tab three',
        },
        content: 'Tab content three',
        active: false,
    },
].map(item => {
    Object.keys(item).forEach(key => {
        item[key] = typeof item[key] === 'string' ? ref(item[key]) : item[key];
    });

    return item;
});

const tabs = ref(tabItems)</script>
<template>
    <Tabs :tabs="tabs"></Tabs>
</template>
