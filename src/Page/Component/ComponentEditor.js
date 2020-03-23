import React from 'react';
import RawHTMLEditor from './RawHTMLEditor.js'
import PersonalInfoEditor from './PersonalInfoEditor.js'
import TextAreaEditor from './TextAreaEditor.js'
import TextArea from './TextArea.js'
import VideoEditor from './VideoEditor.js'
import PicEditor from './PicEditor.js'

class ComponentEditor extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {

        };
    }

    render() {
        // Return different editor based on HTML
        // Return RawHTMLEditor if given HTML fails to match all available patterns
        if(this.props.html.startsWith('<PersonalInfo')){
            //console.log("personalinfoeditor");
            return <PersonalInfoEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.html.startsWith('<TextArea')){
            return <TextAreaEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.html.startsWith('<VideoDisplay')){
            //console.log("videoeditor");
            return <VideoEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
        }else if(this.props.html.startsWith('<PicDisplay')){
            //console.log("piceditor");
            return <PicEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
        }
        return <RawHTMLEditor open={this.props.open} html={this.props.html} saveComponent={this.props.saveComponent}/>;
    }
}

export default (ComponentEditor);