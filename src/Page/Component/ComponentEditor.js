import React from 'react';
import RawHTMLEditor from './RawHTMLEditor.js'
import PersonalInfoEditor from './PersonalInfoEditor.js'
import TextAreaEditor from './TextAreaEditor.js'
import VideoEditor from './VideoEditor.js'
import PicEditor from './PicEditor.js'
import FileEditor from './FileEditor.js'
import SnsEditor from './SnsEditor.js'
import * as Type from './Type.js'

class ComponentEditor extends React.PureComponent {

    constructor(props) {
        super(props);

        console.log("ComponentEditor constructor()")
    }

    render() {
        console.log("ComponentEditor render()")
        if(!this.props.component) return null;
        // Return different editor based on type
        switch(this.props.component.type){
            case Type.PERSONAL_INFO:
                return <PersonalInfoEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
            case Type.HTML:
                return <RawHTMLEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
            case Type.TEXTAREA:
                return <TextAreaEditor open={this.props.open} {...this.props.component.props} onSave={this.props.saveComponent} onClose={this.props.onClose} profileList={this.props.profileList}/>;
            case Type.FILE:
                return <FileEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
            case Type.PICDISPLAY:
                return <PicEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
            case Type.VIDEODISPLAY:
                return <VideoEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
            case Type.SNSDISPLAY:
                return <SnsEditor open={this.props.open} {...this.props.component.props} saveComponent={this.props.saveComponent} onClose={this.props.onClose}/>;
            default:
                return null;
        }
    }
}

export default (ComponentEditor);