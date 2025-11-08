# AI Infrastructure & Enhanced Food Database - Implementation Plan

## Overview
Transform NutBot into an AI-powered nutrition platform with comprehensive food knowledge, intelligent recommendations, and natural language interaction capabilities.

---

## Phase 1: Comprehensive Food Database (1000+ Ingredients)

### 1.1 Database Schema Extension

```prisma
model Food {
  id          String   @id @default(cuid())
  
  // Basic Information
  name        String
  commonNames String[] // ["Tomato", "Roma Tomato", "Cherry Tomato"]
  category    String   // "vegetable", "fruit", "protein", "grain", etc.
  subcategory String?  // "leafy_green", "citrus", "poultry", etc.
  
  // Classification
  brand       String?  // null for generic, brand name for packaged
  variant     String?  // "organic", "conventional", "fresh", "canned", "frozen"
  processing  String   @default("raw") // "raw", "cooked", "roasted", "steamed", etc.
  
  // Nutritional Data (per 100g unless specified)
  calories    Float
  protein     Float
  carbs       Float
  fat         Float
  fiber       Float
  sugar       Float?
  saturatedFat Float?
  
  // Micronutrients (all nullable for incomplete data)
  vitaminA    Float? // mcg RAE
  vitaminC    Float? // mg
  vitaminD    Float? // mcg
  vitaminE    Float? // mg
  vitaminK    Float? // mcg
  vitaminB1   Float? // Thiamin mg
  vitaminB2   Float? // Riboflavin mg
  vitaminB3   Float? // Niacin mg
  vitaminB6   Float? // mg
  vitaminB12  Float? // mcg
  folate      Float? // mcg DFE
  biotin      Float? // mcg
  pantothenicAcid Float? // mg
  
  calcium     Float?
  iron        Float?
  magnesium   Float?
  phosphorus  Float?
  potassium   Float?
  sodium      Float?
  zinc        Float?
  copper      Float? // mg
  manganese   Float? // mg
  selenium    Float? // mcg
  iodine      Float? // mcg
  chromium    Float? // mcg
  molybdenum  Float? // mcg
  
  // Phytonutrients & Bioactives
  polyphenols Float? // mg
  carotenoids Float? // mcg
  flavonoids  Float? // mg
  anthocyanins Float? // mg
  omega3      Float? // g
  omega6      Float? // g
  choline     Float? // mg
  
  // Gut Health Markers
  isFermented      Boolean @default(false)
  probioticStrains String[] // ["Lactobacillus", "Bifidobacterium"]
  prebioticFiber   Float? // g
  resistantStarch  Float? // g
  
  // Food Quality Indicators
  isOrganic        Boolean @default(false)
  isWholeFood      Boolean @default(true)
  isProcessed      Boolean @default(false)
  isUltraProcessed Boolean @default(false)
  glycemicIndex    Int? // 0-100
  glycemicLoad     Float?
  
  // Allergens & Dietary Restrictions
  allergens   String[] // ["gluten", "dairy", "nuts", "soy", "shellfish"]
  isVegan     Boolean @default(false)
  isVegetarian Boolean @default(false)
  isGlutenFree Boolean @default(false)
  isDairyFree  Boolean @default(false)
  isKeto      Boolean @default(false)
  isPaleo     Boolean @default(false)
  
  // Sourcing & Availability
  season      String[] // ["spring", "summer", "fall", "winter", "year-round"]
  shelfLife   String? // "fresh: 3-7 days", "frozen: 6-12 months"
  storage     String? // "refrigerate", "room temperature", "freeze"
  
  // Interactions & Synergies
  interactions Interaction[] // Relations to other foods
  
  // Metadata
  dataSource  String? // "USDA", "brand-provided", "manual-entry"
  lastUpdated DateTime @updatedAt
  createdAt   DateTime @default(now())
  verified    Boolean @default(false)
  
  @@index([category, variant])
  @@index([brand])
  @@index([name])
}

model FoodInteraction {
  id          String @id @default(cuid())
  
  food1Id     String
  food1       Food @relation("Food1", fields: [food1Id], references: [id])
  food2Id     String
  food2       Food @relation("Food2", fields: [food2Id], references: [id])
  
  type        String // "synergy", "inhibition", "neutral"
  effect      String // "increases_absorption", "decreases_absorption", "enhances_effect"
  nutrient    String? // Which nutrient is affected
  magnitude   Float? // 1.0 = no change, 1.5 = 50% increase, 0.5 = 50% decrease
  
  description String // "Vitamin C enhances iron absorption from plant sources"
  evidenceLevel String @default("moderate") // "strong", "moderate", "preliminary"
  source      String? // Research citation
  
  createdAt   DateTime @default(now())
  
  @@unique([food1Id, food2Id, nutrient])
}

model NutritionKnowledge {
  id          String @id @default(cuid())
  
  // Knowledge Base Entry
  topic       String // "iron_absorption", "calcium_vitamin_d_synergy", etc.
  category    String // "nutrient_interactions", "timing", "gut_health", etc.
  
  title       String
  summary     String // Short description for RAG
  content     String // Full markdown content
  
  // Related Entities
  nutrients   String[] // ["iron", "vitamin_c"]
  foods       String[] // Food IDs or names
  
  // Evidence & Quality
  evidenceLevel String @default("moderate")
  sources     String[] // Research paper URLs/DOIs
  
  // Vector Embedding for RAG
  embedding   Float[] // 1536-dim OpenAI embedding
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([category])
  @@index([topic])
}
```

