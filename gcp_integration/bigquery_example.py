"""
Example: BigQuery integration for logging and analytics.
"""

from google.cloud import bigquery
from datetime import datetime


class BigQueryClient:
    """Client for BigQuery operations."""
    
    def __init__(self, project_id: str, dataset_id: str):
        self.client = bigquery.Client(project=project_id)
        self.dataset_id = dataset_id
    
    def log_search(self, query: str, agent_type: str, results_count: int):
        """
        Log a search operation to BigQuery for analytics.
        
        This enables tracking usage, performance, and generating reports.
        """
        # In full implementation:
        # - Creates table if doesn't exist
        # - Inserts log entry with timestamp
        # - Handles errors gracefully
        
        table_ref = self.client.dataset(self.dataset_id).table("search_logs")
        
        row = {
            "timestamp": datetime.utcnow().isoformat(),
            "query": query,
            "agent_type": agent_type,
            "results_count": results_count,
        }
        
        self.client.insert_rows_json(table_ref, [row])
