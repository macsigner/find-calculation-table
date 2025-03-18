<script setup>
import {shortNames} from '@/js/includes/tools.js';

defineProps({
    results: {
        type: Object,
        required: true,
    }
});
</script>
<template>
    <div v-for="result in results" class="result" v-if="results">
        <div class="name-switch">
            <div class="name-switch__initial">{{ result.name }}</div>
            <div class="name-switch__alt">{{ shortNames.get(result.name)?.shortName }}</div>
        </div>
        <div class="formula">{{ result.formula }}</div>
    </div>
</template>
