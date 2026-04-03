function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// data
let nama = document.getElementById("nama").innerText;
let saldo = document.getElementById("saldo").innerText;

// ======================
// LOAD IMAGE DENGAN FETCH
// ======================
fetch("img/logo.png")
.then(res => res.blob())
.then(blob => {

    let reader = new FileReader();

    reader.onloadend = function() {

        let base64data = reader.result;

        // baru masuk ke PDF
        doc.addImage(base64data, "PNG", 15, 10, 30);

        doc.text("LAPORAN TABUNGAN UMROH", 20, 40);
        doc.text("Nama: " + nama, 20, 50);
        doc.text("Saldo: " + saldo, 20, 60);

        doc.save("laporan.pdf");
    };

    reader.readAsDataURL(blob);

});

}
