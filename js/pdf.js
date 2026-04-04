function downloadPDF(){

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

// =====================
// LOGO (FIX BIAR GA MLETOT)
// =====================
let img = new Image();
img.src = "img/logo.png";
let watermark = new Image();
watermark.src = "img/watermark.png";
  
img.onload = function(){

// ukuran logo diperkecil biar proporsional
doc.addImage(img, "PNG", 15, 10, 50, 15);
  
// =====================
// Watermark
// =====================
doc.addImage(watermark, "PNG", 40, 90, 120, 36,);

// =====================
// HEADER
// =====================
doc.setFontSize(14);
doc.setFont(undefined, "bold");
doc.text("ELHAKIM TRAVEL UMROH HAJI", 105, 18, { align: "center" });

doc.setFontSize(9);
doc.setFont(undefined, "normal");
doc.text("Jl. Ki Mangun Sarkoro A7 Villa Satwika Tulungagung", 105, 24, { align: "center" });

// garis
doc.line(15, 30, 195, 30);


// =====================
// JUDUL
// =====================
doc.setFontSize(12);
doc.setFont(undefined, "bold");
doc.text("LAPORAN TABUNGAN UMROH", 105, 38, { align: "center" });


// =====================
// DATA AKUN
// =====================
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;
let va = document.getElementById("va").innerText;
let catatan = document.getElementById("catatan").innerText;
let progressText = document.getElementById("progress-text").innerText;
let targetText = document.getElementById("target-text").innerText;

doc.setFontSize(10);
doc.setFont(undefined, "normal");

doc.text("Nama Jamaah : " + nama, 15, 50);
doc.text("No VA        : " + va, 15, 56);
doc.text("Catatan      : " + catatan, 15, 62);

doc.text("Total Tabungan : " + saldo, 120, 50);
doc.text(targetText, 120, 56);
doc.text("Progress : " + progressText, 120, 62);

// garis
doc.line(15, 68, 195, 68);


// =====================
// TABEL TRANSAKSI
// =====================
let startY = 75;

doc.setFont(undefined, "bold");
doc.text("Tanggal", 15, startY);
doc.text("Nominal", 80, startY);
doc.text("Saldo", 150, startY);

doc.line(15, startY + 2, 195, startY + 2);

// ambil data dari tabel HTML
let rows = document.querySelectorAll("#transaksi tr");

doc.setFont(undefined, "normal");

let y = startY + 10;

rows.forEach((row, i) => {

let cols = row.querySelectorAll("td");

if(cols.length >= 3){

doc.text(cols[0].innerText, 15, y);
doc.text(cols[1].innerText, 80, y);
doc.text(cols[2].innerText, 150, y);

y += 7;

// auto page break
if(y > 280){
doc.addPage();
y = 20;
}

}

});


// =====================
// FOOTER
// =====================
let tanggalCetak = new Date().toLocaleDateString("id-ID");

doc.setFontSize(8);
doc.text("Dicetak pada: " + tanggalCetak, 15, 290);

  


  
// =====================
// SAVE
// =====================
doc.save("laporan_tabungan_umroh.pdf");

};

}
