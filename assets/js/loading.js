// 로딩이 완료된 후에 실행되는 함수
window.addEventListener("load", function () {
  // 일정 시간 후에 다음 페이지로 이동
  setTimeout(function () {
    window.location.href = "../html/creator.html";
  }, 3000); // 3초 후에 전환
});
