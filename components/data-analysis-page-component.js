export default {
  name: 'data-analysis-page-component',
  setup() {
    const activeTab = Vue.ref('patterns');

    return {
      activeTab,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <h1><i class="bi bi-graph-up me-2"></i>Investigation Data Analysis</h1>
      <p class="text-muted">Review patterns, financial data, access logs, and employee activity during the incident timeline.</p>

      <div class="mt-4">
        <div class="tab-buttons btn-group" role="group">
          <button 
            @click="activeTab = 'patterns'"
            :class="['btn', 'tab-btn', activeTab === 'patterns' ? 'active' : '']">
            <i class="bi bi-diagram-3 me-1"></i>Patterns
          </button>
          <button 
            @click="activeTab = 'financial'"
            :class="['btn', 'tab-btn', activeTab === 'financial' ? 'active' : '']">
            <i class="bi bi-cash-coin me-1"></i>Financial
          </button>
          <button 
            @click="activeTab = 'access'"
            :class="['btn', 'tab-btn', activeTab === 'access' ? 'active' : '']">
            <i class="bi bi-door-open me-1"></i>Access Logs
          </button>
          <button 
            @click="activeTab = 'employees'"
            :class="['btn', 'tab-btn', activeTab === 'employees' ? 'active' : '']">
            <i class="bi bi-people me-1"></i>Employee Logs
          </button>
        </div>
      </div>

      <!-- Patterns Tab -->
      <div v-show="activeTab === 'patterns'" class="mt-4">
        <h2 class="h4">Timeline of Unusual Activity</h2>
        <table class="table table-sm analysis-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th>Location</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>2:35 AM</strong></td>
              <td>James Mitchell enters control room (logged as routine check)</td>
              <td>Control Room</td>
              <td><span class="badge bg-danger">High</span></td>
            </tr>
            <tr>
              <td><strong>2:40 AM</strong></td>
              <td>Motion sensors deactivated in Vault Wing</td>
              <td>Vault Wing</td>
              <td><span class="badge bg-danger">Critical</span></td>
            </tr>
            <tr>
              <td><strong>2:45 AM</strong></td>
              <td>Vault 4 cameras go offline</td>
              <td>Vault Room 4</td>
              <td><span class="badge bg-danger">Critical</span></td>
            </tr>
            <tr>
              <td><strong>2:47 AM</strong></td>
              <td>Unauthorized keycard access (Mitchell's card)</td>
              <td>South Entrance</td>
              <td><span class="badge bg-danger">Critical</span></td>
            </tr>
            <tr>
              <td><strong>2:51 AM</strong></td>
              <td>Vault 4 cameras restored (6 min downtime)</td>
              <td>Vault Room 4</td>
              <td><span class="badge bg-danger">Critical</span></td>
            </tr>
            <tr>
              <td><strong>3:15 AM</strong></td>
              <td>James Mitchell clocks out</td>
              <td>Main Office</td>
              <td><span class="badge bg-warning">Medium</span></td>
            </tr>
          </tbody>
        </table>
        <p class="text-muted mt-3"><strong>Pattern Analysis:</strong> All critical events occurred within 36 minutes and involved security system failures. James Mitchell's badge was used during the surveillance gap, suggesting possible coordination.</p>
      </div>

      <!-- Financial Tab -->
      <div v-show="activeTab === 'financial'" class="mt-4">
        <h2 class="h4">Suspicious Financial Activity</h2>
        <table class="table table-sm analysis-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Activity</th>
              <th>Amount</th>
              <th>Timeline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sarah Chen</strong><br><small>(Low-level employee)</small></td>
              <td>ATM withdrawals (unusual frequency)</td>
              <td><strong>$45,000</strong></td>
              <td>Past 2 weeks</td>
              <td><span class="badge bg-danger">Suspicious</span></td>
            </tr>
            <tr>
              <td><strong>James Mitchell</strong><br><small>(Facilities Manager)</small></td>
              <td>No unusual transactions detected</td>
              <td>—</td>
              <td>Past 3 months</td>
              <td><span class="badge bg-warning">Under Review</span></td>
            </tr>
            <tr>
              <td><strong>Daniel Torres</strong><br><small>(Security Officer)</small></td>
              <td>No unusual transactions detected</td>
              <td>—</td>
              <td>Past 3 months</td>
              <td><span class="badge bg-warning">Under Review</span></td>
            </tr>
          </tbody>
        </table>
        <p class="text-muted mt-3"><strong>Notes:</strong> Sarah Chen's ATM withdrawals may indicate financial motive or prior knowledge. Cross-reference with employment records and statement to her supervisor.</p>
      </div>

      <!-- Access Logs Tab -->
      <div v-show="activeTab === 'access'" class="mt-4">
        <h2 class="h4">Security System Access Records</h2>
        <div class="alert alert-info">
          <strong>System Access Clearance Levels:</strong> Only 3 staff members have supervisor access codes to disable alarm systems.
        </div>
        <table class="table table-sm analysis-table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Access Code</th>
              <th>Authorized Personnel</th>
              <th>Accessed During Incident?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Control Room</strong></td>
              <td>CR-7392-X</td>
              <td>Security Chief, Facilities Manager, Senior Tech</td>
              <td><span class="badge bg-danger">YES</span> (2:35 AM)</td>
            </tr>
            <tr>
              <td><strong>Vault Wing</strong></td>
              <td>VW-5401-Z</td>
              <td>Security Chief, Facilities Manager, Senior Tech</td>
              <td><span class="badge bg-danger">YES</span> (2:40 AM)</td>
            </tr>
            <tr>
              <td><strong>Safe Deposit Area</strong></td>
              <td>SB-8829-M</td>
              <td>Security Chief, Manager on Duty, Bank Officer</td>
              <td><span class="badge bg-danger">YES</span> (2:47 AM)</td>
            </tr>
            <tr>
              <td><strong>South Entrance</strong></td>
              <td>SE-Keycard</td>
              <td>All authorized staff</td>
              <td><span class="badge bg-danger">YES</span> (2:47 AM - Mitchell)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Employee Logs Tab -->
      <div v-show="activeTab === 'employees'" class="mt-4">
        <h2 class="h4">Employee Activity During Incident</h2>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card employee-card suspect">
              <div class="card-body">
                <h5 class="card-title">James Mitchell</h5>
                <p class="card-text"><strong>Role:</strong> Facilities Manager</p>
                <p class="card-text"><strong>Shift:</strong> Night shift (11 PM - 7 AM)</p>
                <p class="card-text"><strong>Key Activity:</strong></p>
                <ul class="small">
                  <li>Logged into Control Room at 2:35 AM (claimed routine check)</li>
                  <li>Access code CR-7392-X used (has supervisor clearance)</li>
                  <li>Clocked out at 3:15 AM</li>
                </ul>
                <p class="card-text"><strong>Status:</strong> <span class="badge bg-danger">Prime Suspect</span></p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card employee-card under-review">
              <div class="card-body">
                <h5 class="card-title">Daniel Torres</h5>
                <p class="card-text"><strong>Role:</strong> Security Officer</p>
                <p class="card-text"><strong>Shift:</strong> Night shift (11 PM - 7 AM)</p>
                <p class="card-text"><strong>Key Activity:</strong></p>
                <ul class="small">
                  <li>Left security post at 2:30 AM (unusual)</li>
                  <li>Reported to have unusual behavior earlier in week</li>
                  <li>No unauthorized access codes used</li>
                </ul>
                <p class="card-text"><strong>Status:</strong> <span class="badge bg-warning">Under Investigation</span></p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card employee-card under-review">
              <div class="card-body">
                <h5 class="card-title">Sarah Chen</h5>
                <p class="card-text"><strong>Role:</strong> Low-level Employee</p>
                <p class="card-text"><strong>Shift:</strong> Day shift (off duty during incident)</p>
                <p class="card-text"><strong>Key Activity:</strong></p>
                <ul class="small">
                  <li>Not on duty during incident (clocked out 6 PM)</li>
                  <li>Suspicious ATM withdrawals ($45,000 in 2 weeks)</li>
                  <li>May indicate financial motive</li>
                </ul>
                <p class="card-text"><strong>Status:</strong> <span class="badge bg-warning">Under Investigation</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};
