import Ember from 'ember';

const {Handlebars, isBlank} = Ember;
const highlightStartTag = `<span class="highlight">`;
const highlightEndTag = `</span>`;

export function emberCollectionSelectHighlight(params) {
  let text = params[0];
  let searchTerm = params[1];

  if (isBlank(searchTerm)) {
    return text;
  }

  let newText = "";
  let i = -1;
  let lcSearchTerm = searchTerm.toLowerCase();
  let lcText = text.toLowerCase();
    
  while (text.length > 0) {
    i = lcText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += text;
      text = "";
    } else {
      newText += text.substring(0, i) + highlightStartTag + text.substr(i, searchTerm.length) + highlightEndTag;
      text = text.substr(i + searchTerm.length);
      lcText = text.toLowerCase();
      i = -1;
    }
  }
  
  return new Handlebars.SafeString(newText);
}

export default Ember.Helper.helper(emberCollectionSelectHighlight);
