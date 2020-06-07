import React from 'react'
import PersonalInfo from '../Page/Component/PersonalInfo.js'
import VideoDisplay from '../Page/Component/VideoDisplay.js'
import SnsDisplay from '../Page/Component/SnsDisplay.js'
import PicDisplay from '../Page/Component/PicDisplay.js'
import HTMLDisplay from '../Page/Component/HTMLDisplay.js'
import File from '../Page/Component/File.js'
import * as Type from '../Page/Component/Type.js'
import TextArea from '../Page/Component/TextArea.js';

/* 
 * It's a function component
 * parsing a json object to react component
 * using React.memo to avoid unnecessary re-render
 */

const ParsedComponent = React.memo(function parse(json) {

  if (json.type) {
    switch (json.type.toLowerCase()) {
      case Type.PERSONAL_INFO:
        return <PersonalInfo {...json.props} />;
      case Type.HTML:
        return <HTMLDisplay {...json.props} />;
      case Type.TEXTAREA:
        return <TextArea {...json.props} />;
      case Type.FILE:
        return <File {...json.props} />;
      case Type.PICDISPLAY:
        return <PicDisplay {...json.props} />;
      case Type.VIDEODISPLAY:
        return <VideoDisplay {...json.props} />;
	    case Type.SNSDISPLAY:
	      return <SnsDisplay {...json.props} />
      default:
        return null;
    }
  }
  return null;
});

export {ParsedComponent};
