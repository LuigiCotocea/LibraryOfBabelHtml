// Function to generate random gibberish with a specified length
const gibberishMap = {};

function generateGibberish(targetLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,. ';
    let gibberish = '';

    while (gibberish.length < targetLength) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        gibberish += characters.charAt(randomIndex);
    }

    // Trim excess characters if the gibberish exceeds the target length
    gibberish = gibberish.slice(0, targetLength);

    return gibberish;
}

function hexToLocation(hexValue, shelf, row, volume, book) {
    // You can customize this based on your actual library system logic
    return {
        hex: hexValue,
        shelf: shelf,
        row: row,
        volume: volume,
        book: book
    };
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function addBook() {
    // Check if input boxes are empty
    const hexInput = document.getElementById('hexInput').value.trim();
    const shelfInput = document.getElementById('shelfInput').value.trim();
    const rowInput = document.getElementById('rowInput').value.trim();
    const volumeInput = document.getElementById('volumeInput').value.trim();
    const bookInput = document.getElementById('bookInput').value.trim();

    // Check if shelf, row, volume, and book are empty
    if (!shelfInput || !rowInput || !volumeInput || !bookInput) {
        alert("Shelf, row, volume, and book cannot be empty.");
        return;
    }

    // Validate if shelf, row, volume, and book inputs contain only numbers
    if (!isNumeric(shelfInput) || !isNumeric(rowInput) || !isNumeric(volumeInput) || !isNumeric(bookInput)) {
        alert("Shelf, row, volume, and book must contain only numbers.");
        return;
    }

    // Combine parameters to create a unique key for gibberish storage
    const combinedKey = `${hexInput}_${shelfInput}_${rowInput}_${volumeInput}_${bookInput}`;

    // Check if gibberish is already generated for the given parameters
    let gibberish = gibberishMap[combinedKey];

    // If not, generate new gibberish and store it in the map
    if (!gibberish) {
        gibberish = generateGibberish(3200);
        gibberish = gibberish.replace(/ /g, '\u00A0');
        gibberishMap[combinedKey] = gibberish;
    }

    // Update the book text container with only the gibberish
    const bookTextContainer = document.getElementById('bookText');
    bookTextContainer.textContent = gibberish;
}

// Function to reverse gibberish and display book details
function reverseGibberish(gibberish) {
    for (const key in gibberishMap) {
        if (gibberishMap.hasOwnProperty(key)) {
            const storedGibberish = gibberishMap[key].gibberish;

            // Check if the stored gibberish contains the provided gibberish
            if (storedGibberish.includes(gibberish)) {
                const messageKey = key;
                const location = gibberishMap[key].location;
                return { messageKey, gibberish, location };
            }
        }
    }
    return null; // No match found
}

// Function to reverse gibberish and display book details
function reverseLookup() {
    const reverseInput = document.getElementById('reverseInput');
    const reverseValue = reverseInput.value.trim();

    // Check if there is text in the reverseInput container
    if (!reverseValue) {
        alert("Please paste gibberish before performing a reverse lookup.");
        return;
    }

    const reversedParams = reverseGibberish(reverseValue);

    if (reversedParams) {
        const { hex, shelf, row, volume, book } = reversedParams;
        displayBookDetails(hex, shelf, row, volume, book);
    } else {
        alert("No matching book found for the provided gibberish.");
    }
}

// Function to display book details based on hex, shelf, row, volume, and book values
function displayBookDetails(messageKey, gibberish, location) {
    // Display the message in the book text container
    const bookTextContainer = document.getElementById('bookText');
    bookTextContainer.textContent = gibberish;

    // Implement your logic to store messageKey, gibberish, and location for future reference
    // For now, it will just show the details in an alert for demonstration purposes
    const details = `Message Key: ${messageKey}, Gibberish: ${gibberish}, Location: ${JSON.stringify(location)}`;
    alert(details);
}
