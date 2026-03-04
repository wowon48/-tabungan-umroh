const API_URL = "https://script.google.com/macros/s/AKfycbyZhfz0tKNcgvzS8LlfwfR-TauAfF8IN5ayTELfJ7Wh4eTFz355Rr3rUxQrXyL-isw9/exec";

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka || 0);
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

    if (!response.ok) {
      showError("Gagal mengambil data.");
      return;
    }

    const data = await response.json();

    // VALIDASI SESUAI APPS SCRIPT
    if (!data || data.status !== "success") {
      showError(data.message || "Data tidak ditemukan.");
      return;
    }

    // SEMBUNYIKAN LOADING
    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";

    // ======================
    // DATA UTAMA
    // ======================
    document.getElementById("nama_kepala").innerText = data.nama_kepala || "-";
    document.getElementById("no_va").innerText = data.no_va || "-";
    document.getElementById("catatan").innerText = data.catatan || "-";
    document.getElementById("total_tabungan").innerText =
      formatRupiah(data.total_tabungan);

    // ======================
    // ANGGOTA
    // ======================
    const anggotaList = document.getElementById("anggota_list");
    anggotaList.innerHTML = "";

    if (Array.isArray(data.anggota) && data.anggota.length > 0) {
      data.anggota.forEach(a => {
        const li = document.createElement("li");
        li.innerText = `${a.nama} (${a.jk})`;
        anggotaList.appendChild(li);
      });
    } else {
      anggotaList.innerHTML = "<li>Tidak ada anggota</li>";
    }

    // ======================
    // TRANSAKSI
    // ======================
    const transaksiTable = document.getElementById("transaksi_table");
    transaksiTable.innerHTML = "";

    if (Array.isArray(data.transaksi) && data.transaksi.length > 0) {
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
    } else {
      transaksiTable.innerHTML = `
        <tr>
          <td colspan="3" style="text-align:center;">Belum ada transaksi</td>
        </tr>
      `;
    }

  } catch (err) {
    console.error(err);
    showError("Terjadi kesalahan koneksi.");
  }
}

function showError(msg) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "none";
  document.getElementById("error").innerText = msg;
}

loadData();
