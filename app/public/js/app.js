// This file contains the JavaScript code for the static page.
// It includes initialization code for the Ionic framework and any custom functionality required for the mobile-friendly website.
let config = {linerization: 2.5, max_velo: 85};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Ionic framework
    const app = document.querySelector('#app');
    if (app) {
        // Custom initialization code can go here
        console.log('Ionic app initialized');
    }

    // Get config from local storage
    const storedConfig = localStorage.getItem('config');
    if (storedConfig) {
        config = JSON.parse(storedConfig);
    }

    // Set default effort value
    const effortInput = document.getElementById('effortInput');
    if (effortInput) {
        effortInput.value = 80;
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

function calculateVelocity() {
    let effortInput = document.getElementById('effortInput').value;
    const velocityOutput = document.getElementById('velocityOutput');

    if (effortInput) {
        const effort = parseFloat(effortInput);
        const linerization = config.linerization || 2.5;
        const max_velo = config.max_velo || 85;
        const effortNormalized = effort / 100 * linerization;
        const max_sigmoid_output = 1 / (1 + Math.exp(-linerization)) - 0.5;

        const velocity = (1 / (1 + Math.exp(-effortNormalized)) - 0.5) / max_sigmoid_output * max_velo;
        velocityOutput.textContent = velocity.toFixed(2);

        // Update the chart
      
    } else {
        velocityOutput.textContent = 'Please enter a valid effort.';
    }
}

function createChart()
{
    
    const linerization = config.linerization || 2.5;
    const max_velo = config.max_velo || 85;
    
    const max_sigmoid_output = 1 / (1 + Math.exp(-linerization)) - 0.5;
    for(let i = 0; i <= 100; i+=5){
        let effort = i;
        const effortNormalized = effort / 100 * linerization;
        const velocity = (1 / (1 + Math.exp(-effortNormalized)) - 0.5) / max_sigmoid_output * max_velo;
    
        window.effortVelocityChart.data.labels.push(effort);
        window.effortVelocityChart.data.datasets[0].data.push(velocity);
        window.effortVelocityChart.update();
    }
}