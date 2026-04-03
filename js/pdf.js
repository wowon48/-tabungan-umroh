function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// ======================
// AMBIL DATA
// ======================
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;

// ======================
// LOAD LOGO (ANTI GAGAL)
// ======================
fetch("img/logo.png")
.then(res => res.blob())
.then(blob => {

    let reader = new FileReader();

    reader.onloadend = function() {

        let base64data = reader.result;

        // ======================
        // BUAT IMAGE OBJECT (AMBIL RASIO)
        // ======================
        let img = new Image();
        img.src = base64data;

        img.onload = function(){

            let imgWidth = img.width;
            let imgHeight = img.height;

            // ukuran fix (ubah kalau mau)
            let fixWidth = 25;

            // tinggi auto biar proporsional
            let fixHeight = (imgHeight / imgWidth) * fixWidth;

            // ======================
            // MASUKKAN KE PDF
            // ======================
            doc.addImage(base64data, "PNG");

            // ======================
            // TEXT
            // ======================
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text("LAPORAN TABUNGAN UMROH", 20, 40);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text("Nama: " + nama, 20, 50);
            doc.text("Saldo: " + saldo, 20, 60);

            // ======================
            // SAVE PDF
            // ======================
            doc.save("Laporan_Tabungan.pdf");
        };

    };

    reader.readAsDataURL(blob);

});

}
