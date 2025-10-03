document.addEventListener("DOMContentLoaded", () => {
   const input = document.getElementById("masageInput");
   const sendButton = document.getElementById("sendButton");
   const areaConversa = document.querySelector(".massages");


   function addMensagem(remetente, texto) {
       // wrapper da mensagem
       const msgWrap = document.createElement("div");
       msgWrap.classList.add("message");
       msgWrap.classList.add(remetente === "Você" ? "usuario" : "assistente");


       // balão (bubble)
       const bubble = document.createElement("div");
       bubble.classList.add("bubble");
       bubble.textContent = texto;


       msgWrap.appendChild(bubble);
       areaConversa.appendChild(msgWrap);


       // rola pra baixo sempre que chega nova mensagem
       areaConversa.scrollTop = areaConversa.scrollHeight;
   }


   function processarComando(comando) {
       const msg = comando.toLowerCase();


       if (msg.includes("abrir youtube")) {
           addMensagem("Assistente", "Abrindo YouTube...");
           window.open("https://www.youtube.com", "_blank");
       }
      
       else {
           addMensagem("Assistente", "Desculpe, não entendi esse comando.");
       }
   }


   sendButton.addEventListener("click", () => {
       const texto = input.value.trim();
       if (texto !== "") {
           addMensagem("Você", texto);
           processarComando(texto);
           input.value = "";
           input.focus();
       }
   });


   input.addEventListener("keypress", (e) => {
       if (e.key === "Enter" && !e.shiftKey) {
           e.preventDefault();
           sendButton.click();
       }
   });
});



