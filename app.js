import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';
import DataAnalysisPageComponent from './components/data-analysis-page-component.js';
import FootageReviewComponent from './components/footage-review-component.js';
const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
  {
    path: '/footage',
    component: FootageReviewComponent,
  },
  {
    path: '/analysis',
    component: DataAnalysisPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  setup() {
    const getStoredDarkMode = () => {
      try {
        return localStorage.getItem('darkMode') === 'true';
      } catch (error) {
        console.warn('Unable to read dark mode setting:', error);
        return false;
      }
    };

    const persistDarkMode = (value) => {
      try {
        localStorage.setItem('darkMode', String(value));
      } catch (error) {
        console.warn('Unable to save dark mode setting:', error);
      }
    };

    const darkMode = Vue.ref(getStoredDarkMode());
    const compactMode = Vue.ref(false);
    // Removed colorInversion feature
    const settingsOpen = Vue.ref(false);

    const getStoredPreference = (key, fallback = false) => {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value === 'true';
      } catch (error) {
        console.warn(`Unable to read ${key}:`, error);
        return fallback;
      }
    };

    const persistPreference = (key, value) => {
      try {
        localStorage.setItem(key, String(value));
      } catch (error) {
        console.warn(`Unable to save ${key}:`, error);
      }
    };

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      persistDarkMode(darkMode.value);
    };

    const toggleCompactMode = () => {
      compactMode.value = !compactMode.value;
      persistPreference('compactMode', compactMode.value);
    };

    // Removed toggleColorInversion function

    const applyDarkModeClass = (isDarkMode) => {
      const appElement = document.getElementById('app');
      if (!appElement) {
        return;
      }

      if (isDarkMode) {
        appElement.classList.add('dark-mode');
      } else {
        appElement.classList.remove('dark-mode');
      }
    };

    const applyAccessibilityClasses = () => {
      const appElement = document.getElementById('app');
      if (!appElement) {
        return;
      }

      appElement.classList.toggle('compact-mode', compactMode.value);
      // Removed color inversion class toggle
      applyDarkModeClass(darkMode.value);
    };

    // Watch preferences and update the DOM classes
    Vue.watch(darkMode, (newValue) => {
      applyDarkModeClass(newValue);
    });

    Vue.watch(compactMode, () => {
      applyAccessibilityClasses();
    });

    // Removed watch on colorInversion

    // Set initial accessibility classes on mount
    Vue.onMounted(() => {
      // Removed colorInversion provide
      // Removed toggleColorInversion provide
      applyAccessibilityClasses();
    });

    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
    });

    const resolveImageUrl = (value) => {
      const trimmed = String(value || '').trim();
      if (!trimmed) {
        return '';
      }

      if (/^(https?:|data:|blob:)/i.test(trimmed)) {
        return trimmed;
      }

      const baseUrl = window.location.href.includes('#')
        ? window.location.href.split('#')[0]
        : window.location.href;

      return new URL(trimmed, baseUrl).toString();
    };

    const loadCsvData = async () => {
      const csvFiles = ['items.csv', 'items-template.csv'];

      for (const fileName of csvFiles) {
        try {
          const response = await fetch(fileName);
          if (response.ok) {
            return await response.text();
          }
        } catch (error) {
          console.warn(`Unable to load ${fileName}:`, error);
        }
      }

      throw new Error('Could not load CSV data file.');
    };

    loadCsvData()
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors }) => {
            if (errors.length > 0) {
              itemsStore.error = 'There was a problem reading the CSV data.';
              itemsStore.items = [];
            } else {
              itemsStore.items = data.map((row) => ({
                id: String(row.id || '').trim(),
                name: String(row.name || '').trim(),
                description: String(row.description || '').trim(),
                category: String(row.category || '').trim(),
                imageUrl: resolveImageUrl(row.image_url || row.image || row.imageUrl || ''),
                location: String(row.location || '').trim(),
              }));
              itemsStore.error = '';
            }
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'There was a problem parsing CSV data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      })
      .catch(() => {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      });

    Vue.provide('itemsStore', itemsStore);
    Vue.provide('darkMode', darkMode);
    Vue.provide('compactMode', compactMode);
    Vue.provide('settingsOpen', settingsOpen);
    Vue.provide('toggleDarkMode', toggleDarkMode);
    Vue.provide('toggleCompactMode', toggleCompactMode);
    const setSettingsOpen = (value) => {
      settingsOpen.value = value;
    };
    Vue.provide('setSettingsOpen', setSettingsOpen);

    return { darkMode, compactMode, settingsOpen, toggleDarkMode, toggleCompactMode, setSettingsOpen };
  },
});



app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
