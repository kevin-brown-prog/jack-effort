document.addEventListener('DOMContentLoaded', function () {
    // Fetch the current configuration from the server

    // Get config from local storage
    const storedConfig = localStorage.getItem('config');
    if (storedConfig) {
        const config = JSON.parse(storedConfig);
        document.getElementById('linerizationInput').value = config.linerization;
        document.getElementById('maxVeloInput').value = config.max_velo;
    }

    // Initialize the chart
    const ctx = document.getElementById('effortVelocityChart').getContext('2d');
    window.effortVelocityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Effort vs Velocity',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Perceived Effort'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Velocity'
                    }
                }
            }
        }
    });
    createChart();

});

function createChart() {
    let config = { linerization: 2.5, max_velo: 85 };
    const storedConfig = localStorage.getItem('config');
    if (storedConfig) {
        config = JSON.parse(storedConfig);

    }
    //  window.effortVelocityChart.data.labels = [];
    //  window.effortVelocityChart.data.datasets[0].data = [];
    const linerization = config.linerization || 2.5;
    const max_velo = config.max_velo || 85;

    const max_sigmoid_output = 1 / (1 + Math.exp(-linerization)) - 0.5;
    for (let i = 0; i <= 100; i += 5) {
        let effort = i;
        const effortNormalized = effort / 100 * linerization;
        const velocity = (1 / (1 + Math.exp(-effortNormalized)) - 0.5) / max_sigmoid_output * max_velo;

        window.effortVelocityChart.data.labels.push(effort);
        window.effortVelocityChart.data.datasets[0].data.push(velocity);
        window.effortVelocityChart.update();
    }
}

function updateConfig() {
    const linerizationInput = document.getElementById('linerizationInput').value;
    const maxVeloInput = document.getElementById('maxVeloInput').value;

    const newConfig = {
        linerization: parseFloat(linerizationInput),
        max_velo: parseFloat(maxVeloInput)
    };

    // Save config to local storage
    localStorage.setItem('config', JSON.stringify(newConfig));

    createChart();
}