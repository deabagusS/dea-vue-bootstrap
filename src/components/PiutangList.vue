<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Library</li>
      </ol>
    </nav>

    <div v-show="showDrawer" class="drawer text-start shadow-lg">
      <div class="card h-100">
          <div class="card-header">
              <h5 class="card-title">Filter</h5>
          </div>
          <div class="card-body" style="overflow: auto;">
            <div class="row mb-3">
              <label class="form-label mb-0">Tanggal Lelang</label>
              <div class="input-group input-group-sm">
                <input type="date" class="form-control" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="date" class="form-control" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">Tanggal Jatuh Tempo</label>
              <div class="input-group input-group-sm">
                <input type="date" class="form-control" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="date" class="form-control" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">Tanggal Lunas</label>
              <div class="input-group input-group-sm">
                <input type="date" class="form-control" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="date" class="form-control" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">Harga Terbentuk</label>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" placeholder="Minimum" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="number" class="form-control" placeholder="Maksimum" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">Biaya Admin ex PPN</label>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" placeholder="Minimum" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="number" class="form-control" placeholder="Maksimum" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">PPN</label>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" placeholder="Minimum" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="number" class="form-control" placeholder="Maksimum" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">Total</label>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" placeholder="Minimum" v-model="filterValue">
                <span class="input-group-text">S/d</span>
                <input type="number" class="form-control" placeholder="Maksimum" v-model="filterValue">
              </div>
            </div>

            <div class="row mb-3">
              <label class="form-label mb-0">Total</label>
              <div class="col">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="prosespembayaran" id="flexCheckDefault" v-model="filterValue">
                  <label class="form-check-label" for="flexCheckDefault">
                    Proses Pembayaran
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="konfirmasi" id="flexCheckChecked" v-model="filterValue">
                  <label class="form-check-label" for="flexCheckChecked">
                    Konfirmasi Pembayaran
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="lunas" id="flexCheckChecked" checked v-model="filterValue">
                  <label class="form-check-label" for="flexCheckChecked">
                    Lunas
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-sm btn-dark me-2" @click="toggleDrawer">Batal</button>
            <button type="button" class="btn btn-sm btn-primary" @click="search">Search</button>
          </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col text-start">
        <button type="button" class="btn btn-sm btn-primary" @click="toggleDrawer">Filter</button>
      </div>

      <div class="col text-end">
        <button type="button" class="btn btn-sm btn-outline-primary me-2">Refresh</button>
        <button type="button" class="btn btn-sm btn-success me-2">Bayar</button>
        <button type="button" class="btn btn-sm btn-warning">Export</button>
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">No. Kewajiban</th>
            <th scope="col">No. Polisi</th>
            <th scope="col">Pemilik</th>
            <th scope="col">Peserta</th>
            <th scope="col">Nomor VA</th>
            <th scope="col">Harga Terbentuk (Rp)</th>
            <th scope="col">Biaya Admin ex PPN (Rp)</th>
            <th scope="col">PPN (Rp)</th>
            <th scope="col">Total (Rp)</th>
            <th scope="col">Tanggal Lelang</th>
            <th scope="col">Tanggal Jatuh Tempo</th>
            <th scope="col">Tanggal Lunas</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>V</td>
            <td>1</td>
            <td>123456</td>
            <td>John Doe</td>
            <td>Participant 1</td>
            <td>VA123</td>
            <td>1,000,000</td>
            <td>100</td>
            <td>50</td>
            <td>1,150,000</td>
            <td>2024-02-03</td>
            <td>2024-03-01</td>
            <td>2024-03-15</td>
            <td>Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        showDrawer: false,
        filterValue: '',

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
    methods: {
      toggleDrawer() {
        this.showDrawer = !this.showDrawer;
      },
      filterData() {
        // Implement your filtering logic here
      },
    },
  };
</script>
  
<style scoped>
  /* Add your styling for the drawer */
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 35%;
    height: 100vh;
    background-color: lightgray;
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
</style>
