// TODO Various contracts which are totally nulled need to be fixed
// TODO add sort by feature

initialize();

function initialize(){
    fetch("data.txt")
    .then(response => response.json())
    .then(data => {
        for(i = 0; i < data.length; i++){
            cancellationIdsToLoad[i] = i
        }
    }) 
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    loadMoreData();
}

let currentVisibleCancellationIndex = 0;
const cancellationLoadAmount = 15;
let cancellationIdsToLoad = [];
let cancellationSearchParameters = ["description"];

function toggleMoreInfo(event) {
    const button = event.target.closest('button');
    const row = button.closest('tr');
    const moreInfoRow = row.nextElementSibling;

    if (moreInfoRow.classList.contains('more-info-row')) {
        moreInfoRow.style.display = moreInfoRow.style.display === 'table-row' ? 'none' : 'table-row';
    }

    button.classList.toggle('rotate-180');
}
function formatNumber(numberToFormat){
    if (numberToFormat == null) return null

    return numberToFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function toTitleCase(str){
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}
function loadMoreData() {
    fetch("data.txt")
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("cancellation-table-body");

        for(let i = currentVisibleCancellationIndex; i < currentVisibleCancellationIndex + cancellationLoadAmount; i++){
            const currentId = cancellationIdsToLoad[i];

            if(currentId == null || data[currentId].amount_spent == null){
                continue;
            }

            const newHTML = `
           <tr>
                <!-- Agency name, doge savings, link, more info dropdown -->
                <td class="row-element" style="width: 10%">
                    ${data[currentId].agency_name}
                </td>
                <td class="row-element">
                    ${data[currentId].description}
                </td>
                <td class="row-element" style="width: 12%">
                    ${data[currentId].doge_savings > 0 ? formatNumber(data[currentId].doge_savings) : 0}
                </td>
                <td class="row-element" style="width: 5%">
                    <a href="${data[currentId].url}" target="_blank">
                        <img src="Images/Link.png" alt="Link Button">
                    </a>
                </td>
                <td class="row-element" style="width: 4%">
                    <button class="down-arrow" onclick="toggleMoreInfo(event)">
                        <img src="Images/Down Arrow.png" alt="More Button">
                    </button>
                </td>
            </tr>
            <tr class="more-info-row">
                <td colspan="5">
                    <div>
                        <div class="more-info-content">
                            <div class="value-data">
                                <p>Contract Value : ${formatNumber(data[currentId].value)}</p> 
                                <p>Amount Spent : ${formatNumber(data[currentId].amount_spent)}</p>
                                <div style="border: 1px solid black;"></div>
                                <p>Doge Savings: ${formatNumber(data[currentId].doge_savings)}</p>
                            </div>
                            <div class="minority-data">
                                <h3>Minority Data</h3>
                                <ul>
                                    ${getFormattedData(data[currentId])}
                                </ul>
                            </div>
                            <div class="business-data">
                                <h3>Business Data</h3>
                                <p>Business Name: ${data[currentId].business_name}</p>
                                <p>Business Type: ${data[currentId].business_type}</p>
                                <p>Business Size: ${data[currentId].business_size}</p>
                            </div>
                            <div class="contract-data">
                                <h3>Contract Data</h3>
                                <p>Contract Type: ${data[currentId].contract_type}</p>
                                <p>Contract Pricing: ${data[currentId].contract_pricing}</p>
                                <p>Competitive Offers: ${data[currentId].offers_recieved}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="more-info-content">
                            <div class="description">
                                <h2>Official Description</h2>
                                <p>${data[currentId].description}</p>
                            </div>
                            <div class="description">
                                <h2>Product Description</h2>
                                <p>${data[currentId].product_description}</p>
                            </div>
                            <div class="description">
                                <h2>AI Description</h2>
                                <p>${data[currentId].ai_description}</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>  
            `
            tableBody.innerHTML += newHTML
        }
        currentVisibleCancellationIndex += cancellationLoadAmount

        // Change text on load more based on contracts left.
        if(currentVisibleCancellationIndex > cancellationIdsToLoad.length){
            document.getElementById("load-more-button").innerText = "No More Cancellations Left";
            document.getElementById("load-more-button").style.pointerEvents = "none";
        } else{
            console.log(currentVisibleCancellationIndex + " " + cancellationIdsToLoad.length)
            document.getElementById("load-more-button").innerText = "Load More Cancellations"; 
            document.getElementById("load-more-button").style.pointerEvents = "auto";
        }
    }) 
    .catch(error => {
                console.error('Error fetching data:', error);
    });
}
function getFormattedData(data) {
    const result = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // Check if key starts with "is" and the value is "true"
            if (key.startsWith("is") && data[key] === "true") {
                const formattedKey = key
                    .replace(/^is([A-Z])/g, (match, letter) => ` ${letter.toUpperCase()}`)
                    .replace(/([a-z])([A-Z])/g, '$1 $2') 
                    .replace(/^./, str => str.toUpperCase()); 
                
                const HTMLKey = `<li class="minority-data-list">${formattedKey}</li>`;

                result.push(HTMLKey);
            }
        }
    }

    if (result.length === 0) {
        return `<li class="minority-data-list">None</li>`
    }

    return result.join('');
}
function searchCancellations(){
    const searchQuery = document.getElementById("cancellation-search-input").value.toLowerCase();
    const tableBody = document.getElementById("cancellation-table-body");
    fetch("data.txt")
    .then(response => response.json())
    .then(data => {
        let count = 0;
        cancellationIdsToLoad = [];
        currentVisibleCancellationIndex = 0;
        for(let j = 0; j < cancellationSearchParameters.length; j++){
            for(let i = 0; i < data.length; i++){
                if(data[i][cancellationSearchParameters[j]] == null){
                    continue; // I think these are now deleted contracts. Maybe do something with that.
                }
                if(data[i][cancellationSearchParameters[j]].toLowerCase().includes(searchQuery)){
                    cancellationIdsToLoad[count] = i;
                    count++;
                }
            }
        }
        tableBody.innerHTML = "";
        loadMoreData();
    }) 
    .catch(error => {
        console.error('Error searching data:', error);
    });
}
function toggleCancellationParameter(event){
    event.target.classList.toggle("parameter-button-active")
    
    toggleArrayValue(cancellationSearchParameters, event.target.value)
}
function toggleArrayValue(arr, value) {
    const index = arr.indexOf(value);

    if (index === -1) {
        arr.push(value);
    } else {
        arr.splice(index, 1);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadData();

    // make a clone of the cards on the left and right
    // then after arrow is clicked add next one and remove old one

    const scrollLeftBtn = document.querySelector('.left-button');
    const scrollRightBtn = document.querySelector('.right-button');
    const cardContainer = document.getElementById('dashboard-screen');
    const cards = document.querySelectorAll('.dashboard-card');
    let currentIndex = 0;
    let offsetIndex = 0;
    const cardsToShow = 1;
    const shownCards = 3;

    let resetTimer;

    cardContainer.innerHTML = '';
    for (let i = 0; i < shownCards; i++) {
        cardContainer.append(cards[i])
    }

    function updateCarousel() {
        const transformValue = -offsetIndex * (34 * cardsToShow);
        cardContainer.style.transform = `translateX(${transformValue}%)`;
    }

    scrollRightBtn.addEventListener('click', () => {
        clearTimeout(resetTimer);
        offsetIndex++;
        cardContainer.style.transition = "transform 0.5s ease";

        // Append a copy of the card
        for (let i = 0; i < cardsToShow; i++) {
            currentIndex++;
            currentIndex %= cards.length;
            cardContainer.append(cards[wrapIndex(currentIndex + shownCards - 1, cards.length)].cloneNode(true))
        }
        updateCarousel();

        // Cleanup
        resetTimer = setTimeout(() => {
            offsetIndex = 0;
            cardContainer.style.transition = "none";
            cardContainer.innerHTML = '';
            for (let i = 0; i < shownCards; i++) {
                cardContainer.append(cards[wrapIndex(currentIndex + i, cards.length)])
            }
            cardContainer.style.transform = `translateX(0)`;
        }, 500);
    });

    scrollLeftBtn.addEventListener('click', () => {
        clearTimeout(resetTimer);
        offsetIndex = 1;
    
        // Prepend clones of the previous cards.
        for (let i = 0; i < cardsToShow; i++) {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            cardContainer.prepend(cards[wrapIndex(currentIndex, cards.length)].cloneNode(true));
        }
        
        // Shift container to hide the clones.
        cardContainer.style.transition = "none";
        updateCarousel();
        void cardContainer.offsetWidth;
        
        // Animate the container back into place.
        cardContainer.style.transition = "transform 0.5s ease";
        cardContainer.style.transform = "translateX(0)";
        
        // Cleanup
        resetTimer = setTimeout(() => {
            offsetIndex = 0;
            cardContainer.style.transition = "none";
            cardContainer.innerHTML = '';
            for (let i = 0; i < shownCards; i++) {
                const index = wrapIndex(currentIndex + i, cards.length);
                cardContainer.append(cards[index]);
            }
        }, 500);
    });
    
});
function wrapIndex(index, length) {
    return ((index % length) + length) % length;
}
async function loadData() {
    const response = await fetch("data.txt");
    const data = await response.json();

    // Now perform all the drawing functions for the charts
    fillDogeSavingsInfo(data);
    drawWomenOwnedChart(data);
    drawVeteranOwnedChart(data);
    drawBusinessSizeChart(data);
    drawBusinessTypeChart(data);
    drawContractPricingChart(data);
    drawContractValueChart(data);
    drawOffersReceivedChart(data);
    drawContractTypeChart(data);
}

