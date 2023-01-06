import{_ as e,c as n,o,d as t}from"./app.76054421.js";const y=JSON.parse('{"title":"3. Synchronising your notes","description":"","frontmatter":{"title":"3. Synchronising your notes"},"headers":[{"level":2,"title":"Setting up Joplin Cloud synchronisation","slug":"setting-up-joplin-cloud-synchronisation","link":"#setting-up-joplin-cloud-synchronisation","children":[]},{"level":2,"title":"Setting up Dropbox synchronisation","slug":"setting-up-dropbox-synchronisation","link":"#setting-up-dropbox-synchronisation","children":[]},{"level":2,"title":"Setting up Nextcloud synchronisation","slug":"setting-up-nextcloud-synchronisation","link":"#setting-up-nextcloud-synchronisation","children":[]},{"level":2,"title":"Setting up OneDrive or WebDAV synchronisation","slug":"setting-up-onedrive-or-webdav-synchronisation","link":"#setting-up-onedrive-or-webdav-synchronisation","children":[]},{"level":2,"title":"Using End-To-End Encryption","slug":"using-end-to-end-encryption","link":"#using-end-to-end-encryption","children":[]}],"relativePath":"p/6651b9db52e14d278c6134166a4ef71d.md"}'),i={name:"p/6651b9db52e14d278c6134166a4ef71d.md"},s=t('<h1 id="synchronising-your-notes" tabindex="-1">Synchronising your notes <a class="header-anchor" href="#synchronising-your-notes" aria-hidden="true">#</a></h1><p>Joplin allows you to synchronise your data using various file hosting services. The supported cloud services are the following:</p><h2 id="setting-up-joplin-cloud-synchronisation" tabindex="-1">Setting up Joplin Cloud synchronisation <a class="header-anchor" href="#setting-up-joplin-cloud-synchronisation" aria-hidden="true">#</a></h2><p><a href="https://joplinapp.org/plans/" target="_blank" rel="noreferrer">Joplin Cloud</a> is a web service specifically designed for Joplin. Besides synchronising your data, it also allows you to publish a note to the internet, or share a notebook with your friends, family or colleagues. Joplin Cloud, compared to other services, also features a number of performance improvements allowing for faster synchronisation.</p><p>To use it, go to the config screen, then to the Synchronisation section. In the list of sync target, select &quot;Joplin Cloud&quot;. Enter your email and password, and you&#39;re ready to use Joplin Cloud.</p><h2 id="setting-up-dropbox-synchronisation" tabindex="-1">Setting up Dropbox synchronisation <a class="header-anchor" href="#setting-up-dropbox-synchronisation" aria-hidden="true">#</a></h2><p>Select &quot;Dropbox&quot; as the synchronisation target in the config screen. Then, to initiate the synchronisation process, click on the &quot;Synchronise&quot; button in the sidebar and follow the instructions.</p><h2 id="setting-up-nextcloud-synchronisation" tabindex="-1">Setting up Nextcloud synchronisation <a class="header-anchor" href="#setting-up-nextcloud-synchronisation" aria-hidden="true">#</a></h2><p>Nextcloud is a self-hosted, private cloud solution. To set it up, go to the config screen and select Nextcloud as the synchronisation target. Then input the WebDAV URL (to get it, go to your Nextcloud page, click on Settings in the bottom left corner of the page and copy the URL). Note that it has to be the <strong>full URL</strong>, so for example if you want the notes to be under <code>/Joplin</code>, the URL would be something like <code>https://example.com/remote.php/webdav/Joplin</code> (note that &quot;/Joplin&quot; part). And <strong>make sure to create the &quot;/Joplin&quot; directory in Nextcloud</strong>. Finally set the username and password. If it does not work, please <a href="https://github.com/laurent22/joplin/issues/61#issuecomment-373282608" target="_blank" rel="noreferrer">see this explanation</a> for more details.</p><h2 id="setting-up-onedrive-or-webdav-synchronisation" tabindex="-1">Setting up OneDrive or WebDAV synchronisation <a class="header-anchor" href="#setting-up-onedrive-or-webdav-synchronisation" aria-hidden="true">#</a></h2><p>OneDrive and WebDAV are also supported as synchronisation services. Please see <a href="https://github.com/laurent22/joplin#synchronisation" target="_blank" rel="noreferrer">the synchronisation documentation</a> for more information.</p><h2 id="using-end-to-end-encryption" tabindex="-1">Using End-To-End Encryption <a class="header-anchor" href="#using-end-to-end-encryption" aria-hidden="true">#</a></h2><p>Joplin supports end-to-end encryption (E2EE) on all the applications. E2EE is a system where only the owner of the data can read it. It prevents potential eavesdroppers - including telecom providers, internet providers, and even the developers of Joplin from being able to access the data. Please see the <a href="https://joplinapp.org/e2ee/" target="_blank" rel="noreferrer">End-To-End Encryption Tutorial</a> for more information about this feature and how to enable it.</p>',13),r=[s];function a(l,d,c,h,p,u){return o(),n("div",null,r)}const f=e(i,[["render",a]]);export{y as __pageData,f as default};