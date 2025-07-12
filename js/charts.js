// ===== GRÁFICOS E VISUALIZAÇÕES =====

function initializeCharts() {
    initializeAttendanceChart();
    initializeBedsChart();
    initializeRevenueChart();
    initializePatientDemographics();
}

function initializeAttendanceChart() {
    const ctx = document.getElementById('attendance-chart');
    if (!ctx) return;

    const attendanceData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Consultas',
                data: [120, 135, 142, 158, 165, 178, 185, 192, 201, 215, 228, 240],
                borderColor: '#2E86AB',
                backgroundColor: 'rgba(46, 134, 171, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Exames',
                data: [85, 92, 98, 105, 112, 118, 125, 132, 138, 145, 152, 160],
                borderColor: '#A8DADC',
                backgroundColor: 'rgba(168, 218, 220, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Telemedicina',
                data: [45, 52, 58, 65, 72, 78, 85, 92, 98, 105, 112, 120],
                borderColor: '#457B9D',
                backgroundColor: 'rgba(69, 123, 157, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: attendanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#2E86AB',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeBedsChart() {
    const ctx = document.getElementById('beds-chart');
    if (!ctx) return;

    const bedsData = {
        labels: ['UTI', 'Enfermaria', 'Isolamento', 'Pediatria', 'Maternidade'],
        datasets: [
            {
                data: [85, 72, 45, 68, 78],
                backgroundColor: [
                    '#2E86AB',
                    '#A8DADC',
                    '#457B9D',
                    '#2ECC71',
                    '#F39C12'
                ],
                borderColor: [
                    '#1B5F7A',
                    '#7FB3B5',
                    '#2E5A7A',
                    '#27AE60',
                    '#E67E22'
                ],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: bedsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#2E86AB',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} leitos (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

function initializeRevenueChart() {
    const ctx = document.createElement('canvas');
    ctx.id = 'revenue-chart';
    
    const revenueSection = document.querySelector('.charts-section');
    if (revenueSection) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.innerHTML = '<h3>Receita Mensal</h3>';
        chartContainer.appendChild(ctx);
        revenueSection.appendChild(chartContainer);
    }

    const revenueData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Receita',
                data: [125000, 138000, 142000, 158000, 165000, 178000],
                backgroundColor: 'rgba(46, 134, 171, 0.8)',
                borderColor: '#2E86AB',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            },
            {
                label: 'Despesas',
                data: [98000, 105000, 112000, 118000, 125000, 132000],
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                borderColor: '#E74C3C',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }
        ]
    };

    new Chart(ctx, {
        type: 'bar',
        data: revenueData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#2E86AB',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            return `${label}: R$ ${value.toLocaleString('pt-BR')}`;
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
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });
}

function initializePatientDemographics() {
    const ctx = document.createElement('canvas');
    ctx.id = 'demographics-chart';
    
    const dashboardGrid = document.querySelector('.dashboard-grid');
    if (dashboardGrid) {
        const demographicsSection = document.createElement('div');
        demographicsSection.className = 'demographics-section';
        demographicsSection.innerHTML = `
            <div class="chart-container">
                <h3>Demografia dos Pacientes</h3>
                <canvas id="demographics-chart"></canvas>
            </div>
        `;
        dashboardGrid.appendChild(demographicsSection);
    }

    const demographicsData = {
        labels: ['0-18', '19-30', '31-50', '51-65', '65+'],
        datasets: [
            {
                label: 'Masculino',
                data: [15, 25, 35, 20, 10],
                backgroundColor: 'rgba(46, 134, 171, 0.8)',
                borderColor: '#2E86AB',
                borderWidth: 1
            },
            {
                label: 'Feminino',
                data: [18, 28, 32, 22, 12],
                backgroundColor: 'rgba(168, 218, 220, 0.8)',
                borderColor: '#A8DADC',
                borderWidth: 1
            }
        ]
    };

    new Chart(ctx, {
        type: 'bar',
        data: demographicsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#2E86AB',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// ===== GRÁFICOS ESPECÍFICOS PARA SEÇÕES =====

function createPatientChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ctx = document.createElement('canvas');
    ctx.id = 'patient-trend-chart';

    const chartData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Novos Pacientes',
                data: [45, 52, 48, 58, 62, 68],
                borderColor: '#2E86AB',
                backgroundColor: 'rgba(46, 134, 171, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });

    container.appendChild(ctx);
}

function createAppointmentChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ctx = document.createElement('canvas');
    ctx.id = 'appointment-status-chart';

    const chartData = {
        labels: ['Confirmadas', 'Pendentes', 'Canceladas'],
        datasets: [
            {
                data: [75, 15, 10],
                backgroundColor: [
                    '#2ECC71',
                    '#F39C12',
                    '#E74C3C'
                ],
                borderWidth: 0
            }
        ]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    container.appendChild(ctx);
}

function createProfessionalChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ctx = document.createElement('canvas');
    ctx.id = 'professional-specialty-chart';

    const chartData = {
        labels: ['Cardiologia', 'Pediatria', 'Ortopedia', 'Enfermagem', 'Outros'],
        datasets: [
            {
                data: [25, 20, 18, 22, 15],
                backgroundColor: [
                    '#2E86AB',
                    '#A8DADC',
                    '#457B9D',
                    '#2ECC71',
                    '#F39C12'
                ],
                borderWidth: 0
            }
        ]
    };

    new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            }
        }
    });

    container.appendChild(ctx);
}

function createBedsChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ctx = document.createElement('canvas');
    ctx.id = 'beds-occupation-chart';

    const chartData = {
        labels: ['Ocupados', 'Disponíveis', 'Manutenção'],
        datasets: [
            {
                data: [78, 15, 7],
                backgroundColor: [
                    '#E74C3C',
                    '#2ECC71',
                    '#F39C12'
                ],
                borderWidth: 0
            }
        ]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} leitos (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });

    container.appendChild(ctx);
}

// ===== FUNÇÕES DE ATUALIZAÇÃO DE DADOS =====

function updateChartData(chartId, newData) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.data.datasets[0].data = newData;
        chart.update('active');
    }
}

function addChartDataPoint(chartId, label, value) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.data.labels.push(label);
        chart.data.datasets[0].data.push(value);
        chart.update('active');
    }
}

function removeChartDataPoint(chartId, index) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.data.labels.splice(index, 1);
        chart.data.datasets[0].data.splice(index, 1);
        chart.update('active');
    }
}

// ===== CONFIGURAÇÕES GLOBAIS DO CHART.JS =====

Chart.defaults.font.family = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.color = '#666';
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
Chart.defaults.plugins.tooltip.titleColor = '#fff';
Chart.defaults.plugins.tooltip.bodyColor = '#fff';
Chart.defaults.plugins.tooltip.borderColor = '#2E86AB';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.cornerRadius = 8;

// ===== ANIMAÇÕES PERSONALIZADAS =====

Chart.defaults.animation = {
    duration: 1000,
    easing: 'easeInOutQuart'
};

// ===== RESPONSIVIDADE =====

function resizeCharts() {
    const charts = Chart.instances;
    charts.forEach(chart => {
        chart.resize();
    });
}

window.addEventListener('resize', Utils.debounce(resizeCharts, 250));

// ===== EXPORTAÇÃO =====
window.initializeCharts = initializeCharts;
window.createPatientChart = createPatientChart;
window.createAppointmentChart = createAppointmentChart;
window.createProfessionalChart = createProfessionalChart;
window.createBedsChart = createBedsChart;
window.updateChartData = updateChartData;
window.addChartDataPoint = addChartDataPoint;
window.removeChartDataPoint = removeChartDataPoint; 