export default function intersects(mouse, div) {
    return (mouse.top >= div.top && mouse.top <= div.top + div.height) && (mouse.left >= div.left && mouse.left <= div.left + div.width);
}