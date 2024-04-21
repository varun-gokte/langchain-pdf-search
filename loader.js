//import { PDFLoader } from "langchain/document_loaders/fs/pdf";
const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const dotenv = require("dotenv");
dotenv.config();
const load_document = async () => {
  const loader = new PDFLoader("test.pdf");
  const docs = await loader.load();
  console.log("docs loaded");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docOutput = await textSplitter.splitDocuments(docs);

  let vectorStore = await FaissStore.fromDocuments(
    docOutput,
    new OpenAIEmbeddings()
  );
  console.log("saving");

  await vectorStore.save(".");
  console.log("saved");
};

load_document();

exports.load_document = load_document;
