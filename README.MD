# Recommendation Widget

The Recommendation Widget is a JavaScript widget that displays recommended content fetched from an external API. It is designed to be embedded on webpages to provide personalized recommendations to users.

## Features

- Displays personalized recommendations based on user preferences.
- Fetches content from an external API endpoint.
- Supports customization of widget size and appearance.

## Installation

To use the Recommendation Widget on your website, follow these steps:

1. Include the `script.js` file in your HTML:

   ```html
   <script src="path/to/script.js"></script>
   ```

2. Add an empty `<div>` element where you want the widget to appear:

   ```html
   <div id="recommendation-widget"></div>
   ```

3. Initialize the widget by creating a new instance of the `Widget` class:

   ```javascript
   new Widget("#recommendation-widget", "600px", "600px", 2);
   ```

## Configuration

The `Widget` class constructor accepts the following parameters:

- `selector`: The CSS selector of the HTML element where the widget will be rendered.
- `width`: The width of the widget (e.g., "600px").
- `height`: The height of the widget (e.g., "600px").
- `count`: The number of recommendations to display.

## Usage

Once installed and configured, the Recommendation Widget will automatically fetch and display recommended content based on the specified parameters.

## Customization

You can customize the appearance and behavior of the widget by modifying the `Widget` class in the `script.js` file.

## Dependencies

The Recommendation Widget relies on the following dependencies:

- `fetch`: Used for making HTTP requests to fetch content from the external API.
