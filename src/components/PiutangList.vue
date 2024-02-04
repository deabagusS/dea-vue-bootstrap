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

            <div class="row mb-3">
              <label class="form-label mb-0">Status</label>
              <div class="col">
                <div v-for="(status, index) in statusList" :key="index" class="form-check">
                  <input class="form-check-input" type="checkbox" :value="status.value" :id="'checkbox' + index" v-model="status.checked">
                  <label class="form-check-label" :for="'checkbox' + index">
                    {{ status.label }}
                  </label>
                </div>
              </div>
            </div>
          </div>          

          <div class="card-footer">
            <button type="button" class="btn btn-sm btn-dark me-2" @click="toggleDrawer()">Tutup</button>
            <button type="button" class="btn btn-sm btn-outline-dark me-2" @click="reset()">Reset Filter</button>
            <button type="button" class="btn btn-sm btn-primary" @click="fetchData(true); toggleDrawer();">Search</button>
          </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col text-start">
        <div class="row">
          <div class="col-2">
            <button type="button" class="btn btn-sm btn-primary" @click="toggleDrawer">Filter</button>    
          </div>
          <div class="col-10">
            <div class="input-group input-group-sm">
              <select class="form-select" v-model="sortSelect" @change="fetchData(true)">
                <option v-for="sortOption in sortList" :key="sortOption.value" :value="sortOption.value">
                  {{ sortOption.label }}
                </option>
              </select>
              <span class="input-group-text">-</span>
              <select class="form-select" v-model="sortBy" @change="fetchData(true)">
                <option value="1">Asc</option>
                <option value="-1">Desc</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="col text-end">
        <button type="button" class="btn btn-sm btn-outline-primary me-2" @click="fetchData()">Refresh</button>
        <button type="button" class="btn btn-sm btn-success me-2" @click="bayar()">Bayar</button>
        <button type="button" class="btn btn-sm btn-warning" @click="exportData()">Export</button>
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

    <!-- Pagination controls -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage" :disabled="currentPage === 1">&laquo;</button>
        </li>
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
          <button class="page-link" @click="changePage(pageNumber)">{{ pageNumber }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">&raquo;</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
<script>
  import { hitApi, downloadCsv} from '../functions/apiservice.js'

  export default {
    data() {
      return {
        showDrawer: false,
        piutangList: [],
        perPage: 10,
        currentPage: 1,
        totalPages: 1,
        sortSelect: 'tanggal_lelang',
        sortBy: -1,
        conditionHistory: {},
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
          { checked: true, value: 'proses_pembayaran', label: 'Proses Pembayaran' },
          { checked: true, value: 'konfirmasi_pembayaran', label: 'Konfirmasi Pembayaran' },
          { checked: true, value: 'lunas', label: 'Lunas' }
        ],
        sortList: [
          {value: 'no_kewajiban', label: 'No. Kewajiban'},
          {value: 'no_polisi', label: 'No. Polisi'},
          {value: 'pemilik', label: 'Pemilik'},
          {value: 'peserta', label: 'Peserta'},
          {value: 'nomor_va', label: 'Nomor VA'},
          {value: 'harga_terbentuk_rp', label: 'Harga Terbentuk (Rp)'},
          {value: 'biaya_admin_ex_ppn_rp', label: 'Biaya Admin ex PPN (Rp)'},
          {value: 'ppn_rp', label: 'PPN (Rp)'},
          {value: 'total_rp', label: 'Total (Rp)'},
          {value: 'tanggal_lelang', label: 'Tanggal Lelang'},
          {value: 'tanggal_jatuh_tempo', label: 'Tanggal Jatuh Tempo'},
          {value: 'tanggal_lunas', label: 'Tanggal Lunas'},
          {value: 'status', label: 'Status'}
        ]
      };
    },
    created() {
      this.fetchData(true);
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
        return dateString ? new Date(dateString).toLocaleDateString() : '';
      },
      reset() {
        this.statusList = this.statusList.map(item => {
          item.checked = true;
          return item;
        });

        this.filterRange = this.filterRange.map(item => {
          item.min = '';
          item.max = '';
          return item;
        });
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
      async getCondition() {
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

        let status = [];
        for (const item of this.statusList) {
          if (item.checked === true) {
            status.push(item.value);
          }   
        }

        condition['status'] = { $in: status };

        return condition;
      },
      async fetchData(firstGet = false) {
        try {
          const url = firstGet === true ? 'piutang' : 'piutang/change-page';
          let condition = {};

          if (firstGet === true) {
            this.piutangList = [];
            this.currentPage = 1;
            condition = await this.getCondition();
          } else {
            condition = this.conditionHistory;
          }

          const skip = (this.currentPage - 1) * this.perPage;
          const data = {
            condition: condition,
            skip: skip,
            limit: this.perPage,
            sort: {
              [this.sortSelect]: parseInt(this.sortBy)
            }
          };

          const response = await hitApi(data, url);
          
          if (response['status'] === true) {
            this.piutangList = response['data'];
            
            if (firstGet === true) {
              this.conditionHistory = condition;
              this.totalItems = response['total'];
              this.totalPages = Math.ceil(this.totalItems / this.perPage)
            }
          } else {
            this.piutangList = [];
          }
        } catch (error) {
          console.error('Server error :', error);
        }
      },
      async exportData() {
        try {
          const data = {
            condition: this.conditionHistory,
            skip: 0,
            limit: this.totalItems,
            sort: {
              [this.sortSelect]: parseInt(this.sortBy)
            }
          };

          await downloadCsv(data, 'piutang/export');
        } catch (error) {
          console.error('Server error :', error);
        }
      },
      changePage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.currentPage = pageNumber;
          this.fetchData();
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.fetchData();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchData();
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
