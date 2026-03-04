const API_URL = "https://script.google.com/macros/s/AKfycbyZhfz0tKNcgvzS8LlfwfR-TauAfF8IN5ayTELfJ7Wh4eTFz355Rr3rUxQrXyL-isw9/exec";

function cekData() {
  const noVA = document.getElementById("noVA").value.trim();

  if (!noVA) {
    alert("Masukkan No VA terlebih dahulu");
    return;
  }

  localStorage.setItem("noVA", noVA);
  window.location.href = "jamaah.html";
}

document.addEventListener("DOMContentLoaded", function () {

  if (window.location.pathname.includes("jamaah.html")) {
    loadData();
  }

});

function loadData() {
  const noVA = localStorage.getItem("noVA");

  fetch(API_URL + "?token=" + noVA)
    .then(response => response.json())
    .then(data => {

      document.getElementById("namaKepala").innerText = data.nama_kepala;
      document.getElementById("noVa").innerText = data.no_va;
      document.getElementById("catatan").innerText = data.catatan;
      document.getElementById("totalTabungan").innerText =
        "Rp " + data.total_tabungan.toLocaleString("id-ID");

      // Anggota
      let anggotaHTML = "";
      data.anggota.forEach(a => {
        anggotaHTML += `<li>${a.nama} (${a.jk})</li>`;
      });
      document.getElementById("anggotaList").innerHTML = anggotaHTML;

      // Transaksi
      let transaksiHTML = "";
      data.transaksi.forEach(t => {
        transaksiHTML += `
          <tr>
            <td>${new Date(t.tanggal).toLocaleString("id-ID")}</td>
            <td>+ Rp ${t.nominal.toLocaleString("id-ID")}</td>
            <td>Rp ${t.saldo.toLocaleString("id-ID")}</td>
          </tr>
        `;
      });

      document.getElementById("transaksiTable").innerHTML = transaksiHTML;

    })
    .catch(error => {
      alert("Data tidak ditemukan");
      console.error(error);
    });

}
