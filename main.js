import { getParams, setURL } from "./modules/apiConfig.js";
import { checkTypes } from "./modules/findRichTextTypes.js";
import fetchRichTextContent from "./modules/fetchRichTextContent.js";
import findExternalLinks from "./modules/findExternalLinks.js";

console.log("helloi");

async function handleSubmit() {
  console.log("Button clicked!");
  try {
    // Collect user-supplied parameters
    const [envID, lang, previewKey] = getParams();
    const [baseURL, langModifier] = setURL(envID, previewKey, lang);
    console.log(baseURL);
    console.log(langModifier);

    // Check for presence of Content Types with Rich Text elements
    const types = await checkTypes(baseURL, previewKey);
    if (!types) {
      throw new Error("Process Aborted: ");
    }
    console.log(types);
    const content = await fetchRichTextContent(
      types,
      baseURL,
      langModifier,
      previewKey
    );
    console.log(content)
    findExternalLinks(content);
  } catch (error) {
    // INCLUDE ERROR HANDLING LOGIC
    console.error(`${error} Scan aborted.`);
  }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  console.log(event);
  handleSubmit();
});
