let respDataKey = 'A119f';
const apiUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
const noKeyUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?'; //! "requestKey" fattas här. Efter här ska nyckeln läggas till.

    // js Vanilla 

    // Wait for load
    window.addEventListener('load', () => {
                    //TODO LocalStorage!
                    //! LocalStorage !\\ 








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
                        //* Anropar funktion *1
                        createAddBook();
                        break;
                    }else{
                        console.log('Ohh nooo! What have you done to upset the server?! Your addBook request was not accepted!', addDataResp, '\n try#: ' + tryNo);
                        tryNo++;
                    }; //* if() End
                    
                }; //* for() End
            
            }); //* EventListener CreateBook End

            const logInBtn = document.querySelector('#logIn');
            const logInInput = document.querySelector('#logInValue');
            
            const viewBookUrl = noKeyUrl + 'key=' + logInInput.value + '&op=select';
            console.log(viewBookUrl);
            logInBtn.addEventListener('click', async event => {
                let viewBookSvar = await fetch(viewBookUrl);
                let viewBookResp = await viewBookSvar.json();
                console.log('Svar från server evter JOSN convertering', viewBookResp)
                console.log('din nyckel för viewBook', logInInput.value)
            }); //* EventListener loginSection End




    }); //* Window load End
    
    
    
    
    //*1
    function createAddBook() {
        //* Skapar ett DIV element
        let createBookDiv = document.createElement('div');
        
        // createAddBookAddPicture();
        //* Ger den skapade DIV'en en klass  
        createBookDiv.className = 'thisBook';
        //* Lägger till text i skapad DIV
        createBookDiv.innerText = 'Book Title: ' + (titleInput.value) + '\n Book Author: ' + (authorInput.value);
        // createBookDiv.innerText = 'Book Author: ' +  (authorInput.value); //*
        //*Lägger till det ovan inne i 'bookSection' elementet
        document.getElementById('bookSection').appendChild(createBookDiv);

        let bookImg = document.createElement('img');
        bookImg.setAttribute('src', 'https://cdn.pixabay.com/photo/2015/10/22/17/28/stack-of-books-1001655_1280.jpg');
        bookImg.setAttribute('alt', 'Book Template');
        createBookDiv.appendChild(bookImg);
    } //*1
    //TODO Lägg till egen bild?  function createAddBookAddPicture(){}

    function viewBook(myKey){

    }