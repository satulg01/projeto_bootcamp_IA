# Landing Page com Chat Widget

Uma landing page moderna e responsiva com um widget de chat integrado, pronta para ser conectada a uma API de IA.

## Características

- Design moderno e responsivo
- Navegação suave
- Seções para serviços, sobre e contato
- Widget de chat minimizável
- Preparado para integração com API de IA
- Totalmente responsivo para dispositivos móveis

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome (para ícones)

## Estrutura do Projeto

```
.
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md          # Documentação
```

## Como Usar

1. Clone este repositório
2. Abra o arquivo `index.html` em seu navegador
3. Para integrar com uma API de IA, modifique a função `sendUserMessage()` no arquivo `script.js`

## Integração com API de IA

Para integrar com uma API de IA, você precisará modificar a função `sendUserMessage()` no arquivo `script.js`. Atualmente, ela está configurada para simular uma resposta. Substitua o código de simulação por uma chamada real à API.

Exemplo de como integrar com uma API:

```javascript
async function sendUserMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        messageInput.value = '';

        try {
            const response = await fetch('SUA_API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            addMessage(data.response, 'bot');
        } catch (error) {
            addMessage('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
        }
    }
}
```

## Personalização

- Cores: Modifique as variáveis de cor no arquivo `styles.css`
- Conteúdo: Atualize o texto e imagens no arquivo `index.html`
- Funcionalidades: Adicione novas funcionalidades no arquivo `script.js`

## Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar conforme necessário. 