### 1.2 Data Sources & Collection Strategy

**Priority 1: Core Database (Top 1000 Foods)**
- **USDA FoodData Central**: Comprehensive nutrient profiles
- **ESHA Food Processor**: Commercial food database
- **Nutritionix**: Brand-specific foods
- **Manual curation**: High-quality foods with complete micronutrient data

**Categories to Cover:**
1. **Vegetables** (150 items)
   - Leafy greens, cruciferous, nightshades, root vegetables
   - Variants: raw, cooked, steamed, roasted, organic, conventional

2. **Fruits** (100 items)
   - Berries, citrus, stone fruits, tropical, melons
   - Variants: fresh, frozen, dried, canned

3. **Proteins** (200 items)
   - Meat: beef, pork, lamb, game (grass-fed vs grain-fed)
   - Poultry: chicken, turkey, duck (organic, free-range, conventional)
   - Fish & Seafood: wild-caught vs farmed
   - Plant proteins: legumes, tofu, tempeh, seitan

4. **Grains & Starches** (100 items)
   - Whole grains, refined grains, pseudo-grains
   - Variants: enriched, whole grain, organic

5. **Dairy & Alternatives** (80 items)
   - Milk, cheese, yogurt (whole, low-fat, non-fat, organic)
   - Plant-based: soy, almond, oat, coconut milk

6. **Nuts & Seeds** (50 items)
   - Raw, roasted, salted, unsalted, butters

7. **Oils & Fats** (40 items)
   - Olive, coconut, avocado, butter, ghee
   - Cold-pressed, refined, virgin, extra virgin

8. **Fermented Foods** (30 items)
   - Kimchi, sauerkraut, kefir, kombucha, miso, tempeh
   - Probiotic strains documented

9. **Packaged/Processed** (150 items)
   - Common brands, protein powders, snacks
   - Complete ingredient lists and additives

10. **Herbs & Spices** (50 items)
    - Nutrient density, polyphenol content

11. **Beverages** (50 items)
    - Tea, coffee, juices, smoothies

### 1.3 Data Collection Scripts

