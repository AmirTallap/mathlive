<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue';
import NavLinkRecursive from './NavLinkRecursive.vue'; // <-- Import the new component

// Define the component's name
defineOptions({
    name: 'TheNavBar'
});

const emit = defineEmits(['insert-formula']);

// --- Navigation Data State (Complete array, unchanged from previous response) ---
const navItems = ref([
    {
        label: 'Links',
        icon: 'mdi-web',
        class: 'menu-links',
        type: 'header',
        children: [
            { label: 'Math proofs', type: 'link', href: 'https://github.com/AmirTallap/math' },
            { label: 'Desmos Calculator', type: 'link', href: 'https://www.desmos.com/calculator' },
            { label: 'Desmos Geometry', type: 'link', href: 'https://www.desmos.com/geometry' },
            { label: 'Desmos 3d', type: 'link', href: 'https://www.desmos.com/3d' },
        ],
    },
    {
        label: 'Formulas',
        icon: 'mdi-flask',
        class: 'menu-formulas',
        type: 'header',
        children: [
            {
                label: 'Algebra',
                type: 'header',
                children: [
                    { label: 'Quadratic Formula', type: 'formula', latex: '$$ \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a} $$' },
                    { label: 'Binomial Expansion (Squared)', type: 'formula', latex: '$$ (a+b)^2 = a^2 + 2ab + b^2 $$' },
                    { label: 'Sum of Cubes', type: 'formula', latex: '$$ a^3 + b^3 = (a+b)(a^2-ab+b^2) $$' },
                    { label: 'Difference of Squares', type: 'formula', latex: '$$ a^2 - b^2 = (a-b)(a+b) $$' },
                    { label: 'Change of Base Formula (Log)', type: 'formula', latex: '$$ \\log_b(x) = \\frac{\\ln(x)}{\\ln(b)} $$' },
                ],
            },
            {
                label: 'Differential Calculus',
                type: 'header',
                children: [
                    { label: 'Product Rule (Derivative)', type: 'formula', latex: '$$ \\frac{d}{dx} [f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x) $$' },
                    { label: 'Quotient Rule (Derivative)', type: 'formula', latex: '$$ \\frac{d}{dx} \\left[ \\frac{f(x)}{g(x)} \\right] = \\frac{g(x)f\'(x) - f(x)g\'(x)}{[g(x)]^2} $$' },
                    { label: 'Chain Rule (Leibniz Notation)', type: 'formula', latex: '$$ \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} $$' },
                    { label: 'Derivative of Sine', type: 'formula', latex: '$$ \\frac{d}{dx} \\sin(x) = \\cos(x) $$' },
                    { label: 'Derivative of $e^x$', type: 'formula', latex: '$$ \\frac{d}{dx} e^x = e^x $$' },
                ],
            },
            {
                label: 'Integral Calculus',
                type: 'header',
                children: [
                    { label: 'Definite Integral (General)', type: 'formula', latex: '$$ \\int_a^b f(x) \\, dx $$' },
                    { label: 'Power Rule (Integral)', type: 'formula', latex: '$$ \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1 $$' },
                    { label: 'Integral of 1/x', type: 'formula', latex: '$$ \\int \\frac{1}{x} \\, dx = \\ln|x| + C $$' },
                    { label: 'Integration by Parts', type: 'formula', latex: '$$ \\int u \\, dv = uv - \\int v \\, du $$' },
                    {
                        label: 'Trig Substitution',
                        type: 'header',
                        children: [
                            {
                                label: 'All Cases',
                                type: 'formula',
                                latex: '$$ \\sqrt{a^2 - x^2}, \\quad x = a\\sin\\theta, \\quad dx = a\\cos\\theta \\, d\\theta $$' +
                                       '$$ \\sqrt{a^2 + x^2}, \\quad x = a\\tan\\theta, \\quad dx = a\\sec^2\\theta \\, d\\theta $$' +
                                       '$$ \\sqrt{x^2 - a^2}, \\quad x = a\\sec\\theta, \\quad dx = a\\sec\\theta\\tan\\theta \\, d\\theta $$'
                            }
                        ]
                    }
                ],
            },
            { label: 'Euler\'s Identity (Advanced)', type: 'formula', latex: '$$ e^{i\\pi} + 1 = 0 $$' },
        ],
    },
    {
        label: 'Trig Identities',
        icon: 'mdi-infinity',
        class: 'menu-trig',
        type: 'header',
        children: [
            { label: 'Pythagorean 1', type: 'formula', latex: '$$ \\sin^2\\theta + \\cos^2\\theta = 1 $$' },
            {
                label: 'Double Angle',
                type: 'header',
                children: [
                    { label: 'Sine Double Angle', type: 'formula', latex: '$$ \\sin(2\\theta) = 2\\sin\\theta\\cos\\theta $$' },
                    { label: 'Cosine Double Angle (1)', type: 'formula', latex: '$$ \\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta $$' },
                    { label: 'Tangent Double Angle', type: 'formula', latex: '$$ \\tan(2\\theta) = \\frac{2\tan\\theta}{1 - \tan^2\\theta} $$' },
                ]
            },
            {
                label: 'Half Angle',
                type: 'header',
                children: [
                    { label: 'Sine Half Angle', type: 'formula', latex: '$$ \\sin\\left(\\frac{\\theta}{2}\right) = \\pm\\sqrt{\\frac{1-\\cos\\theta}{2}} $$' },
                    { label: 'Cosine Half Angle', type: 'formula', latex: '$$ \\cos\\left(\\frac{\\theta}{2}\right) = \\pm\\sqrt{\\frac{1+\\cos\\theta}{2}} $$' },
                ]
            },
            {
                label: 'Sum and Difference',
                type: 'header',
                children: [
                    { label: 'Sine Sum/Difference', type: 'formula', latex: '$$ \\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B $$' },
                    { label: 'Cosine Sum/Difference', type: 'formula', latex: '$$ \\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B $$' },
                ]
            },
        ]
    },
    {
        label: 'Theorem Proving',
        icon: 'mdi-flask',
        class: 'menu-formulas',
        type: 'header',
        children: [
            {
                label: 'Proof: Sine Double Angle',
                type: 'formula',
                latex: '$$ \\sin(A+B) = \\sin A \\cos B + \\cos A \\sin B $$' +
                       '$$ \\text{Let } A = x \\text{ and } B = x $$' +
                       '$$ \\sin(x+x) = \\sin x \\cos x + \\cos x \\sin x $$' +
                       '$$ \\sin(2x) = 2\\sin x \\cos x $$'
            },
            {
                label: 'Proof: Integration by Parts Example',
                type: 'formula',
                latex: '$$ \\int u \\, dv = uv - \\int v \\, du $$' +
                       '$$ \\text{Choose } u = x \\text{ and } dv = e^x \\, dx $$' +
                       '$$ \\text{Then } du = dx \\text{ and } v = e^x $$' +
                       '$$ \\int x e^x \\, dx = x e^x - \\int e^x \\, dx $$' +
                       '$$ \\int x e^x \\, dx = x e^x - e^x + C $$'
            },
        ]
    }
]);

