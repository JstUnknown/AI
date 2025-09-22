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
    if(selectVoice){
    console.log(selectVoice.name)}
}
window.SpeechSynthesis.onvoiceschanged=loadingVoice