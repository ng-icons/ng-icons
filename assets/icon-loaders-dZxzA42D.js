var e=`---
title: Dynamically loading icons
section: Usage
order: 8
lead: Registering icons individually is the most common approach, but you may want to load them lazily from a URL or generate an SVG on the fly. An icon loader does that.
---

<h2 id="providing-a-loader">Providing a loader</h2>
<p>A loader is a function that receives the name of the requested icon and returns the SVG to render, as a string, a Promise or an Observable. It runs inside the injection context, so you can inject dependencies such as <code>HttpClient</code>.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { provideNgIconLoader } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { HttpClient } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@angular/common/http'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { inject } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@angular/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">bootstrapApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(App, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  providers: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    provideNgIconLoader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> http</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> inject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(HttpClient);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> http.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`/assets/icons/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}.svg\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, { responseType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'text'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<blockquote class="warning">
A loader does not reduce total bundle size on its own. It makes the icons load lazily, so they may appear blank until they have arrived.
</blockquote>

<h2 id="caching-results">Caching results</h2>
<p>Add <code>withCaching</code> to the loader to avoid requesting the same icon more than once.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">provideNgIconLoader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> fetchIcon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(name), </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">withCaching</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">());</span></span></code></pre>
`;export{e as default};