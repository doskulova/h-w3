const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl=document.getElementById("currency-one");
const currencyTwoEl=document.getElementById("currency-two");
const amountOneEl=document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

let currenData = {};

const mapRatesKeys =() => {
    return new Promise ((resolve) => {
    fetch(
        `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/USD`
        )
.then((res) => res.json())
.then((data)=> {
    const { conversion_rates: rates} = data;
    let renderRatesUSD = "";
    let renderRatesEUR = "";

    for(let key in rates) {
        renderRatesUSD +=
        key === "USD"
        ?`<option value="${key}" selected>${key}</option>`
        :`<option value="${key}">${key}</option>`;

        renderRatesEUR +=
        key === "EUR"
        ?`<option value="${key}" selected>${key}</option>`
        :`<option value="${key}">${key}</option>`;  
    }
    currencyOneEl.innerHTML = renderRatesUSD;
    currencyTwoEl.innerHTML = renderRatesEUR;

    resolve();
     });
  });
};

const calculate = (data, currencyTwo) => {
    const rate = data [currencyTwo];
    amountTwoEl.value=(+amountOneEl.value *rate).toFixed(2);
};
const getData = () =>{
    const currencyOne =currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;
    fetch(`https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
    )
    .then((res)=>{
        return res.json();
    })
    .then((data) =>{
        console.log(data);

        currenData= { ...data.conversion_rates};
        calculate(currenData, currencyTwo);
    
    });
};
const runCalculate =() => calculate(currenData, currencyTwoEl.value);
mapRatesKeys().then(() => getData());
amountOneEl.addEventListener("input", runCalculate);
currencyOneEl.addEventListener("change", getData );
currencyTwoEl.addEventListener("change", runCalculate);
swapEl.addEventListener('click', () =>{
    const swapping = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = swapping;
    getData();
});



