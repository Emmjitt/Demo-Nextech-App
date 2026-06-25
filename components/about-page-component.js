export default {
  name: 'about-page-component',
  template: /* html */ `
    <section class="container py-4">
      <h1>About Vaulted</h1>
      
      <h2 class="h4 mt-4">Overview</h2>
      <p>
        Vaulted is a security investigation platform built to help bank security managers track and analyze critical incidents. The system provides organized access to incident logs, security footage references, system status data, and investigation leads—allowing teams to quickly identify patterns and suspects.
      </p>

      <h2 class="h4 mt-4">How to Use This App</h2>
      <ol>
        <li><strong>View Incidents:</strong> Navigate to the "Incidents" page to see all logged security events</li>
        <li><strong>Review Details:</strong> Click on any incident to view the full report, location, category, and description</li>
        <li><strong>Look for Patterns:</strong> Compare dates, locations, and involved staff to identify connections</li>
        <li><strong>Document Findings:</strong> Use the detailed information to support your investigation</li>
      </ol>

      <h2 class="h4 mt-4">About This Prototype</h2>
      <p>
        Vaulted is currently in the early prototype phase. This version demonstrates how security managers can view incident data in an organized, professional dashboard. Future versions will include real-time alerts, advanced filtering, team collaboration tools, and secure report generation.
      </p>
    </section>
  `,
};
