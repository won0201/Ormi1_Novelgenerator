document.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector(".novelForm form");
  const $keywordInput = document.getElementById("keyword");
  const $genreInput = document.getElementById("genre");
  const $charCountInput = document.getElementById("charCount");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const requestData = {
      keyword: $keywordInput.value,
      genre: $genreInput.value,
      charCount: parseInt($charCountInput.value),
    };

    // requestData를 로컬 스토리지에 저장
    localStorage.setItem("requestData", JSON.stringify(requestData));

    // loading.html로 리다이렉트
    window.location.href = "assets/html/loading.html";
  });
});
