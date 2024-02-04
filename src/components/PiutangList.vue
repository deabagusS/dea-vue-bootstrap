<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Piutang List</li>
      </ol>
    </nav>

    <div v-show="showDrawer" class="drawer text-start shadow-lg">
      <div class="card h-100">
          <div class="card-header">
              <h5 class="card-title">Filter</h5>
          </div>
          <div class="card-body" style="overflow: auto;">
            <div class="row mb-3" v-for="(item, index) in filterRange" :key="index">
              <label class="form-label mb-0">{{item.label}}</label>
              <div class="input-group input-group-sm">
                <input :type="item.type" class="form-control" v-model="item.min">
                <span class="input-group-text">S/d</span>
                <input :type="item.type" class="form-control" v-model="item.max">
              </div>
            </div>

            <!-- <div class="row mb-3">
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
            </div> -->

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
            <button type="button" class="btn btn-sm btn-primary" @click="fetchData()">Search</button>
          </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col text-start">
        <button type="button" class="btn btn-sm btn-primary" @click="toggleDrawer">Filter</button>
      </div>

      <div class="col text-end">
        <button type="button" class="btn btn-sm btn-outline-primary me-2" @click="fetchData()">Refresh</button>
        <button type="button" class="btn btn-sm btn-success me-2" @click="bayar()">Bayar</button>
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
            <td>
              <input class="form-check-input" type="checkbox" v-model="item.check" v-if="item.status !== 'lunas'">
            </td>
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
            <td>{{ showStatusLabel(item.status || '') }}</td>
          </tr>
          <tr v-if="piutangList.length === 0">
            <td colspan="14" class="text-center">No data found</td>
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
        piutangList: [],
        perPage: 10,
        filterValue: '',
        filterRange: [
          { min: '', max: '', key: 'tanggal_lelang', label: 'Tanggal Lelang', type: 'date' },
          { min: '', max: '', key: 'tanggal_jatuh_tempo', label: 'Tanggal Jatuh Tempo', type: 'date' },
          { min: '', max: '', key: 'tanggal_lunas', label: 'Tanggal Lunas', type: 'date' },
          { min: '', max: '', key: 'harga_terbentuk_rp', label: 'Harga Terbentuk', type: 'number' },
          { min: '', max: '', key: 'biaya_admin_ex_ppn_rp', label: 'Biaya Admin ex PPN', type: 'number' },
          { min: '', max: '', key: 'ppn_rp', label: 'PPN', type: 'number' },
          { min: '', max: '', key: 'total_rp', label: 'Total', type: 'number' }
        ],
        statusList: [
          { value: 'proses_pembayaran', label: 'Proses Pembayaran' },
          { value: 'konfirmasi', label: 'Konfirmasi Pembayaran' },
          { value: 'lunas', label: 'Lunas' }
        ]
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      showStatusLabel(value) {
        const foundObject = this.statusList.find(item => item.value === value);

        if (foundObject) {
          return foundObject.label;
        } else {
          return value;
        }
      },
      toggleDrawer() {
        this.showDrawer = !this.showDrawer;
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
      },
      async bayar() {
        try {
          const dataCheck = this.piutangList.filter(item => item.check === true)

          if (dataCheck.length < 1) {
            return this.$swal({
              title: "Silahkan pilih data yang akan dibayar!",
              icon: "error"
            });
          }

          this.$swal({
            title: "Apakah kamu yakin?",
            showCancelButton: true,
            confirmButtonText: "Bayar",
            cancelButtonText: "Batal",
          }).then((result) => {
            if (result.isConfirmed) {
              const arrayId = dataCheck.map(item => item._id);
              this.submitBayar(arrayId);
            }
          });
        } catch (error) {
          console.error('Server error :', error);
        }
      },
      async submitBayar(arrayId) {
        const data = {
          id:arrayId,
        };

        const response = await hitApi(data, 'piutang/update/status-paid');
        if (response['status'] === true) {
          this.fetchData();
        }

        const icon = response['status'] === true ? 'success' : 'error';
        return this.$swal({
          title: response['message'] || 'Data berhasil disimpan',
          icon: icon
        });
      },
      async fetchData(skip = 0, limit = this.perPage) {
        try {
          let condition = {};

          for (const item of this.filterRange) {
            let temp = {};
            
            if(item.min !== '') {
              temp['$gte'] = item.min;
            }
            
            if(item.max !== '') {
              temp['$lte'] = item.max;
            }
            
            if(Object.keys(temp).length > 0) {
              condition[`${item.key}`] = temp;
            }
          }

          console.log('cekcek ', this.filterRange);
          console.log('cekcek ', condition);

          const data = {
            condition: condition,
            skip: skip,
            limit: limit
          };

          const response = await hitApi(data, 'piutang');
          
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
