<script setup>

import { shortNames } from '../js/includes/tools.js';
import Results from '@/components/Results.vue';

defineProps({
    rows: {
        type: Array,
        required: true,
    }
});
</script>
<template>
    <table>
        <tr v-for="(row, rowKey) in rows">
            <td v-for="(col, colKey) in row" :class="{
                'crossing-cell': rowKey === colKey,
            }">
                    <Results :results="col.results" v-if="col?.type === 'dependencies'"></Results>
            </td>
        </tr>
    </table>
</template>
