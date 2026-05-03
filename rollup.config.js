import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/bitcoin-miner-card.ts",
  output: {
    file: "dist/bitcoin-miner-card.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser()
  ]
};
