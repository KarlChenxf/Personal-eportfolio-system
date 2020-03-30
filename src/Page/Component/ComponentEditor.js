import React from 'react';
import RawHTMLEditor from './RawHTMLEditor.js'
import PersonalInfoEditor from './PersonalInfoEditor.js'
import TextAreaEditor from './TextAreaEditor.js'
import VideoEditor from './VideoEditor.js'
import PicEditor from './PicEditor.js'
import * as Type from './Type.js'

class ComponentEditor extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        if(!this.props.component) return null;
        console.log(this.props);
        // Return different editor based on HTML
        // Return RawHTMLEditor if given HTML fails to match all available patterns
        if(this.props.component.type === Type.PERSONAL_INFO){ 
            return <PersonalInfoEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.component.type === Type.HTML){ 
            return <RawHTMLEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.component.type === Type.TEXTAREA){
            return <TextAreaEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.component.type === Type.PICDISPLAY){
            return <PicEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.component.type === Type.VIDEODISPLAY){
            return <VideoEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }
        return null;
    }
}

export default (ComponentEditor);