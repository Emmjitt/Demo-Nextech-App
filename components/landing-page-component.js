export default {
  name: 'landing-page-component',
  data() {
    return {
      aboutVisible: false,
    };
  },
  methods: {
    toggleAbout() {
      this.aboutVisible = !this.aboutVisible;
    },
  },
  template: /* html */ `
    <div class="container py-4">
      <h1 class="mb-3"><i class="bi bi-shield-lock me-2"></i>Vaulted</h1>
      <p class="lead">Security Dashboard for Bank Incident Investigation</p>
      <router-link to="/items" class="btn mb-4" style="background-color: #2a3e4f; color: white; border: none;"><i class="bi bi-file-text me-1"></i>View Incidents</router-link>

      <h2 class="h3 mt-4">Key Features</h2>
      <ul style="font-size: 1.25rem;">
        <li><strong>Incident Tracking:</strong> View all security events with detailed descriptions and locations</li>
        <li><strong>Investigation Support:</strong> Access security footage, system logs, and timeline data</li>
        <li><strong>Evidence Review:</strong> Examine access records and breach details side-by-side</li>
        <li><strong>Pattern Analysis:</strong> Identify unusual activities and potential suspects</li>
      </ul>

      <section id="about-section" style="margin-top: 2rem;">
        <h2 class="h4">About Vaulted</h2>
        <p v-if="aboutVisible" style="line-height: 1.6;">
          Vaulted is a professional security dashboard designed for bank security managers and investigation teams. It provides a centralized system to log, track, and review critical security incidents. Security teams can access detailed reports on breaches, access violations, system failures, and investigation leads—all in one organized location.
        </p>
        <button @click="toggleAbout" class="toggle-about-btn">
          {{ aboutVisible ? 'Read Less' : 'Read More' }}
        </button>
      </section>
    </div>
  `,
};
