import React from 'react'
import ReactDOM from 'react-dom'
import HTMLReactParser from 'html-react-parser';

export function parse(html) {
    // The replace callback allows you to swap an element with another React element.
    return HTMLReactParser(html, {
      replace: function(domNode) {
        console.dir(domNode, { depth: null });
      }
    });
}
