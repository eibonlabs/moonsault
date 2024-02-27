const css = `
  c-animate-in-view {
    overflow: auto;
    display:flex;
    transition-property:all;
    transition-duration: 0.5s;
  }

  c-animate-in-view[data-transition="slideInFromLeft"] {
    opacity:0;
    margin-left:-40px;
  }
  c-animate-in-view[data-transition="slideInFromLeft"].animate {
    opacity:1;
    margin-left:0px;
  }
  
  c-animate-in-view[data-transition="slideInFromRight"] {
    opacity:0;
    margin-left:40px;
  }
  c-animate-in-view[data-transition="slideInFromRight"].animate {
    opacity:1;
    margin-left:0px;
  }

  c-animate-in-view[data-transition="slideInFromBottom"] {
    opacity:0;
    margin-top:40px;
  }
  c-animate-in-view[data-transition="slideInFromBottom"].animate {
    opacity:1;
    margin-top:0px;
  }

  c-animate-in-view[data-transition="slideInFromTop"] {
    opacity:0;
    margin-top:-40px;
  }
  c-animate-in-view[data-transition="slideInFromTop"].animate {
    opacity:1;
    margin-top:0px;
  }

  c-animate-in-view[data-transition="flipOverVertical"] {
    opacity:0;
    backface-visibility:hidden;
    transform-style: preserve-3d;
    transform: perspective(1920px) rotateX(180deg);
    transition-duration: 1s;
    overflow: hidden;
  }
  c-animate-in-view[data-transition="flipOverVertical"].animate {
    opacity:1;
    transform: rotateX(0deg);
  }

  c-animate-in-view[data-transition="flipOverHorizontal"] {
    opacity:0;
    backface-visibility:hidden;
    transform-style: preserve-3d;
    transform: perspective(1920px) rotateY(180deg);
    transition-duration: 1s;
    overflow: hidden;
  }
  c-animate-in-view[data-transition="flipOverHorizontal"].animate {
    opacity:1;
    transform: rotateY(0deg);
  }
`;

export default css;