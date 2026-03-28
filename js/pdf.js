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
// QR
// =====================
let qrData = `ELHAKIM|${nama}|${va}|${saldo}`;

// =====================
// LOGO
// =====================
let logo = new Image();
logo.src = "img/logo.png";

logo.onload = function(){

// =====================
// HEADER
// =====================
doc.addImage(logo, "PNG", 15, 10, 20, 20);

doc.setFontSize(13);
doc.setFont(undefined, "bold");
doc.text("ELHAKIM TRAVEL UMROH HAJI", 40, 17);

doc.setFontSize(8);
doc.setFont(undefined, "normal");
doc.text("Jl. Ki Mangun Sarkoro Tulungagung", 40, 22);

doc.line(15, 30, 195, 30);


// =====================
// WATERMARK (SUPER HALUS)
// =====================
doc.setTextColor(230);
doc.setFontSize(50);
doc.text("ELHAKIM", 55, 160, { angle: 45 });
doc.setTextColor(0);


// =====================
// QR CODE
// =====================
QRCode.toDataURL(qrData, function (err, url) {

doc.addImage(url, "PNG", 160, 35, 30, 30);

// lanjut isi
generateContent();

});

};


// =====================
// ISI PDF
// =====================
function generateContent(){

// JUDUL
doc.setFontSize(12);
doc.setFont(undefined, "bold");
doc.text("LAPORAN TABUNGAN UMROH", 105, 40, { align: "center" });


// =====================
// DATA AKUN
// =====================
doc.setFontSize(10);
doc.setFont(undefined, "normal");

doc.text("Nama Jamaah : " + nama, 15, 55);
doc.text("No VA        : " + va, 15, 62);
doc.text("Catatan      : " + catatan, 15, 69);

doc.text("Total Tabungan : " + saldo, 120, 55);
doc.text(targetText, 120, 62);
doc.text("Progress : " + progressText, 120, 69);

// garis
doc.line(15, 75, 195, 75);


// =====================
// TABEL
// =====================
let y = 85;

doc.setFont(undefined, "bold");
doc.text("Tanggal", 15, y);
doc.text("Nominal", 80, y);
doc.text("Saldo", 150, y);

doc.line(15, y+2, 195, y+2);

doc.setFont(undefined, "normal");
y += 10;

let rows = document.querySelectorAll("#transaksi tr");

rows.forEach((row) => {

let cols = row.querySelectorAll("td");

if(cols.length >= 3){

doc.text(cols[0].innerText, 15, y);
doc.text(cols[1].innerText, 80, y);
doc.text(cols[2].innerText, 150, y);

y += 7;

// PAGE BREAK
if(y > 280){

doc.addPage();

// watermark ulang (halus)
doc.setTextColor(230);
doc.setFontSize(50);
doc.text("ELHAKIM", 55, 160, { angle: 45 });
doc.setTextColor(0);

y = 20;
}

}

});


// =====================
// FOOTER
// =====================
let tgl = new Date().toLocaleDateString("id-ID");

doc.setFontSize(8);
doc.text("Dicetak: " + tgl, 15, 290);


// SAVE
doc.save("laporan_tabungan_umroh.pdf");

}

}
