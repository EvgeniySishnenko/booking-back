// const socket = io('http://localhost:3000');
// const msgBox = document.getElementById('exampleFormControlTextarea1');
// const msgCont = document.getElementById('data-container');
// const email = document.getElementById('email');
// console.log('start');

//Слушаем событие receiveMessage, чтобы получать сообщения, отправленные пользователями
// socket.on('receiveMessage', (message) => {
//   messages.push(message);
//   console.log(messages);
//   // loadDate(messages);
// });

//Получаем старые сообщения с сервера
// const messages = [];
// function getMessages() {
//   fetch('http://localhost:3000/api/chat')
//     .then((response) => response.json())
//     .then((data) => {
//       loadDate(data);
//       data.forEach((el) => {
//         messages.push(el);
//       });
//     })
//     .catch((err) => console.error(err));
// }
// getMessages();

//Когда пользователь нажимает клавишу enter key, отправляем сообщение.
// msgBox.addEventListener('keydown', (e) => {
//   if (e.keyCode === 13) {
//     sendMessage({ email: email.value, text: e.target.value });
//     e.target.value = '';
//   }
// });

//Отображаем сообщения пользователям
// function loadDate(data) {
//   let messages = '';
//   data.map((message) => {
//     messages += ` <li class="bg-primary p-2 rounded mb-2 text-light">
//       <span class="fw-bolder">${message.email}</span>
//       ${message.text}
//     </li>`;
//   });
//   msgCont.innerHTML = messages;
// }

//socket.io
//Создаём событие sendMessage, чтобы передать сообщение
// function sendMessage(message) {
//   socket.emit('sendMessage', message);
// }
