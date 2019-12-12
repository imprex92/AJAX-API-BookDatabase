// js vanilla

const apiUrl = 'https://opentdb.com/api.php?amount=3&category=18&difficulty=easy'

window.addEventListener('load', () => {
    // skicka request till api-servern
    // ta hand om informationen
    // visa data på sida, DOM
    // förbättra designen
    let bert = document.querySelector('#bert')
    bert.addEventListener('click', async e => {
        // async är viktigt med wait
        // alternativt sätt att använda fetch:
        // fetch(apiUrl).then(response => { })

        const response = await fetch(apiUrl)
        // // the server returns a Promise (with a Response object)
        // Får en sträng som svar från server (Serverns svar är antingen i JSON format eller en sträng i form av HTML)
        console.log(response)
        const data = await response.json(); //convertera svaret till json
        // // The response contains a string in JSON format. To convert JSON we would normally type: let object = JSON.parse(string)
        // BUT response.json() is a Promise that does the parsing for us
        console.log('JSON data is:', data) // Använd inspectera i webläsaren för att inspectera "datan", Ta reda på vilka element som är viktiga

        //  kom ihåg att anropa createQuestionDOM för varje fråga

        // data.results[]
        let allQuestions = data.results;
        let questionContainer = document.querySelector('#questionContainer');
        allQuestions.forEach(q => {
            let element = createQuestionDOM(q);
            questionContainer.appendChild(element)
        });
    })

});

function createQuestionDOM(question){
    // { question, correct_answer, incorrect_answer}
    // skapa element
    let questionElement = document.createElement('div')
    // skapa en class för div'en
    div.className = 'question'

    // gör en h2 tag
    let questionHeading = document.createElement('h2');
    // ändra texten i h2 tagen
    questionHeading.innerText = question.question;
    // lägg till frågan i elementet med appendChild
    questionElement.appendChild(questionHeading)

    // ... creates a copy of the list (spread operator)
    let options = [...question.incorrect_answers, question.correct_answer];
    // alternativt: question.incorrect_answers.push[...]
    options.forEach(o => {
        let element = document.createElement('div');
        element.className = 'option';
        element.innerText = o;
        element.addEventListener('click', e => {
            console.log('you choose:' + o);
            if( o === question.correct_answer ){
                console.log('correct')
            }else {
                console.log('incorrect. Try again!');
            }
        })
        questionElement.appendChild(element);
    });

    return questionElement;
}