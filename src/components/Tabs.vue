<script setup>
import EditEntry from '@/components/EditEntry.vue';
import DependencyTable from '@/components/DependencyTable.vue';

defineProps({
    tabs: {
        type: Array,
        required: true,
    }
});

const createDependencyTable = (content) => {
    let dependencies = content.flatMap(item => item.dependencies).sort();
    dependencies = Array.from(new Set(dependencies));
    const crossing = {
        type: 'crossing',
    };

    let rows = dependencies.map(row => {
        const cols = dependencies.map(col => {
            if (col === row) {
                return crossing;
            }

            const match = content.filter(item => item.dependencies.includes(row) && item.dependencies.includes(col));

            return match.length === 0 ? null : {results: [...match], type: 'dependencies'};
        });

        return cols;
    });

    rows = rows.map(row => {
        const relevantCells = row.slice;
        const cols = row.map(col => {
            return col;
        });

        return cols;
    });

    return rows;
}

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
                <DependencyTable :rows="createDependencyTable(tab.content)"></DependencyTable>
            </dd>
        </template>
    </dl>
</template>
<style scoped>

</style>
