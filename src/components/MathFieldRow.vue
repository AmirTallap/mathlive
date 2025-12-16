<script setup>
import { onMounted, watch } from 'vue';
import 'mathlive'; // Import MathLive to ensure the custom element is defined

const props = defineProps({
    latex: String,
    fieldId: [String, Number]
});

const emit = defineEmits(['update:latex', 'remove', 'focus-next']);

let mathFieldRef; // Will hold the reference to the DOM element

onMounted(() => {
    // Get the reference after component mounts
    mathFieldRef = document.getElementById(`math-field-${props.fieldId}`);
    
    if (mathFieldRef) {
        mathFieldRef.value = props.latex;

        // Listener for input changes (updates v-model:latex in App.vue)
        mathFieldRef.addEventListener('input', (event) => {
            emit('update:latex', event.target.getValue());
        });

        // Listener for Enter key (tells App.vue to focus next or add a new field)
        mathFieldRef.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                emit('focus-next'); 
            }
        });
    }
});

// Watch for external changes to the 'latex' prop (e.g., when a formula is inserted)
watch(() => props.latex, (newLatex) => {
    if (mathFieldRef && mathFieldRef.value !== newLatex) {
        mathFieldRef.value = newLatex;
    }
});
</script>

<template>
    <v-row no-gutters class="align-center mb-2">
        <v-col class="d-flex w-100">
            <math-field 
                :id="`math-field-${fieldId}`"
                class="custom-math-field flex-grow-1"
            ></math-field>
            
            <v-btn 
                color="error" 
                variant="outlined"
                size="small" 
                class="ml-2 clearButton flex-shrink-0"
                @click="$emit('remove')"
            >
                Remove
            </v-btn>
        </v-col>
    </v-row>
</template>