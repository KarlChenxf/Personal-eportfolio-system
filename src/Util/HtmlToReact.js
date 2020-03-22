import React from 'react'
import HTMLReactParser from 'html-react-parser';
import PersonalInfo from '../Page/Component/PersonalInfo.js'
import VideoDisplay from '../Page/Component/VideoDisplay.js'
import PicDisplay from '../Page/Component/PicDisplay.js'

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
          case 'videourl':
            console.log("vedio");
            return <VideoDisplay {...attribs} />;
          case 'picurl':
            console.log("pic");
            return <PicDisplay {...attribs} />;
          default:
            break;
        }
      }
    },
  });
}
