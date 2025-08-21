const apiKeyInput = document.getElementById("apiKey");
const gameSelect = document.getElementById("gameSelect");
const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const form = document.getElementById("form");
const aiResponse = document.getElementById("aiResponse");

const DEFAULT_API_KEY = "AIzaSyBfsrIaWO9Zty84PgSVDll68k2uqJN0UwU";
apiKeyInput.value = DEFAULT_API_KEY;

const markdownToHtml = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};

const PerguntarAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const pergunta = `
        ## Especialidade 
         Você é um especialista assistente de meta para o jogo ${game}
          O Stadium é um modo oficial lançado na Temporada 16 (abril/2025), com sistema de economia (Stadium Cash), Armory, Powers, builds e ranqueamento próprio.  
          Sempre considere o modo Stadium como parte integral do jogo.
        ## Tarefa
        Você deve responder as pergunta do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas.
        Você deve responder as perguntas do usuário com base no modo Stadium do jogo, trazendo builds, estratégias, composições, dicas práticas para cada herói e análises sobre o meta.
        ## Regras

          -Se você nao sabe a resposta, responda com 'Não sei' e nao tente inventar uma resposta.
          -Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao ${game}
          -Considere a data atual ${new Date().toLocaleDateString()}
          -Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta mais precisa. 
          -Se fizer uma pesquisa estrangeira, pode falar em inglês.
          -Nunca responda itens que você nao tenha certeza que existe no patch atual.
          -Nunca diga que o modo Stadium não existe, pois ele é oficial.  
        ## Resposta
          
          -Economize palavras e vá direto ao ponto.
          -Responda em markdown.
          -Nao precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta do usuário. 
        ## Exemplo de resposta 

          -pergunta do usuario: "Quais são as melhores builds para um personagem de suporte em League of Legends no patch atual?"
          -resposta: a build mais atual é \n\n **Itens:** \n\n coloque os itens aqui. \n\n **Runas:** \n\n coloque as runas aqui. \n\n **Estratégia:** \n\n Dicas e estratégias para jogar com esse personagem. 
          Resumo da função do herói no Estádio.

         -pergunta do usuário: "Qual a melhor build para a Ana no modo Estádio em Overwatch 2 focada em cura?"  
         -resposta: a build mais atual é  

         **Itens:**  
         - [Item 1]  
         - [Item 2]  
         - [Item 3]  

         **Estratégia:**  
         - Dicas de posicionamento, uso de habilidades e ultimates.  

         **Composição:**  
         - Sinergias recomendadas e times onde Ana brilha.  

         **Resumo:**  
         Pequeno resumo da função do herói no Estádio.  
        ---
        aqui está a pergunta do usuário: ${question}
          
  `;

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: pergunta,
        },
      ],
    },
  ];

  const tools = [
    {
      google_search: {},
    },
  ];

  const response = await fetch(geminiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
    }),
  });
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

const sendForm = async (event) => {
  event.preventDefault();

  const apiKey = apiKeyInput.value;
  const game = gameSelect.value;
  const question = questionInput.value;

  if (apiKey == "" || game == "" || question == "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Perguntando...";
  askButton.classList.add("loading");

  try {
    const text = await PerguntarAI(question, game, apiKey);
    aiResponse.querySelector(".response-content").innerHTML =
      markdownToHtml(text);
  } catch (error) {
    console.log("error", error);
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Perguntar";
    askButton.classList.remove("loading");
  }
};

form.addEventListener("submit", sendForm);
