const mobile_search = document.querySelector('#search-m-container');
const search_button = document.querySelector('#search-button')
search_button.addEventListener('click', function () {
    mobile_search.classList.toggle('is-active');
    search_button.classList.toggle('is-active');
});
document.getElementById("buy-button").addEventListener("click", function() {
    window.location.href = "purchase-confirmation.html"; // Reemplaza "https://www.ejemplo.com" con la URL a la que deseas redirigir.
});
