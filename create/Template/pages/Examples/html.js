import '../../components/BindingExample/index.js';
import '../../components/AnimateInView/index.js';
import '../../components/Markdown/index.js';
import '../../components/PropUpdateExample/index.js';
import '../../components/LookAtCursor/index.js';

const html = `
<h3>Examples</h3>

<!-- LOCALIZATION -->
<h4>Localization</h4>
<div>
    <span data-localize="testLocalization"></span>
</div>

<!-- MARKDOWN -->
<h4>Markdown</h4>

<c-markdown data-src="HelloWorld.md"></c-markdown>

<!-- BINDING -->
<c-binding-example></c-binding-example>

<!-- PROP UPDATE -->
<c-prop-update-example></c-prop-update-example>

<!-- LOOK AT CURSOR -->
<h4>Look at Cursor</h4>
<c-look-at-cursor data-parent="">
  <div style="display:flex; flex-direction:column; width:300px; height:300px; background: #2A7B9B; background: linear-gradient(23deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(186, 83, 237, 1) 100%); color: #ffffff; text-shadow: 3px 3px rgba(30,30,30,0.5); display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:bold; ">
    <div>Hello World!</div>
    <div>Hello World!</div>
    <div>Hello World!</div>
    <div>Hello World!</div>
    <div>Hello World!</div>
  </div>
</c-look-at-cursor>

<!-- ANIMATE IN VIEW -->
<h4>Animate in View</h4>

<div>
    <br/>
    Scroll down to see animations<br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
   
    <c-animate-in-view data-transition="slideInFromLeft" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="slideInFromRight" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="slideInFromBottom" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="slideInFromTop" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="flipOverVertical" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="flipOverHorizontal" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="zoomIn" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="zoomOut" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    <c-animate-in-view data-transition="unblur" data-reset="true">
    <c-markdown data-src="HelloWorld.md"></c-markdown>
    </c-animate-in-view>
    
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
</div>
`;

export default html;