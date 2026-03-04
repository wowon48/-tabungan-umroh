const API_URL = "https://script.google.com/macros/s/AKfycbxaIWRX8I7J1hWx3aSfmWMXEObSww8COhwa_W2bWz_xKIolS6zKVfawuSpST5376A2L/exec";

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}

function getTokenFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

async function loadData() {
  const token = getTokenFromURL();

  if (!token) {
    showError("Token tidak ditemukan.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}?token=${token}`);
    const data = await response.json();

    if (data.status !== "success") {
      showError("Token tidak valid.");
      return;
    }

    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";

    document.getElementById("nama_kepala").innerText = data.nama_kepala;
    document.getElementById("no_va").innerText = data.no_va;
    document.getElementById("catatan").innerText = data.catatan;
    document.getElementById("total_tabungan").innerText =
      formatRupiah(data.total_tabungan);

    // Anggota
    const anggotaList = document.getElementById("anggota_list");
    anggotaList.innerHTML = "";
    data.anggota.forEach(a => {
      const li = document.createElement("li");
      li.innerText = `${a.nama} (${a.jk})`;
      anggotaList.appendChild(li);
    });

    // Transaksi
    const transaksiTable = document.getElementById("transaksi_table");
    transaksiTable.innerHTML = "";
    data.transaksi.forEach(t => {
      const row = `
        <tr>
          <td>${new Date(t.tanggal).toLocaleDateString("id-ID")}</td>
          <td>${formatRupiah(t.nominal)}</td>
          <td>${formatRupiah(t.saldo)}</td>
        </tr>
      `;
      transaksiTable.innerHTML += row;
    });

  } catch (err) {
    showError("Terjadi kesalahan koneksi.");
  }
}

function showError(msg) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").innerText = msg;
}

loadData();
