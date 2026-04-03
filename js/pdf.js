function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// ambil data
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;

// load logo
let img = new Image();
img.src = "img/logo.png";

img.onload = function(){

doc.addImage(img, "PNG", 15, 10, 30, 15);

doc.text("LAPORAN TABUNGAN UMROH", 20, 40);
doc.text("Nama: " + nama, 20, 50);
doc.text("Saldo: " + saldo, 20, 60);

doc.save("laporan.pdf");

};

}
