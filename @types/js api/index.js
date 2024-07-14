async function getData(){
    const response = await fetch('http://api.weatherapi.com/v1/search.json?key=b73aee4d88ec4d97b7c12221212804&q=lond');
    const data = await response.json();
    console.log(data);
}
getData();