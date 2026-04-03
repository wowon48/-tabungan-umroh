async function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF("p", "mm", "a4");

let pageWidth = doc.internal.pageSize.getWidth();

// =====================
// DATA DARI HTML
// =====================
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;
let va = document.getElementById("va").innerText;
let catatan = document.getElementById("catatan").innerText;
let progressText = document.getElementById("progress-text").innerText;
let targetText = document.getElementById("target-text").innerText;

// =====================
// LOGO HEADER (RAPI)
// =====================
let logo = new Image();
logo.src = "img/logo.png";

await new Promise(resolve => logo.onload = resolve);

// ukuran fix biar gak gepeng
doc.addImage(logo, "PNG", 15, 10, 30, 15);

// =====================
// HEADER TEXT
// =====================
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("ELHAKIM TRAVEL UMROH HAJI", 50, 15);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.text("Jl. Ki Mangun Sarkoro A7 Villa Satwika Tulungagung", 50, 20);

// garis
doc.line(15, 25, 195, 25);

// =====================
// JUDUL
// =====================
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("LAPORAN TABUNGAN UMROH", pageWidth / 2, 32, { align: "center" });

// =====================
// DETAIL AKUN
// =====================
doc.setFontSize(9);
doc.setFont("helvetica", "normal");

doc.text("Nama Jamaah : " + nama, 15, 40);
doc.text("No VA        : " + va, 15, 45);
doc.text("Catatan      : " + catatan, 15, 50);

doc.text("Total Tabungan : " + saldo, 120, 40);
doc.text(targetText, 120, 45);
doc.text("Progress : " + progressText, 120, 50);

// =====================
// QR CODE
// =====================
let qrDiv = document.createElement("div");

new QRCode(qrDiv, {
    text: "Verifikasi:\nNama: " + nama + "\nVA: " + va + "\n" + saldo,
    width: 80,
    height: 80
});

let qrImg = qrDiv.querySelector("img");

await new Promise(resolve => qrImg.onload = resolve);

doc.addImage(qrImg.src, "PNG", 170, 35, 25, 25);

// =====================
// WATERMARK (HALUS)
// =====================
let watermark = new Image();
watermark.src = "img/watermark.png";

await new Promise(resolve => watermark.onload = resolve);

doc.setGState(new doc.GState({ opacity: 0.08 }));

// tengah halaman
doc.addImage(watermark, "PNG", 40, 90, 130, 80);

doc.setGState(new doc.GState({ opacity: 1 }));

// =====================
// TABEL HEADER
// =====================
let startY = 60;

doc.setFont("helvetica", "bold");
doc.text("Tanggal", 15, startY);
doc.text("Nominal", 80, startY);
doc.text("Saldo", 150, startY);

doc.line(15, startY + 2, 195, startY + 2);

doc.setFont("helvetica", "normal");

// =====================
// DATA TRANSAKSI
// =====================
let rows = document.querySelectorAll("#transaksi tr");

let y = startY + 8;

rows.forEach((row, i) => {

    let cols = row.querySelectorAll("td");

    let tgl = cols[0].innerText;
    let nominal = cols[1].innerText;
    let saldoRow = cols[2].innerText;

    // pindah halaman kalau penuh
    if (y > 270) {
        doc.addPage();
        y = 20;
    }

    doc.text(tgl, 15, y);
    doc.text(nominal, 80, y);
    doc.text(saldoRow, 150, y);

    y += 6;
});

// =====================
// FOOTER
// =====================
let today = new Date().toLocaleDateString("id-ID");

doc.setFontSize(8);
doc.text("Dicetak pada: " + today, 15, 290);

// =====================
// SAVE
// =====================
doc.save("Laporan_Tabungan_Umroh.pdf");

}
