import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// TinyMCE (*required, please ignore the variable not used warning)
import tinymce from 'tinymce/tinymce';
// TinyMCE/theme (*required)
import 'tinymce/themes/silver';
// TinyMCE/plugins (*required)
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/wordcount';
//import 'tinymce/plugins/hr';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';


const styles = (() => ({

}));

class TinyMCEWapper extends React.Component {

    constructor(props) {
        super(props);


        this.linkList = props.profileList ?
            props.profileList.map(v => { return { title: v.title + ' (ID:' + v.id + ')', value: String(v.id) } }) : [];

        tinymce.PluginManager.add('hrcustom', function (editor) {
            // create button
            editor.ui.registry.addButton('hrcustom', {
                icon: 'horizontal-rule',
                tooltip: 'Horizontal line',
                onAction: function () {
                    // open window
                    editor.windowManager.open({
                        title: 'Insert horizontal line',
                        body: {
                            type: 'panel',
                            items: [
                                {
                                    type: 'selectbox',
                                    name: 'align',
                                    label: 'Alignment',
                                    items: [
                                        { value: 'left', text: 'Left' },
                                        { value: 'center', text: 'Center' },
                                        { value: 'right', text: 'Right' }
                                    ]
                                },
                                {
                                    type: 'colorinput',
                                    name: 'color',
                                    label: 'Color',
                                    placeholder: '#CED4D9'
                                },
                                {
                                    type: 'input',
                                    name: 'width',
                                    label: 'Width',
                                    maxLength: 5,
                                    placeholder: '100%'
                                },
                                {
                                    type: 'input',
                                    name: 'height',
                                    label: 'Thickness',
                                    maxLength: 5,
                                    placeholder: '1px'
                                }
                            ]
                        },
                        buttons: [
                            {
                                type: 'cancel',
                                text: 'Close'
                            },
                            {
                                type: 'submit',
                                text: 'Save',
                                primary: true
                            }
                        ],
                        // generate and insert HTML upon submitting dialog 
                        onSubmit: function (api) {
                            var data = api.getData();
                            var hr = document.createElement('hr');

                            // set alignment
                            switch (data.align) {
                                case 'center':
                                    hr.style.marginLeft = 'auto';
                                    hr.style.marginRight = 'auto';
                                    break;
                                case 'right':
                                    hr.style.textAlign = 'right';
                                    hr.style.marginRight = 0;
                                    break;
                                default:
                                    hr.style.textAlign = 'left';
                                    hr.style.marginLeft = 0;
                                    break;
                            }

                            // set color
                            hr.style.backgroundColor = data.color || '#CED4D9';

                            let unitRegex = /^\d+(px|%)?$/;
                            // set width
                            hr.style.width = unitRegex.test(data.width) ? data.width : '100%';
                            // set height (thickness)
                            hr.style.height = unitRegex.test(data.height) ? data.height : '1px';

                            // set other styles
                            hr.style.border = 0;
                            hr.style.marginBlockStart = '0em';
                            hr.style.marginBlockEnd = '0em';
                            hr.style.overflow = 'hidden';

                            // insert content when the window form is submitted
                            editor.insertContent(hr.outerHTML);
                            api.close();
                        }
                    });
                }
            });
        });
    }

    render() {

        const { props, linkList, } = this;
        const { defaultValue, height, onEditorChange, } = props;

        return (
            <TinyMCE
                initialValue={defaultValue}
                init={{
                    height: height,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image preview',
                        'searchreplace code fullscreen',
                        'table paste code wordcount hrcustom'
                    ],
                    toolbar:
                        'undo redo | styleselect | fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | hrcustom table link | removeformat | code',
                    // WORKAROUND: base_url is required to enable TinyMCE to load css stylesheet correctly
                    base_url: process.env.PUBLIC_URL + '/tinymce',
                    link_list: linkList,
                    style_formats: [
                        { title: 'Space before paragraph' },
                        { title: 'Remove before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '0em' } },
                        { title: '1em before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '1em' } },
                        { title: '2em before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '2em' } },
                        { title: '3em before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '3em' } },
                        { title: 'Space after paragraph' },
                        { title: 'Remove after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '0em' } },
                        { title: '1em after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '1em' } },
                        { title: '2em after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '2em' } },
                        { title: '3em after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '3em' } },
                    ]
                }}
                onEditorChange={onEditorChange}
            />
        )
    }
}

export default withStyles(styles)(TinyMCEWapper);
