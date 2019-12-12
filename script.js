let respDataKey = 'A119f';
let myTestKey = 'W22Rj';
const apiUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
const noKeyUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?'; 

    // js Vanilla 

    // Wait for load
    window.addEventListener('load', () => { 
        const getAPIKey = document.querySelector('#getKey');        
        getAPIKey.addEventListener('click', async e => {            
            document.querySelector('#getKey').disabled = true;            
            const response = await fetch(apiUrl);
            // console.log(response);            
            const respData = await response.json();
            // console.log('JSON datan vi fick tillbaka: ', respData);
            respDataKey = respData.key; //! Lägger nyckeln som vi letade fram ur svaret från servern i variabeln "respDataKey"            
            document.getElementById('getKeyLabel').innerText = 'Personal Key: ' +
            respDataKey; //! Skriver ut nyckeln för användaren. HÄR LIGGER NYCKELN!
            // console.log(respDataKey)
            myTestKey = respData.data
        });
            
            //TODO Create book Section
            const createBookBtn = document.querySelector('#createBookBtn');
            const titleInput = document.querySelector('#titleInput');
            const authorInput = document.querySelector('#authorInput');            
            let errormessage = document.querySelector("#errormessage");
            let tryNo = 1;
            let onSuccess = 'Book added!'
            let noSuccess = 'Try again'
            let onViewSuccess = 'You are in!';
            let noViewSuccess = 'Try again!'
            createBookBtn.addEventListener('click', async event => {                
                let errorList =[];                              
                errormessage.innerHTML = "";
                for( let i=0; i<4; i++ ){                    
                    const addBookUrl = noKeyUrl + 'key=' + respDataKey + '&op=insert&title=' + titleInput.value + '&author=' + authorInput.value; 
                    console.log('This is the URL you are trying to send: ' + addBookUrl);
                    //TODO Lägg svaret från servern i en ny variabel
                    const addBookSvar = await fetch(addBookUrl); 
                    // console.log(addBookSvar);
                    // console.log('We have tried to add your book. Answer from server: ' + addBookSvar + '(before JSON convertion');
                    let addDataResp = await addBookSvar.json();                     
                    // console.log('answer JSON converted result: ', addDataResp);
                    // console.log('Bokens ID: ', addDataResp.id);
                    // console.log(addBookSvar);
                    if(addDataResp.status === 'success'){
                        // console.log('Wohooo! Your addBook request was accepted!');                        
                       
                        createAddBook(addDataResp, respDataKey);
                        errorList.push('Try# ' + tryNo + ' ' + onSuccess);
                        tryNo = 1;
                        break;
                    }else{
                        // console.log('Ohh nooo! What have you done to upset the server?! Your addBook request was not accepted!', addDataResp, '\n try#: ' + tryNo);                        
                        errorList.push('Try# ' + tryNo + ' ' + addDataResp.message);
                        tryNo++;
                            if( tryNo === 5 ){
                                errorList.push('Try# ' + tryNo + ' ' + noSuccess);
                                tryNo = 1;
                            }; //* if() End

                    }; //* if() End
                    
                }; //* for() End
            errorReportingServices(errorList);
            }); //* EventListener CreateBook End
            const logInBtn = document.querySelector('#logIn');
            const logInInput = document.querySelector('#logInValue');            
            
            logInBtn.addEventListener('click', async event => {
                let errorList = [];
                errormessage.innerHTML = "";
                for( let i=0; i<4; i++ ){
                    myTestKey = logInInput.value;
                    respDataKey = logInInput.value;
                    const viewBookUrl = noKeyUrl + 'key=' + myTestKey + '&op=select';
                    // console.log(viewBookUrl);
                    // console.log('key written', logInInput.value)
                    let viewBookSvar = await fetch(viewBookUrl);
                    let viewBookResp = await viewBookSvar.json();
                    console.log('Svar från server efter JOSN konvertering', viewBookResp);
                    let viewBookArray = viewBookResp.data;
                    // console.log(viewBookArray);
                    // console.log('din nyckel för viewBook', logInInput.value);
                        if(viewBookResp.status === 'success'){
                            // console.log('Success! Welcome user: ', logInInput.value, +'.');
                            viewBook(viewBookArray)
                            errorList.push('Try# ' + tryNo + ' ' + onViewSuccess);
                            tryNo = 1;
                            document.querySelector('#logIn').disabled = true;
                            break;
                        }else{
                            // console.log('Failed to recognise key', viewBookResp.status);
                            errorList.push('Try# ' + tryNo + ' ' + viewBookSvar.message);
                            tryNo++;
                            if (tryNo === 5) {
                                errorList.push('Try# ' + tryNo + ' ' + noViewSuccess);
                                tryNo = 1;
                                
                            }; //* if() End
                        };
                };
                errorReportingServices(errorList);
            }); //* EventListener loginSection End

            function errorReportingServices(listError) {
                    
                errorTry = document.createElement('li');
                errorTry.className = 'errorTry';
                errorTry.innerHTML = listError[listError.length - 1];
                errormessage.appendChild(errorTry);
                console.log(listError);
                
            };


    }); //* Window load End 
    
    
    //*1
    function createAddBook(addDataResp, myTestKey) {
        
        let createBookDiv = document.createElement('div');        
        createBookDiv.className = 'thisBook';        
        createBookDiv.innerText = 'Book Title: ' + (titleInput.value) + '\n Book Author: ' + (authorInput.value);        
        document.getElementById('bookSection').appendChild(createBookDiv);
        let bookImg = document.createElement('img');
        bookImg.setAttribute('src', 'https://cdn.pixabay.com/photo/2015/10/22/17/28/stack-of-books-1001655_1280.jpg');
        bookImg.setAttribute('alt', 'Book Template');
        createBookDiv.appendChild(bookImg);
        let deleteButton = document.createElement('button');
        let editButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        editButton.className = 'editButton';
        deleteButton.innerText = 'Remove';
        editButton.innerText = 'Edit';
        createBookDiv.appendChild(deleteButton);
        deleteButton.value = addDataResp.id;
        createBookDiv.appendChild(editButton);
        // bookBtn(); 
        deleteButton.addEventListener('click', async e => {
            
            console.log(deleteButton.value);
            console.log('detta gick bra att klicka på!')
            let deleteBookUrl = noKeyUrl + 'key=' + myTestKey + '&op=delete&id=' + deleteButton.value;
            console.log(addDataResp.id);
            console.log(deleteBookUrl);
            let deleteRequest = await fetch(deleteBookUrl);
            let deleteRequestResp = await deleteRequest.json();
            console.log(deleteRequestResp);
            deleteBook(deleteRequestResp);
        }); //* deleteButton addEventeListener end.
        editButton.addEventListener('click', async e => {
            editButton();
        }); //* editButton addEventeListener end. 
    
    
    }; //*1
    //TODO Lägg till egen bild?  function createAddBookAddPicture(){}
    // function bookBtn(){
        

    //     deleteButton.addEventListener('click', async e => {
    //         console.log('detta gick bra att klicka på!')
    //         let deleteBookUrl = noKeyUrl + 'key=' + myTestKey + '&id=' + addDataResp.id + '&op=delete';
    //         console.log(addDataResp.id)
    //         let deleteRequest = await fetch(deleteBookUrl);
    //         let deleteRequestResp = await deleteRequest.json();
    //         console.log(deleteRequestResp.status);
    //         deleteBook(deleteRequestResp);
    //     }); //* deleteButton addEventeListener end.
    //     editButton.addEventListener('click', async e => {
    //         editButton();
    //     }); //* editButton addEventeListener end. 
    // };


    function viewBook(viewBookArray){
        let bookSection = document.getElementById('bookSection');
        console.log('VIEWbOOK', viewBookArray);
        

        viewBookArray.forEach(book => {
            // console.log(book.title);
            let createBookDiv = document.createElement('div');
            createBookDiv.className = 'thisBook';
            createBookDiv.innerText = 'Title: ' + book.title + '\n Author: ' + book.author;
            bookSection.appendChild(createBookDiv);
            let bookImg = document.createElement('img');
            bookImg.setAttribute('src', 'https://cdn.pixabay.com/photo/2015/10/22/17/28/stack-of-books-1001655_1280.jpg');
            bookImg.setAttribute('alt', 'Book Template');
            createBookDiv.appendChild(bookImg);
            let deleteButton = document.createElement('button');
            let editButton = document.createElement('button');
            deleteButton.className = 'deleteButton';
            editButton.className = 'editButton';
            deleteButton.innerText = 'Remove';
            editButton.innerText = 'Edit';
            createBookDiv.appendChild(deleteButton);
            createBookDiv.appendChild(editButton);
            //deleteButton.value = viewBookResp.id;
            deleteButton.addEventListener('click', async e => {
                console.log('detta gick bra att klicka på!')
                console.log(viewBookResp.id)
                let deleteBookUrl = noKeyUrl + 'key=' + myTestKey + '&op=delete&id=' + deleteButton.id;
                console.log(viewBookResp.id)
                let deleteRequest = await fetch(deleteBookUrl);
                let deleteRequestResp = await deleteRequest.json();
                console.log(deleteRequestResp.status);
                if(success){
                    bookSection.removeChild(createBookDiv)
                } else {
                    console.log('did not work to remove')
                }
                //deleteBook(deleteRequestResp);
            }); //* deleteButton addEventeListener end.
            editButton.addEventListener('click', async e => {
                editButton();
            }); //* editButton addEventeListener end. 
        });
        
    };

    

    function deleteBook(deleteRequestResp) {
            // console.log(deleteRequestResp.status)
            if (deleteRequestResp.status === 'success'){

            }
    };
    // function editBook(){
        
    // };

