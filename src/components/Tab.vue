<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div class="tabs__item-wrapper">
        <h2 class="tabs__title">{{ title }}</h2>
        <div class="tabs__item">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>

</style>
