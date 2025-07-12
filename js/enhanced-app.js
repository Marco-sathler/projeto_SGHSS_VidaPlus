// VidaPlus Enhanced App - Sistema Completo
class VidaPlusApp {
    constructor() {
        this.currentTheme = localStorage.getItem('vidaplus-theme') || 'light';
        this.notifications = [];
        this.charts = {};
        this.filters = {};
        
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNotifications();
        this.setupFilters();
        this.setupCharts();
        this.setupEventListeners();
        this.setupAccessibility();
        this.startNotificationSimulation();
    }

    // Sistema de Tema (simplificado - agora gerenciado pelo theme-toggle.js)
    setupTheme() {
        // Apenas aplicar o tema salvo
        const savedTheme = localStorage.getItem('vidaplus-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Sistema de Notificações
    setupNotifications() {
        this.createNotificationContainer();
        this.createToastContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    showNotification(type, title, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                    ${title}
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-message">${message}</div>
            <div class="notification-time">${new Date().toLocaleTimeString()}</div>
        `;

        const container = document.querySelector('.notifications-container');
        container.appendChild(notification);

        // Auto-remove
        setTimeout(() => this.removeNotification(notification), duration);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });

        this.notifications.push(notification);
    }

    removeNotification(notification) {
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        const container = document.querySelector('.toast-container');
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Sistema de Filtros
    setupFilters() {
        this.createFilters();
        this.setupSearch();
    }

    createFilters() {
        const filterContainers = document.querySelectorAll('.filters-container');
        filterContainers.forEach(container => {
            const toggle = container.querySelector('.filters-toggle');
            const content = container.querySelector('.filters-content');
            
            if (toggle && content) {
                toggle.addEventListener('click', () => {
                    content.classList.toggle('collapsed');
                    const icon = toggle.querySelector('i');
                    icon.className = content.classList.contains('collapsed') 
                        ? 'fas fa-chevron-down' 
                        : 'fas fa-chevron-up';
                });
            }
        });
    }

    setupSearch() {
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleSearch(e.target));
            input.addEventListener('focus', (e) => this.showSearchResults(e.target));
            input.addEventListener('blur', (e) => this.hideSearchResults(e.target));
        });
    }

    handleSearch(input) {
        const query = input.value.toLowerCase();
        const resultsContainer = input.parentNode.querySelector('.search-results');
        
        if (query.length < 2) {
            this.hideSearchResults(input);
            return;
        }

        // Simular resultados de busca
        const results = this.simulateSearchResults(query);
        this.displaySearchResults(input, results);
    }

    simulateSearchResults(query) {
        // Dados simulados para busca
        const data = [
            { id: 1, name: 'Maria Silva', type: 'Paciente', specialty: 'Cardiologia' },
            { id: 2, name: 'João Santos', type: 'Paciente', specialty: 'Ortopedia' },
            { id: 3, name: 'Dr. Carlos Lima', type: 'Médico', specialty: 'Cardiologia' },
            { id: 4, name: 'Dra. Ana Costa', type: 'Médica', specialty: 'Pediatria' },
            { id: 5, name: 'Leito 101', type: 'Leito', specialty: 'UTI' },
            { id: 6, name: 'Leito 202', type: 'Leito', specialty: 'Enfermaria' }
        ];

        return data.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.specialty.toLowerCase().includes(query)
        );
    }

    displaySearchResults(input, results) {
        let resultsContainer = input.parentNode.querySelector('.search-results');
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            input.parentNode.appendChild(resultsContainer);
        }

        resultsContainer.innerHTML = results.map(item => `
            <div class="search-result-item" data-id="${item.id}" data-type="${item.type}">
                <strong>${item.name}</strong>
                <span style="color: var(--text-muted);">${item.type} - ${item.specialty}</span>
            </div>
        `).join('');

        // Adicionar eventos de clique
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.querySelector('strong').textContent;
                this.hideSearchResults(input);
                this.showToast(`Selecionado: ${item.querySelector('strong').textContent}`, 'success');
            });
        });
    }

    showSearchResults(input) {
        const resultsContainer = input.parentNode.querySelector('.search-results');
        if (resultsContainer && input.value.length >= 2) {
            resultsContainer.style.display = 'block';
        }
    }

    hideSearchResults(input) {
        setTimeout(() => {
            const resultsContainer = input.parentNode.querySelector('.search-results');
            if (resultsContainer) {
                resultsContainer.style.display = 'none';
            }
        }, 200);
    }

    // Sistema de Gráficos
    setupCharts() {
        this.initCharts();
        this.setupChartInteractions();
    }

    initCharts() {
        // Inicializar gráficos se Chart.js estiver disponível
        if (typeof Chart !== 'undefined') {
            this.createDashboardCharts();
        } else {
            // Fallback para gráficos CSS
            this.createCSSCharts();
        }
    }

    createDashboardCharts() {
        // Gráfico de ocupação de leitos
        const bedCtx = document.getElementById('bed-occupancy-chart');
        if (bedCtx) {
            this.charts.bedOccupancy = new Chart(bedCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Ocupados', 'Disponíveis', 'Manutenção'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: [
                            '#ef4444',
                            '#10b981',
                            '#f59e0b'
                        ]
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

        // Gráfico de consultas por mês
        const consultCtx = document.getElementById('consultations-chart');
        if (consultCtx) {
            this.charts.consultations = new Chart(consultCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Consultas',
                        data: [120, 135, 110, 145, 160, 180],
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
    }

    createCSSCharts() {
        // Gráficos CSS como fallback
        const chartElements = document.querySelectorAll('.chart-content');
        chartElements.forEach(element => {
            if (!element.querySelector('canvas')) {
                element.innerHTML = `
                    <div class="chart-loading">
                        Carregando gráfico...
                    </div>
                `;
            }
        });
    }

    updateChartsTheme() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.update) {
                chart.update();
            }
        });
    }

    setupChartInteractions() {
        // Adicionar interações aos gráficos
        const chartCards = document.querySelectorAll('.chart-card');
        chartCards.forEach(card => {
            const actions = card.querySelectorAll('.chart-btn');
            actions.forEach(btn => {
                btn.addEventListener('click', () => {
                    actions.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.updateChartPeriod(btn.dataset.period);
                });
            });
        });
    }

    updateChartPeriod(period) {
        // Atualizar dados do gráfico baseado no período
        this.showToast(`Período alterado para: ${period}`, 'info');
    }

    // Event Listeners
    setupEventListeners() {
        // Filtros
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterAction(e.target);
            }
        });

        // Cards interativos
        document.addEventListener('click', (e) => {
            if (e.target.closest('.card, .bed-card, .patient-card, .professional-card')) {
                this.handleCardClick(e.target.closest('.card, .bed-card, .patient-card, .professional-card'));
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    handleFilterAction(button) {
        const action = button.dataset.action;
        const type = button.dataset.type;
        
        switch (action) {
            case 'apply':
                this.showToast('Filtros aplicados com sucesso!', 'success');
                break;
            case 'clear':
                this.clearFilters(type);
                this.showToast('Filtros limpos!', 'info');
                break;
            case 'export':
                this.exportData(type);
                break;
        }
    }

    clearFilters(type) {
        const container = document.querySelector(`[data-filter-type="${type}"]`);
        if (container) {
            const inputs = container.querySelectorAll('input, select');
            inputs.forEach(input => input.value = '');
        }
    }

    exportData(type) {
        this.showToast(`Exportando dados de ${type}...`, 'info');
        // Simular exportação
        setTimeout(() => {
            this.showToast('Dados exportados com sucesso!', 'success');
        }, 2000);
    }

    handleCardClick(card) {
        const type = card.dataset.type;
        const id = card.dataset.id;
        
        this.showToast(`Visualizando ${type} ID: ${id}`, 'info');
    }

    // Acessibilidade
    setupAccessibility() {
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Screen reader announcements
        this.announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };
    }

    handleKeyboardNavigation(e) {
        // Navegação por teclado
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Simulação de notificações
    startNotificationSimulation() {
        setInterval(() => {
            const notifications = [
                { type: 'info', title: 'Sistema', message: 'Backup automático realizado com sucesso' },
                { type: 'warning', title: 'Leitos', message: 'Leito 203 precisa de manutenção' },
                { type: 'success', title: 'Consultas', message: 'Nova consulta agendada para 14:30' }
            ];
            
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            this.showNotification(randomNotification.type, randomNotification.title, randomNotification.message);
        }, 30000); // A cada 30 segundos
    }

    // Métricas e Analytics
    updateMetrics() {
        const metrics = document.querySelectorAll('.metric-card');
        metrics.forEach(metric => {
            const valueElement = metric.querySelector('.metric-value');
            const changeElement = metric.querySelector('.metric-change');
            
            if (valueElement && changeElement) {
                // Simular atualização de métricas
                const currentValue = parseInt(valueElement.textContent);
                const change = Math.floor(Math.random() * 10) - 5;
                const newValue = Math.max(0, currentValue + change);
                
                valueElement.textContent = newValue;
                changeElement.textContent = change >= 0 ? `+${change}%` : `${change}%`;
                changeElement.className = `metric-change ${change >= 0 ? 'positive' : 'negative'}`;
            }
        });
    }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.vidaPlusApp = new VidaPlusApp();
    
    // Atualizar métricas a cada 5 segundos
    setInterval(() => {
        window.vidaPlusApp.updateMetrics();
    }, 5000);
});

// Exportar para uso global
window.VidaPlusApp = VidaPlusApp; 