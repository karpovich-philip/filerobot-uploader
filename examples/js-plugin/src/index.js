import '../../../projects/js-plugin/index';
import './style.css';
import prettyBytes from 'pretty-bytes';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();

let loadedImage = null;

// Configuration
let config = {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY', 'TAGGING', 'IMAGE_EDITOR'],
  uploadParams: { dir:"/demo_filerobot_en" },
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  container: 'scaleflex-tests-v5a',
  openpixKey: 'xxxxxxxxxxxxxxx',
  initialTab: 'UPLOAD',
  folderBrowser: true,
  tagging: {
    executeAfterUpload: true,
    autoTaggingButton: true,
    provider: 'google',
    confidence: 60,
    limit: 10,
    key: 'aaaa'
  },
  language: 'en',
  colorScheme: {
    active: 'custom',
    custom: {
      mainBackground: '#f5f5f5',
      navBackground: '#181830',
      buttonBackground: '#00707C',
      hoverButtonBackground: '#096868',
      inputBackground: '#fff',
      inputOutlineColor: '#4d90fe',
      activeTabBackground: '#40545b',
      text: '#5d636b',
      title: '#1e262c',
      inputTextColor: '#555555',
      tabTextColor: '#c0c1c1',
      activeTabTextColor: '#fff',
      buttonTextColor: '#fff',
      border: '#d8d8d8'
    }
  }
};

window.addEventListener('load', function() {
  const FilerobotUploaderInstance = FilerobotUploader.init(config, onUploadHandler);
  const openBtn = document.getElementById('open-modal-btn');

  openBtn.onclick = () => FilerobotUploaderInstance.open();
});

function onUploadHandler(files) {
  const img = files[0];
  const image = document.getElementById('image-box');
  const editBtn = document.getElementById('edit-image-btn');
  const description = document.getElementById('image-description');
  const options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
  };
  const firstLoad = (img.created_at ? (new Date(img.created_at)) : new Date()).toLocaleTimeString("fr", options);
  const lastModified = (img.modified_at ? (new Date(img.modified_at)) : new Date()).toLocaleTimeString("fr", options);

  img.properties.tags = img.properties.tags || [];

  loadedImage = img;
  editBtn.removeAttribute('disabled');

  editBtn.onclick = function() {
    window.FilerobotUploader.open('TAGGING', { file: loadedImage });
  }

  image.src = img.url_public;
  description.innerHTML = `
    <ul>
        <li>
          <span>File name: </span>
          <span>${img.name}</span>
        </li>
        <li>
          <span>Public link: </span>
          <span>${img.url_public}</span>
        </li>
        <li>
          <span>Size: </span>
          <span>${prettyBytes(img.size || 0)}</span>
        </li>
        <li>
          <span>First Uploaded: </span>
          <span>${firstLoad || ''}</span>
        </li>
        <li>
          <span>Last Modified: </span>
          <span>${lastModified || ''}</span>
        </li>
        <li>
          <span>Description: </span>
          <span>${img.properties.description || ''}</span>
        </li>
        <li>
          <span>Tags: </span>
          <span>${img.properties.tags.join(', ')}</span>
        </li>
      </ul>
    `;
}