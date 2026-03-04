const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxaIWRX8I7J1hWx3aSfmWMXEObSww8COhwa_W2bWz_xKIolS6zKVfawuSpST5376A2L/exec";

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.getElementById("loading").innerText = "Token tidak ditemukan";
} else {

  const url = WEBAPP_URL + "?token=" + encodeURIComponent(token);

  fetch(url)
    .then(res => res.text())
    .then(text => {

      const data = JSON.parse(text);

      if (!data || data.status !== "success") {
        document.getElementById("loading").innerText = "Data tidak ditemukan";
        return;
      }

      document.getElementById("loading").classList.add("hidden");
      document.getElementById("content").classList.remove("hidden");

      document.getElementById("nama").innerText = data.nama_kepala;
      document.getElementById("va").innerText = "No VA: " + data.no_va;
      document.getElementById("total").innerText =
        "Rp " + Number(data.total_tabungan).toLocaleString("id-ID");

      const tbody = document.getElementById("transaksiBody");
      tbody.innerHTML = "";

      data.transaksi.forEach(trx => {

        const row = `
          <tr>
            <td>${new Date(trx.tanggal).toLocaleDateString("id-ID")}</td>
            <td>Rp ${Number(trx.nominal).toLocaleString("id-ID")}</td>
            <td>Rp ${Number(trx.saldo).toLocaleString("id-ID")}</td>
          </tr>
        `;

        tbody.innerHTML += row;
      });

    })
    .catch(err => {
      document.getElementById("loading").innerText = "Gagal koneksi ke server";
      console.error(err);
    });
}
