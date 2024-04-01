function getClientInfo() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                var clientData = JSON.parse(xhr.responseText);
                displayClientInfo(clientData);
            } else {
                console.error('Failed to fetch client information');
            }
        }
    };
    xhr.open('GET', '../Assets/clients.json', true);
    xhr.send();
}

function displayClientInfo(clientData) {
    var clientInfoDiv = document.getElementById('clientInfo');
    clientInfoDiv.innerHTML = '';
    clientData.forEach(function (client, index) {
        var clientParagraph = document.createElement('p');
        clientParagraph.innerHTML = `<b>Client ${index + 1}:</b><br><b>Name:</b> ${client.name}<br><b>Mobile Number:</b> ${client.mobile}<br><b>Email:</b> ${client.email}<br><b>Address:</b> ${client.addr}<br>`;
        clientInfoDiv.appendChild(clientParagraph);
    });
}
