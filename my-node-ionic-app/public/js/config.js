document.addEventListener('DOMContentLoaded', function() {
    // Fetch the current configuration from the server
    fetch('/config')
        .then(response => response.json())
        .then(data => {
            // Populate the input fields with the current configuration
            document.getElementById('linerizationInput').value = data.linerization;
            document.getElementById('maxVeloInput').value = data.max_velo;
        })
        .catch(error => console.error('Error fetching config:', error));
});

function updateConfig() {
    const linerizationInput = document.getElementById('linerizationInput').value;
    const maxVeloInput = document.getElementById('maxVeloInput').value;

    const newConfig = {
        linerization: parseFloat(linerizationInput),
        max_velo: parseFloat(maxVeloInput)
    };

    fetch('/config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConfig)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => console.error('Error updating config:', error));
}