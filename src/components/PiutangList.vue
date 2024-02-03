<template>
  <div class="container-lg">
    <div class="row mb-2">
      <div class="col text-start">
        <button type="button" class="btn btn-outline-primary">Filter</button>
      </div>

      <div class="col text-end">
        <button type="button" class="btn btn-success me-2">Refresh</button>
        <button type="button" class="btn btn-primary me-2">Bayar</button>
        <button type="button" class="btn btn-warning">Export</button>
      </div>
    </div>
    
    <div class="card">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
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
            <!-- Add more rows as needed -->
          </tbody>
        </table>

      </div>
    </div>
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
