import preprocess from "svelte-preprocess";
import adapterGhpages from "svelte-adapter-ghpages";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  paths: {
    base: "/dogecoin-nft-explorer",
  },

  kit: {
    prerender: {
      default: true
    },
    adapter: adapterGhpages(),
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
