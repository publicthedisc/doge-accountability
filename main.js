// on load, load top 15 rows
// when load more button is clicked, load 30 more or so
// add search feature
initialize();

function initialize(){
    loadMoreData();
}

let currentVisibleCancellationIndex = 0;
const cancellationLoadAmount = 15;

function toggleMoreInfo(event) {
    const button = event.target.closest('button');
    const row = button.closest('tr');
    const moreInfoRow = row.nextElementSibling;

    if (moreInfoRow.classList.contains('more-info-row')) {
        moreInfoRow.style.display = moreInfoRow.style.display === 'table-row' ? 'none' : 'table-row';
    }

    button.classList.toggle('rotate-180');
}
function loadMoreData() {
    fetch("data.txt")
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("cancellation-table-body");
        for(let i = currentVisibleCancellationIndex; i < currentVisibleCancellationIndex + cancellationLoadAmount/*data.length */; i++){
            const newHTML = `
           <tr>
                <!-- Agency name, doge savings, link, more info dropdown -->
                <td class="row-element" style="width: 10%">
                    ${data[i].agency_name}
                </td>
                <td class="row-element">
                    ${data[i].description}
                </td>
                <td class="row-element" style="width: 12%">
                    ${data[i].doge_savings > 0 ? data[i].doge_savings : 0}
                </td>
                <td class="row-element" style="width: 5%">
                    <a href="${data[i].url}" target="_blank">
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
                                <p>Contract Value : ${data[i].value}</p> 
                                <p>Amount Spent : ${data[i].amount_spent}</p>
                                <div style="border: 1px solid black;"></div>
                                <p>Doge Savings: ${data[i].doge_savings}</p>
                            </div>
                            <div class="minority-data">
                                <h3>Minority Data</h3>
                                <!-- Get minority data from json here in list format -->
                            </div>
                            <div class="business-data">
                                <h3>Business Data</h3>
                                <p>Business Name: ${data[i].business_name}</p>
                                <p>Business Type: ${data[i].business_type}</p>
                                <p>Business Size: ${data[i].business_size}</p>
                            </div>
                            <div class="contract-data">
                                <h3>Contract Data</h3>
                                <p>Contract Type: ${data[i].contract_type}</p>
                                <p>Contract Pricing: ${data[i].contract_pricing}</p>
                                <p>Competitive Offers: ${data[i].offers_recieved}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="more-info-content">
                            <div class="description">
                                <h2>Official Description</h2>
                                <p>${data[i].description}</p>
                            </div>
                            <div class="description">
                                <h2>Product Description</h2>
                                <p>${data[i].product_description}</p>
                            </div>
                            <div class="description">
                                <h2>AI Description</h2>
                                <p>${data[i].ai_description}</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>  
            `
            tableBody.innerHTML += newHTML
        }
        currentVisibleCancellationIndex += cancellationLoadAmount
    }) 
    .catch(error => {
                console.error('Error fetching data:', error);
    });
}
// Use a json file to store data to print onto the site
