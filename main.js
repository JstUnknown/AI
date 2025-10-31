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
        else if (msg.includes("que horas são") || msg.includes("Horario")) {
            const hora = new Date().toLocaleTimeString()
            addMensagem("Assistente", `são  ${hora}`);
            speak(`são  ${hora}`)
        }
        else if (msg.includes("abrir aula da sandy")) {
            addMensagem("Assistente", "Abrindo...");
            window.open("https://play.workadventu.re/@/programation/programmingcampus/conference-campus", "_blank");
        }
        else if (msg.includes("calcular")) {
            const expressao = comando.replace("calcular", "").trim()
            try {
                const result = eval(expressao)
                addMensagem("Assistente", `o resultado vai ser ${result}`);
            } catch {
                addMensagem("Assistente", "não consegui calcular");
            }
        }
        else if (msg.includes("pesquisar")) {
            const partes = comando.split(" ");
            partes.shift();
            const possivelFonte = partes[0]?.toLowerCase();
            const termo = partes.slice(1).join(" ") || comando.replace("pesquisar", "").trim();


            let fonte = "wikipedia";


            if (["google", "duckduckgo", "wiki", "wikipedia"].includes(possivelFonte)) {
                fonte = possivelFonte === "wiki" ? "wikipedia" : possivelFonte;
            }


            if (!termo) {
                addMensagem("Assistente", "O que você deseja pesquisar?");
                return;
            }


            addMensagem("Assistente", `🔎 Pesquisando "${termo}" usando ${fonte}...`);


            if (fonte === "wikipedia") {
                fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termo)}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.extract) {
                            addMensagem("Assistente", `📘 ${data.extract}`);
                            speak(`Aqui está um resumo sobre ${termo}: ${data.extract.split(".").slice(0, 2).join(".")}.`);
                        } else {
                            addMensagem("Assistente", "Não encontrei um resumo. Quer que eu abra no navegador?");
                        }
                    })
                    .catch(() => addMensagem("Assistente", "Erro ao buscar na Wikipédia."));
            }


            else if (fonte === "duckduckgo") {
                fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(termo)}&format=json&no_html=1`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.AbstractText) {
                            addMensagem("Assistente", ` ${data.AbstractText}`);
                            speak(data.AbstractText);
                        } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                            addMensagem("Assistente", ` ${data.RelatedTopics[0].Text}`);
                        } else {
                            addMensagem("Assistente", "Não encontrei um resumo, abrindo o resultado...");
                            window.open(`https://duckduckgo.com/?q=${encodeURIComponent(termo)}`, "_blank");
                        }
                    })
                    .catch(() => addMensagem("Assistente", "Erro ao buscar no DuckDuckGo."));
            }


            else if (fonte === "google") {
                addMensagem("Assistente", "🔗 Não tenho acesso direto ao Google, mas posso abrir a pesquisa pra você.");
                window.open(`https://www.google.com/search?q=${encodeURIComponent(termo)}`, "_blank");
            }


            else {
                addMensagem("Assistente", "Fonte de pesquisa não reconhecida. Tente: wikipedia, duckduckgo ou google.");
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

const text = document.getElementById("masageInput");
var selectVoice = null;

function loadingVoice() {
    const voices = window.speechSynthesis.getVoices();


    //vozes femininas conhecidas
    const preferidas = [
        "Google português do Brasil",
        "Microsoft Maria",
        "Microsoft Francisca",
        "Maria",
        "Camila",
        "Luciana",
        "female",
        "mulher"
    ];


    // tenta encontrar uma voz feminina em pt-BR
    selectVoice = voices.find(voice =>
        voice.lang === "pt-BR" &&
        preferidas.some(nome => voice.name.toLowerCase().includes(nome.toLowerCase()))
    );


    // fallback
    if (!selectVoice) {
        selectVoice = voices.find(voice => voice.lang === "pt-BR");
    }


    if (selectVoice) {
        console.log("Voz selecionada:", selectVoice.name);
    } else {
        console.warn("Nenhuma voz pt-BR encontrada, usando padrão do sistema.");
    }
}




window.speechSynthesis.onvoiceschanged = loadingVoice;
window.addEventListener("load", () => setTimeout(loadingVoice, 500));

function speak(mensagem) {
    const fala = new SpeechSynthesisUtterance(mensagem)
    fala.lang = "pt-BR"
    if (selectVoice) {
        fala.voice = selectVoice
    }
    window.speechSynthesis.speak(fala)
}
