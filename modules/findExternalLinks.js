import handleLink from "./checkLinks.js";

// Compares a string against a regex pattern to find URLs
function findLinks(text) {
  const regex = /<a([^>]+)href="(https?:\/\/.+?)"[^>]*>(.+?)<\/a>/g;
  return text.match(regex);
}

// Refactor to separate functions
// Also I don't need to send content item name and id, it's unnecessarily increasing payloa
async function findExternalLinks(contentItems) {
  contentItems.forEach((item) => {
    // const externalLinks = [];
    let contentElements = Object.entries(item.elements);
    contentElements.forEach((element) => {
      if (element[1].type === "rich_text") {
        const foundLinks = findLinks(element[1].value);
        if (foundLinks !== null) {
          foundLinks.forEach((link) => {
            const url = link.split('"')[1];
            handleLink({
              name: item.system.name,
              id: item.system.id,
              url: url,
            });
          });
        }
      }
    });
  });
}


export default findExternalLinks;