/*
const scrollLeftBtn = document.querySelector('.left-button');
    const scrollRightBtn = document.querySelector('.right-button');
    const cardContainer = document.getElementById('dashboard-screen');
    const cards = document.querySelectorAll('.dashboard-card');
    const cardCount = cards.length;
    let currentIndex = 0;
    const cardsToShow = 1;
    const shownCards = 3;

    function updateCarousel() {
        const transformValue = -currentIndex * (34 / cardsToShow);
        cardContainer.style.transform = `translateX(${transformValue}%)`;
    }

    scrollRightBtn.addEventListener('click', () => {
        currentIndex += cardsToShow;
        if (currentIndex > cardCount - shownCards) {
            cardContainer.style.transition = 'none';
            currentIndex = 0;
            void cardContainer.offsetWidth;
            cardContainer.style.transition = 'transform 0.5s ease';
        }
        updateCarousel();
    });

    scrollLeftBtn.addEventListener('click', () => {
        currentIndex -= cardsToShow;
        if (currentIndex < 0) {
            cardContainer.style.transition = 'none';
            currentIndex = Math.floor((cardCount / cardsToShow) - 3);
            void cardContainer.offsetWidth;
            cardContainer.style.transition = 'transform 0.5s ease';
        }
        updateCarousel();
    });

    // Initialize
    updateCarousel();*/