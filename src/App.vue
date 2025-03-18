<script setup>
import Tabs from './components/Tabs.vue';
import {ref} from 'vue';

import {storage} from './js/includes/modules/Storage.js';

const tabItems = storage.get('tables').map((item, index) => {
    return {
        id: Symbol(),
        title: {
            key: Symbol(),
            value: item.title,
        },
        content: item.items,
        active: index === 0,
    }
});

const tabs = ref(tabItems)
</script>
<template>
    <Tabs :tabs="tabs"></Tabs>
</template>
