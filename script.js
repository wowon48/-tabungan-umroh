const API_URL = "https://script.google.com/macros/s/AKfycbyZhfz0tKNcgvzS8LlfwfR-TauAfF8IN5ayTELfJ7Wh4eTFz355Rr3rUxQrXyL-isw9/exec";

function cekData() {
  const userId = document.getElementById("userId").value.trim();
  const noVA = document.getElementById("noVA").value.trim();

  if (!userId || !noVA) {
    alert("User ID dan No VA wajib diisi");
    return;
  }

  localStorage.setItem("userId", userId);
  localStorage.setItem("noVA", noVA);

  window.location.href = "jamaah.html";
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("jamaah.html")) {
    loadData();
  }
});

function loadData() {

  const userId = localStorage.getItem("userId");
  const noVA = localStorage.getItem("noVA");

  fetch(API_URL +
    "?user_id=" + encodeURIComponent(userId) +
    "&no_va=" + encodeURIComponent(noVA)
  )
  .then(res => res.json())
  .then(data => {

    if (data.status !== "success") {
      alert("Data tidak ditemukan");
      window.location.href = "index.html";
      return;
    }

    document.getElementById("namaKepala").innerText = data.nama_kepala;
    document.getElementById("noVa").innerText = data.no_va;
    document.getElementById("catatan").innerText = data.catatan;

    document.getElementById("totalTabungan").innerText =
      "Rp " + data.total_tabungan.toLocaleString("id-ID");

    let anggotaHTML = "";
    data.anggota.forEach(a => {
      anggotaHTML += `<li>${a.nama} (${a.jk})</li>`;
    });
    document.getElementById("anggotaList").innerHTML = anggotaHTML;

    let transaksiHTML = "";
    data.transaksi.forEach(t => {
      transaksiHTML += `
        <tr>
          <td>${new Date(t.tanggal).toLocaleDateString("id-ID")}</td>
          <td>Rp ${t.nominal.toLocaleString("id-ID")}</td>
          <td>Rp ${t.saldo.toLocaleString("id-ID")}</td>
        </tr>
      `;
    });

    document.getElementById("transaksiTable").innerHTML = transaksiHTML;

  })
  .catch(err => {
    console.error(err);
    alert("Gagal koneksi ke server");
  });
}
