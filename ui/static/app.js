
const API_ENDPOINT = window.API_ENDPOINT || 'https://YOUR-API-ENDPOINT.run.app';

document.getElementById('apiEndpoint').textContent = API_ENDPOINT;

let currentStep = 0;
const steps = [
    'Retrieving documents from arXiv...',
    'Summarizing documents with AI...',
    'Performing reasoning analysis...',
    'Storing results...'
];

function updateLoadingStep(stepIndex) {
    const stepsEl = document.getElementById('loadingSteps');
    if (stepsEl) {
        stepsEl.textContent = steps[stepIndex] || 'Processing...';
    }
}

async function search() {
    const query = document.getElementById('queryInput').value.trim();
    
    if (!query) {
        showError('Please enter a search query');
        return;
    }

    // Get options
    const enableSummarization = document.getElementById('enableSummarization').checked;
    const enableReasoning = document.getElementById('enableReasoning').checked;
    const sources = [];
    if (document.getElementById('sourceArxiv').checked) sources.push('arxiv');
    if (document.getElementById('sourcePubchem').checked) sources.push('pubchem');
    
    if (sources.length === 0) {
        showError('Please select at least one source');
        return;
    }

    // Hide previous results and errors
    document.getElementById('results').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    
    // Show loading
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('searchBtn').disabled = true;
    document.getElementById('btnText').textContent = 'Processing...';
    document.getElementById('btnSpinner').classList.remove('hidden');
    
    currentStep = 0;
    updateLoadingStep(currentStep);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                sources: sources,
                enable_summarization: enableSummarization,
                enable_reasoning: enableReasoning
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Hide loading
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('searchBtn').disabled = false;
        document.getElementById('btnText').textContent = 'Search';
        document.getElementById('btnSpinner').classList.add('hidden');
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        showError(`Error: ${error.message}. Please check the API endpoint and try again.`);
        
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('searchBtn').disabled = false;
        document.getElementById('btnText').textContent = 'Search';
        document.getElementById('btnSpinner').classList.add('hidden');
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.remove('hidden');

    // Display documents
    displayDocuments(data.retrieval);
    
    // Display summarization if available
    if (data.summarization && Object.keys(data.summarization).length > 0) {
        displaySummarization(data.summarization);
    }
    
    // Display reasoning if available
    if (data.reasoning && Object.keys(data.reasoning).length > 0) {
        displayReasoning(data.reasoning);
    }
    
    // Display storage info if available
    if (data.storage && Object.keys(data.storage).length > 0) {
        displayStorage(data.storage);
    }
}

function displayDocuments(retrieval) {
    const documentsList = document.getElementById('documentsList');
    documentsList.innerHTML = '';
    
    const totalCount = retrieval.total_count || 0;
    if (totalCount === 0) {
        documentsList.innerHTML = '<p>No documents found. Try a different query.</p>';
        return;
    }

    // Combine all sources
    const allDocs = [];
    if (retrieval.arxiv) allDocs.push(...retrieval.arxiv);
    if (retrieval.pubchem) allDocs.push(...retrieval.pubchem);

    allDocs.forEach((doc, index) => {
        const card = document.createElement('div');
        card.className = 'document-card';
        
        const title = doc.title || doc.name || 'Untitled';
        const authors = doc.authors ? doc.authors.join(', ') : '';
        const summary = doc.summary || doc.content || 'No summary available';
        const source = doc.source || 'unknown';
        
        card.innerHTML = `
            <h3>${title}</h3>
            <div class="meta">
                ${authors ? `<strong>Authors:</strong> ${authors}<br>` : ''}
                <strong>Source:</strong> ${source}
                ${doc.published ? `<br><strong>Published:</strong> ${new Date(doc.published).toLocaleDateString()}` : ''}
            </div>
            <div class="summary">${summary.substring(0, 300)}${summary.length > 300 ? '...' : ''}</div>
        `;
        
        documentsList.appendChild(card);
    });
}

function displaySummarization(summarization) {
    const section = document.getElementById('summarizationSection');
    section.classList.remove('hidden');
    
    const content = document.getElementById('summarizationContent');
    content.innerHTML = '';
    
    if (summarization.executive_summary) {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'executive-summary';
        summaryDiv.innerHTML = `<p>${summarization.executive_summary}</p>`;
        content.appendChild(summaryDiv);
    }
    
    if (summarization.count) {
        const countDiv = document.createElement('p');
        countDiv.style.marginTop = '15px';
        countDiv.style.color = '#666';
        countDiv.textContent = `Summarized ${summarization.count} document(s)`;
        content.appendChild(countDiv);
    }
}

function displayReasoning(reasoning) {
    const section = document.getElementById('reasoningSection');
    section.classList.remove('hidden');
    
    const content = document.getElementById('reasoningContent');
    content.innerHTML = '';
    
    if (reasoning.reasoning) {
        const reasoningDiv = document.createElement('div');
        reasoningDiv.className = 'reasoning-content';
        reasoningDiv.innerHTML = `<p>${reasoning.reasoning}</p>`;
        content.appendChild(reasoningDiv);
    }
    
    if (reasoning.key_terms && reasoning.key_terms.length > 0) {
        const termsDiv = document.createElement('div');
        termsDiv.className = 'key-terms';
        termsDiv.innerHTML = '<strong>Key Terms:</strong> ';
        reasoning.key_terms.forEach(term => {
            const termSpan = document.createElement('span');
            termSpan.className = 'key-term';
            termSpan.textContent = term;
            termsDiv.appendChild(termSpan);
        });
        content.appendChild(termsDiv);
    }
}

function displayStorage(storage) {
    const section = document.getElementById('storageSection');
    section.classList.remove('hidden');
    
    const content = document.getElementById('storageContent');
    content.innerHTML = '';
    
    const storageDiv = document.createElement('div');
    storageDiv.className = 'storage-info';
    
    let info = '';
    if (storage.results_uri) {
        info += `Results URI: ${storage.results_uri}<br>`;
    }
    if (storage.documents_stored) {
        info += `Documents stored: ${storage.documents_stored}`;
    }
    
    storageDiv.innerHTML = info || 'Storage information not available';
    content.appendChild(storageDiv);
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to trigger search
document.getElementById('queryInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        search();
    }
});

