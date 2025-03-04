<script setup>
defineProps({
    rows: {
        type: Array,
        required: true,
    }
});
</script>
<template>
    <table>
        <tr v-for="row in rows">
            <td v-for="col in row" :class="">
                <template v-if="col">
                    <div v-for="data in col" class="result">
                        <div class="name-switch">
                            <div class="name-switch__initial">{{ data.name }}</div>
                            <div class="name-switch__alt">CF/IV</div>
                        </div>
                        <div class="formula">{{ data.formula }}</div>
                    </div>
                </template>
            </td>
        </tr>
    </table>
</template>
