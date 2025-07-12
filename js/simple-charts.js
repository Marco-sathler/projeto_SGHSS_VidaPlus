// Script simples para inicializar gráficos
window.addEventListener('load', function() {
    console.log('Página carregada, verificando Chart.js...');
    
    // Aguardar um pouco mais para garantir que tudo carregou
    setTimeout(function() {
        if (typeof Chart !== 'undefined') {
            console.log('Chart.js disponível, criando gráficos...');
            createCharts();
        } else {
            console.error('Chart.js não disponível, mostrando fallbacks...');
            showFallbacks();
        }
    }, 500);
});

function createCharts() {
    // Gráfico de leitos
    const bedCanvas = document.getElementById('bed-occupancy-chart');
    if (bedCanvas) {
        try {
            new Chart(bedCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Ocupados', 'Disponíveis', 'Manutenção'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: ['#ef4444', '#10b981', '#f59e0b']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
            console.log('✅ Gráfico de leitos criado');
        } catch (error) {
            console.error('❌ Erro no gráfico de leitos:', error);
        }
    }

    // Gráfico de consultas
    const consultCanvas = document.getElementById('consultations-chart');
    if (consultCanvas) {
        try {
            new Chart(consultCanvas, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Consultas',
                        data: [120, 135, 110, 145, 160, 180],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
            console.log('✅ Gráfico de consultas criado');
        } catch (error) {
            console.error('❌ Erro no gráfico de consultas:', error);
        }
    }
}

function showFallbacks() {
    const bedFallback = document.getElementById('bed-chart-fallback');
    const consultFallback = document.getElementById('consult-chart-fallback');
    
    if (bedFallback) {
        bedFallback.style.display = 'flex';
        console.log('✅ Fallback de leitos mostrado');
    }
    
    if (consultFallback) {
        consultFallback.style.display = 'flex';
        console.log('✅ Fallback de consultas mostrado');
    }
} 