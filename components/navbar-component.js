export default {
  name: 'navbar-component',
  setup() {
    const darkMode = Vue.inject('darkMode');
    const toggleDarkMode = Vue.inject('toggleDarkMode');
    
    return {
      darkMode,
      toggleDarkMode,
    };
  },
  template: /* html */ `
    <nav class="navbar sticky-top px-3" :class="darkMode ? 'navbar-dark' : 'navbar-light'">
      <span class="navbar-brand mb-0 h1" style="font-weight: 700;"><i class="bi bi-shield-lock me-2"></i>Vaulted Security</span>

      <div class="ms-auto d-flex gap-2">
        <router-link class="btn btn-outline-primary btn-sm" to="/">
          <i class="bi bi-house me-1"></i>Home
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
          <i class="bi bi-file-text me-1"></i>Incidents
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/analysis">
          <i class="bi bi-graph-up me-1"></i>Analysis
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/footage">
          <i class="bi bi-camera-reels me-1"></i>Footage
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          <i class="bi bi-info-circle me-1"></i>About
        </router-link>
        <button 
          @click="toggleDarkMode" 
          class="btn btn-outline-primary btn-sm ms-2"
          :title="darkMode ? 'Light Mode' : 'Dark Mode'">
          <i :class="darkMode ? 'bi bi-brightness-high' : 'bi bi-moon'"></i>
        </button>
      </div>
    </nav>
  `,
};
