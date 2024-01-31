# Evangelio CEE API Documentation

## Overview
This API allows users to retrieve Bible verses and passages from an XML file. It supports fetching a single verse, a random verse, or a random passage. The API can also include the passage name based on a URL parameter.

## Endpoints

### Single Verse
Retrieves a specific verse from the Bible.

**URL Parameters:**

- `mode=singleverse`: Activates single verse retrieval mode.
- `book`: The name of the book.
- `chapter`: The chapter number.
- `verse`: The verse number.

**Example Usage:**
```
http://evangelioceeapi.github.io/?mode=singleverse&book=mateo&chapter=1&verse=1
```

### Random Verse
Retrieves a random verse from the Bible.

**URL Parameters:**

- `mode=randomverse`: Activates random verse retrieval mode.

**Example Usage:**
```
http://evangelioceeapi.github.io:8000/?mode=randomverse
```

### Random Passage
Retrieves a random passage from the Bible. Optionally includes the passage name.

**URL Parameters:**

- `mode=randompassage`: Activates random passage retrieval mode.
- `showName=1`: Includes the passage name in the response if set to 1.

**Example Usage:**
```
http://evangelioceeapi.github.io/?mode=randompassage&showName=1
```

## Response Format
The response is a JSON object containing the following fields:

- `text`: The text content of the verse or passage.
- `reference`: The book, chapter, and verse(s) reference.
- `title`: (Optional) The title of the passage, included if `showName=1`.

**Response Example:**
```json
{
    "text": "In the beginning, God created the heavens and the earth.",
    "reference": "genesis 1:1",
    "title": "The Creation of the World"
}
```
Ángel R. Rubio F. - Madrid, 2024 - Laus Deo, Virginique Matri
