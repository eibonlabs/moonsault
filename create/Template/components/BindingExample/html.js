const html = `
<h3>Data Binding Example</h3>

<div>
    <h4>Single prop data binding</h4>
    <span class="test"></span> (Updates every 1000ms)<br/>
    <input class="test2" value="" /> (Updates every 1500ms)<br/>
    <h4>Object Data Binding</h4>
    <button id="decrement">-</button>
    <span id="modelValue"></span>
    <button id="increment">+</button>
    <h4>Nested Data Binding</h4>
    <button id="nestedDecrement">-</button>
    <input id="nestedValue" value=""/>
    <button id="nestedIncrement">+</button>
</div>
`;

export default html;