import { callAPI } from "./apiConfig.js";

async function getTypes(baseURL) {
  const retrievedTypes = [];
  let isNextPage = true;

  try {
    // to handle the potential of more Content Types than will fit in a
    // single API response, the function makes use of Kontent.ai API's
    // built-in "pagination" response property
    while (isNextPage) {
      let response = await callAPI(`${baseURL}/types?limit=2000&skip=0`, "GET");
      retrievedTypes.push(response.types);
      if (response.pagination.next_page == "") {
        isNextPage = false;
      } else {
        endpoint = response.pagination.next_page;
      }
    }
    return retrievedTypes.flat();
  } catch (error) {
    // log error to console for debugging purposes
    console.error(error);
    // throw error to be handled by initiating function
    throw new Error(
      `Error occured retrieving your content types: "${error.message}"`
    );
  }
}

async function findRichTextTypes(types) {
  try {
    const richTextTypes = types
      // Filter provided types by (contd)
      .filter((type) => {
        // their elements that meet the criteria (contd)
        return Object.values(type.elements).some((element) => {
          // of having rich text type. The extra 'return' here stops the search after the
          // rich text element is found - we only need to know if it has ANY, not how many
          return element.type === "rich_text";
        });
      })
      // Map a new array from the codenames of the types that met filtering criteria above
      .map((type) => {
        return type.system.codename;
      });
    // Return this new array, converted to a string (to be easily included in API call)
    return richTextTypes.toString();
  } catch (error) {
    // log error to console for debugging purposes
    console.error(error);
    // throw error to be handled by initiating function
    throw new Error(
      `Error occurred searching your content types: ${error.message}`
    );
  }
}

export async function checkTypes(baseURL) {
  try {
    const typesInProject = await getTypes(baseURL);
    const contentTypesWithRichText = await findRichTextTypes(typesInProject);
    return contentTypesWithRichText;
  } catch (error) {
    // log error to console for debugging purposes
    console.error(error);
    // throw error to be handled by initiating function
    throw new Error(error.message);
  }
}
