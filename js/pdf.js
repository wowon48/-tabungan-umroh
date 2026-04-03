function downloadPDF(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF("p", "mm", "a4");

// =====================
// DATA
// =====================
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;
let va = document.getElementById("va").innerText;
let catatan = document.getElementById("catatan").innerText;
let progressText = document.getElementById("progress-text").innerText;
let targetText = document.getElementById("target-text").innerText;

let qrData = `ELHAKIM|${nama}|${va}|${saldo}`;

// =====================
// LOAD IMAGE
// =====================
let logo = new Image();
let watermark = new Image();

logo.src = "img/logo.png";
watermark.src = "img/watermark.png";

logo.onload = function(){

QRCode.toDataURL(qrData, function (err, qrUrl) {

renderPage(qrUrl);

doc.save("laporan_tabungan_umroh.pdf");

});

};

// =====================
// RENDER PAGE
// =====================
function renderPage(qrUrl){

// WATERMARK (IMAGE, TRANSPARAN)
doc.addImage(watermark, "PNG", 35, 80, 140, 140);

// HEADER
doc.addImage(logo, "PNG", 15, 10, 20, 20);

doc.setFont("helvetica", "bold");
doc.setFontSize(13);
doc.text("ELHAKIM TRAVEL UMROH HAJI", 40, 17);

doc.setFont("helvetica", "normal");
doc.setFontSize(8);
doc.text("Jl. Ki Mangun Sarkoro Tulungagung", 40, 22);

doc.line(15, 30, 195, 30);

// JUDUL
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("LAPORAN TABUNGAN UMROH", 105, 40, { align: "center" });

// QR
doc.addImage(qrUrl, "PNG", 160, 35, 30, 30);

// =====================
// DATA AKUN
// =====================
doc.setFont("helvetica", "normal");
doc.setFontSize(9);

doc.text(`Nama Jamaah : ${nama}`, 15, 55);
doc.text(`No VA        : ${va}`, 15, 61);
doc.text(`Catatan      : ${catatan}`, 15, 67);

doc.text(`Total Tabungan : ${saldo}`, 110, 55);
doc.text(`${targetText}`, 110, 61);
doc.text(`Progress : ${progressText}`, 110, 67);

doc.line(15, 73, 195, 73);

// =====================
// TABEL
// =====================
let startY = 80;

// HEADER TABLE
doc.setFont("helvetica", "bold");
doc.setFontSize(9);

doc.text("Tanggal", 20, startY);
doc.text("Nominal", 100, startY, { align: "right" });
doc.text("Saldo", 190, startY, { align: "right" });

doc.line(15, startY + 2, 195, startY + 2);

doc.setFont("helvetica", "normal");

let y = startY + 8;

let rows = document.querySelectorAll("#transaksi tr");

rows.forEach((row) => {

let cols = row.querySelectorAll("td");

if(cols.length >= 3){

// FORMAT RAPI
let tgl = cols[0].innerText;
let nominal = cols[1].innerText;
let saldoRow = cols[2].innerText;

// DRAW
doc.text(tgl, 20, y);
doc.text(nominal, 100, y, { align: "right" });
doc.text(saldoRow, 190, y, { align: "right" });

y += 6;

// PAGE BREAK
if(y > 280){

doc.addPage();

// WATERMARK ULANG
doc.addImage(watermark, "PNG", 35, 80, 140, 140);

y = 20;

}

}

});

// =====================
// FOOTER
// =====================
let tglCetak = new Date().toLocaleDateString("id-ID");

doc.setFontSize(8);
doc.text("Dicetak: " + tglCetak, 15, 290);

}
}
