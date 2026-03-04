const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.getElementById("loading").innerText = "Token tidak ditemukan";
} else {

  const url =
    "https://script.google.com/macros/s/AKfycbxaIWRX8I7J1hWx3aSfmWMXEObSww8COhwa_W2bWz_xKIolS6zKVfawuSpST5376A2L/exec"
    + "?token=" + encodeURIComponent(token);

  fetch(url)
    .then(response => response.text())
    .then(text => {
      const data = JSON.parse(text);

      if (!data || data.status !== "success") {
        document.getElementById("loading").innerText = "Data tidak ditemukan";
        return;
      }

      document.getElementById("loading").style.display = "none";
      document.getElementById("nama").innerText = data.nama_kepala;
      document.getElementById("total").innerText =
        "Rp " + Number(data.total_tabungan).toLocaleString("id-ID");
    })
    .catch(error => {
      document.getElementById("loading").innerText = "Gagal koneksi";
      console.error(error);
    });
}