```typescript
// scripts/import-usda-foods.ts
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const USDA_API_KEY = process.env.USDA_API_KEY;

interface USDAFood {
  fdcId: number;
  description: string;
  foodCategory: string;
  foodNutrients: Array<{
    nutrient: { name: string; unitName: string };
    amount: number;
  }>;
}

async function importUSDAFood(fdcId: number) {
  const response = await axios.get(
    `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
    { params: { api_key: USDA_API_KEY } }
  );
  
  const usdaFood: USDAFood = response.data;
  
  // Map USDA nutrients to our schema
  const nutrients = mapUSDANutrients(usdaFood.foodNutrients);
  
  await prisma.food.create({
    data: {
      name: usdaFood.description,
      category: categorize(usdaFood.foodCategory),
      dataSource: `USDA:${fdcId}`,
      verified: true,
      ...nutrients,
    },
  });
}

function mapUSDANutrients(nutrients: any[]) {
  const mapping: Record<string, string> = {
    'Energy': 'calories',
    'Protein': 'protein',
    'Total lipid (fat)': 'fat',
    'Carbohydrate, by difference': 'carbs',
    'Fiber, total dietary': 'fiber',
    'Vitamin C, total ascorbic acid': 'vitaminC',
    'Vitamin D (D2 + D3)': 'vitaminD',
    'Calcium, Ca': 'calcium',
    'Iron, Fe': 'iron',
    // ... complete mapping
  };
  
  const result: any = {};
  nutrients.forEach(n => {
    const fieldName = mapping[n.nutrient.name];
    if (fieldName) {
      result[fieldName] = n.amount;
    }
  });
  
  return result;
}
```

---

## Phase 2: AI-Powered Food Recognition

### 2.1 Image Recognition System

**Technology Stack:**
- **OpenAI Vision API** (GPT-4 Vision): Initial implementation
- **Custom Model** (future): Fine-tuned on food images for better accuracy

**Implementation:**

```typescript
// lib/ai/food-recognition.ts
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function recognizeFoodFromImage(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analyze this food image and provide:
1. Food name and category
2. Estimated portion size
3. Ingredients if it's a prepared dish
4. Preparation method (raw, cooked, fried, etc.)
5. Confidence score (0-100%)

Return as JSON:
{
  "food_name": string,
  "category": string,
  "portion_estimate": { "amount": number, "unit": string },
  "ingredients": string[],
  "preparation": string,
  "confidence": number
}`,
          },
          {
            type: 'image_url',
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
    max_tokens: 500,
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  
  // Search our database for matching food
  const matchedFood = await prisma.food.findFirst({
    where: {
      OR: [
        { name: { contains: result.food_name, mode: 'insensitive' } },
        { commonNames: { has: result.food_name } },
      ],
      processing: result.preparation,
    },
  });

  return {
    recognized: result,
    matchedFood,
    confidence: result.confidence,
  };
}
```

**API Endpoint:**

```typescript
// app/api/ai/recognize-food/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { recognizeFoodFromImage } from '@/lib/ai/food-recognition';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { imageUrl } = await request.json();
  
  try {
    const result = await recognizeFoodFromImage(imageUrl);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Food recognition error:', error);
    return NextResponse.json(
      { error: 'Failed to recognize food' },
      { status: 500 }
    );
  }
}
```

---

## Phase 3: RAG (Retrieval-Augmented Generation) System

### 3.1 Vector Database Setup

**Technology:**
- **Pinecone** or **Supabase Vector** for vector storage
- **OpenAI text-embedding-3-small** for embeddings

**Schema:**

```typescript
// lib/ai/vector-store.ts
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const embeddings = new OpenAIEmbeddings({
  modelName: 'text-embedding-3-small',
  dimensions: 1536,
});

export async function createNutritionVectorStore() {
  const index = pinecone.Index('nutrition-knowledge');
  
  return await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: 'nutrition-v1',
  });
}

export async function addKnowledgeToVectorStore(knowledge: {
  id: string;
  title: string;
  content: string;
  category: string;
  nutrients: string[];
}) {
  const vectorStore = await createNutritionVectorStore();
  
  const document = {
    pageContent: `${knowledge.title}\n\n${knowledge.content}`,
    metadata: {
      id: knowledge.id,
      category: knowledge.category,
      nutrients: knowledge.nutrients.join(','),
      title: knowledge.title,
    },
  };
  
  await vectorStore.addDocuments([document]);
}

export async function searchNutritionKnowledge(query: string, k: number = 5) {
  const vectorStore = await createNutritionVectorStore();
  
  const results = await vectorStore.similaritySearchWithScore(query, k);
  
  return results.map(([doc, score]) => ({
    content: doc.pageContent,
    metadata: doc.metadata,
    relevanceScore: score,
  }));
}
```

### 3.2 Knowledge Base Population

```typescript
// scripts/populate-nutrition-knowledge.ts
import { prisma } from '@/lib/prisma';
import { addKnowledgeToVectorStore } from '@/lib/ai/vector-store';

const nutritionKnowledge = [
  {
    topic: 'iron_vitamin_c_synergy',
    category: 'nutrient_interactions',
    title: 'Iron and Vitamin C Synergy',
    summary: 'Vitamin C significantly enhances non-heme iron absorption from plant sources',
    content: `# Iron and Vitamin C Absorption Synergy

## Mechanism
Vitamin C (ascorbic acid) enhances the absorption of non-heme iron (from plant sources) by:
1. Converting ferric iron (Fe3+) to ferrous iron (Fe2+), the more absorbable form
2. Forming soluble iron-ascorbate complexes that prevent iron from binding to phytates
3. Maintaining iron solubility in the alkaline environment of the small intestine

## Magnitude of Effect
- Can increase iron absorption by 3-4x when consumed together
- Most effective when consumed in the same meal
- 25-100mg of vitamin C can significantly boost iron absorption

## Practical Applications
**Good combinations:**
- Spinach salad with lemon juice dressing
- Oatmeal with strawberries
- Lentil soup with tomatoes
- Iron-fortified cereal with orange juice

**Timing:**
- Consume vitamin C-rich foods within 1 hour of iron-rich plant foods
- Both nutrients should be present in the digestive tract simultaneously

## Research Evidence
Multiple studies demonstrate this synergy:
- Hallberg et al. (1989): 85mg vitamin C increased iron absorption from bread by 4x
- Cook & Reddy (2001): Ascorbic acid overcomes inhibitory effects of phytates and polyphenols

## Inhibitors to Avoid
When maximizing iron absorption, avoid consuming with the same meal:
- Coffee and tea (tannins)
- Calcium supplements
- High-fiber bran cereals`,
    nutrients: ['iron', 'vitamin_c'],
    evidenceLevel: 'strong',
    sources: [
      'https://doi.org/10.1093/ajcn/50.1.87',
      'https://doi.org/10.3945/ajcn.74.6.791',
    ],
  },
  // Add 100+ more entries covering all major nutrient interactions
];

async function populate() {
  for (const knowledge of nutritionKnowledge) {
    const entry = await prisma.nutritionKnowledge.create({
      data: knowledge,
    });
    
    await addKnowledgeToVectorStore(entry);
    console.log(`✅ Added: ${knowledge.title}`);
  }
}

populate();
```

### 3.3 RAG Query System

```typescript
// lib/ai/rag-query.ts
import { ChatOpenAI } from '@langchain/openai';
import { searchNutritionKnowledge } from './vector-store';

const llm = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
});

export async function answerNutritionQuestion(
  question: string,
  userContext?: {
    recentFoods?: string[];
    nutrientGaps?: string[];
    dietaryPattern?: string;
  }
) {
  // 1. Retrieve relevant knowledge
  const relevantKnowledge = await searchNutritionKnowledge(question, 5);
  
  // 2. Build context
  const context = relevantKnowledge
    .map(k => `${k.metadata.title}\n${k.content}`)
    .join('\n\n---\n\n');
  
  // 3. Generate answer with LLM
  const prompt = `You are NutBot, an expert nutrition assistant. Answer the user's question using the provided knowledge base and their personal context.

**Knowledge Base:**
${context}

**User Context:**
${userContext ? `
- Recent foods: ${userContext.recentFoods?.join(', ') || 'None'}
- Nutrient gaps: ${userContext.nutrientGaps?.join(', ') || 'None'}
- Dietary pattern: ${userContext.dietaryPattern || 'Not specified'}
` : 'No personal context available'}

**User Question:**
${question}

**Instructions:**
1. Answer based on the knowledge base provided
2. Personalize recommendations based on user context when relevant
3. Cite specific food combinations when applicable
4. If the knowledge base doesn't contain the answer, say so clearly
5. Keep answers concise but comprehensive (200-300 words)
6. Focus on actionable advice

Answer:`;

  const response = await llm.invoke(prompt);
  
  return {
    answer: response.content as string,
    sources: relevantKnowledge.map(k => ({
      title: k.metadata.title,
      relevance: k.relevanceScore,
    })),
  };
}
```

---

## Phase 4: Model Context Protocol (MCP) Server

### 4.1 MCP Server Implementation

```typescript
// mcp-server/nutrition-tools.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { analyzeDailyIntake } from '../lib/nutritionEngine';
import { searchNutritionKnowledge } from '../lib/ai/vector-store';

const server = new Server(
  {
    name: 'nutbot-nutrition-tools',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool 1: Analyze Nutrient Intake
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'analyze_nutrient_intake',
        description:
          'Analyzes a list of foods and calculates total nutrient intake with gaps',
        inputSchema: {
          type: 'object',
          properties: {
            foods: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of food names consumed',
            },
            userProfile: {
              type: 'object',
              properties: {
                age: { type: 'number' },
                sex: { type: 'string', enum: ['male', 'female'] },
                activityLevel: { type: 'string' },
              },
            },
          },
          required: ['foods', 'userProfile'],
        },
      },
      {
        name: 'get_food_interactions',
        description: 'Finds synergies and conflicts between foods',
        inputSchema: {
          type: 'object',
          properties: {
            food1: { type: 'string' },
            food2: { type: 'string' },
          },
          required: ['food1', 'food2'],
        },
      },
      {
        name: 'search_nutrition_knowledge',
        description:
          'Searches the nutrition knowledge base using semantic search',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            limit: { type: 'number', default: 5 },
          },
          required: ['query'],
        },
      },
      {
        name: 'optimize_meal_plan',
        description: 'Generates an optimized meal plan for specific nutrient goals',
        inputSchema: {
          type: 'object',
          properties: {
            targetNutrients: {
              type: 'array',
              items: { type: 'string' },
              description: 'Nutrients to optimize for',
            },
            dietaryRestrictions: {
              type: 'array',
              items: { type: 'string' },
            },
            mealCount: { type: 'number', default: 3 },
          },
          required: ['targetNutrients'],
        },
      },
      {
        name: 'calculate_supplement_needs',
        description: 'Calculates supplement recommendations based on nutrient gaps',
        inputSchema: {
          type: 'object',
          properties: {
            currentIntake: { type: 'object' },
            targetValues: { type: 'object' },
          },
          required: ['currentIntake', 'targetValues'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'analyze_nutrient_intake': {
      // Implementation
      const { foods, userProfile } = args;
      const analysis = await analyzeDailyIntake(foods, userProfile);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(analysis, null, 2),
          },
        ],
      };
    }

    case 'get_food_interactions': {
      // Query database for interactions
      const { food1, food2 } = args;
      // Implementation
      return {
        content: [
          {
            type: 'text',
            text: `Interactions between ${food1} and ${food2}...`,
          },
        ],
      };
    }

    case 'search_nutrition_knowledge': {
      const { query, limit = 5 } = args;
      const results = await searchNutritionKnowledge(query, limit);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case 'optimize_meal_plan': {
      // Advanced meal planning algorithm
      // Return optimized meal suggestions
      return {
        content: [
          {
            type: 'text',
            text: 'Optimized meal plan...',
          },
        ],
      };
    }

    case 'calculate_supplement_needs': {
      const { currentIntake, targetValues } = args;
      // Calculate gaps and recommend supplements
      return {
        content: [
          {
            type: 'text',
            text: 'Supplement recommendations...',
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('NutBot MCP Server running on stdio');
}

main();
```

### 4.2 MCP Server Configuration

```json
// mcp-server/package.json
{
  "name": "nutbot-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "nutbot-mcp": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "@prisma/client": "^5.22.0"
  }
}
```

---

## Phase 5: AI Chat Interface

### 5.1 Chat Component

```typescript
// components/AIChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; relevance: number }>;
}

export default function AIChat() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !session) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold">Nutrition AI Assistant</h3>
            <p className="text-xs text-primary-100">
              Ask about nutrients, food interactions, or meal planning
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-xs font-semibold mb-2">Sources:</p>
                  {message.sources.map((source, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      • {source.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about nutrition, foods, or interactions..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 5.2 Chat API Endpoint

```typescript
// app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { answerNutritionQuestion } from '@/lib/ai/rag-query';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message } = await request.json();

  try {
    // Get user context
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        foodEntries: {
          where: {
            timestamp: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
          },
          take: 20,
        },
      },
    });

    const userContext = {
      recentFoods: user?.foodEntries.map((e) => e.foodName) || [],
      dietaryPattern: user?.dietaryPattern || undefined,
    };

    const result = await answerNutritionQuestion(message, userContext);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
