# Link Checker for Rich Text
v2.0

## Description

This is a tool to find, and check the status of, URLs included as links or text in Rich Text Elements in a Kontent.ai project.
It scans the supplied environment for Content Types that include Rich Text Elements, retrieves all Content Items of the identified Content Types, then scans these any external URLs. Any URLs found will be tested; the response code, and response time, will be shown in the results (along with a simple TRUE/FALSE indication of whether the request was redirected, or returned an error).

The results are also available to be downloaded in CSV format.

Note that the tool will make several API calls in this process, which will count against your usage.

### Limitations

- Scans only one environment at a time.
- Detects URLs in rich text elements only.
- Only Detects links that have been properly configured through the UI or MAPI (e.g., 'www.example.com' in text will NOT be detected, unless it has been formatted as a link).
- If no language codename is provided, will scan default language only.
- Works with Delivery REST API (and Preview) only.
- Does not work with Secure Access for Delivery API. If Secure Access is enabled, use a Preview API Key.
- Invalid inputs in any of the input fields will result in failure (e.g., there is no feature to default to Delivery API if Preview API Key is invalid - the Preview API will be called, and the request will fail).
- There is no validation on the input fields. Environment IDs and API Keys are complex strings, I don't have access to the algorithms governing them; language codenames can be configured by users, making them unpredictable.
- Results do not persist between operations - beginning a new scan will remove the results of any previous scans.

### Features

#### Open Content Items in Kontent.ai
Clicking on any row in the results table will attempt to open the Kontent.ai app in a new tab, with the Content Item in which that URL was found open. This makes editing "broken" links more convenient. Note that a downloaded CSV file of results will not offer this feature.

#### Sortable Results
The results table is sortable by the value of any column (e.g., results can be sorted by which Content Item contains the URL, the response status of the URL, etc.).

### Issues

Please report any issues through GitHub.

## Usage

Deploy your own instance of the tool.
If you have a Netlify account linked to your GitHub account, this can be done with one click - thanks Netlify!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/CD-Kontent/rich-text-link-finder)

Otherwise, this will need to be done manually.

Supply an Environment ID (required), Preview API Key (optional), and Language Codename (optional).
Alternatively, for larger or more regular usage, please use the codebase as inspiration for your own hosted solution.

To abort a scan in progress, simply refresh the page. Note that you will lose any results returned before refreshing.

### API Errors

If the Kontent.ai API returns an error; a message will be displayed including the response code, and a short message describing the likely issue or solution.
These are based on [the Delivery API Reference materials.](https://kontent.ai/learn/reference/openapi/delivery-api/#tag/Errors)

## Tech Stack

- This tool was built for use with [Kontent.ai](https://kontent.ai/) projects.
- HTML
- JavaScript
- [Bulma](https://bulma.io/)
- [Tabulator](https://tabulator.info/)