// --- State and Logic for Menu Toggling ---
const activeMenuPath = ref([]); 

const closeAllMenus = () => {
    activeMenuPath.value = [];
};

const handleItemClick = (item, level) => {
    // 1. Handle Formula/Link Actions
    if (item.type === 'formula') {
        emit('insert-formula', item.latex);
        closeAllMenus();
        return;
    }
    if (item.type === 'link') {
        window.open(item.href, '_blank');
        closeAllMenus();
        return;
    }

    // 2. Handle Header (Sub-menu) Toggling
    if (item.type === 'header' && item.children) {
        const currentPath = activeMenuPath.value.slice(0, level);
        const newPath = [...currentPath, item.label];
        const isCurrentlyOpen = activeMenuPath.value.length > level && activeMenuPath.value[level] === item.label;

        if (isCurrentlyOpen) {
            activeMenuPath.value = currentPath;
        } else {
            activeMenuPath.value = newPath;
        }
    }
};

const isItemActive = (item, level) => {
    return activeMenuPath.value.length > level && activeMenuPath.value[level] === item.label;
};

// --- Provide/Inject Setup ---
// Provide the state and methods so NavLinkRecursive can access them without props
provide('activeMenuPath', activeMenuPath);
provide('handleItemClick', handleItemClick);


// --- Document Click Listener for Closing ---
const handleDocumentClick = (event) => {
    if (!event.target.closest('.top-nav-container')) {
        closeAllMenus();
    }
};

onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
    <div class="top-nav-container">
        <ul class="top-nav">
            <li 
                v-for="item in navItems"
                :key="item.label"
                :class="[item.class, { 'show-menu': isItemActive(item, 0) }]"
                @click.stop="handleItemClick(item, 0)"
            >
                <v-icon 
                    :icon="item.icon" 
                    :style="{ color: isItemActive(item, 0) ? '#3f3f3f' : '#ffaa33' }"
                    class="mr-2"
                ></v-icon>
                {{ item.label }}

                <NavLinkRecursive
                    v-if="item.children && isItemActive(item, 0)"
                    :items="item.children"
                    :level="1"
                />
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* Base Styles for the Top-Level Nav Bar */
.top-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    border-bottom: 2px solid var(--v-theme-primary);
    background: linear-gradient(90deg, #333333 0%, #444444 100%);
}
.top-nav > li {
    position: relative;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    display: flex;
    align-items: center;
    color: #ccc;
    z-index: 10; 
}
.top-nav > li:hover {
    background-color: var(--v-theme-secondary);
    color: white;
}
.top-nav > li.show-menu {
    background-color: var(--v-theme-primary);
    color: var(--v-theme-on-primary);
    z-index: 11;
}
/* Level 2 positioning (drops down) */
.top-nav > li > ul {
    top: 100%;
    left: 0;
}
</style>