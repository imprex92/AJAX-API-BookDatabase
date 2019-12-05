let respDataKey = 'A119f';
const apiUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
const noKeyUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?'; //! "requestKey" fattas här. Efter här ska nyckeln läggas till.

    // js Vanilla 

    // Wait for load
    window.addEventListener('load', () => {
        
        const getAPIKey = document.querySelector('#getKey');
        
        getAPIKey.addEventListener('click', async e => {
            //TODO knappen ska bli disabled 
            // När man trycker på knappen skickar man en förfrågan till servern
            // servern svarar
            const response = await fetch(apiUrl);
            console.log(response);
            //  Servern svarar med ett svar i JSON-format som vi måste konvertera till en sträng
            const respData = await response.json();
            console.log('JSON datan vi fick tillbaka: ', respData);
            // document.getElementById('getKeyLadbel').innerText = 'hello'

            respDataKey = respData.key; //! Lägger nyckeln som vi letade fram ur svaret från servern i variabeln "respDataKey"
            
            document.getElementById('getKeyLabel').innerText = 'Personal Key: ' +
                respDataKey; //! Skriver ut nyckeln för användaren. HÄR LIGGER NYCKELN!
                console.log(respDataKey)
        });
            
            //TODO Create book Section
            const createBookBtn = document.querySelector('#createBookBtn');
            const titleInput = document.querySelector('#titleInput');
            const authorInput = document.querySelector('#authorInput');
            let titleInputValue = titleInput.value;
            let authorInputValue = authorInput.value;
            //! Skapa addEventListener så när du klickat på "Add book" knappen ska en "CreateBook" function kallas
            let tryNo = 0;
            createBookBtn.addEventListener('click', async event => {
                //TODO for() loop om något går fel + counter antal försök (MAX 5 försök) + break
                for( let i=0; i<6; i++ ){
                    //! använder och klistrar in: Personliga nyckeln, lägger till det användaren skrev in i fältet TITEL och AUTHOR i länken som kommer skickas till servern för att lägga till en bok.
                    const addBookUrl = noKeyUrl + 'key=' + respDataKey + '&op=insert&title=' + titleInput.value + '&author=' + authorInput.value; //!
                    console.log('This is the URL you are trying to send: ' + addBookUrl);
                    //TODO Lägg svaret från servern i en ny variabel
                    const addBookSvar = await fetch(addBookUrl); //! Skickar iväg nya bokens url till servern, lägger svaret i "addSvar"
                    console.log(addBookSvar);
                    console.log('We have tried to add your book. Answer from server: ' + addBookSvar + '(before JSON convertion');
                    let addDataResp = await addBookSvar.json(); //! Converting...
                    console.log('answer JSON converted result: ', addDataResp);
                    console.log('Bokens ID: ', addDataResp.id);
                    console.log(addBookSvar);
                    if(addDataResp.status === 'success'){
                        console.log('Wohooo! Your addBook request was accepted!');
                        break;
                    }else{
                        console.log('Ohh nooo! What have you done to upset the server?! Your addBook request was not accepted!', addDataResp, '<br> try#: ' + tryNo);
                        tryNo++;
                    }
                    
                };
            
            });






    });

