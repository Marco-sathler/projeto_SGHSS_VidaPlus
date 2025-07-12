// ========================================
// NAVBAR - SISTEMA VIDAPLUS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // MENU MOBILE
    // ========================================
    
    // Criar elementos do menu mobile se não existirem
    if (!document.querySelector('.mobile-menu-overlay')) {
        createMobileMenu();
    }
    
    // Toggle do menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Fechar menu ao clicar em um link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
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
    // NOTIFICAÇÕES
    // ========================================
    
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('Notificações', 'Você tem 3 notificações não lidas');
        });
    }
    
    // ========================================
    // BUSCA
    // ========================================
    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implementar lógica de busca aqui
            console.log('Buscando:', query);
        });
    }
    
    // ========================================
    // PERFIL DO USUÁRIO
    // ========================================
    
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            showNotification('Perfil', 'Menu de perfil em desenvolvimento');
        });
    }
    
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
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    // Executar na carga e no redimensionamento
    adjustMenuForScreenSize();
    window.addEventListener('resize', adjustMenuForScreenSize);
});

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

function createMobileMenu() {
    const body = document.body;
    
    // Overlay do menu mobile
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    
    // Menu mobile
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Header do menu mobile
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-menu-header';
    mobileHeader.innerHTML = `
        <div class="brand-text">
            <h1>VidaPlus</h1>
            <span>Sistema de Gestão Hospitalar</span>
        </div>
        <button class="close-menu-btn" onclick="closeMobileMenu()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Menu de navegação mobile
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav-menu';
    mobileNav.innerHTML = `
        <a href="dashboard.html" class="mobile-nav-link">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
        </a>
        <a href="pacientes.html" class="mobile-nav-link">
            <i class="fas fa-user-injured"></i>
            <span>Pacientes</span>
        </a>
        <a href="agendamento.html" class="mobile-nav-link">
            <i class="fas fa-calendar-alt"></i>
            <span>Agendamento</span>
        </a>
        <a href="telemedicina.html" class="mobile-nav-link">
            <i class="fas fa-video"></i>
            <span>Telemedicina</span>
        </a>
        <a href="profissionais.html" class="mobile-nav-link">
            <i class="fas fa-user-md"></i>
            <span>Profissionais</span>
        </a>
        <a href="leitos.html" class="mobile-nav-link">
            <i class="fas fa-bed"></i>
            <span>Leitos</span>
        </a>
        <a href="relatorios.html" class="mobile-nav-link">
            <i class="fas fa-chart-bar"></i>
            <span>Relatórios</span>
        </a>
        <a href="configuracoes.html" class="mobile-nav-link">
            <i class="fas fa-cog"></i>
            <span>Configurações</span>
        </a>
    `;
    
    mobileMenu.appendChild(mobileHeader);
    mobileMenu.appendChild(mobileNav);
    overlay.appendChild(mobileMenu);
    body.appendChild(overlay);
}

function closeMobileMenu() {
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showNotification(title, message) {
    // Criar notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
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
}

// ========================================
// ESTILOS CSS DINÂMICOS
// ========================================

const mobileStyles = `
<style>
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

@media (max-width: 767px) {
    .notification {
        top: 70px;
        right: 10px;
        left: 10px;
        min-width: auto;
    }
}
</style>
`;

// Adicionar estilos ao head
if (!document.querySelector('#mobile-navbar-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'mobile-navbar-styles';
    styleElement.innerHTML = mobileStyles;
    document.head.appendChild(styleElement);
} 