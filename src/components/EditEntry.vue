<script setup>
import { vModelText } from 'vue';

defineProps({
    entry: {
        type: vModelText,
        mandatory: true,
    }
})
</script>

<template>
    <template v-if="typeof entry === 'object'">
        <span class="edit-entry">
            <slot></slot>
            <input v-model="entry.value" class="edit-entry__editor"/>
        </span>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>

<style scoped>
.edit-entry {
    position: relative;
}
</style>
