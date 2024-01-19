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

async function callAPI(endpoint, requestMethod, headers) {
  try {
    const res = await fetch(endpoint, {
      method: `${requestMethod}`,
      headers: headers,
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

export default function showParams() {
  const [envID, lang, previewKey] = getParams();
  console.log(envID);
  console.log(lang);
  console.log(previewKey);
}
