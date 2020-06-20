const btn = document.querySelector(".activate-btn");
const userText = document.querySelector(".user-txt");
const botText = document.querySelector(".bot-txt");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();


const addUserText = (text) => {
  const chatContainer = document.createElement('div');
  chatContainer.classList.add("chat-container");
  chatContainer.classList.add("user");
  const image = document.createElement('img');
  image.src = '/upwork.jpg';
  image.classList.add('my-image');
  const chatBox = document.createElement('p');
  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);
  chatContainer.appendChild(image);
  chatContainer.appendChild(chatBox);
  return chatContainer;
}


const addBotText = (text) => {
  const chatContainer1 = document.createElement('div');
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("bot");
  const image1 = document.createElement('img');
  image1.src = '/bot.jpg';
  image1.classList.add('my-bot');
  const chatBox1 = document.createElement('p');
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(image1);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

const botVoice= (userSpeech) => {
  const reply = new SpeechSynthesisUtterance();
  reply.text = "Sorry, I did not understand that.";

  if(userSpeech.includes('Hello Mike')) {
    reply.text = 'Hi Tammy';
  }
  if(userSpeech.includes('How are you')) {
    reply.text = 'I am fine, thanks. How are you?';
  }
  if (userSpeech.includes('Fine')) {
     reply.text = "Nice to hear that. How can I assist you today?";
   }
  if (userSpeech.includes('Do you like this Internship')) {
     reply.text = "It is very stressful, but I hope it will be worth it";
   }
   window.speechSynthesis.speak(reply);
   var element = document.querySelector(".chat-box");
   element.appendChild(addBotText(reply.text));
}

recorder.onstart = () => {
  console.log('Voice is activated');
};

recorder.onresult = (event) => {
  const resIndex = event.resultIndex;
  const transcript = event.results[resIndex][0].transcript;
  // Capitalize first letter
  const newTranscript = transcript.slice(0,1).toUpperCase() + transcript.slice(1);
  var element = document.querySelector(".chat-box");
  element.appendChild(addUserText(newTranscript));
  botVoice(newTranscript);
};

btn.addEventListener('click', () => {
  recorder.start();
});