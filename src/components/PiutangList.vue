<template>
    <div>
      <b-container>
        <!-- Search and Action Buttons -->
        <b-row>
          <b-col>
            <!-- Search button on the left -->
            <b-button variant="primary">Search</b-button>
          </b-col>
          <b-col class="text-right">
            <!-- Buttons on the right -->
            <b-button variant="success">Refresh</b-button>
            <b-button variant="info">Bayar</b-button>
            <b-button variant="warning">Export</b-button>
          </b-col>
        </b-row>
  
        <!-- Table List with Pagination -->
        <b-table striped hover :items="piutangList" :fields="fields" :per-page="perPage"></b-table>
      </b-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        piutangList: [], // Your piutang list data
        perPage: 10, // Number of items per page
        fields: [
          { key: 'check', label: 'Check' },
          { key: 'noKewajiban', label: 'No. Kewajiban' },
          { key: 'noPolisi', label: 'No. Polisi' },
          { key: 'pemilik', label: 'Pemilik' },
        ],
      };
    },
    // Component logic here
  };
  </script>
  
  <style scoped>
  /* Component styles here */
  </style>
  