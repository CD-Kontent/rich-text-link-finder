function getParams() {
  const envID = document.getElementById("envID").value;
  const lang = document.getElementById("lang").value
    ? document.getElementById("lang").value
    : null;
  const previewKey = document.getElementById("key").value
    ? document.getElementById("key").value
    : null;
  return [envID, lang, previewKey];
}

function setURL(envID, previewKey, lang) {
  const baseURL = previewKey
    ? `https://preview-deliver.kontent.ai/${envID}`
    : `https://deliver.kontent.ai/${envID}`;
  const langModifier = lang
    ? `&language=${lang}&system.language=${lang}`
    : null;
  return [baseURL, langModifier];
}

async function getLanguageID(baseURL, previewKey, lang) {
  try {
    const languageInfo = await callAPI(
      `${baseURL}/languages?system.codename=${lang}`,
      previewKey
    );
    if (languageInfo.languages.length > 0) {
      return languageInfo.languages[0].system.id;
    } else {
      throw new Error("Language Codename appears to be invalid.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function callAPI(query, previewKey) {
  try {
    // Sending an 'undefined' Bearer token is fine if the API doesn't require a key.
    const res = await fetch(query, {
      method: "GET",
      headers: { Authorization: `Bearer ${previewKey}` },
    });
    // Since many errors will still count as a "success" for fetch(), they must be
    // handled here - they won't trigger the catch() block
    if (!res.ok) {
      throw new Error(
        `API request failed: ${res.status} ${apiError(res.status)}`
      );
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

function apiError(responseCode) {
  switch (responseCode) {
    case 401:
      return "Authentication Error - missing or invalid API key.";
    case 403:
      return "Authorisation Error - provided API key has insufficient permissions";
    case 404:
      return "Resource not found - please check supplied Environment ID is accurate";
    case 429:
      return "API Rate Limit exceeded - please try again in a few seconds";
    case 500:
      return "API returned unexpected error, please try again in a few seconds. ";
    default:
      return `Unexpected error.`;
  }
}

export { getParams, setURL, getLanguageID, callAPI };
