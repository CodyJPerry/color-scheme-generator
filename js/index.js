let colorPillarsHtml = ""
let colorCodesHtml = ""
// Get references to our elements
const colorPillarWrapperEl = document.querySelector('.color-pillars-wrapper')
const colorCodeWrapperEl = document.querySelector('.color-code-wrapper')
// Store our reference to the form
const formEl = document.querySelector('form')

for (const colorCode of data.colors) {
    colorPillarsHtml += `<div class="color-pillar" style="background: ${colorCode}"></div>`
    colorCodesHtml += `<span class="color-code">${colorCode}</span>`
}

// Update the DOM
colorPillarWrapperEl.innerHTML = colorPillarsHtml;
colorCodeWrapperEl.innerHTML = colorCodesHtml;

// Form Submit
formEl.addEventListener('submit', (event) => {
    // Get the form elements values
    let colorHexValue = document.querySelector('#color').value.substring(1)
    let colorModeSelection = document.querySelector('#color-mode').value.toLowerCase()

    // prevent the page from refreshing
    event.preventDefault()

fetch(`https://www.thecolorapi.com/scheme?hex=${colorHexValue}&mode=${colorModeSelection}`)
    .then(response => response.json())
    .then(data => {
        // Reset values before we update from the API
        colorPillarsHtml = ""
        colorCodesHtml = ""
        for (const color of data.colors) {
            colorPillarsHtml += `<div class="color-pillar" style="background: ${color.hex.value}"></div>`
            colorCodesHtml += `<span class="color-code">${color.hex.value}</span>`
        } 

        // Update the DOM
        colorPillarWrapperEl.innerHTML = colorPillarsHtml;
        colorCodeWrapperEl.innerHTML = colorCodesHtml;

    })
})