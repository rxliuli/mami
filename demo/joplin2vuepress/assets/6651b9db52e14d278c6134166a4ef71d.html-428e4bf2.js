import{_ as s,M as i,p as r,q as a,R as e,t as o,N as t}from"./framework-96b046e1.js";const l={},c=e("h1",{id:"synchronising-your-notes",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#synchronising-your-notes","aria-hidden":"true"},"#"),o(" Synchronising your notes")],-1),h=e("p",null,"Joplin allows you to synchronise your data using various file hosting services. The supported cloud services are the following:",-1),d=e("h2",{id:"setting-up-joplin-cloud-synchronisation",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#setting-up-joplin-cloud-synchronisation","aria-hidden":"true"},"#"),o(" Setting up Joplin Cloud synchronisation")],-1),p={href:"https://joplinapp.org/plans/",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,`To use it, go to the config screen, then to the Synchronisation section. In the list of sync target, select "Joplin Cloud". Enter your email and password, and you're ready to use Joplin Cloud.`,-1),f=e("h2",{id:"setting-up-dropbox-synchronisation",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#setting-up-dropbox-synchronisation","aria-hidden":"true"},"#"),o(" Setting up Dropbox synchronisation")],-1),_=e("p",null,'Select "Dropbox" as the synchronisation target in the config screen. Then, to initiate the synchronisation process, click on the "Synchronise" button in the sidebar and follow the instructions.',-1),y=e("h2",{id:"setting-up-nextcloud-synchronisation",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#setting-up-nextcloud-synchronisation","aria-hidden":"true"},"#"),o(" Setting up Nextcloud synchronisation")],-1),g=e("strong",null,"full URL",-1),b=e("code",null,"/Joplin",-1),m=e("code",null,"https://example.com/remote.php/webdav/Joplin",-1),x=e("strong",null,'make sure to create the "/Joplin" directory in Nextcloud',-1),v={href:"https://github.com/laurent22/joplin/issues/61#issuecomment-373282608",target:"_blank",rel:"noopener noreferrer"},w=e("h2",{id:"setting-up-onedrive-or-webdav-synchronisation",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#setting-up-onedrive-or-webdav-synchronisation","aria-hidden":"true"},"#"),o(" Setting up OneDrive or WebDAV synchronisation")],-1),E={href:"https://github.com/laurent22/joplin#synchronisation",target:"_blank",rel:"noopener noreferrer"},k=e("h2",{id:"using-end-to-end-encryption",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#using-end-to-end-encryption","aria-hidden":"true"},"#"),o(" Using End-To-End Encryption")],-1),J={href:"https://joplinapp.org/e2ee/",target:"_blank",rel:"noopener noreferrer"};function N(S,T){const n=i("ExternalLinkIcon");return r(),a("div",null,[c,h,d,e("p",null,[e("a",p,[o("Joplin Cloud"),t(n)]),o(" is a web service specifically designed for Joplin. Besides synchronising your data, it also allows you to publish a note to the internet, or share a notebook with your friends, family or colleagues. Joplin Cloud, compared to other services, also features a number of performance improvements allowing for faster synchronisation.")]),u,f,_,y,e("p",null,[o("Nextcloud is a self-hosted, private cloud solution. To set it up, go to the config screen and select Nextcloud as the synchronisation target. Then input the WebDAV URL (to get it, go to your Nextcloud page, click on Settings in the bottom left corner of the page and copy the URL). Note that it has to be the "),g,o(", so for example if you want the notes to be under "),b,o(", the URL would be something like "),m,o(' (note that "/Joplin" part). And '),x,o(". Finally set the username and password. If it does not work, please "),e("a",v,[o("see this explanation"),t(n)]),o(" for more details.")]),w,e("p",null,[o("OneDrive and WebDAV are also supported as synchronisation services. Please see "),e("a",E,[o("the synchronisation documentation"),t(n)]),o(" for more information.")]),k,e("p",null,[o("Joplin supports end-to-end encryption (E2EE) on all the applications. E2EE is a system where only the owner of the data can read it. It prevents potential eavesdroppers - including telecom providers, internet providers, and even the developers of Joplin from being able to access the data. Please see the "),e("a",J,[o("End-To-End Encryption Tutorial"),t(n)]),o(" for more information about this feature and how to enable it.")])])}const j=s(l,[["render",N],["__file","6651b9db52e14d278c6134166a4ef71d.html.vue"]]);export{j as default};