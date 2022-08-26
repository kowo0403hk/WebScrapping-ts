import * as puppeteer from "puppeteer";
import { IdentalXChange } from "../types";

const initialDentalXChangeUrl =
  "https://register.dentalxchange.com/reg/payerList?0";

let dentalXChangeContent: any = [];

const getDentalXChange = async (url: string) => {
  try {
    // setting up browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });

    // variable to determine if we are at the last page
    let isLastPage = false;

    // O(n) because we only repeat the loop for number of rows in the page
    const scrapeDentalXchange = async () => {
      const headersArray: any = await page.$$eval(
        "tr.headers span",
        (headers) => {
          return headers.map((header) => {
            return header.textContent;
          });
        }
      );

      const scrappedData = await page.$$eval(
        "table.table tbody tr",
        (tr, headersArray) => {
          const hash: any = {};

          tr.forEach((row) => {
            let tempObject: any = {};
            tempObject[headersArray[0]] = row
              .querySelector("td.payerid_data span")
              ?.innerHTML.trim();
            tempObject[headersArray[1]] = row
              .querySelector("td.payername_data span")
              ?.innerHTML.trim();
            tempObject[headersArray[2]] =
              row.querySelectorAll("td.txtype_data span")[0].className ===
              "fa fa-check"
                ? true
                : false;
            tempObject[headersArray[3]] =
              row.querySelectorAll("td.txtype_data span")[1].className ===
              "fa fa-check"
                ? true
                : false;
            tempObject[headersArray[4]] =
              row.querySelectorAll("td.txtype_data span")[2].className ===
              "fa fa-check"
                ? true
                : false;
            tempObject[headersArray[5]] =
              row.querySelectorAll("td.txtype_data span")[3].className ===
              "fa fa-check"
                ? true
                : false;
            tempObject[headersArray[6]] =
              row.querySelectorAll("td.txtype_data span")[4].className ===
              "fa fa-check"
                ? true
                : false;
            tempObject[headersArray[7]] =
              row.querySelectorAll("td.txtype_data span")[5].className ===
              "fa fa-check"
                ? true
                : false;
            tempObject[headersArray[8]] =
              row.querySelectorAll("td.txtype_data span")[6].className ===
              "fa fa-check"
                ? true
                : false;
            if (!hash[tempObject[headersArray[1]]]) {
              hash[tempObject[headersArray[1]]] = tempObject;
            }
          });
          return hash;
        },
        headersArray
      );
      return scrappedData;
    };

    // while loop
    while (!isLastPage) {
      // call scrapping function
      const scrappedData = await scrapeDentalXchange();

      dentalXChangeContent = [
        ...dentalXChangeContent,
        ...Object.values(scrappedData),
      ];

      isLastPage =
        (await page.$(
          "span.pagination.pagination-centered ul li:nth-last-child(2) a"
        )) === null;

      // if it is not the last page, we click next button for pagination
      if (!isLastPage) {
        await page.click(
          "span.pagination.pagination-centered ul li:nth-last-child(2) a"
        );
        await page.waitForResponse((res) => res.status() === 200);
        await page.reload();
      }
    }

    // else:
    await browser.close();
    //    return dentalXChange array

    return dentalXChangeContent;
  } catch (err) {
    console.error(err);
  }
};

const dentalXChangeCleanup = () => {
  dentalXChangeContent = [];
};

export { getDentalXChange, dentalXChangeCleanup, initialDentalXChangeUrl };
