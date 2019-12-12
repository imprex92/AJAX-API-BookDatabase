$(document).ready(() => {
    console.log('Script started.');
    let ajaxButton = $('#ajaxButton');

    ajaxButton.on('click', event => {
        const url = 'http://forverkliga.se/JavaScript/api/simple.php';
        const settings = {
            method: 'GET',
            data: {
                key: 'value'
            } // ?key=value
        }
        console.log('Before AJAX');
        let jqXHR = $.ajax(url, settings);
        console.log('AJAX in progress, waiting for response')
        jqXHR.done(onSuccess).fail(onFailure)
        console.log('Still waiting for response')
    })
});

function onSuccess(data) {
    console.log('AJAX onSuccess. The data string is: ', data);
    let object = JSON.parse(data);
    console.log('The object is: ', object);

    let result = $('#resultDiv');
    result.html('message from server: <br>' + object.message + '<br>Time: ' + object.time)
}

function onFailure(message) {
    console.log('AJAX onSuccess', message);
}
