axios({
    method: "GET",
    url: "https://api.unsplash.com/photos/random?query=nature%beautiful&client_id=E0cfGzo8MWURND4cz9DYxoBQ_b8lP17JRyiF57kqELk",
})
    .then((response) => {
        $("body").append(
            `<img class='background' src=${response.data.urls.full} >`
        );
        $("body").append(
            `<div class='photographer text'>
            <ul>
                <li>Photography by ${response.data.user.name}</li>
            </ul>
        </div>`
        );
    })
    .catch((error) => {
        console.log(error);
    });

const icons = {
    Clear: "☀",
    Rain: "️🌧",
    Storm: "⛈",
    Snow: "🌨",
    Mist: "🌫",
    Clouds: "☁",
};

function getLocalWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude.toFixed(2);
            let long = position.coords.longitude.toFixed(2);

            axios({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f20fd83927971743870040d761fe4571`,
            })
                .then((response) => {
                    let icon = response.data.weather[0].main;
                    $("body").append(
                        `<div id='weather'>
                    <p class='weather-text text'>${icons[icon]} ${Math.floor(
                            response.data.main.temp - 273
                        )}˚<br>
                        ${response.data.name}
                    </p>
                </div>`
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    } else {
        alert("Geolocation is not supported by this browser. cannot display local weather");
    }
}

getLocalWeather();

let hour = moment().format("H");
let greeting = null;

if (hour < 4 || hour > 21) {
    greeting = "Good Night";
} else if (hour >= 4 && hour < 12) {
    greeting = "Good Morning";
} else if (hour >= 12 && hour <= 14) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}

$("#time").append(`
  <p class='text time'>${moment().format(" h:mm A ")}</p>
  <p id='greeting' class='text'> ${greeting}</p>
`);

axios({
    method: "get",
    url: "https://type.fit/api/quotes",
})
    .then((response) => {
        let quotesLength = response.data.length;
        let quoteNum = Math.floor(Math.random() * quotesLength);
        let author='unknown'

        quote = response.data[quoteNum];

        if(quote.author != 'null'){
            author=quote.author;
        }

        $("body").append(`
    <div id='quote-div'>
        <p class='quote text'>${quote.text}</p> 
        <p class= 'quote text'> - ${author}</p>
    </div>
    `);
    })
    .catch(() => {
        console.log("error");
    });
