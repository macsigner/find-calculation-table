<script setup>

import { shortNames } from '../js/includes/tools.js';

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
                <template v-if="col">
                    <div v-for="data in col" class="result">
                        <div class="name-switch">
                            <div class="name-switch__initial">{{ data.name }}</div>
                            <div class="name-switch__alt">{{ shortNames.get(data.name).shortName }}</div>
                        </div>
                        <div class="formula">{{ data.formula }}</div>
                    </div>
                </template>
            </td>
        </tr>
    </table>
</template>
