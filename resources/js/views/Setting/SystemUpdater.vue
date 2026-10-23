<template>
  <div class="page-content-wrapper">
    <div class="page-heading">
      <div class="page-title"><div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ __('system_updater') }}</h3>
        </div>
        <div class="col-12 col-md-6 order-md-2 order-first">
          <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                  <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
              </li>
              <li class="breadcrumb-item"><router-link to="/system_settings">{{ __('settings') }}</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ __('system_updater') }}</li>
            </ol>
          </nav>
        </div>
      </div></div>
    </div>

    <div class="page-content">
      <div class="row">
        <div class="col-12 col-lg-8">

          <div class="card" v-if="updaterResult && updaterResult.description">
            <div class="card-header">
              <div>
                <h4 class="card-title float-none">{{ __('change_logs_of_egrocer') }} {{'v - '+ updaterResult.version }} </h4>
                <p class="text-muted small mb-0 mt-1">{{ tr('system_updater_desc', 'Review the changes in this release, then update the system.') }}</p>
              </div>
              <span class="pull-right">
                <span class="badge bg-primary" >
                    {{ __('new_update_available') }}<span class="badge rounded-pill bg-success text-white ms-1">{{'v - '+ updaterResult.version }}</span>
                </span>
              </span>
            </div>
            <div class="card-body">
                <span id="update_description" v-html="updaterResult.description"></span>
                <div class="d-flex justify-content-end border-top pt-3 mt-2">
                    <b-button @click="systemUpdate" type="button" variant="primary" :disabled="isLoading">
                        <span v-if="isLoading"><b-spinner small label="Spinning"></b-spinner>  {{ __('system_is_updating') }}</span>
                        <span v-else> {{ __('update_the_system') }}</span>
                    </b-button>
                </div>
            </div>
          </div>
          <div class="card" v-else>
            <div class="card-header">
              <div>
                <h4 class="card-title float-none"> {{ __('system_is_up_to_date') }}</h4>
                <p class="text-muted small mb-0 mt-1">{{ tr('system_up_to_date_desc', 'You are running the latest version. New updates will appear here.') }}</p>
              </div>
              <span class="pull-right">
                <span class="badge bg-primary">
                  {{ __('egrocer_current_version_is') }}
                  <span class="badge rounded-pill bg-success text-white ms-1">{{ 'v - '+$currentVersion }}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>



import axios from "axios";

export default {
  data: function () {
    return {
        isLoading: false,
        updaterResult: {
            version:'0.0.0'
        }

    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },

  created: function () {
    this.checkSystemRegister();
  },
  methods: {
      tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
      checkSystemRegister(){
          axios.get(this.$apiUrl + '/store_settings/purchase_code_updater').then((response) => {
            console.log(response.data);
            if (response.data == 1) {
                    this.checkSystemUpdate();
                }
            
          });
          
      },
      checkSystemUpdate(){
          axios.get(this.$baseUrl + '/updater.check').then((response) => {
              let result = JSON.stringify(response.data);
              this.updaterResult = JSON.parse(result);
          });
      },
      systemUpdate(){

          this.$swal.fire({
              title: "Are you Sure?",
              text: "You want be able to revert this",
              confirmButtonText: "Yes, Sure",
              cancelButtonText: "Cancel",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: 'var(--theme-primary-500)',
              cancelButtonColor: 'var(--theme-error-500)',
          }).then(result => {
              if (result.value) {

                  this.isLoading = true;
                  axios.get(this.$baseUrl + "/updater.update").then((response) => {
                      if (response != '') {
                          this.showMessage("success", "Congratulation System Updated Successfully");
                          this.checkSystemUpdate();
                          this.isLoading = false;
                          setTimeout(() => {
                              window.location.href = this.$baseUrl + '/migration';
                          }, 5000);
                      } else {
                          this.showMessage("error", "Something went wrong! System did not update.");
                          this.showError("Something went wrong! System did not update.");
                          this.isLoading = false;
                      }
                  }).catch(() => {
                      // The update request can die (timeout / fatal while the vendor folder is being
                      // replaced) after the files are already written. The database still has to be
                      // migrated, and /migration is a new request that runs on the updated code.
                      this.isLoading = false;
                      this.showError("The update request did not finish cleanly. Finishing the database update...");
                      setTimeout(() => {
                          window.location.href = this.$baseUrl + '/migration';
                      }, 5000);
                  });
              }
          });

      },
  },
};
</script>

<style scoped>
.page-content-wrapper {
  min-height: calc(95vh - 200px);
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding-bottom: 2rem;
}

.card {
  margin-bottom: 2rem;
}

.card > .card-header:last-child {
  border-bottom: 0 !important; /* header-only card: global .card-header border uses !important */
  border-radius: var(--ui-radius-lg) !important;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

/* Ensure proper spacing for footer */
@media (min-height: 600px) {
  .page-content-wrapper {
    min-height: calc(95vh - 150px);
  }
}
</style>
