import { getParams, setURL, getLanguageID } from "./modules/apiConfig.js";
import { checkTypes } from "./modules/findRichTextTypes.js";
import fetchRichTextContent from "./modules/fetchRichTextContent.js";
import findExternalLinks from "./modules/findExternalLinks.js";
import { table } from "./modules/resultsTable.js";
import {
  displayNotification,
  clearNotification,
  toggleProgress,
} from "./modules/helpers.js";

// This is the "control" function, that runs on form submission.
async function checkURLs() {
  // Clear artifacts of previous scans: notifications, table data, download button
  clearNotification();
  // Clicking on a row will navigate to that content item in Kontent.ai app. This function
  // is built-in to the table, and needs to be "reset" between scans to update the Env ID, etc.
  table.off("rowClick");
  table.clearData();
  download.style.display = "none";

  try {
    toggleProgress("on");

    // Collect user-supplied parameters
    const [envID, lang, previewKey] = getParams();
    const [baseURL, langModifier] = setURL(envID, previewKey, lang);

    // Language ID is used solely to create links to Language Variants in the results table
    const languageID = lang
      ? await getLanguageID(baseURL, previewKey, lang)
      : "00000000-0000-0000-0000-000000000000";

    // Clicking on a row will navigate to that content item in Kontent.ai app. This needs
    // to be turned back on early in the process, so that users can make use of it during
    // lengthy scans
    table.on("rowClick", function (e, row) {
      let env = envID;
      window.open(
        `https://app.kontent.ai/${env}/content-inventory/${languageID}/content/${
          row.getData().itemId
        }`,
        "_blank"
      );
    });
    // Check for presence of Content Types with Rich Text elements
    const types = await checkTypes(baseURL, previewKey);
    if (!types) {
      displayNotification(
        "Process Aborted: No Content Types with Rich Text Elements found.",
        "is-warning"
      );
      return;
    }

    // Create array of Content Items with Rich Text Elements
    const contentItems = await fetchRichTextContent(
      types,
      baseURL,
      langModifier,
      previewKey
    );

    // A possible fail case is an environment that has Content Types that contain Rich
    // Text Elements, but no content of those Types. Test for this by checking that
    // 'contentItems' has returned an array, and the array contains at least one element
    // (i.e., at least one returned content item).
    if (!Array.isArray(contentItems) || !contentItems.length) {
      displayNotification(
        "No Rich Text Content returned. Please check Language Codename is correct; otherwise there may be no relevant content in this project, or you may need to supply a Preview API Key.",
        "is-warning"
      );
      return;
    }

    // Check for, and test, any URLs in the Rich Text Elements of retrieved content items
    for (const contentItem of contentItems) {
      const links = await findExternalLinks(contentItem);
      table.addData(links.flat(Infinity));
    }
    // If no URLs are found, user should be notified.
    if (!table.getDataCount()) {
      displayNotification("No URLs detected", "is-warning");
    }

    // Show download button on successful completion
    download.style.display = "inline";
  } catch (error) {
    displayNotification(`${error.message}`, "is-danger");
    console.error(`${error} Scan aborted.`);
  } finally {
    // The progress bar should be toggled off regardless of success or error
    toggleProgress("off");
  }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  console.log(event);
  checkURLs();
});
