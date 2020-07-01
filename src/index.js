// import  _  from  '../node_modules/lodash';
import _ from 'lodash';

function  createElement(){
    let div =  document.createElement('div');
    div.innerHTML =  _.join(['hello',  'webpack'],  '');
    div.className = 'box';
    return  div;
}
document.body.appendChild(createElement());