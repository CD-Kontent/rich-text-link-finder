import handleLink from "./checkLinks.js";

// Compares a string against a regex pattern to find URLs
function findLinks(text) {
  const regex = /<a([^>]+)href="(https?:\/\/.+?)"[^>]*>(.+?)<\/a>/g;
  return text.match(regex);
}

// Each content item is checked element by element; each element will be checked for URLs, and
// those URLs tested and results processed, before moving on to the next element.
// This allows a balance between minimising delays between results, and me not pulling my hair
// out trying to over-optimise.
async function findExternalLinks(contentItem) {
  const data = [];
  try {
    const contentElements = Object.entries(contentItem.elements);

    for (const element of contentElements) {
      // Only check for links in Rich Text Elements
      if (element[1].type === "rich_text") {
        const foundLinks = findLinks(element[1].value);
        // If a links are found, creates an object for each including content item details
        if (foundLinks !== null) {
          for (const link of foundLinks) {
            const url = link.split('"')[1];
            // Each object will be passed individually for processing, and results added to
            // the returned array 'data'
            const result = await handleLink({
              name: contentItem.system.name,
              id: contentItem.system.id,
              url: url,
            });
            data.push(result);
          }
        }
      }
    }
    // Finally, return the results of scanning this Content Item
    return data.flat();
  } catch (error) {
    throw new Error(error.message);
  }
}

export default findExternalLinks;
