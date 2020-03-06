// Variables

const listaTweets = document.getElementById('lista-tweets');



// Event Listeners
eventListeners();

function eventListeners() {
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
}

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

// Funciones


// añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    //Leer el valor de text area
    const tweet = document.querySelector('#tweet').value;
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // Crear elemento y añadirle el elemento a la lista
    const li = document.createElement('li');
    li.innerHTML = tweet;
    // añade boton de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);
    //Añadir al Local Storage
    //localStorage.setItem('tweet', tweet);
    agregarTweetLocalStorage(tweet);
}
// Elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);
    }
}

// Mostrar datos de localstorage en la lista

function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
    // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el elemento a la lista
        const li = document.createElement('li');
        li.innerHTML = tweet;
        // añade boton de borrar al tweet
        li.appendChild(botonBorrar);
        // añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// Agregar tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    //Reviosamos valores de local storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet de local storage

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    // Eliminar la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length-1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));


}