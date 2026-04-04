function downloadPDF(){

  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  let img = new Image();
  img.src = "img/logo.png";

  let watermark = new Image();
  watermark.src = "img/watermark.png";

  img.onload = function(){

    let pageWidth = doc.internal.pageSize.getWidth();
    let pageHeight = doc.internal.pageSize.getHeight();

    // =====================
    // DATA
    // =====================
    let nama = document.getElementById("nama").innerText;
    let saldo = document.getElementById("saldo").innerText;
    let va = document.getElementById("va").innerText;
    let catatan = document.getElementById("catatan").innerText;
    let progressText = document.getElementById("progress-text").innerText;
    let targetText = document.getElementById("target-text").innerText;
    let tanggalCetak = new Date().toLocaleDateString("id-ID");

    // =====================
    // HEADER (SEMUA HALAMAN)
    // =====================
    function drawHeader(){

      // logo
      doc.addImage(img, "PNG", 15, 10, 50, 15);

      // watermark
      doc.addImage(watermark, "PNG", 40, 150, 120, 36);

      // title
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("ELHAKIM TRAVEL UMROH HAJI", pageWidth / 2, 18, { align: "center" });

      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text("Jl. Ki Mangun Sarkoro A7 Villa Satwika Tulungagung", pageWidth / 2, 24, { align: "center" });

      // garis
      doc.line(15, 30, 195, 30);

      // judul
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("LAPORAN TABUNGAN UMROH", pageWidth / 2, 38, { align: "center" });

      // data akun
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");

      doc.text("Nama Jamaah : " + nama, 15, 50);
      doc.text("No VA        : " + va, 15, 56);
      doc.text("Catatan      : " + catatan, 15, 62);

      doc.text("Total Tabungan : " + saldo, 120, 50);
      doc.text(targetText, 120, 56);
      doc.text("Progress : " + progressText, 120, 62);

      doc.line(15, 68, 195, 68);
    }

    // =====================
    // HEADER TABEL
    // =====================
    function drawTableHeader(y){
      doc.setFont(undefined, "bold");
      doc.text("Tanggal", 15, y);
      doc.text("Nominal", 80, y);
      doc.text("Saldo", 150, y);

      doc.line(15, y + 2, 195, y + 2);
    }

    // =====================
    // START
    // =====================
    drawHeader();

    let startY = 75;
    drawTableHeader(startY);

    let rows = document.querySelectorAll("#transaksi tr");

    let y = startY + 10;
    let rowIndex = 0;

    doc.setFont(undefined, "normal");

    rows.forEach((row) => {

      let cols = row.querySelectorAll("td");

      if(cols.length >= 3){

        // PAGE BREAK
        if(y > 270){
          doc.addPage();
          drawHeader();
          drawTableHeader(75);
          y = 85;
          rowIndex = 0;
        }

        // =====================
        // ZEBRA ROW
        // =====================
        if(rowIndex % 2 === 1){
          doc.setFillColor(240, 240, 240);
          doc.rect(15, y - 5, 180, 7, "F");
        }

        // TEXT
        doc.setTextColor(0,0,0);
        doc.text(cols[0].innerText, 15, y);
        doc.text(cols[1].innerText, 80, y);
        doc.text(cols[2].innerText, 150, y);

        y += 7;
        rowIndex++;
      }

    });

    // =====================
    // FOOTER + PAGE NUMBER
    // =====================
    let totalPages = doc.getNumberOfPages();

    for(let i = 1; i <= totalPages; i++){
      doc.setPage(i);

      doc.setFontSize(8);

      // kiri
      doc.text("Dicetak pada: " + tanggalCetak, 15, 290);

      // kanan
      doc.text("Page " + i + " / " + totalPages, pageWidth - 15, 290, { align: "right" });
    }

    // =====================
    // SAVE
    // =====================
    doc.save("laporan_tabungan_umroh.pdf");

  };

}
