"""
Example: Cloud Storage integration pattern.
Shows how documents are stored and retrieved.
"""

from google.cloud import storage
from typing import Optional


class StorageClient:
    """Client for Cloud Storage operations."""
    
    def __init__(self, bucket_name: str, project_id: str):
        self.client = storage.Client(project=project_id)
        self.bucket = self.client.bucket(bucket_name)
    
    def upload_document(self, content: str, filename: str) -> str:
        """
        Upload a document to Cloud Storage.
        
        Returns:
            GCS URI of uploaded file
        """
        blob = self.bucket.blob(filename)
        blob.upload_from_string(content, content_type='text/plain')
        return f"gs://{self.bucket.name}/{filename}"
    
    def download_document(self, filename: str) -> str:
        """Download a document from Cloud Storage."""
        blob = self.bucket.blob(filename)
        return blob.download_as_text()
