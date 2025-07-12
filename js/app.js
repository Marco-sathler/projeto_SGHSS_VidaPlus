// ========================================
// APP PRINCIPAL - SISTEMA VIDAPLUS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // MENU MOBILE
    // ========================================
    
    // Toggle do menu mobile
    window.toggleMobileMenu = function() {
        const overlay = document.getElementById('mobile-menu-overlay');
        const menu = document.querySelector('.mobile-menu');
        
        if (overlay && menu) {
            overlay.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        }
    };
    
    // Fechar menu mobile
    window.closeMobileMenu = function() {
        const overlay = document.getElementById('mobile-menu-overlay');
        const menu = document.querySelector('.mobile-menu');
        
        if (overlay && menu) {
            overlay.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Fechar menu ao clicar no overlay
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeMobileMenu();
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // ========================================
    // RESPONSIVIDADE
    // ========================================
    
    // Ajustar menu baseado no tamanho da tela
    function adjustMenuForScreenSize() {
        const isMobile = window.innerWidth <= 767;
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (isMobile) {
            if (navMenu) navMenu.style.display = 'none';
            if (mobileMenuToggle) mobileMenuToggle.style.display = 'block';
        } else {
            if (navMenu) navMenu.style.display = 'flex';
            if (mobileMenuToggle) mobileMenuToggle.style.display = 'none';
            // Fechar menu mobile se estiver aberto
            closeMobileMenu();
        }
    }
    
    // Executar na carga e no redimensionamento
    adjustMenuForScreenSize();
    window.addEventListener('resize', adjustMenuForScreenSize);
    
    // ========================================
    // NAVEGAÇÃO ATIVA
    // ========================================
    
    // Marcar página atual no menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'dashboard.html')) {
            link.classList.add('active');
        }
    });
    
    // ========================================
    // MODAIS
    // ========================================
    
    // Abrir modal
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Fechar modal
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    // Fechar modal ao clicar fora
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    
    // ========================================
    // MENU DO USUÁRIO
    // ========================================
    
    window.toggleUserMenu = function() {
        const userMenu = document.getElementById('user-menu');
        if (userMenu) {
            userMenu.classList.toggle('active');
        }
    };
    
    // Fechar menu do usuário ao clicar fora
    document.addEventListener('click', function(e) {
        const userProfile = document.querySelector('.user-profile');
        const userMenu = document.getElementById('user-menu');
        
        if (userProfile && userMenu && !userProfile.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });
    
    // ========================================
    // NOTIFICAÇÕES
    // ========================================
    
    window.showNotification = function(title, message, type = 'info') {
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <h4>${title}</h4>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-body">
                <p>${message}</p>
            </div>
        `;
        
        // Adicionar ao body
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    };
    
    // ========================================
    // FILTROS
    // ========================================
    
    // Aplicar filtros
    window.applyFilters = function() {
        const searchInput = document.querySelector('.search-input');
        const statusFilter = document.querySelector('.status-filter');
        const dateFilter = document.querySelector('.date-filter');
        
        if (searchInput) {
            const query = searchInput.value.toLowerCase();
            // Implementar lógica de filtro aqui
            console.log('Aplicando filtros:', { query, status: statusFilter?.value, date: dateFilter?.value });
        }
    };
    
    // Limpar filtros
    window.clearFilters = function() {
        const searchInput = document.querySelector('.search-input');
        const statusFilter = document.querySelector('.status-filter');
        const dateFilter = document.querySelector('.date-filter');
        
        if (searchInput) searchInput.value = '';
        if (statusFilter) statusFilter.value = '';
        if (dateFilter) dateFilter.value = '';
        
        // Reaplicar filtros
        applyFilters();
    };
    
    // ========================================
    // AÇÕES DOS CARDS
    // ========================================
    
    // Adicionar paciente
    window.addPatient = function() {
        openModal('addPatientModal');
    };
    
    // Adicionar agendamento
    window.addAppointment = function() {
        openModal('addAppointmentModal');
    };
    
    // Adicionar sessão de telemedicina
    window.addTelemedicineSession = function() {
        openModal('addTelemedicineModal');
    };
    
    // Adicionar profissional
    window.addProfessional = function() {
        openModal('addProfessionalModal');
    };
    
    // Adicionar leito
    window.addBed = function() {
        openModal('addBedModal');
    };
    
    // ========================================
    // CHAT
    // ========================================
    
    window.toggleChat = function() {
        const chatWidget = document.querySelector('.chat-widget');
        if (chatWidget) {
            chatWidget.classList.toggle('active');
        }
    };
    
    // Enviar mensagem no chat
    window.sendChatMessage = function() {
        const messageInput = document.querySelector('.chat-message-input');
        const chatMessages = document.querySelector('.chat-messages');
        
        if (messageInput && messageInput.value.trim()) {
            const message = messageInput.value;
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message user-message';
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simular resposta automática
            setTimeout(() => {
                const responseElement = document.createElement('div');
                responseElement.className = 'chat-message bot-message';
                responseElement.innerHTML = `
                    <div class="message-content">
                        <p>Mensagem recebida! Em breve um atendente entrará em contato.</p>
                        <span class="message-time">${new Date().toLocaleTimeString()}</span>
                    </div>
                `;
                chatMessages.appendChild(responseElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    };
    
    // ========================================
    // GRÁFICOS
    // ========================================
    
    // Inicializar gráficos se Chart.js estiver disponível
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }
    
    // ========================================
    // UTILITÁRIOS
    // ========================================
    
    // Formatar data
    window.formatDate = function(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    };
    
    // Formatar hora
    window.formatTime = function(time) {
        return time.substring(0, 5);
    };
    
    // Formatar CPF
    window.formatCPF = function(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };
    
    // Formatar telefone
    window.formatPhone = function(phone) {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };
    
    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    console.log('Sistema VidaPlus inicializado com sucesso!');
    
    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        showNotification('Bem-vindo!', 'Sistema VidaPlus carregado com sucesso.', 'success');
    }, 1000);
});

// ========================================
// FUNÇÕES DOS GRÁFICOS
// ========================================

function initializeCharts() {
    // Gráfico de pacientes por mês
    const patientsChart = document.getElementById('patientsChart');
    if (patientsChart) {
        new Chart(patientsChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Pacientes',
                    data: [120, 190, 300, 500, 200, 300],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Gráfico de ocupação de leitos
    const bedsChart = document.getElementById('bedsChart');
    if (bedsChart) {
        new Chart(bedsChart, {
            type: 'doughnut',
            data: {
                labels: ['Ocupados', 'Disponíveis'],
                datasets: [{
                    data: [156, 44],
                    backgroundColor: ['#ef4444', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Gráfico de consultas por especialidade
    const consultationsChart = document.getElementById('consultationsChart');
    if (consultationsChart) {
        new Chart(consultationsChart, {
            type: 'bar',
            data: {
                labels: ['Cardiologia', 'Neurologia', 'Ortopedia', 'Pediatria', 'Ginecologia'],
                datasets: [{
                    label: 'Consultas',
                    data: [45, 32, 28, 55, 38],
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// ========================================
// ESTILOS CSS DINÂMICOS
// ========================================

const dynamicStyles = `
<style>
/* Notificações */
.notification {
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 10001;
    min-width: 300px;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-warning {
    border-left: 4px solid #f59e0b;
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--gray-200);
}

.notification-header h4 {
    margin: 0;
    color: var(--gray-800);
    font-size: 1rem;
}

.notification-header button {
    background: none;
    border: none;
    color: var(--gray-500);
    cursor: pointer;
    padding: 0.25rem;
}

.notification-body {
    padding: 1rem;
}

.notification-body p {
    margin: 0;
    color: var(--gray-700);
    font-size: 0.9rem;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Menu Mobile */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--white);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.close-menu-btn {
    background: none;
    border: none;
    color: var(--gray-600);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
}

/* Responsividade */
@media (max-width: 767px) {
    .notification {
        top: 70px;
        right: 10px;
        left: 10px;
        min-width: auto;
    }
    
    .mobile-menu-toggle {
        display: block;
    }
}
</style>
`;

// Adicionar estilos ao head
if (!document.querySelector('#dynamic-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'dynamic-styles';
    styleElement.innerHTML = dynamicStyles;
    document.head.appendChild(styleElement);
} 