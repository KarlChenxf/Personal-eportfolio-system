import React from 'react';
import RawHTMLEditor from './RawHTMLEditor.js'
import PersonalInfoEditor from './PersonalInfoEditor.js'
import TextAreaEditor from './TextAreaEditor.js'
import VideoEditor from './VideoEditor.js'
import PicEditor from './PicEditor.js'
import FileEditor from './FileEditor.js'
import * as Type from './Type.js'

class ComponentEditor extends React.Component {

    constructor(props) {
        super(props);

        console.log("ComponentEditor constructor()")
    }

    render() {
        console.log("ComponentEditor render()")
        if(!this.props.component) return null;
        // Return different editor based on HTML
        // Return RawHTMLEditor if given HTML fails to match all available patterns
        if(this.props.component.type == Type.PERSONAL_INFO){ 
            return <PersonalInfoEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
        }else if(this.props.component.type == Type.HTML){ 
            return <RawHTMLEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.component.type == Type.TEXTAREA){
            return <TextAreaEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.component.type == Type.FILE){
            return <FileEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.html.startsWith('<VideoDisplay')){
            //console.log("videoeditor");
            return <VideoEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.html.startsWith('<PicDisplay')){
            //console.log("piceditor");
            return <PicEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
        }
        return null;
    }
}

export default (ComponentEditor);