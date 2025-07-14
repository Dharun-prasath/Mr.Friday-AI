// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// preload.js
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.speechSynthesis = speechSynthesis;
