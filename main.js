import { getParams, setURL, callAPI } from "./modules/apiConfig.js";
import { checkTypes } from "./modules/findRichTextTypes.js";

console.log("helloi");

async function handleSubmit() {
  console.log("Button clicked!");
  try {
    // Collect user-supplied parameters
    const [envID, lang, previewKey] = getParams();
    const [baseURL, langModifier] = setURL(envID, lang, previewKey);
    console.log(baseURL)
    console.log(langModifier)

    // Check for presence of Content Types with Rich Text elements
    const types = await checkTypes(baseURL, previewKey);
    if (!types) {
      throw new Error(
        "Process Aborted: "
      );
    }
    console.log(types);
  } catch (error) {
    // INCLUDE ERROR HANDLING LOGIC
    console.error(`${error} Scan aborted.`);
  }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  console.log(e);
  handleSubmit();
});
