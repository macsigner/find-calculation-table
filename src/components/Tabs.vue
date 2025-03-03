<script setup>
import EditEntry from '@/components/EditEntry.vue';

defineProps({
    tabs: {
        type: Array,
        required: true,
    }
})

const setActiveTab = (tab, tabs) => {
    tabs.forEach(single => {
        single.active = single.id === tab.id;
    });
};
</script>
<template>
    <dl class="tabs">
        <template v-for="(tab) of tabs">
            <dt @click="setActiveTab(tab, tabs)" class="tabs__title" :class="(tab.active) ? 'active' : ''">
                <EditEntry :entry="tab.title">{{ tab.title.value }}</EditEntry>
            </dt>
            <dd class="tabs__item">
                {{ tab.content }}
            </dd>
        </template>
    </dl>
</template>
<style scoped>

</style>
