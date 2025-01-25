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
});

function calculateVelocity() {
    let effortInput = document.getElementById('effortInput').value;
    const velocityOutput = document.getElementById('velocityOutput');

    if (effortInput) {
        const effort = parseFloat(effortInput);
        const linerization = config.linerization || 2.5;
        const max_velo = config.max_velo || 85;
        const effortNormalized = effort / 100 * linerization;
        const sigmoid_output = 1 / (1 + Math.exp(-effortNormalized));
        const max_sigmoid_output = sigmoid_output - 0.5;

        const velocity = (1 / (1 + Math.exp(-effortNormalized)) - 0.5) / max_sigmoid_output * max_velo;
        velocityOutput.textContent = velocity.toFixed(2);
    } else {
        velocityOutput.textContent = 'Please enter a valid effort.';
    }
}