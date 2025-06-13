const API_URL = 'https://api-ia.roger-rodrigues.com/api/groq-chat';

// Força o scroll para o topo em vários momentos
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
}

// Executa em vários eventos para garantir
window.addEventListener('load', scrollToTop);
window.addEventListener('DOMContentLoaded', scrollToTop);
window.addEventListener('beforeunload', scrollToTop);

// Intersection Observer para animações
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adicionar classe fade-in aos elementos
document.querySelectorAll('.service-card, .about-content, .contact h2, #contact-form').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Chat Widget
const chatWidget = document.querySelector('.chat-widget');
const chatHeader = document.querySelector('.chat-header');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendMessage');

// Initialize chat widget
document.addEventListener('DOMContentLoaded', () => {
    // Make chat widget visible
    chatWidget.classList.add('visible');
    chatWidget.classList.add('minimized');
    chatHeader.classList.add('minimized');
    chatBody.style.display = 'none';
});

// Toggle chat visibility
chatHeader.addEventListener('click', () => {
    chatWidget.classList.toggle('minimized');
    chatHeader.classList.toggle('minimized');
    chatBody.style.display = chatWidget.classList.contains('minimized') ? 'none' : 'flex';
});

// Send message
async function sendMessage() {
    const message = chatInput.value.trim();

    if (message) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        messagesContainer.appendChild(messageElement);
        chatInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "question": message
        })
    });

    const data = await response.json();

    /* Expected response:

    {
        "success": true,
        "data": {
            "content": "Sim, a TechSolutions \u00e9 uma empresa de tecnologia. Ela se apresenta como uma empresa dedicada a transformar a presen\u00e7a digital das empresas atrav\u00e9s de solu\u00e7\u00f5es tecnol\u00f3gicas inovadoras, oferecendo uma variedade de servi\u00e7os, incluindo desenvolvimento web, aplicativos m\u00f3veis, solu\u00e7\u00f5es em intelig\u00eancia artificial, consultoria digital, suporte e manuten\u00e7\u00e3o, entre outros.",
            "model": "llama-3.3-70b-versatile",
            "finish_reason": "stop",
            "usage": {
            "prompt_tokens": 1583,
            "completion_tokens": 87,
            "total_tokens": 1670
            }
        }
    }
    */

    if (data.success) {
        const content = data.data.content;
        const model = data.data.model;
        const finishReason = data.data.finish_reason;
        const usage = data.data.usage;

        console.log(content, model, finishReason, usage);

        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        chatInput.value = '';
    } else {
        console.error('Erro ao enviar mensagem:', data);

        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.</p>
            </div>
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        chatInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        alert('Formulário enviado com sucesso! (Simulação)');
        contactForm.reset();
    });
}

// Menu Mobile
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
}); 