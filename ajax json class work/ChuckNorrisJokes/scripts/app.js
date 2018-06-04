
class Joke{
    /**
     * 
     * @param {*} jokeId 
     * @param {*} text 
     * @param {*} categories 
     */
    constructor(jokeId, text, categories){
        this.jokeId = jokeId;
        this.text = text;
        this.categories = categories;
    }
}
window.onload = function(){
    document.getElementById("get-joke").onclick =
        getRandomJoke;
}

function getRandomJoke(){
    var url = "http://api.icndb.com/jokes/random";

    //jquery AJAX
    $.get(url, function(result){
        console.log(result);

        var type = result.type;
        if(type == "success"){
            //var jokeId = result.value.id;
            //var jokeText = result.value.joke;
            var jokeResult = result.value;
            var jokeId = jokeResult.id;
            var jokeText = jokeResult.joke;
            var jokeCategories = jokeResult.categories;

            var jokeOutput = 
                document.getElementById("joke-text");
            
            jokeOutput.innerHTML = 
                `Joke ID: ${jokeId} <br>
                Cats: ${jokeCategories.toString()} <br>
                Joke Text: ${jokeText}`;
        }
    });
}