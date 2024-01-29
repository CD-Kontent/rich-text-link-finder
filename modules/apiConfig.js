function getParams() {
  const envID = document.getElementById("envID").value;
  const lang = document.getElementById("lang").value
    ? document.getElementById("lang").value
    : null;
  const previewKey = document.getElementById("key").value
    ? document.getElementById("key").value
    : null;

  console.log([envID, lang, previewKey]);
  return [envID, lang, previewKey];
}

function setURL(envID, previewKey, lang) {
  const baseURL = previewKey
    ? `https://preview-deliver.kontent.ai/${envID}`
    : `https://deliver.kontent.ai/${envID}`;
  const langModifier = lang ? `&language=${lang}` : null;
  return [baseURL, langModifier];
}

async function callAPI(query, previewKey) {
  try {
    // Sending an 'undefined' Bearer token is fine if the API doesn't require a
    // key.
    const res = await fetch(query, {
      method: "GET",
      headers: { Authorization: `Bearer ${previewKey}` },
    });
    // Since many errors will still count as a "success" for fetch(), they must be
    // handled here - they won't trigger the catch() block
    if (!res.ok) {
      // throw error to be handled by initiating function
      throw new Error(`API request failed: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Log error to console for debugging purposes
    console.error(error);
    // throw error to be handled by initiating function
    throw new Error(error.message);
  }
}

export { getParams, setURL, callAPI };
