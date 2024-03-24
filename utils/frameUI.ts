import { config } from "@/configs/config";
import { base, baseSepolia } from "@wagmi/core/chains";

const explorerUrl =
  config?.ENVIRONMENT === "production"
    ? base.blockExplorers.default.url
    : baseSepolia.blockExplorers.default.url;

export const getFrame = (
  wallet: string | undefined,
  txHash: string | boolean | undefined,
  imageUrl: string | undefined,
  btnText: string | undefined,
  redirectLink?: string | undefined
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
         <meta property="fc:frame:button:1:target" content="${explorerUrl}/tx/${txHash}" />`
       : `<meta property="fc:frame:button:1" content="${btnText}" />`
   }

   ${
     redirectLink &&
     `<meta property="fc:frame:button:2" content="Know more" />
      <meta property="fc:frame:button:2:action" content="link" />
      <meta property="fc:frame:button:2:target" content="${redirectLink}" />`
   }
  
   <meta property="fc:frame:button:${
     redirectLink ? "3" : "2"
   }" content="Remix on Lenspost" />
   <meta property="fc:frame:button:${
     redirectLink ? "3" : "2"
   }:action" content="link" />
   <meta property="fc:frame:button:${
     redirectLink ? "3" : "2"
   }:target" content="https://app.lenspost.xyz" />
  </head>
  </html>
   `;
};
