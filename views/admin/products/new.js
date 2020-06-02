const layout = require('../layout');
const helpers = require('../../helper');
const {getErrors} = require('../../helper');

module.exports = ({errors})=>{

return layout({
content: `
<form method = "POST" enctype="multipart/form-data" >
<input placeholder = "Title" name = "title"/>
${getErrors(errors,'title')}
<input placeholder = "Price" name = "price">
${getErrors(errors,'price')}
<input type = "file" name = "image"/>
<button>Submit</button>
</form>
`

});


};