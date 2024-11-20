import { whenDev } from "@craco/craco";
import { CracoConfig } from "@craco/types";
import { SubresourceIntegrityPlugin } from 'webpack-subresource-integrity';

const conf: CracoConfig = {
  eslint: {
    enable: true
  },
  devServer: whenDev(() => ({
    https: true
  })),
  webpack: {
    configure: {
      output: {
        // the following setting is required for SRI to work:
        crossOriginLoading: "use-credentials"
      }
    },
    plugins: {
      add: [new SubresourceIntegrityPlugin({
        hashFuncNames: ["sha256", "sha384"],
        enabled: process.env.NODE_ENV === "production"
      })]
    }
  },
  typescript: {
    enableTypeChecking: true
  }
};

export default conf;