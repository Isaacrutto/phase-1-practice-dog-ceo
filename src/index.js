console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
    let allBreeds = [];

    // Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.style.width = "200px"; // Adjust image size
                img.style.margin = "10px";
                imageContainer.appendChild(img);
            });
        });

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message); // Store all breeds
            displayBreeds(allBreeds);
        });

    // Function to display breeds
    function displayBreeds(breeds) {
        breedList.innerHTML = ""; // Clear existing list
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change color on click
            });
            breedList.appendChild(li);
        });
    }

    // Filter breeds based on selected letter
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds);
    });
});

