import {Helmet} from "react-helmet";

export const YaMetrika = () => {
  const counter = import.meta.env.VITE_YA_METRIKA_COUNTER;

  if (!counter) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script id="yandex-metrika">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
           m[i].l=1*new Date();
           for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
           k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
           (window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym");

           ym(${counter}, "init", {
                defer: true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true,
           });
           window.dataLayer = window.dataLayer || [];
      `}
        </script>
      </Helmet>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<div>
          <img src="https://mc.yandex.ru/watch/${counter}" style="position:absolute; left: -9999px" alt="" />
        </div>`,
        }}
      ></noscript>
    </>
  );
};

