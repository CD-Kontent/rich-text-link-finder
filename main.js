import { getParams, showParams, callAPI } from "./modules/apiConfig.js";
import { checkTypes } from "./modules/findRichTextTypes.js";

console.log("helloi");

async function handleSubmit() {
  console.log("Button clicked!");
  const [envID, lang, previewKey] = getParams();
  const types = await checkTypes(`https://deliver.kontent.ai/${envID}`);
  console.log(types);
}

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  console.log(e);
  handleSubmit();
  showParams();
});
