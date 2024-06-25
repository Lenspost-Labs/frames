import {
  getFrameHtmlResponse,
  FrameButtonMetadata
} from '@coinbase/onchainkit/frame';
import { LENSPOST_APP_URL, CHAIN_HELPER, APP_URL } from '@/data';

export const getFrameUI = (
  txHash: undefined | boolean | string,
  chainId: number | any,
  imageUrl: string | any,
  btnText: string | any,
  isError: boolean,
  frameId: undefined | number
) => {
  const EXPLORER_URL = chainId
    ? CHAIN_HELPER[chainId as keyof typeof CHAIN_HELPER]?.blockExplorers
        ?.default?.url
    : null;

  let btns: FrameButtonMetadata[] = [
    {
      target: LENSPOST_APP_URL,
      label: 'Remix on Poster',
      action: 'link'
    }
  ];

  if (isError) {
    btns.unshift({
      target: `${APP_URL}/api/frame?frameId=${frameId}`,
      label: btnText,
      action: 'post'
    });
  }

  if (txHash) {
    btns.unshift({
      target: `${EXPLORER_URL}/tx/${txHash}`,
      label: 'View tx',
      action: 'link'
    });
  }

  return getFrameHtmlResponse({
    image: {
      aspectRatio: '1:1',
      src: imageUrl
    },
    // @ts-ignore
    buttons: btns
  });
};
