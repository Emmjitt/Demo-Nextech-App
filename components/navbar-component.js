export default {
  name: 'navbar-component',
  setup() {
    const darkMode = Vue.inject('darkMode');
    const compactMode = Vue.inject('compactMode');
    // Removed colorInversion injection
    const settingsOpen = Vue.inject('settingsOpen');
    const toggleDarkMode = Vue.inject('toggleDarkMode');
    const toggleCompactMode = Vue.inject('toggleCompactMode');
    // Removed toggleColorInversion injection
    const setSettingsOpen = Vue.inject('setSettingsOpen');
    
    return {
      darkMode,
      compactMode,
      settingsOpen,
      toggleDarkMode,
      toggleCompactMode,
      setSettingsOpen,
    };
  },
  template: /* html */ `
    <aside class="sidebar-nav" :class="darkMode ? 'navbar-dark' : 'navbar-light'" @mouseleave="setSettingsOpen(false)">
      <div class="sidebar-nav__header">
        <i class="bi bi-shield-lock"></i>
      </div>

      <div class="sidebar-nav__links">
        <router-link class="sidebar-nav__link" to="/">
          <i class="bi bi-house"></i>
          <span class="sidebar-nav__label">Home</span>
        </router-link>
        <router-link class="sidebar-nav__link" to="/items">
          <i class="bi bi-file-text"></i>
          <span class="sidebar-nav__label">Incidents</span>
        </router-link>
        <router-link class="sidebar-nav__link" to="/analysis">
          <i class="bi bi-graph-up"></i>
          <span class="sidebar-nav__label">Analysis</span>
        </router-link>
        <router-link class="sidebar-nav__link" to="/footage">
          <i class="bi bi-camera-reels"></i>
          <span class="sidebar-nav__label">Footage</span>
        </router-link>
      </div>

      <div class="sidebar-nav__links sidebar-nav__links--bottom">
        <a class="sidebar-nav__link" href="./portfolio/portfolio.html" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-info-circle"></i>
          <span class="sidebar-nav__label">About The Developer</span>
        </a>
        <button
          @click="setSettingsOpen(!settingsOpen)"
          class="sidebar-nav__button"
          title="Open settings">
          <i class="bi bi-sliders"></i>
          <span class="sidebar-nav__label">Settings</span>
        </button>
        <button
          @click="toggleDarkMode"
          class="sidebar-nav__button"
          :title="darkMode ? 'Light Mode' : 'Dark Mode'">
          <i :class="darkMode ? 'bi bi-brightness-high' : 'bi bi-moon'"></i>
          <span class="sidebar-nav__label">{{ darkMode ? 'Light mode' : 'Dark mode' }}</span>
        </button>
      </div>
      <div v-if="settingsOpen" class="settings-panel">
        <div class="settings-panel__header">
          <h3>Accessibility</h3>
          <button class="settings-panel__close" @click="setSettingsOpen(false)">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <label class="settings-option">
          <input type="checkbox" :checked="compactMode" @change="toggleCompactMode" />
          <span>Compact mode</span>
        </label>

        <!-- Removed color inversion setting -->
      </div>
    </aside>
  `,
};
