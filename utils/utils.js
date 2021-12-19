/************* RETURN HTMLSPECIALCHARS HERE ****************/
export function escapeHtml(s) {
  var re = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
  var unescaped = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"'
  };
  return s.replace(re, function (m) {
    return unescaped[m];
  });
}

/********** PRODUCT SLIDER STARTER VALUE **********/

export function SliderStarterValue(val){

  window.addEventListener('DOMContentLoaded',()=>{

    val.style.minHeight=360 + "px";
    val.innerHTML=`

    <div style="width:100%; height:100%;" class="text-center">
      <h1 class="text-success">Segmentify Case Project</h1>
      <h4>Click Categories Left Side</h4>
    </div>

    `;

  })
}

/************** LAYZ LOAD ***************/
export function layzLoad(data){

  const callback = (entries)=>{

    entries.forEach(entry=> {

     if(entry.isIntersecting){

      entry.target.src = entry.target.dataset.src;

    };

  })

  };

  const options = {
    rootMarginLeft: "0px",
  }

  const observer = new IntersectionObserver(callback,options);

  data.forEach(param=>{
    observer.observe(param)
  })

}
/**********************************************************************/

/************ LEFT - RIGHT BUTTONS ********************/

export function leftButton(param,val){

  param.addEventListener('click',()=>{

    val.scrollLeft -=150

  })

}

export function rightButton(param,val){

 param.addEventListener('click',()=>{

  val.scrollLeft +=150
  
})

}


/******************************************************/



