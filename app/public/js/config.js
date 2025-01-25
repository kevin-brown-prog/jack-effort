document.addEventListener('DOMContentLoaded', function() {
    // Fetch the current configuration from the server
   
    // Get config from local storage
    const storedConfig = localStorage.getItem('config');
    if (storedConfig) {
        const config = JSON.parse(storedConfig);
        document.getElementById('linerizationInput').value = config.linerization;
        document.getElementById('maxVeloInput').value = config.max_velo;
    }
});

function updateConfig() {
    const linerizationInput = document.getElementById('linerizationInput').value;
    const maxVeloInput = document.getElementById('maxVeloInput').value;

    const newConfig = {
        linerization: parseFloat(linerizationInput),
        max_velo: parseFloat(maxVeloInput)
    };

    // Save config to local storage
    localStorage.setItem('config', JSON.stringify(newConfig));


}