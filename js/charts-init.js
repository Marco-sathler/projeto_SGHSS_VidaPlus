// Inicialização dos Gráficos do Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para o Chart.js carregar
    setTimeout(function() {
        initializeCharts();
    }, 100);
});

function initializeCharts() {
    // Verificar se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não foi carregado!');
        showChartFallbacks();
        return;
    }

    // Configuração global do Chart.js
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');

    // Gráfico de Ocupação de Leitos (Doughnut)
    const bedCtx = document.getElementById('bed-occupancy-chart');
    if (bedCtx) {
        const bedChart = new Chart(bedCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ocupados', 'Disponíveis', 'Manutenção'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#ef4444', // Vermelho para ocupados
                        '#10b981', // Verde para disponíveis
                        '#f59e0b'  // Amarelo para manutenção
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Usamos nossa própria legenda
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });

        // Adicionar ao objeto global para acesso posterior
        window.bedChart = bedChart;
    }

    // Gráfico de Consultas por Mês (Line)
    const consultCtx = document.getElementById('consultations-chart');
    if (consultCtx) {
        const consultChart = new Chart(consultCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Consultas',
                    data: [120, 135, 110, 145, 160, 180],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#1d4ed8',
                    pointHoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return `Mês: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `Consultas: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color'),
                            drawBorder: false
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
                            callback: function(value) {
                                return value + ' consultas';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });

        // Adicionar ao objeto global para acesso posterior
        window.consultChart = consultChart;
    }

    // Função para atualizar gráficos com novos dados
    window.updateCharts = function(period) {
        console.log('Atualizando gráficos para período:', period);
        
        // Dados simulados para diferentes períodos
        const dataSets = {
            week: {
                bed: [70, 20, 10],
                consult: [25, 30, 28, 32, 35, 40, 38]
            },
            month: {
                bed: [65, 25, 10],
                consult: [120, 135, 110, 145, 160, 180]
            },
            quarter: {
                bed: [60, 30, 10],
                consult: [350, 420, 380, 450, 480, 520]
            }
        };

        const data = dataSets[period] || dataSets.month;

        // Atualizar gráfico de leitos
        if (window.bedChart) {
            window.bedChart.data.datasets[0].data = data.bed;
            window.bedChart.update('active');
        }

        // Atualizar gráfico de consultas
        if (window.consultChart) {
            window.consultChart.data.datasets[0].data = data.consult;
            window.consultChart.update('active');
        }
    };

    // Event listeners para botões de período
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Atualizar gráficos
            const period = this.dataset.period;
            window.updateCharts(period);
        });
    });

    // Função para atualizar tema dos gráficos
    window.updateChartsTheme = function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#f8fafc' : '#1e293b';
        const gridColor = isDark ? '#334155' : '#e2e8f0';

        // Atualizar cores dos gráficos
        Chart.defaults.color = textColor;

        if (window.consultChart) {
            window.consultChart.options.scales.x.ticks.color = textColor;
            window.consultChart.options.scales.y.ticks.color = textColor;
            window.consultChart.options.scales.y.grid.color = gridColor;
            window.consultChart.update('none');
        }
    };

    console.log('Gráficos inicializados com sucesso!');
}

// Função para mostrar fallbacks dos gráficos
function showChartFallbacks() {
    const bedFallback = document.getElementById('bed-chart-fallback');
    const consultFallback = document.getElementById('consult-chart-fallback');
    
    if (bedFallback) bedFallback.style.display = 'flex';
    if (consultFallback) consultFallback.style.display = 'flex';
    
    console.log('Mostrando fallbacks dos gráficos');
}

// Função para mostrar loading nos gráficos
function showChartLoading(chartId) {
    const chartContainer = document.getElementById(chartId).parentElement;
    chartContainer.innerHTML = `
        <div class="chart-loading">
            <span>Carregando gráfico...</span>
        </div>
    `;
}

// Função para esconder loading dos gráficos
function hideChartLoading(chartId) {
    const chartContainer = document.querySelector(`#${chartId}`).parentElement;
    // Restaurar canvas
    chartContainer.innerHTML = `<canvas id="${chartId}"></canvas>`;
} 