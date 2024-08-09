export interface ComposerActionFormResponse {
  title: string;
  type: 'form';
  url: string;
}

export interface ComposerActionMessage {
  data: {
    cast: {
      embeds: string[];
      parent?: string;
      text: string;
    };
  };
  type: 'createCast';
}

export interface ComposerActionMetadata {
  action: {
    type: 'post';
  };
  description: string;
  aboutUrl?: string;
  type: 'composer';
  imageUrl: string;
  name: string;
  icon: string;
}
