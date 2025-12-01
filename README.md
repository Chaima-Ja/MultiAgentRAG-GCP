# Multi-Agent RAG Platform for Materials Science

A production-ready **Multi-Agent RAG (Retrieval-Augmented Generation)** platform that orchestrates specialized AI agents to retrieve, analyze, and reason over materials science research literature. Built on **Google Cloud Platform** with modern cloud-native architecture.

## Project Overview

This platform demonstrates advanced **multi-agent system design** and **GCP cloud engineering** capacities. It implements an orchestration pattern where specialized agents collaborate to process research queries, with each agent handling a distinct responsibility in the pipeline.

### Core Capabilities

- **Intelligent Document Retrieval** from arXiv and PubChem
- **AI-Powered Summarization** using LLMs (Anthropic  / Vertex AI)
- **Advanced Reasoning** over research documents
- **Cloud-Native Architecture** on GCP
- **Scalable Serverless Design** with Cloud Functions
- **Modern Web Interface** for interaction

## Architecture Highlights

### Multi-Agent System Design

The platform implements a **modular agent architecture** where each agent has a single, well-defined responsibility:

```
┌─────────────────────────────────────────┐
│         Agent Orchestrator              │
│        (Workflow Coordination)          │
└──────┬──────────┬──────────┬────────────┘
       │          │          │
       ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│Retrieval │ │Summarize │ │Reasoning │
│  Agent   │ │  Agent   │ │  Agent   │
└──────────┘ └──────────┘ └──────────┘
```

**Key Design Principles:**
- **Separation of Concerns**: Each agent handles one specific task
- **Modularity**: Agents can be extended or replaced independently
- **Scalability**: Agents can scale independently based on workload
- **Testability**: Each agent can be tested in isolation


### Google Cloud Platform Integration

#### **Cloud Functions**
- Serverless API endpoints
- Auto-scaling based on demand
- Pay-per-use cost model
- Integrated with other GCP services

#### **Cloud Storage**
- Document persistence layer
- Scalable object storage
- Lifecycle management
- Integration with BigQuery

#### **BigQuery**
- Search analytics and logging
- Query performance tracking
- Usage metrics and reporting
- Data warehousing patterns

#### **Cloud Run**
- Containerized UI deployment
- Serverless container platform
- Auto-scaling web services
- Integrated load balancing




## Technology Stack
- **Python 3.11**
- **LangChain**
- **Google Cloud SDK**
- **Google Cloud Platform**
- **Docker**
- **Cloud Functions Gen2**
- **Cloud Run**
- **HTML/CSS/JavaScript**
- **Flask**
- **Responsive Design**



## Architecture Flow
```
User Query
    ↓
Cloud Functions
    ↓
Agent Orchestrator
    ↓
┌─────────────────────────────────┐
│  Retrieval Agent                │ 
│  Summarization Agent            │ 
│  Reasoning Agent                │ 
└─────────────────────────────────┘
    ↓
Cloud Storage 
    ↓
BigQuery
    ↓
Response to User
```


## Contact

For questions about the architecture or collaboration opportunities, please reach out.
