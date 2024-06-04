// Send link + content item info to server, await response, render response
async function handleLink(linkObject) {
  try {
    const url = linkObject.url;
    const urlStatus = await checkURL(url);
    const result = await assembleResult(linkObject, urlStatus);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

function assembleResult(linkObject, urlStatus) {
  const result = {
    name: linkObject.name,
    itemId: linkObject.id,
    url: linkObject.url,
    response: urlStatus[0],
    responseTime: urlStatus[1],
    redirect: urlStatus[2],
    error: urlStatus[3],
  };
  return result;
}

async function checkURL(url) {
  try {
    const res = await fetch("https://kontentapp.azurewebsites.net/extra/ping.php", {
      method: "POST",
      mode: "cors",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    if (!res.ok) {
      throw new Error(
        `Unexpected error occured communicating with server. Status code: ${res.status}`
      );
    }
    const response = res.json();
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export default handleLink;
