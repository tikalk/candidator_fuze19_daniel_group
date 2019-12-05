import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/dracula';

function Editor({ codeTemplate, onChange, language = 'Javascript' }) {
  return (
    <div>
      <AceEditor
        className="editor"
        mode={language.toLowerCase()}
        theme="dracula"
        fontSize={14}
        showPrintMargin={false}
        showGutter
        highlightActiveLine
        onChange={onChange}
        width="100%"
        value={codeTemplate}
        setOptions={{
          wrapEnabled: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 4,
        }}
      />
    </div>
  );
}

Editor.propTypes = {
  codeTemplate: PropTypes.string,
  onChange: PropTypes.func,
  language: PropTypes.string,
};

export default Editor;
