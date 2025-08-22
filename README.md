# Assistente de Meta para Jogos (NLW)

Este projeto é um assistente de meta para jogos, desenvolvido durante a NLW. Ele utiliza a API Gemini para responder perguntas sobre estratégias, builds e dicas para jogos populares

## Funcionalidades

- Permite ao usuário perguntar sobre estratégias, builds e dicas para jogos como Valorant, League of Legends e Overwatch 2.
- Respostas são geradas por IA, considerando o patch atual.
- Interface moderna e responsiva.
- Respostas em Markdown, convertidas para HTML.

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript
- [Showdown.js](https://github.com/showdownjs/showdown) para conversão de Markdown em HTML
- API Gemini (Google Generative Language API)

## Como Usar

1. Clone o repositório e abra o projeto em seu navegador.
2. Insira sua API KEY da Gemini (um valor padrão já está preenchido para testes).
3. Selecione o jogo desejado.
4. Digite sua pergunta (ex: "Melhor build para Garen").
5. Clique em "Perguntar" e aguarde a resposta da IA.

## Estrutura do Projeto

```
index.html         # Página principal
style.css          # Estilos da aplicação
script.js          # Lógica JS e integração com a API
assets/            # Imagens e recursos visuais
```

## Exemplo de Pergunta

- "Quais são as melhores builds para um personagem de suporte em League of Legends no patch atual?"

## Observações

- Se a pergunta não for relacionada ao jogo, a IA irá avisar.
- As respostas são diretas, sem saudações ou despedidas.

## Créditos

- Projeto desenvolvido durante a NLW.
- Logo e imagens: NLW e respectivos jogos.

---

Sinta-se à vontade para contribuir ou adaptar este projeto para outros jogos!
