import { LENSPOST_APP_URL } from '@/data';
import { degen, base } from 'viem/chains';

const EXPLORER_URL = {
  666666666: degen?.blockExplorers?.default?.url,
  8453: base?.blockExplorers?.default?.url
};

export const getFrameUI = (
  txHash: undefined | boolean | string,
  redirectLink: undefined | string,
  imageUrl: undefined | string,
  btnText: undefined | string,
  chainId?: number
) => {
  return `
   <!DOCTYPE html><html><head>
   <meta property="fc:frame" content="vNext" />
   <meta property="fc:frame:image" content="${imageUrl}" />
   <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  
   ${
     txHash
       ? `<meta property="fc:frame:button:1" content="${btnText}" />
         <meta property="fc:frame:button:1:action" content="link" />
         <meta property="fc:frame:button:1:target" content="${EXPLORER_URL[chainId as keyof typeof EXPLORER_URL]}/tx/${txHash}" />`
       : `<meta property="fc:frame:button:1" content="${btnText}" />`
   }

   ${
     redirectLink &&
     `<meta property="fc:frame:button:2" content="Know more" />
      <meta property="fc:frame:button:2:action" content="link" />
      <meta property="fc:frame:button:2:target" content="${redirectLink}" />`
   }
  
   <meta property="fc:frame:button:${
     redirectLink ? '3' : '2'
   }" content="Remix on Lenspost" />
   <meta property="fc:frame:button:${
     redirectLink ? '3' : '2'
   }:action" content="link" />
   <meta property="fc:frame:button:${
     redirectLink ? '3' : '2'
   }:target" content="${LENSPOST_APP_URL}" />
  </head>
  </html>
   `;
};
