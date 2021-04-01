// Using default extractor works
module.exports = {
  content: ["public/parcel/**/*.js"],
  css: ["public/parcel/**/*.css"],
  output: "public/parcel"
  /*
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  extractors: [
    {
      extractor: content => {
        return content.match(/[\w-/:]+(?<!:)/g) || [];
      },
      extensions: ["js"]
    }
  ]
  */
};
