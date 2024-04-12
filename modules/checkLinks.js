// send link + content item info to server, await response, render response
// Must define linkObject with 'this.url' property!!
async function handleLink(linkObject) {
  try {
    const url = linkObject.url;
    console.log(url);
    const urlStatus = await checkURL(url);
    console.log(urlStatus);
    const result = await assembleResult(linkObject, urlStatus);
    // BREAK HERE - different function

    // linkObject.response = urlStatus.response;
    // linkObject.responseTime = urlStatus.responseTime;
    // linkObject.redirect = urlStatus.redirect;
    // linkObject.error = urlStatus.error;
    console.log(result);
    renderResult(result);
  } catch (error) {
    console.error(error);
  }
}

async function assembleResult(linkObject, urlStatus) {
  console.log(`received urlStatus ${urlStatus}`);
  const result = {
    name: linkObject.name,
    id: linkObject.id,
    url: linkObject.url,
    response: urlStatus[0],
    responseTime: urlStatus[1],
    redirect: urlStatus[2],
    error: urlStatus[3],
  };
  console.log(`Assembled result: ${result}`);
  return result;
}

function renderResult(linkObject) {
  const table = document.getElementById("results");
  const tr = table.insertRow();
  const td = tr.insertCell();
  td.innerText = JSON.stringify(linkObject);
  // table.appendChild(linkObject)
}

async function checkURL(url) {
  try {
    console.log(`checkURL url: ${url}`);
    const res = await fetch("http://localhost:3000/ping", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),

      // method: "POST",
      // mode: "cors",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(chunk),
    });

    if (!res.ok) {
      console.error(
        `Unexpected error occured communicating with server. Status code: ${res.status}`
      );
    }
    console.log(res);
    const response = res.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default handleLink;
