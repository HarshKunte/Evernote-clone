// export default function debounce(a,b,c){
//   var d,e;
//   return function(){
//     function h(){
//       d=null;
//       c||(e=a.apply(f,g));
//     }
//     var f=this,g=arguments;
//     return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
//   }
// }


//less complex debounce function
export default function debounce(fn, d){
  let timer;
  return function(){
    let context=this, args = arguments;
    clearTimeout(timer)
  timer = setTimeout(() => {
        fn.apply(context, args)
  }, d);
  }
}
  
  export function removeHeaderTags (str) {
    // return str.replace(/<[^>]*>?/gm, '');
    return str.replaceAll(/<h[12345]?>/gm,'<p>').replace(/<\/h[12345]?>/gm,'</p>');
  };
  export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
    
  };

  export function getTimePassed(time){
    let dbTime = new Date(time)
    let now = new Date()
    console.log(now.getTime() - dbTime.getTime());
    return (now.getTime() - dbTime.getTime()).toLocaleString()
  }