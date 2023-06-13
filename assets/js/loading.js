// 로딩이 완료된 후에 실행되는 함수
window.addEventListener("load", function () {
  // ChatGPT의 답변이 준비되면 다음 페이지로 이동
  const checkAnswerReady = setInterval(function () {
    const answerSection = document.querySelector(".answer-section");
    if (answerSection.childElementCount > 0) {
      clearInterval(checkAnswerReady);
      window.location.href = "../html/creator.html";
    }
  }, 500); // 0.5초마다 답변 준비 확인

  // 일정 시간이 지나도 답변이 준비되지 않으면 강제로 전환
  setTimeout(function () {
    clearInterval(checkAnswerReady);
    window.location.href = "../html/creator.html";
  }, 10000); // 10초 후에 전환
});
