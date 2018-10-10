// find places where japanese is, ignore furigana, and read when speaker emoji is clicked

/*var selection = ''
var time = undefined
var throttle = 300

 document.onselectionchange=function(){
   if(time)clearTimeout(time)
   time=setTimeout(messageExtension,throttle)
 }


function messageExtension(){
  console.log(window.getSelection())
  if(window.getSelection().toString()!==selection)chrome.extension.sendMessage(window.getSelection().toString(), function(response) {
     //callback

  });
}*/

if(/jisho\.org/gi.test(location.hostname)){
  var japanese = document.querySelectorAll('.japanese')
  //japanese.forEach(c=>console.log(c.innerText))
  //var noFurigana = japanese.map(c=>c.querySelectorAll(':not(.furigana)'))
  var noFurigana = []
  japanese.forEach(c=>noFurigana.push(c.querySelectorAll(':not(.furigana)')))
  noFurigana.forEach(c=>c.forEach(_c=>{
    //console.log(_c/*.innerText*/)
    var speaker = document.createElement('div')
    speaker.onclick=function(){yonde(_c.innerText)}
    speaker.innerText="🗣"
    _c.appendChild(speaker)
  }))
}

speechSynthesis.getVoices()
function yonde(words){
  const voice = speechSynthesis.getVoices().filter(voice=>voice&&/ja[-_]JP/.test(voice.lang)).reverse()[0];
  const utterance = new SpeechSynthesisUtterance(words);
  utterance.voice = voice;
  utterance.lang = 'ja-JP';
  // Listeners are for dealing with a Chrome garbage collection thing
  // https://stackoverflow.com/a/34844998/1104036
  utterance.addEventListener('start', () => {
     console.log('saying "'+words+'"');
  })
  utterance.addEventListener('end', () => {
     console.log('said "'+words+'"');
  })
  utterance.addEventListener('error', e => {
    console.error('Failed to say "'+words+'" :',e)
  })
  speechSynthesis.speak(utterance);
  return utterance;
};
