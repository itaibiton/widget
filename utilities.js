export function createElement(
	tagName,
	{ className = "", textContent = "", styles = {} } = {}
) {
	const element = document.createElement(tagName);
	if (className) element.className = className;
	if (textContent) element.textContent = textContent;
	Object.assign(element.style, styles);
	return element;
}
