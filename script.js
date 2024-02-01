const gibberishMap = {};

function generateGibberish(targetLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,. ';
    return Array.from({ length: targetLength }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

function addBook() {
    // Cache DOM elements
    const shelfInput = document.getElementById('shelfInput');
    const rowInput = document.getElementById('rowInput');
    const volumeInput = document.getElementById('volumeInput');
    const bookInput = document.getElementById('bookInput');
    const hexInput = document.getElementById('hexInput');
    const bookTextContainer = document.getElementById('bookText');

    // Check if input boxes are empty
    const inputs = [shelfInput, rowInput, volumeInput, bookInput, hexInput];
    if (inputs.some(input => !input.value.trim())) {
        alert("Shelf, row, volume, book, and hex cannot be empty.");
        return;
    }

    // Validate if inputs contain only numbers
    if (inputs.slice(0, 4).some(input => !isNumeric(input.value.trim()))) {
        alert("Shelf, row, volume, and book must contain only numbers.");
        return;
    }

    // Combine parameters to create a unique key for gibberish storage
    const combinedKey = `${shelfInput.value.trim()}_${rowInput.value.trim()}_${volumeInput.value.trim()}_${bookInput.value.trim()}_${hexInput.value.trim()}`;

    // Check if gibberish is already generated for the given parameters
    let gibberish = gibberishMap[combinedKey];

    // If not, generate new gibberish and store it in the map
    if (!gibberish) {
        gibberish = generateGibberish(3200).replace(/ /g, '\u00A0');
        gibberishMap[combinedKey] = gibberish;
    }

    // Update the book text container with only the gibberish
    bookTextContainer.textContent = gibberish;
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}
