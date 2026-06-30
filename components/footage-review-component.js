export default {
  name: 'footage-review-component',
  setup() {
    const flaggedOnly = Vue.ref(false);
    const viewerItem = Vue.ref(null);
    const footage = Vue.ref([]);
    const isLoading = Vue.ref(true);
    const error = Vue.ref('');

    // Load footage data from CSV
    Vue.onMounted(() => {
      fetch('footage-template.csv')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not load footage data file.');
          }
          return response.text();
        })
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: ({ data, errors }) => {
              if (errors.length > 0) {
                error.value = 'There was a problem reading the footage data.';
                footage.value = [];
              } else {
                footage.value = data.map((row) => ({
                  id: String(row.id || '').trim(),
                  time: String(row.time || '').trim(),
                  location: String(row.location || '').trim(),
                  thumbnail: String(row.thumbnail || '').trim(),
                  flagged: String(row.flagged || 'false').trim() === 'true',
                  notes: String(row.notes || '').trim(),
                }));
                error.value = '';
              }
              isLoading.value = false;
            },
            error: () => {
              error.value = 'There was a problem parsing footage data.';
              footage.value = [];
              isLoading.value = false;
            },
          });
        })
        .catch(() => {
          error.value = 'There was a problem loading footage data.';
          footage.value = [];
          isLoading.value = false;
        });
    });

    const filtered = Vue.computed(() => {
      if (flaggedOnly.value) return footage.value.filter(f => f.flagged);
      return footage.value;
    });

    const openViewer = (item) => {
      viewerItem.value = item;
    };

    const closeViewer = () => {
      viewerItem.value = null;
    };

    const toggleFlag = (item) => {
      item.flagged = !item.flagged;
    };

    return { flaggedOnly, footage, isLoading, error, filtered, openViewer, closeViewer, viewerItem, toggleFlag };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0"><i class="bi bi-camera-reels me-2"></i>Footage Review</h1>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flaggedOnly" v-model="flaggedOnly">
          <label class="form-check-label small" for="flaggedOnly">Show flagged only</label>
        </div>
      </div>

      <p class="text-muted">Review recorded footage and open flagged segments for closer inspection.</p>

      <div v-if="isLoading" class="alert alert-secondary" role="status">
        Loading footage...
      </div>

      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <div v-else-if="footage.length === 0" class="alert alert-warning" role="alert">
        No footage available.
      </div>

      <div v-else class="row g-3 mt-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="clip in filtered" :key="clip.id">
          <div class="card h-100 shadow-sm footage-card">
            <div
              class="ratio ratio-16x9 footage-thumb"
              @click="openViewer(clip)"
              :style="{ cursor: 'pointer', backgroundImage: 'url(' + clip.thumbnail + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
            ></div>
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="mb-0">{{ clip.location }}</h5>
                <span class="badge text-bg-light">{{ clip.time }}</span>
              </div>

              <p class="small text-muted flex-grow-1">{{ clip.notes }}</p>

              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" @click="openViewer(clip)">View</button>
                <button class="btn btn-sm btn-outline-secondary" @click="toggleFlag(clip)">{{ clip.flagged ? 'Unflag' : 'Flag' }}</button>
                <span v-if="clip.flagged" class="ms-auto badge bg-danger align-self-center">Flagged</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Viewer Modal -->
      <div v-if="viewerItem" class="viewer-modal">
        <div class="viewer-backdrop" @click="closeViewer"></div>
        <div class="viewer-content card shadow-lg">
          <button class="btn-close ms-auto" aria-label="Close" @click="closeViewer"></button>
          <div class="ratio ratio-16x9 mb-3">
            <img :src="viewerItem.thumbnail" alt="footage" class="w-100 h-100 object-fit-cover" />
          </div>
          <div class="p-3">
            <h5>{{ viewerItem.location }} <small class="text-muted">{{ viewerItem.time }}</small></h5>
            <p class="small text-muted">{{ viewerItem.notes }}</p>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-danger" @click="toggleFlag(viewerItem)">{{ viewerItem.flagged ? 'Unflag' : 'Flag' }}</button>
              <button class="btn btn-sm btn-outline-secondary" @click="closeViewer">Close</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};
