const $chatList = document.getElementById("chatList");
const genreInfo = document.getElementById("genreInfo");
const keywordInfo = document.getElementById("keywordInfo");
const charCountInfo = document.getElementById("charCountInfo");

const requestData = JSON.parse(localStorage.getItem("requestData"));

// OpenAI API URL
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// ChatGPT용 데이터
let data = [
  {
    role: "system",
    content:
      "assistant는 능력있는 소설가이다. 키워드와 장르가 주어지면 쓰지 못하는 소설이 없다. 입력한 글자수에 맞춰서 작성해야한다.",
  },
];

data.push(
  {
    role: "user",
    content: `키워드: ${requestData.keyword}`,
  },
  {
    role: "user",
    content: `장르: ${requestData.genre}`,
  },
  {
    role: "assistant",
    content: "제가 작성한 소설의 제목과 내용은 다음과 같습니다.",
  }
);

// 질문 보내는 함수
const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "user",
      content: question,
    });
  }
};

// 출력 정보 업데이트 함수
const updateInfo = () => {
  genreInfo.innerText = requestData.genre;
  keywordInfo.innerText = requestData.keyword;
  charCountInfo.innerText = requestData.charCount;
};

// 질문을 출력하는 함수
const printQuestion = () => {
  const infoList = document.getElementById("infoList");
  infoList.innerHTML = ""; // 기존에 출력된 내용을 초기화

  let uniqueQuestions = new Set();

  for (let i = 0; i < data.length; i++) {
    const question = data[i];
    if (question.role === "user") {
      uniqueQuestions.add(question.content);
    }
  }

  for (let question of uniqueQuestions) {
    const li = document.createElement("li");
    li.classList.add("question");
    const span = document.createElement("span");
    span.innerText = question;
    li.appendChild(span);
    infoList.appendChild(li);
  }
};

// 답변을 출력하는 함수
const printAnswer = (answer) => {
  printQuestion();
  const li = document.createElement("li");
  li.classList.add("answer");
  li.innerText = answer;
  $chatList.appendChild(li);
};

// 화면에 로딩 표시를 보여주는 함수
const showLoadingIndicator = () => {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "flex";

  // 채팅 컨테이너에 블러 처리를 추가
  document
    .querySelectorAll(".question-container, .answer-container")
    .forEach((element) => {
      element.classList.add("blur");
    });
};

// 화면에 로딩 표시를 숨기는 함수
const hideLoadingIndicator = () => {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "none";

  // 채팅 컨테이너의 블러 처리를 제거
  document
    .querySelectorAll(".question-container, .answer-container")
    .forEach((element) => {
      element.classList.remove("blur");
    });
};

// API 요청을 보내는 함수
const apiPost = async () => {
  showLoadingIndicator();
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      printAnswer(res.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hideLoadingIndicator();
    });
};

// 소설 생성하기
const generateNovel = () => {
  sendQuestion(`키워드: ${requestData.keyword}`);
  sendQuestion(`장르: ${requestData.genre}`);
  sendQuestion(`글자 수: ${requestData.charCount}`);
  apiPost();
};

generateNovel();
