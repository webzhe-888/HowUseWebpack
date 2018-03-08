/**
 * Created by zhangyg on 2017/10/16.
 */

import './css/common.css';
import Layer from './components/layer/layer.js';

const App = function (){
    var dom = document.getElementById('app');
    var layer = new Layer();
    dom.innerHTML = layer.tpl({
        name:'weiya',
        arr:['1',2,3]
    });
}

new App()