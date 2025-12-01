# Agent Architecture

This project implements a multi-agent system for materials science research:

## Agent Types

1. **Retrieval Agent** - Fetches documents from arXiv and PubChem
2. **Summarization Agent** - Uses LLM to condense research papers
3. **Reasoning Agent** - Performs deep analysis over documents
4. **Orchestrator** - Coordinates all agents in a workflow

## Architecture Pattern

The agents follow a modular design with clear separation of concerns.
Each agent is responsible for a specific task and communicates through
a centralized orchestrator.

See `agent_example.py` for a simplified example of the agent pattern.
