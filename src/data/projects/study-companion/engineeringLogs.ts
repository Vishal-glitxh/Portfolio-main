import { EngineeringNotebook } from "../../../types";

export const studyCompanionLogs: EngineeringNotebook = {
  projectId: "study-companion",
  title: "AI Study Companion NLP Logs",
  summary: "Architectural logs for local document tokenizers, sentence similarity matrices, and question generation caching.",
  decisions: [
    {
      id: "companion-embeddings",
      title: "Local Sentence-Transformers vs OpenAI Embeddings API",
      context: "Selecting the embedding model to extract 768-dimensional document vectors from student course notes.",
      reasoning: "Running Sentence-Transformers locally on the server prevents student data from leaking, guarantees completely offline operations, and eliminates external API call costs and API limits.",
      alternatives: [
        "OpenAI text-embedding-ada-002 (requires internet access, fees, and raises data privacy issues)",
        "TF-IDF Token-Match matrix (fails on conceptual matches and synonyms)"
      ],
      tradeoffs: [
        "Increases node.js server memory footprint by roughly 400MB to host the weights",
        "Initial warm-up loading takes 2-3 seconds on cold starts"
      ],
      outcome: "Delivered >85% accuracy matches on student note concepts with zero external dependency risks or API fees.",
      category: "NLP/Embeddings",
      tags: ["Sentence-Transformers", "Vector Space", "Offline AI"],
      difficulty: "High"
    },
    {
      id: "companion-db-cache",
      title: "MongoDB Document Schema vs Relational Postgres Tables",
      context: "Caching high-dimensional similarity arrays alongside nested practice questions.",
      reasoning: "NoSQL document collections store questions, course tags, and similarity weights under a single document block, matching the JSON output structure of the NLP pipeline.",
      alternatives: [
        "PostgreSQL table relations (requires joins across skills, question answers, and course files)",
        "Local JSON flat file caches (adds file I/O lock issues on simultaneous queries)"
      ],
      tradeoffs: [
        "Duplicates course metadata across question entries",
        "Lacks ACID validation features for cross-document transactions (not needed for study notes)"
      ],
      outcome: "Achieved data query response times under 10ms for active student study sessions.",
      category: "Database Design",
      tags: ["NoSQL", "MongoDB", "Data Caching"],
      difficulty: "Medium"
    }
  ]
};
