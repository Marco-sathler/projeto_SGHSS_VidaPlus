// Script de teste para gráficos
console.log('Teste de gráficos iniciado...');

// Verificar se Chart.js está carregado
if (typeof Chart !== 'undefined') {
    console.log('✅ Chart.js carregado com sucesso!');
    console.log('Versão do Chart.js:', Chart.version);
} else {
    console.error('❌ Chart.js não foi carregado!');
}

// Verificar se os elementos canvas existem
const bedCanvas = document.getElementById('bed-occupancy-chart');
const consultCanvas = document.getElementById('consultations-chart');

if (bedCanvas) {
    console.log('✅ Canvas do gráfico de leitos encontrado');
} else {
    console.error('❌ Canvas do gráfico de leitos não encontrado');
}

if (consultCanvas) {
    console.log('✅ Canvas do gráfico de consultas encontrado');
} else {
    console.error('❌ Canvas do gráfico de consultas não encontrado');
}

// Verificar se os fallbacks existem
const bedFallback = document.getElementById('bed-chart-fallback');
const consultFallback = document.getElementById('consult-chart-fallback');

if (bedFallback) {
    console.log('✅ Fallback do gráfico de leitos encontrado');
} else {
    console.error('❌ Fallback do gráfico de leitos não encontrado');
}

if (consultFallback) {
    console.log('✅ Fallback do gráfico de consultas encontrado');
} else {
    console.error('❌ Fallback do gráfico de consultas não encontrado');
}

// Testar criação de gráfico simples
setTimeout(() => {
    if (typeof Chart !== 'undefined' && bedCanvas) {
        try {
            const testChart = new Chart(bedCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Teste'],
                    datasets: [{
                        data: [100],
                        backgroundColor: ['#3b82f6']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            console.log('✅ Gráfico de teste criado com sucesso!');
            
            // Remover gráfico de teste após 2 segundos
            setTimeout(() => {
                testChart.destroy();
                console.log('✅ Gráfico de teste removido');
            }, 2000);
            
        } catch (error) {
            console.error('❌ Erro ao criar gráfico de teste:', error);
        }
    }
}, 1000); 