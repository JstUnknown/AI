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


    if (msg.includes("oi")) {
           addMensagem("Assistente", "Oi, sou ClaudIA! Eu posso abrir sites e te dizer o horario!");
       
            speak("Oi, sou sua assistente ClaudIA! Eu posso abrir sites e te dizer o horario!")

       }
       else if (msg.includes("abrir youtube")) {
           addMensagem("Assistente", "Abrindo YouTube...");
           window.open("https://www.youtube.com", "_blank");
       }
       else if (msg.includes("que horas são")||msg.includes("Horario")) {
            const hora=new Date().toLocaleTimeString()
            addMensagem("Assistente",`são  ${hora}`);
            speak(`são  ${hora}`)
       }
        else if (msg.includes("abrir aula da sandy")) {
           addMensagem("Assistente", "Abrindo...");
           window.open("https://play.workadventu.re/@/programation/programmingcampus/conference-campus", "_blank");
       }
       else if (msg.includes("calcular")){
        const expressao = comando.replace("calcular","").trim()
        try{
            const result=eval(expressao)
            addMensagem("Assistente", `o resultado vai ser ${result}`);
        }catch{
            addMensagem("Assistente", "não consegui calcular");
        }
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

const text=document.getElementById("masageInput");
var selectVoice=null;

function loadingVoice(){
    const voices=window.speechSynthesis.getVoices();
    selectVoice=voices.find((voice)=>
    voice.lang==="pt-BR"&&(
        voice.name.toLowerCase().includes("maria")||
         voice.name.toLowerCase().includes("female")||
          voice.name.toLowerCase().includes("mulher")
    )
    );
    if(!selectVoice){
        selectVoice=voices. find((voice)=>voice.lang==="pt-BR")
    }
    if(selectVoice){
    console.log(selectVoice.name)}
}
window.SpeechSynthesis.onvoiceschanged=loadingVoice

function speak(mensagem){
    const fala=new SpeechSynthesisUtterance(mensagem)
    fala.lang="pt-BR"
    if(selectVoice){
        fala.voice=selectVoice
    }
    window.speechSynthesis.speak(fala)
}
