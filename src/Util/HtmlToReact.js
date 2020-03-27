import React from 'react'
import HTMLReactParser from 'html-react-parser';
import PersonalInfo from '../Page/Component/PersonalInfo.js'
import VideoDisplay from '../Page/Component/VideoDisplay.js'
import PicDisplay from '../Page/Component/PicDisplay.js'
import * as Type from '../Page/Component/Type.js'

export function parse(html) {
  console.log(html);

  if (html.type) {
    switch (html.type.toLowerCase()) {
      case Type.PERSONAL_INFO:
        return <PersonalInfo {...html.props} />;
      case Type.HTML:
        return HTMLReactParser(html.props.html || "");
      default:
        break;
    }
  }

  // Following code should no longer be used
  // The replace callback allows you to swap an element with another React element.
  return HTMLReactParser(html, {
    replace: ({ attribs, name }) => {
      attribs = attribs || {};
      if (name) {
        switch (name.toLowerCase()) {
          case 'personalinfo':
            return <PersonalInfo {...attribs} />;
          case 'videodisplay':
            //console.log("vedio");
            return <VideoDisplay {...attribs} />;
          case 'picdisplay':
            //console.log("pic");
            return <PicDisplay {...attribs} />;
          default:
            break;
        }
      }
    },
  });
}
