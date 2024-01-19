import showParams from "./modules/apiConfig.js";

console.log("helloi");

function handleSubmit() {
  console.log("Button clicked!");
}

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  console.log(e)
  handleSubmit()
  showParams();
});

// submit.addEventListener("click", (event) => {
//   event.handleSubmit;
// });
