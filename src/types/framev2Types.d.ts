type FrameEmbed = {
  // Button attributes
  button: {
    // Action attributes
    action: {
      // Hex color code.
      // Example: "#eeeee4"
      splashBackgroundColor: string;

      // Splash image URL.
      // Max 512 characters.
      // Image must be 200x200px and less than 1MB.
      // Example: "https://yoink.party/img/splash.png"
      splashImageUrl: string;

      // Action type. Must be "launch_frame".
      type: 'launch_frame';

      // App name
      // Max length of 32 characters.
      // Example: "Yoink!"
      name: string;

      // Frame launch URL.
      // Max 512 characters.
      // Example: "https://yoink.party/"
      url: string;
    };
    // Button text.
    // Max length of 32 characters.
    // Example: "Yoink Flag"
    title: string;
  };

  // Frame image.
  // Max 512 characters.
  // Image must be 3:2 aspect ratio and less than 10 MB.
  // Example: "https://yoink.party/img/start.png"
  imageUrl: string;

  // Frame spec version. Required.
  // Example: "next"
  version: 'next';
};
