"use strict";

function randomlySelect(array) {
    const idx = Math.floor(array.length * Math.random());
    return array[idx];
}

// Plagiarised from
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeWordPretentious(inputWord, idx, array) {
    console.log(`looking up a pretentious alternative to ${inputWord}...`)

    fetch(`https://api.datamuse.com/words?ml=${inputWord}`)
        .then(response => response.json())
        .then(response => {
            const inputCapitalised = inputWord[0] === inputWord[0].toUpperCase();
            const filtered = response.filter(x => x.score > 69000);
            let outputWord;

            if (!filtered.length) {
                outputWord = inputWord;
            } else {
                outputWord = randomlySelect(filtered).word;
            }

            if (inputCapitalised) {
                outputWord = capitalise(outputWord);
            }
            array[idx] = outputWord;

            document.getElementById('pretentious-text').innerText = array.join(' ');
        });
}

function onButtonClick() {
    const input = document.getElementById('input-text').value;
    input.split(' ').forEach(makeWordPretentious);
}
