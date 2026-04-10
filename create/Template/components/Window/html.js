const html = `
<div class="window">
    <div class="window-title-bar">
        <h3>Window Title</h3>
        <div class="window-controls">
            <button class="window-maximize">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </button>
            <button class="window-minimize">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-440v-80h480v80H240Z"/></svg>
            </button>
            <button class="window-close">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
        </div>
    </div>
    <div class="window-content">
    </div>
    <div class="window-footer">
        <div class="window-footer-message">FOOTER</div>
        <div class="window-footer-controls">
        </div>
    </div>
</div>
`;

export default html;