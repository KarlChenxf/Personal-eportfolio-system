import React from 'react'
import HTMLReactParser from 'html-react-parser';
import PersonalInfo from '../Page/Component/PersonalInfo.js'

export function parse(html) {
  console.log(html);
  // The replace callback allows you to swap an element with another React element.
  return HTMLReactParser(html, {
    replace: ({ attribs, name }) => {
      attribs = attribs || {};
      if (name) {
        switch (name.toLowerCase()) {
          case 'personalinfo':
            return <PersonalInfo {...attribs} />;
          default:
            break;
        }
      }
    },
  });
}