```

---

## Implementation Timeline

### Month 1: Foundation
- Week 1-2: Extend database schema, import USDA data (500 foods)
- Week 3: Implement food variants (organic, brands, processing methods)
- Week 4: Set up vector database, populate with 50 nutrition knowledge entries

### Month 2: AI Integration
- Week 1: Implement OpenAI Vision API for food recognition
- Week 2-3: Build RAG system with LangChain
- Week 4: Create chat interface and API endpoints

### Month 3: Advanced Features
- Week 1-2: Build MCP server with nutrition tools
- Week 3: Implement meal planning algorithms
- Week 4: Testing, optimization, documentation

### Month 4: Expansion
- Complete 1000 food database
- Add 200+ nutrition knowledge entries
- Fine-tune AI responses
- User testing and feedback integration

---

## Cost Estimates

**Monthly Operational Costs:**
- **OpenAI API**: ~$100-300/month (depending on usage)
  - GPT-4 Vision: $0.01/image
  - GPT-4 Turbo: $0.01/1K tokens
  - Embeddings: $0.0001/1K tokens
  
- **Pinecone Vector DB**: $70/month (Starter plan, 5M vectors)
  - Alternative: Supabase Vector (free tier up to 500MB)

- **USDA API**: Free (rate-limited)

**Total: $170-370/month** for full AI features

---

## Success Metrics

1. **Food Recognition Accuracy**: >85% for common foods
2. **RAG Relevance**: >90% of answers cite correct sources
3. **User Engagement**: Average 5+ chat messages per session
4. **Database Coverage**: 1000+ foods with 80%+ complete nutrient profiles
5. **Response Time**: <3 seconds for AI responses

---

## Security & Privacy

- All AI interactions logged for quality improvement
- User food data never shared with external APIs without consent
- Option to disable AI features for privacy-conscious users
- Clear disclaimers that AI is informational, not medical advice

---

This implementation plan transforms NutBot into a comprehensive, AI-powered nutrition platform while maintaining the core functionality and expanding the knowledge base to cover nearly all common foods and their interactions.
