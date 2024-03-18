import { createElement } from "./utilities.js";
import { injectStyles } from "./Styles.js";

class Widget {
	constructor(
		containerSelector,
		widgetWidth = "100%",
		widgetHeight = "auto",
		count = 4
	) {
		this.setupContainer(containerSelector);
		if (!this.container) return;

		this.setupWidgetProperties(widgetWidth, widgetHeight, count);
		this.setupWidgetElements();
		this.setupApiProperties();
		this.loadWidgetContent();
	}

	setupContainer(containerSelector) {
		this.container = document.querySelector(containerSelector);
		if (!this.container) {
			console.error("Widget container not found");
		}
	}

	setupWidgetProperties(widgetWidth, widgetHeight, count) {
		this.width = widgetWidth;
		this.count = count;
		Object.assign(this.container.style, {
			width: widgetWidth,
			maxHeight: widgetHeight,
			overflow: "auto",
		});
	}

	setupWidgetElements() {
		this.createHeader();
		this.createGridContainer();
		this.createSpecialElements();
	}

	createHeader() {
		this.header = createElement("div", {
			className: "widget-header",
			textContent: "More for you",
			styles: {
				borderBottom: "2px solid #4e4e4e",
				fontWeight: "700",
				padding: "0 0 10px 0",
				margin: "0 0 10px 0",
			},
		});
		this.container.appendChild(this.header);
	}

	createGridContainer() {
		this.gridContainer = document.createElement("div");
		this.gridContainer.id = "ads-grid-container";
		this.container.appendChild(this.gridContainer);
	}

	createSpecialElements() {
		this.loadingElement = this.createLoadingElement();
		this.errorElement = this.createErrorElement();
		this.emptyListElement = this.createEmptyListElement();
		this.gridContainer.appendChild(this.loadingElement);
	}

	setupApiProperties() {
		this.apiURL =
			"http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";
		this.apiKey = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
		this.publisherId = "taboola-templates";
		this.appType = "desktop";
		this.sourceId = "214321562187";
		this.fallbackURL =
			"https://miro.medium.com/v2/resize:fit:735/1*56i1w9SNBldDKBXFGldwIA.png";
	}

	loadWidgetContent() {
		injectStyles();
		this.fetchRecommendations();
	}

	createLoadingElement() {
		const skeletonsContainer = createElement("div", {
			className: "skeletons-container",
			styles: { width: this.width },
		});
		for (let i = 0; i < this.count; i++) {
			const loadingSkeleton = createElement("div", {
				className: "loading-skeleton",
			});
			loadingSkeleton.innerHTML = `
            <div class="skeleton-thumbnail"></div>
            <div class="skeleton-caption"></div>
            <div class="skeleton-description"></div>
        `;
			skeletonsContainer.appendChild(loadingSkeleton);
		}
		return skeletonsContainer;
	}

	createEmptyListElement() {
		return createElement("div", {
			className: "empty",
			textContent: "No recommendations available at this time.",
		});
	}

	createErrorElement() {
		return createElement("div", {
			className: "error",
			textContent: "Failed to load recommendations. Please try again later.",
		});
	}

	fetchRecommendations() {
		const url = `${this.apiURL}?app.type=${this.appType}&app.apikey=${this.apiKey}&publisher=${this.publisherId}&source.id=${this.sourceId}&count=${this.count}&source.type=video`;

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				this.loadingElement.remove(); // Ensure loading message is removed
				if (data && data.list && data.list.length === 0) {
					// Check if data.list exists before accessing its length
					this.handleEmptyList(); // Handle empty list
				} else {
					this.displayRecommendations(data.list);
				}
			})
			.catch((error) => {
				console.error(
					"There has been a problem with your fetch operation:",
					error
				);
				this.handleError(); // Handle the error appropriately
			});
	}

	handleError() {
		this.loadingElement.remove(); // Ensure loading message is removed on error
		this.gridContainer.appendChild(this.errorElement); // Append error message to the grid container
	}

	handleEmptyList() {
		this.gridContainer.appendChild(this.emptyListElement); // Append the empty list message to the grid container
	}

	displayRecommendations(recommendations) {
		recommendations.forEach((recommendation) => {
			const item = document.createElement("div");
			item.className = "recommendation-item";
			item.innerHTML = `
                <div class="recommendation-thumbnail">
                    <img src="${recommendation.thumbnail[0].url}" alt="${
				recommendation.name
			}" onerror="this.onerror=null; this.src='${this.fallbackURL}';">
                </div>
                <div class="recommendation-caption">${
									recommendation.name ?? "This ad has no title"
								}</div>
                <div class="recommendation-description">${
									recommendation.description ?? "This ad has no description"
								}</div>
            `;
			item.addEventListener("click", () => {
				window.open(recommendation.url, "_blank");
			});
			this.gridContainer.appendChild(item); // Append to the grid container
		});
	}
}

document.addEventListener("DOMContentLoaded", function () {
	new Widget("#recommendation-widget", "600px", "600px");
});
