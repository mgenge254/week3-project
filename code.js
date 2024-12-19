document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const resultDiv = document.getElementById("result");
    const gamesDiv = document.getElementById("games");
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const deletePlayerBtn = document.getElementById("deletePlayerBtn");
    const addPlayerForm = document.getElementById("addPlayerForm");
    const deletePlayerForm = document.getElementById("deletePlayerForm");

    const addPlayerFormElement = document.getElementById("playerForm");
    const deletePlayerBtnAction = document.getElementById("deletePlayerBtnAction");

    let currentPlayer = null;

    // Show the Add Player form when clicked
    addPlayerBtn.addEventListener("click", () => {
        addPlayerForm.style.display = "block";
        deletePlayerForm.style.display = "none";
    });

    // Show the Delete Player form when clicked
    deletePlayerBtn.addEventListener("click", () => {
        addPlayerForm.style.display = "none";
        deletePlayerForm.style.display = "block";
    });

    // Search button event listener
    searchBtn.addEventListener("click", () => {
        const name = searchInput.value.trim();
        if (name) {
            searchGrandmaster(name);
        } else {
            resultDiv.innerHTML = "Please enter a grandmaster name.";
            resultDiv.style.display = "block";
            gamesDiv.style.display = "none";
        }
    });

    // Handle form submit to add a new player
    addPlayerFormElement.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newName = document.getElementById("newName").value;
        const newUsername = document.getElementById("newUsername").value;
        const newTitle = document.getElementById("newTitle").value;
        const newCountry = document.getElementById("newCountry").value;
        const newRating = document.getElementById("newRating").value;
        const newJoined = document.getElementById("newJoined").value;

        const newPlayer = {
            name: newName,
            username: newUsername,
            title: newTitle,
            country: newCountry,
            rating: newRating,
            joined: newJoined,
            games: [] // Initially no games
        };

        try {
            const response = await fetch("http://localhost:4000/players", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPlayer)
            });

            const data = await response.json();
            alert("New player added!");
            addPlayerForm.reset();
            addPlayerForm.style.display = "none";
        } catch (error) {
            console.error("Error adding player:", error);
        }
    });

    // Handle deleting a player
    deletePlayerBtnAction.addEventListener("click", async () => {
        const deleteUsername = document.getElementById("deleteUsername").value;

        try {
            const response = await fetch(http://localhost:4000/players?username=${deleteUsername});
            const data = await response.json();

            if (data.length > 0) {
                const playerId = data[0].id;
                await fetch(http://localhost:4000/players/${playerId}, {
                    method: "DELETE"
                });

                alert("Player deleted!");
                deletePlayerForm.reset();
                deletePlayerForm.style.display = "none";
            } else {
                alert("Player not found!");
            }
        } catch (error) {
            console.error("Error deleting player:", error);
        }
    });

    // Function to search grandmaster from db.json
    async function searchGrandmaster(name) {
        try {
            const response = await fetch(http://localhost:4000/players?name_like=${name});
            const data = await response.json();
            console.log("Data from server:", data); // Debugging

            if (data.length > 0) {
                displayGrandmasterInfo(data[0]);
            } else {
                resultDiv.innerHTML = No result found for ${name}.;
                resultDiv.style.display = "block";
                gamesDiv.style.display = "none";
            }
        } catch (error) {
            resultDiv.innerHTML = "Error fetching data. Please try again.";
            resultDiv.style.display = "block";
            gamesDiv.style.display = "none";
        }
    }

    // Function to display grandmaster info
    function displayGrandmasterInfo(player) {
        resultDiv.innerHTML = `
            <h2>${player.name} (${player.title})</h2>
            <p>Country: ${player.country}</p>
            <p>Rating: ${player.rating}</p>
            <p>Joined: ${player.joined}</p>
            <p>Status: ${player.status || "N/A"}</p>
        `;
        resultDiv.style.display = "block";

        // Display past games if available
        displayGames(player.games);
    }

    // Function to display past games of the grandmaster
    function displayGames(games) {
        if (games && games.length > 0) {
            gamesDiv.style.display = "block";
            gamesDiv.innerHTML = <h3>Recent Games</h3>;
            
            games.forEach(game => {
                const gameElement = document.createElement("div");
                gameElement.innerHTML = `
                    <p><strong>Opponent:</strong> ${game.opponent}</p>
                    <p><strong>Result:</strong> ${game.result}</p>
                    <p><strong>Moves:</strong> ${game.moves.join(" ")}</p>
                    <hr>
                `;
                gamesDiv.appendChild(gameElement);
            });
        } else {
            gamesDiv.style.display = "none";
        }
    }
});