function searchGrandmaster() {
    const name = document.getElementById("gmName").value.trim();
    const resultDiv = document.getElementById("result");
    
    if (grandmasters[name]) {
        const gm = grandmasters[name];
        resultDiv.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${gm.description}</p>
            <p><strong>Notable Games:</strong></p>
            <ul>
                ${gm.games.map(game => `<li>${game}</li>`).join("")}
            </ul>
        `;
        resultDiv.classList.remove("error");
    } else {
        resultDiv.innerHTML = "The name doesn’t exist, kindly try again.";
        resultDiv.classList.add("error");
    }
}