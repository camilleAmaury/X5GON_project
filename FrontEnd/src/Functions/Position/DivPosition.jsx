import jQuery from 'jquery';

export default function getDivPosition(event) {
    let box = event.getBoundingClientRect();
    let docElem = document.documentElement;
    let body = document.body;
    let win = window;
    let clientTop = docElem.clientTop || body.clientTop || 0;
    let clientLeft = docElem.clientLeft || body.clientLeft || 0;
    let scrollTop = win.pageYOffset || (jQuery.support.boxModel && docElem.scrollTop) || body.scrollTop;
    let scrollLeft = win.pageXOffset || (jQuery.support.boxModel && docElem.scrollLeft) || body.scrollLeft;
    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;
    return { top, left };
}