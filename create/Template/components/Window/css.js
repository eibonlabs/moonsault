const css = `
  .desktop {
    background-color:rgba(20,20,20,1);
    display:block;
    position: absolute;
    top:0px;
    right:0px;
    bottom:0px;
    left:0px;
    overflow:hidden;
  }

  c-window {
    position: absolute;
    display: flex;
    overflow: hidden;
  }

  c-window.resizable {
    resize: both;
    min-height: 110px;
    min-width: 200px;
  }
  
  c-window.transtionWindowState {
    transition-property: top, left, width, height, opacity, transform;
    transition-duration: 0.25s;
  }

  c-window.close {
    opacity: 0;
    transform: scale(0);
    transform-origin: top center;
    transition-duration: 0.5s;
  }
  
  c-window .window {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  c-window .window .window-title-bar {
    border-top: 1px solid #590d4f;
    border-left: 1px solid #590d4f;
    border-right: 1px solid #590d4f;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    align-items: center;
    background-color: #890c78;
    cursor: default;
  }

  c-window .window .window-title-bar h3 {
    font-size: 14px;
    font-weight: bold;
    margin: 0px;
    width: 100%;
    padding: 4px 16px 0px 4px;
    text-overflow: ellipsis;
  }

  c-window .window .window-title-bar .window-controls {
    margin-left: auto;
    z-index: 1;
    padding: 4px 6px;
    display: flex;
    gap: 4px;
  }
  
  c-window .window .window-title-bar .window-controls button {
    margin:0px;
    padding:0px;
    width:18px;
    height:18px;
    display:flex;
    align-items:center;
  }

  c-window .window .window-title-bar .window-controls button svg {
    width:80%;
    height:80%;
  }

  c-window .window .window-content {
    padding: 6px;
    flex: 1;
    border-left: 1px solid #590d4f;
    border-right: 1px solid #590d4f;
    background-color: #000000;
    position: relative;
    display: block;
    overflow: auto;
  }

  c-window .window .window-content iframe {
    border: 0px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }

  c-window .window .window-footer {
    border-left: 1px solid #590d4f;
    border-right: 1px solid #590d4f;
    border-bottom: 1px solid #590d4f;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-size: 10px;
    display: flex;
    align-items: center;
    background-color: #890c78;
    cursor: default;
  }

  c-window .window .window-footer .window-footer-message {
    margin: 0px;
    width: 100%;
    padding: 4px 16px 0px 4px;
  }
`;

export default css;