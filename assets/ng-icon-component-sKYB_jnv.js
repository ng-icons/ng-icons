var e=`---
title: The ng-icon component
section: Usage
order: 4
lead: NgIcon renders a registered icon by name. Add it to a component's imports, or use the NG_ICON_DIRECTIVES constant.
---

<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Component } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@angular/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { NgIcon } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  imports: [NgIcon],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  template: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`&#x3C;ng-icon name="heroUsers" />\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {}</span></span></code></pre>
<h2 id="inputs">Inputs</h2>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody><tr>
<td><code>name</code></td>
<td><code>IconType</code></td>
<td>The name of a registered icon. Any string, with autocomplete for the icons you have imported. See <a href="/docs/registering-icons">Name autocomplete</a>.</td>
</tr>
<tr>
<td><code>svg</code></td>
<td><code>string</code></td>
<td>An SVG string to render directly, instead of a registered icon.</td>
</tr>
<tr>
<td><code>size</code></td>
<td><code>string</code></td>
<td>The size of the icon. Defaults to the current font size.</td>
</tr>
<tr>
<td><code>color</code></td>
<td><code>string</code></td>
<td>The colour of the icon. Defaults to the current text colour.</td>
</tr>
<tr>
<td><code>strokeWidth</code></td>
<td><code>string | number</code></td>
<td>The stroke width of the icon. Only works on icon sets that use strokes.</td>
</tr>
</tbody></table>
<blockquote>
<p>Only icons from Angular Icons icon sets support the <code>color</code>, <code>size</code> and <code>strokeWidth</code> inputs.</p></blockquote>
`;export{e as default};