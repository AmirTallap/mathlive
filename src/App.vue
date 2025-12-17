<script setup>
import { ref, onMounted, nextTick } from 'vue';
import TheNavBar from './components/TheNavBar.vue';
import MathFieldRow from './components/MathFieldRow.vue';

// The array to hold the state of all math fields
const mathFields = ref([]);

// --- Core Logic Functions ---

const addEmptyField = (focus = true) => {
    mathFields.value.push({ id: Date.now() + Math.random(), latex: '' });
    if (focus) {
        nextTick(() => {
            // Find the newly added math-field element and focus it
            const newField = document.querySelector(`.mathInputs .custom-math-field:last-child`);
            if (newField) {
                newField.focus();
                newField.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        });
    }
};

const handleFormulaInsert = (latexValue) => {
    // Regex: Find $$ (group 1: non-greedy content) $$ - using 's' flag for newlines
    const regex = /\$\$(.*?)\$\$/gs;
    let match;
    const formulaBlocks = [];

    // Extract all formulas from the multi-line string
    while ((match = regex.exec(latexValue)) !== null) {
        formulaBlocks.push(match[1].trim());
    }

    if (formulaBlocks.length === 0) {
        addEmptyField(true);
        return;
    }

    // Insert each extracted formula into a new field
    formulaBlocks.forEach(cleanLatex => {
        mathFields.value.push({ id: Date.now() + Math.random(), latex: cleanLatex });
    });

    // Focus the very last added field
    nextTick(() => {
        const newField = document.querySelector(`.mathInputs .custom-math-field:last-child`);
        if (newField) {
            newField.focus();
            newField.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });
};

const removeField = (id) => {
    mathFields.value = mathFields.value.filter(field => field.id !== id);
    if (mathFields.value.length === 0) {
        addEmptyField();
    }
};

const clearAll = () => {
    mathFields.value = [];
    addEmptyField();
};

const copyAll = async (buttonRef) => {
    const allContent = mathFields.value
        .map(field => field.latex.trim())
        .filter(content => content)
        .map(content => `$$ ${content} $$`);

    const contentToCopy = allContent.join("\n");

    const btnEl = buttonRef; 
    if (contentToCopy) {
        try {
            await navigator.clipboard.writeText(contentToCopy);
            btnEl.textContent = 'Copied! 🎉';
            setTimeout(() => { btnEl.textContent = 'Copy All'; }, 1500);
        } catch (err) {
            console.error('Could not copy text: ', err);
            btnEl.textContent = 'Failed! 😢';
            setTimeout(() => { btnEl.textContent = 'Copy All'; }, 1500);
        }
    } else {
        btnEl.textContent = 'Empty! 🧐';
        setTimeout(() => { btnEl.textContent = 'Copy All'; }, 1500);
    }
};

// Lifecycle hook to initialize with one empty field
onMounted(() => {
    addEmptyField();
});
</script>

<template>
    <v-app>
        <v-main class="bg-background">
            <TheNavBar @insert-formula="handleFormulaInsert" />

            <v-container fluid class="text-center mathInputs mt-3">
                <MathFieldRow
                    v-for="(field, index) in mathFields"
                    :key="field.id"
                    :fieldId="field.id"
                    v-model:latex="field.latex"
                    @remove="removeField(field.id)"
                    @focus-next="index === mathFields.length - 1 ? addEmptyField() : null"
                />
            </v-container>

            <v-container>
                <v-row>
                    <v-col cols="6" class="mt-5">
                        <v-btn 
                            color="primary" 
                            class="copy-all-btn" 
                            size="large" 
                            block
                            @click="copyAll($event.currentTarget)"
                        >
                            Copy All
                        </v-btn>
                    </v-col>
                    <v-col cols="6" class="mt-5">
                        <v-btn 
                            color="primary" 
                            variant="outlined"
                            size="large" 
                            block 
                            @click="clearAll"
                        >
                            Clear
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
/* Global Styles */
.custom-math-field {
    width: 100%;
    min-height: 40px;
    border: 1px solid #ff9900 !important;
    background-color: #fff;
    color: #000;
    font-size: 1.1rem;
    padding: 8px 12px;
    border-radius: 4px;
}

/* Vuetify button overrides for custom colors */
.copy-all-btn {
    background-color: #ff9900 !important;
    color: #3f3f3f !important;
    font-weight: bold;
}
.copy-all-btn:hover {
    background-color: #e68a00 !important;
}
.v-btn.v-btn--variant-outlined {
    color: #ff9900 !important;
    border-color: #ff9900 !important;
}
</style>