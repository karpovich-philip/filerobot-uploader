(window.webpackJsonp1548830441203=window.webpackJsonp1548830441203||[]).push([[4],{380:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o,n=function(){return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,r){var t=[],o=!0,n=!1,a=void 0;try{for(var i,p=e[Symbol.iterator]();!(o=(i=p.next()).done)&&(t.push(i.value),!r||t.length!==r);o=!0);}catch(e){n=!0,a=e}finally{try{!o&&p.return&&p.return()}finally{if(n)throw a}}return t}(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},i=function(){function e(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}}(),p=t(1),_=(o=p)&&o.__esModule?o:{default:o},l=t(818),u=t(63),s=t(126);function c(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}var d=function(e){function r(){var e,t,o;!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r);for(var n=arguments.length,a=Array(n),i=0;i<n;i++)a[i]=arguments[i];return t=o=c(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(a))),o.goBack=function(){var e;return(e=o).__goBack__REACT_HOT_LOADER__.apply(e,arguments)},o.onUpload=function(){var e;return(e=o).__onUpload__REACT_HOT_LOADER__.apply(e,arguments)},c(o,t)}return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}(r,p.Component),i(r,[{key:"__onUpload__REACT_HOT_LOADER__",value:function(){return this.__onUpload__REACT_HOT_LOADER__.apply(this,arguments)}},{key:"__goBack__REACT_HOT_LOADER__",value:function(){return this.__goBack__REACT_HOT_LOADER__.apply(this,arguments)}},{key:"__goBack__REACT_HOT_LOADER__",value:function(){"TAGGING"===this.props.prevTab?this.props.setPostUpload(!0,"TAGGING","MY_GALLERY"):this.props.setPostUpload(!1)}},{key:"__onUpload__REACT_HOT_LOADER__",value:function(e,r){if("TAGGING"===this.props.prevTab){var t=[a({},r,{public_link:r.url_permalink})];this.props.saveUploadedFiles(t),this.props.setPostUpload(!0,"TAGGING")}else this.props.setPostUpload(!1)}},{key:"render",value:function(){var e=this.props,r=e.files,t=n(r=void 0===r?{}:r,1)[0],o=void 0===t?{}:t,i=e.path,p=this.props.config,u=p.uploadKey,s=p.container,c=p.uploadParams;return _.default.createElement(l.ImageEditor,{config:{UPLOAD_KEY:u,AIRSTORE_UPLOAD_KEY:u,CONTAINER:s,UPLOAD_CONTAINER:s,PROCESS_WITH_CLOUDIMAGE:!1,HIDE_CLOUDIMAGE_PROCESS:!0,UPLOAD_PARAMS:a({},c,{dir:i||c.dir})},closeOnLoad:!1,src:o.url_permalink,onUpload:this.onUpload,onClose:this.goBack,showGoBackBtn:!0})}}]),r}(),f=function(e){return{uploadHandler:e.uploader.uploaderConfig.uploadHandler,editorConfig:e.uploader.uploaderConfig.imageEditor,language:e.uploader.uploaderConfig.language,config:e.uploader.uploaderConfig}},E=(0,u.connect)(f,{modalClose:s.modalClose})(d);r.default=E;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(d,"ImageEditorWrapper","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/imageEditor/ImageEditorWrapper.js"),__REACT_HOT_LOADER__.register(f,"mapStateToProps","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/imageEditor/ImageEditorWrapper.js"),__REACT_HOT_LOADER__.register(E,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/imageEditor/ImageEditorWrapper.js"))}}]);