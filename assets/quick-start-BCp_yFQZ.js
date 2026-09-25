var e=`---
title: Quick start
section: Getting started
order: 3
lead: Register an icon in a component, then reference it by name in the template. That is the whole workflow.
---

<h2 id="install">Install</h2>
<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">ng</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> @ng-icons/core</span></span></code></pre>
<p>The schematic installs the core package and prompts you for the icon sets you want. See <a href="/docs/installation">Installation</a> for the manual equivalent.</p><h2 id="find-an-icon">Find an icon</h2>
<p>Search the browser across every set at once, or narrow to the sets you already use. Each icon shows its constant name, its package and a ready-made import.</p><h2 id="register-it-where-you-need-it">Register it where you need it</h2>
<p><code>provideIcons</code> can be placed anywhere providers are accepted. The component providers array is usually the best place, because the icon is then registered only for the component that uses it.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { Component } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@angular/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { NgIcon, provideIcons } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { featherAirplay } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/feather-icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  imports: [NgIcon],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  providers: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">provideIcons</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({ featherAirplay })],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  template: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`&#x3C;ng-icon name="featherAirplay" />\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Player</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {}</span></span></code></pre>
<blockquote class="warning">
The name in the template must match the key you registered. If it does not, the icon renders nothing and a warning is logged to the console.
</blockquote>
`;export{e as default};