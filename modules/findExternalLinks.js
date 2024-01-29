// Compares a string against a regex pattern to find URLs
function extractURLs(text) {
  const regex = /<a([^>]+)href="(https?:\/\/.+?)"[^>]*>(.+?)<\/a>/g;
  return text.match(regex);
}

function findExternalLinks(contentItems) {
  contentItems.forEach((item) => {
    const externalLinks = [];
    let contentElements = Object.entries(item.elements);
    contentElements.forEach((element) => {
      if (element[1].type === "rich_text") {
        const foundLinks = extractURLs(element[1].value);
        if (foundLinks !== null) {
          foundLinks.forEach((link) => {
            doTheThing(link);
          });
        }
      }
    });
  });
}

function doTheThing(URL) {
  console.log(URL);
}

export default(findExternalLinks)