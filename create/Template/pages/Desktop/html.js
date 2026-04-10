import '../../components/Window/index.js';

const html = `
<h3>Desktop</h3>
<!-- WINDOW -->
<div class="desktop-container">
    <div class="desktop">
        <c-window 
            data-x-position="20px" 
            data-y-position="20px" 
            data-width="600px"
            data-height="300px"
            data-draggable="true" 
            data-resizable="true" 
            data-maximize="true" 
            data-minimize="true" 
            data-close="true" 
        >
            <div>Hello World!</div>
        </c-window>
    </div>
</div>

`;

export default html;