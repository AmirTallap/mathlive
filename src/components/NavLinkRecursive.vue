<script setup>
import { inject } from 'vue';

// Define the component's name for proper recursive self-referencing
defineOptions({
    name: 'NavLinkRecursive'
});

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }
});

// Inject methods/state from TheNavBar.vue
const activeMenuPath = inject('activeMenuPath');
const handleItemClick = inject('handleItemClick');

const isItemActive = (item, level) => {
    return activeMenuPath.value.length > level && activeMenuPath.value[level] === item.label;
};
</script>

<template>
    <ul 
        :class="{ 'level-2-menu': level === 1, 'level-3-plus': level > 1 }"
    >
        <li
            v-for="subItem in items"
            :key="subItem.label"
            :class="[{ 'show-menu': isItemActive(subItem, level), 'formula-item': subItem.type === 'formula' }]"
            @click.stop="handleItemClick(subItem, level)"
        >
            <a v-if="subItem.type === 'link'" :href="subItem.href" target="_blank">{{ subItem.label }}</a>
            <span v-else>{{ subItem.label }}</span>

            <v-icon 
                v-if="subItem.children" 
                :class="{ 'rotate-90': isItemActive(subItem, level) }"
                class="menu-arrow"
                icon="mdi-chevron-right" 
                size="small"
            ></v-icon>

            <NavLinkRecursive
                v-if="subItem.children && isItemActive(subItem, level)"
                :items="subItem.children"
                :level="level + 1"
            />
        </li>
    </ul>
</template>

<style scoped>
/* Scoped styles target the root <ul> and its nested <li> elements */

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 1000;
    min-width: 280px;
    
    /* 🛑 REQUIRED SOLID BACKGROUND 🛑 */
    background-color: var(--v-theme-surface); 
    border: 1px solid var(--v-theme-primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

/* 🛑 LEVEL 3+ POSITIONING (Fly-out menus) 🛑 */
/* This rule applies to all ULs inside the component, except the L2 one whose positioning is overridden by the parent's CSS */
.level-3-plus {
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 1px;
}

li {
    position: relative;
    padding: 10px 15px;
    cursor: pointer;
    color: #ccc;
    white-space: nowrap;
    transition: background-color 0.2s;
    border-bottom: 1px solid #4d4d4d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #555555;
    border:1px solid #353232;
}
li:last-child {
    border-bottom: none;
}
li:hover {
    background-color: #555555;
    color: #ffc973;
}

li a, li span {
    color: inherit;
    text-decoration: none;
    display: block;
    flex-grow: 1;
}

/* Formula items */
.formula-item {
    font-weight: 400;
    color: #ffc973;
}
.formula-item:hover {
    font-weight: bold;
    background-color: #4d4d4d;
}

/* Arrow Icon */
.menu-arrow {
    color: var(--v-theme-primary);
    transition: transform 0.2s;
    flex-shrink: 0;
}
.menu-arrow.rotate-90 {
    transform: rotate(90deg);
}
.formula-item .menu-arrow {
    display: none;
}
</style>