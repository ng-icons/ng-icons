var e=`---
title: Registering icons
section: Usage
order: 5
lead: Icons are plain constants. provideIcons registers them under the names you give, and the injector resolves them when a template asks for one.
---

<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Component } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@angular/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { NgIcon, provideIcons } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { featherAirplay } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/feather-icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { heroUsers } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/heroicons/outline'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  imports: [NgIcon],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  providers: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">provideIcons</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({ featherAirplay, heroUsers })],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> App</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {}</span></span></code></pre>
<h2 id="where-to-register">Where to register</h2>
<p><code>provideIcons</code> can be placed anywhere you can register providers. Registering in a component keeps the icon scoped to that component and lets the bundler split it out with the component itself. Registering at the application level makes an icon available everywhere.</p><h2 id="renaming-an-icon">Renaming an icon</h2>
<p>The keys you pass are the names used in templates, so an icon can be registered under a name that suits your application.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">providers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">provideIcons</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({ menu: featherMenu })];</span></span></code></pre>
<h2 id="name-autocomplete">Name autocomplete</h2>
<p>The <code>name</code> input suggests the icons you have installed. Each icon package contributes its names to the <code>NgIconNameMap</code> interface in <code>@ng-icons/core</code>, so the suggestions follow your imports: install <code>@ng-icons/heroicons</code> and import from <code>@ng-icons/heroicons/outline</code>, and that entry point&#39;s icons are offered. Icons from sets you have not installed are not.</p><p>Any string is still accepted. A renamed icon, an icon fetched by an <a href="/docs/icon-loaders">icon loader</a>, or one from your own set will never appear in a package&#39;s names, and none of them are errors.</p><p>Two types come out of this, and they answer different questions:</p><table>
<thead>
<tr>
<th>Type</th>
<th>Contains</th>
<th>Use it when</th>
</tr>
</thead>
<tbody><tr>
<td><code>IconName</code></td>
<td>Only the icons you have imported</td>
<td>You want a name checked, e.g. a constant or a lookup table</td>
</tr>
<tr>
<td><code>IconType</code></td>
<td><code>IconName</code>, plus any other string</td>
<td>You accept a name you cannot know ahead of time, e.g. one from a loader</td>
</tr>
</tbody></table>
<p><code>name</code> is an <code>IconType</code>, which is why a template never fails on an unknown name. <code>IconName</code> falls back to <code>string</code> when you have imported no icon package at all, so a project that renders everything through a loader is not left with an unusable type.</p><blockquote>
<p>If a set&#39;s names do not appear straight after you first import it, restart the TypeScript server in your editor. The names arrive through a type declaration, and editors do not always pick that up until the project is reloaded.</p></blockquote>
<p>To get the same suggestions for your own icons, add their names to the interface once, anywhere in your application:</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">declare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> module</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> NgIconNameMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">    companyLogo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">    menu</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
`;export{e as default};