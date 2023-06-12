const $chatList = document.getElementById("chatList");

const requestData = JSON.parse(localStorage.getItem("requestData"));

// OpenAI API URL
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// ChatGPT용 데이터
let data = [
  {
    role: "system",
    content: "assistant는 친절한 답변가이다.",
  },
];

// 질문 보내는 함수
const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "user",
      content: question,
    });
  }
};

// 질문을 출력하는 함수
const printQuestion = () => {
  const question = data[data.length - 1];
  if (question.role === "user") {
    const li = document.createElement("li");
    li.classList.add("question");
    li.innerText = question.content;
    $chatList.appendChild(li);
  }
};

// 답변을 출력하는 함수
const printAnswer = (answer) => {
  const li = document.createElement("li");
  li.classList.add("answer");
  li.innerText = answer;
  $chatList.appendChild(li);
};

// API 요청을 보내는 함수
const apiPost = async () => {
  const result = await fetch(url, {
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
    });
};

// 소설 생성하기
const generateNovel = () => {
  sendQuestion(`키워드: ${requestData.keyword}`);
  sendQuestion(`장르: ${requestData.genre}`);
  sendQuestion(`글자 수: ${requestData.charCount}`);
  apiPost();
  printQuestion();
};

generateNovel();
