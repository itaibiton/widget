const STYLE = `
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
/* Shared container styles for ads and skeletons */
#ads-grid-container, .skeletons-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
@media (min-width: 600px) {
    #ads-grid-container, .skeletons-container {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        justify-content: center;
    }
}
/* Styles for ads */
.recommendation-item {
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    overflow: hidden;
    transition: transform 0.2s;
    font-size: 12px;
    cursor: pointer;
}
.recommendation-item:hover {
    transform: translateY(-5px);
}
.recommendation-thumbnail img {
    width: 100%;
    aspect-ratio: 16/9;
}
.recommendation-caption {
    padding: 8px;
    font-weight: 600;
}
.recommendation-description {
    padding: 8px;
}
/* Styles for skeletons */
.loading-skeleton {
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    overflow: hidden;
    font-size: 12px;
    cursor: default;
    gap: 8px;
}
.skeleton-thumbnail {
    width: 100%;
    height: 100px;
    background-color: #e0e0e0;
    animation: loadingAnimation 1.5s infinite ease-in-out;
}
.skeleton-caption, .skeleton-description {
    height: 20px;
    background-color: #e0e0e0;
    animation: loadingAnimation 1.5s infinite ease-in-out;
}
.skeleton-caption {
    width: 80%;
    margin: 0 auto;
}
.skeleton-description {
    width: 90%;
    margin: 0 auto;
}
@keyframes loadingAnimation {
    0% {
        background-color: #e0e0e0;
    }
    50% {
        background-color: #f0f0f0;
    }
    100% {
        background-color: #e0e0e0;
    }
}
`;

// Styles.js
export function injectStyles(cssString = STYLE) {
	const style = document.createElement("style");
	style.textContent = cssString;
	document.head.appendChild(style);
}
