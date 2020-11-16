const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "9366d4c8873925b723453554e33ad624",
};

let background = undefined;

window.addEventListener("load", () => {
  // automatically based on lat/ long
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //    console.log(position);
      if (position === undefined) {
        console.error("location is undefined, please turn on your location");
        return;
      }

      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      fetchMe(lat, long, true);
    });
  }

  // for custom search
  let input = document.querySelector("#locationQuery");
  input.addEventListener("keypress", search);

  function search(e) {
    if (e.keyCode === 13) {
      getResults(e.target.value);

      // clearing data
      let input = document.querySelector("#locationQuery");
      input.value = "";
    }
  }

  async function getResults(value) {
    // fetch(`api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api.key}`)
    fetchMe(null, null, undefined, true, value);
    // const res = await fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
    // const data = await res.json();
    // background = data.weather[0].main;
    //     console.log(data);
    //     let obj = {
    //       name: data.name,
    //       temp: data.main.temp,
    //       summary: data.weather[0].description,
    //       country: data.sys.country,
    //     };

    // // for body Content
    // changeContext(obj);

    // // for Weather image
    // image(data.weather[0].icon);

    // // for background
    // changeBackground(background);
  }

  async function changeBackground(background) {
    let body = document.querySelector("body");
    let imageArr = [
      "Cloud",
      "Clouds",
      "Sky",
      "Smoke",
      "Storm",
      "Sun",
      "Sunny",
      "Mist",
    ];
    if (imageArr.includes(background)) {
      let val =
        (await `background: url(/static/images/`) +
        background.toLowerCase() +
        `.jpg) !important;background-size:cover !important;`;
      body.setAttribute("style", val);
    }
  }

  function changeContext(data) {
    let input = document.querySelector("#locationQuery");
    let locationName = document.querySelector(".name");
    let temp = document.querySelector(".number");
    let summary = document.querySelector(".summary");
    let country = document.querySelector(".country");

    //
    locationName.textContent = `${data.name},`;
    temp.textContent = data.temp;
    summary.textContent = data.summary;
    country.textContent = `${data.country}`;
  }

  async function image(img) {
    const res = await fetch(`http://openweathermap.org/img/wn/${img}@2x.png`);
    const blob = await res.blob();
    let image = document.getElementById("weatherImage");
    image.src = URL.createObjectURL(blob);
  }

  async function fetchMe(
    lat = null,
    long = null,
    latTrue = undefined,
    normalFetch = undefined,
    value = undefined
  ) {
    let res;

    if (latTrue) {
      res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api.key}`
      );
    }

    if (normalFetch && value) {
      res = await fetch(
        `${api.base}weather?q=${value}&units=metric&APPID=${api.key}`
      );
    }

    const data = await res.json();
    background = data.weather[0].main;

    let obj = {
      name: data.name,
      temp: data.main.temp,
      summary: data.weather[0].description,
      country: data.sys.country,
    };

    // body content
    changeContext(obj);

    // icon
    image(data.weather[0].icon);

    // for background
    changeBackground(background);
  }
});
