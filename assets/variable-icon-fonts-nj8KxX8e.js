var e=`---
title: Variable icon fonts
section: Experimental
order: 14
lead: Variable icon fonts are supported through ng-glyph, currently for the Material Symbols icon set only.
---

<p>Unlike the static SVG icons, the icon font is not bundled. Install it and load the <code>material-symbols</code> stylesheet yourself, then register the variable fonts you want to use. The first one registered becomes the default.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { provideNgGlyphs } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { withMaterialSymbolsOutlined, withMaterialSymbolsRounded } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/material-symbols'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">bootstrapApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(App, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  providers: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">provideNgGlyphs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">withMaterialSymbolsOutlined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(), </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">withMaterialSymbolsRounded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">())],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ng-glyph</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"settings"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span></code></pre>
<h2 id="inputs-1">Inputs</h2>
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
<td><code>string</code></td>
<td>The name of the icon.</td>
</tr>
<tr>
<td><code>glyphset</code></td>
<td><code>string</code></td>
<td>The glyphset to use. Defaults to the first registered glyphset.</td>
</tr>
<tr>
<td><code>size</code></td>
<td><code>string | number</code></td>
<td>The size as a pixel value or a CSS value. Defaults to the current text size.</td>
</tr>
<tr>
<td><code>opticalSize</code></td>
<td><code>number</code></td>
<td>The optical size in px. Defaults to 20.</td>
</tr>
<tr>
<td><code>color</code></td>
<td><code>string</code></td>
<td>The colour of the icon. Defaults to the current text colour.</td>
</tr>
<tr>
<td><code>weight</code></td>
<td><code>number</code></td>
<td>The weight of the icon. Defaults to 400.</td>
</tr>
<tr>
<td><code>grade</code></td>
<td><code>number</code></td>
<td>The grade of the icon. Defaults to 0.</td>
</tr>
<tr>
<td><code>fill</code></td>
<td><code>boolean</code></td>
<td>Whether the icon should be filled. Defaults to false.</td>
</tr>
</tbody></table>
<blockquote class="warning">
This feature is experimental and does not follow the same versioning as the rest of the library. Feedback is welcome.
</blockquote>
`;export{e as default};