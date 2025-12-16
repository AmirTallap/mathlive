// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // MDI icons

// --- Theme Configuration ---
const customTheme = {
    dark: true,
    colors: {
        background: '#3f3f3f', // body background
        surface: '#333333', // nav/card background
        primary: '#ff9900', // Bright Orange (buttons/accents)
        'on-primary': '#3f3f3f', // Dark text on primary
        secondary: '#555555', // Hover color
        error: '#FF5252',
    },
};

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme,
        },
    },
    icons: {
        defaultSet: 'mdi',
    },
});

const app = createApp(App);
app.use(vuetify);
app.mount('#app');