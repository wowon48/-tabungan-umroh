const loading = document.getElementById("loading");
const content = document.getElementById("content");
const errorDiv = document.getElementById("error");

const params = new URLSearchParams(window.location.search);
const userId = params.get("user_id");
const noVa = params.get("no_va");

if (!userId || !noVa) {
  errorDiv.innerText = "User ID atau No VA tidak ditemukan.";
  loading.style.display = "none";
} else {

  fetch("https://script.google.com/macros/s/AKfycbxaIWRX8I7J1hWx3aSfmWMXEObSww8COhwa_W2bWz_xKIolS6zKVfawuSpST5376A2L/exec"
    + "&user_id=" + userId
    + "&no_va=" + noVa)

    .then(res => res.json())
    .then(res => {

      loading.style.display = "none";

      if (res.status !== "success") {
        errorDiv.innerText = "Data tidak ditemukan";
        return;
      }

      const data = res.data;

      document.getElementById("nama_kepala").innerText = data.nama;
      document.getElementById("no_va").innerText = data.no_va;
      document.getElementById("catatan").innerText = data.catatan;
      document.getElementById("total_tabungan").innerText =
        "Rp " + parseInt(data.total_tabungan).toLocaleString("id-ID");

      // Anggota
      const anggotaList = document.getElementById("anggota_list");
      anggotaList.innerHTML = "";
      data.anggota.forEach(a => {
        anggotaList.innerHTML += "<li>" + a + "</li>";
      });

      // Transaksi
      const table = document.getElementById("transaksi_table");
      table.innerHTML = "";
      data.transaksi.forEach(t => {
        table.innerHTML += `
          <tr>
            <td>${t.tanggal}</td>
            <td>Rp ${parseInt(t.nominal).toLocaleString("id-ID")}</td>
            <td>Rp ${parseInt(t.saldo).toLocaleString("id-ID")}</td>
          </tr>
        `;
      });

      content.style.display = "block";
    })
    .catch(err => {
      loading.style.display = "none";
      errorDiv.innerText = "Gagal mengambil data.";
      console.error(err);
    });
}
