function downloadPDF(){

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // =========================
  // AMBIL DATA DARI HALAMAN
  // =========================
  let nama = document.getElementById("nama").innerText;
  let saldo = document.getElementById("saldo").innerText;

  // =========================
  // TAMBAHKAN LOGO
  // =========================
  let logo = new Image();
  logo.src = "img/logo.png";

  logo.onload = function(){

    doc.addImage(logo, "PNG", 20, 10, 30, 15);

    // =========================
    // HEADER TRAVEL
    // =========================
    doc.setFontSize(14);
    doc.text("ELHAKIM TRAVEL UMROH HAJI", 60, 18);

    doc.setFontSize(10);
    doc.text("Jl. Ki Mangun Sarkoro A7 Villa Satwika Tulungagung", 60, 24);

    // GARIS PEMBATAS
    doc.line(20, 30, 190, 30);

    // =========================
    // JUDUL LAPORAN
    // =========================
    doc.setFontSize(13);
    doc.text("LAPORAN TABUNGAN UMROH", 65, 40);

    // =========================
    // DATA JAMAAH
    // =========================
    doc.setFontSize(11);
    doc.text("Nama Jamaah : " + nama, 20, 55);
    doc.text("Total Tabungan : " + saldo, 20, 63);

    // =========================
    // HEADER TABEL
    // =========================
    doc.setFontSize(11);
    doc.text("Tanggal", 20, 80);
    doc.text("Nominal", 80, 80);
    doc.text("Saldo", 140, 80);

    doc.line(20, 83, 190, 83);

    // =========================
    // AMBIL DATA TABEL HTML
    // =========================
    let rows = document.querySelectorAll("#transaksi tr");

    let y = 90;

    rows.forEach(row => {

      let cols = row.querySelectorAll("td");

      if(cols.length >= 3){
        doc.text(cols[0].innerText, 20, y);
        doc.text(cols[1].innerText, 80, y);
        doc.text(cols[2].innerText, 140, y);

        y += 8;
      }

      // page break otomatis
      if(y > 270){
        doc.addPage();
        y = 20;
      }
    });

    // =========================
    // FOOTER
    // =========================
    let today = new Date().toLocaleDateString();

    doc.setFontSize(9);
    doc.text("Dicetak pada : " + today, 20, 290);

    // =========================
    // SIMPAN PDF
    // =========================
    doc.save("laporan_tabungan_umroh.pdf");
  }
}
