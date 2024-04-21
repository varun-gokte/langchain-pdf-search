const { loadQAStuffChain } = require("langchain/chains");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { OpenAI } = require("langchain/llms/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");

const llmA = new OpenAI({ modelName: "gpt-3.5-turbo" });
const chainA = loadQAStuffChain(llmA);
const directory = process.env.DIR;
const loadedVectorStore = await FaissStore.load(
  directory,
  new OpenAIEmbeddings()
);

const question = "";
const result = await loadedVectorStore.similaritySearch(question, 1);
const resA = await chainA.call({
  input_documents: result,
  question,
});

console.log(resA);
