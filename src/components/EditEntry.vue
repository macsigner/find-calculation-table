<script setup>
import { ref, useTemplateRef, vModelText } from 'vue';
import { onMounted, onUnmounted } from 'vue';

defineProps({
    entry: {
        type: vModelText,
        mandatory: true,
    },
});

const editWrapper = useTemplateRef('editWrapper');

let edit = ref(false);

const toggleEdit = (e) => edit.value = !edit.value;
const onClickOutsideListener = (e) => {
    if (editWrapper.value?.contains(e.target) || e.target === editWrapper.value) {
        return;
    }

    edit.value = false;
}

onMounted(() => {
    document.addEventListener('click', onClickOutsideListener)
});

onUnmounted(() => {
    document.removeEventListener('click', onClickOutsideListener);
});
</script>

<template>
    <template v-if="typeof entry === 'object'">
        <span class="edit-entry" ref="editWrapper">
            <slot v-if="!edit"></slot>
            <input v-else v-model="entry.value" class="edit-entry__editor" autofocus/>
            <button class="icon icon--edit" @click="toggleEdit"></button>
        </span>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>

<style scoped>
.icon {
    display: inline-block;
    margin-left: .8em;
}
</style>
