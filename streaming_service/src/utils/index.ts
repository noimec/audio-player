export function renderComponent(container: Element, html: string, position: InsertPosition): void {
    container.insertAdjacentHTML(position, html);
}