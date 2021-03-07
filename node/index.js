"use strict";


function randomlySelect(array) {
    // randomly select an item from the input array
    const idx = Math.floor(array.length * Math.random());
    return array[idx];
}

function makeWordPretentious(inputWord, idx, array) {
    console.log(`looking up a pretentious alternative to ${inputWord}...`)

    fetch(`https://api.datamuse.com/words?ml=${inputWord}`)
        .then(response => response.json())
        .then(response => {
            // response is an array of results.
            // each result has fields 'word', 'score' and 'tags'
            const filtered = response.filter(x => x.score > 69000);
            let outputWord;
            if (!filtered.length) {
                outputWord = inputWord;
            } else {
                outputWord = randomlySelect(filtered).word;
            }

            // now set things
            array[idx] = outputWord;

            // update output element I guess
            document.getElementById('pretentious-text').innerText = array.join(' ');
        });
}

function onButtonClick() {
    const input = document.getElementById('input-text').value;
    input.split(' ').forEach(makeWordPretentious);

    // document.getElementById('pretentious-text').innerText = makeStringPretentious(input);
}
