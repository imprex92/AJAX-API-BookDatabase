let respDataKey = 'A119f';
let myTestKey = 'W22Rj';
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
                myTestKey = respData.data
        });
            
            //TODO Create book Section
            const createBookBtn = document.querySelector('#createBookBtn');
            const titleInput = document.querySelector('#titleInput');
            const authorInput = document.querySelector('#authorInput');
            //! Skapa addEventListener så när du klickat på "Add book" knappen ska en "CreateBook" function kallas
            let errormessage = document.querySelector("#errormessage");
            let tryNo = 1;
            let errorCount = 0;
            let noSuccess = 'Try again'
            
            createBookBtn.addEventListener('click', async event => {
                //TODO for() loop om något går fel + counter antal försök (MAX 5 försök) + break
                let errorList =[];
                              
                errormessage.innerHTML = "";
                for( let i=0; i<5; i++ ){
                    //! använder och klistrar in: Personliga nyckeln, lägger till det användaren skrev in i fältet TITEL och AUTHOR i länken som kommer skickas till servern för att lägga till en bok.
                    const addBookUrl = noKeyUrl + 'key=' + respDataKey + '&op=insert&title=' + titleInput.value + '&author=' + authorInput.value; //!
                    console.log('This is the URL you are trying to send: ' + addBookUrl);
                    //TODO Lägg svaret från servern i en ny variabel
                    const addBookSvar = await fetch(addBookUrl); //! Skickar iväg nya bokens url till servern, lägger svaret i "addSvar"
                    console.log(addBookSvar);
                    console.log('We have tried to add your book. Answer from server: ' + addBookSvar + '(before JSON convertion');
                    let addDataResp = await addBookSvar.json(); //! Converting...
                    // let addDataRespMessage = addDataResp.message
                    console.log('answer JSON converted result: ', addDataResp);
                    console.log('Bokens ID: ', addDataResp.id);
                    console.log(addBookSvar);
                    if(addDataResp.status === 'success'){
                        console.log('Wohooo! Your addBook request was accepted!');
                        // let messages = document.getElementById('messages')
                        // messages.innerText += '\n Try# ' + tryNo + ' ' + 'Bok tillagd.'
                        //* Anropar funktion *1
                        createAddBook();
                        // messages = document.getElementById('messages')
                        // messages.innerText = 'Didnt it work? Maybe you can see a errorcode her: '; 
                        tryNo = 1;
                        break;
                    }else{
                        console.log('Ohh nooo! What have you done to upset the server?! Your addBook request was not accepted!', addDataResp, '\n try#: ' + tryNo);
                        // let messages = document.getElementById('messages')
                        // messages.innerText += '\n Try# ' + tryNo + ' ' + 
                        errorList.push(addDataResp.message);
                        tryNo++;
                            // if( tryNo === 5){
                            //     errorList.push(noSuccess)

                            // }; //* if() End
                    }; //* if() End
                    
                }; //* for() End
            errorReportingService(errorList);
            }); //* EventListener CreateBook End

            const logInBtn = document.querySelector('#logIn');
            const logInInput = document.querySelector('#logInValue');
            
            
            logInBtn.addEventListener('click', async event => {
                myTestKey = logInInput.value
                const viewBookUrl = noKeyUrl + 'key=' + myTestKey + '&op=select';
                console.log(viewBookUrl);
                console.log('key written', logInInput.value)
                let viewBookSvar = await fetch(viewBookUrl);
                let viewBookResp = await viewBookSvar.json();
                console.log('Svar från server efter JOSN konvertering', viewBookResp);
                let viewBookArray = viewBookResp.data;
                console.log(viewBookArray);
                console.log('din nyckel för viewBook', logInInput.value);
                if(viewBookResp.status === 'success'){
                    console.log('Success! Welcome user: ', logInInput.value, +'.');
                    viewBook(viewBookArray)
                }else{
                    console.log('Failed to recognise key', viewBookResp.status);
                };
            }); //* EventListener loginSection End

            function errorReportingService(listError) {
                for (let x = 0; x < listError.length; x++) {
                    let errorTry = document.createElement('li');
                    errorTry.className = 'errorTry';
                    errorTry.innerHTML = listError[x];
                    errormessage.appendChild(errorTry);
                        console.log(listError)
                };
            };


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

        //? Tanken här är att lägga in en knapp ti div'en. Ändra och ta bort.
        //! Klar.
        let deleteButton = document.createElement('button');
        let editButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        editButton.className = 'editButton';
        deleteButton.innerText = 'Remove Book from List';
        editButton.innerText = 'Edit this Book';
        document.getElementById('bookSection').appendChild(deleteButton);
        document.getElementById('bookSection').appendChild(editButton);
        //? behövs quarySelector här innan addEventeListener???
        //? Behövs async på addEventeListener???
        
        deleteButton.addEventListener('click', async e => {
            deleteBook()
        }); //* deleteButton addEventeListener end.
        editButton.addEventListener('click', async e => {
            editButton()
        }); //* editButton addEventeListener end.
    
    
    }; //*1
    //TODO Lägg till egen bild?  function createAddBookAddPicture(){}

    function viewBook(viewBookArray){
        
        viewBookArray.forEach(book => {
            console.log(book.title);
            let createBookDiv = document.createElement('div');
            createBookDiv.className = 'thisBook';
            createBookDiv.innerText = 'Title: ' + book.title + '\n Author: ' + book.author //TODO När arrayen kommer ska värderna, Titel och Author skrivas ut i createBookDiv som i tidigare funktion.


            document.getElementById('bookSection').appendChild(createBookDiv);
        });
        
    };

    

    function deleteBook(){

    };
    function editBook(){
        
    };

