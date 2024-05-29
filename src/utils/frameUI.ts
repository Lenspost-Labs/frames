import { LENSPOST_APP_URL, CHAIN_HELPER } from '@/data';

export const getFrameUI = (
  txHash: undefined | boolean | string,
  redirectLink: undefined | string,
  imageUrl: undefined | string,
  btnText: undefined | string,
  chainId?: number
) => {
  const EXPLORER_URL =
    CHAIN_HELPER[chainId as keyof typeof CHAIN_HELPER]?.blockExplorers?.default
      ?.url;

  return `
   <!DOCTYPE html><html><head>
   <meta property="fc:frame" content="vNext" />
   <meta property="fc:frame:image" content="${imageUrl}" />
   <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  
   ${
     txHash
       ? `<meta property="fc:frame:button:1" content="${btnText}" />
         <meta property="fc:frame:button:1:action" content="link" />
         <meta property="fc:frame:button:1:target" content="${EXPLORER_URL}/tx/${txHash}" />`
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
