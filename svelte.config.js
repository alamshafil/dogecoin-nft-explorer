import preprocess from "svelte-preprocess";
import adapterGhpages from "svelte-adapter-ghpages";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    prerender: {
      default: true
    },
    paths: {
      base: "/dogecoin-nft-explorer",
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
