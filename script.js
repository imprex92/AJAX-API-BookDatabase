let minNyckel = 'A119f'
    const apiUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey'
const noKeyUrl = 'https://www.forverkliga.se/JavaScript/api/crud' //! ".php?=" fattas här. Efter här ska nyckeln läggas till.

    // js Vanilla 

    // Wait for load
    window.addEventListener('load', () => {
        const getAPIKey = document.querySelector('#getKey');
        getAPIKey.addEventListener('click', async e => {
            // När man trycker på knappen skickar man en förfrågan till servern
            // servern svarar
            const response = await fetch(apiUrl);
            console.log(response);
            //  Servern svarar med ett svar i JSON-format som vi måste konvertera till en sträng
            const respData = await response.json();
            console.log('JSON datan vi fick tillbaka: ', respData);
            // document.getElementById('getKeyLadbel').innerText = 'hello'

            let respDataKey = respData.key; //! Lägger nyckeln som vi letade fram ur svaret från servern i variabeln "respDataKey"
            document.getElementById('getKeyLabel').innerText = 'Personal Key: ' +
                respDataKey; //! Skriver ut nyckeln för användaren. HÄR LIGGER NYCKELN!
        });

        //TODO Create book Section
        const createBookBtn = document.querySelector('#createBookBtn');
        const titleInput = document.querySelector('#titleInput');
        const authorInput = document.querySelector('#authorInput');
        
        //! Skapa addEventListener så när du klickat på "Add book" knappen ska en "CreateBook" function kallas
        createBookBtn.addEventListener('click', async event => {
            //! använder och klistrar in: Personliga nyckeln, lägger till det användaren skrev in i fältet TITEL och AUTHOR i länken som kommer skickas till servern för att lägga till en bok.
            const addBookUrl = noKeyUrl + '.key?=' + minNyckel + 'op=insert&title=' + titleInput.value + '&author=' + authorInput.value; //!
            //TODO Lägg svaret från servern i en ny variabel
            const addBookSvar = await fetch(addBookUrl); //! Skickar iväg nya bokens url till servern, lägger svaret i "addSvar"
            console.log('We have tried to add your book. Answer from server: ' + addBookSvar + '(before JSON convertion');
            let addData = await addBookSvar.json(); //! Converting...
            console.log('answer JSON converted result: ' + addData)
        });






    });