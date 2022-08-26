import axios from "axios";
import * as cheerio from "cheerio";
import { Identrix } from "../types";

const initialDentrixUrl =
  "https://www.dentrix.com/products/eservices/eclaims/payor-search?keyword=";

const baseUrlDentrixUrl =
  "https://www.dentrix.com/products/eservices/eclaims/payor-search?keyword=&start=";

let dentrixCount = 0;

let dentrixContent: Identrix[] = [];

let dentrixHeaders: string[] = [];

const getDentrix = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // get all the headers
    dentrixHeaders = $("th")
      .map((i, elem) => {
        return $(elem).text();
      })
      .toArray();

    // get all the contents of the headers
    let tr = $("#payorResults").find("tr").slice(1);

    // brute force, O(m * n), but can handle changes of the table structure on the target site
    // tr.map((i, elem) => {
    //   // looping rows
    //   let temp: any = {};

    //   for (let j = 0; j < dentrixHeaders.length; j++) {
    //     // looping td elements in each row

    //     // to determine nth child of tr and td elements
    //     const trChild = i + 2;
    //     const tdChild = j + 1;

    //     const node = $(
    //       `#payorResults > tbody > tr:nth-child(${trChild}) > td:nth-child(${tdChild})`
    //     );

    //     if (node.text()) {
    //       // for payor IDs and payor names
    //       temp[dentrixHeaders[j]] = $(
    //         `#payorResults > tbody > tr:nth-child(${trChild}) > td:nth-child(${tdChild})`
    //       ).text();
    //     } else {
    //       // conditionals to determine if the td is checked
    //       let tdIsChecked: boolean = true;

    //       j !== dentrixHeaders.length - 1
    //         ? (tdIsChecked = $(
    //             `#payorResults > tbody > tr:nth-child(${trChild}) > td:nth-child(${tdChild}) > span`
    //           )
    //             .children("i")
    //             .hasClass("glyphicon-check"))
    //         : (tdIsChecked = $(
    //             `#payorResults > tbody > tr:nth-child(${trChild}) > td:nth-child(${tdChild}) > a > span`
    //           )
    //             .children("i")
    //             .hasClass("glyphicon-check"));

    //       tdIsChecked
    //         ? (temp[dentrixHeaders[j]] = true)
    //         : (temp[dentrixHeaders[j]] = false);
    //     }
    //   }

    //   // push temp
    //   dentrixContent.push(temp);
    // });

    // O(n), but needs more hardwired code
    tr.map((i, elem) => {
      // looping rows
      let temp: any = {};

      temp[dentrixHeaders[0]] = $(elem).find("td:nth-child(1)").text();
      temp[dentrixHeaders[1]] = $(elem).find("td:nth-child(2)").text();
      temp[dentrixHeaders[2]] = $(elem)
        .find("td:nth-child(3) > span")
        .children("i")
        .hasClass("glyphicon-check");
      temp[dentrixHeaders[3]] = $(elem)
        .find("td:nth-child(4) > span")
        .children("i")
        .hasClass("glyphicon-check");
      temp[dentrixHeaders[4]] = $(elem)
        .find("td:nth-child(5) > span")
        .children("i")
        .hasClass("glyphicon-check");
      temp[dentrixHeaders[5]] = $(elem)
        .find("td:nth-child(6) > span")
        .children("i")
        .hasClass("glyphicon-check");
      temp[dentrixHeaders[6]] = $(elem)
        .find("td:nth-child(7) > span")
        .children("i")
        .hasClass("glyphicon-check");
      temp[dentrixHeaders[7]] = $(elem)
        .find("td:nth-child(8) > span")
        .children("i")
        .hasClass("glyphicon-check");
      temp[dentrixHeaders[8]] = $(elem)
        .find("td:nth-child(9) > a > span")
        .children("i")
        .hasClass("glyphicon-check");

      // push temp
      dentrixContent.push(temp);
    });

    // conditionals:
    const last = $(".pagination")
      .children("li")
      .last()
      .children("a")
      .data("ci-pagination-page");

    // if last page exists, then call this function again with updated url
    if (last) {
      dentrixCount += 50;
      let newUrl = baseUrlDentrixUrl + dentrixCount;
      await getDentrix(newUrl);
    }

    // else return the array
    return dentrixContent;
  } catch (err) {
    console.error(err);
  }
};

const dentrixCleanUp = (): void => {
  dentrixCount = 0;
  dentrixContent = [];
  dentrixHeaders = [];
};

export { getDentrix, dentrixCleanUp, initialDentrixUrl };
