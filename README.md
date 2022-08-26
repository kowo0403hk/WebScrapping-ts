# WebScrapping-ts
It is a personal webscrapping project built with React, Node, Express, Cheerio, Puppeteer and TypeScript.

The purpose of this application is to practice webscrapping by getting all the the insurance payer list items on [Dentrix](https://www.dentrix.com/products/eservices/eclaims/payor-search?keyword=) and [dentalXChange](https://register.dentalxchange.com/reg/payerList?0), then make a table for comparison.


## How to start

Step 1: On your cli, go to the client folder and type `npm install`, then type `npm start` to start the client.

Step 2: Repeat the same steps in the server folder but on a different cli terminal.

Step 3: Go to http://localhost:3000 to start scrapping.

## Usage

User can simply click "Get Data" button to retrieve all the data.

If the user leave the input field blank, the client will render all the data no matter which option is chosen.

Once data is fetched by clicking the "Get Data" button on the home page. There will not be any needs to fetch the data again.

To toggle between search options, just type in search input and choose the option, then click the "Get Data" button.

To refetch data, click the "Refetch" button. To clear data on the client side, click the "Delete" button.

## Screenshots

### Target Sites
Dentrix:
![Dentrix](https://github.com/kowo0403hk/WebScrapping-ts/blob/master/screenshots/dentrix-list.png?raw=true)

DentalXChange:
![DentalXChange](https://github.com/kowo0403hk/WebScrapping-ts/blob/master/screenshots/dentalXChange-list.png?raw=true)

### Application 

![Home Page](https://github.com/kowo0403hk/WebScrapping-ts/blob/master/screenshots/Home.png?raw=true)
![Search All](https://github.com/kowo0403hk/WebScrapping-ts/blob/master/screenshots/Search%20All.png?raw=true)
![Search by ID](https://github.com/kowo0403hk/WebScrapping-ts/blob/master/screenshots/Search%20by%20ID.png?raw=true)
![Search by Name](https://github.com/kowo0403hk/WebScrapping-ts/blob/master/screenshots/Search%20by%20Name.png?raw=true)

## Enjoy!
