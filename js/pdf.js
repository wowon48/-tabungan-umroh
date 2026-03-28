function downloadPDF(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

// =====================
// DATA
// =====================
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;
let va = document.getElementById("va").innerText;
let catatan = document.getElementById("catatan").innerText;
let progressText = document.getElementById("progress-text").innerText;
let targetText = document.getElementById("target-text").innerText;

// =====================
// QR DATA (UNIK)
// =====================
let qrData = `ELHAKIM|${nama}|${va}|${saldo}`;


// =====================
// LOAD LOGO
// =====================
let logo = new Image();
logo.src = "img/logo.png";

logo.onload = function(){

// HEADER LOGO
doc.addImage(logo, "PNG", 15, 10, 25, 25);

// =====================
// HEADER TEXT
// =====================
doc.setFontSize(14);
doc.setFont(undefined, "bold");
doc.text("ELHAKIM TRAVEL UMROH HAJI", 45, 18);

doc.setFontSize(9);
doc.setFont(undefined, "normal");
doc.text("Jl. Ki Mangun Sarkoro A7 Villa Satwika Tulungagung", 45, 24);

doc.line(15, 30, 195, 30);


// =====================
// WATERMARK
// =====================
doc.addImage(logo, "PNG", 40, 90, 120, 120, '', 'FAST');


// =====================
// QR CODE GENERATE
// =====================
QRCode.toDataURL(qrData, function (err, url) {

doc.addImage(url, "PNG", 160, 35, 30, 30);

// lanjut isi
generateContent();

});

};


// =====================
// FUNCTION ISI PDF
// =====================
function generateContent(){

// JUDUL
doc.setFontSize(12);
doc.setFont(undefined, "bold");
doc.text("LAPORAN TABUNGAN UMROH", 105, 38, { align: "center" });


// =====================
// DATA AKUN
// =====================
doc.setFontSize(10);

doc.text("Nama Jamaah : " + nama, 15, 50);
doc.text("No VA        : " + va, 15, 56);
doc.text("Catatan      : " + catatan, 15, 62);

doc.text("Total Tabungan : " + saldo, 120, 50);
doc.text(targetText, 120, 56);
doc.text("Progress : " + progressText, 120, 62);

doc.line(15, 68, 195, 68);


// =====================
// TABEL
// =====================
let startY = 75;

doc.setFont(undefined, "bold");
doc.text("Tanggal", 15, startY);
doc.text("Nominal", 80, startY);
doc.text("Saldo", 150, startY);

doc.line(15, startY + 2, 195, startY + 2);

let rows = document.querySelectorAll("#transaksi tr");

doc.setFont(undefined, "normal");

let y = startY + 10;

rows.forEach((row) => {

let cols = row.querySelectorAll("td");

if(cols.length >= 3){

doc.text(cols[0].innerText, 15, y);
doc.text(cols[1].innerText, 80, y);
doc.text(cols[2].innerText, 150, y);

y += 7;

if(y > 280){

doc.addPage();

// watermark halaman baru
doc.addImage(logo, "PNG", 40, 90, 120, 120, '', 'FAST');

// QR ulang di halaman baru
QRCode.toDataURL(qrData, function (err, url) {
doc.addImage(url, "PNG", 160, 15, 30, 30);
});

y = 30;
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

}

}
