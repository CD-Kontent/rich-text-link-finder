import { callAPI } from "./apiConfig.js";

// Constructs API request based on user-supplied parameters. This request needs to be
// modified to accomodate language parameters.
function setQuery(types, baseURL, langModifier) {
  if (langModifier) {
    return `${baseURL}/items?system.type[in]=${types}${langModifier}&depth=0&limit=2000&skip=0`;
  }
  return `${baseURL}/items?system.type[in]=${types}&depth=0&limit=2000&skip=0`;
}

// This will retrieve all content items belonging to Content Types that contain Rich Text Elements.
// Some specific logic is required to make use of the pagination feature of the Delivery API to
// ensure all content items are retrieved.
async function getContent(query, previewKey) {
  const retrievedItems = [];
  let isNextPage = true;

  try {
    while (isNextPage) {
      let response = await callAPI(query, previewKey);
      retrievedItems.push(response.items);
      if (response.pagination.next_page == "") {
        isNextPage = false;
      } else {
        query = response.pagination.next_page;
      }
    }
    return retrievedItems.flat();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// A mini control script of sorts,
async function fetchRichTextContent(types, baseURL, langModifier, previewKey) {
  try {
    const query = setQuery(types, baseURL, langModifier);
    const content = await getContent(query, previewKey);
    return content;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default fetchRichTextContent;
