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
          <tr v-for="(item, index) in piutangList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.no_kewajiban }}</td>
            <td>{{ item.no_polisi }}</td>
            <td>{{ item.pemilik }}</td>
            <td>{{ item.peserta }}</td>
            <td>{{ item.nomor_va }}</td>
            <td>{{ item.harga_terbentuk_rp.toLocaleString() }}</td>
            <td>{{ item.biaya_admin_ex_ppn_rp.toLocaleString() }}</td>
            <td>{{ item.ppn_rp.toLocaleString() }}</td>
            <td>{{ item.total_rp.toLocaleString() }}</td>
            <td>{{ formatDate(item.tanggal_lelang) }}</td>
            <td>{{ formatDate(item.tanggal_jatuh_tempo) }}</td>
            <td>{{ formatDate(item.tanggal_lunas) }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
  import { hitApi } from '../functions/apiservice.js'

  export default {
    data() {
      return {
        showDrawer: false,
        filterValue: '',
        piutangList: [],
        perPage: 10,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      toggleDrawer() {
        this.showDrawer = !this.showDrawer;
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
      },
      async fetchData(skip = 0, limit = this.perPage) {
        try {
          const data = {
            condition:{},
            skip:skip,
            limit:limit
          };

          const response = await hitApi(data);
          
          if (response['status'] === true) {
            this.piutangList = response['data'];
          }
        } catch (error) {
          console.error('Server error :', error);
        }
      },
    },
  };
</script>
  
<style scoped>
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
