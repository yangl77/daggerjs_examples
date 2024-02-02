import * as monaco from "https://esm.sh/monaco-editor";

export const monacoEditor = monaco.editor;

const editorValue = {
    checked: [   
`<div +loading="{status: false}">
  <div>
    <input type="checkbox">
    without $checked
  </div>
  <div>
    <input type="checkbox" $checked="status">
    $checked effects
  </div>`,
"  <div>status: ${status}</div>",
    `</div>`
    ],
    value: [
`<div +loading="{a: '', b: ''}">
  <div>
    <input $value="a">` ,
"      <div>Press Enter to see the value of a: ${a}</div>",
`  </div>
  <div>
    <input $value#input="b">`,
"    <div>Living value b: ${b}</div>",
`  </div>
  <div>
    <input $value#input="b">`,
"    <div>Press enter to change the value of a: ${a}</div>",
`  </div>   
</div>`
    ],
    watch: [
`<div +loading="{a:0, b:0, c:0}", $watch="c = a + b">
  <input type="number" $value#input="a"> 
  + 
  <input type="number" $value#input="b">`,
"  = ${c}",
`</div>`
    ],
    each: [
`<div +loading="{list: ['a', 'b', 'c']}">`,
"  <li $each='list'> index: ${index} - item: ${item}</li>",
`</div>`
    ],
    result: [
`<div +loading="{ result: null, results: [] }">
  <button +click="result = null, results = [], fileSelector.value = null">reset</button>
  <br>
  <label>single file select <input id="fileSelector" type="file" $result="result"></label>
  <br>
  <div $exist="result">`,
"    <div>Result state: '${ result.state }'.</div>",
"    <div>Result loaded: ${ result.loaded }</div>",
"    <div>Result progress: ${ result.progress }%</div>",
"    <div>Result content: ${ result.content }</div>",
`  </div>
  <label>multiple files select<input id="filesSelector" type="file" multiple $result="results"></label>
  <div $each#item:result="results">`,
"    <div>${ index }. Result state: ${ result.state }.</div>",
"    <div>${ index }. Result loaded: ${ result.loaded }</div>",
"    <div>${ index }. Result progress: ${ result.progress }%</div>",
"    <div>${ index }. Result content: ${ result.content }</div>",
`  </div>
</div>`
    ]
}

export const initMonaco = (monaco, $node, $scope, example) => {
  if (monaco) {
    var editor = monaco.create($node, {
      value: editorValue[example].join("\n"),
      language: "html",
      minimap: {
        enabled: false,
      },
    });
    $scope.editorVal = editor.getValue();
    editor.getModel().onDidChangeContent(()=> {
      $scope.editorVal = editor.getValue();
    });
  }
};

export const getGeneratedPageURL = ( html ) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const source = `
    <html>
      <head>
        <script type="module" crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/@miyi/dagger.js" defer></script><script type="dagger/modules"></script>
      </head>
      <body>
        ${html || ""}
      </body>
    </html>
  `;

  return getBlobURL(source, "text/html");
};