export const createLink = (arr) => {
    const element = document.createElement('a');
    let target  = '';
    if(arr.id && arr.id !== '') {element.setAttribute('id', arr.id);}
    if(arr.class && arr.class !== '') {element.setAttribute('class', arr.class)}
    if(arr.href && arr.href !== '') {element.setAttribute('href', arr.href)}

    //js
    if(arr.onclick && arr.onclick !== '') {element.setAttribute('onclick', arr.onclick)}
    if(arr.onchange && arr.onchange !== '') {element.setAttribute('onchange', arr.onchange)}
    if(arr.onmouseover && arr.onmouseover !== '') {element.setAttribute('onmouseover', arr.onmouseover)}
    if(arr.onmouseout && arr.onmouseout !== '') {element.setAttribute('onmouseout', arr.onmouseout)}
    if(arr.onmouseenter && arr.onmouseenter !== '') {element.setAttribute('onmouseenter', arr.onmouseenter)}
    if(arr.onmouseleave && arr.onmouseleave !== '') {element.setAttribute('onmouseleave', arr.onmouseleave)}
    if(arr.onkeydown && arr.onkeydown !== '') {element.setAttribute('onkeydown', arr.onkeydown)}
    if(arr.onkeyup && arr.onkeyup !== '') {element.setAttribute('onkeyup', arr.onkeyup)}
    if(arr.onsubmit && arr.onsubmit !== '') {element.setAttribute('onsubmit', arr.onsubmit)}
    if(arr.onfocus && arr.onfocus !== '') {element.setAttribute('onfocus', arr.onfocus)}
    if(arr.onblur && arr.onblur !== '') {element.setAttribute('onblur', arr.onblur)}

    if(arr.custom && arr.custom !== '') {
        const attr = Object.keys(arr.custom);
        attr.forEach(dt=>{
            element.setAttribute('data-'+dt, arr.custom.dt);
        })
    }
    
    if(arr.style && arr.style !=='') {element.setAttribute('style', arr.style)}
    if(arr.textCont && arr.textCont !=='') {element.textContent = arr.textCont;}
    if(arr.selector && arr.selector !== '') {target = document.querySelector(arr[dt]);}
    if(target !== '') {
        return target.appendChild(element);
    }
    return element;
}