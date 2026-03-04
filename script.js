document.addEventListener("DOMContentLoaded", function () {

  const btnLogin = document.getElementById("btnLogin");

  btnLogin.addEventListener("click", function () {

    const userId = document.getElementById("userId").value.trim();
    const noVA = document.getElementById("noVA").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.innerText = "";

    if (!userId || !noVA) {
      errorMsg.innerText = "User ID dan No Virtual Account wajib diisi.";
      return;
    }

    // Pindah ke halaman jamaah dengan parameter
    window.location.href =
      "jamaah.html?user_id=" + encodeURIComponent(userId) +
      "&no_va=" + encodeURIComponent(noVA);
  });

});
