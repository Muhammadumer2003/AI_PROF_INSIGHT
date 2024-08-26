// import { NextResponse } from 'next/server';
// import { Pinecone } from "@pinecone-database/pinecone"
// import { HfInference } from "@huggingface/inference";
// import OpenAI from 'openai';
// import Groq from 'groq-sdk';


// // Define system prompt for the AI assistant
// const systemPrompt = `
// You are an AI assistant designed to help students find professors based on their queries using a RAG system. Your primary goal is to:

// ## Your Capabilities:
// 1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and detailed info.
// 2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
// 3. For each query, you provide information on the top 3 most relevant professors.

// ## Your Response Should:
// 1. Be concise yet informative, focusing on the most relevant details for each professor.
// 2. Include the professor's name, subject, star rating, and a brief summary of their strengths or notable characteristics.
// 3. Highlight any specific aspects mentioned in the student's query (e.g., teaching style, course difficulty, grading fairness).
// 4. Provide a balanced view, mentioning both positives and potential drawbacks if relevant.

// ## Response Format:
// For each query, structure your response as follows:

// 1. A brief intro addressing the student's specific request.
// 2. Top 3 Professor Recommendations:
//    - Name (Subject) - Star rating
//    - Brief summary of their strengths or notable characteristics
// 3. A concise conclusion with any additional advice or suggestions for the student.

// ## Guidelines:
// 1. Avoid using generic or unhelpful names for professors.
// 2. Be sure to include at least one positive and one negative aspect about each professor.
// 3. Use the provided RAG system to find relevant information.
// 4. Use the provided Groq query to extract necessary data from the database.
// 5. Be mindful of the student's query and tailor your response to their needs.

// Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings.
// `;

// export async function POST(req) {
//     try {
//       const data = await req.json();
  
//       const pc = new PineconeClient();
//       await pc.init({ apiKey: process.env.PINECONE_API_KEY });
//       const index = pc.Index('ragghh1');
  
//       const groq = new Groq({ apiKey: process.env.OPEN_AI_KEY });
  
//       const text = data[data.length - 1].content;
//       // const embedding = await openai.embeddings.create({
//       //   model: 'text-embedding-ada-002',
//       //   input: text,
//       // });
  
//       const hf= new HfInference(process.env.HUGGING_FACE_API_KEY);

//   const embedding= await hf.featureExtraction({
//     model: 'sentence-transformer/all-MiniLM-L6-V2',
//     input: text,


    
//   })
//       const results = await index.query({
//         topK: 5,
//         includeMetadata: true,
//         vector: embedding,
//       });
  
//       let resultString = '';
//       results.matches.forEach((match) => {
//         resultString += `
//           Returned Results:
//           Professor: ${match.id}
//           Review: ${match.metadata.review}
//           Subject: ${match.metadata.subject}
//           Stars: ${match.metadata.stars}
//           \n\n`;
//       });
  
//       const lastMessage = data[data.length - 1];
//       const lastMessageContent = lastMessage.content + resultString;
//       const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {role: 'system', content: systemPrompt},
//           ...lastDataWithoutLastMessage,
//           {role: 'user', content: lastMessageContent},
//         ],
//         model: 'llama3-8b-8192',
//         stream: true,
//       })
  
//       const stream = new ReadableStream({
//         async start(controller) {
//           const encoder = new TextEncoder();
//           try {
//             for await (const chunk of completion) {
//               const content = chunk.choices[0]?.delta?.content;
//               if (content) {
//                 const text = encoder.encode(content);
//                 controller.enqueue(text);
//               }
//             }
//           } catch (err) {
//             controller.error(err);
//           } finally {
//             controller.close();
//           }
//         },
//       });
  
//       return new NextResponse(stream);
  
//     } catch (error) {
//       console.error('Error in POST handler:', error);
//       return new NextResponse('Internal Server Error', { status: 500 });
//     }
//   }















import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from '@huggingface/inference';
import OpenAI from "openai";
import Groq from 'groq-sdk';

const systemPrompt =  `
You are an AI assistant designed to help students find professors based on their queries using a RAG system. Your primary goal is to:

## Your Capabilities:
1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and detailed info.
2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
3. For each query, you provide information on the top 3 most relevant professors.

## Your Response Should:
1. Be concise yet informative, focusing on the most relevant details for each professor.
2. Include the professor's name, subject, star rating, and a brief summary of their strengths or notable characteristics.
3. Highlight any specific aspects mentioned in the student's query (e.g., teaching style, course difficulty, grading fairness).
4. Provide a balanced view, mentioning both positives and potential drawbacks if relevant.

## Response Format:
For each query, structure your response as follows:

1. A brief intro addressing the student's specific request.
2. Top 3 Professor Recommendations:
   - Name (Subject) - Star rating
   - Brief summary of their strengths or notable characteristics
3. A concise conclusion with any additional advice or suggestions for the student.

## Guidelines:
1. Avoid using generic or unhelpful names for professors.
2. Be sure to include at least one positive and one negative aspect about each professor.
3. Use the provided RAG system to find relevant information.
4. Use the provided Groq query to extract necessary data from the database.
5. Be mindful of the student's query and tailor your response to their needs.

Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings.
`;

export async function POST(req) {
    const data = await req.json();

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index('raggl').namespace('reviews-1');

    const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

    const text = data[data.length - 1].content;

    try {
        const embeddingData = await hf.featureExtraction({
            model: 'dunzhang/stella_en_1.5B_v5',
            inputs: text
        });

        if (!embeddingData || !Array.isArray(embeddingData)) {
            throw new Error("Failed to extract embeddings or unexpected format");
        }

        const results = await index.query({
            topK: 3,
            includeMetadata: true,
            vector: embeddingData
        });

        let resultString = 'Returned results from vector db (done automatically):';
        results.matches.forEach((match) => {
            resultString += `\n
            Professor: ${match.id}
            Review: ${match.metadata.review}
            Subject: ${match.metadata.subject}
            Stars: ${match.metadata.stars}
            \n\n`;
        });

        const lastMessage = data[data.length - 1];
        const lastMessageContent = lastMessage.content + resultString;
        const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

        // const openai = new OpenAI({
        //     apiKey: process.env.OPENROUTER_API_KEY,
        //     baseURL: "https://openrouter.ai/api/v1",
        // });

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...lastDataWithoutLastMessage,
                { role: 'user', content: lastMessageContent }
            ],
            model: 'llama3-8b-8192',
            stream: true
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of completion) {
                        const content = chunk.choices[0]?.delta?.content;
                        if (content) {
                            const text = encoder.encode(content);
                            controller.enqueue(text);
                        }
                    }
                } catch (err) {
                    controller.error(err);
                } finally {
                    controller.close();
                }
            },
        });

        return new NextResponse(stream);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message });
    }
}