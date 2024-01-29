import { callAPI } from "./apiConfig.js";

function setQuery(types, baseURL, langModifier) {
  console.log(langModifier);
  if (langModifier) {
    return `${baseURL}/items?system.type[in]=${types}${langModifier}&depth=0&limit=2000&skip=0`;
  }
  return `${baseURL}/items?system.type[in]=${types}&depth=0&limit=2000&skip=0`;
}

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
    // log error to console for debugging purposes
    console.error(error);
    // throw error to be handled by initiating function
    throw new Error(
      `Error occured retrieving your content items: ${error.message}`
    );
  }
}

async function fetchRichTextContent(types, baseURL, langModifier, previewKey) {
  try {
    const query = setQuery(types, baseURL, langModifier);
    console.log(query);
    const content = await getContent(query, previewKey);
    // A possible fail case is an environment that has Content Types that contain Rich
    // Text Elements, but no content of those Types. Test for this by checking that
    // the Array 'content' contains at least one element (i.e., at least one returned
    // content item).
    if (!content) {
      throw new Error("No Rich Text Content returned");
    }
    return content;
  } catch (error) {
    // log error to console for debugging purposes
    console.error(error);
    // throw error to be handled by initiating function
    throw new Error(error.message);
  }
}

export default fetchRichTextContent;
