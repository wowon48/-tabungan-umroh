function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// data
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;

// ======================
// LOAD IMAGE DENGAN FETCH
// ======================
let img = new Image();
img.src = base64data;

img.onload = function(){

    let imgWidth = img.width;
    let imgHeight = img.height;

    // tentukan lebar fix
    let fixWidth = 30;

    // hitung tinggi otomatis (biar proporsional)
    let fixHeight = (imgHeight / imgWidth) * fixWidth;

    doc.addImage(base64data, "PNG", 15, 10, fixWidth, fixHeight);

    doc.text("LAPORAN TABUNGAN UMROH", 20, 40);
    doc.text("Nama: " + nama, 20, 50);
    doc.text("Saldo: " + saldo, 20, 60);

    doc.save("laporan.pdf");
};
