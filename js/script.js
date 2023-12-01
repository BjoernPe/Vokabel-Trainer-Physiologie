let dictionary = JSON.parse(localStorage.getItem('dictionary')) || {};
let randomGermanWord;
// Lese die Vokabelliste aus der Datei ein
fetch('././data/vokabeln.json')
  .then(response => response.json())
  .then(data => {
    for (let key in data) {
      dictionary[key] = data[key];
    }
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
  });

  function checkEnter(event) {
    if (event.key === 'Enter') {
        compare();
    }
}

function addVocabulary() {
    dictionary[germanText.value] = lateinText.value;
    germanText.value = '';
    lateinText.value = '';
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
    render();
}

function deleteVocabulary(germanWord) {
    if (dictionary.hasOwnProperty(germanWord)) {
        delete dictionary[germanWord];
        localStorage.setItem('dictionary', JSON.stringify(dictionary));
        render();
    } else {
        alert("Das deutsche Wort wurde nicht im Wörterbuch gefunden.");
    }
}

function render() {
    vocabularyList.innerHTML = '';
    for (let key in dictionary) {
        const germanWord = key;
        const lateinWord = dictionary[key];
        vocabularyList.innerHTML += `
            <tr>
                <td class="mdl-data-table__cell--non-numeric">${germanWord}</td>
                <td class="mdl-data-table__cell--non-numeric">${lateinWord}</td>
            </tr>
        `;
    }
}

function nextVocabulary() {
    let obj_keys = Object.keys(dictionary);
    randomGermanWord = obj_keys[Math.floor(Math.random() * obj_keys.length)];
    word.innerHTML = `${dictionary[randomGermanWord]}?`;
    text.innerHTML = '';
    germanText.value = '';
    // Verbergen des "Nächstes Wort"-Buttons
    document.getElementById("nextButton").style.display = "none";
}

function compare() {
    const userInput = germanText.value.toLowerCase().replace(/\s/g, ''); // Entfernt Leerzeichen aus der Eingabe
    const correctAnswer = randomGermanWord.toLowerCase().replace(/\s/g, ''); // Entfernt Leerzeichen aus der richtigen Antwort

    if (userInput === correctAnswer) {
        text.innerHTML = 'Richtig!!';
        document.getElementById("nextButton").style.display = "block";
    } else {
        text.innerHTML = 'Falsch!! ' + randomGermanWord;
        document.getElementById("nextButton").style.display = "block";
    }
}