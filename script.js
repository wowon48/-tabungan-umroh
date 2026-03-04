const url = "https://script.google.com/macros/s/AKfycbyZhfz0tKNcgvzS8LlfwfR-TauAfF8IN5ayTELfJ7Wh4eTFz355Rr3rUxQrXyL-isw9/exec";

fetch(url)
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);

      if (!data || data.status !== "success") {
        document.getElementById("loading").innerText = "Data tidak ditemukan";
        return;
      }

      document.getElementById("loading").style.display = "none";

      // tampilkan nama
      document.getElementById("nama").innerText = data.nama_kepala;

      // tampilkan total tabungan
      document.getElementById("total").innerText =
        "Rp " + Number(data.total_tabungan).toLocaleString("id-ID");

    } catch (err) {
      document.getElementById("loading").innerText = "Format data salah";
      console.error("JSON error:", err);
    }
  })
  .catch(error => {
    document.getElementById("loading").innerText = "Gagal koneksi";
    console.error("Fetch error:", error);
  });
